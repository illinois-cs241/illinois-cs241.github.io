# frozen_string_literal: true
# This file defines a tag that does all the preprocessing
# For the content. This is done by defining a filter to accept
# All the content and having the filter do various things

require 'nokogiri'
require 'rouge'
require 'htmlentities'
require 'json'

# Where we keep all the man page metadata
$man_filename = '_data/man.json'

# The data loaded up
$data_hash = JSON.parse(File.read($man_filename))

# This is a piece of code that I got from the internet
# No need to understand
# It takes an xml node for `wrap` and wraps `levels` based off of that
class Nokogiri::XML::Node
  # Create a hierarchy on a document based on heading levels
  #   wrap   : e.g. "<section>" or "<div class='section'>"
  #   stops  : array of tag names that stop all sections; use nil for none
  #   levels : array of tag names that control nesting, in order
  def auto_section(wrap = "<div class='card'>", stops = %w[hr], levels = %w[h1 h2 h4 h5 h6])
    levels = Hash[levels.zip(0...levels.length)]
    stops &&= Hash[stops.product([true])]
    stack = []
    children.each do |node|
      unless level = levels[node.name]
        level = stops && stops[node.name] && -1
      end
      stack.pop while (top = stack.last) && top[:level] >= level if level
      stack.last[:section].add_child(node) if stack.last
      next unless level && level >= 0

      section = Nokogiri::XML.fragment(wrap).children[0]
      node.replace(section); section << node
      stack << { section: section, level: level }
    end
  end
end

def append_class_node(elem, classname)
      if !elem['class'].nil?
        elem['class'] << " #{classname}"
      else
        elem['class'] = classname
      end
end

##
# Adds a class to a css selector given a page
#
# == Parameters:
# page::
#   Nokogiri page
# css_selector::
#   Valid css selector
# classname::
#   Name of class you want appended
#
def add_class_to_elem(page, css_selector, classname)
  elems = page.css(css_selector)
  unless elems.nil?
    elems.each do |elem|
        append_class_node(elem, classname)
    end
  end
end

##
# Takes all the backtick man page links like `fork`
# And turns them into links
#
# == Parameters:
# page::
#   Nokogiri page
#
def add_man_links(page)
  page.css('code.highlighter-rouge').each do |code|
    # Needed for reasons
    next unless code.parent.name != 'a'

    # Grab if possible, then put the link in
    uri = $data_hash[code.inner_html]
    unless uri.nil?
      code.inner_html = "<a href=#{uri} class='fancy-link'>#{code.inner_html}</a>"
    end
  end
end

##
# Adds the `#` Anchor tags after ever h2
#
# == Parameters:
# page::
#   Nokogiri page
# title_text_class::
#   Class to add to all of the links in addition to anchor.
#
def add_anchors(page, title_text_class)
  page.css('.title').each do |card|
    # Find the first h2
    # There should only be one.
    h2 = card.css('h2').first

    # Create the new anchor and add into the h2
    anchor = Nokogiri::XML::Node.new('a', page)
    anchor['class'] = 'anchor ' + title_text_class
    anchor['href'] = '#' + h2['id']
    anchor.inner_html = ' #'
    h2 << anchor.to_html
  end

  page.css('h3').each do |h3|
    anchor = Nokogiri::XML::Node.new('a', page)
    anchor['class'] = 'anchor ' + title_text_class
    anchor['href'] = '#' + h3['id']
    anchor.inner_html = ' #'
  end

end

##
# Takes each of the cards and wraps them in various divs
#
# == Parameters:
# page::
#   Nokogiri page
#
def style_cards(page)
  # Wrap the entire card in padding
  page.css('.card').wrap('<div class="pad" />')

  # Take each non-title attribute and stick it in
  # The content piece
  page.css('.card').each do |card|
    ps = card.css('> :not(.title)')

    # Create a new node as to not mess with the original dom
    new_div = Nokogiri::XML::Node.new('div', page)
    new_div['class'] = 'content col-sm-11 .col-sm-offset-1'
    ps.each do |p|
      if p.node_name != 'h2'
        new_div << p.to_html
        p.remove
      end
    end
    card << new_div
  end
end

##
# Styles each of the code blocks in a page by wrapping keywords
# in colorful spans
#
# == Parameters:
# page::
#   Nokogiri page
#
def style_code(page)
  # Style all the code
  html_decoder = HTMLEntities.new
  page.css('.language-C, .language-c').each_with_index do |div, i|

    # This is to create a copyable version of the code
    # The link has been disabled but the startup code is still ehre
    id_target = "code-copy-#{i}"
    copy = Nokogiri::XML::Node.new('a', page)
    copy['class'] = 'code-copy'
    copy.inner_html = 'Copy'
    copy['rel'] = id_target
    copy['onclick'] = 'onCopy(this);'

    textarea = Nokogiri::XML::Node.new('textarea', page)
    textarea['id'] = id_target
    textarea['class'] = 'code-copy-textarea'
    textarea['value'] = div.inner_html

    # Now we style the div.
    # We don't want the JS to do the styling on the front end
    # So what we do is parse the code on the inside, wrap each keyword
    # In a span corresponding to the syntax highlighting
    # And wrap that entire thing into a span
    formatter = Rouge::Formatters::HTML.new
    lexer = Rouge::Lexers::C.new
    formatted = formatter.format(lexer.lex(html_decoder.decode(div.inner_html)))
    code = Nokogiri::XML("<span>#{formatted}</span>")

    # Change all the pre's to divs because browsers don't like pre
    code.css('pre').each do |pre|
      pre.name = 'div'
    end

    # Put in the formatted code.
    div.inner_html = formatted
  end
end

def add_cls_to_img_paragraphs(page)
    page.css('p').each do |p|
    if p.children.length == 0
        next
    end

    if p.children[0].name == 'img'
        append_class_node(p, 'img-paragraph')
    end
    end
end

##
# Takes the raw HTML jekyll produces and converts into our format
#
# == Parameters:
# text::
#   The document fragment from jekyll
#
# == Returns:
# html::
#   Formatted html
#
def style_content(text)

  # Wrap everything into a card using the above method
  # We need an outermost element to do this
  # We need a fragment too because this isn't a full html doc
  page = Nokogiri::HTML::DocumentFragment.parse "<div class='wrapper'>"
  page.at('.//div').inner_html = text

  # Remove all h1's in the body, they shouldn't be there
  page.css('h1').each do |h1|
    h1.remove
  end

  # wrap each section h2 of the divs
  page.at('.//div').auto_section

  # Page is sectioned
  # Add classes to h2 and h3s
  title_text_class = 'title-text'
  add_class_to_elem(page, 'h2', title_text_class)
  add_class_to_elem(page, 'h3', title_text_class)

  # Wrap the h2s in the title attribute
  page.css('h2').wrap("<div class='title'/>")

  add_anchors(page, title_text_class)

  # Put in the links that grow in
  add_class_to_elem(page, 'a', 'fancy-link wiki-link')

  style_cards page
  # Style all tables
  add_class_to_elem(page, 'table', 'table')

  # Wrap each of the contents in rows
  page.css('.content').wrap('<div class="container-fluid" />')
  page.css('.content').wrap('<div class="row" />')

  add_man_links page

  add_cls_to_img_paragraphs(page)

  page.to_html
end

module Jekyll
  # This styles the layout: doc templates
  module CONTENT_STYLE
    def content_style(text)
      style_content(text)
    end
  end

  module SLIDE_STYLE
    # This styles the layout: slide templates
    def slide_style(text, title,sup_title)
      text = '<h1></h1>' + text

      # Provide some manual control to move vertically and horizontally
      text.gsub!(/<vertical\s*\/>/, '<h2></h2>')
      text.gsub!(/<horizontal\s*\/>/, '<h1></h1>')

      # Wrap everything in slides once again
      page = Nokogiri::HTML::DocumentFragment.parse "<div class='slides'>"
      page.at('.//div').inner_html = text
      page.at('.//div').auto_section(wrap='<section>')
      str = "<section>
      <h1 class='title'>#{title}</h1>
      <h2 class='author'>#{sup_title}</h2>
</section>"
      page.at('.//div').first_element_child.before(str)
      style_code(page)
      page.to_html
    end
  end
end

Liquid::Template.register_filter(Jekyll::CONTENT_STYLE)
Liquid::Template.register_filter(Jekyll::SLIDE_STYLE)
