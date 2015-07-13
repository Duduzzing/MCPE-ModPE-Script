/**
 * TimeLaps script
 * 
 * Copyright © Duduzzing
 * All rights deserved
 * 
 */

var CTX = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

var Button = android.widget.Button;

var Color = android.graphics.Color;

var Drawable = android.graphics.drawable;

var EditText = android.widget.EditText;

var LinearLayout = android.widget.LinearLayout;

var TextView = android.widget.TextView;

var View = android.view.View;

var circleArray = []; 

var touchMode = false;

var theX = null,
theY = null,
theZ = null,
theRadius = null,
theRotationY = null,
theSpeed = null,
count = 0;

var moveStartTouchMode = false,
moveEndTouchMode = false,
moveWatchTouchMode = false;

var theStartX = null,
theStartY = null,
theStartZ = null,
theEndX = null,
theEndY = null,
theEndZ = null,
theWatchX = null,
theWatchY = null,
theWatchZ = null,
theMoveSpeed = null;

function useItem(x, y, z, I, b) {

  CTX.runOnUiThread(new java.lang.Runnable({
    run: function() {
      try {

        if (I == 280) {

          if (touchMode) {

            theX = x + 0.5;
            theY = y + 0.5;
            theZ = z + 0.5;

            android.widget.Toast.makeText(CTX, "바라볼 좌표가 정해졌습니다", android.widget.Toast.LENGTH_LONG).show();

            touchMode = false;
          }

          showCircleMenu();

        }

        if (I == 281) {

          if (moveStartTouchMode) {

            theStartX = x + 0.5;
            theStartY = y + 0.5;
            theStartZ = z + 0.5;

            android.widget.Toast.makeText(CTX, "시작점 좌표가 정해졌습니다", android.widget.Toast.LENGTH_LONG).show();

            moveStartTouchMode = false;
          }

          if (moveEndTouchMode) {

            theEndX = x + 0.5;
            theEndY = y + 0.5;
            theEndZ = z + 0.5;

            android.widget.Toast.makeText(CTX, "도착점 좌표가 정해졌습니다", android.widget.Toast.LENGTH_LONG).show();

            moveEndTouchMode = false;
          }

          if (moveWatchTouchMode) {

            theWatchX = x + 0.5;
            theWatchY = y + 0.5;
            theWatchZ = z + 0.5;

            android.widget.Toast.makeText(CTX, "바라볼 좌표가 정해졌습니다", android.widget.Toast.LENGTH_LONG).show();

            moveWatchTouchMode = false;
          }

          showMoveMenu();

        }

      } catch(e) {

        showError(e);
      }
    }
  }));

}

function modTick() {

  if (Player.getCarriedItem() == 282) count = 361;

}

function showError(e) {

  CTX.runOnUiThread(new java.lang.Runnable({
    run: function() {
      try {
        var dialog = new android.app.AlertDialog.Builder(CTX);

        var text = new EditText(CTX);

        text.setText(e + "\nLineNumber : " + e.lineNumber);

        var scroll = new android.widget.ScrollView(CTX);

        scroll.addView(text);

        dialog.setTitle("Error!");

        dialog.setView(scroll);

        dialog.setNegativeButton("Exit", null);

        dialog.setPositiveButton("Copy to clipboard", new android.content.DialogInterface.OnClickListener({
          onClick: function() {

            CTX.getSystemService(android.content.Context.CLIPBOARD_SERVICE).setText(text.getText());

            android.widget.Toast.makeText(CTX, "Copied to clipboard", android.widget.Toast.LENGTH_LONG).show();

          }
        }));
        dialog.create();
        dialog.show();
      } catch(e) {

        print(e);
      }
    }
  }));
};

function face(entity, tx, ty, tz) {

  var ex = Entity.getX(entity);
  var ey = Entity.getY(entity);
  var ez = Entity.getZ(entity);

  var x = tx - ex;
  var y = ty - ey;
  var z = tz - ez;

  var l = Math.sqrt(x * x + z * z);

  var sinHorizontal = x / l;
  var cosHorizontal = z / l;
  var tanHorizontal = x / z;

  var acosHorizontal = Math.acos(z / l) * 180 / Math.PI;

  var atanVertical = Math.atan(y / l);

  var alpha = 0;

  if (sinHorizontal > 0 && cosHorizontal > 0 && tanHorizontal > 0) alpha = 360 - acosHorizontal;
  else if (sinHorizontal > 0 && cosHorizontal < 0 && tanHorizontal < 0) alpha = 360 - acosHorizontal;
  else if (sinHorizontal < 0 && cosHorizontal < 0 && tanHorizontal > 0) alpha = acosHorizontal;
  else if (sinHorizontal < 0 && cosHorizontal > 0 && tanHorizontal < 0) alpha = acosHorizontal;
  else if (cosHorizontal == 1) alpha = 0;
  else if (sinHorizontal == 1) alpha = 90;
  else if (cosHorizontal == -1) alpha = 180;
  else if (sinHorizontal == -1) alpha = 270;
  else if (sinHorizontal == 0 && cosHorizontal == 1 && tanHorizontal == 0) null;

  var beta = atanVertical;
  beta = -1 * beta * 180 / Math.PI;

  Entity.setRot(entity, alpha, beta);
}

function circleLocation(x, y, z) { 
  this.x = x; 
  this.y = y; 
  this.z = z; 
} 

function makeCircle(x, y, z, radius) { 

  circleArray = []; 

  for (var i = 0; i < 360; i++) {

    var xx = Math.sin(i / 180 * Math.PI);
    var zz = Math.cos(i / 180 * Math.PI);

    circleArray.push(
    new circleLocation(x + radius * xx + 0.5, y, z + radius * zz + 0.5));

  }

}

function turn(x, y, z, entity, radius, rotationY, speed) { 

  Player.setFlying(true);

  new java.lang.Thread(new java.lang.Runnable({ run: function() { 

      try {

        makeCircle(x, y, z, radius); 

        count = 0; 

        while (count < (circleArray.length - 1)) { 

          var tx = circleArray[count].x;
          var ty = rotationY;
          var tz = circleArray[count].z;

          Entity.setPosition(entity, tx, ty, tz);

          face(entity, x, y, z);

          count++;  
          java.lang.Thread.sleep(speed * 50);

        } 

      } catch(e) {

        showError(e);

      }
    } 
  })).start(); 

} 

function showCircleMenu() {

  CTX.runOnUiThread(new java.lang.Runnable({
    run: function() {
      try {

        var dialog = new android.app.AlertDialog.Builder(CTX);

        var theDialog;

        dialog.setTitle("타임랩스 스크립트 - By 두두찡");

        var scroll = new android.widget.ScrollView(CTX);

        var layout = new LinearLayout(CTX);

        layout.setOrientation(1);

        var title = new TextView(CTX);

        title.setText("좌표를 기준으로 원을 그리며 이동합니다");
        
        title.setTextColor(Color.WHITE);

        title.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, 25);

        layout.addView(title);

        var help = new TextView(CTX);

        help.setText("버섯스튜(282)를 들면 이동을 취소할 수 있습니다");
        
        help.setTextColor(Color.RED);

        layout.addView(help);

        var xText = new TextView(CTX);

        xText.setText("X");

        layout.addView(xText);

        var xEditText = new EditText(CTX);

        xEditText.setHint("바라볼 X를 넣으세요");

        if (theX != null) {

          xEditText.setText(theX + "");

        }

        layout.addView(xEditText);

        var pxBtn = new Button(CTX);

        pxBtn.setText("플레이어 X");

        pxBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              xEditText.setText(Player.getX().toFixed(1) + "");

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(pxBtn);

        var yText = new TextView(CTX);

        yText.setText("Y");

        layout.addView(yText);

        var yEditText = new EditText(CTX);

        yEditText.setHint("바라볼 Y를 넣으세요");

        if (theY != null) {

          yEditText.setText(theY + "");

        }

        layout.addView(yEditText);

        var pyBtn = new Button(CTX);

        pyBtn.setText("플레이어 Y");

        pyBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              yEditText.setText(Player.getY().toFixed(1) + "");

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(pyBtn);

        var zText = new TextView(CTX);

        zText.setText("Z");

        layout.addView(zText);

        var zEditText = new EditText(CTX);

        zEditText.setHint("바라볼 Z를 넣으세요");

        if (theZ != null) {

          zEditText.setText(theZ + "");

        }

        layout.addView(zEditText);

        var pzBtn = new Button(CTX);

        pzBtn.setText("플레이어 Z");

        pzBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              zEditText.setText(Player.getZ().toFixed(1) + "");

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(pzBtn);

        var touchModeBtn = new Button(CTX);

        touchModeBtn.setText("바라보는 좌표를 막대기로 터치해서 정하기");

        touchModeBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              touchMode = true;

              android.widget.Toast.makeText(CTX, "막대기로 바라볼 좌표를 터치하세요", android.widget.Toast.LENGTH_LONG).show();

              theDialog.cancel();

              theRadius = radiusEditText.getText();

              theRotationY = rotationYEditText.getText();

              theSpeed = speedEditText.getText();

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(touchModeBtn);

        var radiusText = new TextView(CTX);

        radiusText.setText("반지름");

        layout.addView(radiusText);

        var radiusEditText = new EditText(CTX);

        radiusEditText.setHint("회전할 반지름을 넣으세요");

        if (theRadius != null) {

          radiusEditText.setText(theRadius + "");

        }

        layout.addView(radiusEditText);

        var rotationYText = new TextView(CTX);

        rotationYText.setText("회전할 Y 좌표");

        layout.addView(rotationYText);

        var rotationYEditText = new EditText(CTX);

        rotationYEditText.setHint("회전할 Y좌표를 넣으세요");

        if (theRotationY != null) {

          rotationYEditText.setText(theRotationY + "");

        }

        layout.addView(rotationYEditText);

        var rotationYBtn = new Button(CTX);

        rotationYBtn.setText("플레이어 Y");

        rotationYBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              rotationYEditText.setText(Player.getY().toFixed(1) + "");

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(rotationYBtn);

        var speedText = new TextView(CTX);

        speedText.setText("속도 (높을수록 느림)");

        layout.addView(speedText);

        var speedEditText = new EditText(CTX);

        speedEditText.setHint("회전할 속도를 넣으세요");

        if (theSpeed != null) {

          speedEditText.setText(theSpeed + "");

        }

        layout.addView(speedEditText);

        scroll.addView(layout);

        dialog.setView(scroll);

        dialog.setNegativeButton("닫기", new android.content.DialogInterface.OnClickListener({
          onClick: function() {

            try {

              theX = null;
              theY = null;
              theZ = null;
              theRadius = null;
              theRotationY = null;
              theSpeed = null;

            } catch(e) {
              showError(e);
            }

          }
        }));

        dialog.setPositiveButton("시작", new android.content.DialogInterface.OnClickListener({
          onClick: function() {

            try {

              var xLoc = parseInt(xEditText.getText());
              var yLoc = parseInt(yEditText.getText());
              var zLoc = parseInt(zEditText.getText());

              var rad = parseInt(radiusEditText.getText());

              var rotY = parseInt(rotationYEditText.getText());

              var speed = parseInt(speedEditText.getText());

              if (isNaN(xLoc) || isNaN(yLoc) || isNaN(zLoc) || isNaN(rad) || isNaN(rotY) || isNaN(speed)) {

                theDialog.cancel();

                android.widget.Toast.makeText(CTX, "[오류] 인자 중 숫자가 아닌게 있습니다", android.widget.Toast.LENGTH_LONG).show();

                theX = null;
                theY = null;
                theZ = null;
                theRadius = null;
                theRotationY = null;
                theSpeed = null;

                return;

              }

              turn(
              xLoc, yLoc, zLoc, Player.getEntity(), rad, rotY, speed

              );

              theX = null;
              theY = null;
              theZ = null;
              theRadius = null;
              theRotationY = null;
              theSpeed = null;

            } catch(e) {
              showError(e);
            }
          }
        }));

        theDialog = dialog.create();
        theDialog.show();

      } catch(e) {
        showError(e);
      }

    }
  }));

}

function moveTo(sx, sy, sz, tx, ty, tz, watchX, watchY, watchZ, ent, speed) {

  new java.lang.Thread(new java.lang.Runnable({ run: function() { 

      try {

        count = 0;

        var xDis = tx - sx;
        var yDis = ty - sy;
        var zDis = tz - sz;

        var totalDis = Math.sqrt(xDis * xDis + yDis * yDis + zDis * zDis);

        for (var dis = 0; dis <= totalDis; dis++) {

          if (count > 360) break;

          var x = sx + xDis * dis / totalDis;
          var y = sy + yDis * dis / totalDis;
          var z = sz + zDis * dis / totalDis;

          Entity.setPosition(ent, x + 0.5, y + 0.5, z + 0.5);

          face(ent, watchX, watchY, watchZ);

          java.lang.Thread.sleep(speed * 50);

        }

      } catch(e) {

        showError(e);

      }
    } 
  })).start();
}

function showMoveMenu() {

  CTX.runOnUiThread(new java.lang.Runnable({
    run: function() {
      try {

        var dialog = new android.app.AlertDialog.Builder(CTX);

        var theDialog;

        dialog.setTitle("타임랩스 스크립트 - By 두두찡");

        var scroll = new android.widget.ScrollView(CTX);

        var layout = new LinearLayout(CTX);

        layout.setOrientation(1);

        var title = new TextView(CTX);

        title.setText("시작점에서 도착점까지 이동합니다");

        title.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, 25);
        
        title.setTextColor(Color.WHITE);

        layout.addView(title);

        var help = new TextView(CTX);

        help.setText("버섯스튜(282)를 들면 이동을 취소할 수 있습니다");
        
        help.setTextColor(Color.RED);

        layout.addView(help);

        var xText = new TextView(CTX);

        xText.setText("시작 X");

        layout.addView(xText);

        var sxEditText = new EditText(CTX);

        sxEditText.setHint("시작할 X를 넣으세요");

        if (theStartX != null) {

          sxEditText.setText(theStartX + "");

        }

        layout.addView(sxEditText);

        var pxBtn = new Button(CTX);

        pxBtn.setText("플레이어 X");

        pxBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              sxEditText.setText(Player.getX().toFixed(1) + "");

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(pxBtn);

        var yText = new TextView(CTX);

        yText.setText("시작 Y");

        layout.addView(yText);

        var syEditText = new EditText(CTX);

        syEditText.setHint("시작할 Y를 넣으세요");

        if (theStartY != null) {

          syEditText.setText(theStartY + "");

        }

        layout.addView(syEditText);

        var pyBtn = new Button(CTX);

        pyBtn.setText("플레이어 Y");

        pyBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              syEditText.setText(Player.getY().toFixed(1) + "");

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(pyBtn);

        var zText = new TextView(CTX);

        zText.setText("시작 Z");

        layout.addView(zText);

        var szEditText = new EditText(CTX);

        szEditText.setHint("시작할 Z를 넣으세요");

        if (theStartZ != null) {

          szEditText.setText(theStartZ + "");

        }

        layout.addView(szEditText);

        var pzBtn = new Button(CTX);

        pzBtn.setText("플레이어 Z");

        pzBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              szEditText.setText(Player.getZ().toFixed(1) + "");

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(pzBtn);

        var touchModeBtn = new Button(CTX);

        touchModeBtn.setText("시작할 좌표를 그릇으로 터치해서 정하기");

        touchModeBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              moveStartTouchMode = true;

              android.widget.Toast.makeText(CTX, "그릇으로 시작할 좌표를 터치하세요", android.widget.Toast.LENGTH_LONG).show();

              theDialog.cancel();

              theEndX = exEditText.getText();
              theEndY = eyEditText.getText();
              theEndZ = ezEditText.getText();

              theWatchX = wxEditText.getText();
              theWatchY = wyEditText.getText();
              theWatchZ = wzEditText.getText()

              theMoveSpeed = speedEditText.getText();

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(touchModeBtn);

        ///////////////////

        var exText = new TextView(CTX);

        exText.setText("끝 X");

        layout.addView(exText);

        var exEditText = new EditText(CTX);

        exEditText.setHint("끝날 X를 넣으세요");

        if (theEndX != null) {

          exEditText.setText(theEndX + "");

        }

        layout.addView(exEditText);

        var epxBtn = new Button(CTX);

        epxBtn.setText("플레이어 X");

        epxBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              exEditText.setText(Player.getX().toFixed(1) + "");

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(epxBtn);

        var eyText = new TextView(CTX);

        eyText.setText("끝 Y");

        layout.addView(eyText);

        var eyEditText = new EditText(CTX);

        eyEditText.setHint("끝날 Y를 넣으세요");

        if (theEndY != null) {

          eyEditText.setText(theEndY + "");

        }

        layout.addView(eyEditText);

        var epyBtn = new Button(CTX);

        epyBtn.setText("플레이어 Y");

        epyBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              eyEditText.setText(Player.getY().toFixed(1) + "");

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(epyBtn);

        var ezText = new TextView(CTX);

        ezText.setText("끝 Z");

        layout.addView(ezText);

        var ezEditText = new EditText(CTX);

        ezEditText.setHint("끝날 Z를 넣으세요");

        if (theEndZ != null) {

          ezEditText.setText(theEndZ + "");

        }

        layout.addView(ezEditText);

        var epzBtn = new Button(CTX);

        epzBtn.setText("플레이어 Z");

        epzBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              ezEditText.setText(Player.getZ().toFixed(1) + "");

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(epzBtn);

        var eTouchModeBtn = new Button(CTX);

        eTouchModeBtn.setText("끝날 좌표를 그릇으로 터치해서 정하기");

        eTouchModeBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              moveEndTouchMode = true;

              android.widget.Toast.makeText(CTX, "그릇으로 끝날 좌표를 터치하세요", android.widget.Toast.LENGTH_LONG).show();

              theDialog.cancel();

              theStartX = sxEditText.getText();
              theStartY = syEditText.getText();
              theStartZ = szEditText.getText();

              theWatchX = wxEditText.getText();
              theWatchY = wyEditText.getText();
              theWatchZ = wzEditText.getText()

              theMoveSpeed = speedEditText.getText();

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(eTouchModeBtn);

        ////////////////////   

        var wxText = new TextView(CTX);

        wxText.setText("바라볼 X");

        layout.addView(wxText);

        var wxEditText = new EditText(CTX);

        wxEditText.setHint("바라볼 X를 넣으세요");

        if (theWatchX != null) {

          wxEditText.setText(theWatchX + "");

        }

        layout.addView(wxEditText);

        var wpxBtn = new Button(CTX);

        wpxBtn.setText("플레이어 X");

        wpxBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              wxEditText.setText(Player.getX().toFixed(1) + "");

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(wpxBtn);

        var wyText = new TextView(CTX);

        wyText.setText("바라볼 Y");

        layout.addView(wyText);

        var wyEditText = new EditText(CTX);

        wyEditText.setHint("바라볼 Y를 넣으세요");

        if (theWatchY != null) {

          wyEditText.setText(theWatchY + "");

        }

        layout.addView(wyEditText);

        var wpyBtn = new Button(CTX);

        wpyBtn.setText("플레이어 Y");

        wpyBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              wyEditText.setText(Player.getY().toFixed(1) + "");

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(wpyBtn);

        var wzText = new TextView(CTX);

        wzText.setText("바라볼 Z");

        layout.addView(wzText);

        var wzEditText = new EditText(CTX);

        wzEditText.setHint("바라볼 Z를 넣으세요");

        if (theWatchZ != null) {

          wzEditText.setText(theWatchZ + "");

        }

        layout.addView(wzEditText);

        var wpzBtn = new Button(CTX);

        wpzBtn.setText("플레이어 Z");

        wpzBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              wzEditText.setText(Player.getZ().toFixed(1) + "");

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(wpzBtn);

        var wTouchModeBtn = new Button(CTX);

        wTouchModeBtn.setText("바라볼 좌표를 그릇으로 터치해서 정하기");

        wTouchModeBtn.setOnClickListener(new View.OnClickListener({
          onClick: function(view) {
            try {

              moveWatchTouchMode = true;

              android.widget.Toast.makeText(CTX, "그릇으로 바라볼 좌표를 터치하세요", android.widget.Toast.LENGTH_LONG).show();

              theDialog.cancel();

              theStartX = sxEditText.getText();
              theStartY = syEditText.getText();
              theStartZ = szEditText.getText();

              theEndX = exEditText.getText();
              theEndY = eyEditText.getText();
              theEndZ = ezEditText.getText()

              theMoveSpeed = speedEditText.getText();

            } catch(e) {
              showError(e);
            }
          }
        }));

        layout.addView(wTouchModeBtn);

        ////////////////

        var speedText = new TextView(CTX);

        speedText.setText("속도 (높을수록 느림)");

        layout.addView(speedText);

        var speedEditText = new EditText(CTX);

        speedEditText.setHint("움직일 속도를 넣으세요");

        if (theSpeed != null) {

          speedEditText.setText(theSpeed + "");

        }

        layout.addView(speedEditText);

        scroll.addView(layout);

        dialog.setView(scroll);

        dialog.setNegativeButton("닫기", new android.content.DialogInterface.OnClickListener({
          onClick: function() {

            try {

              theStartX = null;
              theStartY = null;
              theStartZ = null;
              theEndX = null;
              theEndY = null;
              theEndZ = null;
              theWatchX = null;
              theWatchY = null;
              theWatchZ = null;
              theMoveSpeed = null;

            } catch(e) {
              showError(e);
            }

          }
        }));

        dialog.setPositiveButton("시작", new android.content.DialogInterface.OnClickListener({
          onClick: function() {

            try {

              var sx = parseInt(sxEditText.getText());
              var sy = parseInt(syEditText.getText());
              var sz = parseInt(szEditText.getText());
              var ex = parseInt(exEditText.getText());
              var ey = parseInt(eyEditText.getText());
              var ez = parseInt(ezEditText.getText());
              var wx = parseInt(wxEditText.getText());
              var wy = parseInt(wyEditText.getText());
              var wz = parseInt(wzEditText.getText());

              var speed = parseInt(speedEditText.getText());

              if (isNaN(sx) || isNaN(sy) || isNaN(sz) || isNaN(ex) || isNaN(ey) || isNaN(ez) || isNaN(wx) || isNaN(wy) || isNaN(wz) || isNaN(speed)) {

                theDialog.cancel();

                android.widget.Toast.makeText(CTX, "[오류] 인자 중 숫자가 아닌게 있습니다", android.widget.Toast.LENGTH_LONG).show();

                theStartX = null;
                theStartY = null;
                theStartZ = null;
                theEndX = null;
                theEndY = null;
                theEndZ = null;
                theWatchX = null;
                theWatchY = null;
                theWatchZ = null;
                theMoveSpeed = null;

                return;

              }

              moveTo(sx, sy, sz, ex, ey, ez, wx, wy, wz, Player.getEntity(), speed);

              theStartX = null;
              theStartY = null;
              theStartZ = null;
              theEndX = null;
              theEndY = null;
              theEndZ = null;
              theWatchX = null;
              theWatchY = null;
              theWatchZ = null;
              theMoveSpeed = null;

            } catch(e) {
              showError(e);
            }
          }
        }));

        theDialog = dialog.create();
        theDialog.show();

      } catch(e) {
        showError(e);
      }

    }
  }));

}

function newLevel(){

  clientMessage("타임랩스 스크립트 - By 두두찡\n명령어 \/help로 자세한 설명을 볼수 있습니다");
		
}

function leaveGame() {

  circleArray = []; 

  touchMode = false;

  theX = null;
  theY = null;
  theZ = null;
  theRadius = null;
  theRotationY = null;
  theSpeed = null;

  theStartX = null;
  theStartY = null;
  theStartZ = null;
  theEndX = null;
  theEndY = null;
  theEndZ = null;
  theWatchX = null;
  theWatchY = null;
  theWatchZ = null;
  theMoveSpeed = null;
}

function procCmd(cmd){

  if(cmd == "help"){
  	
  	 clientMessage("[타임랩스] 막대기(280)로 터치해 원형으로 이동하고\n그릇(281)로 터치해 일정 구간을 직선으로 이동하고\n버섯스튜(282)를 들면 모든 이동이 취소됩니다");
  	 
  }
		
}



