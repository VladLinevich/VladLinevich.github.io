/*function fadeOutModal() {
    $('.modal-box.show .modal-box_body').removeClass('fadeInUp').addClass('fadeOutUp');
    $('.modal-box.show').removeClass('fadeIn').addClass('fadeOut');
    setTimeout(function(){
        $('.modal-box.show').removeClass('show');
    },500);

};

$(document).keyup(function(e){


    if(e.keyCode == 27) {
        fadeOutModal();
    }
});

$('.modal-box_close, .modal-box_shadow').click(function(){
    fadeOutModal()
});*/

$(document).ready(function() {

    let $bigValueSlider = document.getElementById('slider-range'),
        step = 1000,
        minAmount = 1000,
        maxAmount = 80000;

    $('.calculator-box__amount').text(minAmount)

    if ($bigValueSlider) {
        noUiSlider.create($bigValueSlider, {
            start: [minAmount],
            step: step,
            behaviour: 'snap',
            connect: [true, false],
            format: wNumb({
                decimals: 0,
                thousand: ' '
            }),
            range: {
                'min': [minAmount],
                'max': [maxAmount]
            },
            pips: {
                mode: 'positions',
                values: [0,49.367,100],
                density: 10,
                stepped: false
            }
        });

        $bigValueSlider.noUiSlider.on('update', function(values, handle) {
            $('.calculator-box__amount').text(values[handle]);
        })
    }


    // $( ".steps-main-container" ).tabs({
    //     active: 0,
    //     show: { effect: "fade", duration: 300 }
    // });
    //
    // $( ".account-main-container" ).tabs();

    // toggleTabsOnAccountPage();

    // accountDataEditToggle();

    var $preloader = $('.loader__container');
    $preloader.fadeOut(500);
    $preloader.delay(500).fadeOut(500);
    setTimeout(function(){
        $preloader.remove();
    },1500);

    $('.questions-item:first-child').each(function(e){
        $(this).find('.question, .question__title').addClass('active');
        $(this).find('.question__text').addClass('in').attr('aria-expanded','true');
    });

    regStepsDone('.step-indicator__item','step-done');
});


    $('.question__title').click(function(){

        $('.question').each(function(){
            $(this).removeClass('active');
            $(this).find('.question__title').removeClass('active');
            $(this).find('.question__text.in').collapse('toggle')
        })

        let questionContainer = $(this).parents('.question');
        $(this).toggleClass('active');
        questionContainer.toggleClass('active');
        questionContainer.find('.question__text').collapse('toggle');
    });

    $(document).on('click', '.menu__login_btn-mobile, .menu__tab_back-ico', function(e){
        $('.menu__tab').each(function(){
            if($(this).hasClass('active')) {
                $(this).hide().removeClass('active');
            } else {
                $(this).slideDown().addClass('active');
                if ($(this).css('display') === 'block') {
                    $(this).css({'display':'flex'})
                }
            }
        })
    })

    $(document).on('click', '.footer-inner__foot-nav-link', function(e){
        $('.footer-inner__foot-nav-link').removeClass('active');
        $(this).addClass('active')
        let numContent = $(this).attr('data-footer-content');
        $('.footer-inner__content').each(function(e) {
            $('.footer-inner__content').removeClass('show');
            let list = $(this).find('.footer-inner__list');
            if (list.attr('data-footer-content') === numContent) {
                $('.footer-inner__content').hide()
                $(this).fadeIn()
            }
        })
    });


    $(document).on('click', '.footer-inner__title:not(.open, .social-box)', function(e){
        let winWidth = $(window).width();
        if (winWidth <= 767) {
            $('.footer-inner__title').removeClass('open')
            $(this).addClass('open');
            $('.footer-inner__list:not(.social-box__list)').slideUp();
            $(this).siblings('.footer-inner__list:not(.social-box__list)').slideDown()
        }
    });


    function refreshMenuStatus() {
        $('body').removeClass('shadow');
        $('.button-mobile__btn, .menu__tab').removeClass('active')
        $('.menu__tab').removeAttr('style');
        $('.menu__tab:first-child').addClass('active');
        $('.menu').removeAttr('style');
    }


    $(document).on('click', '.button-mobile__btn', function(e){
        $('body').toggleClass('shadow');
        $(this).toggleClass('active');
        $('.menu').slideToggle(500, function(){
            if($(this).css('display') === 'none') {
                refreshMenuStatus();
            }
            if ($(this).css('display') === 'block') {
                $(this).css({'display':'flex'});
            }
        });
    });

    $(document).on('click', '.seo-box__more', function(e){
        $('.seo-box__more').remove();
        $('.seo-box__text').removeClass('hidden-xs hidden-sm');
    });

    $(window).on('load resize', function(){
        let winWidth = $(this).width();
        if (winWidth > 767 && winWidth <= 991) {
            $('.footer-inner__list').each(function(){
                let child =  $(this).find('.footer-inner__list-item').length;
                if (child > 4) {
                    $(this).children().addClass('column-item')
                }
            })
        }
        if (winWidth > 991) {
            refreshMenuStatus()
        }
    })


    $('.select__inner').each(function(){
        let $box = $(this).siblings('.select__content');
        $(this).select2({
            dropdownParent: $box
        });
    })

    $('.article__pic').each(function(){
        let thisImgSrc = $(this).find('.article__img').attr('src');
        $(this).css({
            'background-image': 'url(' + thisImgSrc + ')'
        })
    });

    $('.article-prev__pic').each(function(){
        let thisImgSrc = $(this).find('.article-prev__img').attr('src');
        $(this).css({
            'background-image': 'url(' + thisImgSrc + ')'
        })
    });

    $('.tab-items__mobile-tab-arrow').click(function(){
        let parent = $(this).parent('.tab-items__list');
        parent.toggleClass('show');
    });


// $('.popup__close-btn').on('click', function() {
    //     let popup = $(this).parent();
    //     popup.fadeOut(400)
    // });


// function toggleTabsOnAccountPage(){
//
//     let container = $('.tab-items__list'),
//         allItems = container.find('.tab-items__item'),
//         itemActive = container.find('.ui-tabs-active'),
//         openTabBtn = container.find('.tab-items__mobile-tab-arrow');
//
//     openTabBtn.on('click', function(){
//         container.find('.tab-items__item').slideDown();
//     });
//
//     allItems.on('click', function(){
//
//         let item =  $(this);
//
//         if(item.hasClass('ui-tabs-active')){
//             return false
//         } else {
//
//         }
//
//     });
//     itemActive.show();
//
// };

function regStepsDone(elClass,addClass) {

    $(elClass).each(function(index, el){
            if($(el).hasClass('active')){
                console.log('ok');
                return false
            }   else {
                $(el).addClass(addClass);
            }
        });

}