$(function () {

  // 成分表示が開いているか否か
  var isIngredientsOpen = false; //初期は閉じた状態
  var $ingredientsBtn = $('.ingredients-btn');

  // COLOR切り替え
  $('.color-tab-body-wrap').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.color-tab-btn',
    infinite: false,
    draggable: false,
    adaptiveHeight: false,
  });

  // サムネイル
  $('.color-tab-btn').on('init', function () {
    $(this).addClass('-left-end')
  }).slick({
    asNavFor: '.color-tab-body-wrap',
    centerPadding: 0,
    focusOnSelect: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          focusOnSelect: true,
          slidesToShow: 3,
          swipeToSlide: true,
          touchThreshold: 20,
          variableWidth: true
        }
      }
    ]
  }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {

    if (0 < nextSlide) $('.color-tab-btn').removeClass('-left-end');
    else $('.color-tab-btn').addClass('-left-end');

    $('.ingredients-body').hide();
    var $colorTabBody = $('.color-tab-body').eq(nextSlide);
    $colorTabBody.find('.ingredients-body').show();


    $ingredientsBtn.removeClass('is-open');
    $('.ingredients-body').removeClass('is-open');
    isIngredientsOpen = false;


  }).on('afterChange', function () {

    $('.color-tab-body').each(function () {


      ingredientsBodyContHeight = $(this).find('.ingredients-body-cont').height();
      $(this).find('.ingredients-body').css({
        'height': ingredientsBodyContHeight + 5
      });
    });

  });

  // 成分表示

  // var $ingredientsBodyCont;
  $ingredientsBodyCont = $('.ingredients-body-cont');
  var ingredientsBodyContHeight;


  $('.color-tab-body').each(function () {
    $(this).has('.color-tab-body-sub-img').find('.ingredients-body').addClass('has-img');
  });

  // if ($('.color-tab-body-sub-img').length) {
  //   $('.ingredients-body').addClass('has-img');
  // }

  $(window).on('load', function () {
    $('.color-tab-body').each(function () {
      ingredientsBodyContHeight = $(this).find('.ingredients-body-cont').height();
      $(this).find('.ingredients-body').css({
        'height': ingredientsBodyContHeight + 5
      });
    });
  })

  $ingredientsBtn.on('click', function () {
    // var $ingredientsBtn = $('.ingredients-btn'),
    // var $targetIngredientsBody = $(this).prev('.ingredients-body');

    $(this).toggleClass('is-open');
    $(this).prev('.ingredients-body').toggleClass('is-open');

    return false;
  })

  // 使い方
  $('.howto-btn').on('click', function () {
    var $self = $(this);
    if ($self.hasClass('is-open')) {
      $self.next('.howto-body').slideUp();
      $self.removeClass('is-open');
    } else {
      $self.next('.howto-body').slideDown();
      $self.addClass('is-open');
    }
  })


  // var resize = function () {

  //   var timeoutID = 0;
  //   var delay = 500;

  //   window.addEventListener("resize", function () {
  //     clearTimeout(timeoutID);
  //     timeoutID = setTimeout(function () {

  //       ingredientsBodyContHeight = $ingredientsBodyCont.height();
  //       $('.ingredients-body').css({
  //         'height': ingredientsBodyContHeight + 5
  //       });

  //       $('.color-tab-body').each(function () {
  //         ingredientsBodyContHeight = $(this).find('.ingredients-body-cont').height();
  //         $(this).find('.ingredients-body').css({
  //           'height': ingredientsBodyContHeight + 5
  //         });
  //       });

  //     }, delay);
  //   }, false);
  // };

  // resize();


  // 商品画像の切り替え
  if ($('.item-slider-main-inner').length > 0) {

    // 商品写真のスライドショー
    // メイン
    $('.item-slider-main').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.item-slider-nav',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: true,
            fade: false,
            infinite: false,
          }
        }
      ]
    });

    // サムネイル
    $('.item-slider-nav').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.item-slider-main',
      //dots: true,
      centerMode: true,
      centerPadding: 0,
      focusOnSelect: true,
      infinite: false,
      draggable: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            centerMode: false,
          }
        }
      ]
    });
  }



  $(window).breakPoint({
    smartPhoneWidth: 767,
    tabletWidth: 0,
    pcMediumWidth: 0,

    onSmartPhoneEnter: function () {

      // 商品画像の切り替え
      if ($('.cmn-item-list').length > 0) {

        // 商品写真のスライドショー
        // メイン
        $('.cmn-item-list').slick({
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                adaptiveHeight: true,
              }
            }
          ]
        });
      }
    },
  })




  $('#modal-shop-detail-btn').on('click', function () {
    $('#modal-shop-detail').addClass('-open');
    return false;
  })


});
