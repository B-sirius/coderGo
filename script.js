'use strict';
const userApi = 'http://192.168.5.159:8080/CoderGo/UserInfoObtain';

let user;

$.ajax({
    url: userApi,
    type: 'POST',
    crossDomain: true,
    data: {
        id: Cookies.get('userId')
    },
    timeout: 5000,
    success: function(response) {
        response = JSON.parse(response);
        if (response.success) {
            let data = response.data
            user = data;
            initPage();
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

let initMap = (function() {
    const powerHandler = {
        '1': '守序善良',
        '2': '绝对中立',
        '3': '混乱邪恶'
    }

    let Marker = function(marker, id, power) {
        this.marker = marker;
        this.id = id;
        this.power = power;
        this.marker.self = this;
    }

    Marker.prototype.init = function() {
        let self = this;

        this.marker.on('click', function(e) {
            selectedMark = self;

            renderPanel();

            toggleOverlay[overlayState](e);
        });
    }

    let dataList = [{
        id: 1,
        pos: [118.718634, 32.204161],
        power: 1
    }, {
        id: 2,
        pos: [118.717094, 32.204824],
        power: 2
    }, {
        id: 3,
        pos: [118.718569, 32.204615],
        power: 3
    }, {
        id: 4,
        pos: [118.713564, 32.202818],
        power: 1
    }, {
        id: 5,
        pos: [118.716408, 32.202732],
        power: 2
    }, {
        id: 6,
        pos: [118.718033, 32.203426],
        power: 3
    }, {
        id: 7,
        pos: [118.716375, 32.205469],
        power: 2
    }];

    let markerList = [];

    let selectedMark; // 被选择的点

    let map = new AMap.Map('mapContainer', {
        resizeEnable: true,
        zoom: 15,
        center: [118.715422, 32.203426],
    });

    for (let i = 0; i < dataList.length; i++) {
        let markerPos = dataList[i].pos;
        let power = dataList[i].power;

        let markIconHandler = {
            '1': function() {
                return 'img/marker1.svg'
            },
            '2': function() {
                return 'img/marker2.svg'
            },
            '3': function() {
                return 'img/marker3.svg'
            }
        };

        let mapMarker = new AMap.Marker({
            icon: markIconHandler[power](),
            position: markerPos,
            offset: new AMap.Pixel(-11, -26),
            map: map
        });

        let marker = new Marker(mapMarker, dataList[i].id, power);
        marker.init();

        markerList.push(marker);
    }

    //========切换浮层显示================
    let $mapMask = $('#mapMask'),
        $overlay = $('#overlay');

    let overlayState = 'hidden';

    // 副曾切换
    let toggleOverlay = {
        hidden: function() {
            overlayState = 'show';

            $mapMask.css({ display: 'block' });

            $mapMask.velocity({
                opacity: 1
            }, {
                duration: 200
            });
        },

        show: function() {
            overlayState = 'hidden';

            $mapMask.velocity({
                opacity: 0
            }, {
                duration: 200,
                display: 'none',
                complete: function() {
                    swicthOverlayPanel['s1']();
                }
            });
        }
    }

    // 遮罩绑定浮层切换
    $mapMask.click(function(e) {
        e.preventDefault();

        toggleOverlay[overlayState](e);
    });

    // 防止点击穿透
    $overlay.click(function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
    });

    //===============浮层文字====================
    let renderPanel = function() {
        let markPowerText = powerHandler[selectedMark.power],
            userPowerText = user.power_in;

        if (markPowerText !== userPowerText) {
            $('#panelText').text(`削弱${markPowerText}势力的占领`);

            $('#confirm').text(`${userPowerText}!`);

            $('#s3').text(`成功削弱${markPowerText}的势力！`);
        } else {
            $('#panelText').text(`巩固${markPowerText}势力的占领`);

            $('#confirm').text(`${userPowerText}!`);

            $('#s3').text(`成功巩固${markPowerText}的势力！`);
        }
    };
    //================确认占点==================
    let swicthOverlayPanel = (function() {
        let $s1 = $('#s1'),
            $s2 = $('#s2'),
            $s3 = $('#s3');

        return {
            's1': function() {
                $s1.removeClass('hidden');
                $s2.addClass('hidden');
                $s3.addClass('hidden');
            },
            's2': function() {
                $s1.addClass('hidden');
                $s2.removeClass('hidden');
                $s3.addClass('hidden');
            },
            's3': function() {
                $s1.addClass('hidden');
                $s2.addClass('hidden');
                $s3.removeClass('hidden');
            },
        }
    })();

    let $confirm = $('#confirm');

    $confirm.click(function() {
        swicthOverlayPanel['s2']();

        setTimeout(function() {
            swicthOverlayPanel['s3']();
            setTimeout(function() {
                toggleOverlay[overlayState]();
            }, 800);
        }, 1200);
    });

    let $cancel = $('#cancel');
    $cancel.click(function() {
        toggleOverlay[overlayState]();
    });

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

                map.setMapStyle('dark');
            },

            day: function() {
                for (let el of nightElList) {
                    el.removeClass('night');
                }

                map.setMapStyle('normal');
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
})();
