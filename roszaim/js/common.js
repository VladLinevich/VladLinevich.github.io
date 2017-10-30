const MenuToggle = {
    menuState: false,
    handleSwipeState: true,
    toggle: function(state) {
        this.menuState = state;

        let trValue;
        if($(window).width() < 768) {
            trValue = 270;
        } else {
            trValue = 625;
        };


        $('body').animateTransform("translateX(-"+trValue+"px)");
        $('html').toggleClass('toggle');
        // $('#main_menu').toggleClass('show');
        $('.shadow-toggle').toggle();
        $('.fly').toggleClass('flying');

        console.log(this.menuState)

        if(!this.menuState) {
            $('body').animateTransform("translateX(0)");
            // console.log(this.menuState)
        }

    },
    close: function() {
        // Если мобильное меню открыто - закрыть
        if(MenuToggle.menuState) {
            $('body').animateTransform("translateX(0)");
            MenuToggle.toggle(false);
            MenuToggle.handleSwipeState = true;
        }
    }
};


const LoginToggle = {
    loginState: true,
    loginStateToggle: function(){
        this.login(this.loginState);
        this.loginState = !this.loginState;
    },
    login: function(flag) {
        $('body').toggleClass('overflow-hidden');
        $('.login-form-btn').toggleClass('button_light button_dark');
        $('.login-area__shadow,.login-area__inner').fadeToggle();
        if(!flag) {
            $('.login-form-btn').text('Войти');
        } else {
            $('.login-form-btn').text('Скрыть');
        };
    }
};


$(document).ready(function(){

    $('#modal_1').modal();

    $('.mobile-menu_close').click(function(){
        $(window).scrollTop(0);
        MenuToggle.toggle();
        LoginToggle.loginStateToggle();
    });

    $('.login-form_toggle').click(function(){
        LoginToggle.loginStateToggle();
    });

    $('.menu-toggle').click(function(){
        if($(this).hasClass('shadow-toggle')) {
            MenuToggle.toggle(false);
        } else {
            MenuToggle.toggle(true);
        }
        MenuToggle.handleSwipeState = true;

    });

    let startX = null;
    let deltaX = null;
    let handleSwipeState = true;
    let isLeftSwipe = false;

    document.querySelector('html').addEventListener('touchstart', function(e){
        startX = e.targetTouches[0].pageX;
        this.addEventListener('touchmove', function(e){
            deltaX = e.targetTouches[0].pageX - startX;
            isLeftSwipe = Math.sign(deltaX) === 1;

            if (Math.abs(deltaX) >= 50 && handleSwipeState) {
                if (isLeftSwipe && MenuToggle.menuState) {
                    // MenuToggle.toggle(false);
                    MenuToggle.close()
                } else if (!isLeftSwipe && !MenuToggle.menuState && LoginToggle.loginState) {
                    MenuToggle.toggle(true);
                }

                // MenuToggle.handleSwipeState = false;
            }
        });

        this.addEventListener('touchend', function () {
            MenuToggle.handleSwipeState = true;
        });
    });


    let sliderAmount = document.getElementById('slider_amount');
    let sliderRange = document.getElementById('slider_range');

    if(sliderAmount) {
        noUiSlider.create(sliderAmount, {
            start: 1000,
            step: 1000,
            behaviour: 'snap',
            connect: [true, false],
            // format: wNumb({
            //     decimals: 0,
            //     thousand: ' '
            // }),
            range: {
                'min': 1000,
                'max': 80000
            },
            // pips: {
            //     mode: 'positions',
            //     values: [0,50,100],
            //     density: 10,
            //     stepped: false
            // }
        });
    }

    if(sliderRange) {
        noUiSlider.create(sliderRange, {
            start: 1,
            step: 1,
            behaviour: 'snap',
            connect: [true, false],
            range: {
                'min': 1,
                'max': 4
            }
        });
    }

    $('.navigation__list a').tab()

    $('[data-toggle="tooltip"]').tooltip({placement: "bottom"});
    // $('.navigation__list a').click(function(){
    //     $('.navigation__link').removeClass('active');
    //     // $(this).tab('show').addClass('active');
    // });


    $('.select__inner').each(function(){
        let $box = $(this).siblings('.input-wrap').find('.select__content');
        $(this).select2({
            dropdownParent: $box
        });
    });


    // question items
    $('.question-container .question:first-child').each(function(){
        $(this).find('.question__header').addClass('active');
        $(this).find('.question__text').slideDown(300);
    });

    // numbering block of picture items
    $('.pictures-block .item-block').each(function(){
        let num = $(this).index() + 1;
        if(num > 9) {
            $(this).find('.item-block__pic-number').text(num);
        } else {
            $(this).find('.item-block__pic-number').text(num);
        }
    });

    // open question items
    $(document).on('click', '.question__header:not(.active)', function () {
        $('.question__header').removeClass('active').siblings($('.question__text')).slideUp(300);
        $(this).addClass('active').siblings($('.question__text')).slideToggle(300);
        return false;
    });

    //article picture
    $('.article__pic').each(function(){
        let thisImgSrc = $(this).find('.article__img').attr('src');
        $(this).css({
            'background-image': 'url(' + thisImgSrc + ')'
        })
    });

    //articles picture
    $('.article-prev__pic').each(function(){
        let thisImgSrc = $(this).find('.article-prev__img').attr('src');
        $(this).css({
            'background-image': 'url(' + thisImgSrc + ')'
        })
    });

    $('body').removeClass('loader');
    // test

});

$(document).on('scroll ready',function(){
    let winOffsetTop = $(window).scrollTop();
    // $('#main_menu').css('top',winOffsetTop)
    $('.menu__top-listener').css('top',winOffsetTop)
});


$(window).resize(function(){
    MenuToggle.close()
});

