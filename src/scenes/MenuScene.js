import { CST } from "../CST";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    init() {

    }
    create() {
        this.add.image(0,0, CST.IMAGE.TITLE).setOrigin(0);
        
        let playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 20, CST.IMAGE.START).setDepth(1).setScale(0.10);
        playButton.alpha = 0.9;

        // // create audio
        // this.sound.pauseOnBlur = false;
        // this.sound.play("title_music", {
        //     loop: true
        // })


        /*
            PointerEvents:
                pointerover - hovering
                pointerout - not hovering
                pointerup - click and release
                pointerdown - just  click

        */

        playButton.setInteractive();

        playButton.on("pointerover", () => {
            playButton.setScale(0.12)
            playButton.clearAlpha();
        })

        playButton.on("pointerout", () => {
            playButton.setScale(0.10)
            playButton.alpha = 0.9;
            //this.scene.start();
        })

        playButton.on("pointerup", () => {
            this.scene.start(CST.SCENES.PLAY)
            playButton.setScale(0.10);
            playButton.clearAlpha();
        })
    }

}