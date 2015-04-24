var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

ModPE.overrideTexture("images/mob/flame.png", "http://imgur.com/TWAxOYk.png");

var fuel = 0;
var maxFuel = 2000;
var window;
var power = 5;
var check = 0;
var isOn = false;
var win;

function newLevel() {
	gui();
}

function wear() {
	Entity.setRenderType(Player.getEntity(), flame.renderType);
	Entity.setMobSkin(Player.getEntity(), "mob/flame.png");
}

function leaveGame() {
	isOn = false;
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			if (window != null) window.dismiss();
			if (win != null) win.dismiss();
		}
	}));
}

function useItem(x, y, z, i) {
	if (i == 263) {
		wear();
		if ((fuel + 200) <= maxFuel) {
			fuel += 200;
			Entity.setCarriedItem(Player.getEntity(), i, Player.getCarriedItemCount() - 1, 0);
		} else if (fuel > 1800 && fuel < 2000) {
			fuel = maxFuel;
			Entity.setCarriedItem(Player.getEntity(), i, Player.getCarriedItemCount() - 1, 0);
		} else {
			clientMessage("Can't put any more!");
		}
	}
}

function modTick() {
	ModPE.showTipMessage("\n\nFuel : " + fuel + " / " + maxFuel);
	if (isOn) {
		Flame();
	}
}

function Flame() {
	if (fuel <= 0) {
		clientMessage(ChatColor.RED + "Not enough fuel!");
		return;
	}
	var pe, px, py, pz, yaw, pitch, sin, cos, tan, pcos;
	pe = getPlayerEnt();
	px = Math.floor(getPlayerX());
	py = Math.floor(getPlayerY());
	pz = Math.floor(getPlayerZ());
	yaw = Math.floor(getYaw());
	pitch = Math.floor(getPitch());
	sin = -Math.sin(yaw / 180 * Math.PI);
	cos = Math.cos(yaw / 180 * Math.PI);
	tan = -Math.sin(pitch / 180 * Math.PI);
	pcos = Math.cos(pitch / 180 * Math.PI);
	fuel--;
	new java.lang.Thread(new java.lang.Runnable({
		run: function() {
			for (var a = 2; a < power; a++) {
				Level.addParticle(ParticleType.mobFlame, px + a * sin * pcos, py, pz + a * cos * pcos, 0, 0, 0, 20);
				Level.setTile(px + a * sin * pcos, py - 1, pz + a * cos * pcos, 51);
			}
			java.lang.Thread.sleep(1);
		}
	})).start();
}

function dips(dips) {
	return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function gui() {
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			try {
				var size = 4;
				var pectx = ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);
				var p = pectx.getAssets();
				var input = p.open("images/gui/spritesheet.png");
				var path = new android.graphics.BitmapFactory.decodeStream(input);
				window = new android.widget.PopupWindow();
				var seekBar = new android.widget.SeekBar(ctx);
				seekBar.setMax(10);
				seekBar.setProgress(power);
				seekBar.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
					onProgressChanged: function(seek) {
						power = 5 + seek.getProgress();
					}
				}));
				win = new android.widget.PopupWindow(seekBar, ctx.getWindowManager().getDefaultDisplay().getWidth() / 7, ctx.getWindowManager().getDefaultDisplay().getHeight() / 7, false);
				win.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, 0)
				var btn = new android.widget.Button(ctx);
				var btnBitmap = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(path, 8, 32, 8, 8), dips(8 * size), dips(8 * size), false);
				var btnBitmap2 = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(path, 0, 32, 8, 8), dips(8 * size), dips(8 * size), false);
				btn.setBackgroundDrawable(createNinePatch(btnBitmap, 2 * size, 3 * size, 7 * size, 7 * size));
				btn.setText("Fire");
				btn.setShadowLayer(1 / Math.pow(10, 10), dips(4), dips(4), android.graphics.Color.DKGRAY);
				btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, 20);
				var sdcard = android.os.Environment.getExternalStorageDirectory();
				var file = new java.io.File(sdcard + "/games/com.mojang/minecraft.ttf");
				if (file.exists()) {
					btn.setTypeface(android.graphics.Typeface.createFromFile(sdcard + "/games/com.mojang/minecraft.ttf"));
				}
				btn.setOnClickListener(new android.view.View.OnClickListener({
					onClick: function(v) {
						try {
							check += 1;
							if (check >= 20) {
								clientMessage("Thanks for playing!\n-Dudu")
								check = 0;
							}
						} catch (e) {
							clientMessage(e);
						}
					}
				}));
				try {
					btn.setOnTouchListener(new android.view.View.OnTouchListener({
						onTouch: function(v, event) {
							switch (event.action) {
								case android.view.MotionEvent.ACTION_UP:
									isOn = false;
									btn.setBackgroundDrawable(createNinePatch(btnBitmap, 3 * size, 4 * size, 6 * size, 6 * size));
									break;
								case android.view.MotionEvent.ACTION_DOWN:
									isOn = true;
									btn.setBackgroundDrawable(createNinePatch(btnBitmap2, 2 * size, 2 * size, 6 * size, 5 * size));
									break;
							}
							return false;
						}
					}));
				} catch (e) {
					clientMessage(e);
				}
				window = new android.widget.PopupWindow(btn, ctx.getWindowManager().getDefaultDisplay().getWidth() / 7, ctx.getWindowManager().getDefaultDisplay().getHeight() / 7, false);
				window.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT, 0, 0);
			} catch (e) {
				clientMessage(e);
			}
		}
	}));
}

function createNinePatch(bitmap, x, y, xx, yy) {
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	var NO_COLOR = 0x00000001;
	var buffer = java.nio.ByteBuffer.allocate(56).order(java.nio.ByteOrder.nativeOrder());
	buffer.put(0x01);
	buffer.put(0x02);
	buffer.put(0x02);
	buffer.put(0x02);
	buffer.putInt(0);
	buffer.putInt(0);
	buffer.putInt(0);
	buffer.putInt(0);
	buffer.putInt(0);
	buffer.putInt(0);
	buffer.putInt(0);
	buffer.putInt(y - 1);
	buffer.putInt(yy);
	buffer.putInt(x - 1);
	buffer.putInt(xx);
	buffer.putInt(NO_COLOR);
	buffer.putInt(NO_COLOR);
	var drawable = new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), null);
	return drawable;
}

function flameThrowerRender(renderer) {
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
	for (var a = 0; a < 8; a++) {
		for (var b = 0; b < 4; b++) {
			body.setTextureOffset(43 + a, 16 + b);
			body.addBox(2 + b, 0, -4 + a, 1, 0, 1);
			body.setTextureOffset(42 + a, 16 + b);
			body.addBox(2 + b, 12, -4 + a, 1, 0, 1);
			body.setTextureOffset(19 + a, 16 + b);
			body.addBox(-2 + b, 0, -4 + a, 1, 0, 1);
			body.setTextureOffset(26 + a, 16 + b);
			body.addBox(-2 + b, 12, -4 + a, 1, 0, 1);
		}
	}
	body.setTextureOffset(40, 20);
	body.addBox(2, 0, -4, 4, 12, 0);
	body.setTextureOffset(36, 20);
	body.addBox(2, 0, 4, 4, 12, 0);
	body.setTextureOffset(36, 12);
	body.addBox(6, 0, -4, 0, 12, 8);
	for (var a = 0; a < 8; a++) {
		body.setTextureOffset(12, 16);
		body.addBox(4 - a / 2, 10 + a / 5, 4, 1, 1, 1);
		head.setTextureOffset(6 - a, 7);
		head.addBox(3, -8, -4 + a, 0, 8, 1);
	}
	for (var a = 0; a < 9; a++) {
		body.setTextureOffset(12, 16);
		body.addBox(-a / 2, 11.6 + a / 10, 4, 1, 1, 1);
	}
	body.setTextureOffset(12, 16);
	body.addBox(3, -1, -3, 2, 1, 2);
	body.addBox(3, -1, 1, 2, 1, 2);
	body.setTextureOffset(12, 16);
	body.addBox(3.5, -2, -2.5, 1, 1, 1);
	body.addBox(3.5, -2, 1.5, 1, 1, 1);
	body.setTextureOffset(16, -1);
	body.addBox(-6, 11.5, -21, 0, 1, 1);
	body.setTextureOffset(16, 0);
	body.addBox(-6.5, 11.5, -20.5, 1, 1, 0);
	body.setTextureOffset(52, 21);
	body.addBox(-7, 11, -14, 2, 0, 9);
	body.setTextureOffset(50, 21);
	body.addBox(-7, 13, -14, 2, 0, 9);
	body.setTextureOffset(52, 21);
	body.addBox(-7, 11, -14, 0, 2, 9);
	body.setTextureOffset(43, 21);
	body.addBox(-5, 11, -14, 0, 2, 9);
	body.setTextureOffset(32, 0);
	body.addBox(-8, 10, -5, 4, 4, 10);
	body.setTextureOffset(52, 21);
	body.addBox(-6.5, 13, -20, 1, 0, 8);
	body.setTextureOffset(50, 21);
	body.addBox(-6.5, 14, -20, 1, 0, 8);
	body.setTextureOffset(52, 30);
	body.addBox(-6.5, 13, -20, 1, 1, 0);
	body.setTextureOffset(52, 30);
	body.addBox(-6.5, 13, -12, 1, 1, 0);
	body.setTextureOffset(52, 21);
	body.addBox(-6.5, 13, -20, 0, 1, 8);
	body.setTextureOffset(43, 21);
	body.addBox(-5.5, 13, -20, 0, 1, 8);
	body.setTextureOffset(32, 0);
	body.addBox(-6.5, 12.5, -21, 1, 1, 1);
	body.setTextureOffset(50, 0);
	body.addBox(-7.5, 10.5, -17, 3, 3, 3);
	head.setTextureOffset(-16, 0);
	head.addBox(-5, 0, -4, 8, 0, 8);
	head.setTextureOffset(0, 0);
	head.addBox(-5, -8, -4, 8, 0, 8);
	head.setTextureOffset(8, 8);
	head.addBox(-5, -8, -4, 8, 8, 0);
	head.setTextureOffset(24, 0);
	head.addBox(-5, -8, 4, 8, 8, 0);
	head.setTextureOffset(0, 0);
	head.addBox(-5, -8, -4, 0, 8, 8);
	body.setTextureOffset(20, 12);
	body.addBox(-2, 0, -4, 0, 12, 8);
	body.setTextureOffset(24, 12);
	body.addBox(2, 0, -4, 0, 12, 8);
	body.setTextureOffset(28, 20);
	body.addBox(-2, 0, -4, 4, 12, 0);
	body.setTextureOffset(12, 20);
	body.addBox(-2, 0, 4, 4, 12, 0);
	var s = 2;
	body.setTextureOffset(16, 0);
	body.addBox(-2, 0, 4, 4, 0, 4);
	body.addBox(-7.5, 12, 4, 4, 0, 4);
	for (var a = 0; a < 11; a++) {
		if (a < 3) {
			body.setTextureOffset(16, 0);
			body.addBox(-2.5 - a / s, 1 + a, 4, 4, 0, 4);
			body.setTextureOffset(12, 0);
			body.addBox(-2 - a / s, 1 + a, 4, 4, 0, 4);
		} else {
			body.setTextureOffset(12, 8);
			body.addBox(-2.5 - a / s, 1 + a, 4, 4, 0, 4);
			body.addBox(-2 - a / s, 1 + a, 4, 4, 0, 4);
		}
	}
	for (var a = 0; a < 12; a++) {
		body.setTextureOffset(24, 4 + a);
		body.addBox(-2 - a / s, a, -8, 4, 1, 0);
		body.setTextureOffset(12, 4 + a);
		body.addBox(-2 - a / s, a, -4, 4, 1, 0);
		body.setTextureOffset(20, 0 + a);
		body.addBox(-2 - a / s, a, -8, 0, 1, 4);
		body.setTextureOffset(24, 0 + a);
		body.addBox(2 - a / s, a, -8, 0, 1, 4);
		body.setTextureOffset(16, 4 + a);
		body.addBox(-2 - a / s, a, 4, 4, 1, 0);
		body.setTextureOffset(20, 4 + a);
		body.addBox(-2 - a / s, a, 8, 4, 1, 0);
		body.setTextureOffset(20, 0 + a);
		body.addBox(-2 - a / s, a, 4, 0, 1, 4);
		body.setTextureOffset(24, 0 + a);
		body.addBox(2 - a / s, a, 4, 0, 1, 4);
	}
	body.setTextureOffset(16, 0);
	body.addBox(-2, 0, -8, 4, 0, 4);
	body.addBox(-7.5, 12, -8, 4, 0, 4);
	for (var a = 0; a < 11; a++) {
		if (a < 3) {
			body.setTextureOffset(16, 0);
			body.addBox(-2.5 - a / s, 1 + a, -8, 4, 0, 4);
			body.setTextureOffset(12, 0);
			body.addBox(-2 - a / s, 1 + a, -8, 4, 0, 4);
		} else {
			body.setTextureOffset(12, 8);
			body.addBox(-2.5 - a / s, 1 + a, -8, 4, 0, 4);
			body.addBox(-2 - a / s, 1 + a, -8, 4, 0, 4);
		}
	}
	body.setTextureOffset(0, 16);
	body.addBox(-2, 24, -4, 4, 0, 4);
	body.setTextureOffset(0, 16);
	body.addBox(-2, 12, -4, 4, 0, 4);
	for (var a = 0; a < 4; a++) {
		body.setTextureOffset(8 + a, 20);
		body.addBox(-2 + a, 12, -4, 1, 12, 0);
		body.setTextureOffset(-1 + a, 20);
		body.addBox(-2 + a, 12, 0, 1, 12, 0);
		body.setTextureOffset(4 + a, 19);
		body.addBox(-2, 12, -4 + a, 0, 12, 1);
		body.setTextureOffset(11 + a, 19);
		body.addBox(2, 12, -4 + a, 0, 12, 1);
		body.setTextureOffset(a, 20);
		body.addBox(-2 + a, 12, 0, 1, 12, 0);
		body.setTextureOffset(7 + a, 20);
		body.addBox(-2 + a, 12, 4, 1, 12, 0);
		body.setTextureOffset(4 + a, 19);
		body.addBox(-2, 12, a, 0, 12, 1);
		body.setTextureOffset(11 + a, 19);
		body.addBox(2, 12, a, 0, 12, 1);
	}
	body.setTextureOffset(0, 16);
	body.addBox(-2, 24, 0, 4, 0, 4);
	body.setTextureOffset(0, 16);
	body.addBox(-2, 12, 0, 4, 0, 4);
}

var flame = Renderer.createHumanoidRenderer();
flameThrowerRender(flame);
