var curtScroll = false;

$(document).ready(function() {

    $("#imgfilter").on('click', function(event) {

        //image filter event listener. 
        var filter = $(this).find('span.imgfilter-text')[0]
        var curtText = $(filter).html();
        switch (curtText) {
            case "图片筛选":
                $(filter).html(" 取消筛选");
                $("#filter-holder").css("display", "block");
                break;
            case " 取消筛选":
                $(filter).html("图片筛选");
                $("#filter-holder").css("display", "none");
                break;
        }

    });


    $("#filter-container div.filter-menu-item").hover(function() {
        $(this).css("background-color", "#e4e4e4");
        $(this).siblings('ul.filter-item-con').css("display", "block");
         $(this).siblings('div.filter-item-con').css("display", "block");
        $(this).find('ul.sub-item-container').css("display", "none");
    }, function() {
        $(this).css("background-color", "#fff");
        // $(this).siblings('ul.filter-item-con').hide(400);
    });


    $("#filter-container .filter-item-con").hover(function() {
        $(this).css("display", "block");

    }, function() {
        $(this).css("display", "none");

    });

    // $("#filter-container ul.filter-item-con").hover(function() {
    //     $(this).css("display", "block");

    // }, function() {
    //     $(this).css("display", "none");

    // });


    $(window).on("load", function() {

        imgLocation(curtScroll);

        var dataImg = {
            "data": [{
                "src": "1.jpg"
            }, {
                "src": "2.jpg"
            }, {
                "src": "3.jpg"
            }, {
                "src": "4.jpg"
            }, {
                "src": "5.jpg"
            }, {
                "src": "6.jpg"
            }, {
                "src": "7.jpg"
            }, {
                "src": "8.jpg"
            }, {
                "src": "9.jpg"
            }]
        }


        // window.onscroll = function(){
        $(window).on("scroll", function() {

            if ($(document).scrollTop() == 0) {

                $("#search div.s_tab").show();
                $("#imgfilter").show();

                $("#search").css({
                    position: "relative",
                    "padding-top": "0",
                    "padding-bottom": "0"
                });

                imgLocation(false);

            } else {
                $("#search div.s_tab").hide();
                $("#imgfilter").hide();

                $("#search").css({
                    position: 'fixed',
                    "padding-top": "20px",
                    "padding-bottom": "0"
                });
            }

            curtScroll = scrollside();

            if (curtScroll) {
                $.each(dataImg.data, function(index, value) {
                    var box = $("<div>").addClass('box').appendTo($('#container'));
                    var content = $("<div>").addClass('content').appendTo(box);
                    $("<img>").attr("src", "./images/" + $(value).attr("src")).appendTo(content);
                });

                if ($(document).scrollTop() == 0) {
                    imgLocation(false);
                } else {
                    imgLocation(curtScroll);
                }

            }



        });
    });

    $(window).on("load", function() {

        imgLocation(curtScroll);

        var dataImg = {
            "data": [{
                "src": "1.jpg"
            }, {
                "src": "2.jpg"
            }, {
                "src": "3.jpg"
            }, {
                "src": "4.jpg"
            }, {
                "src": "5.jpg"
            }, {
                "src": "6.jpg"
            }, {
                "src": "7.jpg"
            }, {
                "src": "8.jpg"
            }, {
                "src": "9.jpg"
            }]
        }


        // window.onscroll = function(){
        $(window).on("resize", function() {

            if ($(document).scrollTop() == 0) {

                $("#search div.s_tab").show();
                $("#imgfilter").show();

                $("#search").css({
                    position: "relative",
                    "padding-top": "0",
                    "padding-bottom": "0"
                });

                imgLocation(false);

            } else {
                $("#search div.s_tab").hide();
                $("#imgfilter").hide();

                $("#search").css({
                    position: 'fixed',
                    "padding-top": "20px",
                    "padding-bottom": "0"
                });
            }

            curtScroll = scrollside();

            if (curtScroll) {
                $.each(dataImg.data, function(index, value) {
                    var box = $("<div>").addClass('box').appendTo($('#container'));
                    var content = $("<div>").addClass('content').appendTo(box);
                    $("<img>").attr("src", "./images/" + $(value).attr("src")).appendTo(content);
                });

                if ($(document).scrollTop() == 0) {
                    imgLocation(false);
                } else {
                    imgLocation(curtScroll);
                }

            }



        });
    });
});


function scrollside() {
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
    var documentHeight = $(document).height();
    var scrollHeight = $(window).scrollTop();
    return (lastboxHeight < scrollHeight + documentHeight) ? true : false;
}

function imgLocation(scroll) {

    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width() / boxWidth);
    var containerWidth = boxWidth * num;
    $("#container").attr("style", "width:" + containerWidth + "px");
    var boxArr = [];
    box.each(function(index, value) {
        var boxHeight = box.eq(index).height();
        if (index < num) {
            // boxArr[index] = boxHeight;
            if (scroll == false) {
                boxArr[index] = boxHeight + $("#search").outerHeight(true);
            } else {
                boxArr[index] = boxHeight;
            }

        } else {
            var minboxHeight = Math.min.apply(null, boxArr);
            var minboxIndex = $.inArray(minboxHeight, boxArr);
            $(value).css({
                "position": "absolute",
                "top": minboxHeight,
                "left": box.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex] += box.eq(index).height();
        }
    });
}

