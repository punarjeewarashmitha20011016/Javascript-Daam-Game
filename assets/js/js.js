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
                $(div).attr('id', "F-" + i);
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
                $(div).attr('id', "S-" + i)
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

// var firstDivInWhiteScoreBoard = $(whiteScoreBoard).children('div:nth-child(1)').children('.secondRow').children('div:nth-child(1)');


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

function setDroppableFunctionToCharacterBlocks(row, index, dropRow, index2, index3) {
    $(boardBlocksArr[row]).children('div').eq(index).children('div').css('z-index', 1);
    $(boardBlocksArr[row]).children('div').eq(index).children('div').addClass('ui-widget-content')

    $(boardBlocksArr[row]).children('div').eq(index).children('div').eq(0).off('draggable');
    $(boardBlocksArr[row]).children('div').eq(index).children('div').eq(0).draggable();


    for (let i = 0; i < 2; i++) {
        if (i == 0) {
            console.log("FirstOne")
            $(boardBlocksArr[dropRow]).children('div').eq(index2).off('droppable')
            $(boardBlocksArr[dropRow]).children('div').eq(index2).droppable({

                drop: function (event, ui) {
                    ui.draggable.css('position', 'absolute');
                    ui.draggable.css('left', 0);
                    ui.draggable.css('top', 0);

                    alert("dropped");
                    ui.draggable.detach().appendTo($(this));

                    whenClickedOnABlockEl();

                    // ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});
                    // ui.draggable.draggable('option', 'revert', false);
                    $(boardBlocksArr[dropRow]).children('div').eq(index3).css('backgroundColor', 'black');
                    $(boardBlocksArr[dropRow]).children('div').eq(index2).css('backgroundColor', 'black');
                }
            })
        } else {
            console.log("SecondOne")
            $(boardBlocksArr[dropRow]).children('div').eq(index3).off('droppable')
            $(boardBlocksArr[dropRow]).children('div').eq(index3).droppable({

                drop: function (event, ui) {
                    ui.draggable.css('position', 'absolute');
                    ui.draggable.css('left', 0);
                    ui.draggable.css('top', 0);

                    alert("dropped");
                    ui.draggable.detach().appendTo($(this));

                    whenClickedOnABlockEl();
                    // ui.draggable.position({of: $(this), my: 'left top', at: 'left top'});
                    // ui.draggable.draggable('option', 'revert', false);
                    $(boardBlocksArr[dropRow]).children('div').eq(index2).css('backgroundColor', 'black');
                    $(boardBlocksArr[dropRow]).children('div').eq(index3).css('backgroundColor', 'black');
                }
            })
        }
    }
}


function whenClickedOnABlockEl() {
    for (let i = 0; i < boardBlocksArr.length; i++) {
        $(boardBlocksArr[i]).children('div').children('div').off('click');
        $(boardBlocksArr[i]).children('div').children('div').click(function () {
                for (let j = 0; j < 8; j++) {
                    if ($(boardBlocksArr[i]).children('div').eq(j).children('div').attr('id') == $(this).attr('id')) {
                        let arr1 = 0;
                        let arr2 = 0;

                        let arr3 = 0;
                        let arr4 = 0;
                        let bool = checkIfSelectedCharacterExistsInBlackBlockArray($(this));

                        if (bool == true) {
                            console.log('bool true');
                            if (j == 0) {
                                if ($(boardBlocksArr[i - 1]).children('div').eq(j + 1).children('div').eq(0).css('backgroundColor') == 'rgb(135, 132, 126)') {
                                    console.log('log 1')
                                    arr1 = undefined;
                                } else {
                                    arr1 = $(boardBlocksArr[i - 1]).children('div').eq(j + 1).children('div').length;
                                }
                            } else if (j == 7) {
                                if ($(boardBlocksArr[i - 1]).children('div').eq(j - 1).children('div').eq(0).css('backgroundColor') == 'rgb(135, 132, 126)') {
                                    arr2 = undefined;
                                } else {
                                    arr2 = $(boardBlocksArr[i - 1]).children('div').eq(j - 1).children('div').length;
                                }
                            } else {
                                if (($(boardBlocksArr[i - 1]).children('div').eq(j + 1).children('div').eq(0).css('backgroundColor') == 'rgb(135, 132, 126)') && ($(boardBlocksArr[i - 1]).children('div').eq(j - 1).children('div').eq(0).css('backgroundColor') != 'rgb(135, 132, 126)')) {
                                    arr1 = undefined;
                                    arr2 = $(boardBlocksArr[i - 1]).children('div').eq(j - 1).children('div').length;
                                } else if (($(boardBlocksArr[i - 1]).children('div').eq(j - 1).children('div').eq(0).css('backgroundColor') == 'rgb(135, 132, 126)') && ($(boardBlocksArr[i - 1]).children('div').eq(j + 1).children('div').eq(0).css('backgroundColor') != 'rgb(135, 132, 126)')) {
                                    arr2 = undefined;
                                    arr1 = $(boardBlocksArr[i - 1]).children('div').eq(j + 1).children('div').length;
                                } else if (($(boardBlocksArr[i - 1]).children('div').eq(j - 1).children('div').eq(0).css('backgroundColor') == 'rgb(135, 132, 126)') && $(boardBlocksArr[i - 1]).children('div').eq(j + 1).children('div').eq(0).css('backgroundColor') == 'rgb(135, 132, 126)') {
                                    arr1 = undefined;
                                    arr2 = undefined;
                                } else if (($(boardBlocksArr[i - 1]).children('div').eq(j - 1).children('div').eq(0).css('backgroundColor') != 'rgb(135, 132, 126)') && $(boardBlocksArr[i - 1]).children('div').eq(j + 1).children('div').eq(0).css('backgroundColor') != 'rgb(135, 132, 126)') {
                                    arr1 = $(boardBlocksArr[i - 1]).children('div').eq(j + 1).children('div').length;
                                    arr2 = $(boardBlocksArr[i - 1]).children('div').eq(j - 1).children('div').length;
                                } else if ($(boardBlocksArr[i - 1]).children('div').eq(j + 1).children('div').eq(0).css('backgroundColor') != 'rgb(135, 132, 126)') {
                                    arr1 = $(boardBlocksArr[i - 1]).children('div').eq(j + 1).children('div').length;
                                } else if ($(boardBlocksArr[i - 1]).children('div').eq(j - 1).children('div').eq(0).css('backgroundColor') != 'rgb(135, 132, 126)') {
                                    arr2 = $(boardBlocksArr[i - 1]).children('div').eq(j - 1).children('div').length;
                                }
                            }
                            arr3 = $(boardBlocksArr[i - 2]).children('div').eq(j + 2).children('div').length;
                            arr4 = $(boardBlocksArr[i - 2]).children('div').eq(j - 2).children('div').length;
                        } else {
                            console.log('bool false')
                            if (j == 0) {
                                if ($(boardBlocksArr[i + 1]).children('div').eq(j + 1).children('div').eq(0).css('backgroundColor') == 'rgb(225, 223, 219)') {
                                    arr1 = undefined;
                                    console.log('undefined 1 ')
                                } else {
                                    arr1 = $(boardBlocksArr[i + 1]).children('div').eq(j + 1).children('div').length;
                                }
                            } else if (j == 7) {
                                if ($(boardBlocksArr[i + 1]).children('div').eq(j - 1).children('div').eq(0).css('backgroundColor') == 'rgb(225, 223, 219)') {
                                    arr2 = undefined;
                                }
                                arr2 = $(boardBlocksArr[i + 1]).children('div').eq(j - 1).children('div').length;
                            } else {
                                if (($(boardBlocksArr[i + 1]).children('div').eq(j + 1).children('div').eq(0).css('backgroundColor') == 'rgb(225, 223, 219)') && ($(boardBlocksArr[i + 1]).children('div').eq(j - 1).children('div').eq(0).css('backgroundColor') != 'rgb(225, 223, 219)')) {
                                    console.log('log 1')
                                    arr1 = undefined;
                                    arr2 = $(boardBlocksArr[i + 1]).children('div').eq(j - 1).children('div').length;
                                } else if (($(boardBlocksArr[i + 1]).children('div').eq(j - 1).children('div').eq(0).css('backgroundColor') == 'rgb(225, 223, 219)') && ($(boardBlocksArr[i + 1]).children('div').eq(j + 1).children('div').eq(0).css('backgroundColor') != 'rgb(225, 223, 219)')) {
                                    console.log('2')
                                    arr2 = undefined;
                                    arr1 = $(boardBlocksArr[i + 1]).children('div').eq(j + 1).children('div').length;
                                } else if (($(boardBlocksArr[i + 1]).children('div').eq(j - 1).children('div').eq(0).css('backgroundColor') == 'rgb(225, 223, 219)') && ($(boardBlocksArr[i + 1]).children('div').eq(j + 1).children('div').eq(0).css('backgroundColor') == 'rgb(225, 223, 219)')) {
                                    console.log('3')
                                    console.log('check white')
                                    arr1 = undefined;
                                    arr2 = undefined;
                                } else if (($(boardBlocksArr[i + 1]).children('div').eq(j - 1).children('div').eq(0).css('backgroundColor') != 'rgb(225, 223, 219)') && ($(boardBlocksArr[i + 1]).children('div').eq(j + 1).children('div').eq(0).css('backgroundColor') != 'rgb(225, 223, 219)')) {
                                    console.log('4')
                                    console.log('check white 1234')
                                    arr1 = $(boardBlocksArr[i + 1]).children('div').eq(j + 1).children('div').length;
                                    arr2 = $(boardBlocksArr[i + 1]).children('div').eq(j - 1).children('div').length;
                                } else if ($(boardBlocksArr[i + 1]).children('div').eq(j + 1).children('div').eq(0).css('backgroundColor') != 'rgb(225, 223, 219)') {
                                    console.log('5')
                                    arr1 = $(boardBlocksArr[i + 1]).children('div').eq(j + 1).children('div').length;
                                } else if ($(boardBlocksArr[i + 1]).children('div').eq(j - 1).children('div').eq(0).css('backgroundColor') != 'rgb(225, 223, 219)') {
                                    console.log('6')
                                    arr2 = $(boardBlocksArr[i + 1]).children('div').eq(j - 1).children('div').length;
                                }
                            }
                            arr3 = $(boardBlocksArr[i + 2]).children('div').eq(j + 2).children('div').length;
                            arr4 = $(boardBlocksArr[i + 2]).children('div').eq(j - 2).children('div').length;
                        }


                        /*---------------------------------------------*/

                        if (bool == false) {
                            if (((arr1 == 1) && (arr2 == 1)) && ((arr3 == 1) && (arr4 == 1))) {
                                alert('cant drop to the block')
                                return;
                            }

                            setDroppableFunctionToCharacterBlocks(i, j, i + 1, j + 1, j - 1);

                            if (j == 0) {

                                if ((arr1 == 1) || (arr1 == undefined)) {
                                    if (((arr1 == 1) || (arr1 == undefined)) && (arr3 == 0)) {
                                        if (arr1 == undefined) {
                                            alert('cant move')
                                            return;
                                        } else {
                                            let checkRowBlockIndexArr = [j + 2];
                                            let arr = [[i + 2, j + 2]];
                                            let checkArr = [[i + 2, j + 2]];
                                            $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                            return
                                        }
                                    }
                                    alert('cant drop to the block')
                                    return;
                                } else if (arr1 == 0) {
                                    let checkRowBlockIndexArr = [j + 1];
                                    let arr = [[i + 1, j + 1]];
                                    let checkArr = [[i + 1, j + 1]];
                                    $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                    whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                    whenClickedOnABlockEl();
                                    ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                    return
                                }

                            } else if (j == 7) {
                                if ((arr2 == 1) || (arr2 == undefined)) {

                                    if (((arr2 == 1) || (arr2 == undefined))) {
                                        if (arr2 == undefined) {
                                            alert('cant drop')
                                            return;
                                        } else if ((arr2 == 1) && (arr4 == 0)) {
                                            let checkRowBlockIndexArr = [j - 2];
                                            let arr = [[i + 2, j - 2]];
                                            let checkArr = [[i + 2, j - 2]];
                                            $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                            return
                                        } else if ((arr2 == 1) && (arr4 == 1)) {
                                            alert('cant drop')
                                            return;
                                        }
                                    }
                                } else if ((arr2 == 0) && ((arr4 == 0) || (arr4 == 1) || (arr4 == undefined))) {
                                    console.log('hhhhhhhhhhhhhhhhhhhhhhhhb')
                                    let checkRowBlockIndex = [j - 1];
                                    console.log('its index 7')
                                    $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                    let arr = [[i + 1, j - 1]]
                                    let checkArr = [[i + 1, j - 1]]
                                    whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndex, whiteScoreBoard, arr, checkArr);
                                    whenClickedOnABlockEl();
                                    ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                }

                            } else {

                                console.log('hello there1')
                                if (((arr1 == 1) || (arr1 == undefined)) && (arr2 == 0)) {
                                    console.log('hello there')
                                    let index = $(this).parent().index();
                                    if ($(boardBlocksArr[i + 2]).children('div').eq(j + 2).index() < index) {
                                        if (((arr1 == undefined) || (arr1 == 1)) && (arr2 == 0)) {
                                            let checkRowBlockIndexArr = [j - 1];
                                            $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            let arr = [[i + 1, j - 1]]
                                            let checkArr = [[i + 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                        }
                                    } else if ($(boardBlocksArr[i + 2]).children('div').eq(j - 2).index() > index) {
                                        if ((arr1 == undefined) && (arr2 == 0)) {
                                            let checkRowBlockIndexArr = [j - 1];
                                            $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            let arr = [[i + 1, j - 1]]
                                            let checkArr = [[i + 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                        } else if ((arr1 == 1) && (arr3 == 0)) {
                                            let checkRowBlockIndexArr = [j - 1, j + 2];
                                            $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                            let arr = [[i + 1, j - 1], [i + 2, j + 2]];
                                            let checkArr = [[i + 2, j + 2], [i + 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                        } else if ((arr1 == 1) && (arr3 == 1)) {
                                            alert("cant move")
                                            return;
                                        }
                                    } else if (($(boardBlocksArr[i + 2]).children('div').eq(j - 2).index() < index) && ($(boardBlocksArr[i + 2]).children('div').eq(j + 2).index() > index)) {
                                        if ((arr1 == undefined) && (arr2 == 0)) {
                                            let checkRowBlockIndexArr = [j - 1];
                                            $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            let arr = [[i + 1, j - 1]]
                                            let checkArr = [[i + 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                        } else if ((arr1 == 1) && (arr3 == 0)) {
                                            console.log("ektm mekaaa")
                                            let checkRowBlockIndexArr = [j + 2, j - 1];
                                            $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                            let arr = [[i + 1, j - 1], [i + 2, j + 2]]
                                            let checkArr = [[i + 2, j + 2], [i + 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                        } else if (((arr1 == 1) || (arr1 == undefined)) && (arr2 == 0) && (arr3 == 1) && ((arr4 == 1) || arr4 == 0)) {
                                            let checkRowBlockIndexArr = [j - 1];
                                            $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            let arr = [[i + 1, j - 1]]
                                            let checkArr = [[i + 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                        }
                                    }

                                } else if ((arr1 == 0) && (arr2 == 0)) {
                                    let checkRowBlockIndexArr = [j + 1, j - 1];
                                    let arr = [[i + 1, j + 1], [i + 1, j - 1]];
                                    let checkArr = [[i + 1, j + 1], [i + 1, j - 1]];
                                    $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                    $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                    whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                    whenClickedOnABlockEl();
                                    ifDblClickedOnACharacterBlock(i, j, i + 1, arr);


                                } else if (((arr1 == 1) || (arr1 == undefined)) && ((arr2 == 1) || (arr2 == undefined))) {
                                    console.log('arr1 arr2')
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index) {
                                        if (arr3 == 0) {
                                            if (arr1 == undefined) {
                                                alert('cant drop')
                                                return;
                                            } else {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i + 2, j + 2]];
                                                let checkArr = [[i + 2, j + 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                                return
                                            }
                                        }
                                    } else if ($(boardBlocksArr[i + 2]).children('div').eq(index + 2).index() < index) {
                                        if (arr2 == undefined) {
                                            alert('cant drop');
                                            return;
                                        } else {
                                            $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                            let checkArr = [[i + 2, j - 2]];
                                            let checkRowBlockIndexArr = [j - 2];
                                            let arr = [[i + 2, j - 2]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                            return
                                        }
                                    } else if (($(boardBlocksArr[i + 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() < index)) {
                                        console.log(arr1 + " = " + arr2)
                                        console.log(arr3 + " (3 = 4) " + arr4)
                                        if ((arr3 == 0) && (arr4 == 0)) {
                                            console.log('siriyme sra1')
                                            if ((arr1 == undefined) && (arr2 == undefined)) {
                                                alert('cant drop')
                                                return;
                                            } else if ((arr1 == undefined) && (arr2 == 1)) {
                                                console.log('siriyme sra2')
                                                $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                                let checkArr = [[i + 2, j - 2]];
                                                let checkRowBlockIndexArr = [j - 2];
                                                let arr = [[i + 2, j - 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                                return
                                            } else if ((arr2 == undefined) && (arr1 == 1)) {
                                                console.log('yo yo yo o2')
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i + 2, j + 2]];
                                                let checkArr = [[i + 2, j + 2]];
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                                return
                                            } else if ((arr2 == 1) && (arr1 == 1)) {
                                                console.log('yo yo yo o1')
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                                $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                                let checkRowBlockIndexArr = [j + 2, j - 2];
                                                let arr = [[i + 2, j + 2], [i + 2, j - 2]];
                                                let checkArr = [[i + 2, j + 2], [i + 2, j - 2]];
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                                return
                                            }
                                        } else if ((arr3 == 1) && (arr4 == 0)) {
                                            if ((arr2 == undefined) && (arr1 == 1)) {
                                                alert('cant drop')
                                                return;
                                            } else if ((arr2 == 1) && (arr1 == undefined)) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                                let checkArr = [[i + 2, j - 2]];
                                                let checkRowBlockIndexArr = [j - 2];
                                                let arr = [[i + 2, j - 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                                return
                                            }
                                        } else if ((arr4 == 1) && (arr3 == 0)) {
                                            if ((arr2 == undefined) && (arr1 == 1)) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i + 2, j + 2]];
                                                let checkArr = [[i + 2, j + 2]];
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                                return
                                            } else if ((arr2 == 1) && (arr1 == undefined)) {
                                                alert('cant drop')
                                                return;
                                            } else if ((arr1 == 1) & ((arr2 == 1) || (arr2 == undefined)) & (arr3 == 0) & (arr4 == 1)) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i + 2, j + 2]];
                                                let checkArr = [[i + 2, j + 2]];
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                                return
                                            }
                                        }
                                    }
                                } else if ((arr3 == 0) && ((arr1 == 1) || (arr1 == 0) || (arr1 == undefined)) && (arr4 == 1) && ((arr2 == 1) || (arr2 == undefined))) {
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index) {

                                        if ((arr1 == 0) && ((arr2 == 1) || (arr2 == undefined))) {
                                            let checkRowBlockIndexArr = [j + 1];
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let arr = [[i + 1, j + 1]];
                                            let checkArr = [[i + 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                            return
                                        } else if ((arr1 == undefined) && ((arr2 == 1) || (arr2 == undefined))) {
                                            alert("cant drop");
                                            return;
                                        } else if ((arr1 == 1) && (arr3 == 0) && ((arr2 == 1) || (arr2 == undefined))) {
                                            let checkRowBlockIndexArr = [j + 2];
                                            $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                            let arr = [[i + 2, j + 2]];
                                            let checkArr = [[i + 2, j + 2]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                            return
                                        }
                                    } else if (($(boardBlocksArr[i + 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() < index)) {
                                        if ((arr1 == 0) && (arr2 == 1) && ((arr3 == 0))) {
                                            console.log("chammak challo")
                                            let checkRowBlockIndexArr = [j - 2];
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                            let arr = [[i + 1, j + 1], [i + 2, j - 2]];
                                            let checkRowArr = [[i + 2, j - 2], [i + 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkRowArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                            return
                                        } else if ((arr1 == 0) && (arr2 == undefined) && ((arr3 == 0) || (arr3 == 1) || (arr3 == undefined))) {
                                            console.log('dumdumdum')
                                            let checkRowBlockIndexArr = [j + 1];
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let arr = [[i + 1, j + 1]];
                                            let checkArr = [[i + 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                            return;
                                        } else if (((arr1 == 1) || arr1 == undefined) && ((arr2 == 1) || arr2 == undefined)) {
                                            alert("cant drop");
                                            return;
                                        }

                                    } else if ($(boardBlocksArr[i + 2]).children('div').eq(index + 2).index() < index) {

                                        if ((arr1 == 0) && ((arr2 == 1) || (arr2 == undefined))) {
                                            let checkRowBlockIndexArr = [j + 1];
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let arr = [[i + 1, j + 1]];
                                            let checkArr = [[i + 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                            return
                                        } else if (((arr1 == 1) || (arr1 == undefined)) && ((arr2 == 1) || (arr2 == undefined))) {
                                            alert('cant move')
                                            return;
                                        }
                                    }
                                } else if ((((arr3 == 0) || (arr3 == 1)) && (arr1 == 0) && ((arr2 == 1) || (arr2 == undefined)))) {
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index) {
                                        if (arr1 == undefined) {
                                            alert('cant drop')
                                            return;
                                        } else {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j + 1];
                                            let arr = [[i + 1, j + 1]];
                                            let checkArr = [[i + 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                            return;
                                        }
                                    } else if (($(boardBlocksArr[i + 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() < index)) {
                                        console.log('brocode')
                                        if (arr4 == 0) {
                                            if (arr2 == undefined) {
                                                $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                                let checkRowBlockIndexArr = [j + 1];
                                                let arr = [[i + 1, j + 1]];
                                                let checkArr = [[i + 1, j + 1]];
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                                return;
                                            } else if ((arr1 == 0) && (arr2 == 1) && ((arr3 == 0) || (arr3 == 1))) {
                                                console.log('ullai ullai uuuuuuuuuuuuuuuuuuuu')
                                                $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                                $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                                let checkRowBlockIndexArr = [j - 2, j + 1];
                                                let arr = [[i + 2, j - 2], [i + 1, j + 1]];
                                                let checkRow = [[i + 2, j - 2], [i + 1, j + 1]]
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkRow);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                                return
                                            }
                                        } else if ((arr1 == 0) & ((arr2 == undefined || (arr2 == 1))) && (arr4 == 1)) {
                                            console.log('ullai ullai uuuuuuuuuuuuuuuuuuuuq1')
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let checkRowBlockIndexArr = [j + 1];
                                            let arr = [[i + 1, j + 1]];
                                            let checkRow = [[i + 1, j + 1]]
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkRow);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                            return
                                        }

                                    } else if ($(boardBlocksArr[i + 2]).children('div').eq(index + 2).index() < index) {
                                        if ((arr1 == 0) && (arr2 == undefined) && ((arr4 == 1) || (arr4 == 0) || (arr4 == undefined))) {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j + 1];
                                            let arr = [[i + 1, j + 1]];
                                            let checkArr = [[i + 1, j + 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                            return
                                        } else if ((arr1 == 0) && (arr2 == 1) && (arr4 == 0)) {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                            let checkRowBlockIndexArr = [j + 1, j - 2];
                                            let arr = [[i + 2, j - 2], [i + 1, j + 1]];
                                            let checkArr = [[i + 2, j - 2], [i + 1, j + 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                            return
                                        } else if ((arr1 == 0) && (arr2 == 1) && (arr4 == 1)) {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j + 1];
                                            let arr = [[i + 1, j + 1]];
                                            let checkArr = [[i + 1, j + 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                            return
                                        }
                                    }
                                } else if ((((arr3 == 0) || (arr3 == 1)) && ((arr1 == 1) || (arr1 == undefined)) && (arr2 == 0))) {
                                    console.log("kkkkkkkkkkkkkkkkkk")
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index) {
                                        if ((arr2 == 0) && (arr1 == 1) && (arr3 == 0)) {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                            let checkRowBlockIndexArr = [j + 1, j + 2];
                                            let arr = [[i + 2, j + 2], [i + 1, j - 1]];
                                            let checkArr = [[i + 2, j + 2], [i + 1, j - 1]]
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                            return
                                        } else if ((arr2 == 0) && ((arr1 == 1) || (arr1 == undefined)) && (arr3 == 1)) {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            let checkRowBlockIndexArr = [j - 1];
                                            let arr = [[i + 1, j - 1]];
                                            let checkArr = [[i + 1, j - 1]]
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                            return
                                        }
                                    } else if (($(boardBlocksArr[i + 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index)) {
                                        console.log("ko oyaa")
                                        if (arr3 == 0) {
                                            if (arr1 == undefined) {
                                                alert('cant drop')
                                                return;
                                            } else if (arr1 == 1) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                                (boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                                let checkRowBlockIndexArr = [j + 2, j - 1];
                                                let arr = [[i + 2, j + 2], [i + 1, j - 1]];
                                                let checkArr = [[i + 2, j + 2], [i + 1, j - 1]];
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, arr);
                                                return
                                            }
                                        } else {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            console.log('nannaane nannanee nannanne')
                                            let checkRowBlockIndexArr = [j - 1];
                                            let arr = [[i + 1, j - 1]];
                                            let checkArr = [[i + 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                            return
                                        }

                                    } else if ($(boardBlocksArr[i + 2]).children('div').eq(index + 2).index() < index) {
                                        if ((arr2 == 0) && ((arr1 == 1) || (arr1 == undefined)) && ((arr3 == 0) || (arr3 == 1))) {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            let checkRowBlockIndexArr = [j - 1];
                                            let arr = [[i + 1, j - 1]];
                                            let checkArr = [[i + 1, j - 1]]
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, arr);
                                            return
                                        }
                                    }
                                }
                            }
                        } else {
                            /*====================================================================================*/
                            /*=======================================================================================*/
                            if (((arr1 == 1) && (arr2 == 1)) && ((arr3 == 1) && (arr4 == 1))) {
                                alert('cant drop to the block')
                                return;
                            }

                            setDroppableFunctionToCharacterBlocks(i, j, i - 1, j + 1, j - 1);

                            if (j == 0) {

                                if ((arr1 == 1) || (arr1 == undefined)) {

                                    if (((arr1 == 1) || (arr1 == undefined)) && (arr3 == 0)) {
                                        if (arr1 == undefined) {
                                            alert('cant drop to the block')
                                            return;
                                        } else {
                                            if (arr3 == 0) {
                                                console.log('ko oya khhed dn')
                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i - 2, j + 2]];
                                                let checkArr = [[i - 2, j + 2]]
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                            }
                                        }
                                    } else if ((arr1 == 1) && (arr3 == 1)) {
                                        alert('cant drop');
                                        return;
                                    }
                                } else if (arr1 == 0) {
                                    let checkRowBlockIndexArr = [j + 1];
                                    let arr = [[i - 1, j + 1]];
                                    let checkArr = [[i - 1, j + 1]];
                                    $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                    whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                    whenClickedOnABlockEl();
                                    ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                }

                            } else if (j == 7) {
                                console.log('bkack')
                                if ((arr2 == undefined)) {
                                    alert('cant move')
                                    return;
                                } else if (arr2 == 0) {
                                    let checkRowBlockIndexArr = [j - 1];
                                    let arr = [[i - 1, j - 1]];
                                    let checkArr = [[i - 1, j - 1]];
                                    console.log('its index 7')
                                    $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                    whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                    whenClickedOnABlockEl();
                                    ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                } else if ((arr2 == 1) && (arr4 == 0)) {
                                    let checkRowBlockIndexArr = [j - 2];
                                    let arr = [[i - 2, j - 2]];
                                    let checkArr = [[i - 2, j - 2]];
                                    console.log('its index 7')
                                    $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                    whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                    whenClickedOnABlockEl();
                                    ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                }
                            } else {
                                console.log('hello blacks')

                                if (((arr1 == 1) || (arr1 == undefined)) && (arr2 == 0)) {
                                    console.log('hello there')
                                    let index = $(this).parent().index();
                                    if ($(boardBlocksArr[i - 2]).children('div').eq(j + 2).index() < index) {
                                        if (((arr1 == undefined) || (arr1 == 1)) && (arr2 == 0)) {
                                            let checkRowBlockIndexArr = [j - 1];
                                            $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            let arr = [[i - 1, j - 1]]
                                            let checkArr = [[i - 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                        }
                                    } else if ($(boardBlocksArr[i - 2]).children('div').eq(j - 2).index() > index) {
                                        if ((arr1 == undefined) && (arr2 == 0)) {
                                            let checkRowBlockIndexArr = [j - 1];
                                            $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            let arr = [[i - 1, j - 1]]
                                            let checkArr = [[i - 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                        } else if ((arr1 == 1) && (arr3 == 0)) {
                                            let checkRowBlockIndexArr = [j - 1, j + 2];
                                            $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                            let arr = [[i - 1, j - 1], [i - 2, j + 2]];
                                            let checkArr = [[i - 2, j + 2], [i - 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                        } else if ((arr1 == 1) && (arr3 == 1)) {
                                            alert("cant move")
                                            return;
                                        }
                                    } else if (($(boardBlocksArr[i - 2]).children('div').eq(j - 2).index() < index) && ($(boardBlocksArr[i - 2]).children('div').eq(j + 2).index() > index)) {
                                        if ((arr1 == undefined) && (arr2 == 0)) {
                                            let checkRowBlockIndexArr = [j - 1];
                                            $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            let arr = [[i - 1, j - 1]]
                                            let checkArr = [[i - 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                        } else if ((arr1 == 1) && (arr3 == 0)) {
                                            console.log("ektm mekaaa")
                                            let checkRowBlockIndexArr = [j + 2, j - 1];
                                            $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                            let arr = [[i - 1, j - 1], [i - 2, j + 2]]
                                            let checkArr = [[i - 2, j + 2], [i - 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                        } else if (((arr1 == 1) || (arr1 == undefined)) && (arr2 == 0) && (arr3 == 1) && ((arr4 == 1) || arr4 == 0)) {
                                            let checkRowBlockIndexArr = [j - 1];
                                            $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            let arr = [[i - 1, j - 1]]
                                            let checkArr = [[i - 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                        }
                                    }

                                } else if ((arr1 == 0) && (arr2 == 0)) {
                                    let checkRowBlockIndexArr = [j + 1, j - 1];
                                    let arr = [[i - 1, j + 1], [i - 1, j - 1]];
                                    let checkArr = [[i - 1, j + 1], [i - 1, j - 1]];
                                    $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                    $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                    whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                    whenClickedOnABlockEl();
                                    ifDblClickedOnACharacterBlock(i, j, i - 1, arr);


                                } else if (((arr1 == 1) || (arr1 == undefined)) && ((arr2 == 1) || (arr2 == undefined))) {
                                    console.log('arr1 arr2')
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() > index) {
                                        if (arr3 == 0) {
                                            if (arr1 == undefined) {
                                                alert('cant drop')
                                                return;
                                            } else {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i - 2, j + 2]];
                                                let checkArr = [[i - 2, j + 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                                return
                                            }
                                        }
                                    } else if ($(boardBlocksArr[i - 2]).children('div').eq(index + 2).index() < index) {
                                        if (arr2 == undefined) {
                                            alert('cant drop');
                                            return;
                                        } else {
                                            $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                            let checkArr = [[i - 2, j - 2]];
                                            let checkRowBlockIndexArr = [j - 2];
                                            let arr = [[i - 2, j - 2]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                            return
                                        }
                                    } else if (($(boardBlocksArr[i - 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() < index)) {
                                        console.log(arr1 + " = " + arr2)
                                        console.log(arr3 + " (3 = 4) " + arr4)
                                        if ((arr3 == 0) && (arr4 == 0)) {
                                            console.log('siriyme sra1')
                                            if ((arr1 == undefined) && (arr2 == undefined)) {
                                                alert('cant drop')
                                                return;
                                            } else if ((arr1 == undefined) && (arr2 == 1)) {
                                                console.log('siriyme sra2')
                                                $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                                let checkArr = [[i - 2, j - 2]];
                                                let checkRowBlockIndexArr = [j - 2];
                                                let arr = [[i - 2, j - 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                                return
                                            } else if ((arr2 == undefined) && (arr1 == 1)) {
                                                console.log('yo yo yo o')
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i - 2, j + 2]];
                                                let checkArr = [[i - 2, j + 2]];
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                                return
                                            } else if ((arr2 == 1) && (arr1 == 1)) {
                                                console.log('yo yo yo o1')
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                                $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                                let checkRowBlockIndexArr = [j + 2, j - 2];
                                                let arr = [[i - 2, j + 2], [i - 2, j - 2]];
                                                let checkArr = [[i - 2, j + 2], [i - 2, j - 2]];
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                                return
                                            }
                                        } else if ((arr3 == 1) && (arr4 == 0)) {
                                            if ((arr2 == undefined) && (arr1 == 1)) {
                                                alert('cant drop')
                                                return;
                                            } else if ((arr2 == 1) && (arr1 == undefined)) {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                                let checkArr = [[i - 2, j - 2]];
                                                let checkRowBlockIndexArr = [j - 2];
                                                let arr = [[i - 2, j - 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                                return
                                            }
                                        } else if ((arr4 == 1) && (arr3 == 0)) {
                                            if ((arr2 == undefined) && (arr1 == 1)) {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i - 2, j + 2]];
                                                let checkArr = [[i - 2, j + 2]];
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                                return
                                            } else if ((arr2 == 1) && (arr1 == undefined)) {
                                                alert('cant drop')
                                                return;
                                            } else if ((arr1 == 1) & ((arr2 == 1) || (arr2 == undefined)) & (arr3 == 0) & (arr4 == 1)) {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i - 2, j + 2]];
                                                let checkArr = [[i - 2, j + 2]];
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, whiteScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                                return
                                            }
                                        }
                                    }
                                } else if ((arr3 == 0) && ((arr1 == 1) || (arr1 == 0) || (arr1 == undefined)) && (arr4 == 1) && ((arr2 == 1) || (arr2 == undefined))) {
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() > index) {

                                        if ((arr1 == 0) && ((arr2 == 1) || (arr2 == undefined))) {
                                            let checkRowBlockIndexArr = [j + 1];
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let arr = [[i - 1, j + 1]];
                                            let checkArr = [[i - 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                            return
                                        } else if ((arr1 == undefined) && ((arr2 == 1) || (arr2 == undefined))) {
                                            alert("cant drop");
                                            return;
                                        } else if ((arr1 == 1) && (arr3 == 0) && ((arr2 == 1) || (arr2 == undefined))) {
                                            let checkRowBlockIndexArr = [j + 2];
                                            $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                            let arr = [[i - 2, j + 2]];
                                            let checkArr = [[i - 2, j + 2]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                            return
                                        }
                                    } else if (($(boardBlocksArr[i - 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() < index)) {
                                        if ((arr1 == 0) && (arr2 == 1)) {
                                            console.log("chammak challo")
                                            let checkRowBlockIndexArr = [j - 2];
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                            let arr = [[i - 1, j + 1], [i - 2, j - 2]];
                                            let checkRowArr = [[i - 2, j - 2], [i - 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkRowArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                            return
                                        } else if ((arr1 == 0) && (arr2 == undefined) && ((arr3 == 0) || (arr3 == 1) || (arr3 == undefined))) {
                                            let checkRowBlockIndexArr = [j - 2];
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let arr = [[i - 1, j + 1]];
                                            let checkArr = [[i - 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                            return;
                                        } else if (((arr1 == 1) || arr1 == undefined) && ((arr2 == 1) || arr2 == undefined)) {
                                            alert("cant drop");
                                            return;
                                        }

                                    } else if ($(boardBlocksArr[i - 2]).children('div').eq(index + 2).index() < index) {

                                        if ((arr1 == 0) && ((arr2 == 1) || (arr2 == undefined))) {
                                            let checkRowBlockIndexArr = [j + 1];
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let arr = [[i - 1, j + 1]];
                                            let checkArr = [[i - 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                            return
                                        } else if (((arr1 == 1) || (arr1 == undefined)) && ((arr2 == 1) || (arr2 == undefined))) {
                                            alert('cant move')
                                            return;
                                        }
                                    }
                                } else if ((((arr3 == 0) || (arr3 == 1)) && (arr1 == 0) && ((arr2 == 1) || (arr2 == undefined)))) {
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() > index) {
                                        if (arr1 == undefined) {
                                            alert('cant drop')
                                            return;
                                        } else {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j + 1];
                                            let arr = [[i - 1, j + 1]];
                                            let checkArr = [[i - 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                            return;
                                        }
                                    } else if (($(boardBlocksArr[i - 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() < index)) {
                                        if (arr4 == 0) {
                                            if (arr2 == undefined) {
                                                $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                                let checkRowBlockIndexArr = [j + 1];
                                                let arr = [[i - 1, j + 1]];
                                                let checkArr = [[i - 1, j + 1]];
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                                return;
                                            } else if ((arr1 == 0) && (arr2 == 1) && ((arr3 == 0) || (arr3 == 1))) {
                                                console.log('ullai ullai uuuuuuuuuuuuuuuuuuuu')
                                                $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                                $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                                let checkRowBlockIndexArr = [j - 2, j + 1];
                                                let arr = [[i - 2, j - 2], [i - 1, j + 1]];
                                                let checkRow = [[i - 2, j - 2], [i - 1, j + 1]]
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkRow);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                                return
                                            }
                                        } else if ((arr1 == 0) & ((arr2 == undefined || (arr2 == 1))) && (arr4 == 1)) {
                                            console.log('ullai ullai uuuuuuuuuuuuuuuuuuuuq1')
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let checkRowBlockIndexArr = [j + 1];
                                            let arr = [[i - 1, j + 1]];
                                            let checkRow = [[i - 1, j + 1]]
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkRow);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                            return
                                        }

                                    } else if ($(boardBlocksArr[i - 2]).children('div').eq(index + 2).index() < index) {
                                        if ((arr1 == 0) && (arr2 == undefined) && ((arr4 == 1) || (arr4 == 0) || (arr4 == undefined))) {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j + 1];
                                            let arr = [[i - 1, j + 1]];
                                            let checkArr = [[i - 1, j + 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                            return
                                        } else if ((arr1 == 0) && (arr2 == 1) && (arr4 == 0)) {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                            let checkRowBlockIndexArr = [j + 1, j - 2];
                                            let arr = [[i - 2, j - 2], [i - 1, j + 1]];
                                            let checkArr = [[i - 2, j - 2], [i - 1, j + 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                            return
                                        } else if ((arr1 == 0) && (arr2 == 1) && (arr4 == 1)) {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j + 1];
                                            let arr = [[i - 1, j + 1]];
                                            let checkArr = [[i - 1, j + 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                            return
                                        }
                                    }
                                } else if ((((arr3 == 0) || (arr3 == 1)) && ((arr1 == 1) || (arr1 == undefined)) && (arr2 == 0))) {
                                    console.log("kkkkkkkkkkkkkkkkkk")
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() > index) {
                                        if ((arr2 == 0) && (arr1 == 1) && (arr3 == 0)) {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                            let checkRowBlockIndexArr = [j - 1, j + 2];
                                            let arr = [[i - 2, j + 2], [i - 1, j - 1]];
                                            let checkArr = [[i - 2, j + 2], [i - 1, j - 1]]
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                            return
                                        } else if ((arr2 == 0) && ((arr1 == 1) || (arr1 == undefined)) && (arr3 == 1)) {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            let checkRowBlockIndexArr = [j - 1];
                                            let arr = [[i - 1, j - 1]];
                                            let checkArr = [[i - 1, j - 1]]
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                            return
                                        }
                                    } else if (($(boardBlocksArr[i - 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() > index)) {
                                        console.log("ko oyaa")
                                        if (arr3 == 0) {
                                            if (arr1 == undefined) {
                                                alert('cant drop')
                                                return;
                                            } else if (arr1 == 1) {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                                (boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                                let checkRowBlockIndexArr = [j + 2, j - 1];
                                                let arr = [[i - 2, j + 2], [i - 1, j - 1]];
                                                let checkArr = [[i - 2, j + 2], [i - 1, j - 1]];
                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, arr);
                                                return
                                            }
                                        } else {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j - 1];
                                            let arr = [[i - 1, j - 1]];
                                            let checkArr = [[i - 1, j - 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                            return
                                        }

                                    } else if ($(boardBlocksArr[i - 2]).children('div').eq(index + 2).index() < index) {
                                        if ((arr2 == 0) && ((arr1 == 1) || (arr1 == undefined)) && ((arr3 == 0) || (arr3 == 1))) {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                            let checkRowBlockIndexArr = [j - 1];
                                            let arr = [[i - 1, j - 1]];
                                            let checkArr = [[i - 1, j - 1]]
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr, checkArr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, arr);
                                            return
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        )
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

function whenAChanceToMakeABlockToCutOfAnotherBlock(crntRow, crntRowBlockIndex, checkRow, checkRowBlockIndexArr, scoreBoard, arrayForColorRemoving, checkArr) {

    console.log('mek wdad')
    $(boardBlocksArr[crntRow]).children('div').eq(crntRowBlockIndex).children('div').css('z-index', 1);
    $(boardBlocksArr[crntRow]).children('div').eq(crntRowBlockIndex).children('div').eq(0).draggable();
    var arr = checkArr;
    for (let k = 0; k < 8; k++) {
        console.log(arrayForColorRemoving.length + "arrrararrararar lenenenewghth")
        /*console.log('this is row index block - ' + checkRowBlockIndexArr[i])*/
        for (let j = 0; j < 8; j++) {
            $(boardBlocksArr[j]).children('div').eq(k).droppable({
                    drop: function (event, ui) {
                        console.log("jjjjjjjjjjjjjjjj - " + j)
                        console.log("kkkkkkkkkkkkkkkk - " + k)
                        console.log(arr.length + " - arr.length")
                        let lengthOfArr = arr[0].length;
                        if (arr.length == 1) {
                            callMeToMakeACharacterCusOff(crntRow, crntRowBlockIndex, checkRow, checkRowBlockIndexArr, scoreBoard, arrayForColorRemoving);
                        } else {
                            if (lengthOfArr > 1) {
                                if (arr[0][0] == arr[1][0]) {
                                    callMeToMakeACharacterCusOff(crntRow, crntRowBlockIndex, checkRow, checkRowBlockIndexArr, scoreBoard, arrayForColorRemoving);
                                } else {
                                    if ($(boardBlocksArr[j]).children('div').eq(k).attr('id') == $(boardBlocksArr[arr[0][0]]).children('div').eq(arr[0][1]).attr('id')) {
                                        console.log('check done id same = ======================================================')
                                        callMeToMakeACharacterCusOff(crntRow, crntRowBlockIndex, checkRow, checkRowBlockIndexArr, scoreBoard, arrayForColorRemoving);
                                    } else {
                                        console.log('its me[[[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]]]]]')
                                        $(boardBlocksArr[arr[1][0]]).children('div').eq(arr[1][1]).droppable({
                                            drop: function (event, ui) {
                                                alert("Do you want to move");
                                                console.log("shiihihhihi1")
                                                ui.draggable.css('position', 'absolute');
                                                ui.draggable.css('left', 0);
                                                ui.draggable.css('top', 0);
                                                $(this).append($(boardBlocksArr[crntRow]).children('div').eq(crntRowBlockIndex).children('div'));
                                                clearAllSuggestedBlocks(arrayForColorRemoving)
                                            }
                                        })
                                    }
                                }
                            } else {
                                callMeToMakeACharacterCusOff(crntRow, crntRowBlockIndex, checkRow, checkRowBlockIndexArr, scoreBoard, arrayForColorRemoving);
                            }
                        }
                    }
                }
            )
        }
    }
}

function callMeToMakeACharacterCusOff(crntRow, crntRowBlockIndex, checkRow, checkRowBlockIndexArr, scoreBoard, arrayForColorRemoving) {
    console.log('run unaaaaa')
    for (let i = 0; i < checkRowBlockIndexArr.length; i++) {
        $(boardBlocksArr[crntRow]).children('div').eq(crntRowBlockIndex).children('div').css('z-index', 1);
        $(boardBlocksArr[crntRow]).children('div').eq(crntRowBlockIndex).children('div').eq(0).draggable();
        $(boardBlocksArr[checkRow]).children('div').eq(checkRowBlockIndexArr[i]).droppable({
            drop: function (event, ui) {
                alert('do you want to perform this action')
                ui.draggable.css('position', 'absolute');
                ui.draggable.css('left', 0);
                ui.draggable.css('top', 0);

                $(this).append($(boardBlocksArr[crntRow]).children('div').eq(crntRowBlockIndex).children('div'));
                let scoreBoardBlocks = $(scoreBoard).children('div:nth-child(1)').children('.secondRow');
                for (let j = 0; j < 12; j++) {
                    if (scoreBoardBlocks.children('div').eq(j).children('div').length == 0) {
                        console.log('inside score board checking length')
                        let index = 0;
                        for (let l = 0; l < boardBlocksArr.length; l++) {
                            for (let m = 0; m < 8; m++) {
                                if ($(boardBlocksArr[l]).children("div").eq(m).children('div').attr('id') == $(this).children('div').attr('id')) {
                                    index = m;
                                }
                            }
                        }
                        console.log(crntRowBlockIndex + ' --- crnt row block index')
                        console.log(index + ' --- index')
                        if (crntRowBlockIndex < index) {
                            if ($(scoreBoard).attr('id') == 'whitesScoreBoard') {
                                scoreBoardBlocks.children('div').eq(j).append($(boardBlocksArr[crntRow + 1]).children('div').eq(index - 1).children('div'));
                                informWhetherBlacksOrWhitesWon(scoreBoardBlocks)
                            } else {
                                scoreBoardBlocks.children('div').eq(j).append($(boardBlocksArr[crntRow - 1]).children('div').eq(index - 1).children('div'));
                                informWhetherBlacksOrWhitesWon(scoreBoardBlocks)
                            }
                            scoreBoardBlocks.children('div').eq(j).children('div').width(40);
                            scoreBoardBlocks.children('div').eq(j).children('div').height(40);
                            scoreBoardBlocks.children('div').eq(j).children('div').css('position', "absolute")
                            scoreBoardBlocks.children('div').eq(j).children('div').css('inset', "0 0 0 0")
                            scoreBoardBlocks.children('div').eq(j).children('div').css('margin', "auto")
                            clearAllSuggestedBlocks(arrayForColorRemoving);
                        } else {
                            if ($(scoreBoard).attr('id') == 'whitesScoreBoard') {
                                scoreBoardBlocks.children('div').eq(j).append($(boardBlocksArr[crntRow + 1]).children('div').eq(index + 1).children('div'));
                                informWhetherBlacksOrWhitesWon(scoreBoardBlocks)
                            } else {
                                scoreBoardBlocks.children('div').eq(j).append($(boardBlocksArr[crntRow - 1]).children('div').eq(index + 1).children('div'));
                                informWhetherBlacksOrWhitesWon(scoreBoardBlocks)
                            }
                            scoreBoardBlocks.children('div').eq(j).children('div').width(40);
                            scoreBoardBlocks.children('div').eq(j).children('div').height(40);
                            scoreBoardBlocks.children('div').eq(j).children('div').css('position', "absolute")
                            scoreBoardBlocks.children('div').eq(j).children('div').css('inset', "0 0 0 0")
                            scoreBoardBlocks.children('div').eq(j).children('div').css('margin', "auto")
                            clearAllSuggestedBlocks(arrayForColorRemoving);
                        }
                    }

                }
                $(this).css('backgroundColor', 'black')
                whenClickedOnABlockEl();
            }
        })
    }
}

function clearAllSuggestedBlocks(arr) {
    console.log(arr.length + " = color array ek length ek")
    for (let i = 0; i < arr.length; i++) {
        $(boardBlocksArr[arr[i][0]]).children('div').eq(arr[i][1]).css('backgroundColor', 'black');
    }
}

function ifDblClickedOnACharacterBlock(crntRow, crntRowBlockIndex, checkRow, arr) {
    $(boardBlocksArr[crntRow]).children('div').eq(crntRowBlockIndex).children('div').eq(0).off('dblclick');
    $(boardBlocksArr[crntRow]).children('div').eq(crntRowBlockIndex).children('div').eq(0).dblclick(function () {
        console.log(arr.length + " = = == ")
        for (let i = 0; i < arr.length; i++) {
            $(boardBlocksArr[arr[i][0]]).children('div').eq(arr[i][1]).css('backgroundColor', 'black')
        }
    })
}


function informWhetherBlacksOrWhitesWon(scoreboard) {
    let scoreBoardBlocks = scoreboard
    if ($(scoreBoardBlocks).children('div').eq(11).children('div').length == 1) {
        if ($(scoreboard).attr('id') == 'whitesScoreBoard') {
            if (confirm('Game is Over..White Team Wins') == true) {
                $(document).reload();
            }
        } else {
            if (confirm('Game is Over..Black Team Wins') == true) {
                $(document).reload();
            }
        }
    }
}
