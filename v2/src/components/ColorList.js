export function ColorListComponent() {


    const html = `
        <h1>Color List</h1>
    `
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);





    return fragment;
}