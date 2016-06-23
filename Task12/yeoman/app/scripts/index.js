
var g_aqilevel = new Array('优', '良', '轻度污染', '中度污染', '重度污染', '严重污染');
var g_aqicolor = new Array('#0CF11E', '#BAE410', '#E4A310', '#DC8552', '#F57272', '#C32F2F');
var g_day = new Array('今天', '明天', '后天', '&nbsp;', '&nbsp;', '&nbsp;');


//Set Skin Class 
var CheckSkin = {
    curtSkin: undefined,
    imgBackground: undefined,
    init: function() {
        this.render();
        this.bind();
    },
    render: function() {
        var me = this;
        me.imgBackground = $('#backgroundimage');
    },
    bind: function() {
        var me = this;
        me.curtSkin = localStorage.skinname;
        me.SetSkin(CheckSkin.curtSkin);
    },
    SetSkin: function(skin) {
        var me = this;
        if (skin !== undefined && skin !== '') {
            localStorage.skinname = skin;
            me.imgBackground.attr('src', me.curtSkin);
        }
    },
    ClearSkin: function() {
        var me = this;
        localStorage.skinname = '';
        me.imgBackground.attr('src', '');
    }
};
// Setup the CheckCity class to ackonwledge the site which user log in.
var CheckCity = {
    curtCity: undefined,
    curtMap: undefined,
    curtPoint: undefined,
    curtGEOLocation: undefined,
    btnCity: undefined,
    divIndividual: undefined,
    spnWeaterhTemp: undefined,
    spnAqi: undefined,
    spnAqiFigure: undefined,
    init: function() {
        this.render();
        this.bind();
    },
    render: function() {
        var me = this;
        me.btnCity = $('#cityname');
        me.divIndividual = $('#divWeather div');
        me.spnWeaterhTemp = $('#weathertemp');
        me.spnAqi = $('#aqi');
        me.spnAqiFigure = $('#aqifigure');
    },
    bind: function() {
        var me = this;
        me.setUserCityAndWeather();
    },
    setUserCityAndWeather: function() {
        //Check the enternet log in site and weather info.
        var me = this;
        if (me.curtMap === undefined) {
            me.curtMap = new BMap.Map('allmap');
        }

        if (me.curtPoint === undefined) {
            me.curtPoint = new BMap.Point(110.331398, 45.897445);
        }
        var point = me.curtPoint;
        me.curtMap.centerAndZoom(point, 12);

        if (me.curtGEOLocation === undefined) {
            me.curtGEOLocation = new BMap.Geolocation();
        }
        var geolocation = me.curtGEOLocation;

        geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point);
                me.curtMap.addOverlay(mk);
                me.curtMap.panTo(r.point);
                //alert('您的位置：' + r.point.lng + ',' + r.point.lat);
            } else {
                //alert('启动Baidu地图时发生错误，请确认网络是否正常或联系管理员。(Status=' + this.getStatus() + ')');
            }
        }, {
            enableHighAccuracy: false
        });

        if (me.curtCity === undefined) {
            me.curtCity = new BMap.LocalCity();
        }
        me.curtCity.get(me.myLocalCityAndWeather);
    },
    myLocalCityAndWeather: function(result) {

        //we use secondme to save this object 
        //due to the BaiDu Map has used me to save this object in getScript.js file
        //we can not use secondme due to it invoke outside the CheckCity class.
        //var secondme = this;
        var cityName = result.name;
        console.log('result=' + result);
        CheckCity.curtMap.setCenter(cityName);
        var curtCity = result.name.substr(0, result.name.length - 1);
        CheckCity.btnCity.text(curtCity + ':');
        CheckCity.getWeatherForecast(curtCity);
    },
    getWeatherForecast: function(curtCity) {
        $.ajax({
            type: 'GET',
            url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + curtCity,
            data: '',
            success: function(msg) {
                if (msg != 'undefined') {
                    //Get the weather jason info to generate the chart.
                    var jason = jQuery.parseJSON(msg);
                    if (jason.desc !== 'OK') {
                        return;
                    }
                    var data = jason.data;
                    var curttype = '';
                    var curtaqi = data.aqi;
                    var curttemp = data.wendu;
                    var forecast = data.forecast;

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

                        $(CheckCity.divIndividual[index + 2]).html(html);
                        index += 1;
                    });

                    $(CheckCity.divIndividual[1]).html(htmltoday);

                    $(CheckCity.spnWeaterhTemp).text(curttemp + '℃');
                    var indexSeq = Math.floor(curtaqi / 50);

                    $(CheckCity.spnAqi).text(g_aqilevel[indexSeq]);
                    $(CheckCity.spnAqi).css('color', g_aqicolor[indexSeq]);
                    $(CheckCity.spnAqiFigure).text(curtaqi);

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
};
//Set Weather Class
var Weather = {
    divWeater: undefined,
    divLeftNavpart: undefined,
    init: function() {
        this.render();
        this.bind();
    },
    render: function() {
        var me = this;
        me.divWeather = $('#divWeather');
        me.divLeftNavPart = $('.leftnavpart div');
    },
    bind: function() {

        var me = this;

        $(me.divLeftNavPart).hover(function() {
            $(me.divWeather).slideDown('400');
        }, function() {
            // $("#divWeather").slideUp();
        });

        $(me.divWeather).mouseover(function(event) {
            $(me.divWeather).show();
        });

        $(me.divWeather).mouseout(function(event) {
            $(me.divWeather).hide();
        });
    }
};
//Set Popup Class
var PopupMenu = {
    divShowCenter: undefined,
    divAccount: undefined,
    divShowConfig: undefined,
    divConfig: undefined,
    spnShowProduct: undefined,
    divMoreProduct: undefined,
    panelheading: undefined,
    tabcontent: undefined,
    tabcontentli: undefined,
    init: function() {
        this.render();
        this.bind();
    },
    render: function() {
        var me = this;
        me.divShowCenter = $('#divShowCenter');
        me.divAccount = $('#divAccount');
        me.divShowConfig = $('#divShowConfig');
        me.divConfig = $('#divConfig');
        me.spnShowProduct = $('#spnShowProduct');
        me.divMoreProduct = $('#divMoreProduct');
        me.panelheading = $('.panel-heading');
        me.tabcontent = $('#tabcontent');
        me.tabcontentli = $('#tabcontent li');
        me.tabcontentlitabin = $('#tabcontent li.tabin');
    },
    bind: function() {
        var me = this;

        // Show Configuration submenu
        me.divShowCenter.hover(function() {
            me.SetPopupMenu(PopupMenu.divShowCenter, PopupMenu.divAccount);
            PopupMenu.divAccount.slideDown(400);
        }, function() {
            // me.divAccount.slideUp();
        });

        me.divAccount.hover(function() {
            me.divAccount.slideDown(400);
        }, function() {
            // $("#divConfig").slideUp();
        });

        me.divAccount.mouseover(function(event) {
            me.divAccount.show();
        });

        me.divAccount.mouseout(function(event) {
            me.divAccount.hide();
        });

        // Show Configuration submenu

        me.divShowConfig.hover(function() {
            me.SetPopupMenu(me.divShowConfig, me.divConfig);
            me.divConfig.slideDown(400);
        }, function() {
            // me.divConfig.slideUp();
        });

        me.divConfig.hover(function() {
            me.divConfig.slideDown(400);
        }, function() {
            // $("#divConfig").slideUp();
        });

        me.divConfig.mouseover(function(event) {
            me.divConfig.show();
        });

        me.divConfig.mouseout(function(event) {
            me.divConfig.hide();
        });

        // Show more product submenu

        me.spnShowProduct.hover(function() {
            me.divMoreProduct.slideDown(400);
        }, function() {
            // $("#divMoreProduct").slideUp();
        });

        me.divMoreProduct.mouseover(function(event) {
            me.divMoreProduct.show();
        });

        me.divMoreProduct.mouseout(function(event) {
            me.divMoreProduct.hide();
        });


        //Panel hover event handle  
        me.panelheading.hover(function() {
            $(this).children('div').toggleClass('containerhide').toggleClass('containerdisplay');
        }, function() {
            $(this).children('div').toggleClass('containerdisplay').toggleClass('containerhide');
        });



        me.panelheading.on('click', function(event) {
            var span = $(this).children('a').children('span');
            $(span[0]).toggleClass('glyphicon glyphicon-triangle-bottom').toggleClass('glyphicon glyphicon-triangle-right');
            // console.log($(this).children('a span'));
            $(this).next('div').toggleClass('containerdisplay').toggleClass('containerhide');
            // console.log($(this).next('div'));
        });


        $(me.tabcontentli).each(function(index, el) {

            $(this).on('click', function(event) {
                $(me.tabcontentlitabin).toggleClass('tabin');
                $(this).toggleClass('tabin');

                var prevContent = $(me.tabcontent).siblings('div.containerdisplay');
                var mapcontent = $(me.tabcontent).siblings('div');
                console.log(mapcontent);
                prevContent.toggleClass('containerdisplay').toggleClass('containerhide');
                $(mapcontent[index]).toggleClass('containerhide').toggleClass('containerdisplay').slideDown(400);

            });

        });
    },
    SetPopupMenu: function(mother, popupmenu) {

        var left = $(mother).offset().left;
        left += $(mother).outerWidth() / 2;
        left -= $(popupmenu).outerWidth() / 2;

        $(popupmenu).css('left', left + 'px');
    }
};
//Set Skin Content Class
var SkinContent = {
    divChangeSkin: undefined,
    skinhead: undefined,
    divhideskin: undefined,
    init: function() {
        this.render();
        this.bind();
    },
    render: function() {
        var me = this;
        me.divChangeSkin = $('#divChangeSkin');
        me.skinhead = $('#skinhead');
        me.divhideskin = $('#divhideskin');
    },
    bind: function() {
        var me = this;
        // Change skin Content
        $(me.divChangeSkin).on('click', function(event) {
            $(me.skinhead).slideDown('400');
            alert('目前只设置了热门，游戏<魔兽世界，炉石传说>三处测试，其它考虑时间原因，暂未提供，请见谅!');
        });

        //Cancel the skin content
        $(me.divhideskin).on('click', function(event) {
            $(me.skinhead).slideUp('400');

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
            me.PreviewSkin($(this));
        }, function() {
            if ($(this).attr('class') != 'selected') {
                $(this).siblings('span').attr('class', ' ');
            }

            var selectedskin = $('.container ul li img.selected');
            me.PreviewSkin(selectedskin);
        });





        $('.container ul li img').on('click', function(event) {


            $('.container ul li img.selected').attr('class', ' ');
            $('.container ul li span.selected').attr('class', ' ');


            $(this).addClass('selected');
            $(this).siblings('span').addClass('selected');

            localStorage.skinname = $(this).attr('src');
            $('#backgroundimage').attr('src', localStorage.skinname);

            me.PreviewSkin($(this));


        });


        $('#divclearskin').on('click', function(event) {
            CheckSkin.clearSkin();
        });
    },
    PreviewSkin: function(imgskin) {
        if (imgskin !== undefined) {
            $('#imgpreview').attr('src', imgskin.attr('src')).show(400);
        } else {
            $('#imgpreview').attr('src', '').hide(400);
        }
    }

};


CheckSkin.init();
CheckCity.init();
PopupMenu.init();
Weather.init();
SkinContent.init();