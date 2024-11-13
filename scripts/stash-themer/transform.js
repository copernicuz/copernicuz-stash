#!/usr/bin/env node

const fs = require('fs');
const postcss = require('postcss');

// Function to check if a declaration is color-related
function isColorDeclaration(decl) {
    const colorProps = ['color', 'background-color', 'border-color', 'fill', 'stroke', 'background'];
    const colorKeywords = ['rgb', 'rgba', 'hsl', 'hsla', 'linear-gradient', 'radial-gradient'];
    return colorProps.some(prop => decl.prop.includes(prop)) ||
        colorKeywords.some(keyword => decl.value.includes(keyword)) ||
        decl.value.includes('#') || // Check for hex colors
        decl.prop.startsWith('--'); // Keep custom properties
}

// Main transformation function
function transformCSS(css) {
    const root = postcss.parse(css);
    root.walkRules(rule => {
        const hasColorDecl = rule.some(decl => isColorDeclaration(decl));
        if (!hasColorDecl) {
            rule.remove();
        }
    });
    return root.toString();
}

// Read input file
const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
    console.error('Usage: node transform-css.js <input-file> <output-file>');
    process.exit(1);
}

fs.readFile(inputFile, 'utf8', (err, css) => {
    if (err) {
        console.error('Error reading input file:', err);
        process.exit(1);
    }

    // Transform CSS
    const result = transformCSS(css);

    // Write output file
    fs.writeFile(outputFile, result, err => {
        if (err) {
            console.error('Error writing output file:', err);
            process.exit(1);
        }
        console.log('CSS transformation complete.');
    });
});
