"use strict";

function onCopy(elem){
    const jqueryElem = $(elem)[0];
    const targetId = jqueryElem.rel;
    const target = $('#'+targetId)[0];
    // select the content
    var x = window.scrollX, y = window.scrollY;
    target.focus();
    window.scrollTo(x, y);
    target.setSelectionRange(0, target.value.length);
    try {
        document.execCommand("copy");
    } catch(e) {
        console.log(e);
    }
    $(elem).focus();
}