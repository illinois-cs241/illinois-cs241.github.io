"use strict";

function onCopy(elem){
	const targetId = "_hiddenCopyText_";
	const jqueryElem = $(elem).parent().clone();
	jqueryElem.find('.code-copy').remove()
	const text = jqueryElem.html();

	// Create a fake text area to copy
	const target = document.createElement("textarea");
    target.style.position = "absolute";
    target.style.left = "-9999px";
    target.style.top = $(document).scrollTop();
    target.id = targetId;
    console.log($(document).scrollTop());
    document.body.appendChild(target);
    target.textContent = text;

    // select the content
    const currentFocus = document.activeElement;
    var x = window.scrollX, y = window.scrollY;
    target.focus();
    window.scrollTo(x, y);
    target.setSelectionRange(0, target.value.length);
    try {
    	document.execCommand("copy");
    } catch(e) {
        console.log(e);
    }
    target.remove();
    $(elem).focus();
}