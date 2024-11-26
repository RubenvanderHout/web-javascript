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
  console.log(ingredientProps);
  const randomCode = generateRandomId();
  const validTextures = ["grain", "coarse grain", "smooth", "slimy"];

  function validateProps(ingredientProps) {
    const errors = [];

    if (!validTextures.includes(ingredientProps.texture)) {
      errors.push(
        `The texture must be one of the following: ${validTextures.join(", ")}`
      );
    }

    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }

    return ingredientProps;
  }
  validateProps(ingredientProps);

  const html = `
    <div class="shape"
      id="ingredient-${randomCode}"
      draggable="true"
      texture="${ingredientProps.texture}"
      mixingSpeed="${ingredientProps.mixingSpeed}"
      mixingTime="${ingredientProps.mixingTime}"
      style="background-color: ${ingredientProps.color}; ${ingredientProps.shape}"
      color="${ingredientProps.color}"
      >

        <div popover id="popover-${randomCode}">
            <p>Texture: ${ingredientProps.texture}</p>
            <p>Color: ${ingredientProps.color}</p>
            <p>Mixing time: ${ingredientProps.mixingTime}</p>
            <p>Mixing speed: ${ingredientProps.mixingSpeed}</p>
        </div>

      </div>
  `;
  const range = document.createRange();
  const fragment = range.createContextualFragment(html);
  const shape = fragment.querySelector(".shape");

  // Handle drag start
  shape.addEventListener("dragstart", (event) => {
    shape.style.setProperty("opacity", "0.4");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.clearData();
    event.dataTransfer.setData("text/plain", event.target.id);
  });
  // Handle drag end
  shape.addEventListener("dragend", (event) => {
    shape.style.setProperty("opacity", "1");
  });
  shape.addEventListener("mouseover", (event) => {
    const popover = document.getElementById(`popover-${randomCode}`);
    popover.showPopover();
  });
  shape.addEventListener("mouseleave", (event) => {
    const popover = document.getElementById(`popover-${randomCode}`);
    popover.hidePopover();
  });

  return fragment;
}
