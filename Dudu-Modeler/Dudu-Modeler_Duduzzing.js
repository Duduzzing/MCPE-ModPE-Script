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

    en: {
        yes: "Yes",
        No: "No",
        startMenu: {
            title: "New Model",
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
            loadTexture: "Load texture",
            importBtn: "Import",
            exportBtn: "Export",
            helpBtn: "Help",
            infoBtn: "Information",
            exitBtn: "Exit"
        },
        confirmExit:{
            title: "Confirm exit",
            text: "Are you sure you wanna exit?"
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
        startMenu: {
            title: "새로운 모델링",
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
            loadTexture: "스킨 불러오기",
            importBtn: "불러오기",
            exportBtn: "저장",
            helpBtn: "도움말",
            infoBtn: "정보",
            exitBtn: "나가기"
        },
        confirmExit: {
            title: "나가기 확인",
            text: "정말로 나가시겠습니까?"
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
};




/////////////////////////////////////////////////////////////

var modelTree = [];
var textureSize = {x : 64, y : 32};

/////////////////////////////////////////////////////////////

function addBox() {

    var name = "Box";
    var count = 1;

    for (var a = 0; a < modelTree.length; a++) {
        if (modelTree[a].name == name + count) {
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
}

function showStartMenu() {

    CTX.runOnUiThread(new java.lang.Runnable({
        run: function () {
            try {
                var dialog = new android.app.AlertDialog.Builder(CTX);

                dialog.setTitle(lang.startMenu.title);

                var scroll = new android.widget.ScrollView(CTX);

                var layout = new LinearLayout(CTX);

                layout.setOrientation(1);

                var modelNameText = new TextView(CTX);

                modelNameText.setText(lang.startMenu.modelNameText);

                layout.addView(modelNameText);

                var modelNameEdit = new EditText(CTX);

                modelNameEdit.setHint(lang.startMenu.modelNameEdit);

                layout.addView(modelNameEdit);

                var modelBaseText = new TextView(CTX);

                modelBaseText.setText(lang.startMenu.modelBaseText);

                layout.addView(modelBaseText);

                var items = [lang.startMenu.emptyModel, lang.startMenu.humanoidModel];

                var modelBaseSpinner = new android.widget.Spinner(CTX);

                var adapter = new android.widget.ArrayAdapter(CTX, android.R.layout.simple_spinner_dropdown_item);

                spinner.setAdapter(adapter);

                spinner.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener({
                    onItemSelected: function (view, position) {

                        if (position == 1) {
                            /////////////////////load humanoid model////////////////////////////
                        }

                    }
                }));

                layout.addView(modelBaseSpinner);


                var textureWidthText = new TextView(CTX);

                textureWidthText.setText(lang.startMenu.textureWidthText);

                layout.addView(textureWidthText);

                var textureWidthEdit = new EditText(CTX);

                textureWidthEdit.setHint(lang.startMenu.textureWidthEdit);

                layout.addView(textureWidthEdit);


                var textureHeightText = new TextView(CTX);

                textureHeightText.setText(lang.startMenu.textureHeightText);

                layout.addView(textureHeightText);

                var textureHeightEdit = new EditText(CTX);

                textureHeightEdit.setHint(lang.startMenu.textureHeightEdit);

                layout.addView(textureHeightEdit);

                scroll.addView(layout);

                dialog.setView(scroll);

                dialog.setNegativeButton(lang.startMenu.exit, null);

                dialog.setPositiveButton(lang.startMenu.create, new android.content.DialogInterface.OnClickListener({
                    onClick: function () {
                        
                        showModelEditMenu();

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


function showModelEditMenu() {
    CTX.runOnUiThread(new java.lang.Runnable({
        run: function () {
            try {

                var leftWindow = new PopupWindow(CTX);

                var leftScroll = new ScrollView(CTX);
                var leftLayout = new LinearLayout(CTX);

                leftLayout.setOrientation(1);

                var boxNameText = new TextView(CTX);

                boxNameText.setText(lang.leftWindow.boxNameText);

                layout.addView(boxNameText);

                var boxNameEdit = new EditText(CTX);

                layout.addView(boxNameEdit);


                var dimensionText = new TextView(CTX);

                dimensionText.setText(lang.leftWindow.dimensionText);

                layout.addView(dimensionText);


                var dimensionEditX = new EditText(CTX);

                dimensionEditX.setHint(lang.leftWindow.dimensionEditX);

                layout.addView(dimensionEditX);


                var dimensionEditY = new EditText(CTX);

                dimensionEditY.setHint(lang.leftWindow.dimensionEditY);

                layout.addView(dimensionEditY);


                var dimensionEditZ = new EditText(CTX);

                dimensionEditZ.setHint(lang.leftWindow.dimensionEditZ);

                layout.addView(dimensionEditZ);



                var rotationPointText = new TextView(CTX);

                rotationPointText.setText(lang.leftWindow.rotationPointText);

                layout.addView(rotationPointText);


                var rotationPointEditX = new EditText(CTX);

                rotationPointEditX.setHint(lang.leftWindow.rotationPointEditX);

                layout.addView(rotationPointEditX);


                var rotationPointEditY = new EditText(CTX);

                rotationPointEditY.setHint(lang.leftWindow.rotationPointEditY);

                layout.addView(rotationPointEditY);


                var rotationPointEditZ = new EditText(CTX);

                rotationPointEditZ.setHint(lang.leftWindow.rotationPointEditZ);

                layout.addView(rotationPointEditZ);


                var offsetText = new TextView(CTX);

                offsetText.setText(lang.leftWindow.offsetText);

                layout.addView(offsetText);


                var offsetEditX = new EditText(CTX);

                offsetEditX.setHint(lang.leftWindow.offsetEditX);

                layout.addView(offsetEditX);


                var offsetEditY = new EditText(CTX);

                offsetEditY.setHint(lang.leftWindow.offsetEditY);

                layout.addView(offsetEditY);


                var offsetEditZ = new EditText(CTX);

                offsetEditZ.setHint(lang.leftWindow.offsetEditZ);

                layout.addView(offsetEditZ);


                var textOffsetText = new TextView(CTX);

                textOffsetText.setText(lang.leftWindow.textOffsetText);

                layout.addView(textOffsetText);

                var textOffsetEditX = new TextView(CTX);

                textOffsetEditX.setText(lang.leftWindow.textOffsetEditX);

                layout.addView(textOffsetEditX);

                var textOffsetEditY = new TextView(CTX);

                textOffsetEditY.setText(lang.leftWindow.textOffsetEditY);

                layout.addView(textOffsetEditY);


                var addBoxBtn = new Button(CTX);

                addBoxBtn.setText(lang.leftWindow.addBoxBtn);

                layout.addView(addBoxBtn);

                var deleteBoxBtn = new Button(CTX);

                deleteBoxBtn.setText(lang.leftWindow.deleteBoxBtn);

                layout.addView(deleteBoxBtn);

                var clearAllBtn = new Button(CTX);

                clearAllBtn.setText(lang.leftWindow.clearAllBtn);

                layout.addView(clearAllBtn);

                var copyBtn = new Button(CTX);

                copyBtn.setText(lang.leftWindow.copyBtn);

                layout.addView(copyBtn);

                var pasteBtn = new Button(CTX);

                pasteBtn.setText(lang.leftWindow.pasteBtn);

                layout.addView(pasteBtn);

                var showcaseBtn = new Button(CTX);

                showcaseBtn.setText(lang.leftWindow.showcaseBtn);

                layout.addView(showcaseBtn);

                var loadTextureBtn = new Button(CTX);

                loadTextureBtn.setText(lang.leftWindow.loadTextureBtn);

                layout.addView(loadTextureBtn);

                var editProjectBtn = new Button(CTX);

                editProjectBtn.setText(lang.leftWindow.editProjectBtn);

                layout.addView(editProjectBtn);

                var importBtn = new Button(CTX);

                importBtn.setText(lang.leftWindow.importBtn);

                layout.addView(importBtn);

                var exportBtn = new Button(CTX);

                exportBtn.setText(lang.leftWindow.exportBtn);

                layout.addView(exportBtn);

                var helpBtn = new Button(CTX);

                helpBtn.setText(lang.leftWindow.helpBtn);

                layout.addView(helpBtn);

                var infoBtn = new Button(CTX);

                infoBtn.setText(lang.leftWindow.infoBtn);

                layout.addView(infoBtn);
                
                var exitBtn = new Button(CTX);

                exitBtn.setText(lang.leftWindow.exitBtn);
                
                button.setOnClickListener(new android.view.View.OnClickListener({
                    onClick: function(view){
                        
                        eval("leftWindow.dismiss();rightTopWindow.dismiss();rightBottomWindow.dismiss();");
                        
                    }
                }));

                layout.addView(exitBtn);

                leftScroll.addView(leftLayout);

                leftWindow.setContentView(leftScroll);

                leftWindow.setWidth(screenWidth / 4);

                leftWindow.setHeight(screenHeight);

                leftWindow.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));

                leftWindow.setFocusable(true);

                leftWindow.showAtLocation(CTX.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP, screenWidth / 4, 0);
                
                
                var rightTopWindow = new PopupWindow(CTX);
                
                var rightTopLayout = new LinearLayout(CTX);

                rightTopLayout.setOrientation(1);
                
                var textureMapText = new TextView(CTX);
                
                textureMapText.setText(lang.rightTopWindow.textureMapText);
                
                var wid = screenWidth / 5, hei = screenWidth / 10, arr=[], theLength = wid * hei;
                
                for(var a = 0; a < theLength; a++) arr.push(-1);
                
                var textureMap = new Bitmap.createBitmap(arr, wid, hei, Bitmap.Config.ARGB_8888);
                
                var textureMapBtn = new Button(CTX);
               
                textureMapBtn.setText("");
                
                textureMapBtn.setBackgronudDrawable(new Drawable.LayerDrawable([new Drawable.BitmapDrawable(textureMap)]));
                
                rightTopLayout.addView(textureMapBtn);
               
                rightTopWindow.setContentView(rightTopLayout);

                rightTopWindow.setWidth(screenWidth / 4);

                rightTopWindow.setHeight(screenHeight / 2);

                rightTopWindow.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));

                rightTopWindow.showAtLocation(CTX.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP, 0, 0);
                
                
                var rightBottomWindow = new PopupWindow(CTX);
                
                var rightBottomScroll = new ScrollView(CTX);
                
                var rightBottomLayout = new LinearLayout(CTX);

                rightBottomLayout.setOrientation(1);
                
                var modelTreeText = new TextView(CTX);
                
                modelTreeText.setText(lang.rightBottomWindow.modelTreeText);
                
                rightBottomLayout.addView(modelTreeText);
                
                rightBottomScroll.addView(rightBottomLayout);
               
                rightBottomWindow.setContentView(rightBottomScroll);

                rightBottomWindow.setWidth(screenWidth / 4);

                rightBottomWindow.setHeight(screenHeight / 2);

                rightBottomWindow.setBackgroundDrawable(new Drawable.ColorDrawable(Color.TRANSPARENT));

                rightBottomWindow.showAtLocation(CTX.getWindow().getDecorView(), Gravity.RIGHT | Gravity.TOP, 0, screenHeight / 2);

            } catch (e) {

                error(e);
            }
        }
    }));
} //showModelEditMenu




function useItem(x, y, z, i, b, s, id, bd){
    
    if(i == 280) showStartMenu();
    
}




















