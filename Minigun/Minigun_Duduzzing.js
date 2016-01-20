
var SDCARD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

var CTX = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

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

var File = java.io.File;

var Gravity = android.view.Gravity;

var GridLayout = android.widget.GridLayout;

var ImageView = android.widget.ImageView;

var LinearLayout = android.widget.LinearLayout;

var ListView = android.widget.ListView;

var Paint = android.graphics.Paint;

var PopupWindow = android.widget.PopupWindow;

var Rect = android.graphics.Rect;

var ScrollView = android.widget.ScrollView;

var Space = android.widget.Space;

var TextView = android.widget.TextView;

var View = android.view.View;

/*-----------------------------------*/

ModPE.overrideTexture("images/mob/minigun.png", "http://imgur.com/VdZr7hm.png");

var item_minigun = 511;

ModPE.setItem(item_minigun, "record_mall", 0, "Minigun");

Player.addItemCreativeInv(item_minigun, 1, 1);

var CTX = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
 
var Thank = Math.floor(Player.getX());
var You = Math.floor(Player.getY());
var For = Math.floor(Player.getZ());
var Playing;

var This = 0;
var is;
var Minigun_script = 0;
var Made_By;
var Dudu;
var Please;
var Enjoy = 5;
var the_Script;

var Have;
var A;
var Nice_Day;

var _ = [];
var __ = 0;
var ___ = 1;
var ____ = 3;
var _____ = 2;
var ______ = [];
var _______ = [];
function dip2Thank(dip) {
		
  return dip;
  
}



function newLevel() {
	
	
	
	clientMessage(
	"screenWidth: "+screenWidth+
	"\ndip 0: " + 200 +
	"\ndip/sw: "+(200/screenWidth)+
	"\npercent: "+screenWidth*(200/screenWidth)+
	"\nsecond: "+screenWidth/(screenWidth/200)+
	"\n-------------"+
	"\n1024/4: "+(1024/4)+
	"\n1024/1024*200*200
	);
	
	
  Playing = false;
  This = 0;
  Made_By = true;
  Dudu = true;
  Enjoy = 5;
  the_Script = true;
  is = true;
  Minigun_script = 0;
  Have = false;
  A = false;
  Nice_Day = false;
  __ = 0;
  ___ = 1;
  Please = false;
  ____ = 3;
}
function leaveGame() {
  Playing = false;
  This = 0;
  Made_By = true;
  Dudu = true;
  the_Script = true;
  is = true;
  Minigun_script = 0;
  Have = false;
  A = false;
  Nice_Day = false;
  __ = 0;
  ___ = 1;
  Enjoy = 5;
  Please = false;
  ____ = 3;
  _____ = 3;
  ______ = [];
  _______ = [];
  _ = [];
  CTX.runOnUiThread(new java.lang.Runnable({
    run: function() {
      try {
        _d1.dismiss();
        _d1 = null;
        _d2.dismiss();
        _d2 = null;
        _d3.dismiss();
        _d3 = null;
        _d4.dismiss();
        _d4 = null;
        _d5.dismiss();
        _d5 = null;
        _d6.dismiss();
        _d6 = null;
      } catch(e) {}
    }
  }));
}
function modTick() {
  Thank = Math.floor(Player.getX());
  You = Math.floor(Player.getY());
  For = Math.floor(Player.getZ());
  for (b in _______) {
    if (_______[b] > -1) {
      _______[b]--;
    }
    if (_______[b] == 0) {
      var x = Entity.getX(______[b]);
      var y = Entity.getY(______[b]);
      var z = Entity.getZ(______[b]);
      Level.explode(x, y, z, ____);
      Entity.remove(______[b]);
      ______.splice(b, 1);
      _______.splice(b, 1);
      break;
    }
  }
  if (Player.getCarriedItem() == 511) {
    Entity.setRenderType(Player.getEntity(), minigunRenderer.renderType);
    Entity.setMobSkin(Player.getEntity(), "mob/minigun.png");
  } else {
    Entity.setRenderType(Player.getEntity(), 3);
    Entity.setMobSkin(Player.getEntity(), "mob/char.png");
    CTX.runOnUiThread(new java.lang.Runnable({
      run: function() {
        try {
          Playing = false;
          if (_d1 != null || _c1 != null) {
            _d1.dismiss();
            _d1 = null;
          }
          if (_d2 != null || _c2 != null) {
            _d2.dismiss();
            _d2 = null;
          }
          if (_d3 != null || _c3 != null) {
            _d3.dismiss();
            _d3 = null;
          }
          if (_d4 != null || _c4 != null) {
            _d4.dismiss();
            _d4 = null;
          }
          if (_d5 != null || _c5 != null) {
            _d5.dismiss();
            _d5 = null;
          }
          if (_d6 != null || _c6 != null) {
            _d6.dismiss();
            _d6 = null;
          }
        } catch(e) {}
      }
    }));
  }
  if (This == 1) {
    velX = Math.sin(getYaw() / 180 * Math.PI) * Math.cos((getPitch() - 180) / 180 * Math.PI);
    velZ = -1 * Math.cos(getYaw() / 180 * Math.PI) * Math.cos((getPitch() - 180) / 180 * Math.PI);
    pe = Player.getEntity();
    yaw = Math.floor(getYaw());
    pitch = Math.floor(getPitch());
    sin = -Math.sin(yaw / 180 * Math.PI);
    cos = Math.cos(yaw / 180 * Math.PI);
    tan = -Math.sin(pitch / 180 * Math.PI);
    pcos = Math.cos(pitch / 180 * Math.PI);
    Level.addParticle(ParticleType.mobFlame, Player.getX() + 3 * sin, Player.getY() - 1, Player.getZ() + 3 * cos, 1, 1, 1, 5);
    tnt = Level.spawnMob(Player.getX + 2 * sin, Player.getY() - 1, Player.getZ() + 2 * cos, 81);
    setVelX(tnt, velX);
    setVelZ(tnt, velZ);
  }
  if (__ > 1) {
    __--;
  }
  if (__ == 2) {
    for (var i in _) {
      Entity.remove(_[i]);
      __ = 0;
    }
  }
  if (Please) {
    flame();
  }
}

function projectileHitBlockHook(projectile, x, y, z, side) {

  for (var s in _) {
    if (projectile == _[s]) {      
      if(Have){
      	  Level.explode(x, y, z, ___);
      	}    	
      _.splice(s, 1);
      __ = 60;

    }
  }

}

function entityAddedHook(ent) {
  if (Entity.getEntityTypeId(ent) == EntityType.SNOWBALL && This == 1) {
    _.push(ent);
  }
}

function useItem(x, y, z, i, b) {
  if (i == item_minigun) {
    if (!Playing) {
      try {
        openMinigun();
        yammy("Minigun operate")
        Playing = true;
      } catch(e) {
        yammy(e);
      }
    }
  }
}
function openMinigun() {
   
  CTX.runOnUiThread(new java.lang.Runnable({
    run: function() {
      try {
        _d1 = new android.widget.PopupWindow();
        _d2 = new android.widget.PopupWindow();
        _d3 = new android.widget.PopupWindow();
        _d4 = new android.widget.PopupWindow();
        var l1 = new android.widget.RelativeLayout(CTX);
        var l2 = new android.widget.RelativeLayout(CTX);
        var l3 = new android.widget.RelativeLayout(CTX);
        var l4 = new android.widget.RelativeLayout(CTX);
        var _c1 = new android.widget.Button(CTX);
        var _c2 = new android.widget.Button(CTX);
        var _c3 = new android.widget.Button(CTX);
        var _c4 = new android.widget.Button(CTX);
        _c1.setTextColor(android.graphics.Color.BLACK);
        _c1.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX,14);
        _c1.setText("Grenade");
        _c1.setOnClickListener(new android.view.View.OnClickListener({
          onClick: function(viewarg) {
            try {
              if (Made_By) {
                _c1.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn1.9.png"));
                _c1.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
                Made_By = false;
                Have = true;
              }
              else if (Made_By == false) {
                _c1.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
                _c1.setTextColor(android.graphics.Color.BLACK);
                Made_By = true;
                Have = false;
              }
            }
            catch(e) {
              clientMessage(e);
            }
          }
        }));
        l1.addView(_c1);
        _c1.setOnLongClickListener(new android.view.View.OnLongClickListener({
          onLongClick: function(viewarg) {
            try {
              yammy("Wassup?");
              return true;
            } catch(e) {
              clientMessage(e);
            }
          }
        }));
        _c4.setText("Fire");
        _c4.setTextColor(android.graphics.Color.BLACK);
        _c4.setOnTouchListener(new android.view.View.OnTouchListener({
          onTouch: function(viewarg, event) {
            try {
              switch (event.action) {
              case android.view.MotionEvent.ACTION_DOWN:
                _c4.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn1.9.png"));
                _c4.setTextColor(android.graphics.Color.RED);
                This = 1;
                break;
              case android.view.MotionEvent.ACTION_UP:
                _c4.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
                _c4.setTextColor(android.graphics.Color.BLACK);
                __ = 100;
                This = 0;
                break;
              }
              return false;
            } catch(e) {
              clientMessage(e);
            }
          }
        }));
        l4.addView(_c4);
        _c3.setTextColor(android.graphics.Color.BLACK);
        _c3.setText("Missile");
        _c3.setOnClickListener(new android.view.View.OnClickListener({
          onClick: function(viewarg) {
            try {
              _c3.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
              var Sin = -Math.sin(getYaw() / 180 * Math.PI);
              var Cos = Math.cos(getYaw() / 180 * Math.PI);
              velX = Math.sin(getYaw() / 180 * Math.PI) * Math.cos((getPitch() - 180) / 180 * Math.PI) * _____;
              velZ = -1 * Math.cos(getYaw() / 180 * Math.PI) * Math.cos((getPitch() - 180) / 180 * Math.PI) * _____;
              _c3.setTextColor(android.graphics.Color.BLACK);
              var _gg = Level.spawnMob(Thank + 2 * Sin, You - 0.5, For + 2 * Cos, 80);
              Entity.setVelX(_gg, velX);
              Entity.setVelZ(_gg, velZ);
              ______.push(_gg);
              _______.push(100);
            } catch(e) {
              clientMessage(e);
            }
          }
        }));
        l3.addView(_c3);
        _c3.setOnTouchListener(new android.view.View.OnTouchListener({
          onTouch: function(viewarg, event) {
            try {
              switch (event.action) { 
              case android.view.MotionEvent.ACTION_DOWN:
                _c3.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn1.9.png"));
                _c3.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
                break;
              case android.view.MotionEvent.ACTION_MOVE:
                _c3.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
                _c3.setTextColor(android.graphics.Color.BLACK);
                break;
              case android.view.MotionEvent.ACTION_UP:
                _c3.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
                _c3.setTextColor(android.graphics.Color.BLACK);
                break;
              }
              return false;
            } catch(e) {
              clientMessage(e);
            }
          }
        }));
        _c2.setText("Flame");
        _c2.setTextColor(android.graphics.Color.BLACK);
        _c2.setOnClickListener(new android.view.View.OnClickListener({
          onClick: function(viewarg) {
            try {
              if (Dudu) {
                _c2.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn1.9.png"));
                _c2.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
                Please = true;
                Dudu = false;
              }
              else if (Dudu == false) {
                _c2.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
                _c2.setTextColor(android.graphics.Color.BLACK);
                Please = false;
                Dudu = true;
              }
            } catch(e) {
              clientMessage(e);
            }
          }
        }));
        l2.addView(_c2);
        _c2.setOnTouchListener(new android.view.View.OnTouchListener({
          onTouch: function(viewarg, event) {
            try {
              switch (event.action) {
              case android.view.MotionEvent.ACTION_DOWN:
                _c2.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
                break;
              case android.view.MotionEvent.ACTION_UP:
                _c2.setTextColor(android.graphics.Color.BLACK);
                break;
              }
              return false;
            }
            catch(e) {
              clientMessage(e);
            }
          }
        }));
        if (Made_By) {
          _c1.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
        }
        else if (!Made_By) {
          _c1.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn1.9.png"));
          _c1.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
        }
        if (Dudu) {
          _c2.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
        }
        else if (!Dudu) {
          _c2.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn1.9.png"));
          _c2.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
        }
        if (the_Script) {
          _c3.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
        }
        else if (!the_Script) {
          _c3.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn1.9.png"));
          _c3.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
        }
        _c4.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
        _d1.setContentView(l1);
        _d1.setWidth(dip2Thank( 100));
        _d1.setHeight(dip2Thank( 50));
        _d2.setContentView(l2);
        _d2.setWidth(dip2Thank( 100));
        _d2.setHeight(dip2Thank( 50));
        _d3.setContentView(l3);
        _d3.setWidth(dip2Thank( 100));
        _d3.setHeight(dip2Thank( 50));
        _d4.setContentView(l4);
        _d4.setWidth(dip2Thank( 100));
        _d4.setHeight(dip2Thank( 50));
        _d1.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        _d2.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        _d3.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        _d4.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        _d1.showAtLocation(CTX.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 200, 75);
        _d2.showAtLocation(CTX.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 100, 75);
        _d3.showAtLocation(CTX.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 200, 155);
        _d4.showAtLocation(CTX.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 100, 155);
        _d5 = new android.widget.PopupWindow();
        var l5 = new android.widget.RelativeLayout(CTX);
        var _c5 = new android.widget.Button(CTX);
        _c5.setText("Setting");
        _c5.setTextColor(android.graphics.Color.WHITE);
        _c5.setOnClickListener(new android.view.View.OnClickListener({
          onClick: function(viewarg) {
            try {
              e_s_e();
            } catch(e) {
              clientMessage(e);
            }
          }
        }));
        l5.addView(_c5);
        _c5.setOnTouchListener(new android.view.View.OnTouchListener({
          onTouch: function(viewarg, event) {
            try {
              switch (event.action) {
              case android.view.MotionEvent.ACTION_DOWN:
                _c5.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
                break;
              case android.view.MotionEvent.ACTION_UP:
                _c5.setTextColor(android.graphics.Color.WHITE);
                break;
              }
              return false;
            }
            catch(e) {
              clientMessage(e);
            }
          }
        }));
        _c5.setOnLongClickListener(new android.view.View.OnLongClickListener({
          onLongClick: function(viewarg) {
            try {
              yammy("Made by Dudu");
              return true;
            }
            catch(e) {
              yammy(e);
            }
          }
        }));
        _d5.setContentView(l5);
        _d5.setWidth(dip2Thank( 100));
        _d5.setHeight(dip2Thank( 50));
        _d5.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        _d5.showAtLocation(CTX.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 75);
        _c5.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/bg1.9.png"));
        _d6 = new android.widget.PopupWindow();
        var l6 = new android.widget.RelativeLayout(CTX);
        var _c6 = new android.widget.Button(CTX);
        if (Minigun_script == 1) {
          _c6.setText("Show");
          _c6.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
        } else if (Minigun_script == 0) {
          _c6.setText("Hide");
          _c6.setTextColor(android.graphics.Color.WHITE);
        }
        _c6.setOnClickListener(new android.view.View.OnClickListener({
          onClick: function(viewarg) {
            try {
              if (is) {
                if (_d1 != null || _c1 != null) {
                  _d1.dismiss();
                  _d1 = null;
                }
                if (_d2 != null || _c2 != null) {
                  _d2.dismiss();
                  _d2 = null;
                }
                if (_d3 != null || _c3 != null) {
                  _d3.dismiss();
                  _d3 = null;
                }
                if (_d4 != null || _c4 != null) {
                  _d4.dismiss();
                  _d4 = null;
                }
                if (_d5 != null || _c5 != null) {
                  _d5.dismiss();
                  _d5 = null;
                }
                if (_d6 != null || _c6 != null) {
                  _d6.dismiss();
                  _d6 = null;
                }
                Minigun_script = 1;
                openMinigun();
                if (_d1 != null || _c1 != null) {
                  _d1.dismiss();
                  _d1 = null;
                }
                if (_d2 != null || _c2 != null) {
                  _d2.dismiss();
                  _d2 = null;
                }
                if (_d3 != null || _c3 != null) {
                  _d3.dismiss();
                  _d3 = null;
                }
                if (_d4 != null || _c4 != null) {
                  _d4.dismiss();
                  _d4 = null;
                }
                if (_d5 != null || _c5 != null) {
                  _d5.dismiss();
                  _d5 = null;
                }
                is = false;
              } else if (!is) {
                _d6.dismiss();
                _d6 = nullMinigun_script = 0;
                openMinigun();
                is = true;
                return true;
              }
            } catch(e) {
              clientMessage(e);
            }
          }
        }));
        l6.addView(_c6);
        _c6.setOnTouchListener(new android.view.View.OnTouchListener({
          onTouch: function(viewarg, event) {
            try {
              switch (event.action) {
              case android.view.MotionEvent.ACTION_DOWN:
                _c6.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
                break;
              case android.view.MotionEvent.ACTION_UP:
                _c6.setTextColor(android.graphics.Color.WHITE);
                break;
              }
              return false;
            }
            catch(e) {
              clientMessage(e);
            }
          }
        }));
        _c6.setOnLongClickListener(new android.view.View.OnLongClickListener({
          onLongClick: function(viewarg) {
            try {
              if (!is) {
                Playing = false;
                is = true;
                Minigun_script = 0;
                if (_d6 != null || _c6 != null) {
                  _d6.dismiss();
                  _d6 = null;
                }
              }
              return true;
            } catch(e) {
              yammy(e);
            }
          }
        }));
        _d6.setContentView(l6);
        _d6.setWidth(dip2Thank( 100));
        _d6.setHeight(dip2Thank( 50));
        _d6.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        _d6.showAtLocation(CTX.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 145);
        _c6.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/bg1.9.png"));
      } catch(e) {
        clientMessage(e);
      }
    }
  }));
}
function flame() {
  pe = Player.getEntity();
  sin = -Math.sin(getYaw() / 180 * Math.PI);
  cos = Math.cos(getYaw() / 180 * Math.PI);
  pcos = Math.cos(getPitch() / 180 * Math.PI);
  psin = -Math.sin(getPitch() / 180 * Math.PI);
  for (var a = 1; a < Enjoy; a++) {
    Level.addParticle(ParticleType.mobFlame, Thank + a * sin, You - 0.5, For + a * cos, 1, 1, 1, a * 10);
    if (Enjoy >= 1 && Enjoy < 11) {
      Level.setTile(Thank + a * sin, You - 1, For + a * cos, 51);
      Level.setTile(Thank + a * sin, You, For + a * cos, 51);
    }
    if (Enjoy > 10 && Enjoy < 21) {
      Level.setTile(Thank + a * sin, You - 1, For + a * cos, 51);
      Level.setTile(Thank + a * sin, You, For + a * cos, 51);
    }
    if (Enjoy > 20 && Enjoy < 31) {
      Level.setTile(Thank + a * sin, You - 1, For + a * cos, 51);
      Level.setTile(Thank + a * sin, You, For + a * cos, 51);
    }
    if (Enjoy > 30) {
      Level.setTile(Thank + a * sin, You - 1, For + a * cos, 51);
      Level.setTile(Thank + a * sin, You, For + a * cos, 51);
    }
  }
}
function e_s_e() {
  CTX.runOnUiThread(new java.lang.Runnable({
    run: function() {
      try {
        var layout = new android.widget.LinearLayout(CTX);
        layout.setOrientation(1);
        layout.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
        var seek0 = new android.widget.SeekBar(CTX);
        seek0.setMax(40);
        seek0.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
        seek0.setProgress(___);
        seek0.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
          onProgressChanged: function(seek) {
            try {
              seek0.getProgress();
              return false;
            } catch(e) {
              clientMessage(e);
            }
          }
        }));
        layout.addView(seek0);
        var ___Text = new android.widget.TextView(CTX);
        ___Text.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX,20);
        ___Text.setText("Grenade Power:   " + ___);
        ___Text.setTextColor(android.graphics.Color.BLACK);
        layout.addView(___Text);
        var seek1 = new android.widget.SeekBar(CTX);
        seek1.setMax(40);
        seek1.setProgress(Enjoy);
        seek1.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/bg1.9.png"));
        seek1.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
          onProgressChanged: function(seek) {
            try {
              seek1.getProgress();
              return false;
            } catch(e) {
              clientMessage(e);
            }
          }
        }));
        layout.addView(seek1);
        var fPowerText = new android.widget.TextView(CTX);
        fPowerText.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX,20);
        fPowerText.setText("Flamethrower Power:   " + Enjoy);
        fPowerText.setTextColor(android.graphics.Color.BLACK);
        layout.addView(fPowerText);
        var seek2 = new android.widget.SeekBar(CTX);
        seek2.setMax(50);
        seek2.setProgress(____);
        seek2.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/bg1.9.png"));
        seek2.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
          onProgressChanged: function(seek) {
            try {
              seek2.getProgress();
              return false;
            } catch(e) {
              clientMessage(e);
            }
          }
        }));
        layout.addView(seek2);
        var bPowerText = new android.widget.TextView(CTX);
        bPowerText.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX,20);
        bPowerText.setText("Missile Power:   " + ____);
        bPowerText.setTextColor(android.graphics.Color.BLACK);
        layout.addView(bPowerText);
        var seek3 = new android.widget.SeekBar(CTX);
        seek3.setMax(10);
        seek3.setProgress(_____);
        seek3.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/bg1.9.png"));
        seek3.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
          onProgressChanged: function(seek) {
            try {
              seek3.getProgress();
              return false;
            } catch(e) {
              clientMessage(e);
            }
          }
        }));
        layout.addView(seek3);
        var bDText = new android.widget.TextView(CTX);
        bDText.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX,20);
        bDText.setText("Missile Range:   " + _____);
        bDText.setTextColor(android.graphics.Color.BLACK);
        layout.addView(bDText);
        var Button = new android.widget.Button(CTX);
        Button.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
        Button.setTextColor(android.graphics.Color.WHITE);
        Button.setText("Save");
        Button.setOnClickListener(new android.view.View.OnClickListener() {
          onClick: function(viewarg) {
            try {
              ___ = seek0.getProgress();
              Enjoy = seek1.getProgress();
              ____ = seek2.getProgress();
              _____ = seek3.getProgress();
              seek0.setProgress(___);
              seek1.setProgress(Enjoy);
              seek2.setProgress(____);
              seek3.setProgress(_____);
              ___Text.setText("Grenade Power:   " + ___);
              fPowerText.setText("Flamethrower Power:   " + Enjoy);
              bPowerText.setText("Missile Power:   " + ____);
              bDText.setText("Missile Range:   " + _____);
            } catch(e) {
              clientMessage(e);
            }
          }
        });
        layout.addView(Button);
        Button.setOnTouchListener(new android.view.View.OnTouchListener({
          onTouch: function(viewarg, event) {
            try {
              switch (event.action) { 
              case android.view.MotionEvent.ACTION_DOWN:
                Button.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn1.9.png"));
                Button.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
                break;
              case android.view.MotionEvent.ACTION_MOVE:
                Button.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
                Button.setTextColor(android.graphics.Color.WHITE);
                break;
              case android.view.MotionEvent.ACTION_UP:
                Button.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
                Button.setTextColor(android.graphics.Color.WHITE);
                break;
              }
              return false;
            } catch(e) {
              clientMessage(e);
            }
          }
        }));
        var quitButton = new android.widget.Button(CTX);
        quitButton.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
        quitButton.setTextColor(android.graphics.Color.WHITE);
        quitButton.setText("Close");
        quitButton.setOnClickListener(new android.view.View.OnClickListener() {
          onClick: function(viewarg) {
            try {
              Dialog.dismiss();
            } catch(e) {
              clientMessage(e);
            }
          }
        });
        layout.addView(quitButton);
        quitButton.setOnTouchListener(new android.view.View.OnTouchListener({
          onTouch: function(viewarg, event) {
            try {
              switch (event.action) { 
              case android.view.MotionEvent.ACTION_DOWN:
                quitButton.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn1.9.png"));
                quitButton.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
                break;
              case android.view.MotionEvent.ACTION_MOVE:
                quitButton.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
                quitButton.setTextColor(android.graphics.Color.WHITE);
                break;
              case android.view.MotionEvent.ACTION_UP:
                quitButton.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
                quitButton.setTextColor(android.graphics.Color.WHITE);
                break;
              }
              return false;
            }
            catch(e) {
              clientMessage(e);
            }
          }
        }));
        var resetButton = new android.widget.Button(CTX);
        resetButton.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
        resetButton.setTextColor(android.graphics.Color.WHITE);
        resetButton.setText("Reset");
        resetButton.setOnClickListener(new android.view.View.OnClickListener() {
          onClick: function(viewarg) {
            try {
              ___ = 1;
              Enjoy = 5;
              ____ = 3;
              _____ = 3;
              ___Text.setText("Grenade Power:   " + ___);
              fPowerText.setText("Flamethrower Power:   " + Enjoy);
              bPowerText.setText("Missile Power:   " + ____);
              bDText.setText("Missile Range:   " + _____);
              seek0.setProgress(___);
              seek1.setProgress(Enjoy);
              seek2.setProgress(____);
              seek3.setProgress(_____);
            }
            catch(e) {
              clientMessage(e);
            }
          }
        });
        layout.addView(resetButton);
        resetButton.setOnTouchListener(new android.view.View.OnTouchListener({
          onTouch: function(viewarg, event) {
            try {
              switch (event.action) { 
              case android.view.MotionEvent.ACTION_DOWN:
                resetButton.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn1.9.png"));
                resetButton.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
                break;
              case android.view.MotionEvent.ACTION_MOVE:
                resetButton.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
                resetButton.setTextColor(android.graphics.Color.WHITE);
                break;
              case android.view.MotionEvent.ACTION_UP:
                resetButton.setBackgroundDrawable(ninePatchDrawable("/mcpe9patch/btn.9.png"));
                resetButton.setTextColor(android.graphics.Color.WHITE);
                break;
              }
              return false;
            } catch(e) {
              clientMessage(e);
            }
          }
        }));
        var author = new android.widget.TextView(CTX);
        author.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX,20);
        author.setText("Minigun\nScript\nMade By. Dudu");
        author.setTextColor(android.graphics.Color.parseColor("#ffffa5"));
        layout.addView(author);
        seek0.setProgress(___);
        seek1.setProgress(Enjoy);
        seek2.setProgress(____);
        seek3.setProgress(_____);
        ScrollView = new android.widget.ScrollView(CTX);
        ScrollView.addView(layout);
        Dialog = new android.widget.PopupWindow(ScrollView, CTX.getWindowManager().getDefaultDisplay().getWidth() / 4, CTX.getWindowManager().getDefaultDisplay().getHeight(), true);
        Dialog.showAtLocation(CTX.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, 0, 0);
      } catch(error) {
        yammy(error);
      }
    }
  }));
}
function minigunRender(renderer) {
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
  body.setTextureOffset(0, 0);
  body.addBox(-4, 7, -5, 7, 7, 5);
  body.addBox(-4, 7, 0, 7, 7, 5);
  body.setTextureOffset(40, 0);
  body.addBox(-5, 9, -2, 1, 5, 6);
  body.addBox(3, 9, -2, 1, 5, 6);
  body.setTextureOffset(24, 19);
  body.addBox(4, 10, -1, 2, 6, 3);
  body.setTextureOffset(0, 24);
  body.addBox(-2, 16, -1, 8, 2, 3);
  body.setTextureOffset(28, 9);
  body.addBox(-2, 18, -1, 3, 6, 3);
  body.setTextureOffset(16, 12);
  body.addBox(-2, 23, -7, 3, 1, 6);
  body.addBox(-2, 23, 2, 3, 1, 6);
  body.setTextureOffset(20, 28);
  body.addBox(1, 23, -1, 6, 1, 3);
  body.addBox(-8, 23, -1, 6, 1, 3);
  body.setTextureOffset(40, 11);
  body.addBox(-1, 7, -11, 1, 1, 4);
  body.addBox(-1, 7, -15, 1, 1, 4);
  body.addBox(-1, 7, -19, 1, 1, 1);
  body.addBox(-1, 7, -20, 1, 1, 1);
  body.addBox(-1, 7, -24, 1, 1, 4);
  body.addBox(-1, 7, -26, 1, 1, 1);
  body.addBox(-1, 7, -28, 1, 1, 1);
  body.addBox(-1, 7, -30, 1, 1, 1);
  body.addBox(-3, 8, -11, 1, 1, 4);
  body.addBox(-3, 8, -15, 1, 1, 4);
  body.addBox(-3, 8, -19, 1, 1, 1);
  body.addBox(-3, 8, -20, 1, 1, 1);
  body.addBox(-3, 8, -24, 1, 1, 4);
  body.addBox(-3, 8, -26, 1, 1, 1);
  body.addBox(-3, 8, -28, 1, 1, 1);
  body.addBox(-3, 8, -30, 1, 1, 1);
  body.addBox(1, 8, -11, 1, 1, 4);
  body.addBox(1, 8, -15, 1, 1, 4);
  body.addBox(1, 8, -19, 1, 1, 1);
  body.addBox(1, 8, -20, 1, 1, 1);
  body.addBox(1, 8, -24, 1, 1, 4);
  body.addBox(1, 8, -26, 1, 1, 1);
  body.addBox(1, 8, -28, 1, 1, 1);
  body.addBox(1, 8, -30, 1, 1, 1);
  body.addBox(-3, 10, -11, 1, 1, 4);
  body.addBox(-3, 10, -15, 1, 1, 4);
  body.addBox(-3, 10, -19, 1, 1, 1);
  body.addBox(-3, 10, -20, 1, 1, 1);
  body.addBox(-3, 10, -24, 1, 1, 4);
  body.addBox(-3, 10, -26, 1, 1, 1);
  body.addBox(-3, 10, -28, 1, 1, 1);
  body.addBox(-3, 10, -30, 1, 1, 1);
  body.addBox(1, 10, -11, 1, 1, 4);
  body.addBox(1, 10, -15, 1, 1, 4);
  body.addBox(1, 10, -19, 1, 1, 1);
  body.addBox(1, 10, -20, 1, 1, 1);
  body.addBox(1, 10, -24, 1, 1, 4);
  body.addBox(1, 10, -26, 1, 1, 1);
  body.addBox(1, 10, -28, 1, 1, 1);
  body.addBox(1, 10, -30, 1, 1, 1);
  body.addBox(-1, 11, -11, 1, 1, 4);
  body.addBox(-1, 11, -15, 1, 1, 4);
  body.addBox(-1, 11, -19, 1, 1, 1);
  body.addBox(-1, 11, -20, 1, 1, 1);
  body.addBox(-1, 11, -24, 1, 1, 4);
  body.addBox(-1, 11, -26, 1, 1, 1);
  body.addBox(-1, 11, -28, 1, 1, 1);
  body.addBox(-1, 11, -30, 1, 1, 1);
  body.setTextureOffset(48, 0);
  body.addBox(-3, 7, -29, 5, 5, 1);
  body.addBox(-3, 7, -27, 5, 5, 1);
  body.addBox(-3, 7, -25, 5, 5, 1);
  body.addBox(-3, 7, -18, 5, 5, 1);
  body.addBox(-3, 7, -17, 5, 5, 1);
  body.addBox(-3, 7, -16, 5, 5, 1);
  body.addBox(-3, 7, -7, 5, 5, 1);
  body.addBox(-3, 7, -6, 5, 5, 1);
  body.setTextureOffset(0, 12);
  body.addBox(-7, 14, -4, 4, 4, 8);
  body.setTextureOffset(0, 0);
  body.addBox(-5, 5, -5, 1, 1, 1);
  body.addBox(3, 5, -5, 1, 1, 1);
  body.addBox(-5, 6, -5, 1, 1, 1);
  body.addBox(3, 6, -5, 1, 1, 1);
  body.addBox(-5, 7, -5, 1, 1, 1);
  body.addBox(3, 7, -5, 1, 1, 1);
  body.addBox(-5, 8, -5, 1, 1, 1);
  body.addBox(3, 8, -5, 1, 1, 1);
  body.addBox(-4, 5, -5, 1, 1, 1);
  body.addBox(2, 5, -5, 1, 1, 1);
  body.addBox(-4, 4, -4, 1, 1, 1);
  body.addBox(2, 4, -4, 1, 1, 1);
  body.addBox(-4, 3, -3, 1, 1, 1);
  body.addBox(2, 3, -3, 1, 1, 1);
  body.addBox(-4, 2, -2, 1, 1, 1);
  body.addBox(2, 2, -2, 1, 1, 1);
  body.addBox(-3, 2, -2, 1, 1, 1);
  body.addBox(-2, 2, -2, 1, 1, 1);
  body.addBox(-1, 2, -2, 1, 1, 1);
  body.addBox(0, 2, -2, 1, 1, 1);
  body.addBox(1, 2, -2, 1, 1, 1);
  body.addBox(-5, 5, -5, 1, 1, 1);
  body.addBox(3, 5, -5, 1, 1, 1);
  body.addBox(-4, 5, -4, 1, 1, 1);
  body.addBox(2, 5, -4, 1, 1, 1);
  body.addBox(-3, 5, -3, 1, 1, 1);
  body.addBox(1, 5, -3, 1, 1, 1);
  body.addBox(-2, 5, -2, 1, 1, 1);
  body.addBox(0, 5, -2, 1, 1, 1);
  body.addBox(-1, 5, -1, 1, 1, 1);
  body.addBox(-1, 5, 0, 1, 1, 1);
  body.addBox(-1, 5, 1, 1, 1, 1);
  body.addBox(-1, 5, 2, 1, 1, 1);
  body.addBox(-1, 5, 3, 1, 1, 1);
  body.addBox(-1, 5, 4, 1, 1, 1);
  body.addBox(-1, 6, 4, 1, 1, 1);
  body.setTextureOffset(24, 0);
  body.addBox(-3, 6, 5, 5, 4, 3);
  body.setTextureOffset(0, 29);
  body.addBox(-2, 5, 6, 3, 1, 2);
  body.addBox(-2, 4, 7, 3, 1, 2);
  body.addBox(-2, 3, 8, 3, 1, 2);
  body.addBox(-2, 2, 9, 3, 1, 2);
  body.addBox(-2, 1, 10, 3, 1, 2);
  body.addBox(-2, 0, 10, 3, 1, 2);
  body.setTextureOffset(0, 12);
  body.addBox(-1, -2, 10, 1, 2, 2);
  body.setTextureOffset(10, 29);
  body.addBox(-2, 7, 8, 3, 2, 1);
  body.addBox(-2, 11, 5, 3, 2, 1);
  body.setTextureOffset(0, 2);
  body.addBox(-1, 7, 9, 1, 1, 1);
  body.addBox(-1, 8, 9, 1, 1, 1);
  body.addBox(-1, 9, 9, 1, 1, 1);
  body.addBox(-1, 10, 9, 1, 1, 1);
  body.addBox(-1, 11, 8, 1, 1, 1);
  body.addBox(-1, 12, 7, 1, 1, 1);
  body.addBox(-1, 12, 6, 1, 1, 1);
}
var minigunRenderer = Renderer.createHumanoidRenderer();
minigunRender(minigunRenderer);
function yammy(msg) {
  CTX.runOnUiThread(new java.lang.Runnable({
    run: function() {
      android.widget.Toast.makeText(CTX, msg, android.widget.Toast.LENGTH_LONG).show();
    }
  }));
}
function ninePatchDrawable(file) {
  var br = new java.io.BufferedInputStream(new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory(), file)));
  var drawable = new android.graphics.drawable.NinePatchDrawable.createFromStream(br, null);
  return drawable;
}