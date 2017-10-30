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

    regStepsDone('.step-indicator__item', 'step-done');
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
}

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
    $('.seo-box__text').removeClass('hidden-xs hidden-sm');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsIiRiaWdWYWx1ZVNsaWRlciIsImdldEVsZW1lbnRCeUlkIiwic3RlcCIsIm1pbkFtb3VudCIsIm1heEFtb3VudCIsInRleHQiLCJub1VpU2xpZGVyIiwiY3JlYXRlIiwic3RhcnQiLCJiZWhhdmlvdXIiLCJjb25uZWN0IiwiZm9ybWF0Iiwid051bWIiLCJkZWNpbWFscyIsInRob3VzYW5kIiwicmFuZ2UiLCJwaXBzIiwibW9kZSIsInZhbHVlcyIsImRlbnNpdHkiLCJzdGVwcGVkIiwib24iLCJoYW5kbGUiLCIkcHJlbG9hZGVyIiwiZmFkZU91dCIsImRlbGF5Iiwic2V0VGltZW91dCIsInJlbW92ZSIsImVhY2giLCJlIiwiZmluZCIsImFkZENsYXNzIiwiYXR0ciIsInJlZ1N0ZXBzRG9uZSIsImNsaWNrIiwicmVtb3ZlQ2xhc3MiLCJjb2xsYXBzZSIsInF1ZXN0aW9uQ29udGFpbmVyIiwicGFyZW50cyIsInRvZ2dsZUNsYXNzIiwiaGFzQ2xhc3MiLCJoaWRlIiwic2xpZGVEb3duIiwiY3NzIiwibnVtQ29udGVudCIsImxpc3QiLCJmYWRlSW4iLCJ3aW5XaWR0aCIsIndpbmRvdyIsIndpZHRoIiwic2xpZGVVcCIsInNpYmxpbmdzIiwicmVmcmVzaE1lbnVTdGF0dXMiLCJyZW1vdmVBdHRyIiwic2xpZGVUb2dnbGUiLCJjaGlsZCIsImxlbmd0aCIsImNoaWxkcmVuIiwiJGJveCIsInNlbGVjdDIiLCJkcm9wZG93blBhcmVudCIsInRoaXNJbWdTcmMiLCJwYXJlbnQiLCJlbENsYXNzIiwiaW5kZXgiLCJlbCIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7O0FBRXpCLFFBQUlDLGtCQUFrQkYsU0FBU0csY0FBVCxDQUF3QixjQUF4QixDQUF0QjtBQUFBLFFB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b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKmZ1bmN0aW9uIGZhZGVPdXRNb2RhbCgpIHtcclxuICAgICQoJy5tb2RhbC1ib3guc2hvdyAubW9kYWwtYm94X2JvZHknKS5yZW1vdmVDbGFzcygnZmFkZUluVXAnKS5hZGRDbGFzcygnZmFkZU91dFVwJyk7XHJcbiAgICAkKCcubW9kYWwtYm94LnNob3cnKS5yZW1vdmVDbGFzcygnZmFkZUluJykuYWRkQ2xhc3MoJ2ZhZGVPdXQnKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCcubW9kYWwtYm94LnNob3cnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG4gICAgfSw1MDApO1xyXG5cclxufTtcclxuXHJcbiQoZG9jdW1lbnQpLmtleXVwKGZ1bmN0aW9uKGUpe1xyXG5cclxuXHJcbiAgICBpZihlLmtleUNvZGUgPT0gMjcpIHtcclxuICAgICAgICBmYWRlT3V0TW9kYWwoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4kKCcubW9kYWwtYm94X2Nsb3NlLCAubW9kYWwtYm94X3NoYWRvdycpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICBmYWRlT3V0TW9kYWwoKVxyXG59KTsqL1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgbGV0ICRiaWdWYWx1ZVNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXItcmFuZ2UnKSxcclxuICAgICAgICBzdGVwID0gMTAwMCxcclxuICAgICAgICBtaW5BbW91bnQgPSAxMDAwLFxyXG4gICAgICAgIG1heEFtb3VudCA9IDgwMDAwO1xyXG5cclxuICAgICQoJy5jYWxjdWxhdG9yLWJveF9fYW1vdW50JykudGV4dChtaW5BbW91bnQpXHJcblxyXG4gICAgaWYgKCRiaWdWYWx1ZVNsaWRlcikge1xyXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKCRiaWdWYWx1ZVNsaWRlciwge1xyXG4gICAgICAgICAgICBzdGFydDogW21pbkFtb3VudF0sXHJcbiAgICAgICAgICAgIHN0ZXA6IHN0ZXAsXHJcbiAgICAgICAgICAgIGJlaGF2aW91cjogJ3NuYXAnLFxyXG4gICAgICAgICAgICBjb25uZWN0OiBbdHJ1ZSwgZmFsc2VdLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IHdOdW1iKHtcclxuICAgICAgICAgICAgICAgIGRlY2ltYWxzOiAwLFxyXG4gICAgICAgICAgICAgICAgdGhvdXNhbmQ6ICcgJ1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICdtaW4nOiBbbWluQW1vdW50XSxcclxuICAgICAgICAgICAgICAgICdtYXgnOiBbbWF4QW1vdW50XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwaXBzOiB7XHJcbiAgICAgICAgICAgICAgICBtb2RlOiAncG9zaXRpb25zJyxcclxuICAgICAgICAgICAgICAgIHZhbHVlczogWzAsNDkuMzY3LDEwMF0sXHJcbiAgICAgICAgICAgICAgICBkZW5zaXR5OiAxMCxcclxuICAgICAgICAgICAgICAgIHN0ZXBwZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJGJpZ1ZhbHVlU2xpZGVyLm5vVWlTbGlkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uKHZhbHVlcywgaGFuZGxlKSB7XHJcbiAgICAgICAgICAgICQoJy5jYWxjdWxhdG9yLWJveF9fYW1vdW50JykudGV4dCh2YWx1ZXNbaGFuZGxlXSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gJCggXCIuc3RlcHMtbWFpbi1jb250YWluZXJcIiApLnRhYnMoe1xyXG4gICAgLy8gICAgIGFjdGl2ZTogMCxcclxuICAgIC8vICAgICBzaG93OiB7IGVmZmVjdDogXCJmYWRlXCIsIGR1cmF0aW9uOiAzMDAgfVxyXG4gICAgLy8gfSk7XHJcbiAgICAvL1xyXG4gICAgLy8gJCggXCIuYWNjb3VudC1tYWluLWNvbnRhaW5lclwiICkudGFicygpO1xyXG5cclxuICAgIC8vIHRvZ2dsZVRhYnNPbkFjY291bnRQYWdlKCk7XHJcblxyXG4gICAgLy8gYWNjb3VudERhdGFFZGl0VG9nZ2xlKCk7XHJcblxyXG4gICAgdmFyICRwcmVsb2FkZXIgPSAkKCcubG9hZGVyX19jb250YWluZXInKTtcclxuICAgICRwcmVsb2FkZXIuZmFkZU91dCg1MDApO1xyXG4gICAgJHByZWxvYWRlci5kZWxheSg1MDApLmZhZGVPdXQoNTAwKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAkcHJlbG9hZGVyLnJlbW92ZSgpO1xyXG4gICAgfSwxNTAwKTtcclxuXHJcbiAgICAkKCcucXVlc3Rpb25zLWl0ZW06Zmlyc3QtY2hpbGQnKS5lYWNoKGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLnF1ZXN0aW9uLCAucXVlc3Rpb25fX3RpdGxlJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuZmluZCgnLnF1ZXN0aW9uX190ZXh0JykuYWRkQ2xhc3MoJ2luJykuYXR0cignYXJpYS1leHBhbmRlZCcsJ3RydWUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJlZ1N0ZXBzRG9uZSgnLnN0ZXAtaW5kaWNhdG9yX19pdGVtJywnc3RlcC1kb25lJyk7XHJcbn0pO1xyXG5cclxuXHJcbiAgICAkKCcucXVlc3Rpb25fX3RpdGxlJykuY2xpY2soZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgJCgnLnF1ZXN0aW9uJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcucXVlc3Rpb25fX3RpdGxlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5xdWVzdGlvbl9fdGV4dC5pbicpLmNvbGxhcHNlKCd0b2dnbGUnKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGxldCBxdWVzdGlvbkNvbnRhaW5lciA9ICQodGhpcykucGFyZW50cygnLnF1ZXN0aW9uJyk7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgcXVlc3Rpb25Db250YWluZXIudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIHF1ZXN0aW9uQ29udGFpbmVyLmZpbmQoJy5xdWVzdGlvbl9fdGV4dCcpLmNvbGxhcHNlKCd0b2dnbGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcubWVudV9fbG9naW5fYnRuLW1vYmlsZSwgLm1lbnVfX3RhYl9iYWNrLWljbycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQoJy5tZW51X190YWInKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNsaWRlRG93bigpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmNzcygnZGlzcGxheScpID09PSAnYmxvY2snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoeydkaXNwbGF5JzonZmxleCd9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5mb290ZXItaW5uZXJfX2Zvb3QtbmF2LWxpbmsnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAkKCcuZm9vdGVyLWlubmVyX19mb290LW5hdi1saW5rJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgbGV0IG51bUNvbnRlbnQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtZm9vdGVyLWNvbnRlbnQnKTtcclxuICAgICAgICAkKCcuZm9vdGVyLWlubmVyX19jb250ZW50JykuZWFjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICQoJy5mb290ZXItaW5uZXJfX2NvbnRlbnQnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG4gICAgICAgICAgICBsZXQgbGlzdCA9ICQodGhpcykuZmluZCgnLmZvb3Rlci1pbm5lcl9fbGlzdCcpO1xyXG4gICAgICAgICAgICBpZiAobGlzdC5hdHRyKCdkYXRhLWZvb3Rlci1jb250ZW50JykgPT09IG51bUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgICAgICQoJy5mb290ZXItaW5uZXJfX2NvbnRlbnQnKS5oaWRlKClcclxuICAgICAgICAgICAgICAgICQodGhpcykuZmFkZUluKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5mb290ZXItaW5uZXJfX3RpdGxlOm5vdCgub3BlbiwgLnNvY2lhbC1ib3gpJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgbGV0IHdpbldpZHRoID0gJCh3aW5kb3cpLndpZHRoKCk7XHJcbiAgICAgICAgaWYgKHdpbldpZHRoIDw9IDc2Nykge1xyXG4gICAgICAgICAgICAkKCcuZm9vdGVyLWlubmVyX190aXRsZScpLnJlbW92ZUNsYXNzKCdvcGVuJylcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnb3BlbicpO1xyXG4gICAgICAgICAgICAkKCcuZm9vdGVyLWlubmVyX19saXN0Om5vdCguc29jaWFsLWJveF9fbGlzdCknKS5zbGlkZVVwKCk7XHJcbiAgICAgICAgICAgICQodGhpcykuc2libGluZ3MoJy5mb290ZXItaW5uZXJfX2xpc3Q6bm90KC5zb2NpYWwtYm94X19saXN0KScpLnNsaWRlRG93bigpXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHJlZnJlc2hNZW51U3RhdHVzKCkge1xyXG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnc2hhZG93Jyk7XHJcbiAgICAgICAgJCgnLmJ1dHRvbi1tb2JpbGVfX2J0biwgLm1lbnVfX3RhYicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICQoJy5tZW51X190YWInKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgICQoJy5tZW51X190YWI6Zmlyc3QtY2hpbGQnKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnLm1lbnUnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ1dHRvbi1tb2JpbGVfX2J0bicsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQoJ2JvZHknKS50b2dnbGVDbGFzcygnc2hhZG93Jyk7XHJcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnLm1lbnUnKS5zbGlkZVRvZ2dsZSg1MDAsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKCQodGhpcykuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICAgICAgcmVmcmVzaE1lbnVTdGF0dXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ2Jsb2NrJykge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoeydkaXNwbGF5JzonZmxleCd9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5zZW8tYm94X19tb3JlJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgJCgnLnNlby1ib3hfX21vcmUnKS5yZW1vdmUoKTtcclxuICAgICAgICAkKCcuc2VvLWJveF9fdGV4dCcpLnJlbW92ZUNsYXNzKCdoaWRkZW4teHMgaGlkZGVuLXNtJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHdpbmRvdykub24oJ2xvYWQgcmVzaXplJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgd2luV2lkdGggPSAkKHRoaXMpLndpZHRoKCk7XHJcbiAgICAgICAgaWYgKHdpbldpZHRoID4gNzY3ICYmIHdpbldpZHRoIDw9IDk5MSkge1xyXG4gICAgICAgICAgICAkKCcuZm9vdGVyLWlubmVyX19saXN0JykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkID0gICQodGhpcykuZmluZCgnLmZvb3Rlci1pbm5lcl9fbGlzdC1pdGVtJykubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkID4gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oKS5hZGRDbGFzcygnY29sdW1uLWl0ZW0nKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAod2luV2lkdGggPiA5OTEpIHtcclxuICAgICAgICAgICAgcmVmcmVzaE1lbnVTdGF0dXMoKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG5cclxuICAgICQoJy5zZWxlY3RfX2lubmVyJykuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCAkYm94ID0gJCh0aGlzKS5zaWJsaW5ncygnLnNlbGVjdF9fY29udGVudCcpO1xyXG4gICAgICAgICQodGhpcykuc2VsZWN0Mih7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duUGFyZW50OiAkYm94XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgICQoJy5hcnRpY2xlX19waWMnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoaXNJbWdTcmMgPSAkKHRoaXMpLmZpbmQoJy5hcnRpY2xlX19pbWcnKS5hdHRyKCdzcmMnKTtcclxuICAgICAgICAkKHRoaXMpLmNzcyh7XHJcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kLWltYWdlJzogJ3VybCgnICsgdGhpc0ltZ1NyYyArICcpJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuYXJ0aWNsZS1wcmV2X19waWMnKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IHRoaXNJbWdTcmMgPSAkKHRoaXMpLmZpbmQoJy5hcnRpY2xlLXByZXZfX2ltZycpLmF0dHIoJ3NyYycpO1xyXG4gICAgICAgICQodGhpcykuY3NzKHtcclxuICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyB0aGlzSW1nU3JjICsgJyknXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgICQoJy50YWItaXRlbXNfX21vYmlsZS10YWItYXJyb3cnKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLnRhYi1pdGVtc19fbGlzdCcpO1xyXG4gICAgICAgIHBhcmVudC50b2dnbGVDbGFzcygnc2hvdycpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuLy8gJCgnLnBvcHVwX19jbG9zZS1idG4nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICBsZXQgcG9wdXAgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG4gICAgLy8gICAgIHBvcHVwLmZhZGVPdXQoNDAwKVxyXG4gICAgLy8gfSk7XHJcblxyXG5cclxuLy8gZnVuY3Rpb24gdG9nZ2xlVGFic09uQWNjb3VudFBhZ2UoKXtcclxuLy9cclxuLy8gICAgIGxldCBjb250YWluZXIgPSAkKCcudGFiLWl0ZW1zX19saXN0JyksXHJcbi8vICAgICAgICAgYWxsSXRlbXMgPSBjb250YWluZXIuZmluZCgnLnRhYi1pdGVtc19faXRlbScpLFxyXG4vLyAgICAgICAgIGl0ZW1BY3RpdmUgPSBjb250YWluZXIuZmluZCgnLnVpLXRhYnMtYWN0aXZlJyksXHJcbi8vICAgICAgICAgb3BlblRhYkJ0biA9IGNvbnRhaW5lci5maW5kKCcudGFiLWl0ZW1zX19tb2JpbGUtdGFiLWFycm93Jyk7XHJcbi8vXHJcbi8vICAgICBvcGVuVGFiQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbi8vICAgICAgICAgY29udGFpbmVyLmZpbmQoJy50YWItaXRlbXNfX2l0ZW0nKS5zbGlkZURvd24oKTtcclxuLy8gICAgIH0pO1xyXG4vL1xyXG4vLyAgICAgYWxsSXRlbXMub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuLy9cclxuLy8gICAgICAgICBsZXQgaXRlbSA9ICAkKHRoaXMpO1xyXG4vL1xyXG4vLyAgICAgICAgIGlmKGl0ZW0uaGFzQ2xhc3MoJ3VpLXRhYnMtYWN0aXZlJykpe1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuLy8gICAgICAgICB9IGVsc2Uge1xyXG4vL1xyXG4vLyAgICAgICAgIH1cclxuLy9cclxuLy8gICAgIH0pO1xyXG4vLyAgICAgaXRlbUFjdGl2ZS5zaG93KCk7XHJcbi8vXHJcbi8vIH07XHJcblxyXG5mdW5jdGlvbiByZWdTdGVwc0RvbmUoZWxDbGFzcyxhZGRDbGFzcykge1xyXG5cclxuICAgICQoZWxDbGFzcykuZWFjaChmdW5jdGlvbihpbmRleCwgZWwpe1xyXG4gICAgICAgICAgICBpZigkKGVsKS5oYXNDbGFzcygnYWN0aXZlJykpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ29rJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfSAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChlbCkuYWRkQ2xhc3MoYWRkQ2xhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG59Il19
