define(function(require, exports, module) {
    require('jquery');
    var $=jQuery;

    console.log("run the index.js depend on jquery");
    $(document).ready(function() {


        maxSliders = $("#pagination span").length;
        curtSliderIdx = $("#pagination span.swiper-active-switch").index();


        sliderShowObj = setInterval(ShowSlider, 3000);



        setSliderLinstener();

        setFocusLinstener();

        setTopNavListener();

        setOpenClassListener();

        setRecommendNameListener();

        setSecondNavLinsener();

        setProjectLinstener();

        setExcellentLinstener();

        setWikiLinstener();

        setCompanyLinstener();

        setUniversityLinstener();

        setLearnboxLinsterner();


    });

    //Enterprise Shift Factors
    var curtEntIdx = 6;
    var entShowLength = 6;
    var entDistinctLength = 21;
    var entTotalLength = 33;
    var entShift = 0;
    var entWidth = 159.667;


    //University Shift Factors
    var curtUniIdx = 7;
    var uniShowLength = 7;
    var uniDistinctLength = 13;
    var uniTotalLength = 27;
    var uniShift = 0;
    var uniWidth = 136.857;


    //Learnbox Shift Factors
    var curtLeaIdx = 6;
    var leaShowLength = 6;
    var leaDistinctLength = 14;
    var leaTotalLength = 27;
    var leaShift = 0;
    var leaWidth = 159.667;


    //Focusework Shift Factors
    var curtFocIdx = 3;
    var focShowLength = 3;
    var focDistinctLength = 6;
    var focTotalLength = 12;
    var focShift = 0;
    var focWidth = 186.667;

    //Slide Shift Factors
    var sliderShowObj;
    var maxSliders = 0;
    var curtSliderIdx = 0;
    var sliShift = 0;
    var sliWidth = 560;

    function ShowSlider() {

        curtSliderIdx += 1;
        if (curtSliderIdx >= maxSliders) {
            curtSliderIdx = 0;
        }

        sliShift = curtSliderIdx * sliWidth;

        $("#pagination span.swiper-active-switch").removeClass('swiper-active-switch');
        $($("#pagination span")[curtSliderIdx]).addClass('swiper-active-switch');

        $($("#banner-left").siblings("div.swiper-wrapper")[0]).css("transform", "translate3d(-" + sliShift + "px, 0px, 0px)")


    }

    function setSliderLinstener() {

        $("#pager div.index-banner").hover(function() {

            clearInterval(sliderShowObj);
            $("#banner-left").css("display", "block");
            $("#banner-right").css("display", "block");
        }, function() {
            sliderShowObj = setInterval(ShowSlider, 3000);
            $("#banner-left").css("display", "none");
            $("#banner-right").css("display", "none");
        });

        $("#banner-left").click(function(event) {

            event.preventDefault();
            curtSliderIdx -= 1;
            if (curtSliderIdx < 0) {
                curtSliderIdx += maxSliders;
            }
            sliShift = curtSliderIdx * sliWidth;
            $("#pagination span.swiper-active-switch").removeClass('swiper-active-switch');
            $($("#pagination span")[curtSliderIdx]).addClass('swiper-active-switch');

            $($(this).siblings("div.swiper-wrapper")[0]).css("transform", "translate3d(-" + sliShift + "px, 0px, 0px)")

        });


        $("#banner-right").click(function(event) {
            event.preventDefault();
            curtSliderIdx += 1;
            if (curtSliderIdx >= maxSliders) {
                curtSliderIdx -= maxSliders;
            }
            sliShift = curtSliderIdx * sliWidth;
            $("#pagination span.swiper-active-switch").removeClass('swiper-active-switch');
            $($("#pagination span")[curtSliderIdx]).addClass('swiper-active-switch');

            $($(this).siblings("div.swiper-wrapper")[0]).css("transform", "translate3d(-" + sliShift + "px, 0px, 0px)")
        });

    }

    function setFocusLinstener() {

        $("#pager div.focuswork-wrap").hover(function() {
            $("#work-left").css("display", "block");
            $("#work-right").css("display", "block");
        }, function() {
            $("#work-left").css("display", "none");
            $("#work-right").css("display", "none");
        });

        $("#work-left").click(function(event) {

            event.preventDefault();
            curtFocIdx -= 1;
            if (curtFocIdx < 0) {
                curtFocIdx = focDistinctLength - curtFocIdx;
            }
            focShift = curtFocIdx * focWidth;
            $($(this).siblings("ul.swiper-wrapper")[0]).css("transform", "translate3d(-" + focShift + "px, 0px, 0px)")
        });


        $("#work-right").click(function(event) {
            event.preventDefault();
            curtFocIdx += 1;
            if (curtFocIdx + focShowLength >= focTotalLength) {
                curtFocIdx -= focDistinctLength;
            }
            focShift = curtFocIdx * focWidth;
            $($(this).siblings("ul.swiper-wrapper")[0]).css("transform", "translate3d(-" + focShift + "px, 0px, 0px)")
        });

    }

    function setTopNavListener() {


        $("#navbox .nav .navbox").hover(function() {
            $(this).children('ul').show(400);
        }, function() {
            $(this).children('ul').hide(400);
        });




        $("#navbox .nav .navbox a").each(function(index, el) {

            $(this).hover(function() {
                    switch (index) {
                        case 0:
                            $($(this).siblings('ul').children('li.selected')[0]).removeClass('selected');
                            break;
                        default:
                            $($(this).siblings('ul').children('li.selected')[0]).removeClass('selected');

                            $($(this).siblings('ul').children('li')[index - 1]).addClass('selected');
                            break;
                    }
                },
                function() {
                    // $($(this).siblings('ul').children('li.selected')[0]).removeClass('selected');
                });

        });

        $("#navbox .nav .navbox ul li ul.item-box li").each(function(index, el) {

            $(this).hover(function() {
                    $($($($(this).parent('ul')[0]).parent('li')[0]).siblings('li.selected')[0]).removeClass('selected');
                    $($($(this).parent('ul')[0]).parent('li')[0]).addClass('selected');

                },
                function() {
                    // $($(this).siblings('ul').children('li.selected')[0]).removeClass('selected');
                });

        });
    }

    function setOpenClassListener() {

        $("#openclass ul li").each(function(index, el) {
            $(this).hover(function() {
                $($(this).find('div.desc')[0]).slideDown(400).css({
                    top: '0',
                    display: 'block'
                });
            }, function() {
                $($(this).find('div.desc')[0]).slideUp(400);
            });
        });

    }

    function setRecommendNameListener() {
        $("#recommendName ul li").each(function(index, el) {

            $(this).on('click', function(event) {
                $(this).siblings('li.on').removeClass('on');
                $($("#hot-lessonbox").children('div')[0]).css("display", "none");
                $($("#fivelesson").children('div')).css("display", "none");
                $(this).addClass('on')
                switch (index) {
                    case 0:
                        $($("#hot-lessonbox").children('div')[0]).css("display", "block");
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        $($("#fivelesson").children('div')[index - 1]).css("display", "block");
                        break;
                }
            });
        });
    }


    function setSecondNavLinsener() {




        //Second Nav detail hover event
        $("#hot-lessonbox ul li").each(function(index, el) {

            $(this).hover(function() {


                $($(this).find("div.lessonplay")[0]).css('opacity', '1').slideDown(400);
                $($(this).find("div.lesson-infor")[0]).addClass('lesson-hover').css('height', '175px').slideDown(400);

                $($(this).find('p')[0]).css({
                    display: 'block',
                    height: '52px',
                    opacity: '1'

                }).slideDown(400);

            }, function() {

                $($(this).find("div.lessonplay")[0]).css('opacity', '0').slideUp(400);
                $($(this).find("div.lesson-infor")[0]).removeClass('lesson-hover').css('height', '88px').slideDown(400);


                $($(this).find('p')[0]).slideUp(400).css({
                    display: 'none',
                    height: '52px',
                    opacity: '0'
                });
            });
        });

    }


    function setProjectLinstener() {

        $("#learn-way div.learn-card a").each(function(index, el) {

            $(this).hover(function() {
                $(this).css({
                    border: '1px solid #35b558'
                });
                $(this).children('button.greenbtn2').css({
                    color: '#fff',
                    background: ' #35b558'
                });
            }, function() {
                $(this).css({
                    border: '1px solid  #E4E4E4'
                });
                $(this).children('button.greenbtn2').css({
                    color: '#35b558',
                    background: '#f3fff6'
                });
            });

        });
    }


    function setExcellentLinstener() {
        $("#excellent div.lesson-card").each(function(index, el) {

            $(this).hover(function() {
                $(this).find('div.describe').css({
                    visibility: 'visible',
                    opacity: '0.9'
                });
            }, function() {
                $(this).find('div.describe').css({
                    visibility: 'hidden',
                    opacity: '0'
                });
            });

        });
    }

    function setWikiLinstener() {
        $("#wiki div.one-wiki").each(function(index, el) {

            $(this).hover(function() {
                $(this).css({
                    border: '1px solid #35b558'
                });
            }, function() {
                $(this).css({
                    border: '1px solid #E4E4E4'
                });
            });
        });

        $("#wiki img.fengman").each(function(index, el) {
            $(this).hover(function() {

            }, function() {
                /* Stuff to do when the mouse leaves the element */
            });
        });
    }

    function setCompanyLinstener() {



        $($("#enterprise div.strategy")[0]).hover(function() {
            $("#banner-left3").css("display", "block");
            $("#banner-right3").css("display", "block");
        }, function() {
            $("#banner-left3").css("display", "none");
            $("#banner-right3").css("display", "none");
        });


        $("#banner-left3").click(function(event) {
            curtEntIdx -= 1;
            if (curtEntIdx < 0) {
                curtEntIdx = entDistinctLength - curtEntIdx;
            }
            entShift = curtEntIdx * entWidth;
            $("#enterprise div.swiper-wrapper").css("transform", "translate3d(-" + entShift + "px, 0px, 0px)")
        });

        $("#banner-right3").click(function(event) {
            curtEntIdx += 1;
            if (curtEntIdx + entShowLength > entTotalLength) {
                curtEntIdx -= entDistinctLength
            }
            entShift = curtEntIdx * entWidth;
            $("#enterprise div.swiper-wrapper").css("transform", "translate3d(-" + entShift + "px, 0px, 0px)")
        });
    }

    function setUniversityLinstener() {

        $($("#university div.swiper-car-box")[0]).hover(function() {
            $("#banner-left2").css("display", "block");
            $("#banner-right2").css("display", "block");
        }, function() {
            $("#banner-left2").css("display", "none");
            $("#banner-right2").css("display", "none");
        });



        $("#banner-left2").click(function(event) {
            curtUniIdx -= 1;
            if (curtUniIdx < 0) {
                curtUniIdx = uniDistinctLength - curtUniIdx;
            }
            uniShift = curtUniIdx * uniWidth;
            $("#university div.swiper-wrapper").css("transform", "translate3d(-" + uniShift + "px, 0px, 0px)")
        });

        $("#banner-right2").click(function(event) {
            curtUniIdx += 1;
            if (curtUniIdx + uniShowLength >= uniTotalLength) {
                curtUniIdx -= uniDistinctLength;
            }
            uniShift = curtUniIdx * uniWidth;
            $("#university div.swiper-wrapper").css("transform", "translate3d(-" + uniShift + "px, 0px, 0px)")
        });

    }

    function setLearnboxLinsterner() {
        $($("#learnbox div.strategy2")[0]).hover(function() {
            $("#banner-left4").css("display", "block");
            $("#banner-right4").css("display", "block");
        }, function() {
            $("#banner-left4").css("display", "none");
            $("#banner-right4").css("display", "none");
        });




        $("#banner-left4").click(function(event) {
            curtLeaIdx -= 1;
            if (curtLeaIdx < 0) {
                curtLeaIdx = leaDistinctLength - curtLeaIdx;
            }
            leaShift = curtLeaIdx * leaWidth;
            $("#learnbox div.swiper-wrapper").css("transform", "translate3d(-" + leaShift + "px, 0px, 0px)")
        });

        $("#banner-right4").click(function(event) {
            curtLeaIdx += 1;
            if (curtLeaIdx + leaShowLength >= leaTotalLength) {
                curtLeaIdx -= leaDistinctLength;
            }
            leaShift = curtLeaIdx * leaWidth;
            $("#learnbox div.swiper-wrapper").css("transform", "translate3d(-" + leaShift + "px, 0px, 0px)")
        });

    }




})
