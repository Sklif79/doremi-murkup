'use strict';

$(document).ready(function () {
    //sliders
    productSliderInit();

    $('.js_articles-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: true
    });

    $('.js_brands-slider').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        rows: 2
    });

    //custom select
    $('.js_custom-select').select2({
        width: "100%",
        theme: 'classic',
        minimumResultsForSearch: Infinity
    });

    //fancybox
    $('a.fancybox').fancybox({
        closeBtn: true,
        padding: [20, 20, 18, 20],
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(51,51,51,0.8)'
                }

            },
            title: { type: 'inside' }
        }
    });

    clearSearchField();
    productSliderHeight();
    miniCard();
    toUp();
    fixedHeader();
    //searchResultCornerLeftPosition();
});

$(window).resize(function () {
    productSliderHeight();
    //searchResultCornerLeftPosition();
});

function clearSearchField() {
    var $resetBtn = $('.search__reset'),
        $searchResult = $('.search-result');

    $('.search__field').on('keyup', function () {
        if ($(this).val()) {
            $resetBtn.css({ "visibility": "visible" });

            //сюда можно впихать аякс для поиска,
            //если нужен поиск после каждой введенной буквы (добавить переинициализацию слайдера и высоты продуктов)
            //productSliderHeight();
            //productSliderInit();
            $searchResult.addClass('active');
        } else {
            $resetBtn.css({ "visibility": "hidden" });
            $searchResult.removeClass('active');
        }
    });

    $resetBtn.on("click", function () {
        $(this).css({ "visibility": "hidden" });
        $searchResult.removeClass('active');
    });
}

function searchResultCornerLeftPosition() {
    $('.search-result__corner').css({ "left": Math.ceil($('.search__field').offset().left) + 60 + "px" });
}

function productSliderHeight() {
    $('.product-slider__brand').setMaxHeights();
    $('.product-slider__title').setMaxHeights();
}

function miniCard() {
    var leaveBasket = false;

    if ($('.header-basket-minicard__item').length) {
        $('body').on('mouseenter', '.header-basket, .header-basket-minicard', function () {
            leaveBasket = false;
            $('.header-basket-minicard').addClass('active');
        });

        $('body').on('mouseleave', '.header-basket, .header-basket-minicard', function () {
            leaveBasket = true;
            checkLeaveBasket();
        });
    }

    function checkLeaveBasket() {
        setTimeout(function () {
            if (leaveBasket) {
                $('.header-basket-minicard').removeClass('active');
            }
        }, 500);
    }
}

function toUp() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.up-btn').show();
        } else {
            $('.up-btn').hide();
        }
    });

    $(document).on('click', '.up-btn', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });
}

function fixedHeader() {
    var $body = $('body'),
        $main = $('.main'),
        headerHeight = $('.header').height();

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $body.addClass('header_fixed');
            $main.css({ 'margin-top': headerHeight + 'px' });
        } else {
            $body.removeClass('header_fixed');
            $main.css({ 'margin-top': 0 });
        }
    });
}

function productSliderInit() {
    $('.js_product-slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        arrows: true
    });
}

$.fn.setMaxHeights = function () {
    var maxHeight = this.map(function (i, e) {
        return $(e).height();
    }).get();

    return this.height(Math.max.apply(this, maxHeight));
};