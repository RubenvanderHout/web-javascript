import { MixingHallPage } from "./pages/MixingHall.js";
import { ColorTestPage } from "./pages/ColorTest.js";

export const routes = [
    { path: '/', title: 'Home', page: MixingHallPage, showInNavbar: true },
    { path: '/mixinghall/1', title: 'Mixing hall 1', page: MixingHallPage, showInNavbar: true },
    { path: '/mixinghall/2', title: 'Mixing hall 2', page: MixingHallPage, showInNavbar: true },
    { path: '/colortest', title: 'Color test', page: ColorTestPage, showInNavbar: true },
];

let oldRoute = null;

export function InitRoutes(){
    const routerContainer = document.getElementById('router-container');
    routes.forEach((route) => {
        const id = route.path;
        const fragment = route.page();
        // Note this component structure is not ideal, it will only work if each page starts with an div
        const firstdiv = fragment.querySelector('div')
        // @ts-ignore
        firstdiv.setAttribute('id', id);
        // @ts-ignore
        firstdiv.style.display = 'none';
        routerContainer.appendChild(fragment);
    });
}


export function Router() {

    const path = window.location.pathname;
    const route = routes.find(route => route.path === path);

    if (!route) {
        // TODO actualy add an error page instead of throwing an error
        throw new Error("404 Page not found");
    }

    if(oldRoute){
        const oldElement = document.getElementById(oldRoute.path);
        oldElement.style.display = 'none';
    }

    try {
        const element = document.getElementById(route.path);
        element.style.display = 'block';
        oldRoute = route;
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
