import { CST } from "../CST";
import { Sprite } from "../Sprite";

export class PlayScene extends Phaser.Scene {
 
    constructor() {
        super({ 
            key: CST.SCENES.PLAY,
         });
    }
    preload() {

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
        frames: this.anims.generateFrameNames('slime', {prefix:'slime-', start: 9, end: 12, suffix: '.png'}),
        frameRate:15,
        repeat: -1
    })
    // Load map tiles
    this.load.image('tileset', './assets/maps/overworld_tileset_grass.png');
    this.load.tilemapTiledJSON('map', './assets/maps/evo-tileset.json');

    // Ouput files loaded to console
    this.load.on("load", (file) => {
        console.log(file.src)
    })
    
    }
    create() {
        //const map = this.make.tilemap({ key: 'map'});
        let map = this.add.tilemap('map');
        //const tileset = map.addTilesetImage('evo-default', 'tileset');
        let tileset = map.addTilesetImage('evo-default', 'tileset')

        // Layers
        let baseLayer = map.createStaticLayer("Base", tileset, 0, 0).setDepth(-1);
        let treeLayer = map.createStaticLayer("Trees", tileset, 0, 0);
        let waterLayer = map.createStaticLayer("Water", tileset, 0, 0);
        //const structureLayer = map.createStaticLayer("Structures", tileset, 0, 0).setDepth(0);

        let gameTime = 0;
        //let slime = this.physics.add.sprite(100, 330,'slime', 'slime-05.png');

        let slime = new Sprite(this, 100, 100, CST.SPRITE.SLIME)
        //this.physics.add.existing() //manual add
        window.slime = slime; // Add slime to window object to access from console.
        slime.setInteractive().setAlpha(0.5)
        this.input.on("gameobjectdown", this.onObjectClicked);
        
        this.organisms = this.physics.add.group({
            classType: Sprite,
            key: 'slime',
            repeat: 8,
            setXY: {
                x: 200,
                y: 300,
                stepX: 40,
                stepY: 0
            }
        });
        // this.organisms = this.physics.add.group()
        // this.organisms.add(slime)
        // Takes an array of objects and passes each of them to the given callback.
        Phaser.Actions.Call(this.organisms.getChildren(), function(organism) {
        // make item interactive
        organism.setInteractive();
        organism.setCollideWorldBounds(true);
        
        }, this);


        // this.physics.arcade.collide(this.organisms), (organism) => {
        //     organism.destroy();
        // }
        slime.setCollideWorldBounds(true);

        let timerText = this.add.text(16, 16, 'Timer: ' + 0, { fontSize: '10px', fill: '#fff' })
        let timer = this.time.addEvent({
            delay:1000,
            callback: () => {gameTime++; timerText.setText('Timer: ' + gameTime);},
            callbackScope: this,
            repeat: -1
        });
        
        let orgText = this.add.text(16, 100,'Slime List: ', { fontSize: '10px', fill: '#fff' } ).setDepth(10);

        // Map Collisions
        this.physics.add.collider(slime, treeLayer);
        this.physics.add.collider(slime, waterLayer);

        this.physics.add.collider(this.organisms, treeLayer);
        this.physics.add.collider(this.organisms, waterLayer);
        this.physics.add.collider(this.organisms);

        // Specify property
        treeLayer.setCollisionByProperty({collide:true});
        waterLayer.setCollisionByProperty({collide:true});

        //treeLayer.renderDebug(this.add.graphics)
         /*
        gameobject events:
            animationstart
            animationrepeat
            animationupdate
            animationcomplete
        */
        //    slime.on("animationupdate", () => {
        //        console.log("ahhhhh")
        //    });
        //    slime.on("animationupdate", () => {
        //     console.log("LEVELUP")
        // });

    }
    update(time, delta) { //delta 16.666 @ 60fps -- delta is fps in milliseconds
        // this.physics.world.collide(slime, slime, (slime) => {
        //     slime.destroy();
        // })
        this.timerText;
        this.movementAnim(slime);
        this.randomMovement(slime);

        let organisms = this.organisms.getChildren();
        // apply collision to group
        this.physics.world.collide(organisms)

        // apply collision to group & slime
        this.physics.world.collide(organisms, slime, (organisms, slime)=>{
            organisms.destroy()
            slime.destroy()
        })
        //console.log(slime.hp)
        let numOrganisms = organisms.length;
    
        for (let i = 0; i < numOrganisms; i++) {

            // if (slime.active === true) {
            //     //this.physics.accelerateToObject(organisms[i], slime)
            // }
            //console.log(organisms[i].hp)
            // movement
            this.movementAnim(organisms[i]);
            organisms[i].metabolise(1)
            this.randomMovement(organisms[i]);
            if (organisms[i].hp === 0) {
                organisms[i].destroy()
                numOrganisms = organisms.length
            }
        }

    }
    onObjectClicked(pointer, gameObject) {
        gameObject.setScale(1.5);
    }

    movementAnim(obj) {
        if (obj.active === true) {
            if(obj.body.velocity.y > 0) {
                obj.anims.play('south', true);
            } else if (obj.body.velocity.y < 0) {
                obj.anims.play('north', true);
            } else if (obj.body.velocity.x < 0) {
                obj.anims.play('west', true);
                obj.flipX = false;
            } else if (obj.body.velocity.x > 0) {
                obj.anims.play('west', true);
                obj.flipX = true;
            } else {
                obj.anims.play('idle', true);
            }
        }
    }

    randomMovement(obj) {
            if (obj.active === true) {
                const d = Phaser.Math.Between(0, 500)
                if (d < 100 && d > 95) {
                    obj.setVelocityY(64);
                    //obj.anims.play('north', true);
                } else if (d < 95 && d > 90) {
                    obj.setVelocityY(-64);
                    //obj.anims.play('south', true);
                } else if (d < 90 && d > 85) {
                    obj.setVelocityX(64);
                    //obj.anims.play('west', true);
                    //obj.flipX = true;
                } else if (d < 85 && d > 80) {
                    obj.setVelocityX(-64);
                    //obj.anims.play('west', true);
                    //obj.flipX = false; 
                } else if (d < 80 && d > 75) {
                    obj.setVelocity(0,0);
                }
            }
       
    };

    onEvent() {
        this.timerText.setText('Timer: ' + this.gameTime);
        console.log(this.gameTime)
    }

}

