'use strict';

$(document).ready(function () {
    getWindowWidth();

    //sliders

    //product slider on main page is disabled
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
        }, {
            breakpoint: 641,
            settings: {
                slidesToShow: 2,
                arrows: false
            }
        }, {
            breakpoint: 481,
            settings: {
                slidesToShow: 1,
                dots: true,
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
        }, {
            breakpoint: 481,
            settings: {
                slidesToShow: 4,
                rows: 1,
                arrows: false
            }
        }, {
            breakpoint: 360,
            settings: {
                slidesToShow: 3,
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

    //PDP slider
    $('.js_product-slider-big').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.js_product-slider-nav',
        responsive: [{
            breakpoint: 1025,
            settings: {
                dots: true
            }
        }]
    }).css({ "opacity": "1" });

    $('.js_product-slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.js_product-slider-big',
        focusOnSelect: true,
        arrows: false,
        verticalSwiping: true,
        vertical: true,
        centerMode: true
    }).css({ "opacity": "1" });

    $('.product-tab-mobile').on('click', mobileAccordion);

    asideFilterMobile();
    clearSearchField();
    productItemHeight();
    miniCard();
    toUp();
    searchResultCornerLeftPosition();
    headerBasketMove();
    searchMobile();
    mobileNav();
    articleDotsPosition();
    articleTitleHeight();
    tabs();
    productPageLabelHeight();
    customCounter();
    productPrice();
    oneClick();
    BasketTotalPrice();
    checkedInput();
    basketBox();
    setBoxPrice($('.js_box-price'));
    delBasketItem();
    basketPost();
    preorderMove();
    shippingInfoBasketMove();
    basketTotalFixed();
    oneClickSuccess();
});

$(window).resize(function () {
    clearSearchField();
    productItemHeight();
    searchResultCornerLeftPosition();
    getWindowWidth();
    headerBasketMove();
    searchMobile();
    mobileNav();
    articleDotsPosition();
    articleTitleHeight();
    clearMobileAccordion();
    preorderMove();
    shippingInfoBasketMove();
    basketTotalFixed();
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
                //если нужен поиск после каждой введенной буквы (добавить переинициализацию слайдера и высоты продуктов в success)
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

function productItemHeight() {
    $('.product-slider__brand, .product-item__brand, .product-slider__title-wrap, .product-item__title-wrap').css({ 'height': '' });

    setTimeout(function () {
        $('.product-slider__brand, .product-item__brand').setMaxHeights();
        $('.product-slider__title-wrap, .product-item__title-wrap').setMaxHeights();
    }, 200);
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

    if (getWindowWidth() <= 1024) {
        $button.on('click', function () {
            $(this).toggleClass('active');
            $navWrap.toggleClass('active');
            $overlay.toggleClass('active');
            $body.toggleClass('js_no-scroll');
            $('.js_aside-close').trigger('click');
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
        $body.removeClass('js_no-scroll');
    }
}

function articleDotsPosition() {
    var $dots = $('.articles-slider .slick-dots'),
        $img = $('.articles-slider__img');

    if (getWindowWidth() <= 480) {
        $dots.css({ "top": $img.height() - 15 - 19 + "px" });
    }
}

function articleTitleHeight() {
    $('.articles-slider__title-wrap').css({ 'height': '' });

    setTimeout(function () {
        $('.articles-slider__title-wrap').setMaxHeights();
    }, 200);
}

function productPageLabelHeight() {
    $('.product-choose-param-item').css({ 'height': '' });

    setTimeout(function () {
        $('.product-choose-param-item').setMaxHeights();
    }, 200);
}

function asideFilterMobile() {
    var $filter = $('.aside-filter');

    $('.js_show-mobile-filter').on('click', function () {
        $filter.addClass('active');
    });

    $('.aside-close').on('click', function () {
        $filter.removeClass('active');
    });
}

function tabs() {
    $(document).on('click', '.tab', function () {
        if (getWindowWidth() > 768) {
            $(this).closest('.tabs-wrap').find('.tab, .panel').removeClass('active');
            $(this).addClass('active').closest('.tabs-wrap').find('div[data-id="' + $(this).attr('data-id') + '"]').addClass('active');
        }
    });
}

function customCounter() {
    $('.counter-button').on('click', function () {
        var $counter = $(this).closest('.counter').find('.counter__value'),
            $basketItem = $(this).closest('.basket-item'),
            $productPrice = $basketItem.find('.basket-item__price').data('price'),
            $totalPriceEl = $basketItem.find('.basket-item__total'),
            $totalPrice = 0,
            totalPriceResult = '';

        if ($(this).data('counter-button') === "up") {
            $counter.val(parseInt($counter.val()) + 1);

            if (parseInt($counter.val()) > parseInt($counter.data('max-count'))) {
                $counter.val(parseInt($counter.data('max-count')));
            }
        } else {
            $counter.val(parseInt($counter.val()) - 1);

            if (parseInt($counter.val()) < 1) {
                $counter.val(1);
            }
        }

        if ($basketItem.length) {
            $totalPrice = parseFloat($productPrice) * parseInt($counter.val());
            $totalPriceEl.text(setPrice($totalPrice));
            BasketTotalPrice();
        }
    });

    $(".counter__value").keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
}

function setPrice(priceStr) {
    var priceArr = priceStr.toFixed(2).split('.'),
        price = '';

    price = priceArr[1] === '00' ? priceArr[0] + ' руб.' : priceArr[0] + ' руб. ' + priceArr[1] + ' коп.';

    return price;
}

function delBasketItem() {
    $('.js_basket-item-remove').on('click', function () {
        $(this).closest('.basket-item').remove();
        BasketTotalPrice();

        if (!$('.basket-item').length) {
            $('h1').text('Корзина пуста');
            $('.basket-form').html('');
        }
    });
}

function BasketTotalPrice() {
    if ($('.basket-form').length) {
        var $subTotal = $('.basket-sub-total-price'),
            $productItem = $('.basket-item__price'),
            $checkbox = $('.js_box-checkbox'),
            resultValue = 0;

        $productItem.each(function () {
            resultValue += parseFloat($(this).data('price')) * parseInt($(this).closest('.basket-item').find('.counter__value').val());
        });

        if ($checkbox.prop('checked')) {
            resultValue += parseFloat($('.js_box-price:checked').data('price'));
        }

        $subTotal.text(setPrice(resultValue));
    }
}

function basketBox() {
    $('.js_box-checkbox, .js_box-price').on('change', function () {
        BasketTotalPrice();
        setBoxPrice($(this));
    });
}

function setBoxPrice($el) {
    if ($el.hasClass('js_box-price') && $('.basket-products-box__price').length) {
        $('.basket-products-box__price').text(setPrice(parseFloat($('.js_box-price:checked').data('price'))));
    }
}

function productPrice() {
    var $input = $('.product-choose-param__checkbox');

    activeLabelEl($input);

    $input.on('click', function () {
        activeLabelEl($input);
    });

    function activeLabelEl($input) {
        var $price = $('.product-price'),
            $oldPrice = $('.product-old-price'),
            currency = ' руб.';

        $input.each(function () {
            if ($(this).prop('checked')) {
                $price.text($(this).val() + currency);

                if ($(this).data('sale')) {
                    $oldPrice.text($(this).data('sale') + currency).show();
                    $price.addClass('sale');
                } else {
                    $oldPrice.text('').hide();
                    $price.removeClass('sale');
                }
            }
        });
    }
}

function oneClick() {
    $('.js_one-click').fancybox({
        closeBtn: true,
        padding: 0,
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(3,3,3,0.8)'
                }
            }
        }
    });
}

function oneClickSuccess() {
    $('.js_one-click-success').fancybox({
        closeBtn: false,
        padding: 0,
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(3,3,3,0.8)'
                }
            }
        }
    });
}

function showSuccessMesage(time) {
    time = time || 3000;

    $('.js_one-click-success').trigger('click');

    setTimeout(function () {
        $.fancybox.close();
    }, time);
}

function mobileAccordion() {
    if (getWindowWidth() < 769) {
        $('.product-tab-mobile').not($(this)).removeClass('active').next().slideUp();
        $(this).toggleClass('active').next().stop().slideToggle();
    }
}

function clearMobileAccordion() {
    if (getWindowWidth() > 768) {
        $('.product-tab-mobile').removeClass('active').next().css('display', '');
    }
}

/**
 * inputs have to parent element label
 */
function checkedInput() {
    var reset = document.querySelectorAll('input[type="reset"]');

    inspectionInputs(document.querySelectorAll('input[type="checkbox"], input[type="radio"]'));

    document.addEventListener('change', function (e) {
        if (e.target.closest('.checkbox') && !e.target.hasAttribute('disabled')) {
            e.target.closest('.checkbox').classList.toggle('active');
        }

        if (e.target.closest('.radio')) {
            inspectionInputs(document.querySelectorAll('input[type="radio"]'));
        }
    });

    document.addEventListener('click', function (e) {
        for (var i = 0; i < reset.length; i++) {
            if (e.target === reset[i]) {
                setTimeout(function () {
                    inspectionInputs(document.querySelectorAll('input[type="checkbox"], input[type="radio"]'));
                }, 0);
            }
        }
    });
}

function inspectionInputs(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
            arr[i].parentElement.classList.add('active');
        } else {
            arr[i].parentElement.classList.remove('active');
        }

        if (arr[i].hasAttribute('disabled')) {
            arr[i].parentElement.classList.add('disabled');
        }
    }
}

function basketPost() {
    var $postRow = $('.basket-address__post');

    $('.basket-shipping__checkbox').on('click', function () {
        if ($(this).hasClass('js_basket-post')) {
            $postRow.css({ 'display': 'flex' });
        } else {
            $postRow.css({ 'display': '' });
        }
    });
}

function preorderMove() {
    $('.basket-item').each(function () {
        var $preOrder = $(this).find('.basket-item__pre-order');
        if (getWindowWidth() <= 1024) {
            $(this).append($preOrder);
        } else {
            $(this).find('.basket-item__info').append($preOrder);
        }
    });
}

function shippingInfoBasketMove() {
    var $productBoxPrice = $('.basket-products-box__price');
    if (getWindowWidth() <= 768) {
        $('.basket-products-box-select').append($productBoxPrice);
    } else {
        $('.basket-products-box').append($productBoxPrice);
    }
}

function basketTotalFixed() {
    if ($('.basket-submit-wrap').length && getWindowWidth() <= 768) {
        $('body').addClass('basket-page');
    } else {
        $('body').removeClass('basket-page');
    }
}

$.fn.setMaxHeights = function () {
    var maxHeight = this.map(function (i, e) {
        return $(e).height();
    }).get();

    return this.height(Math.max.apply(this, maxHeight));
};