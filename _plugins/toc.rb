require 'nokogiri'

module Jekyll
  module TOC
    def toc(text)
      # Create a fragment
      page = Nokogiri::HTML::DocumentFragment.parse text

      toc = Nokogiri::XML::Node.new('div', page)
      toc['class'] = 'toc-wrapper'

      # Add header
      header = Nokogiri::XML::Node.new('h4', page)
      header.inner_html = 'Content'
      toc << header.to_html

      # Set up the list
      list = Nokogiri::XML::Node.new('ul', page)
      list['class'] = 'toc'

      # Add each h2 element
      page.css('h2').each do |h2|
        new_link = Nokogiri::XML::Node.new('a', page)
        id = h2['id']
        new_link['id'] = 'toc_' + id
        new_link['href'] = '#' + id
        new_link['class'] = 'fancy-link'
        new_link.inner_html = h2.inner_html
        li = Nokogiri::XML::Node.new('li', page)
        li << new_link
        list << li.to_html
      end

      toc << list.to_html
      toc.to_html
    end
  end
end

# Register the filter
Liquid::Template.register_filter(Jekyll::TOC)
