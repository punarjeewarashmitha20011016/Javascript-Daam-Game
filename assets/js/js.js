var colInDiv = $('#colInDiv');

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
    }
})