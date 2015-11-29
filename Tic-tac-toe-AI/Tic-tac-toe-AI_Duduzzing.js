/**
 * Tic-tac-toe AI 
 * 
 * Copyright © Duduzzing / 두두찡
 * All rights deserved
 * 
 */
 
 

var SDCARD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

var CTX = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var PECTX = CTX.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);

var tempScreenWidth = CTX.getWindowManager().getDefaultDisplay().getWidth();

var tempScreenHeight = CTX.getWindowManager().getDefaultDisplay().getHeight();

var screenWidth = Math.max( tempScreenWidth, tempScreenHeight);

var screenHeight = Math.min( tempScreenWidth, tempScreenHeight);

var FONT_PATH = SDCARD + "/Team-AS/Black-Room/minecraft.ttf"

var Bitmap = android.graphics.Bitmap;

var BitmapFactory = android.graphics.BitmapFactory;

var Button = android.widget.Button;

var Color = android.graphics.Color;

var Drawable = android.graphics.drawable;

var EditText = android.widget.EditText;

var Gravity = android.view.Gravity;

var GridLayout = android.widget.GridLayout;

var ImageView = android.widget.ImageView;

var LinearLayout = android.widget.LinearLayout;

var PopupWindow = android.widget.PopupWindow;

var Space = android.widget.Space;

var TextView = android.widget.TextView;

var View = android.view.View;


var peAssets = PECTX.getAssets();

var spritesheet = new BitmapFactory.decodeStream(peAssets.open("images/gui/spritesheet.png"));

function error(e) {
	 
	 CTX.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{    
  var dialog = new android.app.AlertDialog.Builder(CTX);
  
		var text = new EditText(CTX);
		
		text.setText(e + "\nLineNumber : " + e.lineNumber);
		
		var scroll = new android.widget.ScrollView(CTX);
		
		scroll.addView(text);
		
		dialog.setTitle("<Tic-tac-toe> Error!");
		
		dialog.setView(scroll);
		
		dialog.setNegativeButton("Exit", null);
		
		dialog.setPositiveButton("Copy to clipboard",new android.content.DialogInterface.OnClickListener({onClick:function(){
			
			 CTX.getSystemService(android.content.Context.CLIPBOARD_SERVICE).setText(text.getText());
			 
			 android.widget.Toast.makeText(CTX,"Copied to clipboard", android.widget.Toast.LENGTH_LONG).show(); 
			 			
	 }}));
		dialog.create();
		dialog.show();
   
   }catch(e){
   	
   	print(e);
    }
    }}));
};





function showGameboard(){

CTX.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{
				 	
			 var window = new PopupWindow(CTX);
				
				var topbarLayout = new LinearLayout(CTX);
				
				topbarLayout.setOrientation(1);
				
				var topbarBtn = new Button(CTX);
				
				topbarBtn.setText("Tic-tac-toe");
				
				topbarBtn.setHeight(screenHeight/8);
				
				
				topbarLayout.addView(topbarBtn);
				
				
				var gridLayout = new GridLayout(CTX);
				
				
				
				gridLayout.setColumnCount(3);
				
				for(var a =0;a<9;a++){
					
					var btn = new Button(CTX);
										
					gridLayout.addView(btn);
					
				}
				
				
				topbarLayout.addView(gridLayout);
								
				window.setWidth(screenWidth/2);
				window.setHeight(screenHeight/2);
				
				window.setContentView(topbarLayout);
				 
			 window.setBackgroundDrawable(new Drawable.ColorDrawable(Color.argb(230, 0, 0, 0)));

      window.showAtLocation(CTX.getWindow().getDecorView(), Gravity.CENTER, 0, 0);

			 }catch(e){
   	
   error(e);
    }
    }}));  

}





var startBtnWindow = null;
var isStartBtnShowing = false;
var isPlaying = false;

function showStartBtn(){

isStartBtnShowing = true;

	 CTX.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{
				
				startBtnWindow = new PopupWindow(CTX);
				
				var btn = new Button(CTX);

var str;
var random=Math.floor(Math.random()*5);

switch(random){

case 0: str = "게임 한판?"; break;
case 1: str = "결투를 신청한다!"; break;
case 2: str = "도전을 받아들이지!"; break;
case 3: str = "나와 실력을 겨루자!"; break;
case 4: str = "네게 도전하겠다!"; break;

}
				
btn.setText(str);

                    btn.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function (view) {
try{
           dismissStartBtn();
           
           isPlaying = true;
           
           showGameboard();
           
}catch(e){
	error(e);
	}
                        }
                    }));
                     				
				
				startBtnWindow.setWidth(screenWidth/3);
				startBtnWindow.setHeight(screenHeight/5);
				
				startBtnWindow.setContentView(btn);
				 
			  startBtnWindow.setBackgroundDrawable(new Drawable.ColorDrawable(Color.argb(0, 0, 0, 0)));

       startBtnWindow.showAtLocation(CTX.getWindow().getDecorView(), Gravity.CENTER, 0, 50);

			 }catch(e){
   	
   error(e);
    }
    }}));  

}


function dismissStartBtn(){
	
	 	 CTX.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{
			if(startBtnWindow != null){
			startBtnWindow.dismiss();
			}
			startBtnWindow = null;
			isStartBtnShowing = false;
			
			 }catch(e){
   	
   error(e);
    }
    }}));
	
	
}





function modTick(){

var pointedEntId = Entity.getEntityTypeId(Player.getPointedEntity());

if(pointedEntId == 15 &&
isStartBtnShowing == false &&
isPlaying == false){

showStartBtn();

}else{

dismissStartBtn();

}



}





