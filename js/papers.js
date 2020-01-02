// JavaScript Document
let URL='http://114.115.156.4:8001/';
var fileM=document.querySelector("#fileUp");
var fileM1=document.querySelector("#fileUp1");
let idCardPicZ='';
let idCardPicF='';

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
		console.log(result.httpUrl);
			//oImg.src=result.httpUrl;
			idCardPicZ=result.httpUrl;
			
        },
    });
});

$("#fileUp1").on("change",function() {
    //获取文件对象，files是文件选取控件的属性，存储的是文件选取控件选取的文件对象，类型是一个数组
    var fileObj = fileM1.files[0];
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
		console.log(result.httpUrl);
			//oImg.src=result.httpUrl;
			idCardPicF=result.httpUrl;
        },
    });
});

var nich=document.getElementById('nich');
var mark=document.getElementById('mark');
var type=document.getElementById('type');
var button=document.getElementById('butt');
			alert(button);

console.log(nich.value);
//console.log(hobby.value);

$.ajax({
                type: 'get',
                url: URL + 'information/getIDInformation',
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
						mark.value= result.data.idNumber;
						type.value= result.data.idCardType;
						//alert('成功啦');		
						
                    }
                    else alert(result.msg);
                },
                error: function () {
                    alert('服务器开小差啦');
                }
            })

						//nich1=nich.value;
			let nich1=nich.value;
						//password1=password.value;
			let	idNumber=mark.value;
			let	idCardType=type.value;
		    button.onclick=function(){
				
				$.ajax({
					type: 'post',
					url: URL + 'information/IDInformation',
					contentType: 'application/x-www-form-urlencoded',
					dataType: 'json',
					async: true,
					data: {
						name:nich1,
						idNumber:idNumber,
						idCardType:idCardType,
						idCardPicZ:idCardPicZ,
						idCardPicF:idCardPicF
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



