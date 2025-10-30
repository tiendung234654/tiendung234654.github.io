/**
 * nbase plugins.js
 *
 * version 1.3.3 (2015/02/06)
 */

(function($) {

    var neuqp = {
        imgext : 'gif|jpg|png',     // 画像の拡張子

        /**
         * イン画像切替え：初期設定
         */
        inImgInit : function(elms, setting)
        {
            var reg = new RegExp('(' + setting.imgPostfixOff + '|' + setting.imgPostfixIn + ')\.(' + neuqp.imgext + ')$');

            elms.find('img').each(function() {
                if (! this.originalSrc) {
                    this.originalSrc = $(this).attr('src').replace(reg, setting.imgPostfixOff + '.' + '$2');
                }
                this.inSrc = $(this).attr('src').replace(reg, setting.imgPostfixIn + '.' + '$2');
            });
        },

        /**
         * アコーディオン設定 (初期値)
         */
        accordionOptions : function()
        {
            return {
                speed           : 400,      // 切替え速度
                buttons         : 'dt',     // ボタン
                bodies          : 'dd',     // 表示・非表示させる部分
                hideOthers      : false,    // 表示時、ほかの対象を非表示とするか
                imgPostfixIn    : null,     // in画像のポストフィクス (null のときin画像使用せず)
                imgPostfixOff   : ''        // off画像のポストフィクス
            };
        },

        /**
         * アコーディオンを開く
         */
        accordionOpen : function(btn, bdy, setting)
        {
            $(bdy).slideDown(setting.speed);
            if (setting.imgPostfixIn) {
                var e = $(btn).find('img');
                e.attr('src', e[0].inSrc);
            }
        },

        /**
         * アコーディオンを閉じる
         */
        accordionClose : function(btn, bdy, setting)
        {
            $(bdy).slideUp(setting.speed, function() {
                if (setting.imgPostfixIn) {
                    var e = $(btn).find('img');
                    e.attr('src', e[0].originalSrc);
                }
            });
        }
    };



    // easing
    $.extend($.easing,{
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeOutQuad: function (t) {
            return t * (2 - t)
        },
    });



    /**
     * rollOver
     *
     * ロールオーバー
     */
    $.fn.rollOver = function(options)
    {
        // 初期値
        var setting = $.extend({
            imgPostfixOff   : '',
            imgPostfixOn    : '_on',
            imgPostfixIn    : '_in'
        }, options);


        // 正規表現の定義
        var regOn = new RegExp('(' + setting.imgPostfixOn + '|' + setting.imgPostfixIn + ')\.(' + neuqp.imgext + ')$');
        var regOff = new RegExp(setting.imgPostfixOff + '\.(' + neuqp.imgext + ')$');
        var regIn = new RegExp(setting.imgPostfixIn + '\.(' + neuqp.imgext + ')$');


        // 実処理
        this.each(function() {
            // initialize
            var oSrc = $(this).attr('src');
            if (! oSrc) {
                return false;
            }
            this.originalSrc = $(this).attr('src').replace(regOn, setting.imgPostfixOff + '.' + '$2');
            this.rolloverSrc = this.originalSrc.replace(regOff, setting.imgPostfixOn + '.' + '$1');
            this.inSrc = this.originalSrc.replace(regOff, setting.imgPostfixIn + '.' + '$1');

            // 先読み
            this.rolloverImg = new Image;
            this.rolloverImg.src = this.rolloverSrc;

            // ホバー時の処理
            $(this).hover(function() {
                if (! $(this).attr('src').match(regIn)) {
                    $(this).attr('src', this.rolloverSrc);
                }
            }, function() {
                if (! $(this).attr('src').match(regIn)) {
                    $(this).attr('src', this.originalSrc);
                }
            });
        });

        return this;
    };



    /**
     * fadeOver
     *
     * 透明度を使ったロールオーバー
     */
    $.fn.fadeOver = function(options)
    {
        // 初期値
        var setting = $.extend({
            speed   : 150,
            opacity : 0.75,
            imgPostfixIn    : null
        }, options);


        var regIn = null;
        if (setting.imgPostfixIn) {
            regIn = new RegExp(setting.imgPostfixIn + '\.(' + neuqp.imgext + ')$');
        }


        // 実処理
        this.each(function() {
            $(this).hover(function() {
                if (! regIn || ! $(this).attr('src').match(regIn)) {
                    $(this)
                        .stop(true, false)
                        .fadeTo(setting.speed, setting.opacity);
                }
            }, function() {
                if (! regIn || ! $(this).attr('src').match(regIn)) {
                    $(this).fadeTo(setting.speed, 1);
                }
            });
        });

        return this;
    };



    /**
     * crossOver
     *
     * クロスオーバー
     */
    $.fn.crossOver = function(options)
    {
        // 初期値
        var setting = $.extend({
			speed: 300,
            imgPostfixOff   : '',
            imgPostfixOn    : '_on',
            imgPostfixIn    : '_in'
        }, options);


        // 正規表現の定義
        var regOn = new RegExp('(' + setting.imgPostfixOn + '|' + setting.imgPostfixIn + ')\.(' + neuqp.imgext + ')$');
        var regOff = new RegExp(setting.imgPostfixOff + '\.(' + neuqp.imgext + ')$');
        var regIn = new RegExp(setting.imgPostfixIn + '\.(' + neuqp.imgext + ')$');


        // 実処理
        this.each(function() {
            // initialize
            var oSrc = $(this).attr('src');
            if (! oSrc) {
                return false;
            }
            this.originalSrc = $(this).attr('src').replace(regOn, setting.imgPostfixOff + '.' + '$2');
            this.rolloverSrc = this.originalSrc.replace(regOff, setting.imgPostfixOn + '.' + '$1');
            this.inSrc = this.originalSrc.replace(regOff, setting.imgPostfixIn + '.' + '$1');

            // 先読み
            this.rolloverImg = new Image;
            this.rolloverImg.src = this.rolloverSrc;

			// ボタン生成
			$(this.rolloverImg).css({
				position: 'absolute',
				display : 'block',
				opacity : 0
			});
			$(this).before(this.rolloverImg);


            // ホバー時の処理
            $(this).parent().hover(function() {
				var imgs = $(this).find('img');
				if (imgs[1].src.match(regIn)) {
					return false;
				}
				$(imgs[0])
					.width($(this).width())
					.stop(true, false)
					.fadeTo(setting.speed, 1);
            }, function() {
				var imgs = $(this).find('img');
				if (imgs[1].src.match(regIn)) {
					return false;
				}
				$(imgs[0])
					.stop(true, false)
					.fadeTo(setting.speed, 0);
            });
        });

        return this;
    };



	/**
     * smoothLink
     *
     * ページ内リンクのスムーズ・スクロール
     */
    $.fn.smoothLink = function(options)
    {
        // 初期値
        var setting = $.extend({
            speed       : 1200,
            easing      : 'easeOutExpo',
            marginTop   : 0
        }, options);


        // 実処理
        this.each(function() {
			var idx = this.href.indexOf('#');
			if (idx >= 0) {
				$(this).click(function() {
					var id = this.href.slice(idx);
					if (id != '#') {
						var t = navigator.appName.match(/Opera/) ? 'html' : 'html, body';
						$(t).animate({
								scrollTop: $(id).offset().top - setting.marginTop
							},
							setting.speed, setting.easing);
					}
					return false;
				});
			}
        });

        return this;
    };



    /**
     * alignHeights
     *
     * 高さを揃える (heightline的な)
     */
    $.fn.alignHeights = function()
    {
        // 実処理
        if (this.length > 1) {
            var maxheight = 0;
            this.each(function() {
                maxheight = Math.max($(this).height(), maxheight);
            });
            this.css('height', maxheight);
        }

        return this;
    };



    /**
     * boxTarget
     *
     * bigtarget的な
     */
    $.fn.boxTarget = function(options)
    {
        var setting = $.extend({
            hoverClass  : 'boxTargetHover'
        }, options);


        // 実処理
        this.each(function() {
            $(this)
                .css('cursor', 'pointer')
                .hover(function() {
                    $(this).addClass(setting.hoverClass);

					// ボックス内のロールオーバー
					$(this).find('img').each(function() {
						if (this.rolloverSrc) {
		                    $(this)
								.unbind('mouseover')
								.unbind('mouseout')
								.attr('src', this.rolloverSrc);
						}
					});
                }, function () {
                    $(this).removeClass(setting.hoverClass);

					// ボックス内のロールオーバー
					$(this).find('img').each(function() {
						if (this.originalSrc) {
		                    $(this).attr('src', this.originalSrc);
						}
					});
                })
                .click(function() {
                    var a = $(this).find('a:first');
                    if (a.length > 0) {
                        anchor(a, false);
                    }
                    return false;
                });


            $(this)
                .find('a')
                .click(function() {
                    anchor($(this), true);
                    return false;
                });

            function anchor(a, flg)
            {
                var href = a.attr('href');
				if (href.substr(0,1) != '#') {
					if (a.is('[target=_blank]')) {
						window.open(href);
					}
					else {
						window.location = href;
					}
				}
				else if (flg == false) {
					a.click();
				}
            }
        });

        return this;
    };



    /**
     * popup
     *
     * ポップアップウィンドウ
     */
    $.fn.popup = function(options)
    {
        // 初期値
        var setting = $.extend({
            target      : null,
            width       : 640,
            height      : 400,
            //left
            //top
            menubar     : 'no',
            toolbar     : 'no',
            location    : 'yes',
            status      : 'no',
            resizable   : 'yes',
            scrollbars  : 'yes'
        }, options);


        var target = setting.target;
        delete setting.target;

        var opts = [];
        for (var i in setting) {
            var v = (setting[i] === true) ? 'yes' : (
                    (setting[i] === false) ? 'no' : setting[i]
            );
            opts.push(i + '=' + v);
        }

        // 実処理
        this.each(function() {
            $(this).click(function() {
                window.open($(this).attr('href'), target, opts.join(','));
                return false;
            });
        });

        return this;
    };



    /**
     * flipSlide
     *
     * スライドショー 兼 タブ切替え
     */
    $.fn.flipSlide = function(options)
    {
        // 初期値
        var setting = $.extend({
            speed           : 400,      // 切替え速度
            interval        : null,     // スライドショー間隔 (null のとき切替えなし)
            buttons         : null,     // タブ(aタグ)要素
            bodies          : 'li',     // 本体部分の要素
            bodyResize      : false,    // 本体の高さを変更するか
            nextButton      : null,     // 次へボタン
            prevButton      : null,     // 前へボタン
			startPage       : 1,		// 開始ページ
            imgPostfixOff   : '',       // off画像のポストフィクス
            imgPostfixIn    : null,     // in画像のポストフィクス (null のときin画像使用せず)
            buttonInClass   : null,     // アクティブ時のボタン部分につけるクラス
            fadeOverlap     : true,     // 画像が重なるようにフェードイン/アウトするか
            animate         : null,     // 画像切替えのコールバック関数
            hashPrefix      : 'fs-'     // location.hashのプレフィックス（URLにこれを付けるとid存在しないのでジャンプしない）
        }, options);
        var timerId = null;
        var nowPage = -1;


        // 実処理
        this.each(function() {
            var buttons = (setting.buttons) ? $(this).find(setting.buttons) : null;
            var bodies = $(this).find(setting.bodies);


            // イン画像切替え：初期設定
            if (buttons && setting.imgPostfixIn) {
                neuqp.inImgInit(buttons, setting);
            }


            // 初期ページを表示
            if(location.hash){
                var hash = location.hash.substring(location.hash.indexOf('#')+1, location.hash.length);
                if(setting.hashPrefix && hash.indexOf(setting.hashPrefix) === 0){
                    var elm = bodies.filter("#"+hash.substring(setting.hashPrefix.length, hash.length));
                }else{
                    var elm = bodies.filter("#"+hash);
                }
                if(elm.size() > 0){
                    setting.startPage = bodies.index(elm)+1;
                }
            }
            pageShow(setting.startPage - 1, 1);


            // タブクリック
            if (buttons) {
                buttons.click(function() {
                    var id = this.href.substring(this.href.indexOf('#'), this.href.length);
                    var i = bodies.index(bodies.filter(id));
                    pageShow(i);
                    return false;
                });
            }

            // next ボタン
            if (setting.nextButton) {
                $(setting.nextButton).click(function() {
                    pageShowNext();
                    return false;
                });
            }

            // prev ボタン
            if (setting.prevButton) {
                $(setting.prevButton).click(function() {
                    pageShowPrev();
                    return false;
                });
            }

            // スライドショー
            if (setting.interval) {
                timerId = setTimeout(pageShowNext, setting.interval);
            }


            // 次のページ
            function pageShowNext()
            {
                var i = bodies.index(bodies.filter(':visible')) + 1;
                if (i >= bodies.length) {
                    i = 0;
                }
                pageShow(i);
            }

            // 前のページ
            function pageShowPrev()
            {
                var i = bodies.index(bodies.filter(':visible')) - 1;
                if (i < 0) {
                    i = bodies.length - 1;
                }
                pageShow(i);
            }


            // 指定されたタブを表示 (表示状態のタブは事前に消す)
            function pageShow(idx, argSpeed)
            {
                var speed = argSpeed || setting.speed;
                var showElm = $(bodies[idx]);
                var hideElm = bodies.not(':eq(' + idx + ')');
                var bodyElm = (setting.bodyResize === true) ? showElm.parent() : $(setting.bodyResize);

                nowPage = idx;


                // 切替えアニメーション
                if (! setting.animate) {
                    if (setting.fadeOverlap) {
                        // フェードイン／フェードアウト を同時に
                        hideElm
                            .stop(true, false)
                            .fadeOut(speed);
                        showElm.fadeIn(speed);

                        // 外側の高さのリサイズ
                        if (setting.bodyResize) {
                            bodyElm.animate({
                                height: showElm.height()
                            }, speed);
                        }
                    }
                    else {
                        // フェードアウト後、フェードイン
                        bodies
                            .stop(true, false)
                            .fadeOut(speed, function() {
                                if (bodies.filter(':visible').length == 0) {
                                    $(bodies[nowPage]).fadeTo(1, speed);

                                    // 外側の高さのリサイズ
                                    if (setting.bodyResize) {
                                        bodyElm.animate({
                                            height: $(bodies[nowPage]).height()
                                        }, speed);
                                    }
                                }
                            });
                    }
                }
                else {
                    // アニメーション用外部関数呼び出し
                    setting.animate(showElm, hideElm);
                }


                // タブ画像の切替え
				if (buttons) {
					buttons.each(function(i) {
						var e = $(this).find('img');
						if (buttons && setting.imgPostfixIn) {
							if (idx == i) {
								e.attr('src', e[0].inSrc);
							}
							else {
								e.attr('src', e[0].originalSrc);
							}
						}

						if (idx == i) {
							e.addClass('current');
						}
						else {
							e.removeClass('current');
						}
					});
				}


                // アクティブクラスの設定
                if (buttons && setting.buttonInClass) {
                    buttons.each(function(i) {
                        if (idx == i) {
                            $(this).addClass(setting.buttonInClass);
                        }
                        else {
                            $(this).removeClass(setting.buttonInClass);
                        }
                    });
                }


                // タイマー再設定
                if (setting.interval) {
                    if (timerId) {
                        clearInterval(timerId);
                    }
                    timerId = setTimeout(pageShowNext, setting.interval);
                }
            };
        });

        return this;
    };



    /**
     * accordion
     *
     * アコーディオンメニュー
     */
    $.fn.accordion = function(options)
    {
        // 初期値
        var setting = $.extend(neuqp.accordionOptions(), options);


        // 実処理
        this.each(function() {
            var buttons = $(this).find(setting.buttons);
            var bodies = $(this).find(setting.bodies);

            // イン画像切替え：初期設定
            if (buttons && setting.imgPostfixIn) {
                neuqp.inImgInit(buttons, setting);
            }

            $(buttons).each(function(idx) {
                $(this).click(function() {
                    if (! $(bodies[idx]).is(':visible')) {
                        // 表示する
                        neuqp.accordionOpen(this, bodies[idx], setting);

                        if (setting.hideOthers) {
                            // ほかの対象を非表示に
                            $(buttons).each(function(i) {
                                if (idx != i) {
                                    neuqp.accordionClose(this, bodies[i], setting);
                                }
                            });
                        }
                    }
                    else {
                        // 非表示にする
                        neuqp.accordionClose(this, bodies[idx], setting);
                    }
                    return false;
                });
            });
        });

        return this;
    };



    /**
     * accordionShow
     *
     * アコーディオンを開く
     */
    $.fn.accordionShow = function(options)
    {
        // 初期値
        var setting = $.extend(neuqp.accordionOptions(), options);


        // 実処理
        this.each(function() {
            var buttons = $(this).find(setting.buttons);
            var bodies = $(this).find(setting.bodies);

            // イン画像切替え：初期設定
            if (buttons && setting.imgPostfixIn) {
                neuqp.inImgInit(buttons, setting);
            }

            $(buttons).each(function(idx) {
                // 表示する
                neuqp.accordionOpen(this, bodies[idx], setting);
            });
        });

        return this;
    };



    /**
     * accordionHide
     *
     * アコーディオンを閉じる
     */
    $.fn.accordionHide = function(options)
    {
        // 初期値
        var setting = $.extend(neuqp.accordionOptions(), options);


        // 実処理
        this.each(function() {
            var buttons = $(this).find(setting.buttons);
            var bodies = $(this).find(setting.bodies);

            // イン画像切替え：初期設定
            if (buttons && setting.imgPostfixIn) {
                neuqp.inImgInit(buttons, setting);
            }

            $(buttons).each(function(idx) {
                // 非表示にする
                neuqp.accordionClose(this, bodies[idx], setting);
            });
        });

        return this;
    };

})(jQuery);



/**
 * ユーティリティ
 *
 * IEのバージョンを判別する
 */
function isIE(ver)
{
    switch (ver) {
        case 6:
            return (! jQuery.support.style && typeof document.documentElement.style.maxHeight == "undefined");
        case 7:
            return (! jQuery.support.style && typeof document.documentElement.style.maxHeight != "undefined");
        case 8:
            return (! jQuery.support.opacity && jQuery.support.style);
        case 9:
            return (window.ActiveXObject != undefined && jQuery.support.opacity);
        case 67:
            return (! jQuery.support.style);
        case 678:
            return (! jQuery.support.opacity);
        default:
            return (window.ActiveXObject != undefined);
    }
};


//jquery.navigation.js
(function($) {

	$.fn.navigation = function(options)
	{
		// デフォルト
		var settings = $.extend({
			imgext					: 'gif|jpg|png',	// 画像の拡張子
			imgPostfixOn			: '_on',			// ON画像（有：'_on',無：''）
			imgPostfixIn			: '',				// IN画像（有：'_in',無：''）
			effect					: 'roll',			// エフェクト（画像切替：'roll', 透明度：'fade', クロス：'cross'）
			activeClass				: 'active',			// 自ページ時のクラス
			activeClassTarget		: 'li',				// 自ページクラス対象
			activeParentClass		: 'activeParent',	// 上位階層時のクラス
			activeParentClassTarget	: 'li',				// 上位階層クラス対象
			exParentClass			: 'exparent',		// 上位階層対象除外クラス
			exParentPath			: '/',				// 上位階層対象除外パス
			fade_speed				: 150,
			fade_opacity			: 0.75,
			cross_in_speed			: "slow",
			cross_out_speed			: 150,
			cross_off_speed			: 200,
			onClick					: function(elm){},
			onMouseOver				: function(elm){},
			onMouseOut				: function(elm){},
			callback				: function(){}
		}, options);

		var regIndex = new RegExp('(index.html|index.php|https://|http://)','g');
		var regOff   = new RegExp('\.('+settings.imgext+')$');
		var regOn    = new RegExp('('+settings.imgPostfixOn+'|'+settings.imgPostfixIn +')\.('+settings.imgext+')$');
		var regIn    = new RegExp(settings.imgPostfixIn+'\.('+settings.imgext+')$');

		function setEffect(elm){
			if(settings.effect == 'roll'){
				rollOver(elm);
			}else if(settings.effect == 'fade'){
				fadeOver(elm);
			}else if(settings.effect == 'cross'){
				crossOver(elm);
			}
		}

		function rollOver(elm)
		{
			elm.originalSrc = $(elm).attr('src');
			elm.rolloverSrc = elm.originalSrc.replace(regOff, settings.imgPostfixOn+'.'+'$1');

			// 先読み
			elm.rolloverImg = new Image;
			elm.rolloverImg.src = elm.rolloverSrc;

			if(elm.originalSrc != elm.rolloverSrc){
				$(elm).hover(function() {
					$(elm).attr('src', elm.rolloverSrc);
				}, function() {
					$(elm).attr('src', elm.originalSrc);
				});
			}
		}

		function fadeOver(elm)
		{
			$(elm).hover(function() {
				$(elm)
					.stop(true, false)
					.fadeTo(settings.fade_speed, settings.fade_opacity);
			}, function() {
				$(elm).fadeTo(settings.fade_speed, 1);
			});
		}

		function crossOver(elm)
		{
			elm.originalSrc = $(elm).attr('src');
			elm.rolloverSrc = elm.originalSrc.replace(regOff, settings.imgPostfixOn+'.'+'$1');

			// 先読み
			elm.rolloverImg = new Image;
			elm.rolloverImg.src = elm.rolloverSrc;

			$(elm).addClass("base");
			$(elm.rolloverImg).css("position","absolute");
			$(elm.rolloverImg).css("display","block");
			$(elm.rolloverImg).fadeTo(0,0);
			$(elm.rolloverImg).addClass("cross");
			$(elm).before(elm.rolloverImg);

			if(elm.originalSrc != elm.rolloverSrc){
				$(elm).parent().hover(function() {
					$(this).find(".base").stop(true, false).animate({opacity: 0}, {duration: settings.cross_out_speed});
					$(this).find(".cross").stop(true, false).animate({opacity: 1}, {duration: settings.cross_in_speed});
				}, function() {
					$(this).find(".base").stop(true, false).animate({opacity: 1}, {duration: settings.cross_off_speed});
					$(this).find(".cross").stop(true, false).animate({opacity: 0}, {duration: settings.cross_off_speed});
				});
			}
		}

		function getLinkType(elm)
		{
			if(elm.getAttribute('href').substr(0,1) == '#'){
				return 'other';
			}

			var href = getUri(elm, elm.getAttribute('href'));
			var setImgFlg = false;
			if((href.absolutePath.replace(regIndex,"") == location.href.replace("#"+location.hash,"").replace(regIndex,"")) && !href.Fragment){
				//そのページ
				$(elm).find('img').each(function(){
					var src = $(this).attr('src');
					if(settings.imgPostfixIn){
						$(this).attr('src',src.replace(regOff, settings.imgPostfixIn+"."+"$1"));
					}else if(settings.imgPostfixOn){
						$(this).attr('src',src.replace(regOff, settings.imgPostfixOn+"."+"$1"));
					}
				});
				if(settings.activeClass && settings.activeClassTarget){
					var t = $(elm).closest(settings.activeClassTarget);
					if(t.length > 0 && !t.hasClass(settings.activeClass)){
						t.addClass(settings.activeClass);
					}
				}
				$(elm).replaceWith($(elm).html());
				return 'self';

			}else if (0 <= location.href.search(href.absolutePath.replace(regIndex,""))){
				if(settings.exParentClass && $(elm).hasClass(settings.exParentClass)){
				}else if(settings.exParentPath && settings.exParentPath == href.Pathname.replace(regIndex,"")){
				}else{
					//上位階層
					$(elm).find('img').each(function(){
						var src = $(this).attr('src');
						if(settings.imgPostfixIn){
							$(this).attr('src',src.replace(regOff, settings.imgPostfixIn+"."+"$1"));
						}else if(settings.imgPostfixOn){
							$(this).attr('src',src.replace(regOff, settings.imgPostfixOn+"."+"$1"));
						}
					});
					if(settings.activeParentClass && settings.activeParentClassTarget){
						var t = $(elm).closest(settings.activeParentClassTarget);
						if(t.length > 0 && !t.hasClass(settings.activeParentClass)){
							t.addClass(settings.activeParentClass);
						}
					}
					return 'parent';
				}
			}

			return 'other';
		}

		function getUri(elm, path)
		{
			elm.originalPath = path;
			elm.absolutePath = (function(){
				var e = document.createElement('span');
				e.innerHTML = '<a href="' + path + '" />';
				return e.firstChild.href;
			})();
			var fields = {'Username' : 4, 'Password' : 5, 'Port' : 7, 'Protocol' : 2, 'Host' : 6, 'Pathname' : 8, 'URL' : 0, 'Querystring' : 9, 'Fragment' : 10};
			var regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
			var r = regex.exec(elm.absolutePath);
			for(var f in fields){
				if(typeof r[fields[f]] != 'undefined'){
					elm[f] = r[fields[f]];
				}
			}
			return elm;
		}

		this.each(function() {
			$(this).find('a[href]:first').each(function(){
				var type = getLinkType(this);
				if(type == "self"){
				}else if(type == "parent"){
					if(settings.effect == 'fade'){
						$(this).find('img').each(function(){
							setEffect(this);
						});
					}
					$(this).click(function () {
						settings.onClick(this);
					});
				}else{
					$(this).find('img').each(function(){
						setEffect(this);
					});
					$(this).click(function () {
						settings.onClick(this);
					});
				}

			});
			$(this).hover(function() {
				settings.onMouseOver(this);
			}, function() {
				settings.onMouseOut(this);
			});
		});

		settings.callback();

		return this;
	};

})(jQuery);


//jquery.breakpoint.js
( function($){
	$.fn.breakPoint = function( opts ) {

		this.each( function() {
			if( this == window ){
				init.call( this, opts );
			}
		} );

		return this;
	}

	function init( opts ){

		var options = $.extend( {
			smartPhoneWidth 	: 768,			// スマホの幅上限（ 不要な場合は0を設定する )
			tabletWidth			: 1024,			// タブレットの幅上限（ 不要な場合は0を設定する）
			pcMediumWidth		: 1230,			// PCの中サイズの幅上限（ PCモード内でもブレークポイントを設ける場合。不要な場合は0を設定する ）
			onSmartPhoneEnter	: null,			// スマホモード時のコールバック
			onSmartPhoneLeave	: null,			// スマホモード解除時のコールバック
			onTabletEnter		: null,			// タブレットモード時のコールバック
			onTabletLeave		: null,			// タブレットモード解除時のコールバック
			onPcMediumEnter		: null,			// PC中サイズモード時のコールバック
			onPcMediumLeave		: null,			// PC中サイズモード解除時のコールバック
			onPcEnter			: null,			// PCサイズモード時のコールバック
			onPcLeave			: null			// PCサイズモード解除時のコールバック
		}, opts );

		var currMode = '';
		function onResize(){
			currentWidth = window.innerWidth || document.documentElement.clientWidth;

			var mode = '';
			if( options.smartPhoneWidth && currentWidth <= options.smartPhoneWidth ){
				// スマホ
				mode = 'sp';
			}else if( options.tabletWidth && currentWidth <= options.tabletWidth ){
				// タブレット
				mode = 'tablet';
			}else if( options.pcMediumWidth && currentWidth <= options.pcMediumWidth ){
				// PC中サイズ
				mode = 'pc_medium';
			}else{
				// その他PCサイズ
				mode = 'pc';
			}

			if( currMode != mode ){
				// console.log( currentWidth );
				onModeChange( mode, currMode );
			}else{
				return;
			}

			currMode = mode;
		}

		function onModeChange( mode, prev_mode ){

			// console.log( 'mode:' + mode );
			// console.log( 'prev_mode:' + prev_mode );

			if( prev_mode ){

				if( prev_mode == 'sp' ){
					// スマホモード離脱
					if( options.onSmartPhoneLeave ){
						options.onSmartPhoneLeave();
					}
				}else if( prev_mode == 'tablet' ){
					// タブレットモード離脱
					if( options.onTabletLeave ){
						options.onTabletLeave();
					}
				}else if( prev_mode == 'pc_medium' ){
					// PC中サイズモード離脱
					if( options.onPcMediumLeave ){
						options.onPcMediumLeave();
					}
				}else if( prev_mode == 'pc' ){
					// PCモード離脱
					if( options.onPcLeave ){
						options.onPcLeave();
					}
				}

			}

			if( mode == 'sp' ){
				// スマホモード
				if( options.onSmartPhoneEnter ){
					options.onSmartPhoneEnter();
				}
			}else if( mode == 'tablet' ){
				// タブレットモード
				if( options.onTabletEnter ){
					options.onTabletEnter();
				}
			}else if( mode == 'pc_medium' ){
				// PC中サイズモード
				if( options.onPcMediumEnter ){
					options.onPcMediumEnter();
				}
			}else if( mode == 'pc' ){
				// PCモード
				if( options.onPcEnter ){
					options.onPcEnter();
				}
			}

		}

		var resize_event = 'resize';
		if( typeof window.onorientationchange === 'object' ){
			resize_event = 'orientationchange';
		}

		$(window).on( resize_event, onResize );
		onResize();

		return this;

	}

} )(jQuery);
