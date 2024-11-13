export function MixingHallPage() {
    const html = `
        <div page-type="Mixing Hall" >
            <h1>Mixing Hall!</h1>
        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    return fragment;
}
