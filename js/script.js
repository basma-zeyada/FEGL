

$(function(){
  $(window).on("scroll",function(){
    var top = $(this).scrollTop();
    $(".jumbotron").css("background-position-y",(top/-5));
    // $(".principles").css("background-position-y",(top/-5));
    debugger
    if( top >= 300){
      $(".navbar").removeClass("anim_nav")
    }else{
      $(".navbar").addClass("anim_nav")
    }
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

  /////// get today's date
  $("#form_date").val(getDate()[0] + "/" + getDate()[1] + "/" + getDate()[2])
})

function getDate(){
  var d = new Date()
  var day = d.getDate();
  var month = d.getMonth()+1
  var year = d.getFullYear();
  return [day,month,year];
}
function getFormData(){
  var dev_name = document.getElementById('dev_name').value;
  var element = document.getElementById('form_data');
  var opt = {
    margin:       10,
    filename:     dev_name,
  };
  html2pdf(element, opt);
}