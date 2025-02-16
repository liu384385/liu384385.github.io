/* ===============================================
# modal
=============================================== */
document.addEventListener("DOMContentLoaded", function () {
    const modalBox = document.querySelector(".modal_box");
    const modalInner = modalBox.querySelector(".modal_inner");
    const closeButton = modalBox.querySelector(".modal_box .close");

    // モーダルを開く
    function openModal(trigger) {
        if (trigger.classList.contains("image_mono_modal_trigger")) {
            // 画像の場合
            const imgSrc = trigger.getAttribute("src");
            const imgAlt = trigger.getAttribute("alt") || "Image";
            modalInner.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}" class="modal_image">`;
        } else {
            // 通常のトリガー
            const modalContent = trigger.nextElementSibling;
            if (modalContent && modalContent.classList.contains("modal_content_wrap")) {
                modalInner.innerHTML = modalContent.innerHTML;
            }
        }
        modalBox.classList.add("active");
    }

    // モーダルを閉じる
    function closeModal() {
        modalBox.classList.remove("active");
        modalInner.innerHTML = ''; // 必要に応じて内容をクリア
    }

    // トリガークリック時の処理
    function setupModalTriggers(triggerSelector) {
        const modalTriggers = document.querySelectorAll(triggerSelector);
        modalTriggers.forEach(trigger => {
            trigger.addEventListener("click", function (e) {
                e.preventDefault();
                openModal(this);
            });
        });
    }

    // 画像トリガーの処理
    function setupImageTriggers() {
        const imageTriggers = document.querySelectorAll(".image_mono_modal_trigger");
        imageTriggers.forEach(trigger => {
            trigger.addEventListener("click", function (e) {
                e.preventDefault();
                openModal(this);
            });
        });
    }

    // 閉じるボタンクリック時の処理
    closeButton.addEventListener("click", function (e) {
        e.stopPropagation(); // クリックが親要素に伝播するのを防ぐ
        closeModal();
    });

    // モーダル外クリック時の処理
    modalBox.addEventListener("click", function (e) {
        if (!modalInner.contains(e.target)) {
            closeModal();
        }
    });

    // 初期化
    setupModalTriggers(".modal_trigger");
    setupImageTriggers();
});




//---------- videos swiper --------------
function initializeSwiperVideos(className) {
    let sliderSet = {
      slidesPerView: 1.1,
      centeredSlides: true,
      loop: true,
      loopAdditionalSlides: 2,
      effect:"slide",
      pagination: {
        el: `.${className}-swiper-pagination`,
        clickable: true,
      }, 
      /* scrollbar: {
        el: `.${className}-swiper-scrollbar`,
        draggable: true,
      }, */
      navigation: {
          nextEl: `.${className}-swiper-button-next`,
          prevEl: `.${className}-swiper-button-prev`,
      },
      spaceBetween: window.innerWidth*0.01*2,
      roundLengths: true,
      watchOverflow: true,
      breakpoints: {
        835: {
            slidesPerView: 2.2,
          spaceBetween: window.innerWidth*0.01*3,
        }
      },
    }
    if (document.querySelectorAll(`.${className}_swiper .swiper-slide`).length == 1 ) {
      sliderSet = {
        loop: false,
        pagination: false, 
        scrollbar: false, 
        navigation: false, 
      }
      document.querySelector(`.${className}_swiper`).classList.add('no_controller');
    }
    const sliderVideos = new Swiper (`.${className}_swiper`, sliderSet);
  }
  initializeSwiperVideos('videos');

/* ===============================================
# OP anime
=============================================== */
// $(window).on("load", function () {
// 	$("body")
// 		.delay(2600)
// 		.queue(function (next0) {
// 			$(".loader").addClass("off");
// 			next0();
// 		});

// 	$("body")
// 		.delay(10)
// 		.queue(function (next1) {
// 			$(".body_top").addClass("intro_on");                
// 			$(".onload").addClass("js-play");
// 			next1();
// 		});
// });
window.addEventListener('DOMContentLoaded', () => {
    function addClassAfterDelay(selector, className, delay) {
        setTimeout(() => {
            const element = document.querySelector(selector);
            if (element) {
                element.classList.add(className);
            }
        }, delay);
    }
    
    // まず、loader に 'off' を付与
    addClassAfterDelay(".loader", "off", 2000);

    // loader に 'off' が付与された 100ms 後に body_top に 'intro_on' を付与
    addClassAfterDelay(".body_top", "intro_on", 1900);
});


/* ===============================================
# anime trigger
=============================================== */
$(window).on("load scroll", function () {
	var elem = $(".anime");
	elem.each(function () {
		var elemOffset = $(this).offset().top;
		var scrollPos = $(window).scrollTop();
		var wh = $(window).height();
		if (scrollPos > elemOffset - wh + wh / 2) {
			$(this).addClass("js-play");
		}
	});
    var elem = $(".anime-no-hidden");
	elem.each(function () {
		var elemOffset = $(this).offset().top;
		var scrollPos = $(window).scrollTop();
		var wh = $(window).height();
		if (scrollPos > elemOffset - wh + wh / 2) {
			$(this).addClass("js-play");
		}
	});
});

// window.addEventListener('DOMContentLoaded', () => {
//     // 要素にスクロール時にクラスを追加する関数
//     function addClassOnScroll(elementsSelector, className, offsetRatio = 2) {
//         const elements = document.querySelectorAll(elementsSelector);
//         elements.forEach(element => {
//             const elemOffset = element.offsetTop;
//             const scrollPos = window.pageYOffset;
//             const wh = window.innerHeight;

//             if (scrollPos > elemOffset - wh + wh / offsetRatio) {
//                 element.classList.add(className);
//             }
//         });
//     }

//     // スクロールイベントで特定のクラスを要素に追加
//     function handleScroll() {
//         addClassOnScroll(".anime", "js-play");
//         addClassOnScroll(".anime-no-hidden", "js-play");
//     }

//     // スクロールイベントの登録
//     window.addEventListener("scroll", handleScroll);
// });


function applyAnimationDelay(selector = '.delayed-animation', delayInterval = 0.1) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        const delay = (index + 1) * delayInterval;
        element.style.animationDelay = `${delay}s`;
    });
}

applyAnimationDelay(); // デフォルトの`.delayed-animation`に適用
applyAnimationDelay('.delayed-animation-02', 0.2); // 別のクラスに適用


/* ===============================================
# smooth scroll
=============================================== */
// $(function () {
// 	$('a[href^="#"]').click(function () {
// 		let speed = 600;
// 		let href = $(this).attr("href");
// 		let target = $(href == "#" || href == "" ? "html" : href);
// 		let position = target.offset().top;
// 		$("html, body").animate({ scrollTop: position }, speed, "swing");
// 		return false;
// 	});
// });

window.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('a[href^="#"]');
    const speed = 600;
    
    links.forEach(link => {
      link.addEventListener("click", function(event) {
        event.preventDefault();
        
        const href = link.getAttribute("href");
        const target = href === "#" || href === "" ? document.documentElement : document.querySelector(href);
        const position = target.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: position,
          behavior: "smooth"
        });
      });
    });
  });

/* ===============================================
# navigation
=============================================== */
// $(function () {
// 	$(".nav__trigger").click(function () {
// 		$(this).parent().toggleClass("nav__active");
// 		return false;
// 	});

// 	$(".global a").click(function () {
// 		$(this).parents(".toggle_nav").removeClass("nav__active");
// 	});
// });

// if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)) {
// 	$(function () {
// 		$(".nav ul li a").click(function () {
// 			$(".header").removeClass("nav__active");
// 		});
// 	});
// }

var triggers = document.querySelectorAll(".nav__trigger");
var body = document.body; // body要素を取得

triggers.forEach(function(trigger) {
    trigger.addEventListener("click", function() {
        this.parentNode.classList.toggle("nav__active");
        // body.classList.toggle('menu_open');
        return false;
    });
});

var globalLinks = document.querySelectorAll(".global a");
for (var i = 0; i < globalLinks.length; i++) {
    globalLinks[i].addEventListener("click", function() {
        this.closest(".toggle_nav").classList.remove("nav__active");
        // body.classList.toggle('menu_open');
    });
}

if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/)) {
    var navLinks = document.querySelectorAll(".nav ul li a");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function() {
            document.querySelector(".header").classList.remove("nav__active");
        });
    }
}


/* ===============================================
# ヘッダーロゴタイミング
=============================================== */
window.addEventListener('scroll' , () => {
    const navColorModes = document.querySelectorAll('.body_top .header__title');
    const scroll = window.pageYOffset;
    const vh = window.innerHeight;
    if (navColorModes !== undefined) {
    navColorModes.forEach((navColorMode) => {
        if ( scroll > vh ) {
        navColorMode.classList.add('active');
        return
        } else {
        navColorMode.classList.remove('active');
        }
    });
    }
});

/* ===============================================
# スライダー
=============================================== */



/* ===============================================
# YouTubeスライダー
=============================================== */
// $(document).on('click', '.yt_video', function(){
//     var video = '<iframe class="slide_youtube_player" youtubeid="'+ $(this).attr('youtubeid') +'" src="'+ $(this).attr('youtube') +'" frameborder="0"></iframe>';
//     $(this).replaceWith(video);
//     $(".swiper-slide").addClass("play");
//     $(".play-button").addClass("play");
// });

// $(function(){
//     slider.on('slideChange', function (){
//         $(".slide_youtube_player").each(function(){
//             var videothumb = '<div class="video-block yt_video" youtubeid="'+ $(this).attr('youtubeid') +'" youtube="https://www.youtube.com/embed/'+ $(this).attr('youtubeid') +'?rel=0&showinfo=0&enablejsapi=1"><img src="http://img.youtube.com/vi/'+ $(this).attr('youtubeid') +'/maxresdefault.jpg" alt="#"></div>';
//             $(this).replaceWith(videothumb);
//         $('.swiper-slide').removeClass("play");
//         $(".play-button").removeClass("play");
//         });
//     });
// });



document.addEventListener("DOMContentLoaded", function () {
    const talentIcons = document.querySelectorAll(".talent_icon");
    const talentImages = document.querySelectorAll(".talent_img img");

    talentIcons.forEach(icon => {
        icon.addEventListener("click", function () {
            const selectedTalent = this.getAttribute("data-talent");

            // .talent_img 内のすべての img から .active クラスを削除
            talentImages.forEach(img => {
                img.classList.remove("active");
            });

            // .talent_icon 内のすべての要素から .active クラスを削除
            talentIcons.forEach(icon => {
                icon.classList.remove("active");
            });

            // 選択された data-talent に一致する img に .active クラスを追加
            const targetImg = document.querySelector(`.talent_img img[data-talent='${selectedTalent}']`);
            if (targetImg) {
                targetImg.classList.add("active");
            }

            // クリックしたアイコンにも .active クラスを追加
            this.classList.add("active");
        });
    });
});