# coding: utf-8
require 'redcarpet'
require 'redcarpet/render_strip'
require 'ffi/hunspell'
require 'tmpdir'
require 'tempfile'
require 'optparse'
require 'set'

module Redcarpet
  module Render
    # Markdown-stripping renderer. Turns Markdown into plaintext
    # Thanks to @toupeira (Markus Koller)
    class BareMinimum < Base
      # Methods where the first argument is the text content
      def normal_text(text)
        text
      end

      def block_code(code, language)
        code
      end

      def codespan(code, language)
        ""
      end

      def codespan(code)
        block_code(code, nil)
      end

      def header(title, level)
        title
      end

      def double_emphasis(text)
        text
      end

      def emphasis(text)
        text
      end

      def linebreak
        ""
      end

      def paragraph(text)
        text
      end

      def list(content, list_type)
        content
      end

      def list_item(content, list_type)
        content
      end
      # Other methods where we don't return only a specific argument
      def link(link, title, content)
        "#{content}"
      end

      def image(link, title, content)
        content &&= content + " "
        "#{content}"
      end

      def paragraph(text)
        text + "\n"
      end

      def header(text, header_level)
        text + "\n"
      end

      def table(header, body)
        "#{body}"
      end

      def table_row(content)
        content + "\n"
      end

      def table_cell(content, alignment)
        content + "\t"
      end
    end
  end
end

def generate_dictionaries(exception_file, dict_file, aff_file)
  system "sort #{exception_file} | uniq | wc -l > #{dict_file}"
  system "sort #{exception_file} | uniq >> #{dict_file}"
  system "touch #{aff_file}"
end

def load_man_pages
  man_file = '_data/man.json'
  hash = (JSON.load File.new(man_file)).keys rescue []
  return Set.new hash
end

def check_spelling(md_file, dicts)
  man_set = load_man_pages
  markdown = Redcarpet::Markdown.new(Redcarpet::Render::BareMinimum)
  f = File.open(md_file)
  content = f.read
  yaml_delimiter = '---'
  if content.start_with?(yaml_delimiter)
    next_idx = content.index(yaml_delimiter, yaml_delimiter.length)
    if not next_idx.nil?
      content = content[next_idx+yaml_delimiter.length..-1]
    end
  end
  words = markdown.render(content) # Get rid of front matter
            .gsub(
         "\n", ' ').gsub(
    %r{(```.*```| # No more code blocks
      \(|\) # Ditch the parens
      |\|.*\| # Ditch tables
      |,| # Ditch commas
      "|\?|\!|;|>|<|--|:|-|
      &lt|&gt|[|]|_|\#)}x, ' ').split(/(\s|\/)/)

  exceptions = %r{(\/|\d+%|
             [A-Za-z0-9]+@[A-Za-z0-9]|
             .html$|.htm$|.json$|.c$|.h$|
             [^A-Za-z]+|
             Ctrl|ctrl)}x
  manual_suffix = /('s|'|’s|'ing|'ed)$/
  words.each do |word|
    if word =~ exceptions || man_set.include?(word)
      next
    end
    if word =~ manual_suffix
      word.sub!(manual_suffix, '')
    end
    passes = dicts.any? do |dict|
      dict.check?(word)
    end

    if not passes
      downcased = word.downcase
    end

    passes = dicts.any? do |dict|
      dict.check?(downcased)
    end
    if not passes
      puts "#{md_file}: #{word}"
    end
  end
end

def open_dictionaries()
  hunspell_ubuntu_prefix = File.join(Dir.home, ".hunspell_default")
  FileUtils.mkdir_p hunspell_ubuntu_prefix
  dictionary_suffix = '.dic'
  custom_dic_basename = 'en_US_custom'
  custom_dic = Tempfile.new([custom_dic_basename, dictionary_suffix], tmpdir=hunspell_ubuntu_prefix)
  base = File.basename(custom_dic.path, dictionary_suffix)
  custom_aff = File.join(hunspell_ubuntu_prefix, base + '.aff')
  begin
    generate_dictionaries('.exceptions', custom_dic.path, custom_aff)
    custom_dic.close
    FFI::Hunspell.dict('en_US') do |us_dict|
      FFI::Hunspell.dict(base) do |custom|
        yield([us_dict, custom])
      end
    end
  ensure
    custom_dic.unlink
    system "rm #{custom_aff}"
  end
end
