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