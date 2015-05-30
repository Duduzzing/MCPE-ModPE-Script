
ModPE.setItem(509,"spawn_egg",0,"Ent spawner");
Player.addItemCreativeInv(509, 1, 0);

ModPE.setItem(510,"ender_eye",0,"Ent generator");
Player.addItemCreativeInv(510,1, 0);

ModPE.setItem(511,"ender_pearl",0,"Save Ent Modeling");
Player.addItemCreativeInv(511, 1, 0);

ModPE.overrideTexture("images/mob/ent.png","https://raw.githubusercontent.com/Duduzzing/MCPE-ModPE-Script/master/Ent%20generator/ent.png" );


var entGenerator = 510;
var entSpawner = 509;
var entSaver = 511;

var lang = java.util.Locale.getDefault().getLanguage();
var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

var entArray=[];
var target = [];
var originalHealth=[];
var cool ={};
cool.attack=[];
cool.tree=[];
cool.fireBall=[];
cool.bloodSucking= [];
cool.photosynthesis=[];
function findTarget(itself){
    var all = Entity.getAll();
    for(var a in all){
        var ax=Entity.getX(all[a]);
        var ay=Entity.getY(all[a]);
        var az=Entity.getZ(all[a]);
        var X=ax-Entity.getX(itself);
        var Y=ay-Entity.getY(itself);
        var Z=az-Entity.getZ(itself);
        var dis = Math.sqrt(X*X+Y*Y+Z*Z);
        if(dis <= 20 &&
        Entity.getHealth(all[a]) > 0 &&
        all[a] != itself &&
        ([10,11,12,13,14,15,16,32,33,34,35,36,37,38,39].indexOf(Entity.getEntityTypeId(all[a]))+1)
        ){
            return all[a];
        }
    }
    return null;
}

function follow(follower,target,minDis)
{
    var x = Entity.getX(target) - Entity.getX(follower);
    var y = Entity.getY(target) - Entity.getY(follower);
    var z = Entity.getZ(target) - Entity.getZ(follower);
    var dis = Math.sqrt(x * x + y * y + z * z);
    function face(entity,target,x, z) {
        var l = Math.sqrt(x*x+z*z);
        var sinHorizontal = x/l;
        var cosHorizontal = z/l;
        var tanHorizontal = x/z;
        var acosHorizontal = Math.acos(z/l)*180/Math.PI;
        var alpha = 0;
        if(sinHorizontal > 0 && cosHorizontal > 0 && tanHorizontal > 0) alpha = 360-acosHorizontal;
        else if(sinHorizontal > 0 && cosHorizontal < 0 && tanHorizontal < 0) alpha = 360-acosHorizontal;
        else if(sinHorizontal < 0 && cosHorizontal < 0 && tanHorizontal > 0) alpha = acosHorizontal;
        else if(sinHorizontal < 0 && cosHorizontal > 0 && tanHorizontal < 0) alpha = acosHorizontal;
        else if(cosHorizontal == 1) alpha = 0;
        else if(sinHorizontal == 1) alpha = 90;
        else if(cosHorizontal == -1) alpha = 180;
        else if(sinHorizontal == -1) alpha = 270;
        else if(sinHorizontal == 0 && cosHorizontal == 1 && tanHorizontal == 0) null;
        Entity.setRot(entity, alpha, 90);
    }
    face(follower,target, x, z);
    if(dis<minDis) return;
    setVelX(follower, x / dis / 5);
    setVelZ(follower, z / dis / 5);
    var noJump = [0,6,8,9,10,11,27,31,32,37,38,39,40,50,51,59,63,65,66,68,78,83,85,104,105,106,107,111,127,139,141,142,171,244];
    var ex = Entity.getX(follower);
    var ey = Entity.getY(follower);
    var ez = Entity.getZ(follower);
    if(!(noJump.indexOf(getTile(ex-1,ey,ez))+1)
    ||!(noJump.indexOf(getTile(ex+1,ey,ez))+1)
    ||!(noJump.indexOf(getTile(ex,ey,ez-1))+1)
    ||!(noJump.indexOf(getTile(ex,ey,ez+1))+1))
    Entity.setVelY(follower,0.2);
}

function entAI(){
    entArray.forEach(
    function(ent, index){
        cool.attack[index]++;
        cool.tree[index]++;
        cool.fireBall[index]++;
        cool.bloodSucking[index]++;
        cool.photosynthesis[index]++;
        if(cool.photosynthesis[index] > 100){
            var totalHealth = Entity.getHealth(ent) + originalHealth[index]/4;
            if(totalHealth > originalHealth[index]){
                totalHealth = originalHealth[index];
            }
            Entity.setHealth(ent, totalHealth);
            cool.photosynthesis[index]=0;
        }
        if(target[index] != null){
            var tx=Entity.getX(target[index]);
            var ty=Entity.getY(target[index]);
            var tz=Entity.getZ(target[index]);
            follow(ent, target[index], 8);
            var X=tx-Entity.getX(ent);
            var Y=ty-Entity.getY(ent);
            var Z=tz-Entity.getZ(ent);
            var dis = Math.sqrt(X*X+Y*Y+Z*Z);
            if(dis < 15){
                if(cool.attack[index] > 20){
                    var hurt1 = Level.spawnMob(tx,ty, tz,80);
                    Entity.setRenderType(hurt1,0);
                    Entity.setVelY(hurt1,3);
                    Entity.setHealth(target[index], Entity.getHealth(target[index])-2);
                    cool.attack[index] = 0;
                }
                if(cool.bloodSucking[index] > 200){
                    for(var tyy = ty-1; tyy <= ty+1;tyy++){
                        Level.setTile(tx, tyy, tz, 17);
                        Level.addParticle(ParticleType.redstone,tx,tyy,tz,0,0,0,15);
                    }
                    var hurt = Level.spawnMob(tx,ty, tz,80);
                    Entity.setRenderType(hurt,0);
                    Entity.setVelY(hurt,2);
                    var health = Entity.getHealth(target[index])- originalHealth[index]/4;
                    var totalHealth = Entity.getHealth(ent) + originalHealth[index]/4;
                    if(totalHealth > originalHealth[index]){
                        totalHealth = originalHealth[index];
                    }
                    Entity.setHealth(target[index], health);
                    Entity.setHealth(ent, totalHealth);
                    cool.bloodSucking[index] = 0;
                }
                if(cool.tree[index] > 80){
                    for(var txx = tx-1;txx <= tx+1;txx++){
                        for(var tyy = ty-1;tyy <= ty+1;tyy++){
                            for(var tzz = tz-1;tzz <= tz+1;tzz++){
                                if(Level.getTile(txx, tyy, tzz) != 7)
                                Level.setTile(txx, tyy, tzz, 17+Math.floor(Math.random()*2));
                            }
                        }
                    }
                    cool.tree[index] = 0;
                }
                if(cool.fireBall[index] > 50 ){
                    Level.setTile(tx, ty-1, tz, 17);
                    Level.setTile(tx, ty, tz, 51);
                    Entity.setFireTicks(target[index],40);
                    Level.explode(tx, ty-1, tz, 4);
                    cool.fireBall[index] = 0;
                }
            }
            if(Entity.getHealth(target[index]) <= 0 || dis > 20){
                target[index]=null;
            }
        }
        else if(target[index] == null){
            target[index]=findTarget(ent);
        }
    }
    );
}


var wood = [17,162];
var touchX, touchY, touchZ;
var modelX = [];
var modelY = [];
var modelZ = [];
var blockTypeArray = [];
var entRenderer;
var size;
var health=0;
function makeEntModel(x, y, z, item){
    if(!(wood.indexOf(Level.getTile(x, y, z))+1) || item!=entGenerator){
    return;
    }
    health=0;
    touchX = x;
    touchY = y;
    touchZ = z;
    modelX = [];
    modelY = [];
    modelZ = [];
    blockTypeArray = [];
    
    //fill in the arrays above
    getTreeBlocks(x, y, z);
    
    //convert
    convertModelArray();
    
    //eval modeling    
    tempModel();
    
    var ENT =Level.spawnMob(x, y+1,z,11,"mob/ent.png");
    Entity.setHealth(ENT, health);
    Entity.setCollisionSize(ENT,size[0],size[1],size[2])
    Entity.setRenderType(ENT, entRenderer.renderType);
    entArray.push(ENT);
    target.push(null);
    originalHealth.push(health);
    cool.attack.push(0);
    cool.tree.push(0);
    cool.fireBall.push(0);
    cool.bloodSucking.push(0);
    cool.photosynthesis.push(0);
}
function getTreeBlocks(x, y, z){
    var tree =[17,18,161,162];
    if(!(tree.indexOf(Level.getTile(x,y,z))+1))
    return;
    var tile=Level.getTile(x,y,z);
    modelX.push(x);
    modelY.push(y);
    modelZ.push(z);
    health += 5;
    
    //0 is wood, 1 is leaves
    var blockType;
    switch(tile){
        case 17: case 162:
        blockType = 0;
        break;
        case 18: case 161:
        blockType = 1;
        break;
    }
    blockTypeArray.push(blockType);
    Level.setTile(x,y,z,0);
    java.lang.Thread.sleep(1);
    if(tree.indexOf(Level.getTile(x-1,y,z))+1)
    getTreeBlocks(x-1,y,z);
    if(tree.indexOf(Level.getTile(x+1,y,z))+1)
    getTreeBlocks(x+1,y,z);
    if(tree.indexOf(Level.getTile(x,y-1,z))+1)
    getTreeBlocks(x,y-1,z);
    if(tree.indexOf(Level.getTile(x,y+1,z))+1)
    getTreeBlocks(x,y+1,z);
    if(tree.indexOf(Level.getTile(x,y,z-1))+1)
    getTreeBlocks(x,y,z-1);
    if(tree.indexOf(Level.getTile(x,y,z+1))+1)
    getTreeBlocks(x,y,z+1);
}
function convertModelArray(){
    var smallX=Math.min.apply(null, modelX);
    var smallY=Math.min.apply(null, modelY);
    var smallZ=Math.min.apply(null, modelZ);
    var bigX=Math.max.apply(null, modelX);
    var bigY=Math.max.apply(null, modelY);
    var bigZ=Math.max.apply(null, modelZ);
    var x =bigX-smallX;
    var y =bigY-smallY;
    var z =bigZ-smallZ;
    size = [x+1,y+1,z+1];
    var centerX = smallX+(x/2);
    var centerZ = smallZ+(z/2);
    touchX -= centerX;
    touchY -= smallY;
    touchZ -= centerZ;
    modelX = modelX.map(function(m){
        return m-centerX;
    }
    );
    modelY = modelY.map(function(m){
        return m-smallY;
    }
    );
    modelZ = modelZ.map(function(m){
        return m-centerZ;
    }
    );
}
function tempModel(){
    eval("function entModel(ent){"+
        "var Model = ent.getModel();"+
        "var head = Model.getPart('head');"+
        "var body = Model.getPart('body');"+
        "var rArm = Model.getPart('rightArm');"+
        "var lArm = Model.getPart('leftArm');"+
        "var rLeg = Model.getPart('rightLeg');"+
        "var lLeg = Model.getPart('leftLeg');"+
        "head.clear();body.clear();rArm.clear();lArm.clear();rLeg.clear();lLeg.clear();"+
        "for(var a=0;a<modelX.length; a++){"+
            "var textX, textY;"+
            "if(blockTypeArray[a]==0){textX=0;textY=0;}"+
            "if(blockTypeArray[a]==1){textX=32;textY=0;}"+
            "if(modelX[a]==touchX&& modelY[a]==touchY&& modelZ[a]==touchZ)"+
            "body.setTextureOffset(0,16,true);"+
            "else "+
            "body.setTextureOffset(textX, textY,true);"+
            "var x=modelX[a]*16;"+
            "var y=-(modelY[a]*16);"+
            "var z=modelZ[a]*16;"+
        "body.addBox(x, y+12, z, 8,8,8, 4);}}"+
    "entRenderer = Renderer.createHumanoidRenderer();"+
    "entModel(entRenderer);");
}

function saveEntModel(){
    try{
        if(entRenderer == undefined){
            (lang=="ko")?
            clientMessage("[엔트젠] 저장할 엔트 모델링이 없습니다."):
            clientMessage("[EntGen] There's no Ent modeling to save.");
            return;
        }
        var file;
        var num=0;
        var dir = java.io.File(sdcard + "/Duduzzing/Ent-Generator");
        if(!dir.exists());
        dir.mkdirs();
        while(true){
            file = java.io.File(sdcard + "/Duduzzing/Ent-Generator/EntModeling"+num+".js");
            if(!file.exists()){
                break;
            }
            num++;
        }
        var toWrite =
        ["function entModel(ent){",
            "var modelX = "+uneval(modelX)+";",
            "var modelY = "+uneval(modelY)+";",
            "var modelZ = "+uneval(modelZ) +";",
            "var touchX = "+uneval(touchX) +";",
            "var touchY = "+uneval(touchY) +";",
            "var touchZ = "+uneval(touchZ) +";",
            "var blockTypeArray = "+uneval(blockTypeArray)+";",
            "var Model = ent.getModel();",
            "var head = Model.getPart('head');",
            "var body = Model.getPart('body');",
            "var rArm = Model.getPart('rightArm');",
            "var lArm = Model.getPart('leftArm');",
            "var rLeg = Model.getPart('rightLeg');",
            "var lLeg = Model.getPart('leftLeg');",
            "head.clear();body.clear();rArm.clear();lArm.clear();rLeg.clear();lLeg.clear();",
            "for(var a=0;a<modelX.length; a++){",
                "var textX, textY;",
                "if(blockTypeArray[a]==0){textX=0;textY=0;}",
"if(blockTypeArray[a]==1){textX=32;textY=0;}",
                "if(modelX[a]==touchX&& modelY[a]==touchY&&modelZ[a]==touchZ)",
                "body.setTextureOffset(0,16,true);",
                "else",
                "body.setTextureOffset(textX, textY,true);",
                "var x=modelX[a]*16;",
                "var y=-(modelY[a]*16);",
                "var z=modelZ[a]*16;",
            "body.addBox(x, y+12, z, 8,8,8, 4);}}",
        "var entRenderer = Renderer.createHumanoidRenderer();",
        "entModel(entRenderer);",
        "ModPE.overrideTexture('images/mob/ent.png','https://raw.githubusercontent.com/Duduzzing/MCPE-ModPE-Script/master/Ent%20generator/ent.png');",
        "function useItem(x, y, z,I){",
        "if(I==280){",
        "var a = Level.spawnMob(x, y, z, 11,'mob/ent.png');",
        "Entity.setRenderType(a, entRenderer.renderType);",
        "}}"                
        ];
        
        var fos = new java.io.FileOutputStream(file);
        var ow = new java.io.OutputStreamWriter(fos);
        var w = new java.io.BufferedWriter(ow);
        for(var a in toWrite){
            var str = toWrite[a]+"\n";
            w.write(str);
        }
        w.close();
        ow.close();
        fos.close();
        (lang=="ko")?
        clientMessage("[엔트젠] 엔트 모델링을 저장했습니다."):
        clientMessage("[EntGen] Saved Ent modeling.");
    }
    catch(e){
        clientMessage(e + " " + e.lineNumber);
    }
}

function spawnEnt(x, y, z){
    if(entRenderer == undefined){
        (lang=="ko")?
        clientMessage("[엔트젠] 엔트를 복사하기전에 하나의 엔트를 만들어주세요."):
        clientMessage("[EntGen] Please make a Ent before replication.");
        return;
    }
    var ENT =Level.spawnMob(x, y+1,z,11,"mob/ent.png");
    Entity.setHealth(ENT, health);
    Entity.setCollisionSize(ENT,size[0],size[1],size[2])
    Entity.setRenderType(ENT, entRenderer.renderType);
    entArray.push(ENT);
    target.push(null);
    originalHealth.push(health);
    cool.attack.push(0);
    cool.tree.push(0);
    cool.fireBall.push(0);
    cool.bloodSucking.push(0);
    cool.photosynthesis.push(0);
}
function useItem(x, y, z, I,b, s){
    new java.lang.Thread( new java.lang.Runnable({run:function(){
            makeEntModel(x, y, z, I);
            if(I==entSpawner){
                spawnEnt(x, y, z);
            }
            if(I==entSaver){
                saveEntModel();
            }
        }
    }
    )).start();
}

function entityRemovedHook(entity){
    for(var e in entArray){
        if(entArray[e] == entity){
            entArray.splice(e,1);
            target.splice(e,1);
            originalHealth.splice(e,1);
            cool.attack.splice(e,1);
            cool.tree.splice(e,1);
            cool.fireBall.splice(e,1);
            cool.bloodSucking.splice(e,1);
            cool.photosynthesis.splice(e,1);
            break;
        }
    }
}

function newLevel(){
    new java.lang.Thread( new java.lang.Runnable({run:function(){
            while(true){
                entAI();
                java.lang.Thread.sleep(50);
            }
        }
    }
    )).start();
}

function attackHook(a, v){
    for each(var e in entArray){
        if( v == e){
            target[entArray.indexOf(e)]=Player.getEntity();
            break;
        }
    }
}