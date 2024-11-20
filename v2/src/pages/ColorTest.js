import { getTriadicColors } from '../utils/colors.js';

export function ColorTestPage() {
    

    const html = `
        <div class="color-test-page">
            <h1>Color Test!</h1>
            <form id="generate-grid">
                <input type="number" min="1" max="8" id="grid-x" placeholder="x">
                <input type="number" min="1" max="8" id="grid-y" placeholder="y">
                <input type="submit" value="Generate Grid">
            </form>
            <div id="color_swatch">
                
            </div>
            
            <div class="centered">
                <h2>Triadic Colors</h2>
                <div class="flex-container">
                    <div class="triadic-square" id="triadic-2"></div>
                    <div class="triadic-square" id="triadic-1"></div>
                    <div class="triadic-square" id="triadic-3"></div>
                </div>
            </div>
        
        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const button = fragment.querySelector('#generate-grid');
    button.addEventListener('submit', generateGrid);

    return fragment;
}

function generateGrid() {
    event.preventDefault();
    //@ts-ignore
    const x = document.getElementById('grid-x').value;
    //@ts-ignore
    const y = document.getElementById('grid-y').value;

    const parent = document.getElementById('color_swatch');
    parent.innerHTML = '';
    for (let i = 0; i < x; i++) {
        let row = document.createElement('div');
        row.classList.add('flex-container');
        for (let j = 0; j < y; j++) {
            // create square
            const square = document.createElement('div');
            square.classList.add('colorswatch');
            square.style.backgroundColor = 'hsl(0 0% 50%)'
            square.onclick = swatchClick;
            row.appendChild(square);

            square.addEventListener('dragover', (event) => {
                event.preventDefault();
                return false;
            });

            square.addEventListener('dragenter', (event) => {
                square.classList.add('over');
            });

            square.addEventListener('dragleave', (event) => {
                square.classList.remove('over');
            });

            square.addEventListener('drop', (event) => {
                event.preventDefault();

                // @ts-ignore
                const draggedElementId = event.dataTransfer.getData("text");
                const colorElement = document.getElementById(draggedElementId);

                // if class mixingpot take the first child
                if (colorElement.classList.contains('mixingpot')) {
                    // @ts-ignore
                    square.style.backgroundColor = colorElement.firstChild.style.backgroundColor;
                }
                else {
                    // @ts-ignore
                    square.style.backgroundColor = colorElement.style.backgroundColor;
                }
                colorElement.remove();

                return false;
            })
        }
        parent.appendChild(row);
        
    }
    
}

function swatchClick() {
    const swatch = event.target;
    console.log('swatch clicked');

    //@ts-ignore
    const baseColor = swatch.style.backgroundColor;
    console.log(baseColor);

    const triadicColors = getTriadicColors(baseColor);

    const triadic1 = document.getElementById('triadic-1');
    const triadic2 = document.getElementById('triadic-2');
    const triadic3 = document.getElementById('triadic-3');

    triadic1.style.backgroundColor = baseColor;
    triadic2.style.backgroundColor = triadicColors[0];
    triadic3.style.backgroundColor = triadicColors[1];
}