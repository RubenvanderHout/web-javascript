/**
 * A helper function to create and render a component
 * @param {Function} componentFn - The component function to render
 * @param {Element} refElement - The element to render the component into
 */
export function createComponent(componentFn, refElement) {
    if(refElement){
        const component = componentFn();
        refElement.replaceWith(component);
    } else {
        console.warn(`Could not render component: ${componentFn.name} on element ${refElement.tagName}`);
    }
}

export function generateRandomCode(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&()_+[]{}|;:,.<>?';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
