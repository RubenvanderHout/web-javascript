// explaination of the formulas in this file: https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL

export function getTriadicColors(baseColor) {
    // Extract the HSL components from the input string
    const [r, g, b] = baseColor.match(/\d+/g).map(Number);
    const hslColor = rgbToHSL(r, g, b).join(', ');
    console.log(hslColor);

    const [h, s, l] = hslColor.match(/\d+/g).map(Number);

    // Calculate the two triadic colors
    const triadic1 = `hsl(${(h + 120) % 360}, ${s}%, ${l}%)`;
    const triadic2 = `hsl(${(h + 240) % 360}, ${s}%, ${l}%)`;

    return [triadic1, triadic2];
}

export function mixCMYK(rgbArray) {
    const cmykArray = rgbArray.map(([r, g, b]) => rgbToCMYK(r, g, b));
    let c = 0, m = 0, y = 0, k = 0;

    cmykArray.forEach(([c1, m1, y1, k1]) => {
        c = Math.min(c + c1, 1);
        m = Math.min(m + m1, 1);
        y = Math.min(y + y1, 1);
        k = Math.min(k + k1, 1);
    });

    return [c, m, y, k];
}


export function hslToCMYK(h, s, l) {
    const [r, g, b] = hslToRGB(h, s, l);
    return rgbToCMYK(r, g, b);
}

export function cmykToHSL(c, m, y, k) {
    const [r, g, b] = cmykToRGB(c, m, y, k);
    return rgbToHSL(r, g, b);
}

export function hslToRGB(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic (grey)
    } else {

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s; // determine how to calculate the saturation based on lightness
        let p = 2 * l - q;

        r = hueToRGB(p, q, h + 1 / 3);
        g = hueToRGB(p, q, h);
        b = hueToRGB(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    console.log(`rgbToHSL: ${h}, ${s}, ${l}`);

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function rgbToCMYK(r, g, b) {
    // Normalize RGB values to the range [0, 1]
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y); // Key (black) component

    // Handle edge case for pure black (K = 1)
    if (k === 1) {
        c = 0;
        m = 0;
        y = 0;
    } else {
        c = (c - k) / (1 - k);
        m = (m - k) / (1 - k);
        y = (y - k) / (1 - k);
    }

    console.log(`rgbToCMYK: ${c}, ${m}, ${y}, ${k}`);
    return [c, m, y, k];
}


export function cmykToRGB(c, m, y, k) {
    let r = 255 * (1 - c) * (1 - k);
    let g = 255 * (1 - m) * (1 - k);
    let b = 255 * (1 - y) * (1 - k);

    console.log(`cmykToRGB: ${r}, ${g}, ${b}`);

    return [Math.round(r), Math.round(g), Math.round(b)];
}


function hueToRGB(s, l, h) {
    if (h < 0) h += 1;
    if (h > 1) h -= 1;
    if (h < 1 / 6) return s + (l - s) * 6 * h;
    if (h < 1 / 3) return l;
    if (h < 1 / 2) return s + (l - s) * (2 / 3 - h) * 6;
    return s;
}

export function generateHSL() {
    return `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 100)}%, ${Math.floor(Math.random() * 100)}%)`;
}