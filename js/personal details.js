// JavaScript Document
let URL='http://114.115.156.4:8001/';
var fileM=document.querySelector("#fileUp");
var oImg =document.getElementById('img-src');
oImg.src=" ";

function selectTag(obj,vv){
    //假设所有a初始字体颜色为黑色
   document.getElementById("input-int").value+=vv+" ";
   var parentNode=obj.parentNode;
   var aList=parentNode.children;
   for(var i=0;i<aList.length;i++)
    aList[i].style.color='#000';
    obj.style.color='#FDC477';
}



//var button=document.getElementById('bttn')
$("#fileUp").on("change",function() {
    //获取文件对象，files是文件选取控件的属性，存储的是文件选取控件选取的文件对象，类型是一个数组
    var fileObj = fileM.files[0];
    //创建formdata对象，formData用来存储表单的数据，表单数据时以键值对形式存储的。
    var formData = new FormData();
    formData.append('file', fileObj);
    $.ajax({
		type: "put",
        url: "http://114.115.156.4:9494/oss/uploadFile",
        dataType: "json",
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            alert("恭喜你！上传成功");
		//console.log(result.httpUrl);
		  let Ourl=result.httpUrl;
			
		var button1=document.getElementById('bttn');
			
	button1.onclick=function(){
		console.log('Ourl');
	   $.ajax({
                type: 'post',
                url: URL + 'information/headPortrait',
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                async: true,
                data: {
                   headPortrait:Ourl
                },
                success: function (result) {
                    if(result.code=='200'){
						alert('成功啦');
                        //document.getElementById('Name').innerHTML=result.data.Name;
			$.ajax({
					type: 'get',
					url: URL + 'information/getHeadPortrait',
					contentType: 'application/x-www-form-urlencoded',
					dataType: 'json',
					async: true,
					data: {
						//city:city[2],
					},
					success: function (result) {
						if(result.code=='200'){
							alert("成功啦");
							oImg.src=result.data;
							//document.getElementById('Name').innerHTML=result.data.Name;
						}
						else alert(result.msg);
					},
					error: function () {
						alert('服务器开小差啦');
					}
				})	
						
                    }
                    else alert(result.msg);
                },
                error: function () {
                    alert('服务器开小差啦');
                }
            })
       }
			
        },
    });
});



var nich=document.getElementById('nich');
var phone=document.getElementById('phone');
var password=document.getElementById('password');
var age=document.getElementById('age');
var job=document.getElementById('job');
var hobby=document.getElementById('input-int');
var button=document.getElementById('button');

console.log(nich.value);
console.log(hobby.value);

$.ajax({
                type: 'get',
                url: URL + 'information/getPersonalInformation',
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                async: true,
                data: {
                    //city:city[2],
                },
                success: function (result) {
                    if(result.code=='200'){
                        //document.getElementById('Name').innerHTML=result.data.Name;
						console.log(result.data.name);
						nich.value=result.data.name;
						phone.value= result.data.phone;
						password.value= result.data.password;
						age.value=result.data.age;
						job.value=result.data.job;
						hobby.value=result.data.hobby;
						alert('成功啦');	
				    button.onclick=function(){
						//nich1=nich.value;
						phone1=phone.value;
						//password1=password.value;
						age1=age.value;
						job1=job.value;
						hobby1=hobby.value;
				$.ajax({
					type: 'post',
					url: URL + 'information/personalInformation',
					contentType: 'application/x-www-form-urlencoded',
					dataType: 'json',
					async: true,
					data: {
						phone:phone1,
						age:age1,
						job:job1,
						hobby:hobby1
					},
					success: function (result) {
						if(result.code=='200'){
							alert('成功啦');
							//document.getElementById('Name').innerHTML=result.data.Name;
						}
						else alert(result.msg);
					},
					error: function () {
						alert('服务器开小差啦');
					}
            })
						
						
					}		
						
                    }
                    else alert(result.msg);
                },
                error: function () {
                    alert('服务器开小差啦');
                }
            })





  // var oInt=document.getElementsByClassName("interest1");
   //var oInt=document.getElementById('int');
/*$(document).ready(function () {
	  var Int=$(".interest1");
	 var Input=$("#input-int");
	  let inval=Input.val();
	// Input.value="音乐";
	//console.log(Input.value);
	  //var i=0;
	for(let i=0;i<Int.length;i++)
	{
	 console.log(Int[i].innerHTML);
	 Int[i].onclick=function(){
		 //alert(Int[i].innerHTML);
		 var inhtml=Int[i].innerHTML;
		console.log(inval);
		 inval+=inhtml;
		}
	 }
		$("#input-int").value=inval;
		 console.log(Input.value);
    })*/



	/*function ss()
	{
	 
	}*/
  
/*$.ajax({
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
            })*/