document.querySelector('.header')
  .addEventListener('click', function (e) {

    const target = e.target;
    if (target.classList.contains('link')) {
      const { link } = target.dataset;

      if (link === 'about') {
        startAnimation();
      }
    }
  });

function skillsAnimation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.about-skill',
      start: 'top 80%',
      end: 'bottom top'
    }
  });

  tl.fromTo(".tech", {
    opacity: 0,
    visibility: 'hidden'
  }, {
    duration: .25,
    stagger: 0.2,
    opacity: 1,
    visibility: 'visible',

  });

  return tl;
}

function startAnimation() {
  gsap.timeline()
    .add(skillsAnimation);
}
