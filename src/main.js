import { App } from './App.js';
import { InitRoutes, Router } from './Router.js';
import { getInitialLocation } from './services/weatherservice.js';
import { createComponent } from './utils/utils.js';

// Create a global object that stores routing and state
// @ts-ignore
window.application = {};


try {
    createComponent(App, document.getElementById("#app"));
} catch (error) {
    console.error("Error in App initialization:", error);
}

// Here you can call functions that need to be loaded after js has build all the html of the app
window.addEventListener('DOMContentLoaded', async () => {
    InitRoutes();
    Router();
    getInitialLocation();
});
