// function($){
  // jQuery(function() {
    // Using string as string cat is handled well by browsers
    // https://stackoverflow.com/questions/51185/are-javascript-strings-immutable-do-i-need-a-string-builder-in-javascript
    var s = "";
    for (var i = 0; i < 40; i++){
      s += "Join Bonds & Me ";
    }

    jQuery(".marquee .inner").append(s);
    jQuery(".marquee").addClass('loaded');
  // });
// }(jQuery);
