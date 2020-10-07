export class BasicButton extends Phaser.GameObjects.Sprite {
  constructor(config) {
    // Scene: required 
    if (!config.scene) {
      new Error('A scene is required');
    }
    // Key: required - image key of the sprite sheet
    if (!config.scene) {
      new Error('Image key of sprite sheet is required');
    }
    // up: optional - frame that is the normal default state
    if (!config.up) {
      config.up = 0;
    }
    // down: optional - frame that is the button press state
    if (!config.down) {
      config.down = config.up;
    }
    // over: optional - frame that is the mouse over state
    if (!config.over) {
      config.over = config.up;
    }
    // x: option - x position of the button

    // y: optional - y position of the button

    super(config.scene, 0, 0, config.key, config.up);
  }
}