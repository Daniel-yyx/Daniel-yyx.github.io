$(document).ready(function() {
    var aparted = false; // 控制是否已经打开信件
    var currentStep = 0; // 当前显示的文本段
    var typingStarted = false; // 控制 Typed 实例是否已经开始

    var texts = [
        "Dear 杨雪琦", 
        "Janne<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I am very glad to know you through the app hellotalk. In the 14 days of communicating with you online, I can feel your kindness and cuteness. Honestly, I have been attracted by your personality. I am so happy to have so much in common with you and to be your soul mate.",
        "You are going to start university soon and our communication will definitely become less. To be honest, I'm very sad, but I hope I can go to the UK in the future to meet you in person, and I also hope that one day you will come to China and I will bring you to experience the beauty and food of China. I am looking forward to both of these things and they will be a motivation for me to study. I'm sure we'll meet.<br><br>",
        "Finally, I wish you to experience happy times inside the new semester, meet lucky things, and laugh every day as much as you post your voice. Never forget that you have a soul mate 8,800 kilometers away, and I'll help you with whatever you need. I'm your knight.<br><br><p style='float:right; display:block; width:80px;'>Daniel</p>"
    ];

    function startTyping() {
        if (currentStep < texts.length) {
            // 清空之前的 Typed 实例
            $('.letter').html('');

            // 启动新的 Typed 实例
            var typed = new Typed('.letter', {
                strings: [texts[currentStep]],
                typeSpeed: 50,
                backSpeed: 0,
                onComplete: function() {
                    currentStep++;
                    if (currentStep < texts.length) {
                        // 延迟2秒后开始下一段内容
                        setTimeout(startTyping, 2000);
                    }
                }
            });
        }
    }

    $("#open").click(function() {
        if (!aparted) {
            if (!typingStarted) {
                typingStarted = true;
                startTyping(); // 启动打字效果

                $('#open').find("span").eq(0).css('background-position', "0 -150px");
                aparted = true;

                var music = document.getElementById('music2');        
                if (music.paused) {
                    music.play();
                    $('#music_btn2').css("opacity", "1"); 
                }
            }
        }
    });

    // 播放/暂停音乐
    $("#music_btn2").click(function() {
        var music = document.getElementById('music2');
        var music_btn = $(this);
        
        if (music.paused) {
            music.play();
            music_btn.css("opacity", "1"); 
        } else {
            music.pause();
            music_btn.css("opacity", "0.2"); 
        }
    });

    // 页面加载完成
    $(window).on('load', function() {
        var currentUrl = window.location.href;
        if (!currentUrl.includes("#")) {
            window.location.href = currentUrl + "#contact";
        }

        $('#music2').attr('src', bgmsrc);

        // 防止双击缩放
        document.addEventListener('touchstart', function(event) { 
            if (event.touches.length > 1) event.preventDefault(); 
        });
        
        var lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            var now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) event.preventDefault();
            lastTouchEnd = now;
        }, false);
        
        document.addEventListener('gesturestart', function(event) { 
            event.preventDefault(); 
        });

        $('body').css('opacity', '1');
        $('#jsi-cherry-container').css('z-index', '-99');
    });
});
