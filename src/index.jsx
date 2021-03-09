import { h, render } from 'preact';

import 'preact/devtools';
import 'preact/debug';

import App from './components/app';

import './index.scss';

function loadImage (src, alt = '') {
  return new Promise(function (resolve) {
    const image = document.createElement('img');

    image.setAttribute('alt', alt);
    image.setAttribute('src', src);

    image.addEventListener('load', function () {
      resolve(image);
    });
  });
}

async function preloadImages () {
  const imagesToPreload = [
    "button-border-down.png",
    "button-border-up.png",
    "editbox-border.png",
    "infocard-agi.png",
    "infocard-int.png",
    "infocard-str.png",
    "pulldown-arrow.png",
    "scourge-cinematic-border-bottom.png",
    "scourge-cinematic-border-top.png",
    "scourge-cursor.png",
    "scourge-esc-menu-bg.png",
    "scourge-esc-menu-border.png",
    "scourge-options-button-bg-disabled.png",
    "scourge-options-button-up-bg.png",
    "sentinels-cinematic-border-bottom.png",
    "sentinels-cinematic-border-top.png",
    "sentinels-cursor.png",
    "sentinels-esc-menu-bg.png",
    "sentinels-esc-menu-border.png",
    "sentinels-options-button-bg-disabled.png",
    "sentinels-options-button-down-bg.png",
    "sentinels-options-button-up-bg.png",
    "tooltip-border.png",
    "tooltip-gold.png",
    "tooltip-mana.png"
  ]

  for (const image of imagesToPreload) {
    await loadImage("/assets/textures" + image)
  }
}

const root = document.getElementById('root')

if (root) {
  preloadImages()
  render(<App />, root);
}