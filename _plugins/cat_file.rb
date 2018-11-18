require 'jekyll'
require_relative 'content_style'
require "digest/md5"


class CatCachedFile < Jekyll::Tags::IncludeTag

  @@cache = Hash.new
  def render(context)
    path   = path(context)
    params = parse_params(context) if @params
    return unless path

    key    = key(path, params)

    if @@cache[key]
      Jekyll.logger.debug "Include cache hit:", path
    else
      Jekyll.logger.debug "Include cache miss:", path
      @@cache[key] = super
    end
    return style_content(@@cache[key])
  end

  private

  def path(context)
    site   = context.registers[:site]
    file   = render_variable(context) || @file
    locate_include_file(context, file, site.safe)
  end

  def key(path, params)
    Digest::MD5.hexdigest(path.to_s + params.to_s)
  end
end

Liquid::Template.register_tag('style_cached', CatCachedFile)
