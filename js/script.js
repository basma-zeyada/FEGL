$(function(){
  $(window).on("scroll",function(){
    var top = $(this).scrollTop();
    $(".jumbotron").css("background-position-y",(top/-5));
    $(".principles").css("background-position-y",(top/-5));
    
  })
  $(".start").on("click",function(e) {
    e.preventDefault();
    var intro_height = $(".jumbotron").outerHeight()
    $('html, body').animate({ scrollTop: intro_height }, 800);
  });

  $(".toggle_hint").on("click", function(e){
    e.preventDefault();
    $(this).find("i").toggleClass("fa-chevron-down").toggleClass("fa-chevron-up")
    $(this).next(".hint").slideToggle();
  })
})