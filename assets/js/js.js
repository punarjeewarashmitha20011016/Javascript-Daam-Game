var colInDiv = $('#colInDiv');
var boardBlocksArr = [];
$(document).ready(function() {
    let widthParentDiv = colInDiv.width();
    let heightParentDiv = colInDiv.height();
    let widthOfOneDiv = widthParentDiv / 8;
    let heightOfOneDiv = heightParentDiv / 8;
    for (let i = 2; i < 10; i++) {
        let row = document.createElement('div');
        $(row).css('display', 'flex');
        $(row).css('position', 'relative');
        $(row).css('width', widthParentDiv);
        let rowHeight = heightParentDiv / 8;
        $(row).css('height', rowHeight);
        $(row).css('flex-direction', 'row');
        if (i % 2 == 0) {
            $(row).css('border', '1px solid black');
            for (let j = 2; j < 10; j++) {
                let div = document.createElement('div');
                $(div).css('width', widthOfOneDiv);
                $(div).css('height', heightOfOneDiv);
                $(div).css('position', 'relative');
                if (j % 2 == 0) {
                    $(div).css('backgroundColor', 'white');
                    $(row).append(div);
                } else {
                    $(div).css('backgroundColor', 'black');
                    $(row).append(div);
                }
            }

        } else {
            $(row).css('border', '1px solid black');
            for (let j = 2; j < 10; j++) {
                let div = document.createElement('div');
                $(div).css('width', widthOfOneDiv);
                $(div).css('height', heightOfOneDiv);
                $(div).css('position', 'relative');
                if (j % 2 == 0) {
                    $(div).css('backgroundColor', 'black');
                    $(row).append(div);
                } else {
                    $(div).css('backgroundColor', 'white');
                    $(row).append(div);
                }
            }
        }
        colInDiv.append(row);
        boardBlocksArr.push(row);
    }
    createWhiteBlocks();
    createBlackBlocks();
    setWhiteBlocksToTheirOwnBlocks();
    setBlackBlocksToTheirOwnBlocks();
    setDroppableFunctionToCharacterBlocks();
})
var whiteBlocks = [];
var blackBlocks = [];
var whiteScoreBoard = $('#whitesScoreBoard');
var blackScoreBoard = $('#blacksScoreBoard');
var firstDivInWhiteScoreBoard = $(whiteScoreBoard).children('div:nth-child(1)').children('.secondRow').children('div:nth-child(1)');

function createWhiteBlocks() {
    for (let i = 0; i < 16; i++) {
        let div = document.createElement('div');
        $(div).css('width', 50);
        $(div).css('height', 50);
        $(div).css('backgroundColor', "#E1DFDB");
        $(div).css('border-radius', 50);
        $(div).css('position', 'absolute');
        whiteBlocks.push(div);
        $(whiteBlocks[i]).css('position', 'absolute');
        $(whiteBlocks[i]).css('inset', '0 0 0 0');
        $(whiteBlocks[i]).css('margin', 'auto');
    }
}

function createBlackBlocks() {
    for (let i = 0; i < 16; i++) {
        let div = document.createElement('div');
        $(div).css('width', 50);
        $(div).css('height', 50);
        $(div).css('backgroundColor', "#87847E");
        $(div).css('border-radius', 50);
        $(div).css('position', 'absolute');
        blackBlocks.push(div);
        $(blackBlocks[i]).css('position', 'absolute');
        $(blackBlocks[i]).css('inset', '0 0 0 0');
        $(blackBlocks[i]).css('margin', 'auto');
    }
}

function setWhiteBlocksToTheirOwnBlocks() {
    for (let i = 0; i < 2; i++) {
        if (i == 0) {
            for (let j = 0; j < 8; j++) {
                $(boardBlocksArr[i]).children('div').eq(j).append(whiteBlocks[j]);
            }
        } else {
            let index = 0;
            for (let j = 8; j < 16; j++) {
                $(boardBlocksArr[i]).children('div').eq(index).append(whiteBlocks[j]);
                index++;
            }
        }
    }
}

function setBlackBlocksToTheirOwnBlocks() {
    for (let i = 6; i < 8; i++) {
        if (i == 6) {
            for (let j = 0; j < 8; j++) {
                $(boardBlocksArr[i]).children('div').eq(j).append(blackBlocks[j]);
            }
        } else {
            let index = 0;
            for (let j = 8; j < 16; j++) {
                $(boardBlocksArr[i]).children('div').eq(index).append(blackBlocks[j]);
                index++;
            }
        }
    }
}

function setDroppableFunctionToCharacterBlocks() {
    for (let i = 0; i < whiteBlocks.length; i++) {
        $(whiteBlocks[i]).css('z-index', 1);
        $(blackBlocks[i]).css('z-index', 1);
        $(whiteBlocks[i]).draggable();
        $(blackBlocks[i]).draggable();
    }

    for (let j = 0; j < boardBlocksArr.length; j++) {
        $(boardBlocksArr[j]).droppable({
            drop: function(event, ui) {
                console.log('dropped')
            }
        })
    }
}