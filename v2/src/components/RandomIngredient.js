// @ts-nocheck
import { generateRandomId } from "../utils/utils.js";
import { IngredientComponent } from "./Ingredient.js";
import { generateHSL } from "../utils/colors.js";

export function RandomIngredientComponent() {

    function generateProperties() {
        const color = generateHSL();
        const texture = generateTexture();
        const mixingTime = generateMixingTime();
        const mixingSpeed = generateMixingSpeed();
        const shape = generateShape();
        

        return {
            color,
            texture,
            mixingTime,
            mixingSpeed,
            shape
        };

    }

    return IngredientComponent(generateProperties());
}

function generateTexture() {
    const textures = ['grain', 'coarse grain', 'smooth', 'slimy'];
    const randomIndex = Math.floor(Math.random() * textures.length);
    return textures[randomIndex];
}

function generateMixingTime() {
    return (Math.floor(Math.random() * 4) + 1) * 1000;
}

function generateMixingSpeed() {
    return Math.floor(Math.random() * 10) + 1;
}

function generateShape() {
    const shapes = ['square', 'circle', 'triangle', 'hexagon'];
    const randomIndex = Math.floor(Math.random() * shapes.length);
    return shapes[randomIndex];
}