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




//uses classList, setAttribute, and querySelectorAll
//if you want this to work in IE8/9 youll need to polyfill these
(function() {
  var d = document,
    accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
    setAria,
    setAccordionAria,
    switchAccordion,
    touchSupported = ('ontouchstart' in window),
    pointerSupported = ('pointerdown' in window);

  skipClickDelay = function(e) {
    e.preventDefault();
    e.target.click();
  }

  setAriaAttr = function(el, ariaType, newProperty) {
    el.setAttribute(ariaType, newProperty);
  };
  setAccordionAria = function(el1, el2, expanded) {
    switch (expanded) {
      case "true":
        setAriaAttr(el1, 'aria-expanded', 'true');
        setAriaAttr(el2, 'aria-hidden', 'false');
        break;
      case "false":
        setAriaAttr(el1, 'aria-expanded', 'false');
        setAriaAttr(el2, 'aria-hidden', 'true');
        break;
      default:
        break;
    }
  };
  //function
  switchAccordion = function(e) {
    e.preventDefault();
    var thisAnswer = e.target.parentNode.nextElementSibling;
    var thisQuestion = e.target;
    if (thisAnswer.classList.contains('is-collapsed')) {
      setAccordionAria(thisQuestion, thisAnswer, 'true');
    } else {
      setAccordionAria(thisQuestion, thisAnswer, 'false');
    }
    thisQuestion.classList.toggle('is-collapsed');
    thisQuestion.classList.toggle('is-expanded');
    thisAnswer.classList.toggle('is-collapsed');
    thisAnswer.classList.toggle('is-expanded');

    thisAnswer.classList.toggle('animateIn');
  };
  for (var i = 0, len = accordionToggles.length; i < len; i++) {
    if (touchSupported) {
      accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
    }
    if (pointerSupported) {
      accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
    }
    accordionToggles[i].addEventListener('click', switchAccordion, false);
  }


  ////calendar
  if($('.callendar').length > 0) {
    var callendarConfig = {
      months: {
        "en": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "ua": ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"]
      },
      days: {
        "en": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "ua": ["Пон", "Вт", "Сер", "Чт", "Пт", "Сб", "Нд"]
      }
    }
  
    var currentMonth = $('.callendar').attr("data-month");
    var currentYear = $('.callendar').attr("data-year");
    var currentLang = $('.callendar').attr("data-lang");
    var daysInWeek = 7;
    var weekends = $('.callendar').attr("data-weekend-days").split(',');

    $('.callendar__article .month-year .year').text(currentYear);
  
    function setMonth(month, lang) {
      var monthIndex = parseFloat(month) - 1;
      $('.callendar__article .month-year .month').text(callendarConfig.months[lang][monthIndex]);
    }
  
    function fillCells(lang, startDay) {
      var day = 0;
      var beginDay = 1;
      var dateStrFirst = callendarConfig.months.en[parseFloat(currentMonth) - 1] + ' 1,' + currentYear + ' 01:00:00';
      var startDay = new Date(dateStrFirst).getDay();
      var lastDay = new Date(parseFloat(currentYear), parseFloat(currentMonth), 0).getDate();
      $('.callendar .cells .date-cell').each(function(index) {
        $(this).find('.day').text(callendarConfig.days[lang][day]);
        if(index >= (startDay - 1) && beginDay <= lastDay) {
          $(this).find('.date').text(beginDay);
          for(var weekend = 0; weekend < weekends.length; weekend++) {
            if(weekends[weekend] == beginDay) $(this).css('color', 'orangered');
          }
          ++beginDay;
        }
        if(day < daysInWeek-1) ++day;
        else day = 0;
      });  
    }
  
    setMonth(currentMonth, currentLang);
    fillCells(currentLang);
  }
})();