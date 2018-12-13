$(document).ready(function() {

   var a = "";
   var b = "";
   var c = "";
   var d = "";

   for (var i = 0; i < 40; i++) {
      a += "Join Bonds & Me &nbsp;&nbsp;&nbsp;";
      b += "Alternate Apparel &nbsp;&nbsp;&nbsp;";
      c += "Personalise my Bonds &nbsp;&nbsp;&nbsp;";
      d += "Crop & wirefree &nbsp;&nbsp;&nbsp;";
   }

   $(".marquee").addClass('loaded');

   $(".m1 .inner").append(a);
   $(".m2 .inner").append(b);
   $(".m3 .inner").append(c);
   $(".m4 .inner").append(d);

});
