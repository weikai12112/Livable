$(document).ready(function () {
    let PromptBox=new CreatPromptBox();
    let information=function(){
        this.nowSort='综合排序';
        this.condition={
            lie:'',
            time:'',
            price:'',
            area:'',
            key:'',
            type:'',
            tag:[],
        }
    }

    information.prototype.getNewSort=function(){
        $.ajax({
            type: 'post',
            url: URL + '/sort',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {
                sortType:this.nowSort
            },
            success: function (result) {
                if(result.code=='200'){
                    PromptBox.displayPromptBox('获取成功');
                    this.displayHome(result.homeInf)
                }
                else PromptBox.displayPromptBox(result.msg);
            },
            error: function () {
                PromptBox.displayPromptBox('服务器开小差啦');
            }
        })
    }
    information.prototype.resetTypeValue=function(target){
        $("[name='whole']")[0].src='../img/whole.png';
        $("[name='double']")[0].src='../img/double.png';
        $("[name='bed']")[0].src='../img/bed.png';
        $('.type').children().removeClass('chosed');
        $(target).addClass('chosed');
    }
    information.prototype.findByKey=function(key){
        $.ajax({
            type: 'post',
            url: URL + '/findByKey',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {
                key:key
            },
            success: function (result) {
                if(result.code=='200'){
                    PromptBox.displayPromptBox('获取成功');
                    this.displayHome(result.homeInf)
                }
                else PromptBox.displayPromptBox(result.msg);
            },
            error: function () {
                PromptBox.displayPromptBox('服务器开小差啦');
            }
        })
    }
    information.prototype.displayHome=function(homeInf){
        $('#homeNumber')[0].innerHTML=homeInf.length;
        homeInf.forEach(onselfCard=>$('.homeDeatil').eq(0).append("<div class=\" margin-top-md homeCard col-lg-10 animated bounceInLeft \" id='\""+ homeInf.homeId+"\"'>\n" +
            "                <div class=\"col-lg-12 aboutHouserOwner\">\n" +
            "                    <div class=\"pull-left\">\n" +
            "                        <img class=\"\" src=\"../img/houseOwner.png\">\n" +
            "                    </div>\n" +
            "                    <div class=\"pull-left\">\n" +
            "                        <span>"+ homeInf.ownerName+"</span><br/>\n" +
            "                        "+ homeInf.ownerInf+"\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "                <img class=\"pull-left\" src=\"../img/background2.jpg\">\n" +
            "                <div class=\"pull-left col-lg-6\">\n" +
            "                    <h4>"+ homeInf.homeName+ "<img class=\"love pull-right\" src=\"../img/love.png\"></h4>\n" +
            "                    <h5 class=\"margin-top-md\">"+ homeInf.lieAndSize+ "<sup>2</sup> | 东南 | 3室1厅2卫 </h5>\n" +
            "                    <p class=\"text-muted margin-top-sm\">发布时间:<span> 2019.09.07</span></p>\n" +
            "                    <div class=\"pull-left col-lg-7 margin-top-md tag\">\n" +
            "                        <label>智能锁</label>\n" +
            "                        <label>立即入住</label>\n" +
            "                    </div>\n" +
            "                    <div class=\"pull-right col-lg-5 margin-top-md money\"><span>"+ homeInf.price+ "</span></div>\n" +
            "\n" +
            "\n" +
            "                </div>\n" +
            "            </div>"))
    }
    information.prototype.creatTag=function(){
        let inner='';
        for(let i in this.condition){
            console.log(i,this.condition[''+i])
            if (i!='tag'&&this.condition[i]){
                inner+="<label class=\"label screeningConditions\">"+this.condition[i]+"<span class=\"glyphicon glyphicon-remove\"></span></label>"
            }
        }
        $('.tagList>div:last-child').html(' ');
        findHomeInf.condition.tag.forEach(value => inner+="<label class=\"label screeningConditions\">"+value+"<span class=\"glyphicon glyphicon-remove\"></span></label>");
        $('.tagList>div:last-child').append(inner);

    }
    information.prototype.loved=function(homeId){
        $.ajax({
            type: 'post',
            url: URL + '/loved',
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'json',
            async: true,
            data: {
                homeId:homeId
            },
            success: function (result) {
                if(result.code=='200'){
                    PromptBox.displayPromptBox('收藏成功');
                }
                else PromptBox.displayPromptBox(result.msg);
            },
            error: function () {
                PromptBox.displayPromptBox('服务器开小差啦');
            }
        })
    }
    let findHomeInf=new information();



    $('button').click(function () {
        if(event.target.classList[0]!='sort'){
            console.log(event)
            if ($(event.path[2]).children('div').eq(0).text()!='出租类型'&&$(event.path[3]).children('div').eq(0).text()!='出租类型'){
                $(event.path[1]).children('button').removeClass('chosed')
                $(event.target).addClass('chosed');
                console.log($(event.target).parent().prev().text());
                switch ($(event.target).parent().prev().text()) {
                    case '价格':findHomeInf.condition.price=event.target.innerText;findHomeInf.creatTag();break;
                    case '面积':findHomeInf.condition.area=event.target.innerText;findHomeInf.creatTag();break;
                }
            }else {
                let target;
                event.target.tagName=='IMG'? target = event.path[1] : target = event.target;
                console.log($(target).children('img')[0].name);
                switch ($(target).children('img')[0].name) {
                    case 'whole':findHomeInf.resetTypeValue(target);
                                    $(target).children('img')[0].src='../img/whole-.png';
                                    findHomeInf.condition.type='整租';
                                    findHomeInf.creatTag();
                                    break;
                    case 'bed':findHomeInf.resetTypeValue(target);
                                $(target).children('img')[0].src='../img/bed-.png';
                                findHomeInf.condition.type='床位';
                        findHomeInf.creatTag();
                                break;
                    case 'double':findHomeInf.resetTypeValue(target);
                                $(target).children('img')[0].src='../img/double-.png';
                                findHomeInf.condition.type='合租';
                        findHomeInf.creatTag();
                                break;
                }
            }
        }else {
            $(event.path[1]).children('button').removeClass('chosedSort')
            $(event.target).addClass('chosedSort');
            findHomeInf.nowSort=$(event.target).text();
            findHomeInf.getNewSort()
        }

    })
    $('#findByKey').click(function () {
        findHomeInf.findByKey($('#findByKey').parent().children().val());
    })
    $(".queryCriteria>div:nth-last-child(2)").click(function () {
        if (event.target.tagName=='INPUT') {
            let key=true;
            let val;
            val=$(event.target).parent()[0].innerText;
            for (let i=0,l=findHomeInf.condition.tag.length;i<=l;i++){
                if (findHomeInf.condition.tag[i]==val){
                    findHomeInf.condition.tag.splice(i,1);
                    key=false;
                    break;
                }
            }
            key?findHomeInf.condition.tag.push(val):void(0);
            // key?findHomeInf.condition.tag[0]?findHomeInf.condition.tag.push(val):findHomeInf.condition.tag[0]=val:void(0);
            console.log(event.target,findHomeInf.condition.tag);
            findHomeInf.creatTag();
        }

    })
    $('.love').click(function () {
        let aim=event.target;
        aim.src='../img/loved.png';
        $(aim).addClass('rubberBand');
        $('.love').on('animationend',function () {

            $(aim).removeClass('rubberBand');
        })
        findHomeInf.loved(event.path[2].id)
    })
})