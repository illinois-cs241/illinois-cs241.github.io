# Including only the changed build task
require 'rake'
require 'jekyll'
require 'html-proofer'
require 'nokogiri'
require 'open-uri'
require 'json'
require 'optparse'

is_travis = ENV['TRAVIS'] == 'true'

task :default do
  system('_scripts/before_script.sh')
  config = Jekyll.configuration({
    'source' => './',
    'destination' => './_site',
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
      puts "Need to include a file"
      next
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

end

task :test do
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
