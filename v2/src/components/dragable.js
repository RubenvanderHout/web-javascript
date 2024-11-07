export function DragableComponent() {

  const html = `
    <div class="dot" draggable="true"></div>
  `;
  const range = document.createRange();
  const fragment = range.createContextualFragment(html);
  const dot = fragment.querySelector('.dot');

  dot.addEventListener('dragstart', (event) => {
    console.log('dragstart');
  });

  return fragment;
}