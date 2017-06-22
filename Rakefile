# Including only the changed build task
require 'jekyll'

task :default do
  config = Jekyll.configuration({ 
    'source' => './', 
    'destination' => './_site' 
  })
  site = Jekyll::Site.new(config)
  Jekyll::Commands::Build.build site, config
  cp './.travis.yml', './_site/.travis.yml'
end
