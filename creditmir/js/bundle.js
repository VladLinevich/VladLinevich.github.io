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

    $('body').removeClass('loader');
    console.log('ok');

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

    // $(document).on('click','.shadow-toggle',function(){
    //     MenuToggle.toggle(false)
    // });


    // question items
    $('.question-container .question:first-child').each(function () {
        $(this).find('.question__header').addClass('active');
        $(this).find('.question__text').slideDown(300);
    });

    // numbering question items
    // $('.question-container .question').each(function(){
    //     let num = $(this).index() + 1;
    //     if(num > 9) {
    //         $(this).find('.question__number').text(num);
    //     } else {
    //         $(this).find('.question__number').text('0' + num);
    //     }
    // });

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJNZW51VG9nZ2xlIiwibWVudVN0YXRlIiwiaGFuZGxlU3dpcGVTdGF0ZSIsInRvZ2dsZSIsInN0YXRlIiwidHJWYWx1ZSIsIiQiLCJ3aW5kb3ciLCJ3aWR0aCIsImFuaW1hdGVUcmFuc2Zvcm0iLCJ0b2dnbGVDbGFzcyIsImNvbnNvbGUiLCJsb2ciLCJjbG9zZSIsIkxvZ2luVG9nZ2xlIiwibG9naW5TdGF0ZSIsImxvZ2luU3RhdGVUb2dnbGUiLCJsb2dpbiIsImZsYWciLCJmYWRlVG9nZ2xlIiwidGV4dCIsImRvY3VtZW50IiwicmVhZHkiLCJyZW1vdmVDbGFzcyIsIm1vZGFsIiwiY2xpY2siLCJzY3JvbGxUb3AiLCJoYXNDbGFzcyIsInN0YXJ0WCIsImRlbHRhWCIsImlzTGVmdFN3aXBlIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0VG91Y2hlcyIsInBhZ2VYIiwiTWF0aCIsInNpZ24iLCJhYnMiLCJzbGlkZXJBbW91bnQiLCJnZXRFbGVtZW50QnlJZCIsInNsaWRlclJhbmdlIiwibm9VaVNsaWRlciIsImNyZWF0ZSIsInN0YXJ0Iiwic3RlcCIsImJlaGF2aW91ciIsImNvbm5lY3QiLCJyYW5nZSIsInRhYiIsInRvb2x0aXAiLCJwbGFjZW1lbnQiLCJlYWNoIiwiJGJveCIsInNpYmxpbmdzIiwiZmluZCIsInNlbGVjdDIiLCJkcm9wZG93blBhcmVudCIsImFkZENsYXNzIiwic2xpZGVEb3duIiwib24iLCJzbGlkZVVwIiwic2xpZGVUb2dnbGUiLCJ0aGlzSW1nU3JjIiwiYXR0ciIsImNzcyIsIndpbk9mZnNldFRvcCIsInJlc2l6ZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxhQUFhO0FBQ2ZDLGVBQVcsS0FESTtBQUVmQyxzQkFBa0IsSUFGSDtBQUdmQyxZQUFRLGdCQUFTQyxLQUFULEVBQWdCO0FBQ3BCLGFBQUtILFNBQUwsR0FBaUJHLEtBQWpCOztBQUVBLFlBQUlDLGdCQUFKO0FBQ0EsWUFBR0MsRUFBRUMsTUFBRixFQUFVQyxLQUFWLEtBQW9CLEdBQXZCLEVBQTRCO0FBQ3hCSCxzQkFBVSxHQUFWO0FBQ0gsU0FGRCxNQUVPO0FBQ0hBLHNCQUFVLEdBQVY7QUFDSDs7QUFHREMsVUFBRSxNQUFGLEVBQVVHLGdCQUFWLENBQTJCLGlCQUFlSixPQUFmLEdBQXVCLEtBQWxEO0FBQ0FDLFVBQUUsTUFBRixFQUFVSSxXQUFWLENBQXNCLFFBQXRCO0FBQ0E7QUFDQUosVUFBRSxnQkFBRixFQUFvQkgsTUFBcEI7QUFDQUcsVUFBRSxNQUFGLEVBQVVJLFdBQVYsQ0FBc0IsUUFBdEI7O0FBRUFDLGdCQUFRQyxHQUFSLENBQVksS0FBS1gsU0FBakI7O0FBRUEsWUFBRyxDQUFDLEtBQUtBLFNBQVQsRUFBb0I7QUFDaEJLLGNBQUUsTUFBRixFQUFVRyxnQkFBVixDQUEyQixlQUEzQjtBQUNBO0FBQ0g7QUFFSixLQTNCYztBQTRCZkksV0FBTyxpQkFBVztBQUNkO0FBQ0EsWUFBR2IsV0FBV0MsU0FBZCxFQUF5QjtBQUNyQkssY0FBRSxNQUFGLEVBQVVHLGdCQUFWLENBQTJCLGVBQTNCO0FBQ0FULHVCQUFXRyxNQUFYLENBQWtCLEtBQWxCO0FBQ0FILHVCQUFXRSxnQkFBWCxHQUE4QixJQUE5QjtBQUNIO0FBQ0o7QUFuQ2MsQ0FBbkI7O0FBdUNBLElBQU1ZLGNBQWM7QUFDaEJDLGdCQUFZLElBREk7QUFFaEJDLHNCQUFrQiw0QkFBVTtBQUN4QixhQUFLQyxLQUFMLENBQVcsS0FBS0YsVUFBaEI7QUFDQSxhQUFLQSxVQUFMLEdBQWtCLENBQUMsS0FBS0EsVUFBeEI7QUFDSCxLQUxlO0FBTWhCRSxXQUFPLGVBQVNDLElBQVQsRUFBZTtBQUNsQlosVUFBRSxNQUFGLEVBQVVJLFdBQVYsQ0FBc0IsaUJBQXRCO0FBQ0FKLFVBQUUsaUJBQUYsRUFBcUJJLFdBQXJCLENBQWlDLDBCQUFqQztBQUNBSixVQUFFLHdDQUFGLEVBQTRDYSxVQUE1QztBQUNBLFlBQUcsQ0FBQ0QsSUFBSixFQUFVO0FBQ05aLGNBQUUsaUJBQUYsRUFBcUJjLElBQXJCLENBQTBCLE9BQTFCO0FBQ0gsU0FGRCxNQUVPO0FBQ0hkLGNBQUUsaUJBQUYsRUFBcUJjLElBQXJCLENBQTBCLFFBQTFCO0FBQ0g7QUFDSjtBQWZlLENBQXBCOztBQW1CQWQsRUFBRWUsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVU7O0FBRXhCaEIsTUFBRSxNQUFGLEVBQVVpQixXQUFWLENBQXNCLFFBQXRCO0FBQ0FaLFlBQVFDLEdBQVIsQ0FBWSxJQUFaOztBQUVBTixNQUFFLFVBQUYsRUFBY2tCLEtBQWQ7O0FBRUFsQixNQUFFLG9CQUFGLEVBQXdCbUIsS0FBeEIsQ0FBOEIsWUFBVTtBQUNwQ25CLFVBQUVDLE1BQUYsRUFBVW1CLFNBQVYsQ0FBb0IsQ0FBcEI7QUFDQTFCLG1CQUFXRyxNQUFYO0FBQ0FXLG9CQUFZRSxnQkFBWjtBQUNILEtBSkQ7O0FBTUFWLE1BQUUsb0JBQUYsRUFBd0JtQixLQUF4QixDQUE4QixZQUFVO0FBQ3BDWCxvQkFBWUUsZ0JBQVo7QUFDSCxLQUZEOztBQUlBVixNQUFFLGNBQUYsRUFBa0JtQixLQUFsQixDQUF3QixZQUFVO0FBQzlCLFlBQUduQixFQUFFLElBQUYsRUFBUXFCLFFBQVIsQ0FBaUIsZUFBakIsQ0FBSCxFQUFzQztBQUNsQzNCLHVCQUFXRyxNQUFYLENBQWtCLEtBQWxCO0FBQ0gsU0FGRCxNQUVPO0FBQ0hILHVCQUFXRyxNQUFYLENBQWtCLElBQWxCO0FBQ0g7QUFDREgsbUJBQVdFLGdCQUFYLEdBQThCLElBQTlCO0FBRUgsS0FSRDs7QUFVQSxRQUFJMEIsU0FBUyxJQUFiO0FBQ0EsUUFBSUMsU0FBUyxJQUFiO0FBQ0EsUUFBSTNCLG1CQUFtQixJQUF2QjtBQUNBLFFBQUk0QixjQUFjLEtBQWxCOztBQUVBVCxhQUFTVSxhQUFULENBQXVCLE1BQXZCLEVBQStCQyxnQkFBL0IsQ0FBZ0QsWUFBaEQsRUFBOEQsVUFBU0MsQ0FBVCxFQUFXO0FBQ3JFTCxpQkFBU0ssRUFBRUMsYUFBRixDQUFnQixDQUFoQixFQUFtQkMsS0FBNUI7QUFDQSxhQUFLSCxnQkFBTCxDQUFzQixXQUF0QixFQUFtQyxVQUFTQyxDQUFULEVBQVc7QUFDMUNKLHFCQUFTSSxFQUFFQyxhQUFGLENBQWdCLENBQWhCLEVBQW1CQyxLQUFuQixHQUEyQlAsTUFBcEM7QUFDQUUsMEJBQWNNLEtBQUtDLElBQUwsQ0FBVVIsTUFBVixNQUFzQixDQUFwQzs7QUFFQSxnQkFBSU8sS0FBS0UsR0FBTCxDQUFTVCxNQUFULEtBQW9CLEVBQXBCLElBQTBCM0IsZ0JBQTlCLEVBQWdEO0FBQzVDLG9CQUFJNEIsZUFBZTlCLFdBQVdDLFNBQTlCLEVBQXlDO0FBQ3JDO0FBQ0FELCtCQUFXYSxLQUFYO0FBQ0gsaUJBSEQsTUFHTyxJQUFJLENBQUNpQixXQUFELElBQWdCLENBQUM5QixXQUFXQyxTQUE1QixJQUF5Q2EsWUFBWUMsVUFBekQsRUFBcUU7QUFDeEVmLCtCQUFXRyxNQUFYLENBQWtCLElBQWxCO0FBQ0g7O0FBRUQ7QUFDSDtBQUNKLFNBZEQ7O0FBZ0JBLGFBQUs2QixnQkFBTCxDQUFzQixVQUF0QixFQUFrQyxZQUFZO0FBQzFDaEMsdUJBQVdFLGdCQUFYLEdBQThCLElBQTlCO0FBQ0gsU0FGRDtBQUdILEtBckJEOztBQXdCQSxRQUFJcUMsZUFBZWxCLFNBQVNtQixjQUFULENBQXdCLGVBQXhCLENBQW5CO0FBQ0EsUUFBSUMsY0FBY3BCLFNBQVNtQixjQUFULENBQXdCLGNBQXhCLENBQWxCOztBQUVBLFFBQUdELFlBQUgsRUFBaUI7QUFDYkcsbUJBQVdDLE1BQVgsQ0FBa0JKLFlBQWxCLEVBQWdDO0FBQzVCSyxtQkFBTyxJQURxQjtBQUU1QkMsa0JBQU0sSUFGc0I7QUFHNUJDLHVCQUFXLE1BSGlCO0FBSTVCQyxxQkFBUyxDQUFDLElBQUQsRUFBTyxLQUFQLENBSm1CO0FBSzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLG1CQUFPO0FBQ0gsdUJBQU8sSUFESjtBQUVILHVCQUFPO0FBRko7QUFJUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFsQjRCLFNBQWhDO0FBb0JIOztBQUVELFFBQUdQLFdBQUgsRUFBZ0I7QUFDWkMsbUJBQVdDLE1BQVgsQ0FBa0JGLFdBQWxCLEVBQStCO0FBQzNCRyxtQkFBTyxDQURvQjtBQUUzQkMsa0JBQU0sQ0FGcUI7QUFHM0JDLHVCQUFXLE1BSGdCO0FBSTNCQyxxQkFBUyxDQUFDLElBQUQsRUFBTyxLQUFQLENBSmtCO0FBSzNCQyxtQkFBTztBQUNILHVCQUFPLENBREo7QUFFSCx1QkFBTztBQUZKO0FBTG9CLFNBQS9CO0FBVUg7O0FBRUQxQyxNQUFFLHFCQUFGLEVBQXlCMkMsR0FBekI7O0FBRUEzQyxNQUFFLHlCQUFGLEVBQTZCNEMsT0FBN0IsQ0FBcUMsRUFBQ0MsV0FBVyxRQUFaLEVBQXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBN0MsTUFBRSxnQkFBRixFQUFvQjhDLElBQXBCLENBQXlCLFlBQVU7QUFDL0IsWUFBSUMsT0FBTy9DLEVBQUUsSUFBRixFQUFRZ0QsUUFBUixDQUFpQixhQUFqQixFQUFnQ0MsSUFBaEMsQ0FBcUMsa0JBQXJDLENBQVg7QUFDQWpELFVBQUUsSUFBRixFQUFRa0QsT0FBUixDQUFnQjtBQUNaQyw0QkFBZ0JKO0FBREosU0FBaEI7QUFHSCxLQUxEOztBQVNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQS9DLE1BQUUsMkNBQUYsRUFBK0M4QyxJQUEvQyxDQUFvRCxZQUFVO0FBQzFEOUMsVUFBRSxJQUFGLEVBQVFpRCxJQUFSLENBQWEsbUJBQWIsRUFBa0NHLFFBQWxDLENBQTJDLFFBQTNDO0FBQ0FwRCxVQUFFLElBQUYsRUFBUWlELElBQVIsQ0FBYSxpQkFBYixFQUFnQ0ksU0FBaEMsQ0FBMEMsR0FBMUM7QUFDSCxLQUhEOztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBckQsTUFBRWUsUUFBRixFQUFZdUMsRUFBWixDQUFlLE9BQWYsRUFBd0IsZ0NBQXhCLEVBQTBELFlBQVk7QUFDbEV0RCxVQUFFLG1CQUFGLEVBQXVCaUIsV0FBdkIsQ0FBbUMsUUFBbkMsRUFBNkMrQixRQUE3QyxDQUFzRGhELEVBQUUsaUJBQUYsQ0FBdEQsRUFBNEV1RCxPQUE1RSxDQUFvRixHQUFwRjtBQUNBdkQsVUFBRSxJQUFGLEVBQVFvRCxRQUFSLENBQWlCLFFBQWpCLEVBQTJCSixRQUEzQixDQUFvQ2hELEVBQUUsaUJBQUYsQ0FBcEMsRUFBMER3RCxXQUExRCxDQUFzRSxHQUF0RTtBQUNBLGVBQU8sS0FBUDtBQUNILEtBSkQ7O0FBTUE7QUFDQXhELE1BQUUsZUFBRixFQUFtQjhDLElBQW5CLENBQXdCLFlBQVU7QUFDOUIsWUFBSVcsYUFBYXpELEVBQUUsSUFBRixFQUFRaUQsSUFBUixDQUFhLGVBQWIsRUFBOEJTLElBQTlCLENBQW1DLEtBQW5DLENBQWpCO0FBQ0ExRCxVQUFFLElBQUYsRUFBUTJELEdBQVIsQ0FBWTtBQUNSLGdDQUFvQixTQUFTRixVQUFULEdBQXNCO0FBRGxDLFNBQVo7QUFHSCxLQUxEOztBQU9BO0FBQ0F6RCxNQUFFLG9CQUFGLEVBQXdCOEMsSUFBeEIsQ0FBNkIsWUFBVTtBQUNuQyxZQUFJVyxhQUFhekQsRUFBRSxJQUFGLEVBQVFpRCxJQUFSLENBQWEsb0JBQWIsRUFBbUNTLElBQW5DLENBQXdDLEtBQXhDLENBQWpCO0FBQ0ExRCxVQUFFLElBQUYsRUFBUTJELEdBQVIsQ0FBWTtBQUNSLGdDQUFvQixTQUFTRixVQUFULEdBQXNCO0FBRGxDLFNBQVo7QUFHSCxLQUxEOztBQVFBO0FBRUgsQ0FoS0Q7O0FBa0tBekQsRUFBRWUsUUFBRixFQUFZdUMsRUFBWixDQUFlLGNBQWYsRUFBOEIsWUFBVTtBQUNwQyxRQUFJTSxlQUFlNUQsRUFBRUMsTUFBRixFQUFVbUIsU0FBVixFQUFuQjtBQUNBO0FBQ0FwQixNQUFFLHFCQUFGLEVBQXlCMkQsR0FBekIsQ0FBNkIsS0FBN0IsRUFBbUNDLFlBQW5DO0FBQ0gsQ0FKRDs7QUFPQTVELEVBQUVDLE1BQUYsRUFBVTRELE1BQVYsQ0FBaUIsWUFBVTtBQUN2Qm5FLGVBQVdhLEtBQVg7QUFDSCxDQUZEOztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgTWVudVRvZ2dsZSA9IHtcclxuICAgIG1lbnVTdGF0ZTogZmFsc2UsXHJcbiAgICBoYW5kbGVTd2lwZVN0YXRlOiB0cnVlLFxyXG4gICAgdG9nZ2xlOiBmdW5jdGlvbihzdGF0ZSkge1xyXG4gICAgICAgIHRoaXMubWVudVN0YXRlID0gc3RhdGU7XHJcblxyXG4gICAgICAgIGxldCB0clZhbHVlO1xyXG4gICAgICAgIGlmKCQod2luZG93KS53aWR0aCgpIDwgNzY4KSB7XHJcbiAgICAgICAgICAgIHRyVmFsdWUgPSAyNzA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHJWYWx1ZSA9IDYyNTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgJCgnYm9keScpLmFuaW1hdGVUcmFuc2Zvcm0oXCJ0cmFuc2xhdGVYKC1cIit0clZhbHVlK1wicHgpXCIpO1xyXG4gICAgICAgICQoJ2h0bWwnKS50b2dnbGVDbGFzcygndG9nZ2xlJyk7XHJcbiAgICAgICAgLy8gJCgnI21haW5fbWVudScpLnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgJCgnLnNoYWRvdy10b2dnbGUnKS50b2dnbGUoKTtcclxuICAgICAgICAkKCcuZmx5JykudG9nZ2xlQ2xhc3MoJ2ZseWluZycpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1lbnVTdGF0ZSlcclxuXHJcbiAgICAgICAgaWYoIXRoaXMubWVudVN0YXRlKSB7XHJcbiAgICAgICAgICAgICQoJ2JvZHknKS5hbmltYXRlVHJhbnNmb3JtKFwidHJhbnNsYXRlWCgwKVwiKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5tZW51U3RhdGUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBjbG9zZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g0JXRgdC70Lgg0LzQvtCx0LjQu9GM0L3QvtC1INC80LXQvdGOINC+0YLQutGA0YvRgtC+IC0g0LfQsNC60YDRi9GC0YxcclxuICAgICAgICBpZihNZW51VG9nZ2xlLm1lbnVTdGF0ZSkge1xyXG4gICAgICAgICAgICAkKCdib2R5JykuYW5pbWF0ZVRyYW5zZm9ybShcInRyYW5zbGF0ZVgoMClcIik7XHJcbiAgICAgICAgICAgIE1lbnVUb2dnbGUudG9nZ2xlKGZhbHNlKTtcclxuICAgICAgICAgICAgTWVudVRvZ2dsZS5oYW5kbGVTd2lwZVN0YXRlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuY29uc3QgTG9naW5Ub2dnbGUgPSB7XHJcbiAgICBsb2dpblN0YXRlOiB0cnVlLFxyXG4gICAgbG9naW5TdGF0ZVRvZ2dsZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmxvZ2luKHRoaXMubG9naW5TdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5sb2dpblN0YXRlID0gIXRoaXMubG9naW5TdGF0ZTtcclxuICAgIH0sXHJcbiAgICBsb2dpbjogZnVuY3Rpb24oZmxhZykge1xyXG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnb3ZlcmZsb3ctaGlkZGVuJyk7XHJcbiAgICAgICAgJCgnLmxvZ2luLWZvcm0tYnRuJykudG9nZ2xlQ2xhc3MoJ2J1dHRvbl9saWdodCBidXR0b25fZGFyaycpO1xyXG4gICAgICAgICQoJy5sb2dpbi1hcmVhX19zaGFkb3csLmxvZ2luLWFyZWFfX2lubmVyJykuZmFkZVRvZ2dsZSgpO1xyXG4gICAgICAgIGlmKCFmbGFnKSB7XHJcbiAgICAgICAgICAgICQoJy5sb2dpbi1mb3JtLWJ0bicpLnRleHQoJ9CS0L7QudGC0LgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcubG9naW4tZm9ybS1idG4nKS50ZXh0KCfQodC60YDRi9GC0YwnKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdsb2FkZXInKTtcclxuICAgIGNvbnNvbGUubG9nKCdvaycpXHJcblxyXG4gICAgJCgnI21vZGFsXzEnKS5tb2RhbCgpO1xyXG5cclxuICAgICQoJy5tb2JpbGUtbWVudV9jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcCgwKTtcclxuICAgICAgICBNZW51VG9nZ2xlLnRvZ2dsZSgpO1xyXG4gICAgICAgIExvZ2luVG9nZ2xlLmxvZ2luU3RhdGVUb2dnbGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5sb2dpbi1mb3JtX3RvZ2dsZScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgTG9naW5Ub2dnbGUubG9naW5TdGF0ZVRvZ2dsZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLm1lbnUtdG9nZ2xlJykuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICBpZigkKHRoaXMpLmhhc0NsYXNzKCdzaGFkb3ctdG9nZ2xlJykpIHtcclxuICAgICAgICAgICAgTWVudVRvZ2dsZS50b2dnbGUoZmFsc2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIE1lbnVUb2dnbGUudG9nZ2xlKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNZW51VG9nZ2xlLmhhbmRsZVN3aXBlU3RhdGUgPSB0cnVlO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzdGFydFggPSBudWxsO1xyXG4gICAgbGV0IGRlbHRhWCA9IG51bGw7XHJcbiAgICBsZXQgaGFuZGxlU3dpcGVTdGF0ZSA9IHRydWU7XHJcbiAgICBsZXQgaXNMZWZ0U3dpcGUgPSBmYWxzZTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIHN0YXJ0WCA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWDtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBkZWx0YVggPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSBzdGFydFg7XHJcbiAgICAgICAgICAgIGlzTGVmdFN3aXBlID0gTWF0aC5zaWduKGRlbHRhWCkgPT09IDE7XHJcblxyXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGFYKSA+PSA1MCAmJiBoYW5kbGVTd2lwZVN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNMZWZ0U3dpcGUgJiYgTWVudVRvZ2dsZS5tZW51U3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBNZW51VG9nZ2xlLnRvZ2dsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgTWVudVRvZ2dsZS5jbG9zZSgpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpc0xlZnRTd2lwZSAmJiAhTWVudVRvZ2dsZS5tZW51U3RhdGUgJiYgTG9naW5Ub2dnbGUubG9naW5TdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIE1lbnVUb2dnbGUudG9nZ2xlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIE1lbnVUb2dnbGUuaGFuZGxlU3dpcGVTdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIE1lbnVUb2dnbGUuaGFuZGxlU3dpcGVTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgbGV0IHNsaWRlckFtb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXJfYW1vdW50Jyk7XHJcbiAgICBsZXQgc2xpZGVyUmFuZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyX3JhbmdlJyk7XHJcblxyXG4gICAgaWYoc2xpZGVyQW1vdW50KSB7XHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyQW1vdW50LCB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiAxMDAwLFxyXG4gICAgICAgICAgICBzdGVwOiAxMDAwLFxyXG4gICAgICAgICAgICBiZWhhdmlvdXI6ICdzbmFwJyxcclxuICAgICAgICAgICAgY29ubmVjdDogW3RydWUsIGZhbHNlXSxcclxuICAgICAgICAgICAgLy8gZm9ybWF0OiB3TnVtYih7XHJcbiAgICAgICAgICAgIC8vICAgICBkZWNpbWFsczogMCxcclxuICAgICAgICAgICAgLy8gICAgIHRob3VzYW5kOiAnICdcclxuICAgICAgICAgICAgLy8gfSksXHJcbiAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICAnbWluJzogMTAwMCxcclxuICAgICAgICAgICAgICAgICdtYXgnOiA4MDAwMFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBwaXBzOiB7XHJcbiAgICAgICAgICAgIC8vICAgICBtb2RlOiAncG9zaXRpb25zJyxcclxuICAgICAgICAgICAgLy8gICAgIHZhbHVlczogWzAsNTAsMTAwXSxcclxuICAgICAgICAgICAgLy8gICAgIGRlbnNpdHk6IDEwLFxyXG4gICAgICAgICAgICAvLyAgICAgc3RlcHBlZDogZmFsc2VcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHNsaWRlclJhbmdlKSB7XHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyUmFuZ2UsIHtcclxuICAgICAgICAgICAgc3RhcnQ6IDEsXHJcbiAgICAgICAgICAgIHN0ZXA6IDEsXHJcbiAgICAgICAgICAgIGJlaGF2aW91cjogJ3NuYXAnLFxyXG4gICAgICAgICAgICBjb25uZWN0OiBbdHJ1ZSwgZmFsc2VdLFxyXG4gICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgJ21pbic6IDEsXHJcbiAgICAgICAgICAgICAgICAnbWF4JzogNFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgJCgnLm5hdmlnYXRpb25fX2xpc3QgYScpLnRhYigpXHJcblxyXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoe3BsYWNlbWVudDogXCJib3R0b21cIn0pO1xyXG4gICAgLy8gJCgnLm5hdmlnYXRpb25fX2xpc3QgYScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAvLyAgICAgJCgnLm5hdmlnYXRpb25fX2xpbmsnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAvLyAgICAgLy8gJCh0aGlzKS50YWIoJ3Nob3cnKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAvLyB9KTtcclxuXHJcblxyXG4gICAgJCgnLnNlbGVjdF9faW5uZXInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0ICRib3ggPSAkKHRoaXMpLnNpYmxpbmdzKCcuaW5wdXQtd3JhcCcpLmZpbmQoJy5zZWxlY3RfX2NvbnRlbnQnKTtcclxuICAgICAgICAkKHRoaXMpLnNlbGVjdDIoe1xyXG4gICAgICAgICAgICBkcm9wZG93blBhcmVudDogJGJveFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAvLyAkKGRvY3VtZW50KS5vbignY2xpY2snLCcuc2hhZG93LXRvZ2dsZScsZnVuY3Rpb24oKXtcclxuICAgIC8vICAgICBNZW51VG9nZ2xlLnRvZ2dsZShmYWxzZSlcclxuICAgIC8vIH0pO1xyXG5cclxuXHJcbiAgICAvLyBxdWVzdGlvbiBpdGVtc1xyXG4gICAgJCgnLnF1ZXN0aW9uLWNvbnRhaW5lciAucXVlc3Rpb246Zmlyc3QtY2hpbGQnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJCh0aGlzKS5maW5kKCcucXVlc3Rpb25fX2hlYWRlcicpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLmZpbmQoJy5xdWVzdGlvbl9fdGV4dCcpLnNsaWRlRG93bigzMDApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gbnVtYmVyaW5nIHF1ZXN0aW9uIGl0ZW1zXHJcbiAgICAvLyAkKCcucXVlc3Rpb24tY29udGFpbmVyIC5xdWVzdGlvbicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgIC8vICAgICBsZXQgbnVtID0gJCh0aGlzKS5pbmRleCgpICsgMTtcclxuICAgIC8vICAgICBpZihudW0gPiA5KSB7XHJcbiAgICAvLyAgICAgICAgICQodGhpcykuZmluZCgnLnF1ZXN0aW9uX19udW1iZXInKS50ZXh0KG51bSk7XHJcbiAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgJCh0aGlzKS5maW5kKCcucXVlc3Rpb25fX251bWJlcicpLnRleHQoJzAnICsgbnVtKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9KTtcclxuXHJcbiAgICAvLyBvcGVuIHF1ZXN0aW9uIGl0ZW1zXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLnF1ZXN0aW9uX19oZWFkZXI6bm90KC5hY3RpdmUpJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5xdWVzdGlvbl9faGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCQoJy5xdWVzdGlvbl9fdGV4dCcpKS5zbGlkZVVwKDMwMCk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoJCgnLnF1ZXN0aW9uX190ZXh0JykpLnNsaWRlVG9nZ2xlKDMwMCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9hcnRpY2xlIHBpY3R1cmVcclxuICAgICQoJy5hcnRpY2xlX19waWMnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoaXNJbWdTcmMgPSAkKHRoaXMpLmZpbmQoJy5hcnRpY2xlX19pbWcnKS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdGhpc0ltZ1NyYyArICcpJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL2FydGljbGVzIHBpY3R1cmVcclxuICAgICQoJy5hcnRpY2xlLXByZXZfX3BpYycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhpc0ltZ1NyYyA9ICQodGhpcykuZmluZCgnLmFydGljbGUtcHJldl9faW1nJykuYXR0cignc3JjJyk7XHJcbiAgICAgICAgJCh0aGlzKS5jc3Moe1xyXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6ICd1cmwoJyArIHRoaXNJbWdTcmMgKyAnKSdcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vIHRlc3RcclxuXHJcbn0pO1xyXG5cclxuJChkb2N1bWVudCkub24oJ3Njcm9sbCByZWFkeScsZnVuY3Rpb24oKXtcclxuICAgIGxldCB3aW5PZmZzZXRUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAvLyAkKCcjbWFpbl9tZW51JykuY3NzKCd0b3AnLHdpbk9mZnNldFRvcClcclxuICAgICQoJy5tZW51X190b3AtbGlzdGVuZXInKS5jc3MoJ3RvcCcsd2luT2Zmc2V0VG9wKVxyXG59KTtcclxuXHJcblxyXG4kKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XHJcbiAgICBNZW51VG9nZ2xlLmNsb3NlKClcclxufSk7XHJcblxyXG4vLyAkKGRvY3VtZW50KS5vbigncGFnZWNyZWF0ZScsIGZ1bmN0aW9uKGV2ZW50KXtcclxuLy8gICAgICQoZG9jdW1lbnQpLm9uKCdzd2lwZWxlZnQgc3dpcGVyaWdodCcsIGZ1bmN0aW9uKCkge1xyXG4vLyAgICAgICAgIGlmKCQod2luZG93KS53aWR0aCgpIDwgOTkyKSB7XHJcbi8vICAgICAgICAgICAgIE1lbnVUb2dnbGUub3BlbigpXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSk7XHJcbi8vIH0pO1xyXG5cclxuXHJcbi8vICQoZG9jdW1lbnQpLm9uKCdtb2JpbGVpbml0JywgZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgJC5tb2JpbGUuaWdub3JlQ29udGVudEVuYWJsZWQgPSB0cnVlO1xyXG4vLyB9KTsiXX0=
