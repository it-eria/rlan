$(".open-burger").on("click", function() {
	$("#myNav").css("width", "100%");
});

$(".close-burger").on("click", function() {
	$("#myNav").css("width", "0%");
});

$('.slider-section__main__block').slick({
	slidesToShow: 1,
  slidesToScroll: 1,
	arrows: false,
	autoplay: false,
  autoplaySpeed: 2000,  
});



///
$('*[data-js="tab-target"]').on('click', function(e) {
  e.preventDefault();
  var targetTab = $(this).attr('href');
  $(targetTab).addClass('active');
});

$('*[data-js="close-tab"]').on('click', function(e) {
  e.preventDefault();
  $('.sidebar-tab').removeClass('active');
});

// ----------------- Variables

wrapper   = $(".tabs");
tabs      = wrapper.find(".tab");
tabToggle = wrapper.find(".tab-toggle");

// ----------------- Functions

function openTab() {
	var content     = $(this).parent().next(".content"),
		activeItems = wrapper.find(".active");
	
	if(!$(this).hasClass('active')) {
		$(this).add(content).add(activeItems).toggleClass('active');
		wrapper.css('min-height', content.outerHeight());
	}
};

// ----------------- Interactions

tabToggle.on('click', openTab);

// ----------------- Constructor functions

/*$(window).load(function(){
  tabToggle.first().trigger('click');  
});*/



