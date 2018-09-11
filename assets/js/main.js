'use strict';

$(document).ready(function () {
    getWindowWidth();

    //sliders
    //productSliderInit();

    $('.js_articles-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        responsive: [{
            breakpoint: 1025,
            settings: {
                arrows: false
            }
        }]
    });

    $('.js_brands-slider').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        rows: 2,
        responsive: [{
            breakpoint: 1201,
            settings: {
                slidesToShow: 6
            }
        }, {
            breakpoint: 1025,
            settings: {
                slidesToShow: 5,
                rows: 1,
                arrows: false
            }
        }]
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
    searchResultCornerLeftPosition();
    headerBasketMove();
    searchMobile();
    mobileNav();
});

$(window).resize(function () {
    clearSearchField();
    productSliderHeight();
    searchResultCornerLeftPosition();
    getWindowWidth();
    headerBasketMove();
    searchMobile();
    mobileNav();
});

function clearSearchField() {
    var $resetBtn = $('.search__reset'),
        $searchResult = $('.search-result');

    $('.search__field').off('keyup');
    $resetBtn.off('click');
    $searchResult.removeClass('active');

    if (getWindowWidth() > 1200) {
        $('.search__field').on('keyup', function () {
            if ($(this).val()) {
                $resetBtn.css({ "visibility": "visible" });
                $searchResult.addClass('active');

                //сюда можно впихать аякс для поиска,
                //если нужен поиск после каждой введенной буквы (добавить переинициализацию слайдера и высоты продуктов)
                //productSliderHeight();
                //productSliderInit();

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
}

function searchMobile() {
    var $searchMobileBtn = $('.header-bottom-search-btn');

    $searchMobileBtn.off('click').removeClass('active');
    $('.header-nav, .search').css({ 'display': '' });
    $('.header-bottom-right').removeClass('active');

    if (getWindowWidth() <= 1200) {
        $searchMobileBtn.on('click', function () {
            $(this).toggleClass('active');
            $('.search').toggle();
            $('.header-nav').toggle();
            $('.header-bottom-right').toggleClass('active');
        });
    }
}

function searchResultCornerLeftPosition() {
    $('.search-result__corner').css({ "left": Math.ceil($('.search__field').offset().left) + 60 + "px" });
}

function productSliderHeight() {
    $('.product-slider__brand').setMaxHeights();
    $('.product-slider__title').setMaxHeights();
}

//миникарта активируется, когда внутри есть элементы
function miniCard() {
    var leaveBasket = false,
        $body = $('body');

    if ($('.header-basket-minicard__item').length) {
        $body.on('mouseenter', '.header-basket, .header-basket-minicard', function () {
            leaveBasket = false;
            $('.header-basket-minicard').addClass('active');
        });

        $body.on('mouseleave', '.header-basket, .header-basket-minicard', function () {
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

function productSliderInit() {
    $('.js_product-slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        responsive: [{
            breakpoint: 1201,
            settings: {
                slidesToShow: 5
            }
        }]
    });
}

function headerBasketMove() {
    var $basketCount = $('.header-basket__count');

    if (getWindowWidth() <= 1200) {
        $('.header-basket').append($basketCount);
    } else {
        $('.header-basket__desktop-subtitle').prepend($basketCount);
    }
}

function getWindowWidth() {
    return window.mainWidth = $(window).width();
}

function mobileNav() {
    var $button = $('.header-mobile-btn'),
        $navWrap = $('.header-nav-wrap'),
        $overlay = $('.page-overlay'),
        $body = $('body');

    $button.off('click');
    $overlay.off('click');
    $body.unbind('touchmove');

    if (getWindowWidth() <= 1024) {
        $button.on('click', function () {
            $(this).toggleClass('active');
            $navWrap.toggleClass('active');
            $overlay.toggleClass('active');
        });

        $body.bind('touchmove', function (e) {
            e.preventDefault();
        });

        $overlay.on('click', function () {
            clearMobileNav();
        });
    } else {
        clearMobileNav();
    }

    function clearMobileNav() {
        $button.removeClass('active');
        $navWrap.removeClass('active');
        $overlay.removeClass('active');
        $body.unbind('touchmove');
    }
}

$.fn.setMaxHeights = function () {
    var maxHeight = this.map(function (i, e) {
        return $(e).height();
    }).get();

    return this.height(Math.max.apply(this, maxHeight));
};