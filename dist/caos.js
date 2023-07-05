let defaults = {
  init: true,
  offset: 500,
  delay: 0,
  easing: 'ease',
  duration: 400,
  once: true,
  animatedClassName: 'caos-animate',
  disableMobile: false,
};

class Caos {
  constructor(settings) {
    this.options = { ...defaults, ...settings };
    let matchMediaQuery = this.options.disableMobile ? window.matchMedia('(min-width: 768px)').matches : true;

    if (this.options.init && matchMediaQuery) {
      this.initCaos();
      this.setOptions();
    } else {
      this.destroy();
    }
  }

  initCaos = () => {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: this.options.offset / 1000,
    };

    let observer = new IntersectionObserver(this.visible, options);
    const targets = document.querySelectorAll('[data-caos]');

    for (const element of targets) {
      observer.observe(element);
    }
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

    const cssStyles = [`--caos-duration: ${duration}ms`, `--caos-delay: ${delay}ms`, `--caos-easing: ${easing}`];

    body.style.cssText += cssStyles.join('; ');
  };

  destroy = () => {
    const targets = document.querySelectorAll('[data-caos]');
    targets.forEach(element => {
      element.removeAttribute('data-caos');
    });
  };
}

function getEl(el, context = document) {
  return typeof el === 'string' ? context['querySelector'](el) : el;
}

function applyCustomOptions(element) {
  const duration = element.dataset.caosDuration;
  const delay = element.dataset.caosDelay;
  const easing = element.dataset.caosEasing;
  const cssTextArray = [];

  if (duration) {
    cssTextArray.push(`--caos-duration: ${duration}ms`);
  }

  if (delay) {
    cssTextArray.push(`--caos-delay: ${delay}ms`);
  }

  if (easing) {
    cssTextArray.push(`--caos-easing: ${easing}`);
  }

  element.style.cssText += cssTextArray.join('; ');
}
