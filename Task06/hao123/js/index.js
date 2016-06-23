var hotsubject = "hotq:天气|NBA|太阳的后裔|房祖名混血女友|周杰伦脊柱炎|张馨予被扔鸡蛋|房价跌160万|韩庚致歉柳岩|曝范冰冰怀孕|斗鱼|宋仲基冥币热销|胡歌偷瞄江疏影|谢娜被电发飙|跑男"
var arrSubject = [];
var maxhotCount = 6;


function ShowAdvertise(ulouterDivId) {

    var arrAd = $("#" + ulouterDivId + " ul li");
    var count = $("#" + ulouterDivId + " ul li").length;
    var MaxShowStep = 100;

    var adverJob = setInterval(function() {

        var curtDate = new Date();
        var curtSecond = curtDate.getSeconds();
        var curtIdx = curtSecond % count;
        var prevIdx = 0;

        if (count > 0) {

            for (var i = 0; i < count; i++) {
                if (i != curtIdx && arrAd[i].getAttribute("class") == "selected") {
                    prevIdx = i;
                    break;
                }
            }

            arrAd[curtIdx].setAttribute("class", "selected");
            arrAd[prevIdx].setAttribute("class", "");

            var curtOpacity = 0;
            var showOpacity = 0;

            var timer = null;

            timer = setInterval(function() {
                if (curtOpacity < MaxShowStep) {
                    curtOpacity = curtOpacity + 10;
                    showOpacity = Number(parseFloat(curtOpacity) / MaxShowStep);
                    arrAd[curtIdx].setAttribute("style", "opacity:" + showOpacity + ";display:block");
                    arrAd[prevIdx].setAttribute("style", "opacity:" + Number(1 - showOpacity) + ";display:block");
                } else {
                    clearInterval(timer);
                }

            }, 100);

        }

        if (count == 0) {
            setTimeOut(function() {
                clearInterval(adverJob);
            }, 1000)
        }

    }, 5000);

}

$(document).ready(function() {

    showskinname();

    ShowAdvertise("advertiseDiv");
    ShowAdvertise("advertiseleftDiv");

    $($("#topnavUL li a")[0]).focus();

    //Add subject Info
    var iIdx = hotsubject.indexOf(":");
    var selectedUL = document.getElementById("searchUL");

    if (iIdx >= 0 && selectedUL != undefined) {
        arrSubject = hotsubject.substr(5).split("|");

        selectedUL.appendChild(CreateSearchTop());
        for (var i = 0; i < arrSubject.length - 1; i++) {
            if (i >= maxhotCount) {
                break;
            }
            selectedUL.appendChild(CreateSearchUL(arrSubject[i], ""))
        }


    }





});

function CreateSearchTop() {
    var li = document.createElement("li");

    var a = document.createElement("a");
    a.href = "http://www.hao123.com/top";
    a.setAttribute("class", "zoomicon");

    li.appendChild(a);

    return li;
}

function CreateSearchUL(subject, classname) {

    var li = document.createElement("li");

    var a = document.createElement("a");
    a.href = "http://www.baidu.com/s?word=" + subject + "&tn=sitehao123_10_pg&ie=utf-8";
    a.innerHTML = subject;
    a.setAttribute("class", classname);

    li.appendChild(a);

    return li;

}


$("#changeskin").click(function() {
    var bdisplay = $("#skinhead").attr("style");
    if (bdisplay == "display:none") {
        $("#skinhead").attr("style", "");
    } else {
        $("#skinhead").attr("style", "display:none");
    }

});


$("#cancel").click(function(event) {
    var bdisplay = $("#skinhead").attr("style");
    if (bdisplay == "display:none") {
        $("#skinhead").attr("style", "");
    } else {
        $("#skinhead").attr("style", "display:none");
    }

});

$("#restore").click(function(event) {

    unselectimage();
    $("body").attr("class", "");



});


$("#save").click(function(event) {

    var curtskinname = $("body").attr("class");
    if (curtskinname.length > 0) {
        curtskinname = curtskinname.substr(3);
        localStorage.skinname = curtskinname;

    } else {
        // curtskinname=localStorage.skinname;
        localStorage.removeItem("skinname");
    }

    $("#skinhead").attr("style", "display:none");

});


function unselectimage() {


    var scheckspan = "#skinhead" + " div.skinitem" + " ul li a span.selected";
    var span = $(scheckspan);

    if (span.length > 0) {
        span.attr("class", "");
    }

}


function showskinname() {

    var curtskin = localStorage.skinname;
    if (curtskin != undefined && curtskin.length > 0) {
        $("body").attr("class", "sk_" + curtskin);
    }


    if (curtskin != undefined ) {
        var scheckspan = "#skinhead" + " div.skinitem" + " ul li a span";
        var span = $(scheckspan);

        for (var i = 0; i <= span.length - 1; i++) {
            if ($($($($(span)[i]).children('img'))[0]).attr("title") == curtskin) {
                $($($($($(span)[i]).parent()).children('span'))[2]).attr("class", "selected");
            }
        }

    }

}


$("#skinhead div.skinitem ul li a span img").click(function(event) {

   

    var a = $($(this).parent()).parent();

  

    var ul = $($(a).parent()).parent();


    var bselected = $($(a).children("span")[2]).attr("class");

    var imagetitle = $(this).attr('title');

    if (bselected == "") {
        var li = $(ul).children("li");

        for (var i = 0; i <= $(li).length - 1; i++) {

            var a1 = $($(li)[i]).children('a');
            var span1 = $(a1).children('span');
            $($(span1)[2]).attr("class", "");

        }

        $($($(a).children("span"))[2]).attr("class", "selected");
        $("body").attr("class", "sk_" + imagetitle);

    }
});
