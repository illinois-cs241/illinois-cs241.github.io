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
      site.config['assign_by_url'] = by_url
    end
  end

end
