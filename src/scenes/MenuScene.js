import { CST } from "../CST";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
    }
    init() {

    }
    preload() {
        //this.load.html('infoform', './assets/text/inputs.html');
    }
    create() {
        // Add title image
        this.add.image(0,0, CST.IMAGE.TITLE).setOrigin(0).setDepth;
        
        let text = this.add.text(10, 10, '', { color: 'black', fontFamily: 'Arial', fontSize: '32px '});
        
        // Render input elements
        let element = this.add.dom(this.game.renderer.width / 2, this.game.renderer.height / 2 + 150).createFromCache(CST.TEXT.INPUT).setDepth(2)
        element.addListener('click');
        this.slimeCount = "";
        this.mutationRate = "";
        this.treeCount = "";

        // Create "on click" event to pass form settings to variables
        element.on('click', function (event) {
            if (event.target.name === 'submitButton') {

                this.slimeCount = element.getChildByName('slimeCount').value;
                this.mutationRate = element.getChildByName('mutationRate').value;
                this.treeCount = element.getChildByName('treeCount').value;
                
                if (this.slimeCount.value !== '' && this.mutationRate.value !== '' && this.treeCount.value !== '') {
                    element.removeListener('click');
                    // Start "PLAY" scene and pass it form variables
                    this.scene.start(CST.SCENES.PLAY, 
                        {
                            slimeCount: this.slimeCount, 
                            mutationRate: this.mutationRate,
                            treeCount: this.treeCount
                        })
                }
            }  
        }, this);

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

    }

}
