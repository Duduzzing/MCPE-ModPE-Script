
/**
 * Dudu-Modeler
 * (in-game model editor)
 * 
 * Copyright © Duduzzing
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

var language = java.util.Locale.getDefault().getLanguage();

var tempLang = {

en : {
	

	
},
ko : {
	
	

}

};

var lang;

(language == "ko") ? lang = tempLang.ko : lang = tempLang.en;





/**
 * Show the error in a dialog
 * use in try-catch
 */

function error(e) {
	 
	 CTX.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{    
  var dialog = new android.app.AlertDialog.Builder(CTX);
  
		var text = new EditText(CTX);
		
		text.setText(e + "\nLineNumber : " + e.lineNumber);
		
		var scroll = new android.widget.ScrollView(CTX);
		
		scroll.addView(text);
		
		dialog.setTitle("<Dudu modeler> Error!");
		
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






startMenu : {
	
title = "New Model",
modelNameText = "Model name",
modelNameHint = "Untitled",
modelBaseText = "Model base",



}


function showStartMenu(){
	
	 CTX.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{    
  var dialog = new android.app.AlertDialog.Builder(CTX);
  
  	dialog.setTitle(lang.startMenu.title);
  	
  	var modelNameText = new TextView(CTX);
  	
  	modelNameText.setText(lang.startMenu.modelNameText);
  	
  	var modelNameEdit = new EditText(CTX);
  	
  	modelNameEdit.setHint(lang.startMenu. modelNameHint);
  	
  	 var modelBaseText = new TextView(CTX);
  	
  	modelBaseText.setText(lang.startMenu.modelBaseText);
  	
  	









  
		var text = new EditText(CTX);
		
		text.setText(e + "\nLineNumber : " + e.lineNumber);
		
		var scroll = new android.widget.ScrollView(CTX);
		
		scroll.addView(text);
		
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
	
}




































