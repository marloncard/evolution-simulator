//import Organism from './organism.js'
//import Slime from './gameClasses.js'
/* 
Trees on tilemap source of food (collidable)
Pool source of water (collidable)
*/

const gameState = {}
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ababab',

    scene: {
        preload,
        create,
        update
    }


};
const game = new Phaser.Game(config);

const directions = {
    west: { offset: 0, x: -2, y: 0, opposite: 'east' },
    northWest: { offset: 32, x: -2, y: -1, opposite: 'southEast' },
    north: { offset: 64, x: 0, y: -2, opposite: 'south' },
    northEast: { offset: 96, x: 2, y: -1, opposite: 'southWest' },
    east: { offset: 128, x: 2, y: 0, opposite: 'west' },
    southEast: { offset: 160, x: 2, y: 1, opposite: 'northWest' },
    south: { offset: 192, x: 0, y: 2, opposite: 'north' },
    southWest: { offset: 224, x: -2, y: 1, opposite: 'northEast' }
};

const anims = {
    idle: {
        startFrame: 0,
        endFrame: 4,
        speed: 0.2
    },
    walk: {
        startFrame: 4,
        endFrame: 12,
        speed: 0.15
    },
    attack: {
        startFrame: 12,
        endFrame: 20,
        speed: 0.11
    },
    die: {
        startFrame: 20,
        endFrame: 28,
        speed: 0.2
    },
    shoot: {
        startFrame: 28,
        endFrame: 32,
        speed: 0.1
    }
};
let scene = null;

function preload () {
    // preload images, sounds & other assets
    //this.load.json('map', 'assets/grass.json')
    this.load.image('tileset', 'assets/TilesetGrass/overworld_tileset_grass.png');
    this.load.tilemapTiledJSON('map', 'assets/TilesetGrass/evo-tileset.json');
    this.load.spritesheet('tiles', 'assets/grass.png', {frameWidth: 64, frameHeight: 64})
    this.load.spritesheet('slime_back', 'assets/slime1_back.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('slime_front', 'assets/slime1_front.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('slime_side', 'assets/slime1_side.png', {frameWidth: 16, frameHeight: 16})
    this.load.spritesheet('slime_explode', 'assets/slime_explode.png', {frameWidth: 16, frameHeight: 16})
};
function create () {
    const map = this.make.tilemap({ key: 'map'});
    const tileset = map.addTilesetImage('evo-default', 'tileset')

    const baseLayer = map.createStaticLayer("Base", tileset, 0, 0);
    const treeLayer = map.createStaticLayer("Trees", tileset, 0, 0);
    const waterLayer = map.createStaticLayer("Water", tileset, 0, 0);
    const structureLayer = map.createStaticLayer("Structures", tileset, 0, 0);


    gameState.slime_front = this.add.sprite(400, 300, 'slime_front');


};
function update () {
    //
};

