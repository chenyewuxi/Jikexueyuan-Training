var g_city = '';
var g_weather = [];
var g_aqilevel = new Array('优', '良', '轻度污染', '中度污染', '重度污染', '严重污染');
var g_aqicolor = new Array('#0CF11E', '#BAE410', '#E4A310', '#DC8552', '#F57272', '#C32F2F');
var g_day = new Array('今天', '明天', '后天', '&nbsp;', '&nbsp;', '&nbsp;');

var g_skingame = [''];

function setUserCityAndWeather() {

    var map = new BMap.Map('allmap');
    var point = new BMap.Point(110.331398, 45.897445);
    map.centerAndZoom(point, 12);

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
        } else {
            // alert('启动Baidu地图时发生错误，请确认网络是否正常或联系管理员。(Status=' + this.getStatus() + ')');
        }
    }, {
        enableHighAccuracy: false
    });



    function myLocalCityAndWeather(result) {
        var cityName = result.name;
        console.log('result=' + result);
        map.setCenter(cityName);
        var curtCity = result.name.substr(0, result.name.length - 1);
        $('#cityname').text(curtCity + ':');
        g_city = curtCity;

        getWeatherForecast(g_city);
    }

    var myCity = new BMap.LocalCity();
    myCity.get(myLocalCityAndWeather);

}

function getWeatherForecast(curtCity) {

    $.ajax({
        type: 'GET',
        url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + curtCity,
        data: '',
        success: function(msg) {
            if (msg != 'undefined') {

                var jason = jQuery.parseJSON(msg);
                if (jason.desc !== 'OK') {
                    return ;
                }

                var data = jason.data;

                var curttype = '';
                var curtaqi = data.aqi;
                var curttemp = data.wendu;

                var forecast = data.forecast;

                var div = $('#divWeather div');
                var htmltoday = '';

                $.each(forecast, function(index, info) {

                    var low = info.low;
                    var high = info.high;
                    var type = info.type;
                    var windDirection = info.fengxiang;
                    var windLevel = info.fengli;
                    var date = info.date;


                    if (index === 0) {
                        curtType = type;
                        var linkWeather = 'https://www.baidu.com/s?tn=baidutop10&rsv_idx=2&wd=' + curtCity + '天气预报';
                        htmltoday += '<div>' + date + '</div>' + '<div><a href=\'' + linkWeather + '\'>未来七天天气</a></div>';

                        htmltoday += '<div><span class=\'configicon\'>设置</span></div>';

                    }

                    var html = '';

                    //日期 
                    html += '<p>' + g_day[index] + '</p>';
                    html += '<p>' + date + '</p>';



                    //天气图标
                    if (type.indexOf('多云') >= 0 || type.indexOf('晴') >= 0) {
                        html += '<p class=\'sunny\'></p>';
                    }
                    if (type.indexOf('雨') >= 0) {
                        html += '<p class=\'rainny\'></p>';
                    }
                    if (type.indexOf('阴') >= 0) {
                        html += '<p class=\'cloudy\'></p>';
                    }

                    //气温
                    if (index === 0) {
                        html += '<p>' + curttemp + '℃</p>';
                    } else {
                        html += '<p>' + low.split(' ')[1] + '~' + high.split(' ')[1] + '</p>';
                    }

                    //Type

                    html += '<p>' + type + '</p>';

                    //Wind
                    html += '<p>' + windDirection + windLevel + '</p>';

                    $(div[index + 2]).html(html);
                    index += 1;
                });



                $(div[1]).html(htmltoday);

                $('#weathertemp').text(curttemp + '℃');
                var indexSeq = Math.floor(curtaqi / 50);

                $('#aqi').text(g_aqilevel[indexSeq]);
                $('#aqi').css('color', g_aqicolor[indexSeq]);
                $('#aqifigure').text(curtaqi);



            }
        },

        error: function(XMLHttpRequest, textStatus, errorThrown) {
            var msgweathererror = '调用Ajax时发生错误，当前状态为' + textStatus;
            alert(msgweathererror);
        },
        complete: function(XMLHttpReqeust, textStatus) {
            // alert("成功获取位置及天气信息");

        }
    });
}



function setPopupMenu(mother, popupmenu) {

    var left = $(mother).offset().left;
    left += $(mother).outerWidth() / 2;
    left -= $(popupmenu).outerWidth() / 2;

    $(popupmenu).css('left', left + 'px');
}


function setWeatherListener() {

    $('.leftnavpart div').hover(function() {
        $('#divWeather').slideDown('400');
    }, function() {
        // $("#divWeather").slideUp();
    });

    $('#divWeather').mouseover(function(event) {
        $('#divWeather').show();
    });

    $('#divWeather').mouseout(function(event) {
        $('#divWeather').hide();
    });


}

function setPopupMenuListener() {

    // Show Configuration submenu


    $('#divShowCenter').hover(function() {
        setPopupMenu('#divShowCenter', '#divAccount');
        $('#divAccount').slideDown(400);

    }, function() {
        // $("#divAccount").slideUp();
    });


    $('#divAccount').mouseover(function(event) {
        $('#divAccount').show();
    });

    $('#divAccount').mouseout(function(event) {
        $('#divAccount').hide();
    });


    // Show Configuration submenu

    $('#divShowConfig').hover(function() {
        setPopupMenu('#divShowConfig', '#divConfig');
        $('#divConfig').slideDown(400);
    }, function() {
        // $("#divConfig").slideUp();
    });

    $('#divConfig').hover(function() {
        $('#divConfig').slideDown();
    }, function() {
        // $("#divConfig").slideUp();
    });


    $('#divConfig').mouseover(function(event) {
        $('#divConfig').show();
    });

    $('#divConfig').mouseout(function(event) {
        $('#divConfig').hide();
    });

    // Show more product submenu

    $('#spnShowProduct').hover(function() {
        $('#divMoreProduct').slideDown(400);
    }, function() {
        // $("#divMoreProduct").slideUp();
    });

    $('#divMoreProduct').mouseover(function(event) {
        $('#divMoreProduct').show();
    });

    $('#divMoreProduct').mouseout(function(event) {
        $('#divMoreProduct').hide();
    });


    //Panel hover event handle  
    $('.panel-heading').hover(function() {
        $(this).children('div').toggleClass('containerhide').toggleClass('containerdisplay');
    }, function() {
        $(this).children('div').toggleClass('containerdisplay').toggleClass('containerhide');
    });



    $('.panel-heading').on('click', function(event) {
        var span=$(this).children('a').children('span');
        $(span[0]).toggleClass('glyphicon glyphicon-triangle-bottom').toggleClass('glyphicon glyphicon-triangle-right');
        // console.log($(this).children('a span'));
        $(this).next('div').toggleClass('containerdisplay').toggleClass('containerhide');
        // console.log($(this).next('div'));
    });


    $('#tabcontent li').each(function(index, el) {
        $(this).on('click', function(event) {
            $('#tabcontent li.tabin').toggleClass('tabin');
            $(this).toggleClass('tabin');

            var prevContent = $('#tabcontent').siblings('div.containerdisplay');
            var mapcontent = $('#tabcontent').siblings('div');
            console.log(mapcontent);
            prevContent.toggleClass('containerdisplay').toggleClass('containerhide');
            $(mapcontent[index]).toggleClass('containerhide').toggleClass('containerdisplay').slideDown(400);

        });

    });
}


function setSkinContentListener() {

    // Change skin Content
    $('#divChangeSkin').on('click', function(event) {
        $('#skinhead').slideDown('400');
        alert('目前只设置了热门，游戏<魔兽世界，炉石传说>三处测试，其它考虑时间原因，暂未提供，请见谅!');
    });

    //Cancel the skin content
    $('#divhideskin').on('click', function(event) {
        $('#skinhead').slideUp('400');

    });


    // Skin first level tab click 
    $('.skinheadmenu ul li').on('click', function(event) {
        $('.skinheadmenu ul li.active').removeClass('active');
        $(this).addClass('active');
        var id = this.id;

        var ulid = '#ul' + id;
        $('.submenunav ul.containerdisplay').removeClass('containerdisplay').addClass('containerhide');
        $(ulid).removeClass('containerhide').addClass('containerdisplay');

        var ulsubnav = $(ulid + ' li a.cur').attr('id');
        $('.container ul.containerdisplay').removeClass('containerdisplay').addClass('containerhide');
        if (ulsubnav === undefined) {
            $(ulid).addClass('containerdisplay');
        } else {
            $('#ul' + ulsubnav).addClass('containerdisplay');
        }
    });

    // Skin second level tab click 
    $('.submenunav ul li a').on('click', function(event) {
        // var prevlink = $($($($(this).parent).siblings('li')).children('a.cur')[0]);
        var prevlink = $(this).parent('li').siblings('li').children('a.cur');
        var prevlinkid = prevlink.attr('id');

        prevlink.removeClass('cur');
        $('#ul' + prevlinkid).removeClass('containerdisplay').addClass('containerhide');

        $(this).addClass('cur');
        var curlinkid = $(this).attr('id');
        $('#ul' + curlinkid).removeClass('containerhide').addClass('containerdisplay');

    });


    $('.container ul li img').hover(function() {
        if ($(this).attr('class') != 'selected') {
            $(this).siblings('span').attr('class', 'selected');
        }
        previewSkin($(this));
    }, function() {
        if ($(this).attr('class') != 'selected') {
            $(this).siblings('span').attr('class', ' ');
        }

        var selectedskin = $('.container ul li img.selected');
        previewSkin(selectedskin);
    });





    $('.container ul li img').on('click', function(event) {


        $('.container ul li img.selected').attr('class', ' ');
        $('.container ul li span.selected').attr('class', ' ');


        $(this).addClass('selected');
        $(this).siblings('span').addClass('selected');

        localStorage.skinname = $(this).attr('src');
        $('#backgroundimage').attr('src', localStorage.skinname);

        previewSkin($(this));


    });


    $('#divclearskin').on('click', function(event) {
        clearSkin();
    });

}



function backgroundResize() {
    var win_width = $(window).width();
    var win_height = $(window).height();
    $('#backgroundimage').attr({ width: win_width, height: win_height });
}



function previewSkin(imgskin) {
    if (imgskin !== undefined) {
        $('#imgpreview').attr('src', imgskin.attr('src')).show(400);
    } else {
        $('#imgpreview').attr('src', '').hide(400);
    }

}


function clearSkin(){

    localStorage.skinname='';
    if (localStorage.skinname !== undefined) {
        $('#backgroundimage').attr('src', '');
    }

}

$(document).ready(function() {

    var curtskin = localStorage.skinname;
    if ( curtskin !== undefined && curtskin !== '') {
        $('#backgroundimage').attr('src', localStorage.skinname);
    }

    setUserCityAndWeather();

    setPopupMenuListener();

    setWeatherListener();

    setSkinContentListener();

});
