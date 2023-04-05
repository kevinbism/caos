let defaults = {
  init: true,
  offset: 120,
  delay: 0,
  easing: 'ease',
  duration: 400,
  disable: false,
  once: false,
  startEvent: 'DOMContentLoaded',
  animatedClassName: 'caos-animate',
};

function Caos(settings) {
  let params = { ...defaults, ...settings };

  if (params.init) {
    initCaos();
  }
}

function initCaos() {
  let observer = new IntersectionObserver(visible);
  const targets = [...document.querySelectorAll('[data-caos]')];

  targets.map(element => {
    observer.observe(element);
  });
}

function visible(entries) {
  entries.map(el => {
    if (el.isIntersecting) {
      el.target.classList.add('caos-animate');
    } else {
      el.target.classList.remove('caos-animate');
    }
  });
}
