function changeToLog(){
    var registerBox=document.querySelector('.register');
    var loginBox=document.querySelector('.login');

    loginBox.classList.remove('fadeOut');
    registerBox.classList.remove('fadeIn');
    registerBox.classList.add('fadeOut');
    registerBox.classList.add('hidden');
    setTimeout(function(){
        loginBox.classList.remove('hidden');
        loginBox.classList.add('fadeIn');
    },20);
}
function changeToReg(){
    var registerBox=document.querySelector('.register');
    var loginBox=document.querySelector('.login');
    registerBox.classList.remove('fadeOut');
    loginBox.classList.remove('fadeIn');
    loginBox.classList.add('fadeOut');
    loginBox.classList.add('hidden');
    setTimeout(function(){
        registerBox.classList.remove('hidden');
        registerBox.classList.add('fadeIn');
    },20);
}

document.getElementById('go-register').onclick=function(){
    changeToReg();
}
document.getElementById('go-login').onclick=function(){
    changeToLog();
}
function login(){//登录
    var api='http://192.168.5.159:8080/CoderGo/LoginServlet';
    var postData={
        user_name:$(".login").find("input[name='username']").val(),
        password:$(".login").find("input[name='password']").val()
    }
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
                    $(".login .input-error").text("登录成功")
                },2000)
                // 跳转到一个页面
                // 保存到cookie
                
                document.cookie="userId="+data.data.id;
                window.open('../../index.html','_self');
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
    var api='http://192.168.5.159:8080/CoderGo/RegisterServlet';

    var postData={
        user_name:$(".register").find("input[name='username']").val(),
        password:$(".register").find("input[name='password']").val(),
        tel:'123',
        power_in:$(".register").find("select[name='power']").val()
    }
    $.ajax({
        url:api,
        type:'POST',
        async:true,
        crossDomain: true,
        data:postData,
        timeout:5000,
        dataType:'json',
        success:function(data,textStatus,jqXHR){//登录成功，页面跳转
            
            if(data.success){//注册成功
                setTimeout(function(){
                    $(".register .input-error").text("注册成功")
                },2000)
                changeToLog();//跳转到登录
            }else{//注册失败
                $(".register .input-error").text("注册失败")
            }
        },
        error:function(xhr,textStatus){//失败，提示信息
            $(".register .input-error").text("注册失败")
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