import Phaser from 'phaser'
import { Rocket, Bomb, Goal } from '../sprites'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'Game' })
  }

  goalReached(){
    this.add.text(300, 10, "You Win!", {fontSize: '32px', fill: 'yellow'});
    this.running=false;
  }

  create () {
    this.tileSprite = this.add.tileSprite(400, 300, 800, 600, "background");
    this.rocket = new Rocket(this, 400, 400);
    this.rocket.body.setCollideWorldBounds(true);
    this.goal=new Goal(this, 400, -5000);
    this.bombs=new Array();
    this.lastTick=-1;
    this.running=true;
    this.score=0;

    this.physics.add.overlap(this.rocket, this.goal, this.goalReached, null, this);

    let self=this;
    this.scoreText=this.add.text(550, 10, "Score: "+this.score, {fontSize: '32px', fill: 'red'});
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('spritesheet_rocket_goright', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('spritesheet_rocket_goleft', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'bombed',
      frames: this.anims.generateFrameNumbers('spritesheet_rocket_bombed', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
    this.input.on('pointermove', function(e){
      //self.physics.moveTo(self.rocket, e.x, e.y);
      if(!self.running){
        return;
      }
      self.rocket.setVelocity(0, 0);
      if(self.rocket.x!=e.x){
        self.rocket.setVelocityX((e.x-self.rocket.x)/2);
      }
      if(self.rocket.x<e.x){
        self.rocket.anims.play('right');
      }else if(self.rocket.x>e.x){
        self.rocket.anims.play('left');
      }
      
    });
  }

  update () {
    if(!this.running){
      return;
    }
    this.tileSprite.tilePositionY-=5;
    this.goal.setVelocityY(50);
   
    let newTick=new Date().getTime();
    if(this.bombs.length<15 && (newTick-this.lastTick)>300){
      let newBomb=new Bomb(this, Math.random()*10000%800,-200);
      newBomb.setVelocityY(100);
      this.bombs.push(newBomb);
      this.lastTick=newTick;
    }
    for(let bomb of this.bombs){
      if(Phaser.Math.Distance.Between(bomb.x, bomb.y, this.rocket.x, this.rocket.y)<50){
        console.log("bomb!!!!!!");
        //this.rocket.disableBody(true, true);
        this.rocket.anims.play('bombed');
        this.running=false;
      }
    }
    if(this.bombs[0].y>600){
      this.score=this.score+1;
      this.scoreText.setText("Score: "+this.score);
      this.bombs.shift();
    }
  }
}
