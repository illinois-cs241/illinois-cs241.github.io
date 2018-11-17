#!/usr/bin/env ruby

# Number all figures in a document and prefix the caption with "Figure".
require "paru/filter"

figure_counter = 0;

Paru::Filter.run do 
  with "Plain" do |plain|
    p plain
  end
  with "Para" do |plain|
    p plain
  end
end

