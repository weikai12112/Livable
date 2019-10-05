var oTop = $(".minNav").offset().top;
//获取导航栏的高度，此高度用于保证内容的平滑过渡
var martop = $('.minNav').outerHeight();
var foottop = $('.foot').innerHeight();
var ofootop = $('.foot').offset().top;
var winWidth = 0;
var winHeight = 0;
var sTop = 0;
var alinfo = document.getElementsByClassName("alinfo");
// 监听页面的滚动
function findDimansions(){
    if(winWidth<="1100px")
    {
        alinfo.width="400px"
    }
}


$(window).scroll(function () {
    // 获取页面向上滚动的距离
    sTop = $(this).scrollTop();
    // 当导航栏到达屏幕顶端
    if (sTop >= oTop) {
        // 修改导航栏position属性，使之固定在屏幕顶端
        $(".minNav").css({ "position": "fixed", "top": "0" });
        // 修改内容的margin-top值，保证平滑过渡
        $(".say").css({ "margin-top": martop });
    } else {
        // 当导航栏脱离屏幕顶端时，回复原来的属性
        $(".minNav").css({ "position": "static" });
        $(".content").css({ "margin-top": "0" });
    }
});
