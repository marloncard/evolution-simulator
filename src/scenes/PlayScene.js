import { CST } from "../CST";
import { Sprite } from "../Sprite";

export class PlayScene extends Phaser.Scene {
 
    constructor() {
        super({ 
            key: CST.SCENES.PLAY,
         });
    }

    init(data) {
        console.log('init', data);
        this.slimeCount = data.slimeCount;
        this.mutationRate = data.mutationRate
        this.treeCount = data.treeCount
        
    }
    preload() {

    // Create animations
    // -- Idle Animation
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNames('slime', {prefix: 'slime-0', start: 5, end: 8, suffix: '.png'}),
        frameRate:5,
        repeat: -1
    })
    // -- North Animation
    this.anims.create({
        key: 'north',
        frames: this.anims.generateFrameNames('slime', {prefix:'slime-0', start: 1, end: 4, suffix: '.png'}),
        frameRate:15,
        repeat: -1
    })
    // -- South Animation
    this.anims.create({
        key: 'south',
        frames: this.anims.generateFrameNames('slime', {prefix:'slime-0', start: 5, end: 8, suffix: '.png'}),
        frameRate:15,
        repeat: -1
    })
    // -- West Animation
    this.anims.create({
        key: 'west',
        frames: this.anims.generateFrameNames('slime', {prefix:'slime-', start: 9, end: 12, suffix: '.png'}),
        frameRate:15,
        repeat: -1
    })
    // Load map tiles
    this.load.image('tileset', './assets/maps/overworld_tileset_grass.png');
    this.load.tilemapTiledJSON('map', './assets/maps/evo-tileset.json');
    this.load.image('tree', './assets/image/overworld-92.png');

    // Ouput files loaded to console
    // this.load.on("load", (file) => {
    //     console.log(file.src)
    // })
    
    }
    create() {
        // Initialize map
        let map = this.add.tilemap('map');
        // Initialize tileset
        let tileset = map.addTilesetImage('evo-default', 'tileset')

        // Layers
        let baseLayer = map.createStaticLayer("Base", tileset, 0, 0).setDepth(-1);
        //this.treeLayer = map.createStaticLayer("Trees", tileset, 0, 0);
        //let waterLayer = map.createStaticLayer("Water", tileset, 0, 0);
        //const structureLayer = map.createStaticLayer("Structures", tileset, 0, 0).setDepth(0);

        // Create empty physics group for trees
        this.trees = this.physics.add.group()

        // Add trees group to the window object to make accessible globally
        window.trees = this.trees;

        // Create n number of trees at random locations troughout the grid;
        for (let i = 0; i < this.treeCount; i++) { // Default 120

            let x = Phaser.Math.RND.between(0, 800);
            let y = Phaser.Math.RND.between(0, 600);

            this.trees.create(x, y, 'tree')
        };

        // Set tree hitbox size
        for (let tree of this.trees.getChildren()) {
            tree.setSize(10, 10)
        };

        this.gameTime = 0;
        this.nameCounter = 0;
        // Create organisms physics group and populate using this.slimeCount
        this.organisms = this.physics.add.group({classType: Sprite})
        for (let i = 0; i < this.slimeCount; i++) {
            let x = Phaser.Math.RND.between(100, 500);
            let y = Phaser.Math.RND.between(100, 300);

            this.organisms.create(x, y, 'slime')
            this.organisms.getChildren()[i].name = "Org" + this.nameCounter
            this.organisms.getChildren()[i].speed = Phaser.Math.Between(0, 20)
            this.organisms.getChildren()[i].vision = Phaser.Math.Between(0, 50)
            this.nameCounter++ 
        };
        // Add organisms group to the window object to make accessible globally
        window.organisms = this.organisms

        // Takes an array of objects and passes each of them to the given callback.
        Phaser.Actions.Call(this.organisms.getChildren(), function(organism) {
        // Make organisms interactive
        organism.setInteractive();
        // Set organism bounce
        organism.setBounce(0.5,0.5)
        // Set organism collision with world bounds
        organism.setCollideWorldBounds(true);
        }, this);

        // Create world timer text object
        let timerText = this.add.text(16, 16, 'Timer: ' + 0, { fontSize: '12px', fill: '#fff' })
        let timer = this.time.addEvent({
            delay:1000,
            callback: () => {this.gameTime++; timerText.setText('Timer: ' + this.gameTime);},
            callbackScope: this,
            repeat: -1
        });
        
        // Create button to show or hide organism text **FIX**
        let playButton = this.add.image(150, 22, CST.IMAGE.START).setDepth(1).setScale(0.75);
        playButton.alpha = 0.9;

        playButton.setInteractive();

        playButton.on("pointerover", () => {
            playButton.setScale(0.80)
            playButton.clearAlpha();
        })

        playButton.on("pointerout", () => {
            playButton.setScale(0.75)
            playButton.alpha = 0.9;
            //this.scene.start();
        })

        playButton.on("pointerup", (event) => {

            if (this.orgText.visible) {
                this.orgLabel.setVisible(false);
                this.orgText.setVisible(false);
                this.updateLabel.setVisible(false);
                this.updateText.setVisible(false);
            } else {
                this.orgLabel.setVisible(true);
                this.orgText.setVisible(true);
                this.updateLabel.setVisible(true);
                this.updateText.setVisible(true);  
            }

            playButton.setScale(0.75);
            playButton.alpha = 0.5;
        })

        // Create current organisms text object
        this.orgLabel = this.add.text(16, 42, 'THE LIVING', {fontSize: '13px', fill: '#000'}).setDepth(10).setVisible(false);
        this.orgLabel.setAlpha(0.75);
        this.orgText = this.add.text(16, 55, '', {fontSize: '12px', fill: '#fff'}).setDepth(10).setVisible(false);
        this.orgText.setAlpha(0.75);
        // Create organisms update text object
        this.updateLabel = this.add.text(400, 42, 'UPDATES', {fontSize: '13px', fill: '#000'}).setDepth(10).setVisible(false);
        this.updateLabel.setAlpha(0.75);
        this.updateText = this.add.text(400, 55, '', { fontSize: '12px', fill: '#fff' }).setDepth(10).setVisible(false);
        this.updateText.setAlpha(0.75);

        // Respawn trees
        let treeTimer = this.time.addEvent({
            delay: 20000,
            callback: this.regrowTrees,
            callbackScope: this,
            repeat: -1
        });

        // Map Collisions
        //this.physics.add.collider(slime, this.treeLayer);
        //this.physics.add.collider(slime, waterLayer);
        //this.physics.add.collider(this.organisms, this.treeLayer);
        this.physics.add.overlap(this.organisms, this.trees, this.collectTree, null, this);
        //this.physics.add.collider(this.organisms, waterLayer);
        this.physics.add.collider(this.organisms, this.organisms, ()=> {
            for (let org of this.organisms.getChildren()) {
                this.randomMovement(org);
            }
        });

        // this.physics.add.collider(this.organisms, this.organisms, ()=> {
        //     for (let org of this.organisms.getChildren()) {
        //         this.randomMovement(org);
        //     }
        // });

        // Create array to hold organism update data
        this.updateOutput = [];
        // Create timer that removes first item from array every 3 seconds 
        this.timedUpdate = this.time.addEvent({
            delay: 3000,
            callback: () => {this.updateOutput.shift()},
            callbackScope: this,
            loop: true
        });
        // Create timer that pushes graph data every 30 seconds
        this.graphUpdate = this.time.addEvent({
            delay: 30000,
            callback: this.pushGraph,
            callbackScope: this,
            loop: true
        })

        /*
        gameobject events:
            animationstart
            animationrepeat
            animationupdate
            animationcomplete
        */

    }
    update(time, delta) { //delta 16.666 @ 60fps -- delta is fps in milliseconds
        // this.physics.world.collide(slime, slime, (slime) => {
        //     slime.destroy();
        // })
        this.seconds = new Date().getUTCSeconds();
        this.slimeOutput = [];


        this.timerText;
        // this.movementAnim(slime);
        // this.randomMovement(slime);

        let organisms = this.organisms.getChildren();
        // apply collision to group
        //this.physics.world.collide(organisms)

        // apply collision to group & slime
        // this.physics.world.collide(organisms, slime, (organisms, slime)=>{
        //     organisms.destroy()
        //     slime.destroy()
        // })

        //console.log(slime.hp)
        let numOrganisms = organisms.length;
    
        for (let i = 0; i < numOrganisms; i++) {
            
            if (organisms[i].hp <= 50) {
                organisms[i].setScale(0.5);
            } else if (organisms[i].hp > 50 && organisms[i].hp <= 75 ) {
                organisms[i].setScale(0.75);
            } else if (organisms[i].hp > 75 && organisms[i].hp <= 100 ) {
                organisms[i].setScale(1.0);
            } else if (organisms[i].hp > 100 && organisms[i].hp <= 125) {
                organisms[i].setScale(1.25);
            } else if (organisms[i].hp > 125 && organisms[i].hp <= 150) {
                organisms[i].setScale(1.50);
            }
            
            // if (slime.active === true) {
            //     //this.physics.accelerateToObject(organisms[i], slime)
            // }
            //console.log(organisms[i].hp)

            // movement
            this.movementAnim(organisms[i]);
            organisms[i].metabolise(2, this.gameTime)
            organisms[i].senescense(this.gameTime)
            this.cloneSprite(organisms[i])


            if (organisms[i].body.velocity.x === 0 && organisms[i].body.velocity.y === 0 ) {
                this.randomMovement(organisms[i]);
            } else {
                for (let tree of this.trees.getChildren()) {
                    if (this.distanceToObject(organisms[i], tree) <= organisms[i].vision && tree.visible) {
                        //organisms[i].setVelocity(0, 0)
                        //console.log(this.distanceToObject(organisms[i], tree))
                        //console.log(organisms[i].vision)
                        this.physics.accelerateToObject(organisms[i], tree, 60, 25+organisms[i].speed, 25+organisms[i].speed)
                    }
                }
            }

        }

        // Death loop
        for (let org of this.organisms.getChildren()) {
            if (org.hp <= 0) {
                //console.log(org.name + " is dead :( at age " + org.age + "| Vision: " + org.vision + "| Speed: " + org.speed)
                this.updateOutput.push(org.name + " died at age " + org.age)
                org.destroy()
                numOrganisms = organisms.length
            }
        };

        // Update Organism list
        for (let org of this.organisms.getChildren()) {
            this.slimeOutput.push(org.name + ' Age: ' + org.age  + ' Gen: ' + org.generation + ' HP: ' + Math.round(org.hp) + ' Vision: ' + org.vision + ' Speed: ' + org.speed)
        }
        this.orgText.setText(this.slimeOutput);
        this.updateText.setText(this.updateOutput);
        if(this.updateOutput.length > 8) {
            this.updateOutput.shift()
        }
        this.colorSlimes()

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
                    obj.setVelocityY(35+obj.speed);
                } else if (d < 95 && d > 90) {
                    obj.setVelocityY(-35)-obj.speed;
                } else if (d < 90 && d > 85) {
                    obj.setVelocityX(35+obj.speed);
                } else if (d < 85 && d > 80) {
                    obj.setVelocityX(-35-obj.speed);
                } else if (d < 80 && d > 75) {
                    obj.setVelocity(0,0);
                }
            }
    }

    collectTree(sprite, tree) {
        tree.disableBody(true, true);
        sprite.hp += 10;
        if (sprite.hp > 150) {
            sprite.hp = 150;
        }
    };

    regrowTrees() {
        let trees = this.trees.getChildren()
        let numtrees = trees.length

        for (let i = 0; i < numtrees; i++) {
            if (this.seconds < 20 && i <= Math.ceil(this.treeCount / 3)) {
                trees[i].enableBody(false, trees[i].x, trees[i].y, true, true);
            } else if (this.seconds > 20 && this.seconds < 40 && i > Math.ceil(this.treeCount/3) && i < Math.ceil(this.treeCount/1.5)) {
                trees[i].enableBody(false, trees[i].x, trees[i].y, true, true);
            } else if (this.seconds > 40 && i > Math.ceil(this.treeCount/1.5)) {
                trees[i].enableBody(false, trees[i].x, trees[i].y, true, true);
            }

            //console.log("**Spring has sprung**")
        }
    };

    distanceToObject(obj1, obj2) {
        let distanceX = Math.abs(obj1.x - obj2.x)
        let distanceY = Math.abs(obj1.y - obj2.y)

        return distanceX + distanceY
    };

    colorSlimes() {
        for (let org of this.organisms.getChildren()) {
            if (org.speed > 9 && org.speed < 20) {
                org.setTint(0xff0000,0xffe600,0xffe600,0xffe600);
            } else if (org.speed > 19) {
                org.setTint(0xf75482)
            }
        }
    }

    cloneSprite(org) {
        if (org.age >= 2 && org.hp > 100) {
            let offspring = this.organisms.create(org.x, org.y, 'slime')
            org.hp = org.hp / 2;
            offspring.hp = org.hp / 2;
            offspring.name = "Org" + this.nameCounter;
            offspring.age = 0;
            offspring.vision = org.vision
            offspring.generation = org.generation + 1;
            this.updateOutput.push(offspring.name + " was born")
            let mutate = Math.random()
            if ( mutate < (this.mutationRate*0.01)) { // 20% chance of mutation
                if (mutate < 0.10) {
                    offspring.vision -= 3;
                    //console.log("**Vision Mutation -3 for " + offspring.name);
                    this.updateOutput.push(offspring.name + ' vision mutation -3');
                } else if (mutate > 0.10 && mutate < 0.21) {
                    offspring.vision += 3;
                    //console.log("**Vision Mutation +3 for " + offspring.name);
                    this.updateOutput.push(offspring.name + ' vision mutation +3')
                }
            };
            offspring.speed = org.speed
            mutate = Math.random()
            if ( mutate < (this.mutationRate*0.01)) { // Chance of mutation
                if (mutate < 0.10) {
                    offspring.speed -= 3;
                    //console.log("**Speed Mutation -3 for " + offspring.name);
                    this.updateOutput.push(offspring.name + ' speed mutation -3');
                } else if (mutate > 0.10 && mutate < 0.21) {
                    offspring.speed += 3;
                    //console.log("**Speed Mutation +3 for " + offspring.name);
                    this.updateOutput.push(offspring.name + ' speed mutation +3');
                }
            };
            if (offspring.speed < 0) {
                offspring.speed = 0;
            }
            if (offspring.vision < 0) {
                offspring.vision = 0;
            }
            this.nameCounter++;
            offspring.setInteractive()
            offspring.setCollideWorldBounds(true);
        }
    }

    pushGraph() {
        let orgArray = this.organisms.getChildren()
        let visionArray = [];
        let speedArray = [];
        for (let org of orgArray) {
            visionArray.push(org.vision)
            speedArray.push(org.speed)
        }
        window.dataPacket.avgVision.push(Math.round(visionArray.reduce((a,b)=>{return a+b})/visionArray.length))
        window.dataPacket.avgSpeed.push(Math.round(speedArray.reduce((a,b)=>{return a+b})/speedArray.length))
        window.dataPacket.creatures.push(orgArray.length)
        window.dataPacket.time.push(this.gameTime)
        if (window.dataPacket.time.length > 20) {
            window.dataPacket.avgVision.shift()
            window.dataPacket.avgSpeed.shift()
            window.dataPacket.creatures.shift()
            window.dataPacket.time.shift()
        }
        
    }

}
