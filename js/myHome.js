var picture = '';

$.ajax({
    url:'http://114.115.156.4:8001/information/getHeadPortrait',
    type:'get',
    success(res){
        let url = res.data.replace(/\"/g,'')
        console.log(url)
        document.getElementById('headImg').src = url;
        picture = url
    }
})


if ($.cookie('User')){
    var User = JSON.parse($.cookie('User'))
} else{
    PromptBox.displayPromptBox('请先登录')
}
function delect(obj){
    let id = ($(obj)[0].id)
    $.ajax({
        url: 'http://114.115.156.4:8001/house/deleteHouse',
        type: 'DELETE',
        dataType: 'json',
        data: {
            houseId:id
        },
        success(res){
            $(location).attr('href','../html/myHome.html')
        }
    })
}
$.ajax({
    url:'http://114.115.156.4:8001/getRelationByUserId',
    dataType:'json',
    type:'get',
    data:{userId : User.principal.userId},
    success(res){
        for (let key in res.data){
            console.log(res.data[key])
            let list = template(`tem1`, res.data[key]);
            console.log(list)
            $('#container').append('<div class="row line">\n' +
                '                        <div class="col-sm-6 col-md-6 col-lg-6 col-xs-6">拎包入住</div>\n' +
                '                        <div class="col-sm-3 col-md-3 col-lg-3 col-xs-3">2020-3-13</div>\n' +
                '                        <div class="tdOne" onclick="delect(this)">删除</div>\n' +
                '                    </div>')
            $("#container>div").eq(key+1).attr('id',key)
            $("#container>div").eq(key+1).children('div').eq(0).html(res.data[key].houseTitle)
            $("#container>div").eq(key+1).children('div').eq(1).html(res.data[key].publishTime)
            $("#container>div").eq(key+1).children('div').eq(2).attr('id',res.data[key].houseId)
        }


    }

})

function upFile() {
    var reads = new FileReader();
    f = document.getElementById('upImg').files[0]

    let img=new FormData();
    img.append('file',f);

    $.ajax({
        url:'http://114.115.156.4:9494/oss/uploadFile',
        type: 'put',
        dataType: 'json',
        contentType:false,
        data:img,
        processData:false,
        success(res){
            picture = res.httpUrl
            console.log(picture)
            change(picture)
        }
    })
    var Url = new FormData()
    // reads.readAsDataURL(f);
    function change(url) {
        document.getElementById('headImg').src = url;
        Url.append('headPortrait',url)
        $.ajax({
            url:'http://114.115.156.4:8001/information/headPortrait',
            type:'post',
            dataType:'json',
            contentType: false,
            processData:false,
            data:Url,
            success(res) {
                console.log(res)
            }
        })
    };
}