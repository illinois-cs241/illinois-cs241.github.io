# Including only the changed build task
require 'jekyll'
require 'html-proofer'

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
