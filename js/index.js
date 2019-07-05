
$(document).ready(function () {
    const URL='';



    let IndexInformation={

    }

    IndexInformation.getLocation=function () {
        var cityCode=returnCitySN.cid;              //获取城市
        console.log(returnCitySN);
    }
    IndexInformation.findHome=function () {
        let city=document.getElementById('city').innerText.split(" ");
        if (!city){
            $.ajax({
                type: 'post',
                url: URL + '/findHome',
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                async: true,
                data: {
                    city:city[2],
                },
                success: function (result) {
                    if(result.code=='200'){
                        document.getElementById('Name').innerHTML=result.data.Name;
                    }
                    else alert(result.msg);
                },
                error: function () {
                    alert('服务器开小差啦');
                }
            })
        }else {
            alert('请选择你的地址');
        }

    }
})