require 'nokogiri'

class Nokogiri::XML::Node
  # Create a hierarchy on a document based on heading levels
  #   wrap   : e.g. "<section>" or "<div class='section'>"
  #   stops  : array of tag names that stop all sections; use nil for none
  #   levels : array of tag names that control nesting, in order
  def auto_section(wrap="<div class='card'>", stops=%w[hr], levels=%w[h1 h2 h4 h5 h6])
    levels = Hash[ levels.zip(0...levels.length) ]
    stops  = stops && Hash[ stops.product([true]) ]
    stack = []
    children.each do |node|
      unless level = levels[node.name]
        level = stops && stops[node.name] && -1
      end
      stack.pop while (top=stack.last) && top[:level]>=level if level
      stack.last[:section].add_child(node) if stack.last
      if level && level >=0
        section = Nokogiri::XML.fragment(wrap).children[0]
        node.replace(section); section << node
        stack << { :section=>section, :level=>level }
      end
    end
  end
end

module Jekyll
  module CONTENT_STYLE
    def content_style(text)
      # Wrap everything into a card using the above method
      # We need an outermost element to do this
      page = Nokogiri::HTML::DocumentFragment.parse "<div class='wrapper'>"
      page.at(".//div").inner_html = text 
      page.at(".//div").auto_section

      # Page is sectioned
      # Add classes to h2 and h3s
      title_text_class = 'title-text'
      h2s = page.css('h2')
      if h2s == nil
      	return text
      end
      h2s.each do |h2|
      	h2['class'] = title_text_class;
      end
      h3s = page.css('h3')
      if h3s != nil
      	h3s.each do |h3|
	      	h3['class'] = title_text_class;
	    end
      end

      # Wrap the h2s in the title attribute
      h2s.wrap("<div class='title'/>")

      # Anchors!
      page.css('.title').each do |card|
      	h2 = card.css('h2').first
      	anchor = Nokogiri::XML::Node.new("a", page)
      	anchor['class'] = 'anchor '+title_text_class
      	anchor['href'] = "#"+h2['id']
      	anchor.inner_html = "#"
      	h2 << anchor.to_html
      	# Jekyll.logger.info wrapper.to_html
      end
      # Wrap the entire card in padding
      page.css('.card').wrap('<div class="pad" />')

      # Take each non-title attribute and stick it in
      # The content piece
      page.css('.card').each do |card|
      	ps = card.css('> :not(.title)')
      	new_div = Nokogiri::XML::Node.new("div", page)
      	new_div['class'] = "content col-sm-11 .col-sm-offset-1"
      	ps.each do |p|
      		if p.node_name != 'h2'
	      		new_div << p.to_html
	      		p.remove
      		end
      	end
      	card << new_div
      end

      page.css('.content').wrap('<div class="container-fluid" />')
      page.css('.content').wrap('<div class="row" />')

      # Style all tables
      page.css('table').each do |table|
      	if table['class'] != nil
      		table['class'] << " table"
      	else
      		table['class'] = "table"
      	end
      end

      return page.to_html
    end
  end
end

# Register the template
Liquid::Template.register_filter(Jekyll::CONTENT_STYLE)