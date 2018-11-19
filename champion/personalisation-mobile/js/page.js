$(document).ready(function() {

   // Variables
   var currentSlide = '';
   var previewActive = false;

   //initialize menu swiper
   var swiperMenu = new Swiper('.swiper-menu', {
      slidesPerView: 'auto',
      centeredSlides: true,
      initialSlide: 1,
      slideToClickedSlide: true,
      touchRatio: 0,
   });

   //initialize clothing swiper
   var swiperClothing = new Swiper('.swiper-clothing', {
      slidesPerView: 'auto',
      centeredSlides: true,
      initialSlide: 1,
      spaceBetween: 10,

      navigation: {
         nextEl: '.swiper-clothing-next',
         prevEl: '.swiper-clothing-prev',
      },
   });

   //Add controllers
   swiperMenu.controller.control = swiperClothing;
   swiperClothing.controller.control = swiperMenu;

   // Close modal
   function closeModal() {
      $('#overlay').removeClass('visible');
   }

   //Open modal
   $('[href*=\'#modal\']').click(function(){

      //Slide to bottom of page
      $('html, body').animate({
         scrollTop: 0
      }, 200);

      if (currentSlide == '') {

         currentSlide = $(this).parent().attr('class').split(' ')[1];

         //Launch modal
         $('#overlay').addClass('visible');

         //initialize modal slider | Timer to fix bug
         setTimeout(function(){
            var swiperModal = new Swiper('.swiper-badge', {
               touchRatio: 0,

               pagination: {
                  el: '.swiper-pagination',
                  type: 'progressbar',
               },

               navigation: {
                  nextEl: '.swpr-mdl-btn-nxt',
                  prevEl: '.swpr-mdl-btn-prv',
               },
            });
         }, 600);

         //initialize vertical slider | Timer to fix bug
         setTimeout(function(){
            var swiperOptions = new Swiper('.swiper-options', {
               direction: 'vertical',
               slidesPerView: 'auto',
               freeMode: true,

               scrollbar: {
                  el: '.swiper-scrollbar',
               },

               mousewheel: true,
            });
         }, 800);

      } else {
         location.reload();
      }
   });

   //Close modal
   $('.close').click(function(){
      closeModal();
   });

   //Select badge position
   $('.option').click(function(){

      //Reduce product image size
      $('.position-image').addClass('active');

      //Hide position options - all .option
      $('.option').addClass('hidden');

      //Swap to Champion logo - this speific
      $(this).removeClass('hidden');
      $(this).addClass('logo');

      //Save visibility
      $('#save').removeClass('hidden');

      //Hide buttons
      $('.position-btn').removeClass('hidden')
   });

   //Move button
   $('.position-btn .move .btn').click(function() {

      //Reduce product image size
      $('.position-image').removeClass('active');

      //Hide position options
      $('.option').removeClass('hidden');

      //Swap to Champion logo
      $('.option').removeClass('logo');

      //Save visibility
      $('#save').addClass('hidden');

      //Hide buttons
      $('.position-btn').addClass('hidden')
   });

   //Save button
   $('#save').click(function(){
      closeModal();

      //Enable add to cart
      $('#cart').removeClass('disabled');
      $('#cart').addClass('btn-primary');

      //Disable add badge
      $('.' + currentSlide + ' .btn').removeClass('btn-primary');
      $('.' + currentSlide + ' .btn').text('Remove badge')

      //Add badge to swiper product
      $('.' + currentSlide + ' .badge').removeClass('hidden');

      //Slide to bottom of page
      $('html, body').animate({
         scrollTop: $(document).height()
      }, 500);

   });



});
