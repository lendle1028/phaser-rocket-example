import Phaser from 'phaser'
import rocket from 'images/rocket.png'
import bomb from 'images/bomb.png'
import spritesheet_rocket_goright from 'images/spritesheet_rocket_goright.png'
import spritesheet_rocket_goleft from 'images/spritesheet_rocket_goleft.png'
import spritesheet_rocket_bombed from 'images/spritesheet_rocket_bombed.png'
import background from 'images/background.jpg'
import goal from 'images/goal.png'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'Boot' })
  }

  preload () {
    const progress = this.add.graphics()

    this.load.on('fileprogress', (file, value) => {
      progress.clear()
      progress.fillStyle(0xffffff, 0.75)
      progress.fillRect(700 - (value * 600), 250, value * 600, 100)
    })

    this.load.image('rocket', rocket);
    this.load.image('bomb', bomb);
    this.load.spritesheet('spritesheet_rocket_goright', 
      spritesheet_rocket_goright,
        { frameWidth: 150, frameHeight: 150 }
    );
    this.load.spritesheet('spritesheet_rocket_goleft', 
      spritesheet_rocket_goleft,
        { frameWidth: 150, frameHeight: 150 }
    );
    this.load.spritesheet('spritesheet_rocket_bombed', 
      spritesheet_rocket_bombed,
        { frameWidth: 150, frameHeight: 150 }
    );
    this.load.image('background', background);
    this.load.image('goal', goal);
  }

  create () {
    this.scene.start('Game')
  }
}
