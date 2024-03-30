/**
 * Represents a block object with dimensions and type.
 * @class
 */
class Block {
 

    /**
     * @type {number}
     * @default 0
     */
    width = 0;

    /**
     * @type {number}
     * @default 0
     */
    height = 0;

    /**
     * @type {string}
     * @default ""
     */
    blockType = "";

    /**
     * @type {number}
     * @default 0
     */
    size

    /**
     * Constructs a new block object.
     * @param {string} blockType - The type of the block.
     * @param {number} size - The maximum size of the grid.
     */
    constructor(blockType, size) {
        this.blockType = blockType;
        this.size = size;
    }


}
