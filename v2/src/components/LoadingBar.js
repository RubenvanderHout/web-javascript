import { generateRandomId } from "../utils/utils";

/**
 * @returns {[string, () => void]}
 */
function loadingBarComponent(){
    const randomCode = `loading-${generateRandomId()}`
    const html = `
        <div id="${randomCode}" class="loading-bar">
    `
    let width = 0;
    const element = document.getElementById(randomCode)
    function update(){
        width = (width + 1) % 101;
        element.style.width = width + "%";
    }
    update();


    return [html, update];
}