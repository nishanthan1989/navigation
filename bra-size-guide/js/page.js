$(document).ready(function() {

   //initialize menu swiper
   var swiperSteps = new Swiper(".swiper-steps", {
      touchRatio: 0,
      spaceBetween: 30,
      autoHeight: true,

      pagination: {
         el: '.swiper-pagination',
         type: 'progressbar',
      },
   });

   $(".active-back").click(function(e) {
      swiperSteps.slidePrev();
   });

   $(".active-next").click(function(e) {
      swiperSteps.slideNext();
   });

   var swiperOptions = new Swiper('.swiper-options', {
      //initialSlide: 1,
      slidesPerView: 'auto',
      centeredSlides: true,
      slideToClickedSlide: true,
      spaceBetween: 15,

      autoplay: {
         delay: 1800,
         disableOnInteraction: true,
      },
   });

});
