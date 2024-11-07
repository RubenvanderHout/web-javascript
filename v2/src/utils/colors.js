export function getTriadicColors(hslColor) {
    // Extract the HSL components from the input string
    const [h, s, l] = hslColor.match(/\d+/g).map(Number);

    // Calculate the two triadic colors
    const triadic1 = `hsl(${(h + 120) % 360}, ${s}%, ${l}%)`;
    const triadic2 = `hsl(${(h + 240) % 360}, ${s}%, ${l}%)`;

    return [triadic1, triadic2];
}

export function mixCMYK(cmykArray, index = 0, totals = [0, 0, 0, 0]) {
    // Base case: If we've gone through all the CMYK values
    if (index === cmykArray.length) {
        const count = cmykArray.length;
        return totals.map(total => total / count); // Average each component
    }

    // Accumulate the current CMYK values
    const [c, m, y, k] = cmykArray[index];
    totals[0] += c; // Add cyan
    totals[1] += m; // Add magenta
    totals[2] += y; // Add yellow
    totals[3] += k; // Add black

    // Recursive call for the next index
    return mixCMYK(cmykArray, index + 1, totals);
}

export function HSLToCMYK(h, s, l) {
    const [r, g, b] = HSLToRGB(h, s, l);
    return RGBToCMYK(r, g, b);
}

export function CMYKToHSL(c, m, y, k) {
    const [r, g, b] = CMYKToRGB(c, m, y, k);
    return RGBToHSL(r, g, b);
}

function HSLToRGB(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/3) return q;
            if (t < 1/2) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function RGBToHSL(r, g, b) {
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

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function RGBToCMYK(r, g, b) {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, m, y);

    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);

    return [c, m, y, k];
}

function CMYKToRGB(c, m, y, k) {
    let r = 255 * (1 - c) * (1 - k);
    let g = 255 * (1 - m) * (1 - k);
    let b = 255 * (1 - y) * (1 - k);

    return [Math.round(r), Math.round(g), Math.round(b)];
}
