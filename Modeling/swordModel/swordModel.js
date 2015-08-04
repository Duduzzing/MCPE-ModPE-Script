

function attackHook(a, v){
	
Entity.setRenderType(v, sword.renderType);	

Entity.setMobSkin(v,"/mob/sword.png");
}

function swordRender(ent){

var Model = ent.getModel();	
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



body.setTextureOffset(4, 0);
body.addBox(-2.5  , 23.5  , 15.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , 23.5  , 13.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , 23.5  , 11.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , 21.5  , 15.5  , 1, 1, 1, 0.5);

body.setTextureOffset(0, 4);
body.addBox(-2.5  , 21.5  , 13.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4, 0);
body.addBox(-2.5  , 21.5  , 11.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , 19.5  , 15.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , 19.5  , 13.5  , 1, 1, 1, 0.5);

body.setTextureOffset(8,2);
body.addBox(-2.5  , 19.5  , 11.5  , 1, 1, 1, 0.5);

body.setTextureOffset(8,6);
body.addBox(-2.5  , 19.5  , 9.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4, 0);
body.addBox(-2.5  , 19.5  , -0.5  , 1, 1,1, 0.5);
body.addBox(-2.5  , 19.5  , -2.5  , 1, 1, 1, 0.5);

body.setTextureOffset(8,0);
body.addBox(-2.5  , 17.5  , 11.5  , 1, 1, 1, 0.5);
body.setTextureOffset(8,4);
body.addBox(-2.5  , 17.5  , 9.5  , 1, 1, 1, 0.5);
body.setTextureOffset(8,6);
body.addBox(-2.5  , 17.5  , 7.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4,0);
body.addBox(-2.5  , 17.5  , 3.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , 17.5  , 1.5  , 1, 1, 1, 0.5);

body.setTextureOffset(0, 0);
body.addBox(-2.5  , 17.5  , -0.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4, 0);
body.addBox(-2.5  , 17.5  , -2.5  , 1, 1, 1, 0.5);

body.setTextureOffset(8,0);
body.addBox(-2.5  , 15.5  , 9.5  , 1, 1, 1, 0.5);
body.setTextureOffset(8,2);
body.addBox(-2.5  , 15.5  , 7.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4, 0);
body.addBox(-2.5  , 15.5  , 5.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4, 4);
body.addBox(-2.5  , 15.5  , 3.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 0);
body.addBox(-2.5  , 15.5  , 1.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4, 0);
body.addBox(-2.5  , 15.5  , -0.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , 13.5  , 7.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4, 4);
body.addBox(-2.5  , 13.5  , 5.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4,0);
body.addBox(-2.5  , 13.5  , 3.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , 13.5  , 1.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , 11.5  , 9.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4, 4);
body.addBox(-2.5  , 11.5  , 7.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4,0);
body.addBox(-2.5  , 11.5  , 5.5  , 1, 1, 1, 0.5);

body.setTextureOffset(0, 4);
body.addBox(-2.5  , 11.5  , 3.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , 11.5  , 1.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 0);
body.addBox(-2.5  , 11.5  , -0.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4,0);
body.addBox(-2.5  , 9.5  , 9.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4, 4);
body.addBox(-2.5  , 9.5  , 7.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4,0);
body.addBox(-2.5  , 9.5  , 5.5  , 1, 1, 1, 0.5);

body.setTextureOffset(0, 2);
body.addBox(-2.5  , 9.5  , 3.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 4);
body.addBox(-2.5  , 9.5  , 1.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , 9.5  , -0.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 0);
body.addBox(-2.5  , 9.5  , -2.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4, 0);
body.addBox(-2.5  , 7.5  , 11.5  , 1, 1, 1, 0.5);

body.setTextureOffset(0, 0);
body.addBox(-2.5  , 7.5  , 9.5  , 1, 1, 1, 0.5);
body.setTextureOffset(4, 0);
body.addBox(-2.5  , 7.5  , 7.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 0);
body.addBox(-2.5  , 7.5  , 3.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , 7.5  , 1.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 4);
body.addBox(-2.5  , 7.5  , -0.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , 7.5  , -2.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 0);
body.addBox(-2.5  , 7.5  , -4.5  , 1, 1, 1, 0.5);

body.setTextureOffset(4, 0);
body.addBox(-2.5  , 5.5  , 11.5  , 1, 1, 1, 0.5);

body.addBox(-2.5  , 5.5  , 9.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 0);
body.addBox(-2.5  , 5.5  , 1.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , 5.5  , -0.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 4);
body.addBox(-2.5  , 5.5  , -2.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , 5.5  , -4.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 0);
body.addBox(-2.5  , 5.5  , -6.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , 3.5  , -0.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , 3.5  , -2.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 4);
body.addBox(-2.5  , 3.5  , -4.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , 3.5  , -6.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 0);
body.addBox(-2.5  , 3.5  , -8.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , 1.5  , -2.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , 1.5  , -4.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 4);
body.addBox(-2.5  , 1.5  , -6.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , 1.5  , -8.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 0);
body.addBox(-2.5  , 1.5  , -10.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , -0.5  , -4.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , -0.5  , -6.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 4);
body.addBox(-2.5  , -0.5  , -8.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , -0.5  , -10.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 0);
body.addBox(-2.5  , -0.5  , -12.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , -2.5  , -6.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , -2.5  , -8.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 4);
body.addBox(-2.5  , -2.5  , -10.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , -2.5  , -12.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 0);
body.addBox(-2.5  , -2.5  , -14.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , -4.5  , -8.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , -4.5  , -10.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 4);
body.addBox(-2.5  , -4.5  , -12.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , -4.5  , -14.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 0);
body.addBox(-2.5  , -4.5  , -16.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , -6.5  , -10.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 2);
body.addBox(-2.5  , -6.5  , -12.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 4);
body.addBox(-2.5  , -6.5  , -14.5  , 1, 1, 1, 0.5);
body.setTextureOffset(0, 0);
body.addBox(-2.5  , -6.5  , -16.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , -8.5  , -12.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , -8.5  , -14.5  , 1, 1, 1, 0.5);
body.addBox(-2.5  , -8.5  , -16.5  , 1, 1, 1, 0.5);






}

var sword=Renderer.createHumanoidRenderer();

swordRender(sword);





