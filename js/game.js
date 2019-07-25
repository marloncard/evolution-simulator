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
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 100,
            debug: true
        }
    },

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


let slime = "";
let timer = 0;

function preload () {
    // preload images, sounds & other assets
    //this.load.json('map', 'assets/grass.json')
    this.load.image('tileset', 'assets/TilesetGrass/overworld_tileset_grass.png');
    this.load.tilemapTiledJSON('map', 'assets/TilesetGrass/evo-tileset.json');
    //this.load.spritesheet('tiles', 'assets/grass.png', {frameWidth: 64, frameHeight: 64})
    this.load.multiatlas('slime', 'assets/slime.json', 'assets')
    this.load.spritesheet('slime_back', 'assets/slime1_back.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('slime_front', 'assets/slime1_front.png', {frameWidth: 16, frameHeight: 16});
    this.load.spritesheet('slime_side', 'assets/slime1_side.png', {frameWidth: 16, frameHeight: 16})
    this.load.spritesheet('slime_explode', 'assets/slime_explode.png', {frameWidth: 16, frameHeight: 16})
};
function create () {
    const map = this.make.tilemap({ key: 'map'});
    const tileset = map.addTilesetImage('evo-default', 'tileset')

    // Layers
    const baseLayer = map.createStaticLayer("Base", tileset, 0, 0);
    const treeLayer = map.createStaticLayer("Trees", tileset, 0, 0);
    const waterLayer = map.createStaticLayer("Water", tileset, 0, 0);
    const structureLayer = map.createStaticLayer("Structures", tileset, 0, 0);

    // Add organism to scene (full spritesheet) -- .setBounce(10).setFriction(0)
    this.slime = this.physics.add.sprite(400, 330,'slime', 'slime-05.png');


    // Create animations
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('slime', {prefix: 'slime-0', start: 5, end: 8, suffix: '.png'}),
        frameRate:5,
        repeat: -1
    })
    this.anims.create({
        key: 'north',
        frames: this.anims.generateFrameNames('slime', {prefix:'slime-0', start: 1, end: 4, suffix: '.png'}),
        frameRate:15,
        repeat: -1
    })
    this.anims.create({
        key: 'south',
        frames: this.anims.generateFrameNames('slime', {prefix:'slime-0', start: 5, end: 8, suffix: '.png'}),
        frameRate:15,
        repeat: -1
    })
    this.anims.create({
        key: 'west',
        frames: this.anims.generateFrameNames('slime', {prefix:'slime-', start: 09, end: 12, suffix: '.png'}),
        frameRate:15,
        repeat: -1
    })

    //Group of organisms
    this.organisms = this.physics.add.group({
        key: 'slime',
        repeat: 4,
        setXY: {
            x: 400,
            y: 300,
            stepX: 80,
            stepY: 20
        }
    });

    //scale organism
    // Phaser.Actions.ScaleXY(this.organisms.getChildren(), -0.10,-0.10);

    // Set speed
    Phaser.Actions.Call(this.organisms.getChildren(), function(organism) {
        organism.speed = Math.random() * 2 + 1;
        // make item interactive
        organism.setInteractive();

        // this.physics.add.collider(organism, treeLayer);
        // this.physics.add.collider(organism, waterLayer);
        
    }, this);

    locations = this.add.text(16, 16, 'location: 0, 0', { fontSize: '10px', fill: '#000' })
    this.orgLocations = this.add.group({
        //
    })

    this.slime.speed = 2;
    this.physics.world.bounds.width = map.widthInPixels-10;
    this.physics.world.bounds.height = map.heightInPixels-10;
    this.slime.setCollideWorldBounds(true);

    // Map Collisions
    this.physics.add.collider(this.slime, treeLayer);
    this.physics.add.collider(this.slime, waterLayer);

    this.physics.add.collider(this.organisms, treeLayer);
    this.physics.add.collider(this.organisms, waterLayer);
    this.physics.add.collider(this.organisms);
    // Specify property
    treeLayer.setCollisionByProperty({collide:true});
    waterLayer.setCollisionByProperty({collide:true});

    // Collision debugging (remove in production)
    // const debugGraphics = this.add.graphics().setAlpha(0.75);
    // treeLayer.renderDebug(debugGraphics, {
    //     tileColor: null,
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // });
    
    
    
};
function update () {

    // Slime movement
    this.slime.setVelocityX(-64)
    movementAnim(this.slime)

        // Organism movement
        let organisms = this.organisms.getChildren();
        let numOrganisms = organisms.length;
    
        for (let i = 0; i < numOrganisms; i++) {

            // movement
            movementAnim(organisms[i]);
  
            if (timer < 10) {
                if (i === 0 || i === 1) {
                    organisms[i].setVelocityY(64);  
                } else if (i === 2 || i === 3) {
                    organisms[i].setVelocityX(64)
                } else if (i === 5) {
                    organisms[i].setVelocity(0,0)
                }
            }

            


                if (organisms[i].y >= 599) {
                    organisms[i].setVelocityY(-64)
                    //organisms[i].anims.play('north', true);
                } else if (organisms[i].y <= 1) {
                    organisms[i].setVelocityY(64);
                    //organisms[i].anims.play('south', true);
                } else if (organisms[i].x >= 799) {
                    organisms[i].setVelocityX(-64);
                    //organisms[i].anims.play('west', true)
                } else if (organisms[i].x <= 1) {
                    organisms[i].setVelocityX(64);
                    //organisms[i].anims.play('west', true)
                    //organisms[i].flipX = true;
                } else {
                    randomMovement(organisms[i])
                }
                
    // if (organisms[i].x >= this.organismMaxX && organisms[i].speed > 0) {
            //     organisms[i].speed *= -0.25;
            // } else if (organisms[i].x <= this.organismMinX && organisms[i].speed < 0) {
            //     organisms[i].speed *= -0.25;
            // }
            timer++
        };

    //this.slime.y -= this.slime.speed
    //this.slime.anims.play('north', true);

}; 

function randomMovement(obj) {
    d = Math.random();
    if (d < 1 && d > 0.98) {
        obj.setVelocityY(64);
    } else if (d < 0.98 && d > 0.96) {
        obj.setVelocityY(-64);
    } else if (d < 0.96 && d > 0.94) {
        obj.setVelocityX(64);
    } else if (d < 0.94 && d > 0.92) {
        obj.setVelocityX(-64);
    }
};


function movementAnim(obj) {
    if(obj.body.velocity.y > 0) {
        obj.anims.play('south', true);
    } else if (obj.body.velocity.y < 0) {
        obj.anims.play('north', true);
    } else if (obj.body.velocity.x < 0) {
        obj.anims.play('west', true);
        obj.flipX = false;
    } else if (obj.body.velocity.x > 0) {
        obj.anims.play('west', true)
        obj.flipX = true;
    } else {
        obj.anims.play('idle', true)
    }

}