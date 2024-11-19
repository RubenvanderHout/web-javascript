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

export function reactive(object){
    const listeners = new Set();

    function wrapReactive(value) {
        // In order to make nested objects inside other objects reactive
        // we need to recursively wrap them in reactive
        if (value && typeof value === 'object') {
            return reactive(value);
        }
        return value;
    }

    const proxy = new Proxy(object, {
        get(target, key){
            const value = target[key];
            return wrapReactive(value); // Ensure nested objects/arrays are reactive
        },
        set(target, key, value) {
            target[key] = value;
            listeners.forEach(listenerCallback => listenerCallback());
            return true;
        }
    });

    proxy.subscribe = (listenerCallback) => listeners.add(listenerCallback);
    return proxy;
}

export function ref(initialValue) {
    // Wrap the value so the user doesn't need to make a object
    const obj = { value: initialValue };
    return reactive(obj);
}

export function computed(getterCallback) {
    const obj = { value: getterCallback() };
    // Uses getterCallback closure and recomputes to update the value
    const recompute = () => { obj.value = getterCallback(); };
    obj.subscribe = (listenerCallback) => listenerCallback(recompute);
    return obj;
}