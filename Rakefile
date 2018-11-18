# Including only the changed build task
require 'rake'
require 'jekyll'
require 'html-proofer'
require 'nokogiri'
require 'open-uri'
require 'json'
require 'optparse'
require 'jemoji'
require 'rake'
require 'pigments'
require 'htmlentities'
require_relative '_scripts/spell_check.rb'
require 'etc'

is_travis = ENV['TRAVIS'] == 'true'
main_json_file = '_data/man.json'
wikibook_dir = '_wikibook'

multitask :default => [
            "pre_build:gen_man",
            "pre_build:cleanup_wiki"] do
  config = Jekyll.configuration({
    :source => './',
    :destination => './_site',
    :timezone => 'America/Chicago',
    :cache_dir => ".jekyll-cache",
  })
  site = Jekyll::Site.new(config)
  Jekyll::Commands::Build.build site, config
  cp './.travis.yml', './_site/.travis.yml'
end

namespace :pre_build do
  desc "Houses all pre build tasks"

  sections = [1, 2, 3, 4]
  base_uri = 'https://linux.die.net/man/'
  cache_time = 30 #days

  task :gen_man, [:file] do |t, args|
    file = args[:file]
    if file == nil
      file = main_json_file
      puts "Using default file #{file}"
    end

    # Man pages don't change that often
    if File.exists?(file) and (File.mtime(file) <=> DateTime.now - cache_time) == 1
      puts "Using cached file"
      next
    end
    puts "Updating file"

    urls = sections.map do |e| 
      base_uri + e.to_s + '/'
    end
    output = Hash.new
    urls.each do |url|
      page = Nokogiri::HTML(open(url))
      page.css('dt a').each do |link|
        output[link.inner_html] = url+link['href']
      end
    end

    file_opts = File::RDWR|File::CREAT
    File.open(file, file_opts, 0644) do |f| 
      f.truncate 0
      f.write(JSON.fast_generate output)
      puts "Successfully wrote #{file}"
    end
  end

  def title_from_html(text)
    file_no_ext = File.basename(text, '.md')
    return file_no_ext.tr('-', ' ')
  end


  def link_patterns(file, pattern_map)
    obj_file = Tempfile.new('')
    f = File.open(file, 'r')
    begin
      contents = f.read
      new_contents = pattern_map.reduce(contents) do |contents, (link, pattern)|
        contents.gsub(pattern, link)
      end
      obj_file.write(new_contents)
      obj_file.close
      FileUtils.cp(obj_file.path, file)
    ensure
      obj_file.unlink
      f.close
    end
  end

  def prepend(file, string)
    obj_file = Tempfile.new('')
    f = File.open(file, 'r')
    begin
      obj_file.write(string)
      obj_file.write(f.read)
      obj_file.close
      FileUtils.cp(obj_file.path, file)
    ensure
      obj_file.unlink
      f.close
    end
  end

  ghurl = "angrave/SystemProgramming/wiki"

  task :cleanup_wiki, [:folder] do |t, args|
    folder = args[:folder]
    if folder.nil?
      folder = wikibook_dir
      puts "Using default Folder #{folder}"
    end
    Dir.chdir(folder) do
      system 'git clean -f; git reset --hard HEAD'
    end
    bad_chars = '#,:"'
    old_filenames = Dir.glob("#{folder}/*.md")
    new_filenames = Marshal.load(Marshal.dump(old_filenames)).map do |filename|
      filename.downcase().tr(bad_chars, '')
    end
    pattern_map = Hash.new
    old_filenames.each do |file_name|
      file_no_ext = File.basename(file_name, '.md')
      title = title_from_html(file_name)
      regex_escaped = Regexp.escape(title)
      ext_name = File.extname(file_no_ext)
      html_escaped = URI.escape(file_no_ext)
      link = "<a class='wiki-link' href='./#{html_escaped}.html'>#{title}</a>"
      pattern_map[link] = /(\[\[\s*${regex_escaped}\s*\]\])/
    end

    temp_file = Tempfile.new('')
    temp_path = temp_file.path
    old_filenames.zip(new_filenames).each do |from_f, to_f|
      title = title_from_html(from_f)
      # On certain systems ruby errors in weird ways if
      # The files are the same case insensitive, so we
      # go roundabout
      begin
      FileUtils.mv(from_f, to_f, :force => true)
      rescue ArgumentError
      puts "Case insensitivity issue"
      FileUtils.mv(from_f, temp_path, :force => true)
      FileUtils.mv(temp_path, to_f, :force => true)
      end
      link_patterns(to_f, pattern_map)
      hyphens_added = title.tr(' ', '-')
      ghurl_added = "#{ghurl}/#{hyphens_added}"
      front_matter = "---\nlayout: doc\ntitle: \"#{title}\"\ngithuburl: \"#{ghurl_added}\"\n---\n\n"
      prepend(to_f, front_matter)
    end
    puts "Finished adding templates"
    temp_file.close
  end
end

task :test_html do
  Dir.mktmpdir {|dir|
    to_copy = Dir.glob("_site/*html")
    to_copy += ["_site/images", "_site/js", "_site/css", "_site/resources"]
    FileUtils.cp_r(to_copy, dir)
    options = {
      :assume_extension => true,
      :allow_hash_href => true,
      :href_ignore => [
        "#",
        '?'
      ],
      :http_status_ignore => [0],
      :url_ignore => [/https:\/\/github.com\/angrave\/SystemProgramming\/wiki\//, /wikibook/],
      :parallel => { :in_processes => 3},
    }
    HTMLProofer.check_directory(dir, options).run
  }
end

task :spell_check do
  md_files = Dir.glob('*.md')
  md_files += Dir.glob('_docs/*.md')

  open_dictionaries() do |dicts|
    Parallel.map(md_files, in_threads: Etc.nprocessors) do |md_file|
      check_spelling(md_file, dicts)
    end
  end
end

