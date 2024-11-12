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
export function IngredientComponent(IngredientProps) {
  /**
   * @param {IngredientProps} ingredientProps
   * @returns {IngredientProps}
   */
  function validateProps(ingredientProps) {
    const validTextures = ['grain', 'coarse', 'grain', 'smooth', 'slimy'];
    const errors = [];

    if (typeof ingredientProps !== 'object') {
      errors.push('The ingredient properties must be an object');
    }
    if (typeof ingredientProps.mixingTime !== 'number') {
      errors.push('The mixing time must be a number');
    }
    if (typeof ingredientProps.mixingSpeed !== 'number') {
      errors.push('The mixing speed must be a number');
    }

    if (typeof ingredientProps.color !== 'string') {
      errors.push('The color must be a string');
    }

    if (typeof ingredientProps.texture !== 'string') {
      errors.push('The texture must be a string');
    }

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