"use strict";

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
    //placing the speak invocation inside a callback fixes ordering and onend issues.
    setTimeout(function () {
        speechSynthesis.speak(newUtt);
    }, 0);
};
var speaking = false;
const speak = function(){
    if(!('speechSynthesis' in window)){
        return;
    }
    if(speaking == true){
        speaking = false;
        return;
    }
    const cards = document.querySelectorAll('.card');
    const mapped = [];
    const removeSelector = function(node, selector) {
        const elems = node.querySelectorAll(selector);
        console.log(elems);
        while (elems[0]) {
            elems[0].parentNode.removeChild(elems[0]);
        }
    };
    for(let i = 0; i < cards.length; ++i){
        const copy = cards[i].cloneNode(true);
        removeSelector(copy, 'code');
        removeSelector(copy, 'h2');
        mapped.push(copy.textContent.replace(/\n*/i, '')
                    .replace('#', ' ')
                    .split(new RegExp('[;,.?]', 'g')));
    }
    const sentences = [].concat.apply([], mapped);
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
            scope(cards, i+1);
        });
    };
    speaking = true;
    scope(sentences, 0);
};
