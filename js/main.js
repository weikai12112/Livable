const URL='';
let CreatPromptBox =function(){
    let newNode=document.createElement('div');
    newNode.classList.add('PromptBox');
    newNode.style.display='none';
    document.body.appendChild(newNode);
    this.newNode=newNode;
}
CreatPromptBox.prototype.displayPromptBox=function(text){
    this.newNode.innerText=text;
    $(this.newNode).fadeIn(500);
    $(this.newNode).fadeOut(1500);
}

let checkScreen=function (){
    let IntvId=setInterval(function () {
        if (window.orientation == 180 || window.orientation == 0) {
            $('#horizontalScreenTips').eq(0).removeClass('hidden');
        }
        if (window.orientation == 90 || window.orientation == -90) {
            $('#horizontalScreenTips').eq(0).addClass('hidden');
        }
        window.clearInterval(IntvId);
    },1000)

}
