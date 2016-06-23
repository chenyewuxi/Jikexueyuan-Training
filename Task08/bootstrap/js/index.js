function setLoadContentWithMenuLinstener() {

    $("#topnav div.row div").on('click', function(event) {
        event.preventDefault();


        var category = $(this).text();

        switch (category) {
            case "更多":
                $(this).html("<b></b>互联网");
                $("#moremenu").addClass('show');
                break;
            case "收起":
                $("#moremenu").removeClass('show');
                $("#morecontent").html('<b></b>更多<span class="glyphicon glyphicon-triangle-bottom">')
                break;
            default:
                $("#topnav div.row div.active").removeClass('active');
                $(this).addClass('active');
                getContentWithSectionName(category);
                break;
        }

    });

}



function getContentWithSectionName(category) {

    switch (category) {
        case "更多":
        case "收起":
            break;
        case "推荐":
        case "图片":
        case "本地":
        case "百家":

            $.ajax({
                url: 'server/admin.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    "actiontype": "FETCH",
                    "category": category
                },
                beforesend: function() {
                    $("#result").html("");

                },
                success: function(data) {
                    if (data != "undefined" && data["desc"] == "OK") {
                        generateResultContent(data);
                    }

                },
                error: function(error) {
                    alert("Fetch record failed! Reason:" + error['responseText']);
                }
            });
            break;

        default:
            alert("当前仅做演示，没有做<" + category + ">的后台编码!");
            break;

    }




}

function generateResultContent(data) {

    var content = "";
    var result = data["result"];

    var isfirsttime = true;
    var imgpreload = [];

    var arrimgsrc = [];
    var arrtitle = [];



    $.each(result, function(index, info) {


        if (info['newsimage'] == " " || info['newsimage'] == "") {

            content += "<div class='contentrowwrap'>";
            content += "<div class='contentrow'>";
            // title content
            content += "<div class='contenttitlewithoutimage'><div>" + info['newstitle'] + "</div></div>";
            content += "<div class='contentwithoutimage'><div>" + info['newscontent'] + "</div></div>";
            // bottom content

            if (isfirsttime == true) {
                isfirsttime = false;
                content += "<div class='contentbottomwithoutimage'><div class='timepass'>" + info['newsaddtime'] + "</div><div class='marktop'>置顶</div></div>";

            } else {
                content += "<div class='contentbottomwithoutimage'><div class='timepass'>" + info['newsaddtime'] + "</div><div class='mark'></div></div>";
            }
            content += "</div>";
            content += "</div>";

        } else {

            // var downloadimg = new Image();
            // downloadimg.onload = function(){
            //     var width=downloadimg.width;

            //     alert( "downloading complete: src=" + this.src);
            // }

            // downloadimg.src= info['newsimage'];

            switch (info['category']) {
                case "图片":
                    content += "<div class='contentimagerow'>";
                    // image content
                    content += "<div class='contentimage'><img src='" + info['newsimage'] + "'/></div>";

                    // bottom content
                    content += "<div class='contentbottom'><div class='contenttitle'>" + info['newstitle'] + "</div></div>";
                    content += "</div>";
                    break;
                case "推荐":
                    content += "<div class='contentrowwrap'>";
                    content += "<div class='contentrow'>";
                    // image content
                    content += "<div class='contentimage'><img src='" + info['newsimage'] + "'/></div>";

                    arrimgsrc.push(info['newsimage']);

                    // title content
                    content += "<div class='contenttitle'><div>" + info['newstitle'] + "</div></div>";
                    arrtitle.push(info['newstitle']);
                    // bottom content

                    if (isfirsttime == true) {
                        isfirsttime = false;
                        content += "<div class='contentbottom'><div class='timepass'>" + info['newsaddtime'] + "</div><div class='marktop'>置顶</div></div>";

                    } else {
                        content += "<div class='contentbottom'><div class='timepass'>" + info['newsaddtime'] + "</div><div class='mark'></div></div>";
                    }
                    content += "</div>";
                    content += "</div>";
                    break;
                default:
                    content += "<div class='contentrowwrap'>";
                    content += "<div class='contentrow'>";
                    // image content
                    content += "<div class='contentimage'><img src='" + info['newsimage'] + "'/></div>";
                    // title content
                    content += "<div class='contenttitle'><div>" + info['newstitle'] + "</div></div>";
                    // bottom content

                    if (isfirsttime == true) {
                        isfirsttime = false;
                        content += "<div class='contentbottom'><div class='timepass'>" + info['newsaddtime'] + "</div><div class='marktop'>置顶</div></div>";

                    } else {
                        content += "<div class='contentbottom'><div class='timepass'>" + info['newsaddtime'] + "</div><div class='mark'></div></div>";
                    }
                    content += "</div>";
                    content += "</div>";
                    break;
            }



        }

    });


    var slide = "";
    if (arrimgsrc.length > 0) {
        slide += "<div id='myCarousel' class='carousel slide' data-ride='carousel'>";
        // ol componet
        slide += "<ol class='carousel-indicators'>";
        for (var i = arrimgsrc.length - 1; i >= 0; i--) {
            if (0 == i) {
                slide += "<li data-target='#myCarousel' data-slide-to='" + i + "' class='active'></li>";
            } else {
                slide += "<li data-target='#myCarousel' data-slide-to='" + i + "' ></li>";
            }
        }
        slide += "</ol>";

        //itms component
        slide += "<div class='carousel-inner' role='listbox'>";
        for (var i = arrimgsrc.length - 1; i >= 0; i--) {
            if (0 == i) {
                slide += "<div class='active item'>";
            } else {
                slide += "<div class='item'>";
            }
            slide += "<img src='" + arrimgsrc.pop() + "'>";
            slide += "<div class='carousel-caption'>";
            slide += "<p>" + arrtitle.pop() + "</p>";

            slide += "</div>";
            slide += "</div>";
        }
        slide += "</div>";
        // nav component
        slide += "<a class='carousel-control left' href='#myCarousel'  role='button' data-slide='prev'>"
        slide += "<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span><span class='sr-only'>Previous</span>";
        slide += "</a>";
        slide += "<a class='carousel-control right' href='#myCarousel' role='button'  data-slide='next'>";
        slide += "<span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span><span class='sr-only'>Next</span>";
        slide += "</a>";
        slide += "</div>";
    }

    if (content.length>0){
     content +="<div class='ui-refresh-wrapper'><div class='ui-refresh'>点击加载更多</div></div>";
    }

    $("#result").html(slide + content);


}

function loadContentWhenOpenWebPage() {

    var category = $("#topnav div.row div.active").text();
    getContentWithSectionName(category);

}


function setTopAndFeedbackLinstener() {
    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 150) {
            $("#gotop").css("display", "block");
            $("#feedback").css("display", "block");
        } else {
            $("#gotop").css("display", "none");
            $("#feedback").css("display", "none");
        }
    });

    $("#gotop").on('click', function(event) {
        $(window).scrollTop(0);
    });
}

function setAddMoreContentLinster(){
    $("#result").on('click', 'div.ui-refresh-wrapper', function(event) {
        // event.preventDefault();
        alert("当前没有更多的记录加载！");
    });
}

function setCarouselLisntener() {

    $('.carousel').carousel({
        interval: 2000
    })
}


$(document).ready(function() {


    setLoadContentWithMenuLinstener();

    loadContentWhenOpenWebPage();

    setTopAndFeedbackLinstener();

    setCarouselLisntener();

    setAddMoreContentLinster();


});
