const gameState = {}
const config = {
    width: 800,
    height: 600,
    backgroundColor: '0xdda0dd',

    scene: {
        preload,
        create
    }


};
const game = new Phaser.Game(config);

function preload {
    // preload images, sounds & other assets
    this.load.spritesheet('slime_back', 'assets/slime1_back.png')
    this.load.spritesheet('slime_front', 'assets/slime1_front.png')
    this.load.spritesheet('slime_side', 'assets/slime1_side.png')
    this.load.spritesheet('slime_explode', 'assets/slime_explode.png')
};
function create {
    gameState.slime_front = this.add.spritesheet('400', '300', 'slime_front')
};
function update {
    //
};