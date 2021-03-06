'use strict';
const api = 'http://192.168.5.159:8080/CoderGo/UserInfoObtain';

let user;

$.ajax({
    url: api,
    type: 'POST',
    crossDomain: true,
    data: {
        id: Cookies.get('userId')
    },
    timeout: 5000,
    success: function(response) {
        response = JSON.parse(response);
        if (response.success) {
            let data = response.data;
            user = data;
            initPage();
            initContent();
        }
    },
    error: function(xhr, textStatus) {
        console.log(textStatus);
    }
});

let initPage = (function() {
    // 渲染侧边栏动画
    let $meunBtn = $('#meunBtn'),
        $mask = $('#mask'),
        $sidebar = $('#sidebar');

    let barState = 'hidden';

    let toggleSidebar = {
        'hidden': function(e) {
            e.preventDefault();

            barState = 'show';

            $sidebar.velocity({
                translateX: '270px'
            }, {
                duration: 200
            });

            $mask.css({ 'display': 'block' });

            $mask.velocity({
                opacity: 1
            }, {
                duration: 200,
            });
        },

        'show': function(e) {
            e.preventDefault();

            barState = 'hidden';

            $sidebar.velocity({
                translateX: 0
            }, {
                duration: 200
            });

            $mask.velocity({
                opacity: 0
            }, {
                duration: 200,
                display: "none"
            });
        }
    }

    $meunBtn.click(function(e) {
        toggleSidebar[barState](e);
    });
    $mask.click(function(e) {
        toggleSidebar[barState](e);
    });

    //=============填充数据================
    return function() {
        let $userName = $('#userName'),
            $score = $('#userScore');

        $userName.text(user.user_name);
        $score.text(user.integration);
    }
})();

//===============夜间模式======================
let initStyle = (function() {
    let nightElList = [
        $('#header'),
        $('#container'),
        $('#sidebar')
    ];

    let Mode = {
        night: function() {
            for (let el of nightElList) {
                el.addClass('night');
            }
        },

        day: function() {
            for (let el of nightElList) {
                el.removeClass('night');
            }
        }
    };

    let nightMode = Cookies.get('night');

    if (nightMode && nightMode === 'true') {
        Mode['night']();
    }

    let $nightModeBtn = $('#nightMode');
    $nightModeBtn.click(function() {
        if (!nightMode || nightMode === 'false') {
            Cookies.set('night', 'true');
            nightMode = 'true';
            Mode['night']();
        } else {
            Cookies.set('night', 'false');
            nightMode = 'false';
            Mode['day']();
        }
    });
})();

let initContent = (function() {
    return function() {
        $(".user-info .username").text(user.user_name);
        $("#points").text(user.integration);
        $("#steps").text(1251);
        $("#rank").text(20);
    }
})();
