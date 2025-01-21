const defaults = {
  init: true,
  offset: 500,
  delay: 0,
  easing: 'ease',
  duration: 400,
  once: true,
  animatedClassName: 'caos-animate',
  disableMobile: false,
  matchMedia: '768px',
};

class Caos {
  constructor(settings) {
    this.options = { ...defaults, ...settings };
    const matchMediaQuery = this.options.disableMobile
      ? checkIsDesktop() && window.matchMedia(`(min-width: ${this.options.matchMedia})`).matches
      : true;

    if (this.options.init && matchMediaQuery) {
      this.initCaos();
      this.setOptions();
    } else {
      this.destroy();
    }
  }

  initCaos = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: this.options.offset / 1000,
    };

    const observer = new IntersectionObserver(this.visible, options);
    const targets = document.querySelectorAll('[data-caos]');

    for (const element of targets) {
      observer.observe(element);
    }
  };

  visible = entries => {
    entries.map(el => {
      const caosHTML = getEl(el.target);
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
    const body = getEl('body');

    const cssStyles = [
      `--caos-duration: ${duration}ms`,
      `--caos-delay: ${delay}ms`,
      `--caos-easing: ${easing}`,
    ];

    body.style.cssText += cssStyles.join('; ');
  };

  destroy = () => {
    const targets = document.querySelectorAll('[data-caos]');
    for (const element of targets) {
      element.removeAttribute('data-caos');
    }
  };
}

function checkIsDesktop() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
  return !isMobile;
}

function getEl(el, context = document) {
  return typeof el === 'string' ? context.querySelector(el) : el;
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
