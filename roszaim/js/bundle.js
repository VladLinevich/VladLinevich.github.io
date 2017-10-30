"use strict";

var MenuToggle = {
    menuState: false,
    handleSwipeState: true,
    toggle: function toggle(state) {
        this.menuState = state;

        var trValue = void 0;
        if ($(window).width() < 768) {
            trValue = 270;
        } else {
            trValue = 625;
        };

        $('body').animateTransform("translateX(-" + trValue + "px)");
        $('html').toggleClass('toggle');
        // $('#main_menu').toggleClass('show');
        $('.shadow-toggle').toggle();
        $('.fly').toggleClass('flying');

        console.log(this.menuState);

        if (!this.menuState) {
            $('body').animateTransform("translateX(0)");
            // console.log(this.menuState)
        }
    },
    close: function close() {
        // Если мобильное меню открыто - закрыть
        if (MenuToggle.menuState) {
            $('body').animateTransform("translateX(0)");
            MenuToggle.toggle(false);
            MenuToggle.handleSwipeState = true;
        }
    }
};

var LoginToggle = {
    loginState: true,
    loginStateToggle: function loginStateToggle() {
        this.login(this.loginState);
        this.loginState = !this.loginState;
    },
    login: function login(flag) {
        $('body').toggleClass('overflow-hidden');
        $('.login-form-btn').toggleClass('button_light button_dark');
        $('.login-area__shadow,.login-area__inner').fadeToggle();
        if (!flag) {
            $('.login-form-btn').text('Войти');
        } else {
            $('.login-form-btn').text('Скрыть');
        };
    }
};

$(document).ready(function () {

    $('#modal_1').modal();

    $('.mobile-menu_close').click(function () {
        $(window).scrollTop(0);
        MenuToggle.toggle();
        LoginToggle.loginStateToggle();
    });

    $('.login-form_toggle').click(function () {
        LoginToggle.loginStateToggle();
    });

    $('.menu-toggle').click(function () {
        if ($(this).hasClass('shadow-toggle')) {
            MenuToggle.toggle(false);
        } else {
            MenuToggle.toggle(true);
        }
        MenuToggle.handleSwipeState = true;
    });

    var startX = null;
    var deltaX = null;
    var handleSwipeState = true;
    var isLeftSwipe = false;

    document.querySelector('html').addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        this.addEventListener('touchmove', function (e) {
            deltaX = e.targetTouches[0].pageX - startX;
            isLeftSwipe = Math.sign(deltaX) === 1;

            if (Math.abs(deltaX) >= 50 && handleSwipeState) {
                if (isLeftSwipe && MenuToggle.menuState) {
                    // MenuToggle.toggle(false);
                    MenuToggle.close();
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

    var sliderAmount = document.getElementById('slider_amount');
    var sliderRange = document.getElementById('slider_range');

    if (sliderAmount) {
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
            }
            // pips: {
            //     mode: 'positions',
            //     values: [0,50,100],
            //     density: 10,
            //     stepped: false
            // }
        });
    }

    if (sliderRange) {
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

    $('.navigation__list a').tab();

    $('[data-toggle="tooltip"]').tooltip({ placement: "bottom" });
    // $('.navigation__list a').click(function(){
    //     $('.navigation__link').removeClass('active');
    //     // $(this).tab('show').addClass('active');
    // });


    $('.select__inner').each(function () {
        var $box = $(this).siblings('.input-wrap').find('.select__content');
        $(this).select2({
            dropdownParent: $box
        });
    });

    // question items
    $('.question-container .question:first-child').each(function () {
        $(this).find('.question__header').addClass('active');
        $(this).find('.question__text').slideDown(300);
    });

    // numbering block of picture items
    $('.pictures-block .item-block').each(function () {
        var num = $(this).index() + 1;
        if (num > 9) {
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
    $('.article__pic').each(function () {
        var thisImgSrc = $(this).find('.article__img').attr('src');
        $(this).css({
            'background-image': 'url(' + thisImgSrc + ')'
        });
    });

    //articles picture
    $('.article-prev__pic').each(function () {
        var thisImgSrc = $(this).find('.article-prev__img').attr('src');
        $(this).css({
            'background-image': 'url(' + thisImgSrc + ')'
        });
    });

    $('body').removeClass('loader');
    // test
});

$(document).on('scroll ready', function () {
    var winOffsetTop = $(window).scrollTop();
    // $('#main_menu').css('top',winOffsetTop)
    $('.menu__top-listener').css('top', winOffsetTop);
});

$(window).resize(function () {
    MenuToggle.close();
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJNZW51VG9nZ2xlIiwibWVudVN0YXRlIiwiaGFuZGxlU3dpcGVTdGF0ZSIsInRvZ2dsZSIsInN0YXRlIiwidHJWYWx1ZSIsIiQiLCJ3aW5kb3ciLCJ3aWR0aCIsImFuaW1hdGVUcmFuc2Zvcm0iLCJ0b2dnbGVDbGFzcyIsImNvbnNvbGUiLCJsb2ciLCJjbG9zZSIsIkxvZ2luVG9nZ2xlIiwibG9naW5TdGF0ZSIsImxvZ2luU3RhdGVUb2dnbGUiLCJsb2dpbiIsImZsYWciLCJmYWRlVG9nZ2xlIiwidGV4dCIsImRvY3VtZW50IiwicmVhZHkiLCJtb2RhbCIsImNsaWNrIiwic2Nyb2xsVG9wIiwiaGFzQ2xhc3MiLCJzdGFydFgiLCJkZWx0YVgiLCJpc0xlZnRTd2lwZSIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldFRvdWNoZXMiLCJwYWdlWCIsIk1hdGgiLCJzaWduIiwiYWJzIiwic2xpZGVyQW1vdW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzbGlkZXJSYW5nZSIsIm5vVWlTbGlkZXIiLCJjcmVhdGUiLCJzdGFydCIsInN0ZXAiLCJiZWhhdmlvdXIiLCJjb25uZWN0IiwicmFuZ2UiLCJ0YWIiLCJ0b29sdGlwIiwicGxhY2VtZW50IiwiZWFjaCIsIiRib3giLCJzaWJsaW5ncyIsImZpbmQiLCJzZWxlY3QyIiwiZHJvcGRvd25QYXJlbnQiLCJhZGRDbGFzcyIsInNsaWRlRG93biIsIm51bSIsImluZGV4Iiwib24iLCJyZW1vdmVDbGFzcyIsInNsaWRlVXAiLCJzbGlkZVRvZ2dsZSIsInRoaXNJbWdTcmMiLCJhdHRyIiwiY3NzIiwid2luT2Zmc2V0VG9wIiwicmVzaXplIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLGFBQWE7QUFDZkMsZUFBVyxLQURJO0FBRWZDLHNCQUFrQixJQUZIO0FBR2ZDLFlBQVEsZ0JBQVNDLEtBQVQsRUFBZ0I7QUFDcEIsYUFBS0gsU0FBTCxHQUFpQkcsS0FB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ZSxjQUFmLEVBQThCLFlBQVU7QUFDcEMsUUFBSU8sZUFBZTlELEVBQUVDLE1BQUYsRUFBVWtCLFNBQVYsRUFBbkI7QUFDQTtBQUNBbkIsTUFBRSxxQkFBRixFQUF5QjZELEdBQXpCLENBQTZCLEtBQTdCLEVBQW1DQyxZQUFuQztBQUNILENBSkQ7O0FBT0E5RCxFQUFFQyxNQUFGLEVBQVU4RCxNQUFWLENBQWlCLFlBQVU7QUFDdkJyRSxlQUFXYSxLQUFYO0FBQ0gsQ0FGRCIsImZpbGUiOiJjb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBNZW51VG9nZ2xlID0ge1xuICAgIG1lbnVTdGF0ZTogZmFsc2UsXG4gICAgaGFuZGxlU3dpcGVTdGF0ZTogdHJ1ZSxcbiAgICB0b2dnbGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgIHRoaXMubWVudVN0YXRlID0gc3RhdGU7XG5cbiAgICAgICAgbGV0IHRyVmFsdWU7XG4gICAgICAgIGlmKCQod2luZG93KS53aWR0aCgpIDwgNzY4KSB7XG4gICAgICAgICAgICB0clZhbHVlID0gMjcwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJWYWx1ZSA9IDYyNTtcbiAgICAgICAgfTtcblxuXG4gICAgICAgICQoJ2JvZHknKS5hbmltYXRlVHJhbnNmb3JtKFwidHJhbnNsYXRlWCgtXCIrdHJWYWx1ZStcInB4KVwiKTtcbiAgICAgICAgJCgnaHRtbCcpLnRvZ2dsZUNsYXNzKCd0b2dnbGUnKTtcbiAgICAgICAgLy8gJCgnI21haW5fbWVudScpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XG4gICAgICAgICQoJy5zaGFkb3ctdG9nZ2xlJykudG9nZ2xlKCk7XG4gICAgICAgICQoJy5mbHknKS50b2dnbGVDbGFzcygnZmx5aW5nJyk7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tZW51U3RhdGUpXG5cbiAgICAgICAgaWYoIXRoaXMubWVudVN0YXRlKSB7XG4gICAgICAgICAgICAkKCdib2R5JykuYW5pbWF0ZVRyYW5zZm9ybShcInRyYW5zbGF0ZVgoMClcIik7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm1lbnVTdGF0ZSlcbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vINCV0YHQu9C4INC80L7QsdC40LvRjNC90L7QtSDQvNC10L3RjiDQvtGC0LrRgNGL0YLQviAtINC30LDQutGA0YvRgtGMXG4gICAgICAgIGlmKE1lbnVUb2dnbGUubWVudVN0YXRlKSB7XG4gICAgICAgICAgICAkKCdib2R5JykuYW5pbWF0ZVRyYW5zZm9ybShcInRyYW5zbGF0ZVgoMClcIik7XG4gICAgICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZShmYWxzZSk7XG4gICAgICAgICAgICBNZW51VG9nZ2xlLmhhbmRsZVN3aXBlU3RhdGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuXG5jb25zdCBMb2dpblRvZ2dsZSA9IHtcbiAgICBsb2dpblN0YXRlOiB0cnVlLFxuICAgIGxvZ2luU3RhdGVUb2dnbGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMubG9naW4odGhpcy5sb2dpblN0YXRlKTtcbiAgICAgICAgdGhpcy5sb2dpblN0YXRlID0gIXRoaXMubG9naW5TdGF0ZTtcbiAgICB9LFxuICAgIGxvZ2luOiBmdW5jdGlvbihmbGFnKSB7XG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICQoJy5sb2dpbi1mb3JtLWJ0bicpLnRvZ2dsZUNsYXNzKCdidXR0b25fbGlnaHQgYnV0dG9uX2RhcmsnKTtcbiAgICAgICAgJCgnLmxvZ2luLWFyZWFfX3NoYWRvdywubG9naW4tYXJlYV9faW5uZXInKS5mYWRlVG9nZ2xlKCk7XG4gICAgICAgIGlmKCFmbGFnKSB7XG4gICAgICAgICAgICAkKCcubG9naW4tZm9ybS1idG4nKS50ZXh0KCfQktC+0LnRgtC4Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcubG9naW4tZm9ybS1idG4nKS50ZXh0KCfQodC60YDRi9GC0YwnKTtcbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cbiAgICAkKCcjbW9kYWxfMScpLm1vZGFsKCk7XG5cbiAgICAkKCcubW9iaWxlLW1lbnVfY2xvc2UnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKDApO1xuICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZSgpO1xuICAgICAgICBMb2dpblRvZ2dsZS5sb2dpblN0YXRlVG9nZ2xlKCk7XG4gICAgfSk7XG5cbiAgICAkKCcubG9naW4tZm9ybV90b2dnbGUnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICBMb2dpblRvZ2dsZS5sb2dpblN0YXRlVG9nZ2xlKCk7XG4gICAgfSk7XG5cbiAgICAkKCcubWVudS10b2dnbGUnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdzaGFkb3ctdG9nZ2xlJykpIHtcbiAgICAgICAgICAgIE1lbnVUb2dnbGUudG9nZ2xlKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE1lbnVUb2dnbGUudG9nZ2xlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIE1lbnVUb2dnbGUuaGFuZGxlU3dpcGVTdGF0ZSA9IHRydWU7XG5cbiAgICB9KTtcblxuICAgIGxldCBzdGFydFggPSBudWxsO1xuICAgIGxldCBkZWx0YVggPSBudWxsO1xuICAgIGxldCBoYW5kbGVTd2lwZVN0YXRlID0gdHJ1ZTtcbiAgICBsZXQgaXNMZWZ0U3dpcGUgPSBmYWxzZTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHN0YXJ0WCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGRlbHRhWCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIHN0YXJ0WDtcbiAgICAgICAgICAgIGlzTGVmdFN3aXBlID0gTWF0aC5zaWduKGRlbHRhWCkgPT09IDE7XG5cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZWx0YVgpID49IDUwICYmIGhhbmRsZVN3aXBlU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNMZWZ0U3dpcGUgJiYgTWVudVRvZ2dsZS5tZW51U3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWVudVRvZ2dsZS50b2dnbGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBNZW51VG9nZ2xlLmNsb3NlKClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpc0xlZnRTd2lwZSAmJiAhTWVudVRvZ2dsZS5tZW51U3RhdGUgJiYgTG9naW5Ub2dnbGUubG9naW5TdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBNZW51VG9nZ2xlLmhhbmRsZVN3aXBlU3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIE1lbnVUb2dnbGUuaGFuZGxlU3dpcGVTdGF0ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBsZXQgc2xpZGVyQW1vdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcl9hbW91bnQnKTtcbiAgICBsZXQgc2xpZGVyUmFuZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyX3JhbmdlJyk7XG5cbiAgICBpZihzbGlkZXJBbW91bnQpIHtcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyQW1vdW50LCB7XG4gICAgICAgICAgICBzdGFydDogMTAwMCxcbiAgICAgICAgICAgIHN0ZXA6IDEwMDAsXG4gICAgICAgICAgICBiZWhhdmlvdXI6ICdzbmFwJyxcbiAgICAgICAgICAgIGNvbm5lY3Q6IFt0cnVlLCBmYWxzZV0sXG4gICAgICAgICAgICAvLyBmb3JtYXQ6IHdOdW1iKHtcbiAgICAgICAgICAgIC8vICAgICBkZWNpbWFsczogMCxcbiAgICAgICAgICAgIC8vICAgICB0aG91c2FuZDogJyAnXG4gICAgICAgICAgICAvLyB9KSxcbiAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgJ21pbic6IDEwMDAsXG4gICAgICAgICAgICAgICAgJ21heCc6IDgwMDAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gcGlwczoge1xuICAgICAgICAgICAgLy8gICAgIG1vZGU6ICdwb3NpdGlvbnMnLFxuICAgICAgICAgICAgLy8gICAgIHZhbHVlczogWzAsNTAsMTAwXSxcbiAgICAgICAgICAgIC8vICAgICBkZW5zaXR5OiAxMCxcbiAgICAgICAgICAgIC8vICAgICBzdGVwcGVkOiBmYWxzZVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZihzbGlkZXJSYW5nZSkge1xuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXJSYW5nZSwge1xuICAgICAgICAgICAgc3RhcnQ6IDEsXG4gICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgYmVoYXZpb3VyOiAnc25hcCcsXG4gICAgICAgICAgICBjb25uZWN0OiBbdHJ1ZSwgZmFsc2VdLFxuICAgICAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICAgICAgICAnbWluJzogMSxcbiAgICAgICAgICAgICAgICAnbWF4JzogNFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkKCcubmF2aWdhdGlvbl9fbGlzdCBhJykudGFiKClcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtwbGFjZW1lbnQ6IFwiYm90dG9tXCJ9KTtcbiAgICAvLyAkKCcubmF2aWdhdGlvbl9fbGlzdCBhJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAvLyAgICAgJCgnLm5hdmlnYXRpb25fX2xpbmsnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgLy8gICAgIC8vICQodGhpcykudGFiKCdzaG93JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIC8vIH0pO1xuXG5cbiAgICAkKCcuc2VsZWN0X19pbm5lcicpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0ICRib3ggPSAkKHRoaXMpLnNpYmxpbmdzKCcuaW5wdXQtd3JhcCcpLmZpbmQoJy5zZWxlY3RfX2NvbnRlbnQnKTtcbiAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkYm94XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICAvLyBxdWVzdGlvbiBpdGVtc1xuICAgICQoJy5xdWVzdGlvbi1jb250YWluZXIgLnF1ZXN0aW9uOmZpcnN0LWNoaWxkJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmZpbmQoJy5xdWVzdGlvbl9faGVhZGVyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKHRoaXMpLmZpbmQoJy5xdWVzdGlvbl9fdGV4dCcpLnNsaWRlRG93bigzMDApO1xuICAgIH0pO1xuXG4gICAgLy8gbnVtYmVyaW5nIGJsb2NrIG9mIHBpY3R1cmUgaXRlbXNcbiAgICAkKCcucGljdHVyZXMtYmxvY2sgLml0ZW0tYmxvY2snKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIGxldCBudW0gPSAkKHRoaXMpLmluZGV4KCkgKyAxO1xuICAgICAgICBpZihudW0gPiA5KSB7XG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5pdGVtLWJsb2NrX19waWMtbnVtYmVyJykudGV4dChudW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuaXRlbS1ibG9ja19fcGljLW51bWJlcicpLnRleHQobnVtKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gb3BlbiBxdWVzdGlvbiBpdGVtc1xuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcucXVlc3Rpb25fX2hlYWRlcjpub3QoLmFjdGl2ZSknLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy5xdWVzdGlvbl9faGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCQoJy5xdWVzdGlvbl9fdGV4dCcpKS5zbGlkZVVwKDMwMCk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCQoJy5xdWVzdGlvbl9fdGV4dCcpKS5zbGlkZVRvZ2dsZSgzMDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvL2FydGljbGUgcGljdHVyZVxuICAgICQoJy5hcnRpY2xlX19waWMnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIGxldCB0aGlzSW1nU3JjID0gJCh0aGlzKS5maW5kKCcuYXJ0aWNsZV9faW1nJykuYXR0cignc3JjJyk7XG4gICAgICAgICQodGhpcykuY3NzKHtcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdGhpc0ltZ1NyYyArICcpJ1xuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgLy9hcnRpY2xlcyBwaWN0dXJlXG4gICAgJCgnLmFydGljbGUtcHJldl9fcGljJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICBsZXQgdGhpc0ltZ1NyYyA9ICQodGhpcykuZmluZCgnLmFydGljbGUtcHJldl9faW1nJykuYXR0cignc3JjJyk7XG4gICAgICAgICQodGhpcykuY3NzKHtcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdGhpc0ltZ1NyYyArICcpJ1xuICAgICAgICB9KVxuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkZXInKTtcbiAgICAvLyB0ZXN0XG5cbn0pO1xuXG4kKGRvY3VtZW50KS5vbignc2Nyb2xsIHJlYWR5JyxmdW5jdGlvbigpe1xuICAgIGxldCB3aW5PZmZzZXRUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgLy8gJCgnI21haW5fbWVudScpLmNzcygndG9wJyx3aW5PZmZzZXRUb3ApXG4gICAgJCgnLm1lbnVfX3RvcC1saXN0ZW5lcicpLmNzcygndG9wJyx3aW5PZmZzZXRUb3ApXG59KTtcblxuXG4kKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgTWVudVRvZ2dsZS5jbG9zZSgpXG59KTtcblxuIl19
