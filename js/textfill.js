// http://jquery-textfill.github.io/
(function($) {
    $.fn.textfill = function(maxFontSize) {
        maxFontSize = parseInt(maxFontSize, 10);
        return this.each(function(){
            var ourText = $("span", this),
                parent = ourText.parent(),
                maxHeight = parent.height(),
                maxWidth = parent.width(),
                fontSize = parseInt(ourText.css("fontSize"), 10),
                multiplier = maxWidth/ourText.width(),
                newSize = (fontSize*(multiplier-0.1));
            ourText.css(
                "fontSize",
                (maxFontSize > 0 && newSize > maxFontSize) ?
                    maxFontSize :
                    newSize
            );
        });
    };
})(jQuery);
