require 'jekyll'
require_relative 'content_style'
require 'digest/md5'

##
# This file takes a piece of content and styles it

class CatStyle < Jekyll::Tags::IncludeTag
  def render(context)
    content = super
    style_content(content)
  end
end

Liquid::Template.register_tag('style_cached', CatStyle)
