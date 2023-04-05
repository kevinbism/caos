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

class Caos {
  constructor(...args) {
    const caos = this;
    let params = args[0];

    params = Object.assign(defaults, params !== undefined ? params : {});

    caos.options = params;

    if (params.init) {
      caos.init();
    }
  }

  init() {
    const caos = this;
    let observer = new IntersectionObserver(caos.visible);
    const targets = [...document.querySelectorAll('[data-caos]')];

    targets.map(element => {
      observer.observe(element);
    });
  }

  visible(entries) {
    entries.map(el => {
      if (el.isIntersecting) {
        el.target.classList.add('caos-animate');
      } else {
        el.target.classList.remove('caos-animate');
      }
    });
  }
}

export default Caos;
