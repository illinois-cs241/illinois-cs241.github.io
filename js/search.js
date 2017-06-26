(function(){

  function surroundingText(string, position, length, numberSurrounding){
    let afterLength = position + length;
    var lhs = position - numberSurrounding < 0 ? 0 : position - numberSurrounding;
    while(lhs > 0 && string[lhs] !== ' ') lhs--;
    var rhs = afterLength + numberSurrounding > string.length ? string.length : afterLength + numberSurrounding;
    while(rhs < string.length && string[rhs] !== ' ') rhs++;
    return [string.slice(lhs, position), 
            string.slice(position, position+length), 
            string.slice(position+length, rhs)]
  }

"use strict";
function displayResults(lunrResults){
  console.log(lunrResults);
  const list = $(".results-list");
  list.empty();
  for(let i = 0; i < lunrResults.length; ++i){
    const res = lunrResults[i];
    var result = $('<div class="col-md-12 col-sm-12 col-xs-12 result-div"></div>');
    const link = $('<a class="result-link"></a>');
    link.attr('href', res.url+'.html');
    link.html(res.doc.title);
    result.html(link.wrap($('<div class="row"></div>')));
    let terms = Object.keys(res.metadata);
    for(let j = 0; j < terms.length; ++j){
      if(!('content' in res.metadata[terms[j]])) continue;
      if(!('position' in res.metadata[terms[j]].content)) continue;

      let positions = res.metadata[terms[j]].content.position;
      for(let k = 0; k < positions.length; positions++){
        let pos = positions[k][0];
        let content = surroundingText(res.doc.content, pos, terms[j].length, 20).map(decodeURIComponent);
        result = result.append($("<div class=\"row\"><code class='highlighter-rouge'>..." + content[0] + 
            "<span class='highlight-result'>" + content[1] + "</span>"
            + content[2] + "...</code></div>"));
        break;
      }
    }
    list.append(result.wrap("<div class='row'></div>"));
  }
}

$.get('/search_data.json', function(data){
  const mapping = {};
  const idx = lunr(function(){
    this.field('title', {boost: 2});
    this.field('content', {boost: 10});
    this.ref('url');
    this.metadataWhitelist = ['position'];
    const idx = this;
    for(let i = 0; i < data.length; ++i){
      const doc = data[i];
      if(doc.title !== 'Home'){
        mapping[doc.url] = doc;
        idx.add(doc);
      }
    }
  });
  $('.search').keyup(function() {
    const search = $('.search');
    const results = idx.search(search.val());
    const lunrResults = $.map( results, function( result ) {
      const obj = {}
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