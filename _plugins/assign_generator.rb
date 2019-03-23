##
# This file generates a dictionary that maps assignment url `extreme_edge_cases`
# To the metadata for that file from the 'assignments' folder.
# This helps each documents generation by allowing them to represent doc-specific
# variables while forcing the abstraction that semesterly things like due dates
# are in teh `assignments.yaml` file and the actual assignment content is in
# the docs

##
# This is a class that turns a bunch of enumerators into one

class Enumerator
  def self.concat(*enumerators)
    self.new do |y|
      enumerators.each do |e|
        e.each {|x| y << x }
      end
    end
  end
end

module Jekyll

  ##
  # This class does what is described above

  class AssignGenerator < Generator
    def generate(site)
      by_url = Hash.new
      assignments = site.data['assignments']
      new_enum = Enumerator.new { |y|
        assignments['mps'].each { |e| y << e }
        assignments['labs'].each { |e| y << e }
        assignments['honors'].each { |e| y << e }
      }
        new_enum.each do |assign_hash| 
        by_url[assign_hash['url']] = assign_hash
      end
      # Store it in a different variable to not conflict
      # With any other generator

      site.config['assign_by_url'] = by_url
    end
  end

end
