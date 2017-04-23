function changeToLog(){
    var registerBox=document.querySelector('.register');
    var loginBox=document.querySelector('.login');

    loginBox.classList.remove('bounceOutLeft');
    registerBox.classList.remove('bounceInRight');
    registerBox.classList.add('bounceOutLeft');
    registerBox.classList.add('hidden');
    setTimeout(function(){
        loginBox.classList.remove('hidden');
        loginBox.classList.add('bounceInRight');
    },20);
}
function changeToReg(){
    var registerBox=document.querySelector('.register');
    var loginBox=document.querySelector('.login');
    registerBox.classList.remove('bounceOutLeft');
    loginBox.classList.remove('bounceInRight');
    loginBox.classList.add('bounceOutLeft');
    loginBox.classList.add('hidden');
    setTimeout(function(){
        registerBox.classList.remove('hidden');
        registerBox.classList.add('bounceInRight');
    },20);
}

document.getElementById('go-register').onclick=function(){
    changeToReg();
}
document.getElementById('go-login').onclick=function(){
    changeToLog();
}
function login(){//登录
    var api='';
    var postData={
        username:$(".login").find("input[name='username']").val(),
        password:$(".login").find("input[name='password']").val()
    }
    console.log(postData)
    
    $.ajax({
        url:api,
        type:'POST',
        async:true,
        data:postData,
        timeout:5000,
        dataType:'json',
        success:function(data,textStatus,jqXHR){//ajax成功
            console.log(data);
            if(data.success){//登录成功
                setTimeout(function(){
                    $(".login .input-error").text(data.msg)
                },2000)
                // 跳转到一个页面
                // 保存到cookie
                document.cookie="userId:"+data.userId;
            }else{//登录失败
                $(".login .input-error").text(data.msg)
            }
        },
        error:function(xhr,textStatus){//ajax失败
            console.log(textStatus);
        }
    })
}

function register(){//注册
    var api='';

    var postData={
        username:$(".register").find("input[name='username']").val(),
        password:$(".register").find("input[name='password']").val(),
        power:$(".register").find("select[name='power']").val()
    }
    console.log(postData);
    
    $.ajax({
        url:api,
        type:'POST',
        async:true,
        data:postData,
        timeout:5000,
        dataType:'json',
        success:function(data,textStatus,jqXHR){//登录成功，页面跳转
            console.log(data);
            if(data.success){//注册成功
                setTimeout(function(){
                    $(".register .input-error").text(data.msg)
                },2000)
            }else{//注册失败
                $(".register .input-error").text(data.msg)
            }
        },
        error:function(xhr,textStatus){//登录失败，提示信息
            console.log(textStatus);
        }
    })
}
document.getElementById("login").onclick=function(e){
    e.preventDefault();
    login();
}
document.getElementById("register").onclick=function(e){
    e.preventDefault();
    register();
}
window.onload=function(){
    changeToLog();
}