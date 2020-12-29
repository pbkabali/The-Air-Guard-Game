(()=>{"use strict";var e={};e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var t;e.g.importScripts&&(t=e.g.location+"");var a=e.g.document;if(!t&&a&&(a.currentScript&&(t=a.currentScript.src),!t)){var s=a.getElementsByTagName("script");s.length&&(t=s[s.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),e.p=t})();const t=e.p+"011681cb3ed4e6b06094bdd21d0c5d0a.png";class a extends Phaser.Scene{constructor(){super({key:"MainMenu"})}preload(){this.load.image("bg",t)}create(){this.add.image(this.game.config.width/2,this.game.config.height/2,"bg").setScale(.5),this.scene.start("GamePlay")}}const s=a,i=e.p+"a2283d8ba338589d155091d7828732af.png";class r extends Phaser.GameObjects.Sprite{constructor(e,t,a,s){super(e,t,a,s),this.scene=e,this.scene.add.existing(this),this.scene.physics.world.enableBody(this,0),this.setData("isDead",!1)}}class c extends r{constructor(e,t,a,s,i,r){super(e,t,a,s),this.body.velocity.x=-Phaser.Math.Between(i,r)}}class n extends Phaser.Scene{constructor(){super({key:"GamePlay"})}preload(){this.load.image("bg",t),this.load.image("airplane",i)}create(){this.add.image(this.game.config.width/2,this.game.config.height/2,"bg").setScale(.5),this.strayPlanes=this.add.group(),this.time.addEvent({delay:500,callback:function(){const e=new c(this,this.game.config.width,Phaser.Math.Between(this.game.config.height/15,this.game.config.height/4),"airplane",200,500);e.setScale(.01*Phaser.Math.Between(5,20)),this.strayPlanes.add(e)},callbackScope:this,loop:!0})}}const h=n;class o extends Phaser.Scene{constructor(){super({key:"GameOver"})}preload(){this.load.image("bg",t)}create(){this.add.image(this.game.config.width/2,this.game.config.height/2,"bg").setScale(.5)}}const d=o;var g={type:Phaser.AUTO,width:window.innerWidth,height:window.innerHeight,backgroundColor:"black",physics:{default:"arcade",arcade:{gravity:{x:0,y:0}}},scene:[s,h,d],pixelArt:!0,roundPixels:!0};new Phaser.Game(g)})();