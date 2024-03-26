// Set type definitions for html and css files because TS-server wants it to be typed

declare module "*.html" {
    const content: string;
    export default content;
}

declare module "*.css" {
    const content: string;
    export default content;
}