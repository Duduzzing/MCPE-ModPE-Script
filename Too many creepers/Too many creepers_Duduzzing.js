/**
 *Too many creepers Script
 *
 *verson 1.0
 *
 *Made by Duduzzing
 *
 *제작자: 두두찡
 *
 *© Duduzzing. All rights reserved
 */

var rootDefault = "https://raw.githubusercontent.com/Duduzzing/MCPE-ModPE-Script/master/Too-many-creepers/skin/";

ModPE.overrideTexture("images/mob/cherry_creeper.png", rootDefault+"creepers/cherry_creeper.png");

ModPE.overrideTexture("images/mob/orange_creeper.png", rootDefault+"creepers/orange_creeper.png");

ModPE.overrideTexture("images/mob/lemon_creeper.png", rootDefault+"creepers/lemon_creeper.png");

ModPE.overrideTexture("images/mob/blue_creeper.png", rootDefault+"creepers/blue_creeper.png");

ModPE.overrideTexture("images/mob/mint_creeper.png", rootDefault+"creepers/mint_creeper.png");

ModPE.overrideTexture("images/mob/earth_creeper.png", rootDefault+"creepers/earth_creeper.png");
	
ModPE.overrideTexture("images/mob/gosty_creeper.png", rootDefault+"creepers/gosty_creeper.png");

ModPE.overrideTexture("images/mob/zombie_creeper.png", rootDefault+"creepers/zombie_creeper.png");

ModPE.overrideTexture("images/mob/skeleton_creeper.png", rootDefault+"creepers/skeleton_creeper.png");
	
ModPE.overrideTexture("images/mob/giant_creeper.png", rootDefault+"creepers/giant_creeper.png");

ModPE.overrideTexture("images/mob/little_creeper.png", rootDefault+"creepers/little_creeper.png");


for(var a=1; a <= 21; a++){

ModPE.overrideTexture(
"images/mob/rainbow_creeper"+a+".png", 
rootDefault+"rainbowCreeper/rainbow_creeper"+a+".png");

}


var rainbowCreeper=[];
var color=[];

function modTick(){
	rainbowCreeperAI();
	enderCreeperAI();
	}

function rainbowCreeperAI(){

rainbowCreeper.forEach(function(ent,i){
	
Entity.setMobSkin(ent,"/mob/rainbow_creeper"+ 		color[i]+".png");

color[i]++;
		
if(color[i]>=21){
	color[i]=1;
}
	}
	);
}


function enderCreeperAI(){
	
if(Entity.getMobSkin(Player.getPointedEntity())=="/mob/ender_creeper.png"){

var c= Player.getPointedEntity();

var x = Entity.getX(c)+Math.random()*10-5;
var z = Entity.getZ(c)+Math.random()*10-5;
var y;

for(var yy=Entity.getY(c);yy<128;yy++){
if(getTile(x,yy,z)==0){
y=yy;	
break;	
}
}
Entity.setPosition(c,x, y, z); 	
}	
}


function useItem(x, y, z,I, b){
	
switch(I){
	
case 280:
Level.explode(x, y, z,1);
break;

case 281:
Level.explode(x, y, z,5);
break;

case 282:
Level.explode(x, y, z,10);
break;

	}
}


function explodeHook(ent, x, y, z, power, onFire){
	
if(Entity.getEntityTypeId(ent)!=33) return;
if(Entity.getMobSkin(ent)=="/mob/creeper.png") return;

var type;

switch(Entity.getMobSkin(ent)){
	
	case "/mob/cherry_creeper.png":
	
	type=0;
	
	break;
	
	 	case "/mob/orange_creeper.png":
	 	
	 	type=1;
	
	break;
	
	 	case "/mob/lemon_creeper.png":
	 	
	 	 	type=2;
	 	
	break;
	
	 	case "/mob/blue_creeper.png":
	
	 	type=3;
	
	  break;
	
	 	case "/mob/mint_creeper.png":
	
	 	type=4;
	 	
	break;
	
	 	case "/mob/earth_creeper.png":
	
	 	type=5;
	
	break;
	
	 	case "/mob/gosty_creeper.png":
	
	 	type=6;
	
	break;
	
	 	case "/mob/zombie_creeper.png":
	
	 	type=7;
	
	break;
	
	case "/mob/skeleton_creeper.png":
	
	type=8;
	break;
	
	case "/mob/giant_creeper.png":
	type=9;
	break;
	
	case "/mob/creeper.png":
	type=10;
	break; 
	
	case "/mob/little_creeper.png":
	type=11;
	break;
	
	
	 default:
	 
	 type=Math.floor(Math.random()*11);
	 
	}
	
switch(type){	
	
case 0:
new java.lang.Thread( new java.lang.Runnable( { run: function() { 
	java.lang.Thread.sleep(100);
Level.setTile(x, y, z,10);
}})).start();
break;

case 1:

new java.lang.Thread( new java.lang.Runnable( { run: function() { 

java.lang.Thread.sleep(100);

for(var r=0;r<Math.random()*8;r++){
Level.dropItem(x, y, z, Math.random()*2,391);
}
}})).start();

break;

case 2:
new java.lang.Thread( new java.lang.Runnable( { run: function() { 

java.lang.Thread.sleep(100);

 for(var xx=x-2;xx<x+2;xx++){
for(var yy=y-2;yy<y+2;yy++){ 	
for(var zz=z-2;zz<z+2;zz++){ 	
	Level.setTile(xx, yy, zz,19);
}}}
}})).start();

break;

case 3:

Level.setTile(x, y, z,8);
break;

case 4:

preventDefault();
break;

case 5:

var ks;
new java.lang.Thread( new java.lang.Runnable( { run: function() { 

java.lang.Thread.sleep(100);

for(var yy=y;yy>0;yy--){
	if(Level.getTile(x, yy-1, z)!=0){
		ks= Level.getTile(x, yy-1, z);
		break;
		}
	}
		
for(var xx=x-2;xx<x+2;xx++){
for(var yy=y-2;yy<y+2;yy++){ 	
for(var zz=z-2;zz<z+2;zz++){ 	
	Level.setTile(xx, yy, zz,ks);
}}}
}})).start();
break;

case 6:

Level.explode(x, y, z,8);
break;

case 7:
new java.lang.Thread( new java.lang.Runnable( { run: function() { 
java.lang.Thread.sleep(100);
for(var skd=0;skd<Math.random()*4;skd++){
	
	Level.spawnMob(x, y, z,33);
	}

}})).start();
break;

case 8:
preventDefault();
new java.lang.Thread( new java.lang.Runnable( { run: function() { 
arrowBomb(x, y+2.5, z,5,8);
java.lang.Thread.sleep(100);
arrowArray.forEach(Entity.remove);
arrowArray=[];
}})).start();
break;



case 9: case 10: 
new java.lang.Thread( new java.lang.Runnable( { run: function() { 
java.lang.Thread.sleep(100);
mitosis(ent,x, y, z);
}})).start();
break;
	

case 11:
Level.explode(x, y,z,24);
break;

}

}



function entityAddedHook(ent){

creeper(ent);

}

function creeper(ent){
if(Entity.getEntityTypeId(ent)!=33) return;

var random=Math.floor(Math.random()*13);

switch(random){
	case 0:
	Entity.setMobSkin(ent,"/mob/cherry_creeper.png");
	break;
	
	 	case 1:
	Entity.setMobSkin(ent,"/mob/orange_creeper.png");
	break;
	
	 	case 2:
	Entity.setMobSkin(ent,"/mob/lemon_creeper.png");
	break;
	
	 	case 3:
	Entity.setMobSkin(ent,"/mob/blue_creeper.png");
	break;
	
	 	case 4:
	Entity.setMobSkin(ent,"/mob/mint_creeper.png");
	break;
	
	 	case 5:
	Entity.setMobSkin(ent,"/mob/earth_creeper.png");
	break;
	
	 	case 6:
	Entity.setMobSkin(ent,"/mob/gosty_creeper.png");
	break;
	
	 	case 7:
	Entity.setMobSkin(ent,"/mob/zombie_creeper.png");
	break;
	
	 case 8:
	Entity.setMobSkin(ent,"/mob/rainbow_creeper1.png");
	rainbowCreeper.push(ent);
	color.push(0);
	break;
	
	case 9:
	Entity.setMobSkin(ent,"/mob/ender_creeper.png");
	break;
	
	case 10:
	Entity.setMobSkin(ent,"/mob/skeleton_creeper.png");
	break;
	
	case 11:
	Entity.setMobSkin(ent,"/mob/giant_creeper.png");
	Entity.setHealth(ent,50);
  Entity.setRenderType(ent,giantCreeper.renderType);
  Entity.setCollisionSize(ent,1.8,2.8);
	break;
  
  case 12:
	Entity.setMobSkin(ent,"/mob/little_creeper.png");
	Entity.setHealth(ent,5);
	Entity.setRenderType(ent,littleCreeper.renderType);
	Entity.setCollisionSize(ent,0.8,0.8);
	break;

	}
}

function entityRemovedHook(ent){



for(var c in rainbowCreeper){
	
if(ent==rainbowCreeper[c]){
	rainbowCreeper.splice(c,1);
	break;
	}
	}

}


function mitosis(ent, x, y, z){


var ran=Math.ceil(Math.random()*2)+1;

switch( Entity.getMobSkin(ent) ){

case "/mob/giant_creeper.png":
for(var a=0;a<ran;a++) Level.spawnMob(x, y+1,z,33);

break;
 	
case "/mob/creeper.png":
Level.explode(x, y,z,9);
for(var a=0;a<ran;a++){
var c=Level.spawnMob(x, y+1,z,33,"/mob/little_creeper.png");
Entity.setRenderType(c,littleCreeper.renderType);
Entity.setCollisionSize(ent,0.8,0.8);
}

}

}

var arrowArray=[];

//thx to CIcodeinside

function arrowBomb(x, y, z, power, howMany){
//power는 1이 적당 강력하게 하려면 그 이상
//howMany는 작을수록 많이 발싸 됨 10이 적당 많이 발싸 하려면 5정도
	
	function absRangeX(y, p) {
		return (-1 * Math.sin(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
	};
	function absRangeY(y, p) {
		return (Math.sin(-p / 180 * Math.PI));
	};
	function absRangeZ(y, p) {
		return (Math.cos(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
	};
	for(var p=-20;p<60;p+=2*howMany){
		for(var ya=0;ya<360;ya+=3*howMany){
			var CI = Level.spawnMob(x + absRangeX(ya, p), y + absRangeY(ya, p) ,z + absRangeZ(ya, p) ,80);
			arrowArray.push(CI);			
			setVelX(CI, absRangeX(ya, p) * power / 4 + (power * Math.random() * absRangeX(ya, p)));
			setVelY(CI, absRangeY(ya, p) * power / 4 + (power * Math.random() * absRangeY(ya, p)));
			setVelZ(CI, absRangeZ(ya, p) * power / 4 + (power * Math.random() * absRangeZ(ya, p)));
		}
	}
}



function leaveGame()
{
	color=[];
	rainbowCreeper=[];
	arrowArray=[];
	}


function littleCreeperRender(renderer)
{
var head = renderer.getModel().getPart("head");
var body = renderer.getModel().getPart("body");
var rightArm = renderer.getModel().getPart("rightArm");
var leftArm = renderer.getModel().getPart("leftArm");
var rightLeg = renderer.getModel().getPart("rightLeg");
var leftLeg = renderer.getModel().getPart("leftLeg");

head.clear();
body.clear();
rightArm.clear();
leftArm.clear();
rightLeg.clear();
leftLeg.clear();

     
body.setTextureOffset(0,0);
body.addBox(-2, 11, -2, 4,4,4);

body.setTextureOffset(8,8);
body.addBox(-2, 15,-1, 4,6,2);

body.setTextureOffset(0,8);
body.addBox(0, 21, -2.5, 2,3,2);
body.addBox(-2, 21, -2.5, 2,3,2);
body.addBox(0, 21, 0.5, 2,3,2);
body.addBox(-2, 21, 0.5, 2,3,2);

}

var littleCreeper=Renderer.createHumanoidRenderer();

littleCreeperRender(littleCreeper);



function giantCreeperRender(renderer)
{
var head = renderer.getModel().getPart("head");
var body = renderer.getModel().getPart("body");
var rightArm = renderer.getModel().getPart("rightArm");
var leftArm = renderer.getModel().getPart("leftArm");
var rightLeg = renderer.getModel().getPart("rightLeg");
var leftLeg = renderer.getModel().getPart("leftLeg");

head.clear();
body.clear();
rightArm.clear();
leftArm.clear();
rightLeg.clear();
leftLeg.clear();

     
body.setTextureOffset(0,0);
body.addBox(-2, -21, -2, 4,4,4,6);




//완쪽 위부터 오른쪽 아래로

body.setTextureOffset(16,0);
body.addBox(-5, -8,-1, 2,2,2,3);

body.setTextureOffset(24,0);
body.addBox(3, -8,-1, 2,2,2,3);


body.setTextureOffset(16,4);
body.addBox(-5, 0,-1, 2,2,2,3);

body.setTextureOffset(24,4);
body.addBox(3, 0,-1, 2,2,2,3);


body.setTextureOffset(16,8);
body.addBox(-5, 8,-1, 2,2,2,3);

body.setTextureOffset(24,8);
body.addBox(3, 8, -1, 2,2,2,3);

body.setTextureOffset(0,8);
body.addBox(3, 15, -9, 2,2,2,3);
body.addBox(-5, 15, -9, 2,2,2,3);
body.addBox(3, 15, 7, 2,2,2,3);
body.addBox(-5, 15, 7, 2,2,2,3);

body.setTextureOffset(0,12);
body.addBox(0, 20, -12, 8,4,8);
body.addBox(-8, 20, -12, 8,4,8);
body.addBox(0, 20, 4, 8,4,8);
body.addBox(-8, 20, 4, 8,4,8);


}

var giantCreeper=Renderer.createHumanoidRenderer();

giantCreeperRender(giantCreeper);
















