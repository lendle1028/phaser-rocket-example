import Phaser from 'phaser'

export default class extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'goal');
    scene.add.existing(this);
    scene.physics.world.enable(this);
  }

  update () {
    
  }
}
