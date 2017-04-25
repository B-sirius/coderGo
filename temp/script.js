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

let initMap = (function() {
    let Marker = function(marker, id) {
        this.marker = marker;
        this.id = id;
        this.marker.self = this;
    }

    Marker.prototype.init = function() {
        let self = this;

        this.marker.on('click', function(e) {
            selectedMark = self;
            toggleOverlay[overlayState](e);
        });
    }

    let dataList = [{
        id: 1,
        pos: [118.718555, 32.204261]
    }, {
        id: 2,
        pos: [118.71701, 32.20477]
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

        let mapMarker = new AMap.Marker({
            position: markerPos,
            map: map
        });

        let marker = new Marker(mapMarker, dataList[i].id);
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
        console.log(user);
        console.log(selectedMark);
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
