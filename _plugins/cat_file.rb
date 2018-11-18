require 'jekyll'
require_relative 'content_style'
require 'digest/md5'

class CatStyle < Jekyll::Tags::IncludeTag
  def render(context)
    content = super
    style_content(content)
  end
end

Liquid::Template.register_tag('style_cached', CatStyle)
