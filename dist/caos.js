let defaults = {
  init: true,
  offset: 500,
  delay: 0,
  easing: 'ease',
  duration: 400,
  once: true,
  animatedClassName: 'caos-animate',
};

class Caos {
  constructor(settings) {
    this.options = { ...defaults, ...settings };

    if (this.options.init) {
      this.initCaos();
      this.setOptions();
    }
  }

  initCaos = () => {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: this.options.offset / 1000,
    };

    let observer = new IntersectionObserver(this.visible, options);
    const targets = [...document.querySelectorAll('[data-caos]')];

    targets.map(element => {
      observer.observe(element);
    });
  };

  visible = entries => {
    entries.map(el => {
      let caosHTML = getEl(el.target);
      applyCustomOptions(caosHTML);
      if (el.isIntersecting) {
        el.target.classList.add(this.options.animatedClassName);
      } else {
        if (!this.options.once) el.target.classList.remove(this.options.animatedClassName);
      }
    });
  };

  setOptions = () => {
    const duration = this.options.duration;
    const delay = this.options.delay;
    const easing = this.options.easing;
    let body = getEl('body');

    body.style.cssText += `--caos-duration: ${duration}ms; --caos-delay: ${delay}ms; --caos-easing: ${easing}`;
  };
}

function getEl(el, context = document) {
  return typeof el === 'string' ? context['querySelector'](el) : el;
}

function applyCustomOptions(element) {
  const duration = element.dataset.caosDuration;
  const delay = element.dataset.caosDelay;
  const easing = element.dataset.caosEasing;

  if (duration) {
    element.style.cssText += `--caos-duration: ${duration}ms`;
  }

  if (delay) {
    element.style.cssText += `--caos-delay: ${delay}ms`;
  }

  if (easing) {
    element.style.cssText += `--caos-easing: ${easing}`;
  }
}
