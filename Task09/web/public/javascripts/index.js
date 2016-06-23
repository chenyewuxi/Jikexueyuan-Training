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
                url: '/Fetch',
                type: 'POST',
                dataType: 'JSON',
                data: {
                    'category': category
                },
                beforesend: function() {
                    $("#result").html("");

                },
                success: function(data) {

                    if (data != "undefined" && data["desc"] == "OK") {
                        generateResultContent(data);
                    }

                },
                error: function(err) {
                    console.log(err);
                    alert("Fetch record failed! Reason:" + err['responseText']);
                }
            });
            break;

        default:
            alert("当前仅做演示，没有做<" + category + ">的后台编码!");
            break;

    }




}

function getTimePeriodPassed(startdate, enddate) {

    if (startdate == undefined || enddate == undefined) {
        return " ";
    }

    var retVal = "";

    startdate = startdate.replace(/T/, ' ').substring(0, 19);

    var dstart = Date.parse(startdate);
    var dend = Date.parse(enddate);

    var dperiod = dstart - dend;
    var dABSperiod = Math.abs(dperiod);

    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;

    var checkflag = true;

    if (checkflag && (dABSperiod / years >= 1)) {
        retVal = Math.floor(dABSperiod / years) + "年" + Math.floor((dABSperiod/years-Math.floor(dABSperiod / years)) * 365) + "天";
        checkflag = false;
    }

    if (checkflag && (dABSperiod / days >= 1)) {
        retVal = Math.floor(dABSperiod / days) + "天" + Math.floor((dABSperiod/days-Math.floor(dABSperiod / days)) * 24) + "小时";
        checkflag = false;
    }

    if (checkflag && (dABSperiod / hours >= 1)) {
        retVal = Math.floor(dABSperiod / hours) + "小时" + Math.floor((dABSperiod/hours-Math.floor(dABSperiod / hours)) * 60) + "分钟";
        checkflag = false;
    }

    if (checkflag && (dABSperiod / minutes >= 1)) {
        retVal = Math.floor(dABSperiod / minutes) + "分钟" + Math.floor((dABSperiod / minutes-Math.floor(dABSperiod / minutes)) * 60) + "秒";
        checkflag = false;
    }

    if (checkflag && dABSperiod>0){
        retVal ="1分钟";
        checkflag=false;
    }

    if (checkflag == false){
        if (dperiod <0 ){
            retVal += "前";
        }else{
            retVal +="后";
        }
    }

    return retVal;



}


function generateResultContent(data) {

    var content = "";
    var result = data["result"];


    // var result = data;
    var isfirsttime = true;
    var imgpreload = [];

    var arrimgsrc = [];
    var arrtitle = [];

    var curtDate = new Date();



    $.each(result, function(index, info) {


        if (info['news_image'] == " " || info['news_image'] == "") {

            content += "<div class='contentrowwrap'>";
            content += "<div class='contentrow'>";
            // title content
            content += "<div class='contenttitlewithoutimage'><div>" + info['news_title'] + "</div></div>";
            content += "<div class='contentwithoutimage'><div>" + info['news_content'] + "</div></div>";
            // bottom content

            if (isfirsttime == true) {
                isfirsttime = false;
                content += "<div class='contentbottomwithoutimage'><div class='timepass'>" + getTimePeriodPassed(info['news_addtime'],curtDate) + "</div><div class='marktop'>置顶</div></div>";

            } else {
                content += "<div class='contentbottomwithoutimage'><div class='timepass'>" + getTimePeriodPassed(info['news_addtime'],curtDate) + "</div><div class='mark'></div></div>";
            }
            content += "</div>";
            content += "</div>";

        } else {

            // var downloadimg = new Image();
            // downloadimg.onload = function(){
            //     var width=downloadimg.width;

            //     alert( "downloading complete: src=" + this.src);
            // }

            // downloadimg.src= info['news_image'];

            switch (info['category']) {
                case "图片":
                    content += "<div class='contentimagerow'>";
                    // image content
                    content += "<div class='contentimage'><img src='" + info['news_image'] + "'/></div>";

                    // bottom content
                    content += "<div class='contentbottom'><div class='contenttitle'>" + info['news_title'] + "</div></div>";
                    content += "</div>";
                    break;
                case "推荐":
                    content += "<div class='contentrowwrap'>";
                    content += "<div class='contentrow'>";
                    // image content
                    content += "<div class='contentimage'><img src='" + info['news_image'] + "'/></div>";

                    arrimgsrc.push(info['news_image']);

                    // title content
                    content += "<div class='contenttitle'><div>" + info['news_title'] + "</div></div>";
                    arrtitle.push(info['news_title']);
                    // bottom content

                    if (isfirsttime == true) {
                        isfirsttime = false;
                        content += "<div class='contentbottom'><div class='timepass'>" + getTimePeriodPassed(info['news_addtime'],curtDate) + "</div><div class='marktop'>置顶</div></div>";

                    } else {
                        content += "<div class='contentbottom'><div class='timepass'>" + getTimePeriodPassed(info['news_addtime'],curtDate) + "</div><div class='mark'></div></div>";
                    }
                    content += "</div>";
                    content += "</div>";
                    break;
                default:
                    content += "<div class='contentrowwrap'>";
                    content += "<div class='contentrow'>";
                    // image content
                    content += "<div class='contentimage'><img src='" + info['news_image'] + "'/></div>";
                    // title content
                    content += "<div class='contenttitle'><div>" + info['news_title'] + "</div></div>";
                    // bottom content

                    if (isfirsttime == true) {
                        isfirsttime = false;
                        content += "<div class='contentbottom'><div class='timepass'>" + getTimePeriodPassed(info['news_addtime'],curtDate) + "</div><div class='marktop'>置顶</div></div>";

                    } else {
                        content += "<div class='contentbottom'><div class='timepass'>" + getTimePeriodPassed(info['news_addtime'],curtDate) + "</div><div class='mark'></div></div>";
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

    if (content.length > 0) {
        content += "<div class='ui-refresh-wrapper'><div class='ui-refresh'>点击加载更多</div></div>";
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

function setAddMoreContentLinster() {
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
