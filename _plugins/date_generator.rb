# Autogenerates the semester variable so sites auto-update
module Jekyll
  class SemesterGenerator < Generator
    def generate(site)
      now = Time.new
      sem_abbr = now.month > 7 ? 'fa' : 'sp'

      site.config['semester'] = sem_abbr + (now.year % 100).to_s
    end
  end
end
