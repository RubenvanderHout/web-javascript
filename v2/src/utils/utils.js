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
