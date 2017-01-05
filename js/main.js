var params = {
    paths: {
      jquery:      '/lib/jquery-2.1.3.min/index',
      material:    '/lib/material-design-lite/material.min',
      foundation:  '/lib/foundation/js/foundation.min',
      analytics:   '/js/analytics',
      github:      '/js/github',
      textfill:    '/js/textfill',
      smoothscroll:'/js/smoothscroll',
      toc:         '/js/toc',
      lecture:     '/js/lectures',
      /* Has to be loaded from CDN for accessibility */
      MathJax:     'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML'
    },  
    shim: {
      foundation: ['jquery'],
      github: ['jquery'],
      toc: ['jquery'],
      smoothscroll: ['jquery'],
      textfill: ['jquery'],
      lecture: ['jquery'],
    },
    catchError:true
  };

try{
  
  require.config(params);

  require(['jquery', 'foundation'], function($){
      $(document).load(function() {
          $(this).foundation();
      });
    });
  require(['github', 'analytics', 'MathJax']);
}catch(e){
  console.log(e);
}


