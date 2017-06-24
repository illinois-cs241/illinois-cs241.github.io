(function(){

"use strict";
function displayResults(lunrResults){
  console.log(lunrResults);
  const list = $(".results-list");
  list.empty();
  for(let i = 0; i < lunrResults.length; ++i){
    const res = lunrResults[i];
    const result = $('<li class="result"></li>');
    const link = $('<a class="link"></a>');
    link.attr('href', res.url+'.html');
    link.html(res.doc.title);
    result.html(link);
    list.append(result);
  }
}

$.get('/search_data.json', function(data){
  const mapping = {};
  const idx = lunr(function(){
    this.field('title', {boost: 5});
    this.field('content', {boost: 10});
    this.ref('url');
    this.metadataWhitelist = ['position'];
    const idx = this;
    for(let i = 0; i < data.length; ++i){
      const doc = data[i];
      mapping[doc.url] = doc;
      idx.add(doc);
    }
  });
  $('.search').keyup(function() {
    const search = $('.search');
    const results = idx.search(search.val());
    const lunrResults = $.map( results, function( result ) {
      const obj = {}
      console.log(result);
      obj.metadata = result.matchData.metadata;
      obj.url = result.ref;
      obj.doc = mapping[result.ref];
      return obj;
    });
    displayResults(lunrResults);
  });
  $('.loader').addClass('hidden');
  $('.search-page').removeClass('hidden');
})
.fail(function() {
  alert( "Data load error" );
})

})();