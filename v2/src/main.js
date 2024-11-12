import { App } from './App.js';
import { Router } from './Router.js';
import { PopulateNavigation } from './components/Navigation.js';

// Create a global object that stores routing and state
// @ts-ignore
window.application = {};
application.store = Router;

try {
    App(document.body);
} catch (error) {
    console.error(error);
}

// App is root component that gets the initial element to render to


window.addEventListener('DOMContentLoaded', async () => {
    PopulateNavigation();
});
