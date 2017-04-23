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

let initRankList = (function() {
    var ranklist = [{
        username: 'name1',
        points: '123'
    }, {
        username: 'name1',
        points: '123'
    }, {
        username: 'name1',
        points: '123'
    }, {
        username: 'name1',
        points: '123'
    }, {
        username: 'name1',
        points: '123'
    }, {
        username: 'name1',
        points: '123'
    }]

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

    function pageInit() {
        let api_getusers = ''; //获取用户
        let api_getpowers = ''; //获取势力
        let api_getuser = ''; //获取当前用户
        let myChart = echarts.init(document.getElementById('power-show'));
        let userId = getCookie('userId'); //从cookie获取用户id\


        $.get(api_getuser, { id: userId }).done(function(res) {
            res = {
                username: '我水水',
                points: 1923,
                rank: 15
            }
            $("#my-card").find(".name").text(res.username);
            $("#my-card").find(".points").text(res.points);
            $("#my-card").find(".my-rank").text(res.rank + '名');
        })
        $.get(api_getusers).done(function(res) {
            // 获取前十名的数据
            // console.log(res);
            // var users=res.users;//假设有这个数组
            var users = ranklist;
            users.forEach(function(user, index) {
                var li = $('<li>\
                <div class="card">\
                    <div class="card-left">\
                        <p class="rank">' + (index + 1) + '&nbsp' + '</p>\
                        <p class="name">' + user.username + '</p>\
                    </div>\
                    <p class="points">' + user.points + '</p>\
                </div>\
            </li>');

                $(".list").append(li);
            }, this);

        })
        myChart.showLoading();
        $.get(api_getpowers).done(function(data) {
            var option = {
                    emphasis: {
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        data: [{ //data.data
                                value: 2325,
                                name: '守序善良'
                            }, {
                                value: 274,
                                name: '绝对中立'
                            }, {
                                value: 3101,
                                name: '混乱邪恶'
                            },

                        ]
                    }]
                }
                // option.data=data.data;
            myChart.hideLoading();
            myChart.setOption(option);
        });
    }

    window.onload = function() {
        pageInit();
    }
})();
