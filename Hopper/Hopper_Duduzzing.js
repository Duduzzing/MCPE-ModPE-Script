
/**
 *깔때기 스크립트 / Hopper script
 *
 *version - 1.0
 *
 *Copyright © Duduzzing / 두두찡
 *
 *All rights reserved
 */

/**
 *Developer's github:
 *
 *Github.com/Duduzzing
 */
 
var lang = java.util.Locale.getDefault().getLanguage();

var hopper = 176;
var chest = 54;

Block.defineBlock(hopper, "Hopper", [
  ["cauldron_inner", 0],
  ["cauldron_top", 0],
  ["cauldron_inner", 0],
  ["cauldron_inner", 0],
  ["cauldron_inner", 0],
  ["cauldron_inner", 0]], 0, true, 0);

Block.setDestroyTime(hopper, 5);

Item.addShapedRecipe(hopper, 1, 0, ["a a", "aba", " a "], ["a", 265, 0, "b", chest, 0]);

var hopperArray = [];

var droppedItemArray = [];

function entityAddedHook(ent) {

  if (Entity.getEntityTypeId(ent) == 64) droppedItemArray.push(ent);

}

function removeItemFromArray() {

  for (var a in droppedItemArray) {
  	
  	 var item = droppedItemArray[a];
    var x = Entity.getX(item);
    var y = Entity.getY(item);
    var z = Entity.getZ(item);

    if (x == 0 && y == 0 && z == 0) droppedItemArray.splice(a, 1);

  }

}

function checkhopper() {

  for (var a in hopperArray) {

    var theHopper = hopperArray[a];
    var x = theHopper.x;
    var y = theHopper.y;
    var z = theHopper.z;
    
    var hopperBlock = Level.getTile(x, y, z);

    var sendX = theHopper.sendX;
    var sendY = theHopper.sendY;
    var sendZ = theHopper.sendZ;
    var chestBlock = Level.getTile(sendX, sendY, sendZ);

    if (hopperBlock != hopper) {

      hopperArray.splice(a, 1);

      continue;

    }

    (chestBlock != chest) ? hopperArray[a].isActivating = false : hopperArray[a].isActivating = true;

  }
}

function collectItems() {

  for (var c in hopperArray) {
  	
  	 var hopperBlock = hopperArray[c];
    var cx = hopperBlock.x;
    var cy = hopperBlock.y;
    var cz = hopperBlock.z;
    
    if (hopperBlock.isActivating == false) continue;

    for (var a in droppedItemArray) {

      var droppedItem = droppedItemArray[a];
      var x = Entity.getX(droppedItem);
      var y = Entity.getY(droppedItem);
      var z = Entity.getZ(droppedItem);

      var dis = Math.pow(cx - x, 2) + Math.pow(cz - z, 2);

      if (dis < 0.8 && y > cy && cy + 1.5 > y) {        

        var itemId = Entity.getItemEntityId(droppedItem);

        var itemData = Entity.getItemEntityData(droppedItem);

        var itemAmount = Entity.getItemEntityCount(droppedItem);

        for (var b = 0; b < 27; b++) {

          var sendX = hopperBlock.sendX;
          var sendY = hopperBlock.sendY;
          var sendZ = hopperBlock.sendZ;

          var slotId = Level.getChestSlot(sendX, sendY, sendZ, b);

          var slotData = Level.getChestSlotData(sendX, sendY, sendZ, b);

          var slotCount = Level.getChestSlotCount(sendX, sendY, sendZ, b);

          if (slotCount > 63 || [269, 273, 256, 284, 277, 270, 274, 257, 285, 278, 271, 275, 258, 286, 279, 261, 268, 272, 267, 283, 276, 290, 291, 292, 294, 293, 298, 302, 306, 314, 310, 299, 303, 307, 315, 311, 300, 304, 308, 316, 312, 301, 305, 309, 317, 313, 324, 328, 329, 330, 333, 346, 354, 355, 359, 459, 512].indexOf(slotId) + 1) continue;

          if (slotId == itemId && slotData == itemData) {

            var move = 0;

            do
            move++;
            while (slotCount + move < 64 && move < itemAmount)

            Level.setChestSlot(
            sendX, sendY, sendZ, b, slotId, slotData, slotCount + move);

            itemAmount -= move;

            if (itemAmount == 0) {

              droppedItemArray.splice(a, 1);

              Entity.remove(droppedItem);
              
              break;

            }

            continue;
          }

          if (slotCount != 0) continue;

          if (itemAmount > 64) {

            var m = 0;

            while (itemAmount - m > 64)
            m++;

            itemAmount = m;

            Level.setChestSlot(
            sendX, sendY, sendZ, b, itemId, itemData, 64);

          } else {

            Level.setChestSlot(
            sendX, sendY, sendZ, b, itemId, itemData, itemAmount);

            itemAmount = 0;
          }

          if (itemAmount == 0) {

            droppedItemArray.splice(a, 1);

            Entity.remove(droppedItem);
          } else {
            continue;
          }

          break;

        }

        if (itemAmount > 0) {

          droppedItemArray.splice(a, 1);

          Entity.remove(droppedItem);

          Level.dropItem(x, y + 1, z, 1, itemId, itemAmount, itemData);

        }
      }
    }
  }
}

function sideToArr(x, y, z, s) {
  if (s == 1) return[x, y + 1, z];
  if (s == 2) return[x, y, z - 1];
  if (s == 3) return[x, y, z + 1];
  if (s == 4) return[x - 1, y, z];
  if (s == 5) return[x + 1, y, z];
}

function hopperBlock(x, y, z, sendX, sendY, sendZ) {

  this.x = x;
  this.y = y;
  this.z = z;
  this.sendX = sendX;
  this.sendY = sendY;
  this.sendZ = sendZ;
  this.isActivating = true;

}

function useItem(x, y, z, I, b, s, id, bd) {

  if (b == hopper && s == 1) {

    for (var a in hopperArray) {

      if (x == hopperArray[a].x && y == hopperArray[a].y && z == hopperArray[a].z) {

        (lang == "ko") ? clientMessage("[깔때기] 작동되는 깔때기입니다.") : clientMessage("[Hopper] The hopper is working.");

        return;

      }

    } (lang == "ko") ? clientMessage("[깔때기] 망가진 깔때기입니다. 재설치를 권장합니다.") : clientMessage("[Hopper] The hopper is broken. Recommend u to replace it.");

  }

  if (b == chest && I == hopper && s != 0) {

    preventDefault();

    var side = sideToArr(x, y, z, s);

    Level.setTile(side[0], side[1], side[2], I);

    hopperArray.push(new hopperBlock(side[0], side[1], side[2], x, y, z));

    Entity.setCarriedItem(Player.getEntity(), hopper, Player.getCarriedItemCount() - 1, 0);

  }

}

var SDCARD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

function load() {

  try {
  	 
  	 hopperArray = [];
  	 droppedItemArray = [];
  	 
    var file = java.io.File(SDCARD + "/games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/Hopper.txt");

    if (!file.exists()) return;

    var fis = new java.io.FileInputStream(file);
    var isr = new java.io.InputStreamReader(fis);
    var br = new java.io.BufferedReader(isr);
    var r = br.readLine();

    if (r == null)
      return;

    hopperArray = JSON.parse(r);

    fis.close();
    isr.close();
    br.close();

  } catch(e) {

    clientMessage(e + " " + e.lineNumber);

  }

}

function save() {
  try {
    var file = java.io.File(SDCARD + "/games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/Hopper.txt");
    var fos = new java.io.FileOutputStream(file);
    var ow = new java.io.OutputStreamWriter(fos);
    var w = new java.io.BufferedWriter(ow);
    
    w.write(JSON.stringify(hopperArray));

    w.close();
    ow.close();
    fos.close();

  } catch(e) {

    clientMessage(e + " " + e.lineNumber);  	
  	
  }
}

var maxTime = 50 * 5;
var time = maxTime;

function newLevel() {

  (lang == "ko") ? clientMessage("깔때기 스크립트 - By Duduzzing / 두두찡") : clientMessage("Hopper script - By Duduzzing / 두두찡");

  new java.lang.Thread(new java.lang.Runnable({
    run: function() {
      try {

        load();
        time = maxTime;

        while (true) {

          removeItemFromArray();
          checkhopper();
          collectItems();

          java.lang.Thread.sleep(50);

        }

      } catch(e) {

        clientMessage("error: " + e + " line: " + e.lineNumber);

      }
    }
  })).start();

}

function modTick() {

  if (time > 0) time--;

  if (time == 0) {
    save();
    time = maxTime;
  }

}






















 	
