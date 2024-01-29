## CAOS

[![license][license-image]][license-url]

Cube Animate On Scroll. La libreria leggera per i tuoi progetti. Pagina demo [qui][https://kevinbism.github.io/caos/].

## ⚙ Installazione

### Basic

Aggiungi lo stile in `<head>`:

```html
<link
  rel="stylesheet"
  href="caos.css"
/>
```

Include il file `javascript` nel tuo progetto:

```html
<script src="caos.js"></script>
```

Successivamente richiama l'oggetto Caos. I valori indicati sono quelli di default.

```js
const caos = new Caos({
  init: true,
  offset: 500,
  delay: 0,
  easing: 'ease',
  duration: 400,
  once: true,
  animatedClassName: 'caos-animate',
  disableMobile: false,
});
```

### Nuove funzionalità in arrivo

- Work in progress.

## 🤔 Come configurare Caos?

### 1. Inserisci l'animazione usando l'attributo `data-caos`:

```html
<div data-caos="fade-in"></div>
```

Puoi configurare singolarmente ogni elemento con i vari attributi `data-caos-*`:

```html
<div
  data-caos="fade-up"
  data-caos-delay="50"
  data-caos-duration="1000"
  data-caos-easing="ease-in-out"
></div>
```

#### Contributi

Clona la repository e aggiungi nuove funzionalità. Ogni contributo è ben gradito.

[license-image]: https://img.shields.io/npm/l/destyle.css.svg?style=flat-square
[license-url]: LICENSE
