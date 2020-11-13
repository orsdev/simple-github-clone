function init() {

  // Get dom elements
  const loaderImg = document.querySelector('.loader img');
  const homeEffect = document.querySelector('.home-effect');
  const header = document.querySelector('.header');
  const tabContent = document.querySelector('.tab-content');

  // Remove classes
  loaderImg.classList.remove('d-none');
  homeEffect.classList.remove('d-none');
  header.classList.remove('d-none');
  tabContent.classList.remove('d-none');

  //load animation
  window.onload = function () {
    const master = gsap.timeline();
    const loader = hideLoader();

    // call typedText when loader is done
    loader.add(typedText);

    master
      .add(loader)
      .add(typedText)
      .add(animateNav)
      .add(animateHome);
  }
}

function typedText() {
  // TYPED JS EFFECT
  new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 50,
    showCursor: false
  });
}

function animateNav() {
  const mediaQuery = window.matchMedia("(min-width: 701px)");

  if (mediaQuery.matches) {
    gsap.fromTo(".gsap-link", {
      opacity: 0,
      y: -55
    }, {
      duration: 1,
      stagger: 0.3,
      opacity: 1,
      y: 55,
      ease: 'back',
    });
  } else {
    gsap.to(".gsap-link", {
      duration: .1,
      y: 55
    });
  }
}

function animateHome() {
  const tl = gsap.timeline();

  tl.fromTo(".logo", {
    opacity: 0,
  }, {
    duration: 1,
    opacity: 1,
    fontSize: '2rem',
    ease: 'back',
  });

  tl.fromTo(".job-title", {
    opacity: 0,
  }, {
    duration: 2,
    opacity: 1,
    ease: 'back',
  }, .4);

  tl.fromTo(".hero-social a", {
    opacity: 0,
    width: 0
  }, {
    duration: .7,
    opacity: 1,
    width: '50px',
    stagger: .2,
    ease: 'back',
  }, .4);

  tl.fromTo(".hero-button .btn", {
    opacity: 0,
    width: 0
  }, {
    duration: 1,
    opacity: 1,
    width: '120px',
    ease: 'back',
  }, .9);

  tl.fromTo('.home-effect img', {
    opacity: 0
  }, {
    duration: 'random(5, 6)',
    opacity: 'random(0, 0.5)',
    scale: 0,
    opacity: 1,
    rotate: 'random(40deg, -80deg)',
    y: '-=50',
    x: 'random(100, -50)',
    ease: 'back',
    stagger: {
      amount: 3,
      from: 'center',
      grid: 'auto',
      repeat: 20,
    }
  });

  return tl;
};

function hideLoader() {
  const tl = gsap.timeline();

  tl.to('.loader', {
    duration: 4.5,
    zIndex: '-1'
  });

  tl.to('.loader', {
    duration: .1,
    opacity: 0,
  });

  tl.to('.loader', {
    duration: .1,
    display: 'none',
  });

  return tl;
}

init();