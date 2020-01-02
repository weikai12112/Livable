// JavaScript Document
var Tbody=document.getElementById('tbody');
//var btn=document.getElementsByClassName('butt');
//console.log(btn.innerHTML);
	let URL='http://114.115.156.4:8001/';
    console.log(Tbody);
	Tbody.innerHTML='';
    var str='';
    var houseid=[];
  
  $.ajax({
                type: 'get',
                url: URL + 'like/getAll',
               contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                async: true,
                data:{ },
                success: function (result) {
                    if(result.code=='200'){
                       // document.getElementById('Name').innerHTML=result.data.Name;
						//typeof(result.data.address);
						console.log(result.data[0].address);
						alert('成功啦');
						for(var i=0;i<result.data.length;i++)
						{
						var str1='<tr>'+'<td>'+'<img class="img-style"' +'src='+'"'+result.data[i].picPath+'"'+'/>'+'<p class="typeface"' +'>'+result.data[i].address+'</p>'+'</td>' +'<td class="td">'+result.data[i].price+'</td>'+ '<td class="td">'+result.data[i].date+'</td>'+'<td class="td">'+'<button type="button" class="btn btn-warning btn-sm butt">删除</button>'+'</td>'+'</tr>';
						str+=str1;	
						houseid+=result.data[i].houseId;
						}
						console.log(houseid);
						Tbody.innerHTML=str;
						 var button=document.getElementsByTagName('button');
						//  console.log(button[1]);
						for(let j=1;j<button.length;j++)
						{
							console.log(button[j]);
						 button[j].onclick=function(){
							// alert(j);
							 	 let id=houseid[j-1];
							 alert(id);
		      $.ajax({
						type: 'delete',
						url: URL + 'like',
						contentType: 'application/x-www-form-urlencoded',
						dataType: 'json',
						async: true,
						data: {
							houseId:id
						},
						success: function (result) {
							if(result.code=='200'){
								alert('成功啦');
								window.location.reload();
							}
							else alert(result.msg);
						},
						error: function () {
							alert('服务器开小差啦');
						}
					})
							   }
						 }
									}
									else alert(result.msg);
								},
								error: function () {
									alert('服务器开小差啦');
								}
							})
 


  
  
  
