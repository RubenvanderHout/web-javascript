import { createObservable } from "../utils/utils.js";

export function DropableComponent() {

    const html = `
        <div class="droppable rectangle">

        </div>

        <div draggable="true" class="dot"></div>
    `;

    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    const dragable = fragment.querySelector('.dot');
    const droppable = fragment.querySelector('.droppable');

    let dragSrcEl = null;

    dragable.addEventListener('dragstart', () => {
        return false;
    })

    function handleDragStart(e) {
        console.log("drag start");


        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnd(e) {
        console.log("drag end");
        this.style.opacity = '1';

        // items.forEach(function (item) {
        //     item.classList.remove('over');
        // });
    }

    function handleDragOver(e) {
        e.preventDefault();

        console.log("drag over");

        return false;
    }

    function handleDragEnter(e) {
        console.log("drag enter");


        this.classList.add('over');
    }

    function handleDragLeave(e) {
        console.log("drag leave");

        this.classList.remove('over');
    }

    function handleDrop(e) {
        console.log("drop");

        e.stopPropagation();

        if (dragSrcEl !== this) {
            dragSrcEl.innerHTML = this.innerHTML;
            this.innerHTML = e.dataTransfer.getData('text/html');
        }

        return false;
    }

    dragable.addEventListener('dragstart', handleDragStart);
    dragable.addEventListener('dragover', handleDragOver);
    dragable.addEventListener('dragenter', handleDragEnter);
    dragable.addEventListener('dragleave', handleDragLeave);
    dragable.addEventListener('dragend', handleDragEnd);
    dragable.addEventListener('drop', handleDrop);

    return fragment;
}