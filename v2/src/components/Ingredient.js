// @ts-nocheck
import { generateRandomId } from "../utils/utils.js";

export function IngredientComponent() {

  const randomCode = generateRandomId();

  const html = `
    <div class="dot" id="${randomCode}" draggable="true"></div>
  `;
  const range = document.createRange();
  const fragment = range.createContextualFragment(html);
  const dot = fragment.querySelector('.dot');

  dot.addEventListener('dragstart', (event) => {
    dot.style.setProperty('opacity', '0.4');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.clearData();
    event.dataTransfer.setData('text/plain', event.target.id);
  });

  dot.addEventListener('dragend', (event) => {
    dot.style.setProperty('opacity', '1');
  });

  return fragment;
}