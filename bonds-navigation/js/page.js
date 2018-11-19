$(document).ready(function() {

   /* -- NAV BUTTON CLICK -- */
   $(".btn_nav").click(function() {

      // Animate other items
      var navContainer = $("#" + $(this).closest(".cat_container").attr("id"));
      navContainer.find(".btn_nav").not(this).each(function() {
         $(this).addClass("zoom-out");
      });

      // If this is not equal to direct then:
      if ($(this).data("link") != "direct") {
         var animationLength = 300;
         var navLink = $("#nav_" + $(this).data("link"));
         
         // Animate clicked item
         var navItem = $(this).clone();
         var navStartingPos = $(this).offset();
         var selectedBar = $("#" + $(this).closest(".cat_container").data("selected"));
         var navEndPos = $(selectedBar).offset();
         $(this).css({
            "display": "none"
         });
         selectedBar.prepend(navItem.detach());
         navItem.css({
            "position": "absolute",
            "top": navStartingPos.top,
            "left": navStartingPos.left
         });
         navItem.animate({
            "top": navEndPos.top,
            "left": navEndPos.left
         }, animationLength, "easeOutQuint");
         navItem.addClass("cat_label"); // Handle most animations via CSS
         navContainer.css({
            "position": "absolute"
         })

         // Animate the selected category bar
         selectedBar.css({
            "height": "50px"
         });
         selectedBar.children(".change").css ({
            "height": "50px",
            "opacity": "100"
         });

         // Wait for animation to finish then remove and reset old nav
         setTimeout(function(){
            $(this).removeAttr("style");
            navContainer.removeAttr("style").css({
               "display": "none"
            });
            navContainer.find(".btn_nav").not(this).each(function() {
               $(this).removeClass("zoom-out");
            });
         }, animationLength);

         // Bring in new nav
         setTimeout(function(){
            showNav(navLink);
         }, 1);

      };

   });


   // Show navigation animations
   function showNav(navLink) {
      navLink.removeClass("hide");
      navLink.find(".btn_nav").css({
         "margin-top": "100px",
         "opacity": "0"
      });

      var delay = 200;
      var factor = delay / 3 * 2; // Increment delay by two thirds original delay
      navLink.find(".btn_nav").each(function(){
         $(this).delay(delay = delay + factor).animate({
            "margin-top": "0",
            "opacity": "100"
         }, 500, "easeOutQuint");
      });
   };

});
