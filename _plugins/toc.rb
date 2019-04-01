require 'nokogiri'

##
# The whole reason this class exists is because jekyll table of contents sucks
# In order to get a good table of content, we have to do it ourselves
# So how we gen this is we take the entire document, shove it through a filter
# and output beautiful HTML that makes the page look good

module Jekyll
  module TOC
    def toc(text)
      # Create a fragment
      page = Nokogiri::HTML::DocumentFragment.parse text

      # This will be what we are returning
      toc = Nokogiri::XML::Node.new('div', page)
      toc['class'] = 'toc-wrapper'

      # Add header for the TOC
      header = Nokogiri::XML::Node.new('h4', page)
      header.inner_html = 'Content'
      toc << header.to_html

      # Set up the list for the TOC
      list = Nokogiri::XML::Node.new('ul', page)
      list['class'] = 'toc hacker'

      # Add each h2 element to the TOC
      page.css('h2').each do |h2|
        new_link = Nokogiri::XML::Node.new('a', page)
        id = h2['id']
        new_link['id'] = 'toc_' + id
        new_link['href'] = '#' + id
        new_link['class'] = 'fancy-link hacker'
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
