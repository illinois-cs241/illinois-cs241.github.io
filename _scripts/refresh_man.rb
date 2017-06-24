#!/usr/bin/env ruby

require 'nokogiri'
require 'open-uri'
require 'json'

if ARGV.length == 0
	print "Must choose output file"
	exit
end
file = ARGV[0]
sections = [1, 2, 3, 4]
base_uri = 'https://linux.die.net/man/'
urls = sections.map{|e| base_uri + e.to_s + '/'}
output = Hash.new
urls.each do |url|
	page = Nokogiri::HTML(open(url)) 
	page.css('dt a').each do |link|
		output[link.inner_html] = url+link['href']
	end 
end
File.open(file, File::RDWR|File::CREAT, 0644) {|f|
  f.truncate 0
  f.write(JSON.fast_generate output)
  print "Successfully wrote #{file}"
}