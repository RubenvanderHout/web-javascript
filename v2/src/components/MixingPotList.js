export function MixingPotListComponent() {
    const html = `
        <div class="mixing-pot-list">

        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    return fragment;
}