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

var screenWidth = Math.max(tempScreenWidth, tempScreenHeight);

var screenHeight = Math.min(tempScreenWidth, tempScreenHeight);

var Bitmap = android.graphics.Bitmap;

var BitmapFactory = android.graphics.BitmapFactory;

var Button = android.widget.Button;

var Canvas = android.graphics.Canvas;

var Color = android.graphics.Color;

var Drawable = android.graphics.drawable;

var EditText = android.widget.EditText;

var Gravity = android.view.Gravity;

var GridLayout = android.widget.GridLayout;

var ImageView = android.widget.ImageView;

var LinearLayout = android.widget.LinearLayout;

var Paint = android.graphics.Paint;

var PopupWindow = android.widget.PopupWindow;

var ScrollView = android.widget.ScrollView;

var Space = android.widget.Space;

var TextView = android.widget.TextView;

var View = android.view.View;

var language = java.util.Locale.getDefault().getLanguage();

var tempLang = {

    en: {
        yes: "Yes",
        No: "No",
        copyNoti: "Box copied",
        errorMessage: {
        int: "Please enter Integer",
        intOrFloat: "Please enter Intager or Float",
        positive: "Please enter positive number",
        string: "Please enter the combination of Alphabets, numbers, and _ (underbar)"	        	
        },
        confirm :{
        deleteAllBoxes:{
        title: "Delete confirm",
        text: "Are you sure you want to delete all boxes?"	        	
        },
        exit:{
            title: "Confirm exit",
            text: "Are you sure you wanna exit?"
        }        	
        },
        startMenu: {
            title: "New Model",
            editTitle: "Edit project",
            modelNameText: "Model name",
            modelNameEdit: "Untitled",
            modelBaseText: "Model base",
            emptyModel: "Empty model",
            humanoidModel: "Humanoid model",
            textureWidthText: "Texture width",
            textureWidthEdit: "X",
            textureHeightText: "Texture height",
            textureHeightEdit: "Y",
            create: "Create",
            exit: "Exit"
        },
        leftWindow: {
            boxNameText: "Selected box name",
            dimensionText: "Dimension",
            dimensionEditX: "Width",
            dimensionEditY: "Height",
            dimensionEditZ: "Length",
            rotationPointText: "Rotation point",
            rotationPointEditX: "X",
            rotationPointEditY: "Y",
            rotationPointEditZ: "Z",
            offsetText: "Offset",
            offsetEditX: "X",
            offsetEditY: "Y",
            offsetEditZ: "Z",
            scaleText: "Scale",
            scaleEdit: "Scale",
            textOffsetText: "Texture offset",
            textOffsetEditX: "X",
            textOffsetEditY: "Y",
            addBoxBtn: "Add box",
            deleteBoxBtn: "Delete box",
            clearAllBtn: "Clear all",
            copyBtn: "Copy",
            pasteBtn: "Paste",
            showcaseBtn: "Showcase",
            editProjectBtn: "Edit project",
            loadTextureBtn: "Load texture",
            importBtn: "Import",
            exportBtn: "Export",
            helpBtn: "Help",
            infoBtn: "Information",
            exitBtn: "Exit"
        },       
        rightTopWindow : {
            textureMapText : "Texture map (click for bigger image)"
        },
        rightBottomWindow : {
            modelTreeText : "Model tree"
        }

    },
    
    ko: {
        yes: "예",
        no: "아니요",
        copyNoti: "박스가 복사됬습니다",
        errorMessage: {
        int: "정수를 입력해주세요",
        intOrFloat: "정수 또는 소수를 입력해주세요",
        positive: "양수를 입력해주세요",
        string: "알파벳, 숫자, 그리고 _의 조합으로 입력해주세요"	        	
        },
        confirm :{
        deleteAllBoxes:{
        title: "삭제 확인",
        text: "정말로 모든 박스를 지우시겠습니까?"	        	
        },
        exit: {
            title: "나가기 확인",
            text: "정말로 나가시겠습니까?"
        }
        	
        },
        startMenu: {
            title: "새로운 모델링",
            editTitle: "프로젝트 수정",
            modelNameText: "모델링 이름",
            modelNameEdit: "Untitled",
            modelBaseText: "모델링 베이스",
            emptyModel: "빈 모델링",
            humanoidModel: "휴머노이드 모델링",
            textureWidthText: "텍스쳐 가로길이",
            textureWidthEdit: "X",
            textureHeightText: "텍스쳐 세로길이",
            textureHeightEdit: "Y",
            create: "제작",
            exit: "나가기"
        },
        leftWindow: {
            boxNameText: "고른 박스의 이름",
            dimensionText: "치수",
            dimensionEditX: "폭",
            dimensionEditY: "두께",
            dimensionEditZ: "길이",
            rotationPointText: "회전점",
            rotationPointEditX: "X",
            rotationPointEditY: "Y",
            rotationPointEditZ: "Z",
            offsetText: "오프셋",
            offsetEditX: "X",
            offsetEditY: "Y",
            offsetEditZ: "Z",
            scaleText: "치수",
            scaleEdit: "치수",
            textOffsetText: "텍스쳐 오프셋",
            textOffsetEditX: "X",
            textOffsetEditY: "Y",
            addBoxBtn: "박스 추가",
            deleteBoxBtn: "박스 제거",
            clearAllBtn: "모두 제거",
            copyBtn: "복사",
            pasteBtn: "붙여넣기",
            showcaseBtn: "진열 모드",
            editProjectBtn: "프로젝트 수정",
            loadTextureBtn: "스킨 불러오기",
            importBtn: "불러오기",
            exportBtn: "저장",
            helpBtn: "도움말",
            infoBtn: "정보",
            exitBtn: "나가기"
        },
        
        rightTopWindow : {
            textureMapText : "텍스쳐 맵 (클릭하면 크게 보여요)"
        },
        rightBottomWindow : {
            modelTreeText : "모델링 트리"
        }
    }
};

var lang = null;

(language == "ko") ? lang = tempLang.ko : lang = tempLang.en;





/**
 * Show the error in a dialog
 * use in try-catch
 */

function error(e) {

    CTX.runOnUiThread(new java.lang.Runnable({
        run: function () {
            try {
                var dialog = new android.app.AlertDialog.Builder(CTX);

                var text = new EditText(CTX);

                text.setText(e + "\nLineNumber : " + e.lineNumber);

                var scroll = new android.widget.ScrollView(CTX);

                scroll.addView(text);

                dialog.setTitle("<Dudu modeler> Error!");

                dialog.setView(scroll);

                dialog.setNegativeButton("Exit", null);

                dialog.setPositiveButton("Copy to clipboard", new android.content.DialogInterface.OnClickListener({
                    onClick: function () {

                        CTX.getSystemService(android.content.Context.CLIPBOARD_SERVICE).setText(text.getText());

                        android.widget.Toast.makeText(CTX, "Copied to clipboard", android.widget.Toast.LENGTH_LONG).show();

                    }
                }));
                dialog.create();
                dialog.show();
            } catch (err) {

                print(err);
            }
        }
    }));
}


function toast(str) {

    CTX.runOnUiThread(new java.lang.Runnable({
        run: function () {
            try {
                        android.widget.Toast.makeText(CTX, str, android.widget.Toast.LENGTH_LONG).show();
                        
} catch (err) {
                error(err);
            }
        }
    }));
}


function isVar(str){           
  try{                   	
    eval("var "+str+";");
                   
  }catch(e){ 
    return false;                   		                  } 	                   	
  if(/*/[^a-z|^0-9|^_]/gi.test(str)*/
     /\W/g.test(str)
     ){
    return false;    
  }
  return true;   
}


/////////////////////////////////////////////////////////////

var modelTree = [];
//push(new addBox())

var selectedBox = null;
//고른 박스 오브젝트

var textureSize = {x : 64, y : 32};

var modelName = null;

var textureMapLayer = [];
//텍스쳐맵레리어 드로어블 배열

var textureMapBtn;
//텍스쳐맵

var rightBottomLayout;
//모델링 버튼들 추가되는곳

var leftLayout;
//선택된 박스에딧텍스트들 보관

var cloneBox = null;
//복사된 addBox() 객체

/////////////////////////////////////////////////////////////

function addBox() {

try{
    var name = "Box";
    var count = 1;

    for (var a = 0; a < modelTree.length; a++) {
        if(modelTree[a].name == name + count) {
            count++;
            a = -1;
        }
    }

    this.name = name + count;
    this.dimensionX = 1;
    this.dimensionY = 1;
    this.dimensionZ = 1;
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.offsetZ = 0;
    this.textOffsetX = 0;
    this.textOffsetY = 0;
    this.scale = 0;
           
    } catch(err){
    
    error(err);
   }
}


function deleteBox(index){
	try{
		
rightBottomLayout.removeViewAt(index+1);

modelTree.splice(index,1);	
	
selectedBox = null;
                        
                        leftLayout.getChildAt(1).setText("");

                        leftLayout.getChildAt(3).setText( lang.leftWindow.dimensionEditX );
                        leftLayout.getChildAt(4).setText( lang.leftWindow.dimensionEditY);
                        leftLayout.getChildAt(5).setText( lang.leftWindow.dimensionEditZ );
                        leftLayout.getChildAt(7).setText( lang.leftWindow.rotationPointEditX);
                        leftLayout.getChildAt(8).setText(lang.leftWindow.rotationPointEditY);
                       leftLayout.getChildAt(9).setText( lang.leftWindow.rotationPointEditZ);
                       leftLayout.getChildAt(11).setText(lang.leftWindow.offsetEditX);
                       leftLayout.getChildAt(12).setText(lang.leftWindow.offsetEditY);
                       leftLayout.getChildAt(13).setText(lang.leftWindow.offsetEditZ);
                       leftLayout.getChildAt(15).setText(lang.leftWindow.scaleEdit);
                       leftLayout.getChildAt(17).setText(lang.leftWindow.textOffsetEditX);
                       leftLayout.getChildAt(18).setText(lang.leftWindow.textOffsetEditY);


                       
    } catch(err){
    
    error(err);
   }
    }


function deleteAllBoxes(){
	
try{
	                var dialog = new android.app.AlertDialog.Builder(CTX);

                var text = new TextView(CTX);

                text.setText(lang.confirm.deleteAllBoxes.text);

                var scroll = new android.widget.ScrollView(CTX);

                dialog.setView(text);

                dialog.setTitle(lang.confirm.deleteAllBoxes.title);

                dialog.setNegativeButton(lang.no, null);

                dialog.setPositiveButton(lang.yes, new android.content.DialogInterface.OnClickListener({
                    onClick: function () {
                    	
                    if(modelTree.length ==0) return;                    	
                    	
                   rightBottomLayout.removeViews(1, rightBottomLayout.getChildCount()-1);

modelTree =[];	
	
selectedBox = null;
                        
                        leftLayout.getChildAt(1).setText("");

                        leftLayout.getChildAt(3).setText( lang.leftWindow.dimensionEditX );
                        leftLayout.getChildAt(4).setText( lang.leftWindow.dimensionEditY);
                        leftLayout.getChildAt(5).setText( lang.leftWindow.dimensionEditZ );
                        leftLayout.getChildAt(7).setText( lang.leftWindow.rotationPointEditX);
                        leftLayout.getChildAt(8).setText(lang.leftWindow.rotationPointEditY);
                       leftLayout.getChildAt(9).setText( lang.leftWindow.rotationPointEditZ);
                       leftLayout.getChildAt(11).setText(lang.leftWindow.offsetEditX);
                       leftLayout.getChildAt(12).setText(lang.leftWindow.offsetEditY);
                       leftLayout.getChildAt(13).setText(lang.leftWindow.offsetEditZ);
                       leftLayout.getChildAt(15).setText(lang.leftWindow.scaleEdit);
                       leftLayout.getChildAt(17).setText(lang.leftWindow.textOffsetEditX);
                       leftLayout.getChildAt(18).setText(lang.leftWindow.textOffsetEditY);

                   
                    }
                }));
                dialog.create();
                dialog.show();
	
    } catch(err){
    
    error(err);
   } 	
	
}







function showStartMenu(isEditMode) {

    CTX.runOnUiThread(new java.lang.Runnable({
        run: function () {
            try {
                var dialog = new android.app.AlertDialog.Builder(CTX);
                
                if(!isEditMode){

                dialog.setTitle(lang.startMenu.title);} else{
                	
                	 dialog.setTitle(lang.startMenu.editTitle);
                	
                	}
                
                dialog.setCancelable(false);

                var scroll = new android.widget.ScrollView(CTX);

                var layout = new LinearLayout(CTX);

                layout.setOrientation(1);

                var modelNameText = new TextView(CTX);

                modelNameText.setText(lang.startMenu.modelNameText);

                layout.addView(modelNameText);

                var modelNameEdit = new EditText(CTX);

                modelNameEdit.setHint(lang.startMenu.modelNameEdit);
                
                if(modelName != null){
                	
                	modelNameEdit.setText(modelName);
                	
                }
                

                layout.addView(modelNameEdit);

if(!isEditMode){

                var modelBaseText = new TextView(CTX);

                modelBaseText.setText(lang.startMenu.modelBaseText);

                layout.addView(modelBaseText);

                var items = [lang.startMenu.emptyModel, lang.startMenu.humanoidModel];

                var modelBaseSpinner = new android.widget.Spinner(CTX);

                var adapter = new android.widget.ArrayAdapter(CTX, android.R.layout.simple_spinner_dropdown_item, items);
                
adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

                modelBaseSpinner.setAdapter(adapter);

                modelBaseSpinner.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener({
                    onItemSelected: function (view, position) {

                        if (position == 1) {
                            /////////////////////load humanoid model////////////////////////////
                        }

                    }
                }));

                layout.addView(modelBaseSpinner);


}


                var textureWidthText = new TextView(CTX);

                textureWidthText.setText(lang.startMenu.textureWidthText);

                layout.addView(textureWidthText);

                var textureWidthEdit = new EditText(CTX);

                textureWidthEdit.setHint(lang.startMenu.textureWidthEdit);
                
                textureWidthEdit.setText(textureSize.x+"");

                layout.addView(textureWidthEdit);


                var textureHeightText = new TextView(CTX);

                textureHeightText.setText(lang.startMenu.textureHeightText);                

                layout.addView(textureHeightText);

                var textureHeightEdit = new EditText(CTX);

                textureHeightEdit.setHint(lang.startMenu.textureHeightEdit);
                
                textureHeightEdit.setText(textureSize.y+"");

                layout.addView(textureHeightEdit);

                scroll.addView(layout);

                dialog.setView(scroll);

                dialog.setNegativeButton(lang.startMenu.exit, null);

                dialog.setPositiveButton(lang.startMenu.create, new android.content.DialogInterface.OnClickListener({
                    onClick: function () {
                   var name = modelNameEdit.getText();
                   
                   var textX = Math.floor(parseInt(textureWidthEdit.getText()));
                   
                   var textY = Math.floor(parseInt(textureHeightEdit.getText()));      
                   
                    if(!isVar(name)){
                    	
                    	toast(lang.errorMessage.string);
                    	return;
                    	
                    }                                                                
                   if(isNaN(textX) || isNaN(textY)){
                   	
                toast(lang.errorMessage.int);   	
                   	
                return;   	
                   }
                   if(textX < 1 || textY < 1){
                   	
                toast(lang.errorMessage.positive);   	
                   	
                return;   	
                   }       
                                                                                                               
                   modelName = name;
                   textureSize.x = textX;
                   textureSize.y = textY;
                                               
                                            if(!isEditMode) showModelEditMenu();

                    }
                }));
                dialog.create();
                dialog.show();
            } catch (e) {

                error(e);
            }
        }
    }));

} //startMenu func

///////////////////////////////////////////////////////////////



function customEditText(hint, title, type, isInt, isFloat, isPositive){
	
            try {
            	
            	if(hint != "")
            	  title = title+": "+hint;
            	
            	var btn = new Button(CTX);
            	
            	btn.setGravity(Gravity.LEFT | Gravity.CENTER);
            	            	
            	var params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
            	
            	params.setMargins(0,2,0,2);
            	
            	btn.setLayoutParams(params);            	
            	
            	var paint = new Paint();
            	
            	paint.setStyle(Paint.Style.STROKE);
            	
            	paint.setStrokeWidth(3);
            	
            	paint.setColor(Color.argb(130,255,255,255));
            	            	            	                                  	            	
            	var bit1 = Bitmap.createBitmap(screenWidth/4, 18, Bitmap.Config.ARGB_8888 );

            var rect = new android.graphics.Rect(-1,-1, bit1.getWidth(), bit1.getHeight());                        
                    
var canvas = new Canvas(bit1); 

canvas.drawRect(rect, paint);
            	
            	btn.setBackgroundDrawable(new Drawable.BitmapDrawable(bit1));
            	
            	btn.setTextColor(Color.WHITE);
            	
            	btn.setText(hint);
            	
            	btn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view){
                    	try{
                    		
                    	if(selectedBox == null) return; 
                    	     	                                                               	
                var dialog = new android.app.AlertDialog.Builder(CTX);

                dialog.setTitle(title);

                var scroll = new android.widget.ScrollView(CTX);

                var edit = new EditText(CTX);
                if(btn.getText() != hint)               
                edit.setHint(btn.getText());

                scroll.addView(edit);

                dialog.setView(scroll);

                dialog.setPositiveButton(lang.yes, new android.content.DialogInterface.OnClickListener({
                    onClick: function () {
                    	
                    	try{
                    	
                    	var text = edit.getText()+"";
                    	
                    	if(text=="")
                    	return;
                    	
                    	if(isInt){
                    	text = Math.floor(parseInt(text));
                    	
                    	if(isNaN(text)){
                     	
                     	toast(lang.errorMessage.int);
                     	
                     	return;
                     	
                     	}
                     	if(isPositive && text < 0){
                     		
                     		toast(lang.errorMessage.positive);
                     		
                     		return;
                     	
                     		
                     	}
                    	
                    	}

                     else if(isFloat){
                     text = parseFloat(text);                     
                     
                     if(isNaN(text)){
                     	
                     	toast(lang.errorMessage.intOrFloat);
                     	
                     	return;
                     	
                     	}
                     	
                     	 if(isPositive && text < 0){
                     		
                     		toast(lang.errorMessage.positive);
                     		
                     		return;
                     	
                     		
                     	}
                     	
                     	   
                     
                     } else if(!isVar(text)){
                     	toast(lang.errorMessage.string);
                     	
                     	return;
                     	
                     	
                     	}
                     
                    	               	
                     	
                     eval("selectedBox."+type+" = text;");
                     
                     
                                                                                  	                    btn.setText(text+"");    	
                   if(type == "name" )                       
                   rightBottomLayout.getChildAt(modelTree.indexOf(selectedBox)+1).setText(text);              
                   
                   }catch(r){
                       	
                       	error(r);
                       	} 

                    }
                }));
                dialog.create();
                dialog.show();
            
                
             }catch(err){
                      
                      
                      error(err);
                     }  
                      
                      
                         
                
            }
                }));    
                
            return btn;
                
            } catch (e) {

                error(e);
            }


}





function pasteBox(toClone){
		
    this.name = toClone.name;
    this.dimensionX = toClone.dimensionX;
    this.dimensionY = toClone.dimensionY;
    this.dimensionZ = toClone.dimensionZ;
    this.rotationX = toClone.rotationX;
    this.rotationY = toClone.rotationY;
    this.rotationZ = toClone.rotationZ;
    this.offsetX = toClone.offsetX;
    this.offsetY = toClone.offsetY;
    this.offsetZ = toClone.offsetZ;
    this.textOffsetX = toClone.textOffsetX;
    this.textOffsetY = toClone.textOffsetY;
    this.scale = toClone.scale;
	
}


function copyBox(clone){
	
cloneBox = new pasteBox(clone);

toast(lang.copyNoti);
	
}



function saveProject(){
 
  new java.lang.Thread(new java.lang.Runnable({
    run: function() { 
  try {
    var file = java.io.File(SDCARD + "/Download/aaa/"+modelName+".dm");
    
                  
    var theCount = 1;

    while(true) {
        if(file.exists()) {            
            file = java.io.File(SDCARD + "/Download/aaa/"+modelName+"_"+theCount+".dm");
            theCount++;
        }else{
        break;
        }
    }
    
    var parent = file.getParentFile();
    
    if(! parent.exists()){
    	
    	parent.mkdirs();
    	
    	}    	
    
    var fos = new java.io.FileOutputStream(file);
    var ow = new java.io.OutputStreamWriter(fos);
    var w = new java.io.BufferedWriter(ow);
    
    w.write(JSON.stringify(modelTree));

    w.close();
    ow.close();
    fos.close();

  } catch(e) {

   error(e);  	
  	
  }
  }})).start();

}



function loadProject(){
	
	
	
}


function showModelEditMenu() {
    CTX.runOnUiThread(new java.lang.Runnable({
        run: function () {
            try {

                var leftWindow = new PopupWindow(CTX);

                var leftScroll = new ScrollView(CTX);
                leftLayout = new LinearLayout(CTX);

                leftLayout.setOrientation(1);

                var boxNameText = new TextView(CTX);

                boxNameText.setText(lang.leftWindow.boxNameText);

                leftLayout.addView(boxNameText);

                var boxNameEdit = customEditText("", lang.leftWindow.boxNameText, "name");

                leftLayout.addView(boxNameEdit);


                var dimensionText = new TextView(CTX);

                dimensionText.setText(lang.leftWindow.dimensionText);

                leftLayout.addView(dimensionText);


                var dimensionEditX = customEditText(lang.leftWindow.dimensionEditX, lang.leftWindow.dimensionText, "dimensionX",true, false, true);

                leftLayout.addView(dimensionEditX);


                var dimensionEditY = customEditText(lang.leftWindow.dimensionEditY, lang.leftWindow.dimensionText, "dimensionY",true, false,true);

                leftLayout.addView(dimensionEditY);


                var dimensionEditZ =  customEditText(lang.leftWindow.dimensionEditZ, lang.leftWindow.dimensionText, "dimensionZ", true,false, true);

                leftLayout.addView(dimensionEditZ);


                var rotationPointText = new TextView(CTX);

                rotationPointText.setText(lang.leftWindow.rotationPointText);

                leftLayout.addView(rotationPointText);


                var rotationPointEditX = customEditText(lang.leftWindow.rotationPointEditX, lang.leftWindow.rotationPointText, "rotationX",false,true);

                leftLayout.addView(rotationPointEditX);


                var rotationPointEditY = customEditText(lang.leftWindow.rotationPointEditY, lang.leftWindow.rotationPointText, "rotationY",false,true);

                leftLayout.addView(rotationPointEditY);


                var rotationPointEditZ = customEditText(lang.leftWindow.rotationPointEditZ, lang.leftWindow.rotationPointText, "rotationZ", false, true);

                leftLayout.addView(rotationPointEditZ);


                var offsetText = new TextView(CTX);

                offsetText.setText(lang.leftWindow.offsetText);

                leftLayout.addView(offsetText);


                var offsetEditX = customEditText(lang.leftWindow.offsetEditX, lang.leftWindow.offsetText,"offsetX", false, true);

                leftLayout.addView(offsetEditX);


                var offsetEditY = customEditText(lang.leftWindow.offsetEditY, lang.leftWindow.offsetText, "offsetY" , false, true );

                leftLayout.addView(offsetEditY);


                var offsetEditZ = customEditText(lang.leftWindow.offsetEditZ, lang.leftWindow.offsetText, "offsetZ" , false, true );

                leftLayout.addView(offsetEditZ);
                
                
                var scaleText = new TextView(CTX);

                scaleText.setText(lang.leftWindow.scaleText);

                leftLayout.addView(scaleText);
                
                               var scaleEdit = customEditText(lang.leftWindow.scaleEdit, lang.leftWindow.scaleText, "scale" , false, true );

                leftLayout.addView(scaleEdit);


                var textOffsetText = new TextView(CTX);

                textOffsetText.setText(lang.leftWindow.textOffsetText);

                leftLayout.addView(textOffsetText);

                var textOffsetEditX = customEditText(lang.leftWindow.textOffsetEditX, lang.leftWindow.textOffsetText, "textOffsetX", true);

                leftLayout.addView(textOffsetEditX);

                var textOffsetEditY = customEditText(lang.leftWindow.textOffsetEditY, lang.leftWindow.textOffsetText,"textOffsetY", true);

                leftLayout.addView(textOffsetEditY);


                var addBoxBtn = new Button(CTX);

                addBoxBtn.setText(lang.leftWindow.addBoxBtn);
                
                addBoxBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view){
                    	
                  var box = new addBox();
                                                    
               modelTree.push(box);
               
                  selectedBox = modelTree[modelTree.length-1];
                 
                  
                  var btn = new Button(CTX);
    
    btn.setText( selectedBox.name );
    
    btn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view){                        
                        selectedBox = modelTree[rightBottomLayout.indexOfChild(view)-1];
                                                
                        
                        leftLayout.getChildAt(1).setText(selectedBox.name);

                        leftLayout.getChildAt(3).setText(selectedBox.dimensionX +"" );
                        leftLayout.getChildAt(4).setText(selectedBox.dimensionY +"" );
                        leftLayout.getChildAt(5).setText(selectedBox.dimensionZ +"" );
                        leftLayout.getChildAt(7).setText(selectedBox.rotationX +"" );
                        leftLayout.getChildAt(8).setText(selectedBox.rotationY +"" );
                       leftLayout.getChildAt(9).setText(selectedBox.rotationZ +"" );
                       leftLayout.getChildAt(11).setText(selectedBox.offsetX +"" );
                       leftLayout.getChildAt(12).setText(selectedBox.offsetY +"" );
                       leftLayout.getChildAt(13).setText(selectedBox.offsetZ +"" );
                       
                       leftLayout.getChildAt(15).setText(selectedBox.scale+"");
                       leftLayout.getChildAt(17).setText(selectedBox.textOffsetX +"" );
                       leftLayout.getChildAt(18).setText(selectedBox.textOffsetY+"");
                      
                    }
                }));
                
    rightBottomLayout.addView(btn);


                        leftLayout.getChildAt(1).setText(selectedBox.name);

                        leftLayout.getChildAt(3).setText(selectedBox.dimensionX +"" );
                        leftLayout.getChildAt(4).setText(selectedBox.dimensionY +"" );
                        leftLayout.getChildAt(5).setText(selectedBox.dimensionZ +"" );
                        leftLayout.getChildAt(7).setText(selectedBox.rotationX +"" );
                        leftLayout.getChildAt(8).setText(selectedBox.rotationY +"" );
                       leftLayout.getChildAt(9).setText(selectedBox.rotationZ +"" );
                       leftLayout.getChildAt(11).setText(selectedBox.offsetX +"" );
                       leftLayout.getChildAt(12).setText(selectedBox.offsetY +"" );
                       leftLayout.getChildAt(13).setText(selectedBox.offsetZ +"" );
                       
                       leftLayout.getChildAt(15).setText(selectedBox.scale+"");
                       leftLayout.getChildAt(17).setText(selectedBox.textOffsetX +"" );
                       leftLayout.getChildAt(18).setText(selectedBox.textOffsetY+"");
    
             
                    }
                }));

                leftLayout.addView(addBoxBtn);

                var deleteBoxBtn = new Button(CTX);

                deleteBoxBtn.setText(lang.leftWindow.deleteBoxBtn);
                
                deleteBoxBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view){
               if(selectedBox != null) deleteBox(modelTree.indexOf(selectedBox));
                        
                    }
                }));

                leftLayout.addView(deleteBoxBtn);

                var clearAllBtn = new Button(CTX);

                clearAllBtn.setText(lang.leftWindow.clearAllBtn);
                
                               clearAllBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view){
                    	deleteAllBoxes();
}}));

                leftLayout.addView(clearAllBtn);

                var copyBtn = new Button(CTX);

                copyBtn.setText(lang.leftWindow.copyBtn);
                
                copyBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view){
                    	try{
if(selectedBox == null){
	
toast("Choose the box to copy");	
return;
	}                    	
	

	copyBox( selectedBox );
	
	}catch(err){
		error(err);
		}
                    	
}}));

                leftLayout.addView(copyBtn);

                var pasteBtn = new Button(CTX);

                pasteBtn.setText(lang.leftWindow.pasteBtn);
                
                pasteBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view){
                    	try{
                    	
                    	if(cloneBox == null){
                    		
                toast("Copy the box first");
                return;    		
                    		}
                    		
         		var newClone = new pasteBox(cloneBox);

                    		
                  modelTree.push(newClone);               
                  
                  selectedBox = modelTree[modelTree.length-1];                  
               
                  
                  var btn = new Button(CTX);
                  
                  var theName = selectedBox.name;
                  
    var theCount = 1;

    for (var a = 0; a < modelTree.length; a++) {
        if(modelTree[a].name == theName +"_"+ theCount) {
            theCount++;
            a = -1;
        }
    }
    
    selectedBox.name = theName+"_"+theCount
    
    
    
    
    
    btn.setText( selectedBox.name );   
    
    btn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view){                        
                        selectedBox = modelTree[rightBottomLayout.indexOfChild(view)-1];
                        leftLayout.getChildAt(1).setText(selectedBox.name);

                        leftLayout.getChildAt(3).setText(selectedBox.dimensionX +"" );
                        leftLayout.getChildAt(4).setText(selectedBox.dimensionY +"" );
                        leftLayout.getChildAt(5).setText(selectedBox.dimensionZ +"" );
                        leftLayout.getChildAt(7).setText(selectedBox.rotationX +"" );
                        leftLayout.getChildAt(8).setText(selectedBox.rotationY +"" );
                       leftLayout.getChildAt(9).setText(selectedBox.rotationZ +"" );
                       leftLayout.getChildAt(11).setText(selectedBox.offsetX +"" );
                       leftLayout.getChildAt(12).setText(selectedBox.offsetY +"" );
                       leftLayout.getChildAt(13).setText(selectedBox.offsetZ +"" );
                       
                       leftLayout.getChildAt(15).setText(selectedBox.scale+"");
                       leftLayout.getChildAt(17).setText(selectedBox.textOffsetX +"" );
                       leftLayout.getChildAt(18).setText(selectedBox.textOffsetY+"");
                      
                    }
                }));
                
    rightBottomLayout.addView(btn);

                    
                    
                                   leftLayout.getChildAt(1).setText(selectedBox.name);

                        leftLayout.getChildAt(3).setText(selectedBox.dimensionX +"" );
                        leftLayout.getChildAt(4).setText(selectedBox.dimensionY +"" );
                        leftLayout.getChildAt(5).setText(selectedBox.dimensionZ +"" );
                        leftLayout.getChildAt(7).setText(selectedBox.rotationX +"" );
                        leftLayout.getChildAt(8).setText(selectedBox.rotationY +"" );
                       leftLayout.getChildAt(9).setText(selectedBox.rotationZ +"" );
                       leftLayout.getChildAt(11).setText(selectedBox.offsetX +"" );
                       leftLayout.getChildAt(12).setText(selectedBox.offsetY +"" );
                       leftLayout.getChildAt(13).setText(selectedBox.offsetZ +"" );
                       
                       leftLayout.getChildAt(15).setText(selectedBox.scale+"");
                       leftLayout.getChildAt(17).setText(selectedBox.textOffsetX +"" );
                       leftLayout.getChildAt(18).setText(selectedBox.textOffsetY+"");          	
                    	
                   
}catch(err){
	
error(err);	
}
                    	
}}));

                leftLayout.addView(pasteBtn);

                var showcaseBtn = new Button(CTX);

                showcaseBtn.setText(lang.leftWindow.showcaseBtn);

                leftLayout.addView(showcaseBtn);

                var loadTextureBtn = new Button(CTX);

                loadTextureBtn.setText(lang.leftWindow.loadTextureBtn);

                leftLayout.addView(loadTextureBtn);

                var editProjectBtn = new Button(CTX);                

                editProjectBtn.setText(lang.leftWindow.editProjectBtn);
                
                editProjectBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view){
                        
                                            showStartMenu(true);
                                            //////////tod//update skinMap///////////////
                        
                    }
                }));

                leftLayout.addView(editProjectBtn);

                var importBtn = new Button(CTX);

                importBtn.setText(lang.leftWindow.importBtn);

                leftLayout.addView(importBtn);

                var exportBtn = new Button(CTX);

                exportBtn.setText(lang.leftWindow.exportBtn);
                
                exportBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view){
 saveProject();
 clientMessage("저장");
                        
                    }
                }));

                leftLayout.addView(exportBtn);

                var helpBtn = new Button(CTX);

                helpBtn.setText(lang.leftWindow.helpBtn);

                leftLayout.addView(helpBtn);

                var infoBtn = new Button(CTX);

                infoBtn.setText(lang.leftWindow.infoBtn);

                leftLayout.addView(infoBtn);
                
                var exitBtn = new Button(CTX);

                exitBtn.setText(lang.leftWindow.exitBtn);
                
                exitBtn.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view){
                    	
                    	 try{
	                var dialog = new android.app.AlertDialog.Builder(CTX);

                var text = new TextView(CTX);

                text.setText(lang.confirm.exit.text);

                var scroll = new android.widget.ScrollView(CTX);

                dialog.setView(text);

                dialog.setTitle(lang.confirm.exit.title);

                dialog.setNegativeButton(lang.no, null);

                dialog.setPositiveButton(lang.yes, new android.content.DialogInterface.OnClickListener({
                    onClick: function () {
                         	
                    	 modelTree = [];
                    	 selectedBox = null;
                    	 textureSize = {x : 64, y : 32};
                    	 modelName = null;
                    	 textureMapLayer = [];

                        eval("leftWindow.dismiss();rightTopWindow.dismiss();rightBottomWindow.dismiss();");              	                   
                    }
                }));
                dialog.create();
                dialog.show();
	
    } catch(err){
    
    error(err);
   } 
   

                        
                    }
                }));

                leftLayout.addView(exitBtn);

                leftScroll.addView(leftLayout);

                leftWindow.setContentView(leftScroll);

                leftWindow.setWidth(screenWidth / 4);

                leftWindow.setHeight(screenHeight);

                leftWindow.setBackgroundDrawable(new Drawable.ColorDrawable(Color.argb(100,0,0,0)));
                                 
                leftWindow.showAtLocation(CTX.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP, screenWidth / 4, 0);
                                                            
                var rightTopWindow = new PopupWindow(CTX);
                
                var rightTopLayout = new LinearLayout(CTX);

                rightTopLayout.setOrientation(1);
                
                var textureMapText = new TextView(CTX);
                
                textureMapText.setText(lang.rightTopWindow.textureMapText);
               
                rightTopLayout.addView(textureMapText);
                
                var wid = screenWidth / 5, hei = screenWidth / 10, arr=[], theLength = wid * hei;
                
                for(var a = 0; a < theLength; a++) arr.push(-1);
                
                var textureMap = new Bitmap.createBitmap(arr, wid, hei, Bitmap.Config.ARGB_8888);
                
                textureMapBtn = new Button(CTX);
                
                textureMapLayer = [new Drawable.BitmapDrawable(textureMap)];
                                               
                textureMapBtn.setBackgroundDrawable(new Drawable.LayerDrawable(textureMapLayer));
                
                rightTopLayout.addView(textureMapBtn);
               
                rightTopWindow.setContentView(rightTopLayout);

                rightTopWindow.setWidth(screenWidth / 4);

                rightTopWindow.setHeight(screenHeight / 2);

                rightTopWindow.setBackgroundDrawable(new Drawable.ColorDrawable(Color.argb(120,0,0,0)));

                rightTopWindow.showAtLocation(CTX.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP, 0, 0);
                
                
                var rightBottomWindow = new PopupWindow(CTX);
                
                var rightBottomScroll = new ScrollView(CTX);
                
                rightBottomLayout = new LinearLayout(CTX);

                rightBottomLayout.setOrientation(1);
                
                var modelTreeText = new TextView(CTX);
                
                modelTreeText.setText(lang.rightBottomWindow.modelTreeText);
                
                rightBottomLayout.addView(modelTreeText);
                
                rightBottomScroll.addView(rightBottomLayout);
               
                rightBottomWindow.setContentView(rightBottomScroll);

                rightBottomWindow.setWidth(screenWidth / 4);

                rightBottomWindow.setHeight(screenHeight / 2);

                rightBottomWindow.setBackgroundDrawable(new Drawable.ColorDrawable(Color.argb(140,0,0,0)));

                rightBottomWindow.showAtLocation(CTX.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP, 0, screenHeight / 2);

            } catch (e) {

                error(e);
            }
        }
    }));
} //showModelEditMenu





var modelEntity = null;
var theX, theY, theZ;

function spawnModelEntity(x, y, z){

theX = x;
theY = y+1;
theZ = z;

modelEntity = Level.spawnMob(x, y+1, z, 11);

Entity.setHealth(modelEntity,20000);

}

function modelEntityAI(){
new java.lang.Thread(new java.lang.Runnable({run:function(){

while(true){

java.lang.Thread.sleep(50);

function aaa(){

if(modelEntity == null) return;

var ex = Entity.getX(modelEntity);
var ey = Entity.getY(modelEntity);
var ez = Entity.getZ(modelEntity);

if(ex == 0 && ey == 0 && ez == 0){	
modelEntity = null;
clientMessage("위치000");
return;		
}


Entity.setVelX(modelEntity,0);
Entity.setRot(modelEntity,0,0);

Entity.setVelY(modelEntity,0);
Entity.setRot(modelEntity,0,0);

Entity.setVelZ(modelEntity,0);
Entity.setRot(modelEntity,0,0);

Entity.setPosition(modelEntity, theX, theY, theZ);
Entity.setRot(modelEntity,0,0);

}

aaa();


}


}})).start();

}


function newLevel(){
	
modelEntityAI();

}

function useItem(x, y, z, I, b, s, id, bd){
    
    if(I == 280) showStartMenu(false);
    
    if(I == 281) spawnModelEntity(x, y, z);
    
}


















