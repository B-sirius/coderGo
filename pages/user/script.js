'use strict';
const user = {
    name: "比利海灵顿",
    score: 233,
    id: 1
}

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
    let $userName = $('#userName'),
        $score = $('#userScore');

    $userName.text(user.name);
    $score.text(user.score);

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
    function getCookie(name) {
        var arr = document.cookie.split(';');
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            if (arr2[0] == name) {
                return arr2[1]; //找到所需要的信息返回出来
            }
        }
        return ''; //找不到就返回空字符串
    }


    function getInfo() { //获取用户信息
        var api = '';
        var userId = getCookie("userId");
        var getData = {
            id: userId
        }
        var userData = {
                username: 'username',
                points: '100',
                steps: '231',
                rank: '22'
            }
            // $.get(api,getData,function(res){
            //     userData.username=res.username;
            //     userData.points=res.points;
            //     userData.steps=res.steps;
            //     userData.rank=res.rank;
            // },'json')
        return userData;
    }
    window.onload = function() {
        var userData = getInfo();
        $(".user-info .username").text(userData.username);
        $("#points").text(userData.points);
        $("#steps").text(userData.steps);
        $("#rank").text(userData.rank);
    }
})();
