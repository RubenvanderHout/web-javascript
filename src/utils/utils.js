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
        debounceTimeout = setTimeout(async () => {
            await callback(...args); // Call the original callback with arguments
        }, delay);
    };
}

export function reactive(object){
    const listeners = new Set();
    const proxy = new Proxy(object, {
        get(target, key){
            const value = target[key];
            return value;
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
    const listeners = new Set();
    const obj = { value: getterCallback() };

    const recompute = () => {
        const newValue = getterCallback();
        if (obj.value !== newValue) { // Update only if value changes
            obj.value = newValue;
            listeners.forEach(listenerCallback => listenerCallback());
        }
    };

    obj.subscribe = (listenerCallback) => {
        listeners.add(listenerCallback);
    };

    obj.trigger = recompute; // Allow external triggering of recomputation
    return obj;
}