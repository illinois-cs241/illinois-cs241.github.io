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

/* Speech support */
var speechUtteranceChunker = function (utt, settings, callback) {
    settings = settings || {};
    var newUtt;
    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
    if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
        newUtt = utt;
        newUtt.text = txt;
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
            }
            if (callback !== undefined) {
                callback();
            }
        });
    }
    else {
        var chunkLength = (settings && settings.chunkLength) || 160;
        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
        var chunkArr = txt.match(pattRegex);

        if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
            //call once all text has been spoken...
            if (callback !== undefined) {
                callback();
            }
            return;
        }
        var chunk = chunkArr[0];
        newUtt = new SpeechSynthesisUtterance(chunk);
        var x;
        for (x in utt) {
            if (utt.hasOwnProperty(x) && x !== 'text') {
                newUtt[x] = utt[x];
            }
        }
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
                return;
            }
            settings.offset = settings.offset || 0;
            settings.offset += chunk.length - 1;
            speechUtteranceChunker(utt, settings, callback);
        });
    }

    if (settings.modifier) {
        settings.modifier(newUtt);
    }
    console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
    //placing the speak invocation inside a callback fixes ordering and onend issues.
    setTimeout(function () {
        speechSynthesis.speak(newUtt);
    }, 0);
};
var speaking = false;
function speak(){
    if(!('speechSynthesis' in window)){
        return;
    }
    if(speaking == true){
        speaking = false;
        return;
    }
    const cards = $('.card').clone();
    const mapped = []
    for(let i = 0; i < cards.length; ++i){
    	let temp = $(cards[i]);
    	temp.find('code').remove();
    	temp.find('h2').remove();
        mapped.push(temp.text().replace(/\n*/i, '')
            .replace('#', ' ')
            .split(new RegExp('[;,.?]', 'g')));
    };
    console.log(mapped);
    const sentences = [].concat.apply([], mapped);
    console.log(sentences);
    let scope = function(cards, i){
        if(i == cards.length || !speaking){
            return;
        }
        
        const msg = new SpeechSynthesisUtterance(cards[i]);
        var voiceArr = speechSynthesis.getVoices();
        msg.voice = voiceArr[2];
        speechUtteranceChunker(msg, {
            chunkLength: 500
        }, function () {
            scope(cards, i+1)
        });
    }
    speaking = true;
    scope(sentences, 0);
}