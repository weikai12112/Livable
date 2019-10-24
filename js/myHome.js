$(document).ready(function () {
    rightOHeight = $(".rightText").offset().top;
    rightHeight = $(".rightText").height();
    $(".mid").css({"height":rightHeight+rightOHeight})
    input = document.getElementsByTagName("input");
    $(".tdOne").click(function () {
        $(".textBottom :checkbox").attr("checked",'checked');
    })
})