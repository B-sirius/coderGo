var ranklist = [{
        username: 'name1',
        points: '123'
    },
    {
        username: 'name1',
        points: '123'
    },
    {
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
    }
]

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
    let api_getusers = '';//获取用户
    let api_getpowers = '';//获取势力
    let api_getuser='';//获取当前用户
    let myChart = echarts.init(document.getElementById('power-show'));
    let userId=getCookie('userId');//从cookie获取用户id\


    $.get(api_getuser,{id:userId}).done(function(res){
        res={
            username:'我水水',
            points:1923,
            rank:15
        }
        $("#my-card").find(".name").text(res.username);
        $("#my-card").find(".points").text(res.points);
        $("#my-card").find(".my-rank").text(res.rank+'名');
    })
    $.get(api_getusers).done(function (res) {
        // 获取前十名的数据
        // console.log(res);
        // var users=res.users;//假设有这个数组
        var users = ranklist;
        users.forEach(function (user, index) {
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
    $.get(api_getpowers).done(function (data) {
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
                        name: '忠诚正义'
                    },
                    {
                        value: 274,
                        name: '肮脏邪恶'
                    },
                    {
                        value: 3101,
                        name: '中立善良'
                    },

                ]
            }]
        }
        // option.data=data.data;
        myChart.hideLoading();
        myChart.setOption(option);
    });
}

window.onload = function () {
    pageInit();
}