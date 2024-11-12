// @ts-nocheck
export function DropableComponent() {

    const html = `
        <div class="droppable rectangle">

        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const droppable = fragment.querySelector('.droppable');

    droppable.addEventListener('dragover', (event) => {
        event.preventDefault();
        return false;
    });

    droppable.addEventListener('dragenter', (event) => {
        droppable.classList.add('over');
    });

    droppable.addEventListener('dragleave', (event) => {
        droppable.classList.remove('over');
    });

    droppable.addEventListener('drop', (event) => {
        event.preventDefault();

        const draggedElementId = event.dataTransfer.getData("text");
        const draggedElement = document.getElementById(draggedElementId);

        droppable.appendChild(draggedElement);

        return false;
    })


    return fragment;
}