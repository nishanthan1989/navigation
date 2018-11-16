$(document).ready(function() {

   // Scroll to search box
   $( '#search' ).click(function() {
      $( 'html, body').animate({
         scrollTop: $( '#search' ).offset().top
      }, 300, 'easeOutCubic');
   });

   // For easy prototyping I am re-directing the page. I do not actually want the page to re-direct
   $( '#search' ).keyup(function() {
      window.location.replace( 'search-index.html#search' );
   });

});
