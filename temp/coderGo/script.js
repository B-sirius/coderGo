'use strict';

let initPage = (function() {
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

            toggleOverlay[overlayState](e);
        });
    }

    let dataList = [{
        id: 1,
        pos: [118.718555, 32.204261]
    },{
        id: 2,
        pos: [118.71701,32.20477]
    }];

    let markerList = [];

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

    let toggleOverlay = {
        hidden: function() {
            overlayState = 'show';

            $mapMask.css({display: 'block'});

            $mapMask.velocity({
                opacity: 1
            }, {
                duration:200
            });
        },

        show: function(e) {
            overlayState = 'hidden';

            $mapMask.velocity({
                opacity: 0
            }, {
                duration:200,
                display: 'none'
            });
        }
    }

    $mapMask.click(function(e) {
        toggleOverlay[overlayState](e);
    });
})();
