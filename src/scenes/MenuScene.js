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
        this.add.image(0,0, CST.IMAGE.TITLE).setOrigin(0).setDepth;
        
        let text = this.add.text(10, 10, '', { color: 'black', fontFamily: 'Arial', fontSize: '32px '});
        
        // Input elements
        let element = this.add.dom(this.game.renderer.width / 2, this.game.renderer.height / 2 + 150).createFromCache(CST.TEXT.INPUT).setDepth(2)
        element.addListener('click');
        this.slimeCount = "";
        this.mutationRate = "";
        this.treeCount = "";


        element.on('click', function (event) {
            if (event.target.name === 'submitButton') {
                console.log(this === element)
                console.log(this.constructor.name)
                console.log(event.target.constructor.name)
                this.slimeCount = element.getChildByName('slimeCount').value;
                this.mutationRate = element.getChildByName('mutationRate').value;
                this.treeCount = element.getChildByName('treeCount').value;
                console.log(this.slimeCount)
                
                if (this.slimeCount.value !== '' && this.mutationRate.value !== '' && this.treeCount.value !== '') {
                    element.removeListener('click');
                    console.log(this.slimeCount)
                    console.log("clickety click!")
                    console.log(this === element)
                    console.log(this.constructor.name)
         
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

    // update () {
        
    //     console.log(this.slimeCount.value)
    // }
}
