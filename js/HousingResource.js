var oTop = $(".minNav").offset().top;
//获取导航栏的高度，此高度用于保证内容的平滑过渡
var martop = $('.minNav').outerHeight();
var winWidth = 0;
var winHeight = 0;
var sTop = 0;
var H1 = $('.imfo').offset().top;
var alimfo = parseInt($('.imfo').css('height'));
var lastSay = $('.lastSay').offset().top;
var lastSayMore = lastSay-alimfo;
var leftHeight = $('.alLeft').height();
var imfoHeight = $('.imfo').height();
var positionHeight = $('.position').height();
var height = imfoHeight+positionHeight;
var position2Height = $('.position2').height();
var animateHeight =  imfoHeight+positionHeight;
var animateHeightMore = animateHeight+64;
var my = lastSayMore-positionHeight;
var a = imfoHeight+64;
var sayOne = $('#say1').offset().top;
var minNavHeight = $(".minNav").height();
var sayOneMore = sayOne-minNavHeight;
var nailImgTwo = $('.imgTwo');
var nail = $(".thumbNail2");
var index = 0;
var rightWidth = $('.alinfo').width()+20;
var windowWidth = document.body.clientWidth;
var lunboWidth = $(".lunbo").height();

// $(window).resize(function () {
//     if (windowWidth<=1370){
//         $(".lunbo").css({"height":"350px"})
//     }
// });
$(window).ready(function () {

    $.ajax({
        type: 'get',
        url: URL + '/house/getOneHouse',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: true,
        data :{
            houseID:18
        },
        success: function (result) {
            console.log(result);
            console.log(result.data.title);
            $('.H1').html(result.data.title);
            $(".weizhi").html(result.data.city+result.data.region+result.data.address);
            $(".money").html("￥"+result.data.rent+"/月")
            $("#houseType").html(result.data.houseType)
            $("#rentType").html(result.data.rentType)
            $("#toward").html(result.data.toward)
            $("#elevator").html(result.data.elevator)
            $("#acreage").html(result.data.acreage)
            console.log(result.data.picture)
            $("#img1").attr("src",result.data.picture)
            $("#picture1").attr("src",result.data.picture)
            $(".ownerSayText").html(result.data.introduction)
            // $("#img1").css({'height':330+'px'})
            console.log(111)
        },
        error: function () {
            alert('服务器开小差啦');
        }
    })

    // console.log("1")
    // let data=new FormData();
    // console.log("2")
    // new Interactive({
    //     childPath:'GET /getAllHouse',
    //     method:'GET',
    //     detail:data,
    //     isFile:true,
    //     successCallback:function (result) {
    //         console.log(3)
    //     },
    //     errorCallback:function () {
    //         console.log(4)
    //     },
    // }).init();


    if (windowWidth<=730){
        $(".lunbo").css({"height":"130px"})

    } else
    if (windowWidth<=935){
        $(".lunbo").css({"height":"180px"})
    } else
    if (windowWidth<=1150){
        $(".lunbo").css({"height":"230px"})
    } else
    if (windowWidth<=1220){
        $(".lunbo").css({"height":"280px"})
    } else
        if (windowWidth<=1370){
        $(".lunbo").css({"height":"330px"})
    } else
        {
            $(".lunbo").css({"height":"390px"})
        }
    var slider = $(".lunbo");
    var len = slider.find("li").length;
    $(".lunboLeft").click(function(){
        if(index==0){
            index=len
        }else{
            index -= 1
        }
        showImg(index)
    });
    $(".lunboRight").click(function(){
        if(index==len-1){
            index=0
        }else {
            index += 1
        }
        showImg(index)
    });
    $(".smallImg li").click(function () {
        index = $(this).index()
        showImg(index)
    })
    function showImg(index){
        $(".lunbo li").eq(index).show().siblings("li").hide();
        $(".smallImg").find("li").eq(index).addClass("ACTIVE").siblings("li").removeClass("ACTIVE");
    }
    $(".lunboLeft").mouseover(function(){
        $(".lunboLeft").css({"opacity":"0.8"});
    });
    $(".lunboLeft").mouseout(function(){
        $(".lunboLeft").css({"opacity":"0.4"});
    });
    $(".lunboRight").mouseover(function(){
        $(".lunboRight").css({"opacity":"0.8"});
    });
    $(".lunboRight").mouseout(function(){
        $(".lunboRight").css({"opacity":"0.4"});
    });
//     $(".lunboLeft").onmouseover(function () {
//         $(".lunboLeft").css({"opacity":"0.8"})
// })
//     $(".lunboRight").hover(function () {
//         $(".lunboRight").css({"opacity":"0.8"})
//     })
    $(".alinfo").css({"height":leftHeight+'px'});
    // $(".thumbNail2").text(nailImgTwo);
    $("#say1").onclick=function(){
        (scrollTo(sayOneMore))
    };
    if(nailImgTwo.show())
    {
        $(".thumbNailTwo").css({"opacity":"1"});
    }else {
        $(".thumbNailTwo").css({"opacity":"0.6"});
    }
    // $(".exa>div:nth-child(1)").click(function () {
    //     $(".exa>div:nth-child(1)").find("span").addClass("glyphicon glyphicon-heart change").removeClass("glyphicon glyphicon-heart-empty")
    // })
    $(".exa>div:nth-child(1)").click(function () {
        $(".exa>div:nth-child(1)>span:nth-child(1)").css({"display":"none"})
        $(".exa>div:nth-child(1)>span:nth-child(2)").css({"display":"contents"})
    })

});

$(window).scroll((function () {
    sTop = $(this).scrollTop();
    if (sTop >= my)
    {
        $(".imfo").css({"position": "absolute",  "top":"auto" ,"bottom":"0"});
        $(".alinfo").css({"height":leftHeight+'px'});
    }
    else if (sTop >= H1)
    {
        $(".imfo").stop(true);
        $(".imfo").animate({"height":650+'px'},"1","swing","callback");
        $(".imfo").css({"position": "fixed", "top" : "0", "height":height+'px' ,"width":rightWidth + "px"});
        $(".position").slideDown();
        $(".position2").css({"display":"none"});
    } else
    {
        $(".imfo").css({"position":"relative"});
        $(".position").slideUp();
        $(".imfo").stop(true);
        $(".imfo").animate({"height":a+'px'},"1","swing","callback");
        $(".position2").css({"display":"block"});
    }
    if (sTop >= sayOne) {
        // 修改导航栏position属性，使之固定在屏幕顶端
        $(".minNav2").stop(true);
        $(".minNav2").css({"display":"block"});
        $(".minNav2").animate({"height":"34px"});
    } else {
        $(".minNav2").stop(true);
        $(".minNav2").css({"display":"none"});
        $(".minNav2").animate({"height":"0px"});
    }

}));