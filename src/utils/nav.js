document.querySelector('.header')
  .addEventListener('click', function (e) {

    const target = e.target;
    if (target.classList.contains('link')) {
      let body = document.querySelector('body');
      let logoClass = document.querySelector('.logo');

      const { link } = target.dataset;

      if (link !== 'home') {
        body.classList.remove('home-section');
        logoClass.classList.remove('home-logo');

        mediaMatchToggleClass(link);

        gsap.fromTo("section", { opacity: 0 }, { opacity: 1, duration: 1 });
        gsap.fromTo(".about-me", { scale: .9 }, { scale: 1, duration: 1 });
        gsap.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 });
      } else {
        body.classList.add('home-section');
        logoClass.classList.add('home-logo');

        mediaMatchToggleClass(link);

      }
    }
  });

// Mobile nav event
document.querySelector('.nav-mobile .fa')
  .addEventListener('click', function (e) {

    const target = e.target;
    if (target.classList.contains('fa-bars')) {
      target.classList.add('show-nav');
      gsapOpenNav(target)
    } else {
      target.classList.remove('show-nav');
      gsapCloseNav(target);
    }

  });

// Close nav when link is clicked
document.querySelector('.nav')
  .addEventListener('click', function (e) {
    const target = e.target;
    if (target.classList.contains('link')) {
      mediaMatchCloseNav();
    }
  });

function gsapOpenNav(element) {
  const tl = gsap.timeline();

  tl.to(".nav", {
    height: 'auto',
    overflow: 'visible',
    duration: .4
  });

  tl.to(".gsap-link", {
    delay: .3,
    opacity: 1,
    visibility: 'visible',
    duration: .1
  }, .1);

  element.classList.remove('fa-bars');
  element.classList.add('fa-times');
}

function gsapCloseNav(element) {
  gsap.to(".gsap-link", {
    opacity: 0,
    visibility: 'hidden',
    duration: .1
  });

  gsap.to(".nav", {
    height: 0,
    overflow: 'hidden',
    duration: .3
  });

  element.classList.add('fa-bars');
  element.classList.remove('fa-times');

};

function mediaMatchCloseNav() {
  const mediaQuery = window.matchMedia("(max-width: 701px)");

  // Close nav on smaller screen
  if (mediaQuery.matches) {
    const element = document.querySelector('.fa-times');
    gsapCloseNav(element);
  }
}

function mediaMatchToggleClass(path) {
  let header = document.querySelector('.header');

  const mediaQuery = window.matchMedia("(min-width: 701px)");

  // Toggle class when screen greater than 700px
  if (mediaQuery.matches) {
    if (path === 'home') {
      header.classList.remove('flex-nav');
    } else {
      header.classList.add('flex-nav');
    }
  }
}

// Show home when logo is clicked
$('.logo').on('click', 'span', function (e) {
  const homeLink = $('a[href="#home"]');
  const target = e.target;
  const { link } = target.dataset;

  $('.active').removeClass('active');
  $('#' + link).addClass('active');
  homeLink.addClass('active');
});

// Show projects when porfolio home button is clicked
$('#portfolio').on('click', function (e) {
  const projectLink = $('a[href="#projects"]');
  const target = e.target;
  const { link } = target.dataset;

  $('.active').removeClass('active');
  $('#' + link).addClass('active');
  projectLink.addClass('active');

  $('body').removeClass('home-section');
  $('.logo').removeClass('home-logo');


  const mediaQuery = window.matchMedia("(min-width: 701px)");

  // Toggle class when screen greater than 700px
  if (mediaQuery.matches) {
    $('.header').addClass('flex-nav');
  }

})
