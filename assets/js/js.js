var colInDiv = $('#colInDiv');
var boardBlocksArr = [];


$(document).ready(function () {
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
    whenClickedOnABlockEl()

})
var whiteBlocks = [];
var blackBlocks = [];
var whiteScoreBoard = $('#whitesScoreBoard');
var blackScoreBoard = $('#blacksScoreBoard');
var firstDivInWhiteScoreBoard = $(whiteScoreBoard).children('div:nth-child(1)').children('.secondRow').children('div:nth-child(1)');


function createWhiteBlocks() {
    for (let i = 0; i < 12; i++) {
        let div = document.createElement('div');
        $(div).css('width', 50);
        $(div).css('height', 50);
        $(div).css('backgroundColor', "#E1DFDB");
        $(div).css('border-radius', 50);
        $(div).css('position', 'absolute');
        $(div).attr('id', i);
        whiteBlocks.push(div);
        $(whiteBlocks[i]).css('position', 'absolute');
        $(whiteBlocks[i]).css('inset', '0 0 0 0');
        $(whiteBlocks[i]).css('margin', 'auto');
    }
}

function createBlackBlocks() {
    for (let i = 0; i < 12; i++) {
        let div = document.createElement('div');
        $(div).css('width', 50);
        $(div).css('height', 50);
        $(div).css('backgroundColor', "#87847E");
        $(div).css('border-radius', 50);
        $(div).css('position', 'absolute');
        $(div).attr('id', i + 12);
        blackBlocks.push(div);
        $(blackBlocks[i]).css('position', 'absolute');
        $(blackBlocks[i]).css('inset', '0 0 0 0');
        $(blackBlocks[i]).css('margin', 'auto');
    }
}

function setWhiteBlocksToTheirOwnBlocks() {
    for (let i = 0; i < 3; i++) {
        if (i == 0) {
            let index = 0;
            for (let j = 0; j < 8; j++) {
                if (j % 2 == 1) {
                    $(boardBlocksArr[i]).children('div').eq(j).append(whiteBlocks[index]);
                    index++;
                }
            }
        } else if (i == 1) {
            let index = 4;
            for (let j = 0; j < 8; j++) {
                if (j % 2 == 0) {
                    $(boardBlocksArr[i]).children('div').eq(j).append(whiteBlocks[index]);
                    index++;
                }
            }
        } else {
            let index = 8;
            for (let j = 0; j < 8; j++) {
                if (j % 2 == 1) {
                    $(boardBlocksArr[i]).children('div').eq(j).append(whiteBlocks[index]);
                    index++;
                }
            }
        }
    }
}

function setBlackBlocksToTheirOwnBlocks() {
    for (let i = 5; i < 8; i++) {
        if (i == 5) {
            let index = 0;
            for (let j = 0; j < 8; j++) {
                if (j % 2 == 0) {
                    $(boardBlocksArr[i]).children('div').eq(j).append(blackBlocks[index]);
                    index++;
                }
            }
        } else if (i == 6) {
            let index = 4;
            for (let j = 0; j < 8; j++) {
                if (j % 2 == 1) {
                    $(boardBlocksArr[i]).children('div').eq(j).append(blackBlocks[index]);
                    index++;
                }
            }
        } else {
            let index = 8;
            for (let j = 0; j < 8; j++) {
                if (j % 2 == 0) {
                    $(boardBlocksArr[i]).children('div').eq(j).append(blackBlocks[index]);
                    index++;
                }
            }
        }
    }
}

function setDroppableFunctionToCharacterBlocks(arr, row, index, dropRow, index2, index3) {
    $(arr[row]).children('div').eq(index).children('div').css('z-index', 1);
    $(arr[row]).children('div').eq(index).children('div').off('draggable')
    $(arr[row]).children('div').eq(index).children('div').draggable();

    $(boardBlocksArr[dropRow]).children('div').eq(index2).droppable({
        drop: function (event, ui) {
            console.log("is this working")
            ui.draggable.detach().appendTo($(this));
            whenClickedOnABlockEl();
            console.log('dropped index 2')
        }
    })

    $(boardBlocksArr[dropRow]).children('div').eq(index3).droppable({
        drop: function (event, ui) {
            ui.draggable.detach().appendTo($(this));
            whenClickedOnABlockEl();
            console.log('dropped index 3')
        }
    })
}


function whenClickedOnABlockEl() {
    for (let i = 0; i < boardBlocksArr.length; i++) {
        $(boardBlocksArr[i]).children('div').children('div').off('click');
        $(boardBlocksArr[i]).children('div').children('div').click(function () {
            for (let j = 0; j < 8; j++) {
                if ($(boardBlocksArr[i]).children('div').eq(j).children('div').attr('id') == $(this).attr('id')) {
                    console.log('white boar blocks index - ' + i)
                    let arr1 = 0;
                    let arr2 = 0;
                    let bool = checkIfSelectedCharacterExistsInBlackBlockArray($(this));

                    if (bool == true) {
                        if (j == 0) {
                            arr1 = $(boardBlocksArr[i - 1]).children('div').eq(j + 1).children('div').length;
                        } else if (j == 7) {
                            arr2 = $(boardBlocksArr[i - 1]).children('div').eq(j - 1).children('div').length;
                        } else {
                            arr1 = $(boardBlocksArr[i - 1]).children('div').eq(j + 1).children('div').length;
                            arr2 = $(boardBlocksArr[i - 1]).children('div').eq(j - 1).children('div').length;
                        }

                    } else {
                        if (j == 0) {
                            arr1 = $(boardBlocksArr[i + 1]).children('div').eq(j + 1).children('div').length;
                        } else if (j == 7) {
                            arr2 = $(boardBlocksArr[i + 1]).children('div').eq(j - 1).children('div').length;
                        } else {
                            arr1 = $(boardBlocksArr[i + 1]).children('div').eq(j + 1).children('div').length;
                            arr2 = $(boardBlocksArr[i + 1]).children('div').eq(j - 1).children('div').length;
                        }
                    }


                    if ((arr1 != 0) | (arr2 != 0)) {
                        console.log(arr1.length);
                        console.log(arr2.length);
                    } else {
                        console.log('not exists')
                        console.log(j)
                        if (bool == false) {
                            setDroppableFunctionToCharacterBlocks(boardBlocksArr, i, j, i - 1, j + 1, j - 1);
                            if (j == 0) {
                                $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("opacity", 80);
                            } else if (j == 7) {
                                $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("opacity", 80);
                            } else {
                                $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("opacity", 80);
                                $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("opacity", 80);
                            }
                        } else {
                            setDroppableFunctionToCharacterBlocks(boardBlocksArr, i, j, i + 1, j + 1, j - 1);
                            if (j == 0) {
                                $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("opacity", 80);
                            } else if (j == 7) {
                                $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("opacity", 80);
                            } else {
                                $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("opacity", 80);
                                $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("opacity", 80);
                            }
                        }
                        return;
                    }
                }
            }
        })
    }
}

function checkIfSelectedCharacterExistsInBlackBlockArray(selectedBlock) {
    console.log('working')
    for (let i = 0; i < blackBlocks.length; i++) {
        if ($(blackBlocks[i]).attr('id') == $(selectedBlock).attr('id')) {
            console.log('true')
            console.log($(blackBlocks[i]).attr('id') + " - id")
            return true;
        }
    }
    return false;
}