// @ts-nocheck
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
    const width = Math.floor(Math.random() * 80) + 20;
    const height = Math.floor(Math.random() * 80) + 20;
    const borderRadius = Math.floor(Math.random() * 80); // higher than 50 results in a circle or ellipse
    const shape = `
        width: ${width}px;
        height: ${height}px;
        border-radius: ${borderRadius}%;
    `;
    return shape;
}