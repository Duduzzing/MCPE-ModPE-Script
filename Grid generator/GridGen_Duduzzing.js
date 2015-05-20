var isOn = false;

var blankIsBlank = false;

var theRow,
    theColumn,
    theSize,
    theThickness,
    theGridTileId,
    theGridTileData,
    theBlankId,
    theBlankData = 1;


function makeGrid(row, column, size, thickness) {
    var grid = [];

    for (var r = 0; r <= row; r++) {
        for (var t = 0; t < thickness; t++) {
            for (var c = 0; c <= column; c++) {
                for (var d = 0; d < thickness; d++) {
                    grid.push("-");
                }

                if (c != column) {
                    for (var a = 0; a < size; a++) {
                        grid.push("-");
                    }
                }
                java.lang.Thread.sleep(1);
            }
            grid.push("n");
        }

        java.lang.Thread.sleep(1);

        if (r == row) {
            return grid;
        }

        for (var a = 0; a < size; a++) {
            for (var c = 0; c <= column; c++) {
                for (var t = 0; t < thickness; t++) {
                    grid.push("-");
                }
                if (c < column) {
                    for (var j = 0; j < size; j++) {
                        grid.push(" ");
                    }
                }
            }
            grid.push("n");
            java.lang.Thread.sleep(1);
        }
        java.lang.Thread.sleep(1);
    }
}


function setGrid(x, y, z, gridArr) {
    var originX = x;

    for (var l = 0; l < gridArr.length - 1; l++) {
        switch (gridArr[l]) {

            case "-":
                Level.setTile(x, y, z, theGridTileId, theGridTileData);
                x += 1;
                break;

            case " ":
                if (blankIsBlank == false) {
                    Level.setTile(x, y, z, theBlankId, theBlankData);
                }
                x += 1;
                break;

            case "n":
                z += 1;
                x = originX;
                Level.setTile(x, y, z, theGridTileId, theGridTileData);
                break;
        }
        java.lang.Thread.sleep(1);
    }

    var str = "";

    (lang == "ko") ?
    str = "[그리드젠] 완료":
        str = "[GridGen] Finished";

    clientMessage(str);
}



ModPE.setItem(500, "ruby", 0, "Grid generator");

Player.addItemCreativeInv(500, 1, 0);

var lang = java.util.Locale.getDefault().getLanguage();


function make(x, y, z, I) {

    if (I == 500) {
        if (isOn == false) {
            var str = "";

            (lang == "ko") ?
            str = "[그리드젠] 먼저 격자의 속성을 정해주세요.\n예) /gridGen 열 행 크기 두께 격자의재질 데미지 빈공간의재질 데미지\n*행 뒤부터 있는 것들은 꼭 넣으실 필요가 없습니다.": str = "[GridGen] Please define the size of grid\n(e.g.) /gridGen row column size thickness gridTileId data blankId data\n*Stuffs after column can be left blank.";

            clientMessage(str);
            return;
        }

        new java.lang.Thread(new java.lang.Runnable({
            run: function() {
                try {
                    var str1 = "";

                    (lang == "ko") ?
                    str1 = "[그리드젠] 제작 시작...": str1 = "[GridGen] Start generating...";

                    clientMessage(str1);

                    setGrid(x, y, z, makeGrid(theRow, theColumn, theSize, theThickness));

                } catch (e) {
                    clientMessage(e);
                }
            }
        })).start();
    }
}

function useItem(x, y, z, I) {
    make(x, y, z, I);
}


function gen(c) {

    if (c[0].search(/gridGen/i) == -1) {
        return;
    }

    var row = parseInt(c[1]);
    var column = parseInt(c[2]);
    var size = parseInt(c[3]);
    var thickness = parseInt(c[4]);
    var gridTileId = parseInt(c[5]);
    var gridTileData = parseInt(c[6]);
    var blankId = parseInt(c[7]);
    var blankData = parseInt(c[8]);

    if (isNaN(row)) row = 1;
    if (isNaN(column)) column = 1;
    if (isNaN(size)) size = 1;
    if (isNaN(thickness)) thickness = 1;
    if (isNaN(gridTileId)) gridTileId = 1;
    if (isNaN(gridTileData)) gridTileData = 0;
    if (isNaN(blankId)) blankIsBlank = true;
    if (blankIsBlank == false) {
        if (isNaN(blankId)) blankId = 2;
        if (isNaN(blankData)) blankData = 0;
    }

    isOn = true;
    theRow = row;
    theColumn = column;
    theSize = size;
    theThickness = thickness;
    theGridTileId = gridTileId;
    theGridTileData = gridTileData;
    theBlankId = blankId;
    theBlankData = blankData;

    var str = "";

    (lang == "ko") ?
    str = "[그리드젠] 그리드가 정해졌습니다.":
        str = "[GridGen] The grid is defined.";

    clientMessage(str);
}


function procCmd(cmd) {
    var c = cmd.split(" ");
    gen(c);
}

function newLevel() {
    var str = "";

    (lang == "ko") ?
    str = "[그리드젠] 제작자 : 두두찡.":
        str = "[GridGen] Made by Duduzzing.";

    clientMessage(str);
}

function leaveGame() {
    isOn = false;
    blankIsBlank = false;
    theRow,
    theColumn,
    theSize,
    theThickness,
    theGridTileId,
    theGridTileData,
    theBlankId,
    theBlankData = 1;
}
