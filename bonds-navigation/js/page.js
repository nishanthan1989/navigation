$(document).ready(function() {

   //var selectedCat1 = "#nav_main";
   //var selectedCat2 = "#nav_women";

   //Animate in first Categories
   showNav($("#nav_main"));

   /* -- NAV BUTTON CLICK -- */
   $(".btn_nav").click(function() {

      // Animate other items
      var navContainer = $("#" + $(this).closest(".cat_container").attr("id"));
      navContainer.find(".btn_nav").not(this).each(function() {
         $(this).addClass("animateOut");
      });

      // If this is not a direct link to a page then:
      if ($(this).data("link") != "direct") {

         var navLink = $("#nav_" + $(this).data("link"));

         // Make a clone of the clicked item
         var navItem = $(this).clone();
         var navStartingPos = $(this).offset();

         // Selected category container
         var selectedBar = $("#" + $(this).closest(".cat_container").data("selected"));
         var navEndPos = $(selectedBar).offset();

         // Hide original item
         $(this).toggle();

         // Clone and animate clone
         selectedBar.prepend(navItem.detach());
         navItem.css({
            "position": "absolute",
            "top": navStartingPos.top,
            "left": navStartingPos.left
         });
         navItem.animate({
            "top": navEndPos.top,
            "left": navEndPos.left
         }, 0);
         navItem.addClass("clone"); // Handle other animations via CSS

         navContainer.css({"position": "absolute"}); // Added so incoming nav can position properly

         // Animate the selected category bar
         selectedBar.addClass("animateIn");

         // Animate change button
         selectedBar.children(".change").addClass("animateIn");

         // Wait for the moving animation to finish, then remove and reset old nav
         setTimeout(function(){
            navContainer.removeAttr("style").toggle();
            navContainer.find(".btn_nav").each(function(i){
               $(this).removeClass("animateIn");
               $(this).removeClass("animateOut");
               $(this).removeAttr('style');
            });
         }, 100);

         // Bring in new categories
         setTimeout(function(){
            showNav(navLink);
         }, 100);

      };
   });

   // Show new categories | Animate in
   function showNav(navLink) {
      navLink.removeClass("hide");
      navLink.find(".btn_nav").each(function(i){
         var row = $(this);
         setTimeout(function() {
            row.addClass("animateIn");
         }, 100*i);
      });
   };

   //Test change buttons
   $("#selected_cat_1 .change").click(function() {
      $("#nav_main").toggle();
      showNav($("#nav_main"));
   });

   //Test change buttons
   $("#selected_cat_2 .change").click(function() {
      showNav($("#nav_women"));
   });

});
