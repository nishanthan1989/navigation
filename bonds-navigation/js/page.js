$(document).ready(function() {

   // BONDS AND CO

   $("#bonds_co").accordion({
      active: false,
      collapsible: true,
      animate: "easeInOutExpo"
   });


   // NAV STUFF

   //var selectedCat1 = "#nav_main";
   //var selectedCat2 = "#nav_women";
   var navLink = "";

   //Animate in first categories
   showNav($("#nav_main"));

   /* -- NAV BUTTON CLICK -- */
   $(".btn_nav").click(function() {

      // If this is not a direct link to a page then:
      if ($(this).data("link") != "direct") {

         // Animate other items
         var navContainer = $("#" + $(this).closest(".cat_container").attr("id"));
         navContainer.find(".btn_nav").not(this).each(function() {
            $(this).addClass("animateOut");
         });

         navLink = $("#nav_" + $(this).data("link"));

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
            "top": 0,
            "left": 0
         }, 0);
         navItem.addClass("clone"); // Handle other animations via CSS
         navContainer.css({"position": "absolute"}); // Added so incoming nav can position properly

         // Animate the selected category bar
         selectedBar.addClass("animateIn");
         // Animate change button
         selectedBar.children(".change").addClass("animateIn");

         // Wait for the clone animation to finish then;
         // remove and reset old nav
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

      } else {

         $(this).addClass("waiting")

      };

   });

   // Show new categories | Animate in
   function showNav(navLink) {
      navLink.removeClass("hide");
      navLink.find(".btn_nav").each(function(i){
         var menuBTN = $(this);
         setTimeout(function() {
            menuBTN.addClass("animateIn");
         }, 100*i);
      });
   };

   // Change buttons 1 (hack version)
   $("#selected_cat_1 .change").click(function() {

      // Show main nav
      $("#nav_main").toggle();
      showNav($("#nav_main"));

      // Current nav
      $("#nav_women").addClass("hide");
      $("#nav_women").find(".btn_nav").removeClass("animateIn");

      $("#nav_womens_bras").addClass("hide");
      $("#nav_womens_bras").find(".btn_nav").removeClass("animateIn");

      // Reset sub-category change 1
      $("#selected_cat_1").removeClass("animateIn");
      $("#selected_cat_1 .clone").remove();
      $("#selected_cat_1").children(".change").removeClass("animateIn");

      // Reset sub-category change 2
      $("#selected_cat_2").removeClass("animateIn");
      $("#selected_cat_2 .clone").remove();
      $("#selected_cat_2").children(".change").removeClass("animateIn");
   });

   // Change buttons 2 (hack version)
   $("#selected_cat_2 .change").click(function() {
      $("#nav_women").toggle();
      showNav($("#nav_women"));

      // Current nav
      $("#nav_womens_bras").addClass("hide");
      $("#nav_womens_bras").find(".btn_nav").removeClass("animateIn");

      $("#selected_cat_2").removeClass("animateIn");
      $("#selected_cat_2 .clone").remove();
      $("#selected_cat_2").children(".change").removeClass("animateIn");
   });


   /* -- HIDE/SHOW NAVIGATION ON SCROLL -- */

   // Hide .header_mobile on on scroll down
   var didScroll;
   var lastScrollTop = 0;
   var delta = 0;
   var navbarHeight = $('.header_mobile').outerHeight();

   $(window).scroll(function(event) {
      didScroll = true;
   });

   setInterval(function() {
      if (didScroll) {
         hasScrolled();
         didScroll = false;
      }
   }, 250);

   function hasScrolled() {
      var st = $(this).scrollTop();

      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta)
         return;

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight) {
         // Scroll Down
         $('.header_mobile').addClass('nav-up');
      } else {
         // Scroll Up
         if (st + $(window).height() < $(document).height()) {
            $('.header_mobile').removeClass('nav-up');
         }
      }

      lastScrollTop = st;
   }


   /* -- SCROLL UP SEARCH BAR ON CLICK -- */
   /*
   $( '#search' ).click(function() {
      $( 'html, body').animate({
         scrollTop: $( '#search' ).offset().top
      }, 300, 'easeOutCubic');

      $('.header_mobile').addClass('nav-up');
   });
   */

});
