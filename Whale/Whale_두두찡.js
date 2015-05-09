
Block.setLightLevel(8,15);
Block.setLightLevel(9,15);

var whaleArray=[];
var toMove = [];
var isSpouting = [];


var spoutTime = 200;


var cool = {
motion :[],
move : [],
spout :[],
breath : [],
ground : []
}


ModPE.overrideTexture("images/mob/whale.png","http://imgur.com/Zf7XHcr.png");

ModPE.setItem(512,"spawn_egg",3,"Whale spawner");

Player.addItemCreativeInv(512, 1, 0);


var whaleSpawner = 512;


function newLevel(){
whaleArray=[];
toMove = [];
isSpouting = [];

cool.motion=[];
cool.move=[];
cool.spout=[];
cool.breath=[];
cool.ground=[];

whaleAI();
}

function whaleAI(){

new java.lang.Thread(new java.lang.Runnable({ run: function(){

while(true){

try{
	
for(var a in whaleArray){

var ent=whaleArray[a];
var index=a;

var x=Entity.getX(ent);
var y=Entity.getY(ent);
var z=Entity.getZ(ent);

isInWater(x, y, z,index);
spout(ent,index);
move(ent, index);
 	
}

}catch(e){
clientMessage(e+" "+e.lineNumber);
}

java.lang.Thread.sleep(50);

}

}})).start();

}





function isInWater(x, y, z, index){

var water =[8,9];

var inWater;

for(var xx=x-1;xx<x+1;xx++){
for(var zz=z-1;zz<z+1;zz++){ 	

if(water.indexOf(
Level.getTile(xx, y, zz))+1){
inWater=true;
continue;
}
else{
inWater=false;
break;
}

}}


if(inWater){
cool.breath[index]++
cool.ground[index]=0;
}
if(!inWater){
cool.ground[index]++;
}

var breathTime = 260;

if(cool.breath[index]>breathTime){
	
var health = Entity.getHealth(whaleArray[index]);

Entity.remove(whaleArray[index]);	

spawnWhale(x, y-1, z, health,true, index);

cool.breath[index]=0;

}

if(cool.ground[index]>breathTime){

var at=Level.spawnMob(x, y, z,80);

Entity.setRenderType(at,0);

setVelY(at,4);

cool.ground[index]=breathTime-20; 	
}




}



function spout(whale, index){

cool.spout[index]++;

if(cool.spout[index] > spoutTime){

isSpouting[index] =true;

toMove[index][1]= 0.4;
	
cool.spout[index]=0;	
}


if(!isSpouting[index] ||
([8,9].indexOf(
Level.getTile(
Entity.getX(whale),
Entity.getY(whale)+1,
Entity.getZ(whale))
)+1) ){
 return;
}else

var x = Entity.getX(whale);
var y = Entity.getY(whale);
var z = Entity.getZ(whale);

Level.setTile(x, y+1,z,8);

java.lang.Thread.sleep(200);

Level.setTile(x, y+2,z,8);

java.lang.Thread.sleep(200);

Level.setTile(x, y+1,z,0);
Level.setTile(x, y+3,z,8);

java.lang.Thread.sleep(200);

Level.setTile(x, y+2,z,0);
Level.setTile(x, y+4,z,8);

Level.setTile(x+1, y+4,z,8);
Level.setTile(x-1, y+4,z,8);
Level.setTile(x, y+4,z+1,8);
Level.setTile(x, y+4,z-1,8);


java.lang.Thread.sleep(200);

Level.setTile(x, y+3,z,0);

Level.setTile(x+2, y+4,z,8);
Level.setTile(x-2, y+4,z,8);
Level.setTile(x, y+4,z+2,8);
Level.setTile(x, y+4,z-2,8);

java.lang.Thread.sleep(200);

Level.setTile(x, y+4,z,0);

java.lang.Thread.sleep(100);

Level.setTile(x+1, y+4,z,0);
Level.setTile(x-1, y+4,z,0);
Level.setTile(x, y+4,z+1,0);
Level.setTile(x, y+4,z-1,0);

java.lang.Thread.sleep(100);

Level.setTile(x+2, y+4,z,0);
Level.setTile(x-2, y+4,z,0);
Level.setTile(x, y+4,z+2,0);
Level.setTile(x, y+4,z-2,0);

isSpouting[index] = false;
}




function move(whale,index){

if(isSpouting &&
!([8,9].indexOf(
Level.getTile(
Entity.getX(whale),
Entity.getY(whale)+1,
Entity.getZ(whale)))+1)&&
([8,9].indexOf(
Level.getTile(
Entity.getX(whale),
Entity.getY(whale),
Entity.getZ(whale)))+1)
){
setVelY(whale,0);
 	}


if(cool.ground[index] > 0){
setVelX(whale,0);
setVelY(whale,-0.2);
setVelZ(whale,0);

toMove[index][1]=-0.2;

return;
}


cool.motion[index]++;

var du = 2;
var cren = false;
var ren;

switch(cool.motion[index]){

case du:
ren = 2;
break;

case du*2:
ren = 3;
break;

case du*3:
ren = 4;
break;

case du*4:
ren = 3;
break;

case du*5:
ren = 2;
break;

case du*6:
ren = 1;
break;

case du*7:
ren = 5;
break;

case du*8:
ren = 6;
break;

case du*9:
ren = 7;
break;

case du*10:
ren = 6;
break;

case du*11:
ren = 5;
break;

case du*12:
cool.motion[index]=0;
cren=true;
break;

default :
cren=true;
}

if(!cren) Entity.setRenderType(whale,
eval("whale"+ren+".renderType"));




function ran(){
	
var r= Math.floor(Math.random()*10);	

var l;
	
switch(r){

case 0: case 1: case 2:
l=0.2;
break;

case 3: case 4: case 5:
l=-0.2;
break; 	

default:
l=0;

}

return l;
}



if(cool.move[index]>80){
	
var wxx, wyy, wzz, ll;
wxx = ran();

var wyy;

for(var a=0;a<3;a++){

if([8,9].indexOf(
Level.getTile(
Entity.getX(whale),
Entity.getY(whale)+a,
Entity.getZ(whale)))+1){
	
wyy = ran();

continue;
} else{
	
wyy=-0.2;

break; 	
}

}

var wzz = ran();

toMove[index][0]=wxx;
toMove[index][1]=wyy;
toMove[index][2]=wzz; 	

cool.move[index]=0;

}


cool.move[index]++;

turn(whale, toMove[index][0], toMove[index][2]);

setVelX(whale, toMove[index][0]);
setVelY(whale, toMove[index][1] );
setVelZ(whale, toMove[index][2] );


}








function turn(ent,x, z){
	
var a=45;
var b=180;

if(x==0 &&z==-0.2)
Entity.setRot(ent,b,90);

if(x==0.2 && z==-0.2)
Entity.setRot(ent,a+b,90);

if(x==0.2 && z==0)
Entity.setRot(ent,a*2+b,90);

if(x==0.2 && z==0.2)
Entity.setRot(ent,a*3+b,90);

if(x==0 && z==0.2)
Entity.setRot(ent,a*4+b,90);

if(x==-0.2 && z==0.2)
Entity.setRot(ent,a*5+b,90);

if(x==-0.2 && z==0)
Entity.setRot(ent,a*6+b,90);

if(x==-0.2 && z==-0.2)
Entity.setRot(ent,a*7+b,90);

if(x==0 && z==0)
Entity.setRot(ent,b,90);

}



function spawnWhale(x, y, z, health, isReplacing, index){
	
var w = Level.spawnMob(x, y+1, z,11,
"/mob/whale.png");

Entity.setRenderType(w,
whale1.renderType);

Entity.setCollisionSize(w,2.8,0.8);

Entity.setHealth(w, health);

if(isReplacing){
	
whaleArray.splice(index,1,w)	
	
}
if(!isReplacing){

whaleArray.push(w);

toMove.push([null, null, null]);
isSpouting.push(false);

cool.motion.push(0);
cool.move.push(100);
cool.spout.push(0);
cool.breath.push(0);
cool.ground.push(0);

}


}


function removeWhale(index){
	
whaleArray.splice(index,1);

toMove.splice(index,1);
isSpouting.splice(index,1);

cool.motion.splice(index,1);
cool.move.splice(index,1);
cool.spout.splice(index,1);
cool.breath.splice(index,1);
cool.ground.splice(index,1); 	
}




function entityAddedHook(ent){
	
		
}

function entityRemovedHook(ent){

for(var w in whaleArray){
	
if(whaleArray[w]==ent){

removeWhale(w);

break;
	
}	
	
}

}





function useItem(x, y,z,I, b){
	if(I==whaleSpawner) spawnWhale(x, y, z, 800,false);
	
	}




function whaleRender1(ren){
	
var Model = ren.getModel();	
var head = Model.getPart("head");
var body = Model.getPart("body");
var rArm = Model.getPart("rightArm");
var lArm = Model.getPart("leftArm");
var rLeg = Model.getPart("rightLeg");
var lLeg = Model.getPart("leftLeg");

head.clear();
body.clear();
rArm.clear();
lArm.clear();
rLeg.clear();
lLeg.clear();  	

//body
body.setTextureOffset(24,0);
//body.addBox(-10, -6, -26, 20, 12, 52);

//f
body.setTextureOffset(0,10);
body.addBox(-10, -6, -26, 20, 12, 0);

//b
body.setTextureOffset(0-20,10);
body.addBox(-10, -6, -26+52, 20, 12, 0);

//t
body.setTextureOffset(24-26,0);
body.addBox(-10, -6, -26, 20, 0, 26);
body.addBox(-10, -6, -26+26, 20, 0, 26);

//b
body.setTextureOffset(24-26,0);
body.addBox(-10, -6+12, -26, 20, 0, 52/2);
body.addBox(-10, -6+12, -26+52/2, 20, 0, 52/2);

//l
body.setTextureOffset(0,10-20);
body.addBox(-10, -6, -26, 0, 12, 20);
body.addBox(-10, -6, -6, 0, 12, 20);
body.setTextureOffset(0,10-12);
body.addBox(-10, -6, 14, 0, 12, 12);

//r
body.setTextureOffset(0-20,10-20);
body.addBox(10, -6, -26, 0, 12, 20);
body.addBox(10, -6, -6, 0, 12, 20);
body.setTextureOffset(0-12,10-12);
body.addBox(10, -6, 14, 0, 12, 12);


//eyes

//l

for(var z=0;z<3;z++){
body.setTextureOffset(3+z,31-1); 	
body.addBox(-8.1, -3, -30+z, 0, 1, 1);
}

//r
body.setTextureOffset(3-3,31-3);
body.addBox(8.1, -3, -30, 0, 1, 3);


//head
body.setTextureOffset(2, 10);

//body.addBox(-8, -5, -48, 16, 8, 22);

//f
for(var x=0;x<16;x++)
body.addBox(-8+x, -5, -48, 1, 8, 0);

//top
body.setTextureOffset(6, 0);
body.addBox(-8, -5, -48, 16, 0, 22);


body.setTextureOffset(-1, 10);
//b
for(var z=0;z<22;z++){
body.addBox(-8, -5+8, -48+z, 8, 0, 1);
body.addBox(0, -5+8, -48+z, 8, 0, 1);
}

//l
for(var z=0;z<22;z++)
body.addBox(-8, -5, -48+z, 0, 8, 1);

//r
for(var z=0;z<22;z++)
body.addBox(8, -5, -48+z, 0, 8, 1);


//jaw

body.setTextureOffset(44,0);

//body.addBox(-7, 3, -46, 14, 2, 20);

//f
body.addBox(-7, 3, -46, 14, 2, 0);

body.setTextureOffset(16,0);
//bottom
body.addBox(-7, 5, -46, 14, 0, 20);

//l
body.setTextureOffset(44,4);
body.addBox(-7, 3, -46, 0, 2, 20);

//r
body.setTextureOffset(44-20,9);
body.addBox(7, 3, -46, 0, 2, 20);


//body2
//body.addBox(-6, -4, 26, 12, 7, 14);

//t
body.setTextureOffset(24-14, 0);
body.addBox(-6, -4, 26, 12, 0, 14);

//b
body.setTextureOffset(24, 0);
body.addBox(-6, -4+7, 26, 12, 0, 14);

//f
body.setTextureOffset(0, 10+4);
body.addBox(-6, -4, 26, 12, 7, 0);

//b
body.setTextureOffset(0-12, 10+4);
body.addBox(-6, -4, 26+14, 12, 7, 0);

//l
body.setTextureOffset(0, 10-14+4);
body.addBox(-6, -4, 26, 0, 7, 14);

//r
body.setTextureOffset(0-14, 10-14+4);
body.addBox(-6+12, -4, 26, 0, 7, 14);




//body3
//body.addBox(-4, -3, 40, 8, 5, 10);

//t
body.setTextureOffset(24-10, 0);
body.addBox(-4, -3, 40, 8, 0, 10);

//b
body.setTextureOffset(24+2, 0);
body.addBox(-4, -3+5, 40, 8, 0, 10);

//f
body.setTextureOffset(0, 10+6);
body.addBox(-4, -3, 40, 8, 5, 0);

//b
body.setTextureOffset(0-8, 10+6);
body.addBox(-4, -3, 40+10, 8, 5, 0);

//l
body.setTextureOffset(4, 10-10+6);
body.addBox(-4, -3, 40, 0, 5, 10);

//r
body.setTextureOffset(0-12, 10-10+6);
body.addBox(-4+8, -3, 40, 0, 5, 10);



//ltail
//body.addBox(-8-8, -2, 50, 15, 2, 8);

//t
body.setTextureOffset(0-15, 23);
body.addBox(-8-8, -2, 50, 15, 0, 4);
body.addBox(-8-8, -2, 54, 15, 0, 4);

//b
body.setTextureOffset(0-15, 27);
body.addBox(-8-8, -2+2, 50, 15, 0, 4);
body.addBox(-8-8, -2+2, 54, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-8-8, -2, 50, 15, 2, 0);

//b
body.setTextureOffset(0-15, 23);
body.addBox(-8-8, -2, 50+8, 15, 2,0);

//l
body.setTextureOffset(0, 23-8);
body.addBox(-8-8, -2, 50, 0, 2, 8);

//r
body.setTextureOffset(0-8,23-8);
body.addBox(-8-8+15, -2, 50, 0, 2, 8);



//rtail
//body.addBox(-6+15-8, -2, 50, 15, 2, 8);

//t
body.setTextureOffset(0-15, 23);
body.addBox(-6+15-8, -2, 50, 15, 0, 4);
body.addBox(-6+15-8, -2, 54, 15, 0, 4);

//b
body.setTextureOffset(0-15, 27);
body.addBox(-6+15-8, -2+2, 50, 15, 0, 4);
body.addBox(-6+15-8, -2+2, 54, 15, 0, 4);

//f
body.setTextureOffset(0, 23);
body.addBox(-6+15-8, -2, 50, 15, 2, 0);

//b
body.setTextureOffset(0-15, 23);
body.addBox(-6+15-8, -2, 50+8, 15, 2,0);

//l
body.setTextureOffset(0, 23-8);
body.addBox(-6+15-8, -2, 50, 0, 2, 8);

//r
body.setTextureOffset(0-8,23-8);
body.addBox(-6+15-8+15, -2, 50, 0, 2, 8);



//larm(?)
//body.addBox(10, 0, -13, 30, 2, 8);

//t
body.setTextureOffset(0-15, 23);
body.addBox(10, 0, -13, 15, 0, 4);
body.addBox(10, 0, -9, 15, 0, 4);
body.addBox(10+15, 0, -13, 15, 0, 4);
body.addBox(10+15, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(0-15, 27);
body.addBox(10, 2, -13, 15, 0, 4);
body.addBox(10, 2, -9, 15, 0, 4);
body.addBox(10+15, 2, -13, 15, 0, 4);
body.addBox(10+15, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(10, 0, -13, 15, 2, 0);
body.addBox(10+15, 0, -13, 15, 2,0);

//b
body.setTextureOffset(0-15, 23);
body.addBox(10, 0, -13+8, 15, 2,0);
body.addBox(10+15, 0, -13+8, 15, 2,0);

//l
body.setTextureOffset(0, 23-8);
body.addBox(10, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(0-8,23-8);
body.addBox(10+30,0, -13, 0, 2, 8);



//rarm(?)
//body.addBox(-39, 0, -13, 30, 2, 8);

//t
body.setTextureOffset(0-15, 23);
body.addBox(-39, 0, -13, 15, 0, 4);
body.addBox(-39, 0, -9, 15, 0, 4);
body.addBox(-39+15, 0, -13, 15, 0, 4);
body.addBox(-39+15, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(0-15, 27);
body.addBox(-39, 2, -13, 15, 0, 4);
body.addBox(-39, 2, -9, 15, 0, 4);
body.addBox(-39+15, 2, -13, 15, 0, 4);
body.addBox(-39+15, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-39, 0, -13, 15, 2, 0);
body.addBox(-39+15, 0, -13, 15, 2,0);

//b
body.setTextureOffset(0-15, 23);
body.addBox(-39, 0, -13+8, 15, 2,0);
body.addBox(-39+15, 0, -13+8, 15, 2,0);

//l
body.setTextureOffset(0, 23-8);
body.addBox(-39, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(0-8,23-8);
body.addBox(-39+30,0, -13, 0, 2, 8);

      
body.setRotationPoint(0, 18, 0);

}

var whale1=Renderer.createHumanoidRenderer();

whaleRender1(whale1);


//mid high tail

function whaleRender2(ren){
	
var Model = ren.getModel();	
var head = Model.getPart("head");
var body = Model.getPart("body");
var rArm = Model.getPart("rightArm");
var lArm = Model.getPart("leftArm");
var rLeg = Model.getPart("rightLeg");
var lLeg = Model.getPart("leftLeg");

head.clear();
body.clear();
rArm.clear();
lArm.clear();
rLeg.clear();
lLeg.clear();  	

//body
body.setTextureOffset(24,0);
//body.addBox(-10, -6, -26, 20, 12, 52);

//f
body.setTextureOffset(0,10);
body.addBox(-10, -6, -26, 20, 12, 0);

//b
body.setTextureOffset(0-20,10);
body.addBox(-10, -6, 26, 20, 12, 0);

//t
body.setTextureOffset(-2,0);
body.addBox(-10, -6, -26, 20, 0, 26);
body.addBox(-10, -6, 0, 20, 0, 26);

//b
body.setTextureOffset(-2,0);
body.addBox(-10, 6, -26, 20, 0, 26);
body.addBox(-10, 6, 0, 20, 0, 26);

//l
body.setTextureOffset(0,-10);
body.addBox(-10, -6, -26, 0, 12, 20);
body.addBox(-10, -6, -6, 0, 12, 20);
body.setTextureOffset(0,-2);
body.addBox(-10, -6, 14, 0, 12, 12);

//r
body.setTextureOffset(-20,-10);
body.addBox(10, -6, -26, 0, 12, 20);
body.addBox(10, -6, -6, 0, 12, 20);
body.setTextureOffset(-12,-2);
body.addBox(10, -6, 14, 0, 12, 12);


//eyes

//l

for(var z=0;z<3;z++){
body.setTextureOffset(3+z,30); 	
body.addBox(-8.1, -3, -30+z, 0, 1, 1);
}

//r
body.setTextureOffset(0,28);
body.addBox(8.1, -3, -30, 0, 1, 3);


//head
body.setTextureOffset(2, 10);

for(var x=0;x<16;x++)
body.addBox(-8+x, -5, -48, 1, 8, 0);

//top
body.setTextureOffset(6, 0);
body.addBox(-8, -5, -48, 16, 0, 22);


body.setTextureOffset(-1, 10);
for(var z=0;z<22;z++){
body.addBox(-8, -5+8, -48+z, 8, 0, 1);
body.addBox(0, -5+8, -48+z, 8, 0, 1);
body.addBox(-8, -5, -48+z, 0, 8, 1);
body.addBox(8, -5, -48+z, 0, 8, 1);
}

//jaw

body.setTextureOffset(44,0);

//body.addBox(-7, 3, -46, 14, 2, 20);

//f
body.addBox(-7, 3, -46, 14, 2, 0);

body.setTextureOffset(16,0);
//bottom
body.addBox(-7, 5, -46, 14, 0, 20);

//l
body.setTextureOffset(44,4);
body.addBox(-7, 3, -46, 0, 2, 20);

//r
body.setTextureOffset(44-20,9);
body.addBox(7, 3, -46, 0, 2, 20);

var sa = 1;
var ss = sa*1.5;
var sd = sa*2;

//body2

//t
body.setTextureOffset(10, 0);
body.addBox(-6, -4-sa, 26, 12, 0, 14);

//b
body.setTextureOffset(24, 0);
body.addBox(-6, 3-sa , 26, 12, 0, 14);

//f
body.setTextureOffset(0, 14);
body.addBox(-6, -4 -sa , 26, 12, 7, 0);

//b
body.setTextureOffset(-12, 14);
body.addBox(-6, -4 -sa , 40, 12, 7, 0);

//l
body.setTextureOffset(0, 0);
body.addBox(-6, -4 -sa , 26, 0, 7, 14);

//r
body.setTextureOffset(-14,0);
body.addBox(6, -4 -sa , 26, 0, 7, 14);





//body3

//t
body.setTextureOffset(14, 0);
body.addBox(-4, -3 -ss , 40, 8, 0, 10);

//b
body.setTextureOffset(26, 0);
body.addBox(-4, 2 -ss , 40, 8, 0, 10);

//f
body.setTextureOffset(0, 16);
body.addBox(-4, -3 -ss, 40, 8, 5, 0);

//b
body.setTextureOffset(-8, 16);
body.addBox(-4, -3 -ss , 50, 8, 5, 0);

//l
body.setTextureOffset(4,6);
body.addBox(-4, -3 -ss , 40, 0, 5, 10);

//r
body.setTextureOffset(-12,6);
body.addBox(4, -3 -ss , 40, 0, 5, 10);





//ltail

//t
body.setTextureOffset(-15, 23);
body.addBox(-16, -2-sd, 50, 15, 0, 4);
body.addBox(-16, -2-sd , 54, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(-16, -sd , 50, 15, 0, 4);
body.addBox(-16, -sd , 54, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-16, -2 -sd , 50, 15, 2, 0);

//b
body.setTextureOffset(-15, 23);
body.addBox(-16, -2 -sd , 58, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(-16, -2-sd , 50, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(-1, -2 -sd , 50, 0, 2, 8);



//rtail

//t
body.setTextureOffset(-15, 23);
body.addBox(1, -2 -sd , 50, 15, 0, 4);
body.addBox(1, -2 -sd , 54, 15, 0, 4);

//b
body.setTextureOffset(0-15, 27);
body.addBox(1, -sd , 50, 15, 0, 4);
body.addBox(1, -sd , 54, 15, 0, 4);

//f
body.setTextureOffset(0, 23);
body.addBox(1, -2 -sd , 50, 15, 2, 0);

//b
body.setTextureOffset(-15, 23);
body.addBox(1, -2 -sd , 58, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(1, -2 -sd , 50, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(16, -2 -sd , 50, 0, 2, 8);



//larm(?)

//t
body.setTextureOffset(-15, 23);
body.addBox(10, 0, -13, 15, 0, 4);
body.addBox(10, 0, -9, 15, 0, 4);
body.addBox(25, 0, -13, 15, 0, 4);
body.addBox(25, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(10, 2, -13, 15, 0, 4);
body.addBox(10, 2, -9, 15, 0, 4);
body.addBox(25, 2, -13, 15, 0, 4);
body.addBox(25, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(10, 0, -13, 15, 2, 0);
body.addBox(25, 0, -13, 15, 2,0);

//b
body.setTextureOffset(-15, 23);
body.addBox(10, 0, -5, 15, 2,0);
body.addBox(25, 0, -5, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(10, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(40,0, -13, 0, 2, 8);


//t
body.setTextureOffset(-15, 23);
body.addBox(-39, 0, -13, 15, 0, 4);
body.addBox(-39, 0, -9, 15, 0, 4);
body.addBox(-24, 0, -13, 15, 0, 4);
body.addBox(-24, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(-39, 2, -13, 15, 0, 4);
body.addBox(-39, 2, -9, 15, 0, 4);
body.addBox(-24, 2, -13, 15, 0, 4);
body.addBox(-24, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-39, 0, -13, 15, 2, 0);
body.addBox(-24, 0, -13, 15, 2,0);

//b
body.setTextureOffset(-15, 23);
body.addBox(-39, 0, -5, 15, 2,0);
body.addBox(-24, 0, -5, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(-39, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(-9,0, -13, 0, 2, 8);

      
body.setRotationPoint(0, 18, 0);

}

var whale2=Renderer.createHumanoidRenderer();

whaleRender2(whale2);


function whaleRender3(ren){
	
var Model = ren.getModel();	
var head = Model.getPart("head");
var body = Model.getPart("body");
var rArm = Model.getPart("rightArm");
var lArm = Model.getPart("leftArm");
var rLeg = Model.getPart("rightLeg");
var lLeg = Model.getPart("leftLeg");

head.clear();
body.clear();
rArm.clear();
lArm.clear();
rLeg.clear();
lLeg.clear();  	

//body
body.setTextureOffset(24,0);
//body.addBox(-10, -6, -26, 20, 12, 52);

//f
body.setTextureOffset(0,10);
body.addBox(-10, -6, -26, 20, 12, 0);

//b
body.setTextureOffset(0-20,10);
body.addBox(-10, -6, 26, 20, 12, 0);

//t
body.setTextureOffset(-2,0);
body.addBox(-10, -6, -26, 20, 0, 26);
body.addBox(-10, -6, 0, 20, 0, 26);

//b
body.setTextureOffset(-2,0);
body.addBox(-10, 6, -26, 20, 0, 26);
body.addBox(-10, 6, 0, 20, 0, 26);

//l
body.setTextureOffset(0,-10);
body.addBox(-10, -6, -26, 0, 12, 20);
body.addBox(-10, -6, -6, 0, 12, 20);
body.setTextureOffset(0,-2);
body.addBox(-10, -6, 14, 0, 12, 12);

//r
body.setTextureOffset(-20,-10);
body.addBox(10, -6, -26, 0, 12, 20);
body.addBox(10, -6, -6, 0, 12, 20);
body.setTextureOffset(-12,-2);
body.addBox(10, -6, 14, 0, 12, 12);


//eyes

//l

for(var z=0;z<3;z++){
body.setTextureOffset(3+z,30); 	
body.addBox(-8.1, -3, -30+z, 0, 1, 1);
}

//r
body.setTextureOffset(0,28);
body.addBox(8.1, -3, -30, 0, 1, 3);


//head
body.setTextureOffset(2, 10);

for(var x=0;x<16;x++)
body.addBox(-8+x, -5, -48, 1, 8, 0);

//top
body.setTextureOffset(6, 0);
body.addBox(-8, -5, -48, 16, 0, 22);


body.setTextureOffset(-1, 10);
for(var z=0;z<22;z++){
body.addBox(-8, -5+8, -48+z, 8, 0, 1);
body.addBox(0, -5+8, -48+z, 8, 0, 1);
body.addBox(-8, -5, -48+z, 0, 8, 1);
body.addBox(8, -5, -48+z, 0, 8, 1);
}

//jaw

body.setTextureOffset(44,0);

//body.addBox(-7, 3, -46, 14, 2, 20);

//f
body.addBox(-7, 3, -46, 14, 2, 0);

body.setTextureOffset(16,0);
//bottom
body.addBox(-7, 5, -46, 14, 0, 20);

//l
body.setTextureOffset(44,4);
body.addBox(-7, 3, -46, 0, 2, 20);

//r
body.setTextureOffset(44-20,9);
body.addBox(7, 3, -46, 0, 2, 20);

var sa = 2;
var ss = sa*1.5;
var sd = sa*2;

//body2

//t
body.setTextureOffset(10, 0);
body.addBox(-6, -4-sa, 26, 12, 0, 14);

//b
body.setTextureOffset(24, 0);
body.addBox(-6, 3-sa , 26, 12, 0, 14);

//f
body.setTextureOffset(0, 14);
body.addBox(-6, -4 -sa , 26, 12, 7, 0);

//b
body.setTextureOffset(-12, 14);
body.addBox(-6, -4 -sa , 40, 12, 7, 0);

//l
body.setTextureOffset(0, 0);
body.addBox(-6, -4 -sa , 26, 0, 7, 14);

//r
body.setTextureOffset(-14,0);
body.addBox(6, -4 -sa , 26, 0, 7, 14);





//body3

//t
body.setTextureOffset(14, 0);
body.addBox(-4, -3 -ss , 40, 8, 0, 10);

//b
body.setTextureOffset(26, 0);
body.addBox(-4, 2 -ss , 40, 8, 0, 10);

//f
body.setTextureOffset(0, 16);
body.addBox(-4, -3 -ss, 40, 8, 5, 0);

//b
body.setTextureOffset(-8, 16);
body.addBox(-4, -3 -ss , 50, 8, 5, 0);

//l
body.setTextureOffset(4,6);
body.addBox(-4, -3 -ss , 40, 0, 5, 10);

//r
body.setTextureOffset(-12,6);
body.addBox(4, -3 -ss , 40, 0, 5, 10);





//ltail

//t
body.setTextureOffset(-15, 23);
body.addBox(-16, -2-sd, 50, 15, 0, 4);
body.addBox(-16, -2-sd , 54, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(-16, -sd , 50, 15, 0, 4);
body.addBox(-16, -sd , 54, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-16, -2 -sd , 50, 15, 2, 0);

//b
body.setTextureOffset(-15, 23);
body.addBox(-16, -2 -sd , 58, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(-16, -2-sd , 50, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(-1, -2 -sd , 50, 0, 2, 8);



//rtail

//t
body.setTextureOffset(-15, 23);
body.addBox(1, -2 -sd , 50, 15, 0, 4);
body.addBox(1, -2 -sd , 54, 15, 0, 4);

//b
body.setTextureOffset(0-15, 27);
body.addBox(1, -sd , 50, 15, 0, 4);
body.addBox(1, -sd , 54, 15, 0, 4);

//f
body.setTextureOffset(0, 23);
body.addBox(1, -2 -sd , 50, 15, 2, 0);

//b
body.setTextureOffset(-15, 23);
body.addBox(1, -2 -sd , 58, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(1, -2 -sd , 50, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(16, -2 -sd , 50, 0, 2, 8);



//larm(?)

//t
body.setTextureOffset(-15, 23);
body.addBox(10, 0, -13, 15, 0, 4);
body.addBox(10, 0, -9, 15, 0, 4);
body.addBox(25, 0, -13, 15, 0, 4);
body.addBox(25, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(10, 2, -13, 15, 0, 4);
body.addBox(10, 2, -9, 15, 0, 4);
body.addBox(25, 2, -13, 15, 0, 4);
body.addBox(25, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(10, 0, -13, 15, 2, 0);
body.addBox(25, 0, -13, 15, 2,0);

//b
body.setTextureOffset(-15, 23);
body.addBox(10, 0, -5, 15, 2,0);
body.addBox(25, 0, -5, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(10, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(40,0, -13, 0, 2, 8);


//t
body.setTextureOffset(-15, 23);
body.addBox(-39, 0, -13, 15, 0, 4);
body.addBox(-39, 0, -9, 15, 0, 4);
body.addBox(-24, 0, -13, 15, 0, 4);
body.addBox(-24, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(-39, 2, -13, 15, 0, 4);
body.addBox(-39, 2, -9, 15, 0, 4);
body.addBox(-24, 2, -13, 15, 0, 4);
body.addBox(-24, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-39, 0, -13, 15, 2, 0);
body.addBox(-24, 0, -13, 15, 2,0);

//b
body.setTextureOffset(-15, 23);
body.addBox(-39, 0, -5, 15, 2,0);
body.addBox(-24, 0, -5, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(-39, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(-9,0, -13, 0, 2, 8);

      
body.setRotationPoint(0, 18, 0);

}

var whale3=Renderer.createHumanoidRenderer();

whaleRender3(whale3);


//highest tail

function whaleRender4(ren){
	
var Model = ren.getModel();	
var head = Model.getPart("head");
var body = Model.getPart("body");
var rArm = Model.getPart("rightArm");
var lArm = Model.getPart("leftArm");
var rLeg = Model.getPart("rightLeg");
var lLeg = Model.getPart("leftLeg");

head.clear();
body.clear();
rArm.clear();
lArm.clear();
rLeg.clear();
lLeg.clear();  	

//body
body.setTextureOffset(24,0);
//body.addBox(-10, -6, -26, 20, 12, 52);

//f
body.setTextureOffset(0,10);
body.addBox(-10, -6, -26, 20, 12, 0);

//b
body.setTextureOffset(0-20,10);
body.addBox(-10, -6, 26, 20, 12, 0);

//t
body.setTextureOffset(-2,0);
body.addBox(-10, -6, -26, 20, 0, 26);
body.addBox(-10, -6, 0, 20, 0, 26);

//b
body.setTextureOffset(-2,0);
body.addBox(-10, 6, -26, 20, 0, 26);
body.addBox(-10, 6, 0, 20, 0, 26);

//l
body.setTextureOffset(0,-10);
body.addBox(-10, -6, -26, 0, 12, 20);
body.addBox(-10, -6, -6, 0, 12, 20);
body.setTextureOffset(0,-2);
body.addBox(-10, -6, 14, 0, 12, 12);

//r
body.setTextureOffset(-20,-10);
body.addBox(10, -6, -26, 0, 12, 20);
body.addBox(10, -6, -6, 0, 12, 20);
body.setTextureOffset(-12,-2);
body.addBox(10, -6, 14, 0, 12, 12);


//eyes

//l

for(var z=0;z<3;z++){
body.setTextureOffset(3+z,30); 	
body.addBox(-8.1, -3, -30+z, 0, 1, 1);
}

//r
body.setTextureOffset(0,28);
body.addBox(8.1, -3, -30, 0, 1, 3);


//head
body.setTextureOffset(2, 10);

for(var x=0;x<16;x++)
body.addBox(-8+x, -5, -48, 1, 8, 0);

//top
body.setTextureOffset(6, 0);
body.addBox(-8, -5, -48, 16, 0, 22);


body.setTextureOffset(-1, 10);
for(var z=0;z<22;z++){
body.addBox(-8, -5+8, -48+z, 8, 0, 1);
body.addBox(0, -5+8, -48+z, 8, 0, 1);
body.addBox(-8, -5, -48+z, 0, 8, 1);
body.addBox(8, -5, -48+z, 0, 8, 1);
}

//jaw

body.setTextureOffset(44,0);

//body.addBox(-7, 3, -46, 14, 2, 20);

//f
body.addBox(-7, 3, -46, 14, 2, 0);

body.setTextureOffset(16,0);
//bottom
body.addBox(-7, 5, -46, 14, 0, 20);

//l
body.setTextureOffset(44,4);
body.addBox(-7, 3, -46, 0, 2, 20);

//r
body.setTextureOffset(44-20,9);
body.addBox(7, 3, -46, 0, 2, 20);

var sa = 3;
var ss = sa*1.5;
var sd = sa*2;

//body2

//t
body.setTextureOffset(10, 0);
body.addBox(-6, -4-sa, 26, 12, 0, 14);

//b
body.setTextureOffset(24, 0);
body.addBox(-6, 3-sa , 26, 12, 0, 14);

//f
body.setTextureOffset(0, 14);
body.addBox(-6, -4 -sa , 26, 12, 7, 0);

//b
body.setTextureOffset(-12, 14);
body.addBox(-6, -4 -sa , 40, 12, 7, 0);

//l
body.setTextureOffset(0, 0);
body.addBox(-6, -4 -sa , 26, 0, 7, 14);

//r
body.setTextureOffset(-14,0);
body.addBox(6, -4 -sa , 26, 0, 7, 14);





//body3

//t
body.setTextureOffset(14, 0);
body.addBox(-4, -3 -ss , 40, 8, 0, 10);

//b
body.setTextureOffset(26, 0);
body.addBox(-4, 2 -ss , 40, 8, 0, 10);

//f
body.setTextureOffset(0, 16);
body.addBox(-4, -3 -ss, 40, 8, 5, 0);

//b
body.setTextureOffset(-8, 16);
body.addBox(-4, -3 -ss , 50, 8, 5, 0);

//l
body.setTextureOffset(4,6);
body.addBox(-4, -3 -ss , 40, 0, 5, 10);

//r
body.setTextureOffset(-12,6);
body.addBox(4, -3 -ss , 40, 0, 5, 10);





//ltail

//t
body.setTextureOffset(-15, 23);
body.addBox(-16, -2-sd, 50, 15, 0, 4);
body.addBox(-16, -2-sd , 54, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(-16, -sd , 50, 15, 0, 4);
body.addBox(-16, -sd , 54, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-16, -2 -sd , 50, 15, 2, 0);

//b
body.setTextureOffset(-15, 23);
body.addBox(-16, -2 -sd , 58, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(-16, -2-sd , 50, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(-1, -2 -sd , 50, 0, 2, 8);



//rtail

//t
body.setTextureOffset(-15, 23);
body.addBox(1, -2 -sd , 50, 15, 0, 4);
body.addBox(1, -2 -sd , 54, 15, 0, 4);

//b
body.setTextureOffset(0-15, 27);
body.addBox(1, -sd , 50, 15, 0, 4);
body.addBox(1, -sd , 54, 15, 0, 4);

//f
body.setTextureOffset(0, 23);
body.addBox(1, -2 -sd , 50, 15, 2, 0);

//b
body.setTextureOffset(-15, 23);
body.addBox(1, -2 -sd , 58, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(1, -2 -sd , 50, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(16, -2 -sd , 50, 0, 2, 8);



//larm(?)

//t
body.setTextureOffset(-15, 23);
body.addBox(10, 0, -13, 15, 0, 4);
body.addBox(10, 0, -9, 15, 0, 4);
body.addBox(25, 0, -13, 15, 0, 4);
body.addBox(25, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(10, 2, -13, 15, 0, 4);
body.addBox(10, 2, -9, 15, 0, 4);
body.addBox(25, 2, -13, 15, 0, 4);
body.addBox(25, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(10, 0, -13, 15, 2, 0);
body.addBox(25, 0, -13, 15, 2,0);

//b
body.setTextureOffset(-15, 23);
body.addBox(10, 0, -5, 15, 2,0);
body.addBox(25, 0, -5, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(10, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(40,0, -13, 0, 2, 8);


//t
body.setTextureOffset(-15, 23);
body.addBox(-39, 0, -13, 15, 0, 4);
body.addBox(-39, 0, -9, 15, 0, 4);
body.addBox(-24, 0, -13, 15, 0, 4);
body.addBox(-24, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(-39, 2, -13, 15, 0, 4);
body.addBox(-39, 2, -9, 15, 0, 4);
body.addBox(-24, 2, -13, 15, 0, 4);
body.addBox(-24, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-39, 0, -13, 15, 2, 0);
body.addBox(-24, 0, -13, 15, 2,0);

//b
body.setTextureOffset(-15, 23);
body.addBox(-39, 0, -5, 15, 2,0);
body.addBox(-24, 0, -5, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(-39, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(-9,0, -13, 0, 2, 8);

      
body.setRotationPoint(0, 18, 0);

}

var whale4=Renderer.createHumanoidRenderer();

whaleRender4(whale4);


//mid low tail

function whaleRender5(ren){
	
var Model = ren.getModel();	
var head = Model.getPart("head");
var body = Model.getPart("body");
var rArm = Model.getPart("rightArm");
var lArm = Model.getPart("leftArm");
var rLeg = Model.getPart("rightLeg");
var lLeg = Model.getPart("leftLeg");

head.clear();
body.clear();
rArm.clear();
lArm.clear();
rLeg.clear();
lLeg.clear();  	

//body
body.setTextureOffset(24,0);
//body.addBox(-10, -6, -26, 20, 12, 52);

//f
body.setTextureOffset(0,10);
body.addBox(-10, -6, -26, 20, 12, 0);

//b
body.setTextureOffset(0-20,10);
body.addBox(-10, -6, 26, 20, 12, 0);

//t
body.setTextureOffset(-2,0);
body.addBox(-10, -6, -26, 20, 0, 26);
body.addBox(-10, -6, 0, 20, 0, 26);

//b
body.setTextureOffset(-2,0);
body.addBox(-10, 6, -26, 20, 0, 26);
body.addBox(-10, 6, 0, 20, 0, 26);

//l
body.setTextureOffset(0,-10);
body.addBox(-10, -6, -26, 0, 12, 20);
body.addBox(-10, -6, -6, 0, 12, 20);
body.setTextureOffset(0,-2);
body.addBox(-10, -6, 14, 0, 12, 12);

//r
body.setTextureOffset(-20,-10);
body.addBox(10, -6, -26, 0, 12, 20);
body.addBox(10, -6, -6, 0, 12, 20);
body.setTextureOffset(-12,-2);
body.addBox(10, -6, 14, 0, 12, 12);


//eyes

//l

for(var z=0;z<3;z++){
body.setTextureOffset(3+z,30); 	
body.addBox(-8.1, -3, -30+z, 0, 1, 1);
}

//r
body.setTextureOffset(0,28);
body.addBox(8.1, -3, -30, 0, 1, 3);


//head
body.setTextureOffset(2, 10);

for(var x=0;x<16;x++)
body.addBox(-8+x, -5, -48, 1, 8, 0);

//top
body.setTextureOffset(6, 0);
body.addBox(-8, -5, -48, 16, 0, 22);


body.setTextureOffset(-1, 10);
for(var z=0;z<22;z++){
body.addBox(-8, -5+8, -48+z, 8, 0, 1);
body.addBox(0, -5+8, -48+z, 8, 0, 1);
body.addBox(-8, -5, -48+z, 0, 8, 1);
body.addBox(8, -5, -48+z, 0, 8, 1);
}

//jaw

body.setTextureOffset(44,0);

//body.addBox(-7, 3, -46, 14, 2, 20);

//f
body.addBox(-7, 3, -46, 14, 2, 0);

body.setTextureOffset(16,0);
//bottom
body.addBox(-7, 5, -46, 14, 0, 20);

//l
body.setTextureOffset(44,4);
body.addBox(-7, 3, -46, 0, 2, 20);

//r
body.setTextureOffset(44-20,9);
body.addBox(7, 3, -46, 0, 2, 20);

var sa = -1;
var ss = sa*1.5;
var sd = sa*2;

//body2

//t
body.setTextureOffset(10, 0);
body.addBox(-6, -4-sa, 26, 12, 0, 14);

//b
body.setTextureOffset(24, 0);
body.addBox(-6, 3-sa , 26, 12, 0, 14);

//f
body.setTextureOffset(0, 14);
body.addBox(-6, -4 -sa , 26, 12, 7, 0);

//b
body.setTextureOffset(-12, 14);
body.addBox(-6, -4 -sa , 40, 12, 7, 0);

//l
body.setTextureOffset(0, 0);
body.addBox(-6, -4 -sa , 26, 0, 7, 14);

//r
body.setTextureOffset(-14,0);
body.addBox(6, -4 -sa , 26, 0, 7, 14);





//body3

//t
body.setTextureOffset(14, 0);
body.addBox(-4, -3 -ss , 40, 8, 0, 10);

//b
body.setTextureOffset(26, 0);
body.addBox(-4, 2 -ss , 40, 8, 0, 10);

//f
body.setTextureOffset(0, 16);
body.addBox(-4, -3 -ss, 40, 8, 5, 0);

//b
body.setTextureOffset(-8, 16);
body.addBox(-4, -3 -ss , 50, 8, 5, 0);

//l
body.setTextureOffset(4,6);
body.addBox(-4, -3 -ss , 40, 0, 5, 10);

//r
body.setTextureOffset(-12,6);
body.addBox(4, -3 -ss , 40, 0, 5, 10);





//ltail

//t
body.setTextureOffset(-15, 23);
body.addBox(-16, -2-sd, 50, 15, 0, 4);
body.addBox(-16, -2-sd , 54, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(-16, -sd , 50, 15, 0, 4);
body.addBox(-16, -sd , 54, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-16, -2 -sd , 50, 15, 2, 0);

//b
body.setTextureOffset(-15, 23);
body.addBox(-16, -2 -sd , 58, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(-16, -2-sd , 50, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(-1, -2 -sd , 50, 0, 2, 8);



//rtail

//t
body.setTextureOffset(-15, 23);
body.addBox(1, -2 -sd , 50, 15, 0, 4);
body.addBox(1, -2 -sd , 54, 15, 0, 4);

//b
body.setTextureOffset(0-15, 27);
body.addBox(1, -sd , 50, 15, 0, 4);
body.addBox(1, -sd , 54, 15, 0, 4);

//f
body.setTextureOffset(0, 23);
body.addBox(1, -2 -sd , 50, 15, 2, 0);

//b
body.setTextureOffset(-15, 23);
body.addBox(1, -2 -sd , 58, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(1, -2 -sd , 50, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(16, -2 -sd , 50, 0, 2, 8);



//larm(?)

//t
body.setTextureOffset(-15, 23);
body.addBox(10, 0, -13, 15, 0, 4);
body.addBox(10, 0, -9, 15, 0, 4);
body.addBox(25, 0, -13, 15, 0, 4);
body.addBox(25, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(10, 2, -13, 15, 0, 4);
body.addBox(10, 2, -9, 15, 0, 4);
body.addBox(25, 2, -13, 15, 0, 4);
body.addBox(25, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(10, 0, -13, 15, 2, 0);
body.addBox(25, 0, -13, 15, 2,0);

//b
body.setTextureOffset(-15, 23);
body.addBox(10, 0, -5, 15, 2,0);
body.addBox(25, 0, -5, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(10, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(40,0, -13, 0, 2, 8);


//t
body.setTextureOffset(-15, 23);
body.addBox(-39, 0, -13, 15, 0, 4);
body.addBox(-39, 0, -9, 15, 0, 4);
body.addBox(-24, 0, -13, 15, 0, 4);
body.addBox(-24, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(-39, 2, -13, 15, 0, 4);
body.addBox(-39, 2, -9, 15, 0, 4);
body.addBox(-24, 2, -13, 15, 0, 4);
body.addBox(-24, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-39, 0, -13, 15, 2, 0);
body.addBox(-24, 0, -13, 15, 2,0);

//b
body.setTextureOffset(-15, 23);
body.addBox(-39, 0, -5, 15, 2,0);
body.addBox(-24, 0, -5, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(-39, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(-9,0, -13, 0, 2, 8);

      
body.setRotationPoint(0, 18, 0);

}

var whale5=Renderer.createHumanoidRenderer();

whaleRender5(whale5);



//sec lowest tail

function whaleRender6(ren){
	
var Model = ren.getModel();	
var head = Model.getPart("head");
var body = Model.getPart("body");
var rArm = Model.getPart("rightArm");
var lArm = Model.getPart("leftArm");
var rLeg = Model.getPart("rightLeg");
var lLeg = Model.getPart("leftLeg");

head.clear();
body.clear();
rArm.clear();
lArm.clear();
rLeg.clear();
lLeg.clear();  	

//body
body.setTextureOffset(24,0);
//body.addBox(-10, -6, -26, 20, 12, 52);

//f
body.setTextureOffset(0,10);
body.addBox(-10, -6, -26, 20, 12, 0);

//b
body.setTextureOffset(0-20,10);
body.addBox(-10, -6, 26, 20, 12, 0);

//t
body.setTextureOffset(-2,0);
body.addBox(-10, -6, -26, 20, 0, 26);
body.addBox(-10, -6, 0, 20, 0, 26);

//b
body.setTextureOffset(-2,0);
body.addBox(-10, 6, -26, 20, 0, 26);
body.addBox(-10, 6, 0, 20, 0, 26);

//l
body.setTextureOffset(0,-10);
body.addBox(-10, -6, -26, 0, 12, 20);
body.addBox(-10, -6, -6, 0, 12, 20);
body.setTextureOffset(0,-2);
body.addBox(-10, -6, 14, 0, 12, 12);

//r
body.setTextureOffset(-20,-10);
body.addBox(10, -6, -26, 0, 12, 20);
body.addBox(10, -6, -6, 0, 12, 20);
body.setTextureOffset(-12,-2);
body.addBox(10, -6, 14, 0, 12, 12);


//eyes

//l

for(var z=0;z<3;z++){
body.setTextureOffset(3+z,30); 	
body.addBox(-8.1, -3, -30+z, 0, 1, 1);
}

//r
body.setTextureOffset(0,28);
body.addBox(8.1, -3, -30, 0, 1, 3);


//head
body.setTextureOffset(2, 10);

for(var x=0;x<16;x++)
body.addBox(-8+x, -5, -48, 1, 8, 0);

//top
body.setTextureOffset(6, 0);
body.addBox(-8, -5, -48, 16, 0, 22);


body.setTextureOffset(-1, 10);
for(var z=0;z<22;z++){
body.addBox(-8, -5+8, -48+z, 8, 0, 1);
body.addBox(0, -5+8, -48+z, 8, 0, 1);
body.addBox(-8, -5, -48+z, 0, 8, 1);
body.addBox(8, -5, -48+z, 0, 8, 1);
}

//jaw

body.setTextureOffset(44,0);

//body.addBox(-7, 3, -46, 14, 2, 20);

//f
body.addBox(-7, 3, -46, 14, 2, 0);

body.setTextureOffset(16,0);
//bottom
body.addBox(-7, 5, -46, 14, 0, 20);

//l
body.setTextureOffset(44,4);
body.addBox(-7, 3, -46, 0, 2, 20);

//r
body.setTextureOffset(44-20,9);
body.addBox(7, 3, -46, 0, 2, 20);

var sa = -2;
var ss = sa*1.5;
var sd = sa*2;

//body2

//t
body.setTextureOffset(10, 0);
body.addBox(-6, -4-sa, 26, 12, 0, 14);

//b
body.setTextureOffset(24, 0);
body.addBox(-6, 3-sa , 26, 12, 0, 14);

//f
body.setTextureOffset(0, 14);
body.addBox(-6, -4 -sa , 26, 12, 7, 0);

//b
body.setTextureOffset(-12, 14);
body.addBox(-6, -4 -sa , 40, 12, 7, 0);

//l
body.setTextureOffset(0, 0);
body.addBox(-6, -4 -sa , 26, 0, 7, 14);

//r
body.setTextureOffset(-14,0);
body.addBox(6, -4 -sa , 26, 0, 7, 14);





//body3

//t
body.setTextureOffset(14, 0);
body.addBox(-4, -3 -ss , 40, 8, 0, 10);

//b
body.setTextureOffset(26, 0);
body.addBox(-4, 2 -ss , 40, 8, 0, 10);

//f
body.setTextureOffset(0, 16);
body.addBox(-4, -3 -ss, 40, 8, 5, 0);

//b
body.setTextureOffset(-8, 16);
body.addBox(-4, -3 -ss , 50, 8, 5, 0);

//l
body.setTextureOffset(4,6);
body.addBox(-4, -3 -ss , 40, 0, 5, 10);

//r
body.setTextureOffset(-12,6);
body.addBox(4, -3 -ss , 40, 0, 5, 10);





//ltail

//t
body.setTextureOffset(-15, 23);
body.addBox(-16, -2-sd, 50, 15, 0, 4);
body.addBox(-16, -2-sd , 54, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(-16, -sd , 50, 15, 0, 4);
body.addBox(-16, -sd , 54, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-16, -2 -sd , 50, 15, 2, 0);

//b
body.setTextureOffset(-15, 23);
body.addBox(-16, -2 -sd , 58, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(-16, -2-sd , 50, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(-1, -2 -sd , 50, 0, 2, 8);



//rtail

//t
body.setTextureOffset(-15, 23);
body.addBox(1, -2 -sd , 50, 15, 0, 4);
body.addBox(1, -2 -sd , 54, 15, 0, 4);

//b
body.setTextureOffset(0-15, 27);
body.addBox(1, -sd , 50, 15, 0, 4);
body.addBox(1, -sd , 54, 15, 0, 4);

//f
body.setTextureOffset(0, 23);
body.addBox(1, -2 -sd , 50, 15, 2, 0);

//b
body.setTextureOffset(-15, 23);
body.addBox(1, -2 -sd , 58, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(1, -2 -sd , 50, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(16, -2 -sd , 50, 0, 2, 8);



//larm(?)

//t
body.setTextureOffset(-15, 23);
body.addBox(10, 0, -13, 15, 0, 4);
body.addBox(10, 0, -9, 15, 0, 4);
body.addBox(25, 0, -13, 15, 0, 4);
body.addBox(25, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(10, 2, -13, 15, 0, 4);
body.addBox(10, 2, -9, 15, 0, 4);
body.addBox(25, 2, -13, 15, 0, 4);
body.addBox(25, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(10, 0, -13, 15, 2, 0);
body.addBox(25, 0, -13, 15, 2,0);

//b
body.setTextureOffset(-15, 23);
body.addBox(10, 0, -5, 15, 2,0);
body.addBox(25, 0, -5, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(10, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(40,0, -13, 0, 2, 8);


//t
body.setTextureOffset(-15, 23);
body.addBox(-39, 0, -13, 15, 0, 4);
body.addBox(-39, 0, -9, 15, 0, 4);
body.addBox(-24, 0, -13, 15, 0, 4);
body.addBox(-24, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(-39, 2, -13, 15, 0, 4);
body.addBox(-39, 2, -9, 15, 0, 4);
body.addBox(-24, 2, -13, 15, 0, 4);
body.addBox(-24, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-39, 0, -13, 15, 2, 0);
body.addBox(-24, 0, -13, 15, 2,0);

//b
body.setTextureOffset(-15, 23);
body.addBox(-39, 0, -5, 15, 2,0);
body.addBox(-24, 0, -5, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(-39, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(-9,0, -13, 0, 2, 8);

      
body.setRotationPoint(0, 18, 0);

}

var whale6=Renderer.createHumanoidRenderer();

whaleRender6(whale6);



//lowesr tail

function whaleRender7(ren){
	
var Model = ren.getModel();	
var head = Model.getPart("head");
var body = Model.getPart("body");
var rArm = Model.getPart("rightArm");
var lArm = Model.getPart("leftArm");
var rLeg = Model.getPart("rightLeg");
var lLeg = Model.getPart("leftLeg");

head.clear();
body.clear();
rArm.clear();
lArm.clear();
rLeg.clear();
lLeg.clear();  	

//body
body.setTextureOffset(24,0);
//body.addBox(-10, -6, -26, 20, 12, 52);

//f
body.setTextureOffset(0,10);
body.addBox(-10, -6, -26, 20, 12, 0);

//b
body.setTextureOffset(0-20,10);
body.addBox(-10, -6, 26, 20, 12, 0);

//t
body.setTextureOffset(-2,0);
body.addBox(-10, -6, -26, 20, 0, 26);
body.addBox(-10, -6, 0, 20, 0, 26);

//b
body.setTextureOffset(-2,0);
body.addBox(-10, 6, -26, 20, 0, 26);
body.addBox(-10, 6, 0, 20, 0, 26);

//l
body.setTextureOffset(0,-10);
body.addBox(-10, -6, -26, 0, 12, 20);
body.addBox(-10, -6, -6, 0, 12, 20);
body.setTextureOffset(0,-2);
body.addBox(-10, -6, 14, 0, 12, 12);

//r
body.setTextureOffset(-20,-10);
body.addBox(10, -6, -26, 0, 12, 20);
body.addBox(10, -6, -6, 0, 12, 20);
body.setTextureOffset(-12,-2);
body.addBox(10, -6, 14, 0, 12, 12);


//eyes

//l

for(var z=0;z<3;z++){
body.setTextureOffset(3+z,30); 	
body.addBox(-8.1, -3, -30+z, 0, 1, 1);
}

//r
body.setTextureOffset(0,28);
body.addBox(8.1, -3, -30, 0, 1, 3);


//head
body.setTextureOffset(2, 10);

for(var x=0;x<16;x++)
body.addBox(-8+x, -5, -48, 1, 8, 0);

//top
body.setTextureOffset(6, 0);
body.addBox(-8, -5, -48, 16, 0, 22);


body.setTextureOffset(-1, 10);
for(var z=0;z<22;z++){
body.addBox(-8, -5+8, -48+z, 8, 0, 1);
body.addBox(0, -5+8, -48+z, 8, 0, 1);
body.addBox(-8, -5, -48+z, 0, 8, 1);
body.addBox(8, -5, -48+z, 0, 8, 1);
}

//jaw

body.setTextureOffset(44,0);

//body.addBox(-7, 3, -46, 14, 2, 20);

//f
body.addBox(-7, 3, -46, 14, 2, 0);

body.setTextureOffset(16,0);
//bottom
body.addBox(-7, 5, -46, 14, 0, 20);

//l
body.setTextureOffset(44,4);
body.addBox(-7, 3, -46, 0, 2, 20);

//r
body.setTextureOffset(44-20,9);
body.addBox(7, 3, -46, 0, 2, 20);

var sa = -3;
var ss = sa*1.5;
var sd = sa*2;

//body2

//t
body.setTextureOffset(10, 0);
body.addBox(-6, -4-sa, 26, 12, 0, 14);

//b
body.setTextureOffset(24, 0);
body.addBox(-6, 3-sa , 26, 12, 0, 14);

//f
body.setTextureOffset(0, 14);
body.addBox(-6, -4 -sa , 26, 12, 7, 0);

//b
body.setTextureOffset(-12, 14);
body.addBox(-6, -4 -sa , 40, 12, 7, 0);

//l
body.setTextureOffset(0, 0);
body.addBox(-6, -4 -sa , 26, 0, 7, 14);

//r
body.setTextureOffset(-14,0);
body.addBox(6, -4 -sa , 26, 0, 7, 14);





//body3

//t
body.setTextureOffset(14, 0);
body.addBox(-4, -3 -ss , 40, 8, 0, 10);

//b
body.setTextureOffset(26, 0);
body.addBox(-4, 2 -ss , 40, 8, 0, 10);

//f
body.setTextureOffset(0, 16);
body.addBox(-4, -3 -ss, 40, 8, 5, 0);

//b
body.setTextureOffset(-8, 16);
body.addBox(-4, -3 -ss , 50, 8, 5, 0);

//l
body.setTextureOffset(4,6);
body.addBox(-4, -3 -ss , 40, 0, 5, 10);

//r
body.setTextureOffset(-12,6);
body.addBox(4, -3 -ss , 40, 0, 5, 10);





//ltail

//t
body.setTextureOffset(-15, 23);
body.addBox(-16, -2-sd, 50, 15, 0, 4);
body.addBox(-16, -2-sd , 54, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(-16, -sd , 50, 15, 0, 4);
body.addBox(-16, -sd , 54, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-16, -2 -sd , 50, 15, 2, 0);

//b
body.setTextureOffset(-15, 23);
body.addBox(-16, -2 -sd , 58, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(-16, -2-sd , 50, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(-1, -2 -sd , 50, 0, 2, 8);



//rtail

//t
body.setTextureOffset(-15, 23);
body.addBox(1, -2 -sd , 50, 15, 0, 4);
body.addBox(1, -2 -sd , 54, 15, 0, 4);

//b
body.setTextureOffset(0-15, 27);
body.addBox(1, -sd , 50, 15, 0, 4);
body.addBox(1, -sd , 54, 15, 0, 4);

//f
body.setTextureOffset(0, 23);
body.addBox(1, -2 -sd , 50, 15, 2, 0);

//b
body.setTextureOffset(-15, 23);
body.addBox(1, -2 -sd , 58, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(1, -2 -sd , 50, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(16, -2 -sd , 50, 0, 2, 8);



//larm(?)

//t
body.setTextureOffset(-15, 23);
body.addBox(10, 0, -13, 15, 0, 4);
body.addBox(10, 0, -9, 15, 0, 4);
body.addBox(25, 0, -13, 15, 0, 4);
body.addBox(25, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(10, 2, -13, 15, 0, 4);
body.addBox(10, 2, -9, 15, 0, 4);
body.addBox(25, 2, -13, 15, 0, 4);
body.addBox(25, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(10, 0, -13, 15, 2, 0);
body.addBox(25, 0, -13, 15, 2,0);

//b
body.setTextureOffset(-15, 23);
body.addBox(10, 0, -5, 15, 2,0);
body.addBox(25, 0, -5, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(10, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(40,0, -13, 0, 2, 8);


//t
body.setTextureOffset(-15, 23);
body.addBox(-39, 0, -13, 15, 0, 4);
body.addBox(-39, 0, -9, 15, 0, 4);
body.addBox(-24, 0, -13, 15, 0, 4);
body.addBox(-24, 0, -9, 15, 0, 4);

//b
body.setTextureOffset(-15, 27);
body.addBox(-39, 2, -13, 15, 0, 4);
body.addBox(-39, 2, -9, 15, 0, 4);
body.addBox(-24, 2, -13, 15, 0, 4);
body.addBox(-24, 2, -9, 15, 0, 4);


//f
body.setTextureOffset(0, 23);
body.addBox(-39, 0, -13, 15, 2, 0);
body.addBox(-24, 0, -13, 15, 2,0);

//b
body.setTextureOffset(-15, 23);
body.addBox(-39, 0, -5, 15, 2,0);
body.addBox(-24, 0, -5, 15, 2,0);

//l
body.setTextureOffset(0, 15);
body.addBox(-39, 0,-13, 0, 2, 8);

//r
body.setTextureOffset(-8,15);
body.addBox(-9,0, -13, 0, 2, 8);

      
body.setRotationPoint(0, 18, 0);

}

var whale7=Renderer.createHumanoidRenderer();

whaleRender7(whale7);





















