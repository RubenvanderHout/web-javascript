/**
 * A helper function to create and render a component
 * @param {Function} componentFn - The component function to render
 * @param {Element} refElement - The element to render the component into
 * @param {Object} [props] - Optional properties to pass to the component function
 */
export function createComponent(componentFn, refElement, props) {
    if (!refElement) {
        console.warn(`Could not render component: ${componentFn.name} on element ${refElement ? refElement.tagName : 'null'}`);
        return;
    }
    try {
        // Check if the componentFn accepts props, and pass them if so
        const component = props ? componentFn(props) : componentFn();
        refElement.replaceWith(component);
        return component;
    } catch (error) {
        console.error(`Error rendering component: ${componentFn.name}`, error);
        return null;
    }
}


export function generateRandomId() {
    const uniqueId = `id-${Date.now()}-${Math.random()}`;
    return uniqueId;
}

export function debounce(callback, delay) {
    let debounceTimeout;

    return function (...args) {
        clearTimeout(debounceTimeout); // Clear previous timeout
        debounceTimeout = setTimeout(() => {
            callback(...args); // Call the original callback with arguments
        }, delay);
    };
}

export function createObservable(initialValue) {
    let value = initialValue;
    let listeners = [];
    let valueName = null;
    let attribute = 'textContent';

    function getValue() {
        return value;
    }

    function setValue(newValue) {
        if (newValue !== value) {
            value = newValue;
            notify();
            updateBoundElements();
        }
    }

    function subscribe(callback) {
        listeners.push(callback);
        callback(value); // Call immediately with current value
    }

    function unsubscribe(callback) {
        listeners = listeners.filter(listener => listener !== callback);
    }

    function notify() {
        listeners.forEach(listener => listener(value));
    }

    function bindToElements(name, attr = 'textContent') {
        valueName = name;
        attribute = attr;
        updateBoundElements();
        notify();
    }

    function updateBoundElements() {
        if (valueName) {
            const boundElements = document.querySelectorAll(`[data-bind="${valueName}"]`);
            boundElements.forEach(el => {
                el[attribute] = value;
            });
        }
    }

    return {
        getValue,
        setValue,
        subscribe,
        unsubscribe,
        bindToElements,
        notify,
        updateBoundElements
    };
}
