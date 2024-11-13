export function MixingHallPage() {
    const html = `
        <div>
            <h1>Mixing Hall!</h1>
            <input></input>
        </div>
    `;
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);

    return fragment;
}
