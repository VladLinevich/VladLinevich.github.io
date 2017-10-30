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

    $('.toogle-list').on('click', function () {
        $(this).toggleClass('active');
        $('.navigation__item:not(".active")').slideToggle('fast');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJNZW51VG9nZ2xlIiwibWVudVN0YXRlIiwiaGFuZGxlU3dpcGVTdGF0ZSIsInRvZ2dsZSIsInN0YXRlIiwidHJWYWx1ZSIsIiQiLCJ3aW5kb3ciLCJ3aWR0aCIsImFuaW1hdGVUcmFuc2Zvcm0iLCJ0b2dnbGVDbGFzcyIsImNvbnNvbGUiLCJsb2ciLCJjbG9zZSIsIkxvZ2luVG9nZ2xlIiwibG9naW5TdGF0ZSIsImxvZ2luU3RhdGVUb2dnbGUiLCJsb2dpbiIsImZsYWciLCJmYWRlVG9nZ2xlIiwidGV4dCIsImRvY3VtZW50IiwicmVhZHkiLCJtb2RhbCIsImNsaWNrIiwic2Nyb2xsVG9wIiwiaGFzQ2xhc3MiLCJvbiIsInNsaWRlVG9nZ2xlIiwic3RhcnRYIiwiZGVsdGFYIiwiaXNMZWZ0U3dpcGUiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXRUb3VjaGVzIiwicGFnZVgiLCJNYXRoIiwic2lnbiIsImFicyIsInNsaWRlckFtb3VudCIsImdldEVsZW1lbnRCeUlkIiwic2xpZGVyUmFuZ2UiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJzdGVwIiwiYmVoYXZpb3VyIiwiY29ubmVjdCIsInJhbmdlIiwidGFiIiwidG9vbHRpcCIsInBsYWNlbWVudCIsImVhY2giLCIkYm94Iiwic2libGluZ3MiLCJmaW5kIiwic2VsZWN0MiIsImRyb3Bkb3duUGFyZW50IiwiYWRkQ2xhc3MiLCJzbGlkZURvd24iLCJyZW1vdmVDbGFzcyIsInNsaWRlVXAiLCJ0aGlzSW1nU3JjIiwiYXR0ciIsImNzcyIsIndpbk9mZnNldFRvcCIsInJlc2l6ZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxhQUFhO0FBQ2ZDLGVBQVcsS0FESTtBQUVmQyxzQkFBa0IsSUFGSDtBQUdmQyxZQUFRLGdCQUFTQyxLQUFULEVBQWdCO0FBQ3BCLGFBQUtILFNBQUwsR0FBaUJHLEtBQWpCOztBQUVBLFlBQUlD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dkJuRSxlQUFXYSxLQUFYO0FBQ0gsQ0FGRCIsImZpbGUiOiJjb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBNZW51VG9nZ2xlID0ge1xuICAgIG1lbnVTdGF0ZTogZmFsc2UsXG4gICAgaGFuZGxlU3dpcGVTdGF0ZTogdHJ1ZSxcbiAgICB0b2dnbGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgIHRoaXMubWVudVN0YXRlID0gc3RhdGU7XG5cbiAgICAgICAgbGV0IHRyVmFsdWU7XG4gICAgICAgIGlmKCQod2luZG93KS53aWR0aCgpIDwgNzY4KSB7XG4gICAgICAgICAgICB0clZhbHVlID0gMjcwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJWYWx1ZSA9IDYyNTtcbiAgICAgICAgfTtcblxuXG4gICAgICAgICQoJ2JvZHknKS5hbmltYXRlVHJhbnNmb3JtKFwidHJhbnNsYXRlWCgtXCIrdHJWYWx1ZStcInB4KVwiKTtcbiAgICAgICAgJCgnaHRtbCcpLnRvZ2dsZUNsYXNzKCd0b2dnbGUnKTtcbiAgICAgICAgLy8gJCgnI21haW5fbWVudScpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XG4gICAgICAgICQoJy5zaGFkb3ctdG9nZ2xlJykudG9nZ2xlKCk7XG4gICAgICAgICQoJy5mbHknKS50b2dnbGVDbGFzcygnZmx5aW5nJyk7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tZW51U3RhdGUpXG5cbiAgICAgICAgaWYoIXRoaXMubWVudVN0YXRlKSB7XG4gICAgICAgICAgICAkKCdib2R5JykuYW5pbWF0ZVRyYW5zZm9ybShcInRyYW5zbGF0ZVgoMClcIik7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm1lbnVTdGF0ZSlcbiAgICAgICAgfVxuXG4gICAgfSxcbiAgICBjbG9zZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vINCV0YHQu9C4INC80L7QsdC40LvRjNC90L7QtSDQvNC10L3RjiDQvtGC0LrRgNGL0YLQviAtINC30LDQutGA0YvRgtGMXG4gICAgICAgIGlmKE1lbnVUb2dnbGUubWVudVN0YXRlKSB7XG4gICAgICAgICAgICAkKCdib2R5JykuYW5pbWF0ZVRyYW5zZm9ybShcInRyYW5zbGF0ZVgoMClcIik7XG4gICAgICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZShmYWxzZSk7XG4gICAgICAgICAgICBNZW51VG9nZ2xlLmhhbmRsZVN3aXBlU3RhdGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuXG5jb25zdCBMb2dpblRvZ2dsZSA9IHtcbiAgICBsb2dpblN0YXRlOiB0cnVlLFxuICAgIGxvZ2luU3RhdGVUb2dnbGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMubG9naW4odGhpcy5sb2dpblN0YXRlKTtcbiAgICAgICAgdGhpcy5sb2dpblN0YXRlID0gIXRoaXMubG9naW5TdGF0ZTtcbiAgICB9LFxuICAgIGxvZ2luOiBmdW5jdGlvbihmbGFnKSB7XG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICQoJy5sb2dpbi1mb3JtLWJ0bicpLnRvZ2dsZUNsYXNzKCdidXR0b25fbGlnaHQgYnV0dG9uX2RhcmsnKTtcbiAgICAgICAgJCgnLmxvZ2luLWFyZWFfX3NoYWRvdywubG9naW4tYXJlYV9faW5uZXInKS5mYWRlVG9nZ2xlKCk7XG4gICAgICAgIGlmKCFmbGFnKSB7XG4gICAgICAgICAgICAkKCcubG9naW4tZm9ybS1idG4nKS50ZXh0KCfQktC+0LnRgtC4Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcubG9naW4tZm9ybS1idG4nKS50ZXh0KCfQodC60YDRi9GC0YwnKTtcbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG5cbiAgICAkKCcjbW9kYWxfMScpLm1vZGFsKCk7XG5cbiAgICAkKCcubW9iaWxlLW1lbnVfY2xvc2UnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKDApO1xuICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZSgpO1xuICAgICAgICBMb2dpblRvZ2dsZS5sb2dpblN0YXRlVG9nZ2xlKCk7XG4gICAgfSk7XG5cbiAgICAkKCcubG9naW4tZm9ybV90b2dnbGUnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICBMb2dpblRvZ2dsZS5sb2dpblN0YXRlVG9nZ2xlKCk7XG4gICAgfSk7XG5cbiAgICAkKCcubWVudS10b2dnbGUnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdzaGFkb3ctdG9nZ2xlJykpIHtcbiAgICAgICAgICAgIE1lbnVUb2dnbGUudG9nZ2xlKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIE1lbnVUb2dnbGUudG9nZ2xlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIE1lbnVUb2dnbGUuaGFuZGxlU3dpcGVTdGF0ZSA9IHRydWU7XG5cbiAgICB9KTtcblxuICAgICQoJy50b29nbGUtbGlzdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgJCgnLm5hdmlnYXRpb25fX2l0ZW06bm90KFwiLmFjdGl2ZVwiKScpLnNsaWRlVG9nZ2xlKCdmYXN0JylcbiAgICB9KTtcblxuICAgIGxldCBzdGFydFggPSBudWxsO1xuICAgIGxldCBkZWx0YVggPSBudWxsO1xuICAgIGxldCBoYW5kbGVTd2lwZVN0YXRlID0gdHJ1ZTtcbiAgICBsZXQgaXNMZWZ0U3dpcGUgPSBmYWxzZTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHN0YXJ0WCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGRlbHRhWCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIHN0YXJ0WDtcbiAgICAgICAgICAgIGlzTGVmdFN3aXBlID0gTWF0aC5zaWduKGRlbHRhWCkgPT09IDE7XG5cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhkZWx0YVgpID49IDUwICYmIGhhbmRsZVN3aXBlU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNMZWZ0U3dpcGUgJiYgTWVudVRvZ2dsZS5tZW51U3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWVudVRvZ2dsZS50b2dnbGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBNZW51VG9nZ2xlLmNsb3NlKClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpc0xlZnRTd2lwZSAmJiAhTWVudVRvZ2dsZS5tZW51U3RhdGUgJiYgTG9naW5Ub2dnbGUubG9naW5TdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBNZW51VG9nZ2xlLmhhbmRsZVN3aXBlU3RhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIE1lbnVUb2dnbGUuaGFuZGxlU3dpcGVTdGF0ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICBsZXQgc2xpZGVyQW1vdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcl9hbW91bnQnKTtcbiAgICBsZXQgc2xpZGVyUmFuZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyX3JhbmdlJyk7XG5cbiAgICBpZihzbGlkZXJBbW91bnQpIHtcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyQW1vdW50LCB7XG4gICAgICAgICAgICBzdGFydDogMTAwMCxcbiAgICAgICAgICAgIHN0ZXA6IDEwMDAsXG4gICAgICAgICAgICBiZWhhdmlvdXI6ICdzbmFwJyxcbiAgICAgICAgICAgIGNvbm5lY3Q6IFt0cnVlLCBmYWxzZV0sXG4gICAgICAgICAgICAvLyBmb3JtYXQ6IHdOdW1iKHtcbiAgICAgICAgICAgIC8vICAgICBkZWNpbWFsczogMCxcbiAgICAgICAgICAgIC8vICAgICB0aG91c2FuZDogJyAnXG4gICAgICAgICAgICAvLyB9KSxcbiAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgJ21pbic6IDEwMDAsXG4gICAgICAgICAgICAgICAgJ21heCc6IDgwMDAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gcGlwczoge1xuICAgICAgICAgICAgLy8gICAgIG1vZGU6ICdwb3NpdGlvbnMnLFxuICAgICAgICAgICAgLy8gICAgIHZhbHVlczogWzAsNTAsMTAwXSxcbiAgICAgICAgICAgIC8vICAgICBkZW5zaXR5OiAxMCxcbiAgICAgICAgICAgIC8vICAgICBzdGVwcGVkOiBmYWxzZVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZihzbGlkZXJSYW5nZSkge1xuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXJSYW5nZSwge1xuICAgICAgICAgICAgc3RhcnQ6IDEsXG4gICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgYmVoYXZpb3VyOiAnc25hcCcsXG4gICAgICAgICAgICBjb25uZWN0OiBbdHJ1ZSwgZmFsc2VdLFxuICAgICAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICAgICAgICAnbWluJzogMSxcbiAgICAgICAgICAgICAgICAnbWF4JzogNFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkKCcubmF2aWdhdGlvbl9fbGlzdCBhJykudGFiKClcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtwbGFjZW1lbnQ6IFwiYm90dG9tXCJ9KTtcblxuXG5cbiAgICAkKCcuc2VsZWN0X19pbm5lcicpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0ICRib3ggPSAkKHRoaXMpLnNpYmxpbmdzKCcuaW5wdXQtd3JhcCcpLmZpbmQoJy5zZWxlY3RfX2NvbnRlbnQnKTtcbiAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcbiAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkYm94XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgICAvLyBxdWVzdGlvbiBpdGVtc1xuICAgICQoJy5xdWVzdGlvbi1jb250YWluZXIgLnF1ZXN0aW9uOmZpcnN0LWNoaWxkJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmZpbmQoJy5xdWVzdGlvbl9faGVhZGVyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKHRoaXMpLmZpbmQoJy5xdWVzdGlvbl9fdGV4dCcpLnNsaWRlRG93bigzMDApO1xuICAgIH0pO1xuXG5cbiAgICAvLyBvcGVuIHF1ZXN0aW9uIGl0ZW1zXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5xdWVzdGlvbl9faGVhZGVyOm5vdCguYWN0aXZlKScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLnF1ZXN0aW9uX19oZWFkZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJCgnLnF1ZXN0aW9uX190ZXh0JykpLnNsaWRlVXAoMzAwKTtcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJCgnLnF1ZXN0aW9uX190ZXh0JykpLnNsaWRlVG9nZ2xlKDMwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8vYXJ0aWNsZSBwaWN0dXJlXG4gICAgJCgnLmFydGljbGVfX3BpYycpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgbGV0IHRoaXNJbWdTcmMgPSAkKHRoaXMpLmZpbmQoJy5hcnRpY2xlX19pbWcnKS5hdHRyKCdzcmMnKTtcbiAgICAgICAgJCh0aGlzKS5jc3Moe1xuICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyB0aGlzSW1nU3JjICsgJyknXG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICAvL2FydGljbGVzIHBpY3R1cmVcbiAgICAkKCcuYXJ0aWNsZS1wcmV2X19waWMnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIGxldCB0aGlzSW1nU3JjID0gJCh0aGlzKS5maW5kKCcuYXJ0aWNsZS1wcmV2X19pbWcnKS5hdHRyKCdzcmMnKTtcbiAgICAgICAgJCh0aGlzKS5jc3Moe1xuICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyB0aGlzSW1nU3JjICsgJyknXG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2xvYWRlcicpO1xuICAgIC8vIHRlc3RcblxufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdzY3JvbGwgcmVhZHknLGZ1bmN0aW9uKCl7XG4gICAgbGV0IHdpbk9mZnNldFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAvLyAkKCcjbWFpbl9tZW51JykuY3NzKCd0b3AnLHdpbk9mZnNldFRvcClcbiAgICAkKCcubWVudV9fdG9wLWxpc3RlbmVyJykuY3NzKCd0b3AnLHdpbk9mZnNldFRvcClcbn0pO1xuXG5cbiQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcbiAgICBNZW51VG9nZ2xlLmNsb3NlKClcbn0pO1xuXG4iXX0=
