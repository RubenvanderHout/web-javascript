// @ts-nocheck
import { generateRandomId } from "../utils/utils.js";

/**
 * @typedef {'grain'|'coarse'|'grain'|'smooth'|'slimy'} Texture
*/

/**
 * @typedef {Object} IngredientProps
 * @property {number} mixingTime The time to mix the ingredient in miliseconds.
 * @property {number} mixingSpeed The speed to mix the ingredient in miliseconds.
 * @property {string} color The color of the ingredient.
 * @property {Texture} texture The texture of the ingredient.
 * @type {IngredientProps}
 */

/**
 * @param {IngredientProps} ingredientProps
 * @returns {IngredientProps}
*/

export function IngredientComponent(ingredientProps) {
  /**
   * @param {IngredientProps} ingredientProps
   * @returns {IngredientProps}
   */
  function validateProps(ingredientProps) {
    const errors = [];

    if (!validTextures.includes(ingredientProps.texture)) {
      errors.push(`The texture must be one of the following: ${validTextures.join(', ')}`);
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    return ingredientProps;
  }
  validateProps(ingredientProps);

  const randomCode = generateRandomId();
  const validTextures = ['grain', 'coarse grain', 'smooth', 'slimy'];

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
