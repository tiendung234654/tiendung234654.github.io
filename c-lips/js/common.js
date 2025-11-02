var $win = $(window)

/**
 * breakPoint
 */

let spFlag;
let pcFlag;

$(window).breakPoint({
  smartPhoneWidth: 767,
  tabletWidth: 0,
  pcMediumWidth: 0,

  onSmartPhoneEnter: function () {

    spFlag = true;
    pcFlag = false;

    // スマホモード時の処理を書く
    //MENUボタン
    var $menuBtn = $('#js-panel-btn')
    var $menuWrap = $('#gnav-wrap')

    $menuBtn.on('click', function () {
      $(this).toggleClass('close')

      if ($menuBtn.hasClass('close')) {
        $menuWrap.show().addClass('show')
        $('#wrapper').css({
          display: 'none',
          overflow: 'hidden',
        })
      } else {
        $menuWrap.hide().removeClass('show')
        $('#wrapper').css({
          display: ' block',
          overflow: 'auto',
        })
      }
      return false
    })
  },
  onPcEnter: function () {
    // PCモード時の処理を書く
    spFlag = false;
    pcFlag = true;

  },
  onSmartPhoneLeave: function () {
    // スマホモード解除時の処理を書く
  },
  onPcLeave: function () {
    // PCモード解除時の処理を書く
  },
})

/**
 * navigation
 */

$('.ja #gnav li').navigation()
$('.en #gnav li.nav').navigation()

/**
 * smoothLink
 */

$('.smooth a').smoothLink()

/**
 * objectFitImages
 */

objectFitImages('img.ofi-cover, img.ofi-contain')

/**
 * pagetop
 */

var $pt = $('#pagetop')

$pt.hide()

$pt.find('a').on('click', function () {
  $('html, body')
    .scrollTop(377)
    .stop()
    .animate({ scrollTop: 0 }, 890, 'easeOutExpo')
  return false
})

$win.on('load scroll', function () {
  var wh = $win.height()
  var wst = $win.scrollTop()
  var fot = $('.head-wrap').outerHeight(true) + $('#contents').outerHeight(true)

  if (wst > 200) $pt.fadeIn()
  else $pt.fadeOut()

  if (wst < fot - wh) $pt.addClass('fixed')
  else $pt.removeClass('fixed')
})

/**
 * Tel link
 */
var ua = navigator.userAgent.toLowerCase()

if (
  (ua.indexOf('windows') > 0 && ua.indexOf('phone') > 0) ||
  ua.indexOf('iphone') > 0 ||
  ua.indexOf('ipod') > 0 ||
  (ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0) ||
  (ua.indexOf('firefox') > 0 && ua.indexOf('mobile') > 0) ||
  ua.indexOf('blackberry') > 0
) {
  // 画像
  $('.tel-link img').each(function () {
    var alt = $(this).attr('alt')
    $(this).wrap($('<a>').attr('href', 'tel:' + alt.replace(/-/g, '')))
  })

  // デバイステキスト
  $('.tel-linktext').each(function () {
    var str = $(this).text()
    $(this).addClass('sp-tel-linktext')
    $(this).html(
      $('<a>')
        .attr('href', 'tel:' + str.replace(/-/g, ''))
        .append(str + '</a>')
    )
  })
}


/**
 * head modal
 */



$('.head-utility-btn').find('a').on('click', function () {

  if ($(this).hasClass('-shop')) {
    $('#modal-shop').addClass('-open');
  } else if ($(this).hasClass('-search')) {
    $('#modal-search').addClass('-open');
  }

  return false;
})



$('.head-modal-close').on('click', function () {

  $('.head-modal').removeClass('-open');

  return false;
})



/**
 * youtube-wrap
 */
if ($('.html-wrap iframe')) {
  $('.html-wrap iframe').wrap('<div class="youtube-wrap"></div>');
}
