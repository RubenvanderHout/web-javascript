export function MixingPotComponent() {
    const html = `
        <div class="droppable rectangle">

        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const mixingPot = fragment.querySelector('.rectangle');

    mixingPot.addEventListener('dragover', (event) => {
        event.preventDefault();
        return false;
    });

    mixingPot.addEventListener('dragenter', (event) => {
        mixingPot.classList.add('over');
    });

    mixingPot.addEventListener('dragleave', (event) => {
        mixingPot.classList.remove('over');
    });

    mixingPot.addEventListener('drop', (event) => {
        event.preventDefault();

        // @ts-ignore
        const draggedElementId = event.dataTransfer.getData("text");
        const draggedElement = document.getElementById(draggedElementId);

        mixingPot.appendChild(draggedElement);

        return false;
    })


    return fragment;
}