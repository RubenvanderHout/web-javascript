/**
 * Loads data from file
 * @param {string} filePath - Filepath.
 * @throws { ElementNotFoundException }
 */
async function loadFileData(filePath) {
    try {
        const response = await fetch(filePath);
        const data = await response.text();
        
        return data;
        
    } catch (error) {
        console.error("Error occured loading file")
    }
}

/**
 * Loads page into the given element.
 * @param {string} pageName - ComponentName.
 * @param {string} targetElementId - TargetElementd 
 * @throws { ElementNotFoundException }
 */
export async function loadPage(pageName, targetElementId) {
    const htmlData = await loadFileData(`src/pages/${pageName}/${pageName}.html`)
    let targetElement = document.getElementById(targetElementId);

    if(!targetElement){
       throw new Error("Could not find given element")
    } 

    if(!htmlData){
        throw new Error("Element not found")
    }

    targetElement.innerHTML = htmlData
}
