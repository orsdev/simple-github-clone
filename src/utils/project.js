

let isActive = true;

/* 
This event is necessary for isotope-layout 
because isotope doesn't work on display:none dom
element.
*/
$('[data-link="projects"]').on('click', function (e) {

  // Stop isotope from re-initializing
  if (isActive === false) return;

  // Porfolio isotope and filter
  const portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    sortBy: 'random',
    layoutMode: 'fitRows'
  });

  portfolioIsotope.imagesLoaded(function () {
    portfolioIsotope.isotope('layout');
  })

  $('.portfolio-tabs li').on('click', function () {
    $(".portfolio-tabs li").removeClass('filter-active');
    $(this).addClass('filter-active');

    const selector = $(this).attr('data-filter');
    portfolioIsotope.isotope({
      filter: selector
    });

    return false;
  });


  if (isActive) {
    isActive = false;
  }

})
