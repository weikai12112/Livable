注意事项:

// 含有部分为
// 姓名(Name)
// 性别(Sex)
// 密码(Password)
// 邮箱(Email)
// 邮箱验证码(EmailKey)
//
// 每部分加入类RegistInput
// 获取邮箱验证码Id为GetEmailKey
// 去注册的Id为ToRegist
//
// -----------------------------------------------------------------------------------------------

$(document).ready(function () {
    const URL='';
    let CreateRegistFunction=function () {
        this.AllowRegistration=[false,false,false,false,false,false];
    };
    CreateRegistFunction.prototype.regist=function() {
        $.ajax({
            type: 'post',
            url: URL + '/regist',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {
                userName:document.getElementById('Name').value,
                userSex:document.getElementById('Sex').value,
                userPassword:document.getElementById('Password').value,
                userEmail:document.getElementById('Email').value,
                emailKey:document.getElementById('EmailKey').value,
            },
            success: function (result) {
                if(result.code=='200'){
                    alert('注册成功');
                    window.location='index.html'
                }
                else alert(result.msg);
            },
            error: function () {
                alert('服务器开小差啦');
            }
        })
    }
    CreateRegistFunction.prototype.DetectionSymbol=function (value) {
        let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
            regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

        if(regEn.test(value) || regCn.test(value)) {
            alert("不能包含特殊字符");
            return false;
        }else {
           return true;
        }
    }
    CreateRegistFunction.prototype.DetectionNum=function(value){
        if (value.length>=6&&value.length<=18) {
            return true;
        }else {
            if (value.length>18) {
                alert('输入超过18个字符，请重新输入');
                return false;
            }else {
                alert('账号密码小于6个字符，请重新输入');
                return false;
            }

        }
    }
    CreateRegistFunction.prototype.DetectionEmail=function (str){
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        return reg.test(str);
    }
    CreateRegistFunction.prototype.getEmailKey=function(){
        if (RegistFunction.DetectionEmail(document.getElementById('Email').value)){
            $.ajax({
                type: 'post',
                url: URL + '/regist',
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                async: true,
                data: {
                    userEmail:document.getElementById('Email').value,
                },
                success: function (result) {
                    if(result.code=='200'){
                        alert('验证码已发送，请前往登陆邮箱查收');

                    }
                    else alert(result.msg);
                },
                error: function () {
                    alert('服务器开小差啦');
                }
            })
        }
    }
    let RegistFunction=new CreateRegistFunction();

    (function main() {
        $('.RegistInput').blur(function () {
            let innervalue=event.path[0].value;
            switch (event.path[0].id) {
                case 'Name':(function () {
                    if (innervalue>0&&innervalue<5&& RegistFunction.DetectionSymbol(innervalue)){
                        event.path[1].getElementsByClassName('information')[0].innerHTML='√';
                        RegistFunction.AllowRegistration[0]=true;
                    } else {
                        event.path[1].getElementsByClassName('information')[0].innerHTML='×';
                        RegistFunction.AllowRegistration[0]=false;
                        alert('请输入正确的姓名');
                    }
                });break;
                case 'Sex':(function () {
                    if (innervalue){
                        event.path[1].getElementsByClassName('information')[0].innerHTML='√';
                        RegistFunction.AllowRegistration[1]=true;
                    } else {
                        event.path[1].getElementsByClassName('information')[0].innerHTML='×';
                        RegistFunction.AllowRegistration[1]=false;
                        alert('请选择性别');
                    }
                });break;
                case 'Password':(function () {
                    if (RegistFunction.DetectionSymbol(innervalue)&&RegistFunction.DetectionNum(innervalue)){
                        event.path[1].getElementsByClassName('information')[0].innerHTML='√';
                        RegistFunction.AllowRegistration[2]=true;
                    } else {
                        event.path[1].getElementsByClassName('information')[0].innerHTML='×';
                        RegistFunction.AllowRegistration[2]=false;
                        alert('请输入正确的密码');
                    }
                });break;
                case 'Passwords':(function () {
                    if (document.getElementById('Password').value==document.getElementById('Passwords').value){
                        event.path[1].getElementsByClassName('information')[0].innerHTML='√';
                        RegistFunction.AllowRegistration[3]=true;
                    } else {
                        event.path[1].getElementsByClassName('information')[0].innerHTML='×';
                        RegistFunction.AllowRegistration[3]=false;
                        alert('两次密码不一致');
                    }
                });break;
                case 'Email':(function () {
                    if (RegistFunction.DetectionEmail(innervalue)){
                        event.path[1].getElementsByClassName('information')[0].innerHTML='√';
                        RegistFunction.AllowRegistration[4]=true;
                    } else {
                        event.path[1].getElementsByClassName('information')[0].innerHTML='×';
                        RegistFunction.AllowRegistration[4]=false;
                        alert('请输入正确的邮箱');
                    }
                });break;
                case 'EmailKey':(function () {
                    if (innervalue){
                        event.path[1].getElementsByClassName('information')[0].innerHTML='√';
                        RegistFunction.AllowRegistration[5]=true;
                    } else {
                        event.path[1].getElementsByClassName('information')[0].innerHTML='×';
                        RegistFunction.AllowRegistration[5]=false;
                        alert('请输入验证码');
                    }
                });break;
            }
        })
        $('#ToRegist').click(function () {
            let Status=true;
            for (let i=0;i<6;i++,Status=Status&RegistFunction.AllowRegistration[i]);
            if (Status){
                RegistFunction.regist();
            } else {
                alert('您有信息未填写或者填写有误');
            }
        })
        $('#GetEmailKey').click(RegistFunction.getEmailKey())
    })
})