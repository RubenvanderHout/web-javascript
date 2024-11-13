import { MixingHallPage } from "./pages/MixingHall.js";
import { ColorTestPage } from "./pages/ColorTest.js";

export const routes = [
    { path: '/', title: 'Home', page: MixingHallPage, showInNavbar: true },
    { path: '/mixinghall/1', title: 'Mixing hall 1', page: MixingHallPage, showInNavbar: true },
    { path: '/mixinghall/2', title: 'Mixing hall 2', page: MixingHallPage, showInNavbar: true },
    { path: '/colortest', title: 'Color test', page: ColorTestPage, showInNavbar: true },
];


export function Router() {

    const path = window.location.pathname;
    const route = routes.find(route => route.path === path);

    if (!route) {
        // TODO actualy add an error page instead of throwing an error
        throw new Error("404 Page not found");
    }

    let pageFragment;
    try {
        pageFragment = route.page();
        // Swap the current page
        const content = document.getElementById('router-container');
        content.innerHTML = '';
        content.appendChild(pageFragment);

    } catch (error) {
        console.error(`Error rendering page: ${route.page.name}`, error);
    }
}

export function navigate(path) {
    window.history.pushState({}, "", path);
    Router(); // Load the new page
}

// Handle the user browser navigation by listening to the popstate event
window.addEventListener('popstate', Router);
