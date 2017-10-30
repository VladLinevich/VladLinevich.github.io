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

        if (!this.menuState) {
            $('body').animateTransform("translateX(0)");
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

    $('#modal_2').modal();

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
                    MenuToggle.toggle(false);
                } else if (!isLeftSwipe && !MenuToggle.menuState && LoginToggle.loginState) {
                    MenuToggle.toggle(true);
                }

                MenuToggle.handleSwipeState = false;
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

    // $(document).on('click','.shadow-toggle',function(){
    //     MenuToggle.toggle(false)
    // });


    // question items
    $('.question-container .question:first-child').each(function () {
        $(this).find('.question__header').addClass('active');
        $(this).find('.question__text').slideDown(300);
    });

    // numbering question items
    $('.question-container .question').each(function () {
        var num = $(this).index() + 1;
        if (num > 9) {
            $(this).find('.question__number').text(num);
        } else {
            $(this).find('.question__number').text('0' + num);
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
});

$(document).on('scroll ready', function () {
    var winOffsetTop = $(window).scrollTop();
    // $('#main_menu').css('top',winOffsetTop)
    $('.menu__top-listener').css('top', winOffsetTop);
});

// $(document).on('pagecreate', function(event){
//     $(document).on('swipeleft swiperight', function() {
//         if($(window).width() < 992) {
//             MenuToggle.open()
//         }
//     });
// });


// $(document).on('mobileinit', function () {
//     $.mobile.ignoreContentEnabled = true;
// });
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJNZW51VG9nZ2xlIiwibWVudVN0YXRlIiwiaGFuZGxlU3dpcGVTdGF0ZSIsInRvZ2dsZSIsInN0YXRlIiwidHJWYWx1ZSIsIiQiLCJ3aW5kb3ciLCJ3aWR0aCIsImFuaW1hdGVUcmFuc2Zvcm0iLCJ0b2dnbGVDbGFzcyIsIkxvZ2luVG9nZ2xlIiwibG9naW5TdGF0ZSIsImxvZ2luU3RhdGVUb2dnbGUiLCJsb2dpbiIsImZsYWciLCJmYWRlVG9nZ2xlIiwidGV4dCIsImRvY3VtZW50IiwicmVhZHkiLCJtb2RhbCIsImNsaWNrIiwic2Nyb2xsVG9wIiwiaGFzQ2xhc3MiLCJzdGFydFgiLCJkZWx0YVgiLCJpc0xlZnRTd2lwZSIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldFRvdWNoZXMiLCJwYWdlWCIsIk1hdGgiLCJzaWduIiwiYWJzIiwic2xpZGVyQW1vdW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzbGlkZXJSYW5nZSIsIm5vVWlTbGlkZXIiLCJjcmVhdGUiLCJzdGFydCIsInN0ZXAiLCJiZWhhdmlvdXIiLCJjb25uZWN0IiwicmFuZ2UiLCJ0YWIiLCJ0b29sdGlwIiwicGxhY2VtZW50IiwiZWFjaCIsIiRib3giLCJzaWJsaW5ncyIsImZpbmQiLCJzZWxlY3QyIiwiZHJvcGRvd25QYXJlbnQiLCJhZGRDbGFzcyIsInNsaWRlRG93biIsIm51bSIsImluZGV4Iiwib24iLCJyZW1vdmVDbGFzcyIsInNsaWRlVXAiLCJzbGlkZVRvZ2dsZSIsInRoaXNJbWdTcmMiLCJhdHRyIiwiY3NzIiwid2luT2Zmc2V0VG9wIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLGFBQWE7QUFDYkMsZUFBVyxLQURFO0FBRWJDLHNCQUFrQixJQUZMO0FBR2JDLFlBQVEsZ0JBQVNDLEtBQVQsRUFBZ0I7QUFDcEIsYUFBS0gsU0FBTCxHQUFpQkcsS0FBakI7O0FBRUEsWUFBSUMsZ0JBQUo7QUFDQSxZQUFHQyxF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cyIsInNvdXJjZXNDb250ZW50IjpbImxldCBNZW51VG9nZ2xlID0ge1xyXG4gICAgbWVudVN0YXRlOiBmYWxzZSxcclxuICAgIGhhbmRsZVN3aXBlU3RhdGU6IHRydWUsXHJcbiAgICB0b2dnbGU6IGZ1bmN0aW9uKHN0YXRlKSB7XHJcbiAgICAgICAgdGhpcy5tZW51U3RhdGUgPSBzdGF0ZTtcclxuXHJcbiAgICAgICAgbGV0IHRyVmFsdWU7XHJcbiAgICAgICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPCA3NjgpIHtcclxuICAgICAgICAgICAgdHJWYWx1ZSA9IDI3MDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0clZhbHVlID0gNjI1O1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgJCgnYm9keScpLmFuaW1hdGVUcmFuc2Zvcm0oXCJ0cmFuc2xhdGVYKC1cIit0clZhbHVlK1wicHgpXCIpO1xyXG4gICAgICAgICQoJ2h0bWwnKS50b2dnbGVDbGFzcygndG9nZ2xlJyk7XHJcbiAgICAgICAgLy8gJCgnI21haW5fbWVudScpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgJCgnLnNoYWRvdy10b2dnbGUnKS50b2dnbGUoKTtcclxuICAgICAgICAkKCcuZmx5JykudG9nZ2xlQ2xhc3MoJ2ZseWluZycpO1xyXG5cclxuICAgICAgICBpZighdGhpcy5tZW51U3RhdGUpIHtcclxuICAgICAgICAgICAgJCgnYm9keScpLmFuaW1hdGVUcmFuc2Zvcm0oXCJ0cmFuc2xhdGVYKDApXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcbmxldCBMb2dpblRvZ2dsZSA9IHtcclxuICAgIGxvZ2luU3RhdGU6IHRydWUsXHJcbiAgICBsb2dpblN0YXRlVG9nZ2xlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubG9naW4odGhpcy5sb2dpblN0YXRlKTtcclxuICAgICAgICB0aGlzLmxvZ2luU3RhdGUgPSAhdGhpcy5sb2dpblN0YXRlO1xyXG4gICAgfSxcclxuICAgIGxvZ2luOiBmdW5jdGlvbihmbGFnKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnb3ZlcmZsb3ctaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQoJy5sb2dpbi1mb3JtLWJ0bicpLnRvZ2dsZUNsYXNzKCdidXR0b25fbGlnaHQgYnV0dG9uX2RhcmsnKTtcclxuICAgICAgICAgICAgJCgnLmxvZ2luLWFyZWFfX3NoYWRvdywubG9naW4tYXJlYV9faW5uZXInKS5mYWRlVG9nZ2xlKCk7XHJcbiAgICAgICAgICAgIGlmKCFmbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubG9naW4tZm9ybS1idG4nKS50ZXh0KCfQktC+0LnRgtC4Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcubG9naW4tZm9ybS1idG4nKS50ZXh0KCfQodC60YDRi9GC0YwnKTtcclxuICAgICAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cclxuICAgICQoJyNtb2RhbF8yJykubW9kYWwoKTtcclxuXHJcbiAgICAkKCcubW9iaWxlLW1lbnVfY2xvc2UnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICQod2luZG93KS5zY3JvbGxUb3AoMCk7XHJcbiAgICAgICAgTWVudVRvZ2dsZS50b2dnbGUoKTtcclxuICAgICAgICBMb2dpblRvZ2dsZS5sb2dpblN0YXRlVG9nZ2xlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcubG9naW4tZm9ybV90b2dnbGUnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIExvZ2luVG9nZ2xlLmxvZ2luU3RhdGVUb2dnbGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5tZW51LXRvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnc2hhZG93LXRvZ2dsZScpKSB7XHJcbiAgICAgICAgICAgIE1lbnVUb2dnbGUudG9nZ2xlKGZhbHNlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgTWVudVRvZ2dsZS5oYW5kbGVTd2lwZVN0YXRlID0gdHJ1ZTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgc3RhcnRYID0gbnVsbDtcclxuICAgIGxldCBkZWx0YVggPSBudWxsO1xyXG4gICAgbGV0IGhhbmRsZVN3aXBlU3RhdGUgPSB0cnVlO1xyXG4gICAgbGV0IGlzTGVmdFN3aXBlID0gZmFsc2U7XHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBzdGFydFggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZGVsdGFYID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gc3RhcnRYO1xyXG4gICAgICAgICAgICBpc0xlZnRTd2lwZSA9IE1hdGguc2lnbihkZWx0YVgpID09PSAxO1xyXG5cclxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhWCkgPj0gNTAgJiYgaGFuZGxlU3dpcGVTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTGVmdFN3aXBlICYmIE1lbnVUb2dnbGUubWVudVN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTWVudVRvZ2dsZS50b2dnbGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaXNMZWZ0U3dpcGUgJiYgIU1lbnVUb2dnbGUubWVudVN0YXRlICYmIExvZ2luVG9nZ2xlLmxvZ2luU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBNZW51VG9nZ2xlLmhhbmRsZVN3aXBlU3RhdGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBNZW51VG9nZ2xlLmhhbmRsZVN3aXBlU3RhdGUgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGxldCBzbGlkZXJBbW91bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyX2Ftb3VudCcpO1xyXG4gICAgbGV0IHNsaWRlclJhbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcl9yYW5nZScpO1xyXG5cclxuICAgIGlmKHNsaWRlckFtb3VudCkge1xyXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlckFtb3VudCwge1xyXG4gICAgICAgICAgICBzdGFydDogMTAwMCxcclxuICAgICAgICAgICAgc3RlcDogMTAwMCxcclxuICAgICAgICAgICAgYmVoYXZpb3VyOiAnc25hcCcsXHJcbiAgICAgICAgICAgIGNvbm5lY3Q6IFt0cnVlLCBmYWxzZV0sXHJcbiAgICAgICAgICAgIC8vIGZvcm1hdDogd051bWIoe1xyXG4gICAgICAgICAgICAvLyAgICAgZGVjaW1hbHM6IDAsXHJcbiAgICAgICAgICAgIC8vICAgICB0aG91c2FuZDogJyAnXHJcbiAgICAgICAgICAgIC8vIH0pLFxyXG4gICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgJ21pbic6IDEwMDAsXHJcbiAgICAgICAgICAgICAgICAnbWF4JzogODAwMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gcGlwczoge1xyXG4gICAgICAgICAgICAvLyAgICAgbW9kZTogJ3Bvc2l0aW9ucycsXHJcbiAgICAgICAgICAgIC8vICAgICB2YWx1ZXM6IFswLDUwLDEwMF0sXHJcbiAgICAgICAgICAgIC8vICAgICBkZW5zaXR5OiAxMCxcclxuICAgICAgICAgICAgLy8gICAgIHN0ZXBwZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZihzbGlkZXJSYW5nZSkge1xyXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlclJhbmdlLCB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiAxLFxyXG4gICAgICAgICAgICBzdGVwOiAxLFxyXG4gICAgICAgICAgICBiZWhhdmlvdXI6ICdzbmFwJyxcclxuICAgICAgICAgICAgY29ubmVjdDogW3RydWUsIGZhbHNlXSxcclxuICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICdtaW4nOiAxLFxyXG4gICAgICAgICAgICAgICAgJ21heCc6IDRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgICQoJy5uYXZpZ2F0aW9uX19saXN0IGEnKS50YWIoKVxyXG5cclxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHtwbGFjZW1lbnQ6IFwiYm90dG9tXCJ9KTtcclxuICAgIC8vICQoJy5uYXZpZ2F0aW9uX19saXN0IGEnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgLy8gICAgICQoJy5uYXZpZ2F0aW9uX19saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgLy8gICAgIC8vICQodGhpcykudGFiKCdzaG93JykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgLy8gfSk7XHJcblxyXG5cclxuICAgICQoJy5zZWxlY3RfX2lubmVyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCAkYm94ID0gJCh0aGlzKS5zaWJsaW5ncygnLmlucHV0LXdyYXAnKS5maW5kKCcuc2VsZWN0X19jb250ZW50Jyk7XHJcbiAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRib3hcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgLy8gJChkb2N1bWVudCkub24oJ2NsaWNrJywnLnNoYWRvdy10b2dnbGUnLGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgTWVudVRvZ2dsZS50b2dnbGUoZmFsc2UpXHJcbiAgICAvLyB9KTtcclxuXHJcblxyXG4gICAgLy8gcXVlc3Rpb24gaXRlbXNcclxuICAgICQoJy5xdWVzdGlvbi1jb250YWluZXIgLnF1ZXN0aW9uOmZpcnN0LWNoaWxkJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLnF1ZXN0aW9uX19oZWFkZXInKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcucXVlc3Rpb25fX3RleHQnKS5zbGlkZURvd24oMzAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIG51bWJlcmluZyBxdWVzdGlvbiBpdGVtc1xyXG4gICAgJCgnLnF1ZXN0aW9uLWNvbnRhaW5lciAucXVlc3Rpb24nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IG51bSA9ICQodGhpcykuaW5kZXgoKSArIDE7XHJcbiAgICAgICAgaWYobnVtID4gOSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5xdWVzdGlvbl9fbnVtYmVyJykudGV4dChudW0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLnF1ZXN0aW9uX19udW1iZXInKS50ZXh0KCcwJyArIG51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gb3BlbiBxdWVzdGlvbiBpdGVtc1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5xdWVzdGlvbl9faGVhZGVyOm5vdCguYWN0aXZlKScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcucXVlc3Rpb25fX2hlYWRlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygkKCcucXVlc3Rpb25fX3RleHQnKSkuc2xpZGVVcCgzMDApO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCQoJy5xdWVzdGlvbl9fdGV4dCcpKS5zbGlkZVRvZ2dsZSgzMDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vYXJ0aWNsZSBwaWN0dXJlXHJcbiAgICAkKCcuYXJ0aWNsZV9fcGljJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB0aGlzSW1nU3JjID0gJCh0aGlzKS5maW5kKCcuYXJ0aWNsZV9faW1nJykuYXR0cignc3JjJyk7XHJcbiAgICAgICAgJCh0aGlzKS5jc3Moe1xyXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6ICd1cmwoJyArIHRoaXNJbWdTcmMgKyAnKSdcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9hcnRpY2xlcyBwaWN0dXJlXHJcbiAgICAkKCcuYXJ0aWNsZS1wcmV2X19waWMnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoaXNJbWdTcmMgPSAkKHRoaXMpLmZpbmQoJy5hcnRpY2xlLXByZXZfX2ltZycpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyB0aGlzSW1nU3JjICsgJyknXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkZXInKTtcclxufSk7XHJcblxyXG4kKGRvY3VtZW50KS5vbignc2Nyb2xsIHJlYWR5JyxmdW5jdGlvbigpe1xyXG4gICAgbGV0IHdpbk9mZnNldFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgIC8vICQoJyNtYWluX21lbnUnKS5jc3MoJ3RvcCcsd2luT2Zmc2V0VG9wKVxyXG4gICAgJCgnLm1lbnVfX3RvcC1saXN0ZW5lcicpLmNzcygndG9wJyx3aW5PZmZzZXRUb3ApXHJcbn0pO1xyXG5cclxuXHJcbi8vICQoZG9jdW1lbnQpLm9uKCdwYWdlY3JlYXRlJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4vLyAgICAgJChkb2N1bWVudCkub24oJ3N3aXBlbGVmdCBzd2lwZXJpZ2h0JywgZnVuY3Rpb24oKSB7XHJcbi8vICAgICAgICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPCA5OTIpIHtcclxuLy8gICAgICAgICAgICAgTWVudVRvZ2dsZS5vcGVuKClcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9KTtcclxuLy8gfSk7XHJcblxyXG5cclxuLy8gJChkb2N1bWVudCkub24oJ21vYmlsZWluaXQnLCBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAkLm1vYmlsZS5pZ25vcmVDb250ZW50RW5hYmxlZCA9IHRydWU7XHJcbi8vIH0pOyJdfQ==
