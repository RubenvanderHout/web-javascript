export function ColorTestPage() {
    const gridSize = 5; // Define the size of the grid (5x5)
    let squaresHtml = '';

    for (let i = 0; i < gridSize * gridSize; i++) {
        squaresHtml += `<div class="droppable colortest" id="square-${i}"></div>`;
    }

    const html = `
        <div class="color-test-page">
            <h1>Color Test!</h1>
            <div class="grid-container">
                ${squaresHtml}
            </div>
        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    return fragment;
}