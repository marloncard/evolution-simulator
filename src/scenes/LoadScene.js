import { CST } from "../CST";

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        })
    }
    init() {
        window.chart = null;
        window.options = null;
        window.dataPacket = {
            creatures : [],
            avgVision : [],
            avgSpeed : [],
            time: []
        }
    }
    loadImages() {
        this.load.setPath("./assets/image");

        for (let prop in CST.IMAGE) {
            this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
        }
    }
    loadAudio() {
        this.load.setPath("./assets/audio");

        for (let prop in CST.AUDIO) {
            this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
        }
    }
    loadSprites(frameConfig) {
        this.load.setPath("./assets/sprite");

        for (let prop in CST.SPRITE) {
            this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], frameConfig);
        }
    }
    loadHTML() {
        this.load.setPath("./assets/text");

        for (let prop in CST.TEXT) {
            this.load.html(CST.TEXT[prop], CST.TEXT[prop]);
        }
    }
    preload() {
        // load image, spritesheet, sound
        // this.loadAudio();
        //this.load.spritesheet("slime", "./assets/sprite/slime.png", {frameHeight: 16, frameWidth: 16});
        //load atlases
        this.load.atlas("slime", "./assets/sprite/slime.png", "./assets/sprite/slime.json")

        this.loadSprites({
            frameHeight: 16,
            frameWidth: 16
        });
        this.loadImages();
        this.loadHTML();

        // this.load.image("title_bg", "./assets/title_bg800.jpg");

        //this.load.audio("title_music", "./assets/some-song.mp3")

        // create loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        })

        /* 
        Loader Events:
            complete - when done loading everything
            progress - loader number progress in decimal
        */

        //simulate large load
        /*
        for (let i = 0; i < 100; i++) {
            this.load.spritesheet("grass_tile" + i, "./assets/grass_tile.png", {
                frameHeight: 32,
                frameWidth: 32
            });
        }
        */
        
        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })

        this.load.on("complete", () => {
            //this.scene.start(CST.SCENES.MENU, "Hello from Load Scene")
        });

        this.load.on("load", (file) => {
            console.log(file.src)
        })

    }
    create() {

            this.scene.start(CST.SCENES.MENU)
            
    }

}