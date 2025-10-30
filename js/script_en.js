// player size
var ytWidth = 640;
var ytHeight = 390;

// place youtube video id in here
var ytData = [
  {
    id: 'GhX6UeQCWoI',
    area: 'cm'
  }, {
    id: 'GhX6UeQCWoI',
    area: 'making'
  }
];

var ytPlayer = [];
var ytPlaying, ytStop, ytPlay;

// YouTube Player APIを読み込む
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// API読み込み後に、各エリアにプレーヤーを埋め込む
function onYouTubeIframeAPIReady() {
  for (var i = 0; i < ytData.length; i++) {
    ytPlayer[i] = new YT.Player(ytData[i]['area'], {
      height: ytHeight,
      width: ytWidth,
      videoId: ytData[i]['id'],
      playerVars: {
        loop: 1, 
        playlist: ytData[i]['id'] 
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
}

// プレーヤーの準備ができたとき
function onPlayerReady(event) {
  if (pcFlag) {
    ytPlayer[0].playVideo();
  }
}

// プレーヤーの状態に変化があった時に実行
function onPlayerStateChange(event) {
  // 各プレーヤーの状態を確認
  for (var i = 0; i < ytData.length; i++) {
    var thisState = ytPlayer[i].getPlayerState();
    if (thisState == 1 && ytPlaying == undefined) {
      ytPlaying = i;
    } else if (thisState == 1 && ytPlaying != i) {
      ytStop = ytPlaying;
      ytPlay = i;
    } else {
    }
  }
  // 同時再生があった場合、元々再生していた方を停止する
  if (ytStop != undefined) {
    ytPlayer[ytStop].stopVideo();
    ytStop = undefined;
  }
  // 現在再生中のプレーヤー番号を保存しておく
  if (ytPlay != undefined) {
    ytPlaying = ytPlay;
    ytPlay = undefined;
  }
}

$('.main-hero-movie-btn li').on('click', function () {
  var $th = $(this).index();

  $(this).addClass('active');
  $(this).siblings().removeClass('active');
  $('.main-hero-movie-item li').removeClass('active');
  $('.main-hero-movie-item li').eq($th).addClass("active");

  if (pcFlag) {
    ytPlayer[$th].playVideo();
  }

  if (spFlag) {
    $('#cm-play').removeClass('none');
    $('#cm-thumb').removeClass('none');
    $('#making-play').removeClass('none');
    $('#making-thumb').removeClass('none');
    ytPlayer[0].stopVideo();
    ytPlayer[1].stopVideo();
  }

})


$('#cm-play').on('click', function () {
  $('#cm-play').addClass('none');
  $('#cm-thumb').addClass('none');
  ytPlayer[0].playVideo();
})

$('#making-play').on('click', function () {
  $('#making-play').addClass('none');
  $('#making-thumb').addClass('none');
  ytPlayer[1].playVideo();
})

/**
 * inview
 */


$(window).on('load', function () {

  $('.set-anim').scrolla({
    mobile: true,// disable animation on mobiles
    once: true
  });

});




/**
 * insta
 */

$(function () {
  $.ajax({
    type: 'GET',
    url: '',
    dataType: 'json',
    success: function (json) {

      var html = '';
      var insta = json.media.data;
      for (var i = 0; i < insta.length; i++) {
        var media_type = insta[i].media_type;
        if (insta[i].media_type == "IMAGE" || insta[i].media_type == "CAROUSEL_ALBUM") {
          html += '<li><a href="' + insta[i].permalink + '" target="_blank" rel="noopener noreferrer"><img src="' + insta[i].media_url + '" class="ofi-cover"></a></li>';
        } else if (media_type == "VIDEO") {
          html += '<li><a href="' + insta[i].permalink + '" target="_blank" rel="noopener noreferrer"><img src="' + insta[i].thumbnail_url + '" class="ofi-cover"></a></li>';
          var media_type = '';
        }
      }
      $(".top-instagram-list").append(html);
    },
    error: function () {

      //エラー時の処理
    }
  });
});


$(function () {
  $(".slide-list-slick").slick({
    dots: true,
    centerMode: true,
    slidesToShow: 1,
    infinite: true,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          autoplaySpeed: 6000,
          arrows: false,
          centerMode: false,
          variableWidth: false,
        }
      }
    ]
  });
  $(".slide-list-slick").on("beforeChange", (event, slick, currentSlide, nextSlide) => {
    $(".slide-list-slick").find(".slide-list-set").each((index, el) => {
      const $this = $(el),
        slickindex = $this.attr("data-slick-index");
      if (nextSlide == slick.slideCount - 1 && currentSlide == 0) {
        if (slickindex == "-1") {
          $this.addClass("is-active-next");
        } else {
          $this.removeClass("is-active-next");
        }
      } else if (nextSlide == 0) {
        if (slickindex == slick.slideCount) {
          $this.addClass("is-active-next");
        } else {
          $this.removeClass("is-active-next");
        }
      } else {
        $this.removeClass("is-active-next");
      }
    });
  });
  $(".top-new-item-list").slick({
    dots: false,
    slidesToShow: 3,
    infinite: true,
    // variableWidth: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          dots: true,
        }
      }
    ]
  });
});
