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
                                }
                                arr1 = $(boardBlocksArr[i + 1]).children('div').eq(j + 1).children('div').length;
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
                                            $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                        } else {
                                            let checkRowBlockIndexArr = [j + 2];
                                            let arr = [[i + 2, j + 2]];

                                            $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                            return
                                        }
                                    }
                                    alert('cant drop to the block')
                                    return;
                                }
                                let checkRowBlockIndex = [j + 1];
                                $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("opacity", 80);
                                ifDblClickedOnACharacterBlock(i, j, i + 1, checkRowBlockIndex);

                            } else if (j == 7) {
                                if ((arr2 == 1) || (arr2 == undefined)) {

                                    if (((arr2 == 1) || (arr2 == undefined)) && (arr4 == 0)) {
                                        if (arr2 == undefined) {
                                            $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                        } else {
                                            let checkRowBlockIndexArr = [j - 2];
                                            let arr = [[i + 2, j - 2]];
                                            $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, j - 2);
                                            return
                                        }
                                    }

                                    alert('cant drop to the block')
                                    return;
                                } else {
                                    let checkRowBlockIndex = [j - 1];
                                    console.log('its index 7')
                                    $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                    $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("opacity", 80);
                                    ifDblClickedOnACharacterBlock(i, j, i + 1, checkRowBlockIndex);
                                }
                            } else {

                                console.log('hello there1')

                                if (((arr1 == 1) || (arr1 == undefined)) && (arr2 == 0)) {

                                    let checkRowBlockIndexArr = [j - 1];
                                    console.log('hello there')
                                    $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                    $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("opacity", 80);

                                    if ((arr3 == 0) && ((arr1 == 1) || (arr1 == undefined))) {
                                        if (arr1 == undefined) {
                                            $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                        } else {
                                            let checkRowBlockIndexArr = [j + 2];
                                            let arr = [[i + 2, j + 2]];

                                            $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                            return
                                        }
                                    }
                                    ifDblClickedOnACharacterBlock(i, j, i + 1, checkRowBlockIndexArr)

                                } else if ((arr1 == 0) && (arr2 == 0)) {
                                    let checkRowBlockIndexArr = [j + 1, j - 1];
                                    $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                    $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("opacity", 80);

                                    $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                    $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("opacity", 80);
                                    ifDblClickedOnACharacterBlock(i, j, i + 1, checkRowBlockIndexArr);

                                } else if (((arr1 == 1) || (arr1 == undefined)) && ((arr2 == 1) || (arr2 == undefined))) {
                                    console.log('arr1 arr2')
                                    // if ((arr1 == undefined) && (arr2 == undefined)) {
                                    // }
                                    //==============================
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index) {
                                        if (arr3 == 0) {
                                            if (arr1 == undefined) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i + 2, j + 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        } else {
                                            alert('cant move')
                                        }
                                    } else if ($(boardBlocksArr[i + 2]).children('div').eq(index + 2).index() < index) {
                                        if (arr2 == undefined) {
                                            $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                        } else {
                                            $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j - 2];
                                            let arr = [[i + 2, j - 2]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                            return
                                        }
                                    } else if (($(boardBlocksArr[i + 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() < index)) {
                                        console.log(arr1 + " = " + arr2)
                                        if ((arr3 == 0) && (arr4 == 0)) {
                                            if ((arr1 == undefined) && (arr2 == undefined)) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j - 2, j + 2];
                                                let arr = [[i + 2, j - 2], [i + 2, j - 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        } else if ((arr3 == 1) && (arr4 == 0)) {
                                            if (arr2 == undefined) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j - 2];
                                                let arr = [[i + 2, j - 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        } else if ((arr4 == 1) && (arr3 == 0)) {
                                            if (arr1 == undefined) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i + 2, j + 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        }
                                    }
                                } else if ((arr3 == 0) && ((arr1 == 1) || (arr1 == 0) || (arr1 == undefined)) && (arr4 == 1) && ((arr2 == 1) || (arr2 == undefined))) {
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index) {

                                        if (arr1 == 0) {
                                            let checkRowBlockIndexArr = [j + 1];
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let arr = [[i + 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, checkRowBlockIndexArr);
                                            return
                                        } else {
                                            if (arr1 == undefined) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i + 2, j + 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        }

                                    } else if (($(boardBlocksArr[i + 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index)) {
                                        if (arr1 == 0) {
                                            if (arr2 == undefined) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                            }
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let arr = [[i + 1, j + 1]];
                                            let checkRowBlockIndexArr = [j + 1]
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, checkRowBlockIndexArr);
                                            return
                                        } else {
                                            if (arr1 == undefined) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i + 2, j + 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        }

                                    } else if ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() < index) {
                                        if (arr1 == 0) {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let checkRowBlockIndexArr = [j + 1]
                                            let arr = [[i + 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, checkRowBlockIndexArr);
                                            return
                                        } else {
                                            alert('cant move')
                                        }
                                    }
                                } else if ((((arr3 == 0) || (arr3 == 1)) && (arr1 == 0) && ((arr2 == 1) || (arr2 == undefined)))) {
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index) {
                                        if (arr1 == undefined) {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'black');
                                        } else {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j + 1];
                                            let arr = [[i + 1, j + 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                            return;
                                        }
                                    } else if (($(boardBlocksArr[i + 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() < index)) {
                                        if (arr4 == 0) {
                                            if (arr2 == undefined) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                                $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            } else {
                                                $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                                $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j - 2];
                                                let arr = [[i + 1, j + 1], [i + 2, j - 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        } else {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j + 1];
                                            let arr = [[i + 1, j + 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, checkRowBlockIndexArr);
                                            return
                                        }

                                    } else if ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() < index) {
                                        if (arr4 == 0) {
                                            if (arr2 == undefined) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                                $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            } else {
                                                $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                                $(boardBlocksArr[i + 2]).children('div').eq(j - 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j - 2];
                                                let arr = [[i + 1, j + 1], [i + 2, j - 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        } else {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j + 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j - 2];
                                            let arr = [[i + 1, j + 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                            return
                                        }
                                    }
                                } else if ((((arr3 == 0) || (arr3 == 1)) && ((arr1 == 1) || (arr1 == undefined)) && (arr2 == 0))) {
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index) {

                                        $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');

                                        let checkRowBlockIndexArr = [j - 1];
                                        let arr = [[i + 1, j - 1]];

                                        whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                        whenClickedOnABlockEl();
                                        ifDblClickedOnACharacterBlock(i, j, i + 1, checkRowBlockIndexArr);
                                        return


                                    } else if (($(boardBlocksArr[i + 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index)) {
                                        if (arr3 == 0) {
                                            if (arr1 == undefined) {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i + 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i + 2, j + 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 2, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i + 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        } else {
                                            $(boardBlocksArr[i + 1]).children('div').eq(j - 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j - 1];
                                            let arr = [[i + 1, j - 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i + 1, checkRowBlockIndexArr, whiteScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i + 1, checkRowBlockIndexArr);
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
                                            $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                        } else {

                                        }
                                    }
                                    alert('cant drop to the block')
                                    return;
                                }
                                let checkRowBlockIndex = [j + 1];
                                $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("opacity", 80);
                                ifDblClickedOnACharacterBlock(i, j, i - 1, checkRowBlockIndex);

                            } else if (j == 7) {
                                console.log('bkack')
                                if (arr2 == 1) {

                                    if (((arr2 == 1) || (arr2 == undefined)) && (arr4 == 0)) {
                                        if (arr2 == undefined) {
                                            $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                        } else {
                                            let checkRowBlockIndexArr = [j - 2];
                                            let arr = [[i - 2, j - 2]];
                                            $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 2, j - 2);
                                            return
                                        }
                                    }

                                    alert('cant drop to the block')
                                    return;
                                } else {
                                    let checkRowBlockIndex = [j - 1];
                                    console.log('its index 7')
                                    $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                    $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("opacity", 80);
                                    ifDblClickedOnACharacterBlock(i, j, i - 1, checkRowBlockIndex);
                                }
                            } else {

                                console.log('hello there1')

                                if (((arr1 == 1) || (arr1 == undefined)) && (arr2 == 0)) {
                                    let checkRowBlockIndexArr = [j - 1];
                                    console.log('hello there')
                                    $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                    $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("opacity", 80);

                                    if ((arr3 == 0) && ((arr1 == 1) || (arr1 == undefined))) {
                                        if (arr1 == undefined) {
                                            $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                        } else {
                                            let checkRowBlockIndexArr = [j + 2];
                                            let arr = [[i - 2, j + 2]];

                                            $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                            return
                                        }
                                    }
                                    ifDblClickedOnACharacterBlock(i, j, i - 1, checkRowBlockIndexArr)

                                } else if ((arr1 == 0) && (arr2 == 0)) {
                                    let checkRowBlockIndexArr = [j + 1, j - 1];
                                    $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                    $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("opacity", 80);

                                    $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');
                                    $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("opacity", 80);
                                    ifDblClickedOnACharacterBlock(i, j, i - 1, checkRowBlockIndexArr);

                                } else if (((arr1 == 1) || (arr1 == undefined)) && ((arr2 == 1) || (arr2 == undefined))) {
                                    console.log('arr1 arr2')
                                    //==============================
                                    let index = $(this).parent().index();
                                    // if ((arr1 == undefined) && (arr2 == undefined)) {
                                    //
                                    // }

                                    if ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() > index) {
                                        if (arr3 == 0) {
                                            if (arr1 == undefined) {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i - 2, j + 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        } else {
                                            alert('cant move')
                                        }
                                    } else if ($(boardBlocksArr[i - 2]).children('div').eq(index + 2).index() < index) {
                                        if (arr2 == undefined) {
                                            $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                        } else {
                                            $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j - 2];
                                            let arr = [[i - 2, j - 2]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                            return
                                        }
                                    } else if (($(boardBlocksArr[i - 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() < index)) {
                                        if ((arr3 == 0) && (arr4 == 0)) {
                                            if ((arr1 == undefined) && (arr2 == undefined)) {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j - 2, j + 2];
                                                let arr = [[i - 2, j - 2], [i - 2, j - 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        } else if ((arr3 == 1) && (arr4 == 0)) {
                                            if (arr2 == undefined) {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j - 2];
                                                let arr = [[i - 2, j - 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        } else if ((arr4 == 1) && (arr3 == 0)) {
                                            if (arr1 == undefined) {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i - 2, j + 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        }
                                    }
                                } else if ((arr3 == 0) && ((arr1 == 1) || (arr1 == 0) || (arr1 == undefined)) && (arr4 == 1) && ((arr2 == 1) || arr2 == undefined)) {
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() > index) {

                                        if (arr1 == 0) {
                                            let checkRowBlockIndexArr = [j + 1];
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let arr = [[i - 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, checkRowBlockIndexArr);
                                            return
                                        } else {
                                            if (arr1 == undefined) {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i - 2, j + 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        }

                                    } else if (($(boardBlocksArr[i - 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index)) {
                                        if (arr1 == 0) {
                                            if (arr2 == undefined) {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                            }
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let arr = [[i - 1, j + 1]];
                                            let checkRowBlockIndexArr = [j + 1]
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, checkRowBlockIndexArr);
                                            return
                                        } else {
                                            if (arr1 == undefined) {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i - 2, j + 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        }

                                    } else if ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() < index) {
                                        if (arr1 == 0) {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                            let checkRowBlockIndexArr = [j + 1]
                                            let arr = [[i - 1, j + 1]];
                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, checkRowBlockIndexArr);
                                            return

                                        } else {
                                            alert('cant move')
                                        }
                                    }
                                } else if ((((arr3 == 0) || (arr3 == 1)) && (arr1 == 0) && ((arr2 == 1) || (arr2 == undefined)))) {
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() > index) {
                                        if (arr1 == undefined) {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'black');
                                        } else {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j + 1];
                                            let arr = [[i - 1, j + 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                            return
                                        }
                                    } else if (($(boardBlocksArr[i - 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index)) {
                                        if (arr4 == 0) {
                                            if (arr2 == undefined) {
                                                $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                                $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                                $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j - 2];
                                                let arr = [[i - 1, j + 1], [i - 2, j - 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        } else {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j - 2];
                                            let arr = [[i - 1, j + 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                            return
                                        }

                                    } else if ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() < index) {
                                        if (arr4 == 0) {
                                            if (arr2 == undefined) {
                                                $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                                $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');
                                                $(boardBlocksArr[i - 2]).children('div').eq(j - 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j - 2];
                                                let arr = [[i - 1, j + 1], [i - 2, j - 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        } else {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j + 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j - 2];
                                            let arr = [[i - 1, j + 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                            return
                                        }
                                    }
                                } else if ((((arr3 == 0) || (arr3 == 1)) && ((arr1 == 1) || (arr1 == undefined)) && (arr2 == 0))) {
                                    let index = $(this).parent().index();

                                    if ($(boardBlocksArr[i - 2]).children('div').eq(index - 2).index() > index) {

                                        $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');

                                        let checkRowBlockIndexArr = [j - 1];
                                        let arr = [[i - 1, j - 1]];

                                        whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr);
                                        whenClickedOnABlockEl();
                                        ifDblClickedOnACharacterBlock(i, j, i - 1, checkRowBlockIndexArr);
                                        return


                                    } else if (($(boardBlocksArr[i - 2]).children('div').eq(index + 2).index() > index) && ($(boardBlocksArr[i + 2]).children('div').eq(index - 2).index() > index)) {
                                        if (arr3 == 0) {
                                            if (arr1 == undefined) {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'black');
                                            } else {
                                                $(boardBlocksArr[i - 2]).children('div').eq(j + 2).css("backgroundColor", 'green');

                                                let checkRowBlockIndexArr = [j + 2];
                                                let arr = [[i - 2, j + 2]];

                                                whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 2, checkRowBlockIndexArr, blackScoreBoard, arr);
                                                whenClickedOnABlockEl();
                                                ifDblClickedOnACharacterBlock(i, j, i - 2, checkRowBlockIndexArr);
                                                return
                                            }
                                        } else {
                                            $(boardBlocksArr[i - 1]).children('div').eq(j - 1).css("backgroundColor", 'green');

                                            let checkRowBlockIndexArr = [j - 1];
                                            let arr = [[i - 1, j - 1]];

                                            whenAChanceToMakeABlockToCutOfAnotherBlock(i, j, i - 1, checkRowBlockIndexArr, blackScoreBoard, arr);
                                            whenClickedOnABlockEl();
                                            ifDblClickedOnACharacterBlock(i, j, i - 1, checkRowBlockIndexArr);
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

function whenAChanceToMakeABlockToCutOfAnotherBlock(crntRow, crntRowBlockIndex, checkRow, checkRowBlockIndexArr, scoreBoard, arrayForColorRemoving) {
    for (let i = 0; i < checkRowBlockIndexArr.length; i++) {
        console.log('this is row index block - ' + checkRowBlockIndexArr[i])
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
    for (let i = 0; i < arr.length; i++) {
        $(boardBlocksArr[arr[i][0]]).children('div').eq(arr[i][1]).css('backgroundColor', 'black');
    }
}

function ifDblClickedOnACharacterBlock(crntRow, crntRowBlockIndex, checkRow, arr) {
    $(boardBlocksArr[crntRow]).children('div').eq(crntRowBlockIndex).children('div').eq(0).dblclick(function () {
        for (let i = 0; i < arr.length; i++) {
            $(boardBlocksArr[checkRow]).children('div').eq(arr[i]).css('backgroundColor', 'black')
        }
    })
}


function informWhetherBlacksOrWhitesWon(scoreboard) {
    let scoreBoardBlocks = $(scoreboard).children('div:nth-child(1)').children('.secondRow');
    if ($(scoreBoardBlocks).children('div').eq(11).children('div').length == 1) {
        if ($(scoreboard).attr('id') == 'whiteScoreBoard') {
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