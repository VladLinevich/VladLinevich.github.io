'use strict';

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

$(document).ready(function () {

    var $bigValueSlider = document.getElementById('slider-range'),
        step = 1000,
        minAmount = 1000,
        maxAmount = 80000;

    $('.calculator-box__amount').text(minAmount);

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
                values: [0, 49.367, 100],
                density: 10,
                stepped: false
            }
        });

        $bigValueSlider.noUiSlider.on('update', function (values, handle) {
            $('.calculator-box__amount').text(values[handle]);
        });
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
    setTimeout(function () {
        $preloader.remove();
    }, 1500);

    $('.questions-item:first-child').each(function (e) {
        $(this).find('.question, .question__title').addClass('active');
        $(this).find('.question__text').addClass('in').attr('aria-expanded', 'true');
    });

    regStepsDone('.step-indicator__item', 'active');
});

$('.question__title').click(function () {

    $('.question').each(function () {
        $(this).removeClass('active');
        $(this).find('.question__title').removeClass('active');
        $(this).find('.question__text.in').collapse('toggle');
    });

    var questionContainer = $(this).parents('.question');
    $(this).toggleClass('active');
    questionContainer.toggleClass('active');
    questionContainer.find('.question__text').collapse('toggle');
});

$(document).on('click', '.menu__login_btn-mobile, .menu__tab_back-ico', function (e) {
    $('.menu__tab').each(function () {
        if ($(this).hasClass('active')) {
            $(this).hide().removeClass('active');
        } else {
            $(this).slideDown().addClass('active');
            if ($(this).css('display') === 'block') {
                $(this).css({ 'display': 'flex' });
            }
        }
    });
});

$(document).on('click', '.login-modal-toggle', function (e) {
    $('.login-modal').toggle('slide', {
        direction: 'right'
    }, 500);
});

$(document).on('click', '.footer-inner__foot-nav-link', function (e) {
    $('.footer-inner__foot-nav-link').removeClass('active');
    $(this).addClass('active');
    var numContent = $(this).attr('data-footer-content');
    $('.footer-inner__content').each(function (e) {
        $('.footer-inner__content').removeClass('show');
        var list = $(this).find('.footer-inner__list');
        if (list.attr('data-footer-content') === numContent) {
            $('.footer-inner__content').hide();
            $(this).fadeIn();
        }
    });
});

$(document).on('click', '.footer-inner__title:not(.open, .social-box)', function (e) {
    var winWidth = $(window).width();
    if (winWidth <= 767) {
        $('.footer-inner__title').removeClass('open');
        $(this).addClass('open');
        $('.footer-inner__list:not(.social-box__list)').slideUp();
        $(this).siblings('.footer-inner__list:not(.social-box__list)').slideDown();
    }
});

function refreshMenuStatus() {
    $('body').removeClass('shadow');
    $('.button-mobile__btn, .menu__tab').removeClass('active');
    $('.menu__tab').removeAttr('style');
    $('.menu__tab:first-child').addClass('active');
    $('.menu').removeAttr('style');
};

$(document).on('click', '.button-mobile__btn', function (e) {
    $('body').toggleClass('shadow');
    $(this).toggleClass('active');
    $('.menu').slideToggle(500, function () {
        if ($(this).css('display') === 'none') {
            refreshMenuStatus();
        }
        if ($(this).css('display') === 'block') {
            $(this).css({ 'display': 'flex' });
        }
    });
});

$(document).on('click', '.seo-box__more', function (e) {
    $('.seo-box__more').remove();
    $('.seo-box__text').removeClass('hidden');
});

$(window).on('load resize', function () {
    var winWidth = $(this).width();
    if (winWidth > 767 && winWidth <= 991) {
        $('.footer-inner__list').each(function () {
            var child = $(this).find('.footer-inner__list-item').length;
            if (child > 4) {
                $(this).children().addClass('column-item');
            }
        });
    }
    if (winWidth > 991) {
        refreshMenuStatus();
    }
});

$('.select__inner').each(function () {
    var $box = $(this).siblings('.select__content');
    $(this).select2({
        dropdownParent: $box
    });
});

$('.article__pic').each(function () {
    var thisImgSrc = $(this).find('.article__img').attr('src');
    $(this).css({
        'background-image': 'url(' + thisImgSrc + ')'
    });
});

$('.article-prev__pic').each(function () {
    var thisImgSrc = $(this).find('.article-prev__img').attr('src');
    $(this).css({
        'background-image': 'url(' + thisImgSrc + ')'
    });
});

$('.tab-items__mobile-tab-arrow').click(function () {
    var parent = $(this).parent('.tab-items__list');
    parent.toggleClass('show');
});

function regStepsDone(elClass, addClass) {

    $(elClass).each(function (index, el) {
        if ($(el).hasClass('active')) {
            console.log('ok');
            return false;
        } else {
            $(el).addClass(addClass);
        }
    });
}

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsIiRiaWdWYWx1ZVNsaWRlciIsImdldEVsZW1lbnRCeUlkIiwic3RlcCIsIm1pbkFtb3VudCIsIm1heEFtb3VudCIsInRleHQiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJiZWhhdmlvdXIiLCJjb25uZWN0IiwiZm9ybWF0Iiwid051bWIiLCJkZWNpbWFscyIsInRob3VzYW5kIiwicmFuZ2UiLCJwaXBzIiwibW9kZSIsInZhbHVlcyIsImRlbnNpdHkiLCJzdGVwcGVkIiwib24iLCJoYW5kbGUiLCIkcHJlbG9hZGVyIiwiZmFkZU91dCIsImRlbGF5Iiwic2V0VGltZW91dCIsInJlbW92ZSIsImVhY2giLCJlIiwiZmluZCIsImFkZENsYXNzIiwiYXR0ciIsInJlZ1N0ZXBzRG9uZSIsImNsaWNrIiwicmVtb3ZlQ2xhc3MiLCJjb2xsYXBzZSIsInF1ZXN0aW9uQ29udGFpbmVyIiwicGFyZW50cyIsInRvZ2dsZUNsYXNzIiwiaGFzQ2xhc3MiLCJoaWRlIiwic2xpZGVEb3duIiwiY3NzIiwidG9nZ2xlIiwiZGlyZWN0aW9uIiwibnVtQ29udGVudCIsImxpc3QiLCJmYWRlSW4iLCJ3aW5XaWR0aCIsIndpbmRvdyIsIndpZHRoIiwic2xpZGVVcCIsInNpYmxpbmdzIiwicmVmcmVzaE1lbnVTdGF0dXMiLCJyZW1vdmVBdHRyIiwic2xpZGVUb2dnbGUiLCJjaGlsZCIsImxlbmd0aCIsImNoaWxkcmVuIiwiJGJveCIsInNlbGVjdDIiLCJkcm9wZG93blBhcmVudCIsInRoaXNJbWdTcmMiLCJwYXJlbnQiLCJlbENsYXNzIiwiaW5kZXgiLCJlbCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7O0FBRXpCLFFBQUlDLGtCQUFrQkYsU0FBU0csY0FBVCxDQUF3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Q0FBZUEsUUFBZjtBQUNIO0FBQ0osS0FQRDtBQVFIOztBQUdMO0FBQ0k7QUFDQTtBQUNBOzs7QUFHSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmZ1bmN0aW9uIGZhZGVPdXRNb2RhbCgpIHtcclxuICAgICQoJy5tb2RhbC1ib3guc2hvdyAubW9kYWwtYm94X2JvZHknKS5yZW1vdmVDbGFzcygnZmFkZUluVXAnKS5hZGRDbGFzcygnZmFkZU91dFVwJyk7XHJcbiAgICAkKCcubW9kYWwtYm94LnNob3cnKS5yZW1vdmVDbGFzcygnZmFkZUluJykuYWRkQ2xhc3MoJ2ZhZGVPdXQnKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCcubW9kYWwtYm94LnNob3cnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG4gICAgfSw1MDApO1xyXG5cclxufTtcclxuXHJcbiQoZG9jdW1lbnQpLmtleXVwKGZ1bmN0aW9uKGUpe1xyXG5cclxuXHJcbiAgICBpZihlLmtleUNvZGUgPT0gMjcpIHtcclxuICAgICAgICBmYWRlT3V0TW9kYWwoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4kKCcubW9kYWwtYm94X2Nsb3NlLCAubW9kYWwtYm94X3NoYWRvdycpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICBmYWRlT3V0TW9kYWwoKVxyXG59KTsqL1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgbGV0ICRiaWdWYWx1ZVNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXItcmFuZ2UnKSxcclxuICAgICAgICBzdGVwID0gMTAwMCxcclxuICAgICAgICBtaW5BbW91bnQgPSAxMDAwLFxyXG4gICAgICAgIG1heEFtb3VudCA9IDgwMDAwO1xyXG5cclxuICAgICQoJy5jYWxjdWxhdG9yLWJveF9fYW1vdW50JykudGV4dChtaW5BbW91bnQpXHJcblxyXG4gICAgaWYgKCRiaWdWYWx1ZVNsaWRlcikge1xyXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKCRiaWdWYWx1ZVNsaWRlciwge1xyXG4gICAgICAgICAgICBzdGFydDogW21pbkFtb3VudF0sXHJcbiAgICAgICAgICAgIHN0ZXA6IHN0ZXAsXHJcbiAgICAgICAgICAgIGJlaGF2aW91cjogJ3NuYXAnLFxyXG4gICAgICAgICAgICBjb25uZWN0OiBbdHJ1ZSwgZmFsc2VdLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IHdOdW1iKHtcclxuICAgICAgICAgICAgICAgIGRlY2ltYWxzOiAwLFxyXG4gICAgICAgICAgICAgICAgdGhvdXNhbmQ6ICcgJ1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICdtaW4nOiBbbWluQW1vdW50XSxcclxuICAgICAgICAgICAgICAgICdtYXgnOiBbbWF4QW1vdW50XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwaXBzOiB7XHJcbiAgICAgICAgICAgICAgICBtb2RlOiAncG9zaXRpb25zJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlczogWzAsNDkuMzY3LDEwMF0sXHJcbiAgICAgICAgICAgICAgICBkZW5zaXR5OiAxMCxcclxuICAgICAgICAgICAgICAgIHN0ZXBwZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJGJpZ1ZhbHVlU2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlKSB7XHJcbiAgICAgICAgICAgICQoJy5jYWxjdWxhdG9yLWJveF9fYW1vdW50JykudGV4dCh2YWx1ZXNbaGFuZGxlXSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gJCggXCIuc3RlcHMtbWFpbi1jb250YWluZXJcIiApLnRhYnMoe1xyXG4gICAgLy8gICAgIGFjdGl2ZTogMCxcclxuICAgIC8vICAgICBzaG93OiB7IGVmZmVjdDogXCJmYWRlXCIsIGR1cmF0aW9uOiAzMDAgfVxyXG4gICAgLy8gfSk7XHJcbiAgICAvL1xyXG4gICAgLy8gJCggXCIuYWNjb3VudC1tYWluLWNvbnRhaW5lclwiICkudGFicygpO1xyXG5cclxuICAgIC8vIHRvZ2dsZVRhYnNPbkFjY291bnRQYWdlKCk7XHJcblxyXG4gICAgLy8gYWNjb3VudERhdGFFZGl0VG9nZ2xlKCk7XHJcblxyXG4gICAgdmFyICRwcmVsb2FkZXIgPSAkKCcubG9hZGVyX19jb250YWluZXInKTtcclxuICAgICRwcmVsb2FkZXIuZmFkZU91dCg1MDApO1xyXG4gICAgJHByZWxvYWRlci5kZWxheSg1MDApLmZhZGVPdXQoNTAwKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAkcHJlbG9hZGVyLnJlbW92ZSgpO1xyXG4gICAgfSwxNTAwKTtcclxuXHJcbiAgICAkKCcucXVlc3Rpb25zLWl0ZW06Zmlyc3QtY2hpbGQnKS5lYWNoKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLnF1ZXN0aW9uLCAucXVlc3Rpb25fX3RpdGxlJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLnF1ZXN0aW9uX190ZXh0JykuYWRkQ2xhc3MoJ2luJykuYXR0cignYXJpYS1leHBhbmRlZCcsJ3RydWUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJlZ1N0ZXBzRG9uZSgnLnN0ZXAtaW5kaWNhdG9yX19pdGVtJywgJ2FjdGl2ZScpO1xyXG5cclxufSk7XHJcblxyXG5cclxuICAgICQoJy5xdWVzdGlvbl9fdGl0bGUnKS5jbGljayhmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAkKCcucXVlc3Rpb24nKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5xdWVzdGlvbl9fdGl0bGUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLnF1ZXN0aW9uX190ZXh0LmluJykuY29sbGFwc2UoJ3RvZ2dsZScpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbGV0IHF1ZXN0aW9uQ29udGFpbmVyID0gJCh0aGlzKS5wYXJlbnRzKCcucXVlc3Rpb24nKTtcclxuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICBxdWVzdGlvbkNvbnRhaW5lci50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgcXVlc3Rpb25Db250YWluZXIuZmluZCgnLnF1ZXN0aW9uX190ZXh0JykuY29sbGFwc2UoJ3RvZ2dsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5tZW51X19sb2dpbl9idG4tbW9iaWxlLCAubWVudV9fdGFiX2JhY2staWNvJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgJCgnLm1lbnVfX3RhYicpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuaGlkZSgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuc2xpZGVEb3duKCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykuY3NzKCdkaXNwbGF5JykgPT09ICdibG9jaycpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyh7J2Rpc3BsYXknOidmbGV4J30pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywnLmxvZ2luLW1vZGFsLXRvZ2dsZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQoJy5sb2dpbi1tb2RhbCcpLnRvZ2dsZSgnc2xpZGUnLHtcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAncmlnaHQnXHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmZvb3Rlci1pbm5lcl9fZm9vdC1uYXYtbGluaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQoJy5mb290ZXItaW5uZXJfX2Zvb3QtbmF2LWxpbmsnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJylcclxuICAgICAgICBsZXQgbnVtQ29udGVudCA9ICQodGhpcykuYXR0cignZGF0YS1mb290ZXItY29udGVudCcpO1xyXG4gICAgICAgICQoJy5mb290ZXItaW5uZXJfX2NvbnRlbnQnKS5lYWNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgJCgnLmZvb3Rlci1pbm5lcl9fY29udGVudCcpLnJlbW92ZUNsYXNzKCdzaG93Jyk7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ID0gJCh0aGlzKS5maW5kKCcuZm9vdGVyLWlubmVyX19saXN0Jyk7XHJcbiAgICAgICAgICAgIGlmIChsaXN0LmF0dHIoJ2RhdGEtZm9vdGVyLWNvbnRlbnQnKSA9PT0gbnVtQ29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmZvb3Rlci1pbm5lcl9fY29udGVudCcpLmhpZGUoKVxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5mYWRlSW4oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmZvb3Rlci1pbm5lcl9fdGl0bGU6bm90KC5vcGVuLCAuc29jaWFsLWJveCknLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBsZXQgd2luV2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcclxuICAgICAgICBpZiAod2luV2lkdGggPD0gNzY3KSB7XHJcbiAgICAgICAgICAgICQoJy5mb290ZXItaW5uZXJfX3RpdGxlJykucmVtb3ZlQ2xhc3MoJ29wZW4nKVxyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdvcGVuJyk7XHJcbiAgICAgICAgICAgICQoJy5mb290ZXItaW5uZXJfX2xpc3Q6bm90KC5zb2NpYWwtYm94X19saXN0KScpLnNsaWRlVXAoKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygnLmZvb3Rlci1pbm5lcl9fbGlzdDpub3QoLnNvY2lhbC1ib3hfX2xpc3QpJykuc2xpZGVEb3duKClcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gcmVmcmVzaE1lbnVTdGF0dXMoKSB7XHJcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdzaGFkb3cnKTtcclxuICAgICAgICAkKCcuYnV0dG9uLW1vYmlsZV9fYnRuLCAubWVudV9fdGFiJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgJCgnLm1lbnVfX3RhYicpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgJCgnLm1lbnVfX3RhYjpmaXJzdC1jaGlsZCcpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKCcubWVudScpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbi1tb2JpbGVfX2J0bicsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnc2hhZG93Jyk7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnLm1lbnUnKS5zbGlkZVRvZ2dsZSg1MDAsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKCQodGhpcykuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgcmVmcmVzaE1lbnVTdGF0dXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ2Jsb2NrJykge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoeydkaXNwbGF5JzonZmxleCd9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5zZW8tYm94X19tb3JlJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgJCgnLnNlby1ib3hfX21vcmUnKS5yZW1vdmUoKTtcclxuICAgICAgICAkKCcuc2VvLWJveF9fdGV4dCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQod2luZG93KS5vbignbG9hZCByZXNpemUnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCB3aW5XaWR0aCA9ICQodGhpcykud2lkdGgoKTtcclxuICAgICAgICBpZiAod2luV2lkdGggPiA3NjcgJiYgd2luV2lkdGggPD0gOTkxKSB7XHJcbiAgICAgICAgICAgICQoJy5mb290ZXItaW5uZXJfX2xpc3QnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGQgPSAgJCh0aGlzKS5maW5kKCcuZm9vdGVyLWlubmVyX19saXN0LWl0ZW0nKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgPiA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLmFkZENsYXNzKCdjb2x1bW4taXRlbScpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh3aW5XaWR0aCA+IDk5MSkge1xyXG4gICAgICAgICAgICByZWZyZXNoTWVudVN0YXR1cygpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcblxyXG4gICAgJCgnLnNlbGVjdF9faW5uZXInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0ICRib3ggPSAkKHRoaXMpLnNpYmxpbmdzKCcuc2VsZWN0X19jb250ZW50Jyk7XHJcbiAgICAgICAgJCh0aGlzKS5zZWxlY3QyKHtcclxuICAgICAgICAgICAgZHJvcGRvd25QYXJlbnQ6ICRib3hcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgJCgnLmFydGljbGVfX3BpYycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhpc0ltZ1NyYyA9ICQodGhpcykuZmluZCgnLmFydGljbGVfX2ltZycpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyB0aGlzSW1nU3JjICsgJyknXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy5hcnRpY2xlLXByZXZfX3BpYycpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgdGhpc0ltZ1NyYyA9ICQodGhpcykuZmluZCgnLmFydGljbGUtcHJldl9faW1nJykuYXR0cignc3JjJyk7XHJcbiAgICAgICAgJCh0aGlzKS5jc3Moe1xyXG4gICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6ICd1cmwoJyArIHRoaXNJbWdTcmMgKyAnKSdcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnRhYi1pdGVtc19fbW9iaWxlLXRhYi1hcnJvdycpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHBhcmVudCA9ICQodGhpcykucGFyZW50KCcudGFiLWl0ZW1zX19saXN0Jyk7XHJcbiAgICAgICAgcGFyZW50LnRvZ2dsZUNsYXNzKCdzaG93Jyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiByZWdTdGVwc0RvbmUoZWxDbGFzcyxhZGRDbGFzcykge1xyXG5cclxuICAgICAgICAkKGVsQ2xhc3MpLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsKXtcclxuICAgICAgICAgICAgaWYoJChlbCkuaGFzQ2xhc3MoJ2FjdGl2ZScpKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdvaycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH0gICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoZWwpLmFkZENsYXNzKGFkZENsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbi8vICQoJy5wb3B1cF9fY2xvc2UtYnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgbGV0IHBvcHVwID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuICAgIC8vICAgICBwb3B1cC5mYWRlT3V0KDQwMClcclxuICAgIC8vIH0pO1xyXG5cclxuXHJcbi8vIGZ1bmN0aW9uIHRvZ2dsZVRhYnNPbkFjY291bnRQYWdlKCl7XHJcbi8vXHJcbi8vICAgICBsZXQgY29udGFpbmVyID0gJCgnLnRhYi1pdGVtc19fbGlzdCcpLFxyXG4vLyAgICAgICAgIGFsbEl0ZW1zID0gY29udGFpbmVyLmZpbmQoJy50YWItaXRlbXNfX2l0ZW0nKSxcclxuLy8gICAgICAgICBpdGVtQWN0aXZlID0gY29udGFpbmVyLmZpbmQoJy51aS10YWJzLWFjdGl2ZScpLFxyXG4vLyAgICAgICAgIG9wZW5UYWJCdG4gPSBjb250YWluZXIuZmluZCgnLnRhYi1pdGVtc19fbW9iaWxlLXRhYi1hcnJvdycpO1xyXG4vL1xyXG4vLyAgICAgb3BlblRhYkJ0bi5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgICAgIGNvbnRhaW5lci5maW5kKCcudGFiLWl0ZW1zX19pdGVtJykuc2xpZGVEb3duKCk7XHJcbi8vICAgICB9KTtcclxuLy9cclxuLy8gICAgIGFsbEl0ZW1zLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbi8vXHJcbi8vICAgICAgICAgbGV0IGl0ZW0gPSAgJCh0aGlzKTtcclxuLy9cclxuLy8gICAgICAgICBpZihpdGVtLmhhc0NsYXNzKCd1aS10YWJzLWFjdGl2ZScpKXtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbi8vICAgICAgICAgfSBlbHNlIHtcclxuLy9cclxuLy8gICAgICAgICB9XHJcbi8vXHJcbi8vICAgICB9KTtcclxuLy8gICAgIGl0ZW1BY3RpdmUuc2hvdygpO1xyXG4vL1xyXG4vLyB9O1xyXG5cclxuIl19
