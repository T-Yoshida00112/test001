//menuの表示///////////////////
$(function () {

    /*$('#menu').addClass('menu_slideout');
    $('#menu_btn').click(function () {
       $('#menu').toggleClass('menu_slidein').toggleClass('menu_slideout');
    });*/

    $('#headder_toggle').click(function () {
        //menu非表示処理/////
        if($('#menu-sp').hasClass('menu_slidein')){
            $('#headder_toggle_line').removeClass('rotate');
            $('#menu-sp').removeClass('menu_slidein').addClass('menu_slideout');
        }else{//menu表示処理/////
            $('#headder_toggle_line').addClass('rotate');
            $('#menu-sp').removeClass('menu_slideout').addClass('menu_slidein');  
        }
    });


    //スムーススクロール//////////////////////////
    $('a[href^="#"]').click(function () {
        var speed = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({ scrollTop: position }, speed, 'swing');
        return false;
    });

    //scroll fade in//////////////////////

    //一個ずつフェードイン////////////////////////////
    var effect_btm = 100; // 画面下からどの位置でフェードさせるか(px)
    var effect_move = 50; // どのぐらい要素を動かすか(px)
    var effect_time = 800; // エフェクトの時間(ms) 1秒なら1000

    //親要素と子要素のcssを定義
    $('.scroll-fade-row').css({
        opacity: 0
    });
    $('.scroll-fade-row').children().each(function () {
        $(this).css({
            opacity: 0,
            transform: 'translateY(' + effect_move + 'px)',
            transition: effect_time + 'ms'
        });
    });

    // スクロールまたはロードするたびに実行
    
    $(window).on('scroll load', function () {
        var scroll_top = $(this).scrollTop();
        var scroll_btm = scroll_top + $(this).height();
        var effect_pos = scroll_btm - effect_btm;

        //エフェクトが発動したとき、子要素をずらしてフェードさせる
        $('.scroll-fade-row').each(function () {
            var this_pos = $(this).offset().top;
            if (effect_pos > this_pos) {
                $(this).css({
                    opacity: 1,
                    transform: 'translateY(0)'
                });
                $(this).children().each(function (i) {
                    $(this).delay(100 + i * 200).queue(function () {
                        $(this).css({
                            opacity: 1,
                            transform: 'translateY(0)'
                        }).dequeue();
                    });
                });
            }
        });
        $('.sl_r').css('opacity', 0);
        $('.sl_r').each(function () {
            var this_pos = $(this).offset().top;
            if (effect_pos > this_pos) {
                $(this).addClass('slidein_r');
            }
        });
        
        $('.sl_l').css('opacity', 0);
        $('.sl_l').each(function () {
            var this_pos = $(this).offset().top;
            if (effect_pos > this_pos) {
                $(this).addClass('slidein_l');
                console.log("反応してますよ！");
            }
        });
        
    });
    
});
