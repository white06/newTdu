 $(function () {
	 getDepartment();
     getClass();

	 //document.getElementById("layout").style.display="none";//隐藏对话框
    });
 
 
 function daochuAll(){
	 var index = layer.msg('导出中', {
		  icon: 16,
		  time: 80000, //2s后自动关闭
		});
	 //document.getElementById("layout").style.display="block";//显示对话框
	 var that = this;
     //请求的路径
     var page_url = "../../../../office/exportExcelAll.action?classes="+false+"&students="+true;
     var req = new XMLHttpRequest();
     //open方法打开一个请求，但是没有发送：参数1请求的方式，参数2请求路径，参数3：是否为异步
     req.open("POST", page_url, true);
     //增加事件监听，参数1表示事件，参数2:处理的函数，参数3：布尔类型，是否注册[在这里没有用]
     req.addEventListener("progress", function (evt) {
     	 //请求发送没有获得响应的处理方法，通常放置进度条或者是页面加载转圈的标志
    	//document.getElementById("layout").style.display="block";//显示对话框
     	//document.getElementById("gif").style.visibility="visible";//进度条显示
     }, false);
     req.responseType = "blob";//非常重要，表示要接收的文件是二进制文件
     req.onreadystatechange = function () {
         if (req.readyState === 4 && req.status === 200) {//访问服务器成功，所有的后台数据接收完毕
        	 var filename ="护理仿真总成绩 .xls";//导出的文件名
        	 //var filename = $(that).data('filename');//导出的文件名
             //浏览器兼容处理
             if (typeof window.chrome !== 'undefined') {
                 // Chrome version
                 var link = document.createElement('a');
                 link.href = window.URL.createObjectURL(req.response);
                 link.download = filename;
                 link.click();
             } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
                 // IE version
                 var blob = new Blob([req.response], { type: 'application/force-download' });
                 window.navigator.msSaveBlob(blob, filename);
             } else {
                 // Firefox version
                 var file = new File([req.response], filename, { type: 'application/force-download' });
                 window.open(URL.createObjectURL(file));
             }
             layer.closeAll()
         	//document.getElementById("layout").style.display="none";//隐藏对话框
             //进度条隐藏
         	//document.getElementById("gif").style.visibility="hidden";
         }
     };
     //发送请求
     req.send();
	 
	 
	 
	 
	 
	 
	 var url = "../../../../office/exportExcelAll.action?classes="+false+"&students="+true;
	 /*表单提交*/
		//$("#export-form").attr("action",url);
		//$("#export-form").submit();
		
		/*var form = $("form[name=fileForm]"); 
        var options  = {   
            url:url,   
            type:'post',   
            success:function()   
            {   
               layer.closeAll();
            }   
        };   
        form.ajaxSubmit(options); */
		
	
	 /*$.ajax({
	       url:"../../../../office/exportExcelAll.action",
	       data:{classes:false,students:true},
	       type:"POST",
	       async:false,
	       success:function(res){
	          console.log(res)
	       }
	   });*/
 }
 
 function daochuClass(){
	 
	 
	 var index = layer.msg('导出中', {
		  icon: 16,
		  time: 80000, //2s后自动关闭
		});
	 //document.getElementById("layout").style.display="block";//显示对话框
	 var that = this;
    //请求的路径
    var page_url = "../../../../office/exportExcelByClass.action?classes="+true+"&students="+false;
    var req = new XMLHttpRequest();
    //open方法打开一个请求，但是没有发送：参数1请求的方式，参数2请求路径，参数3：是否为异步
    req.open("POST", page_url, true);
    //增加事件监听，参数1表示事件，参数2:处理的函数，参数3：布尔类型，是否注册[在这里没有用]
    req.addEventListener("progress", function (evt) {
    	 //请求发送没有获得响应的处理方法，通常放置进度条或者是页面加载转圈的标志
   	//document.getElementById("layout").style.display="block";//显示对话框
    	//document.getElementById("gif").style.visibility="visible";//进度条显示
    }, false);
    req.responseType = "blob";//非常重要，表示要接收的文件是二进制文件
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {//访问服务器成功，所有的后台数据接收完毕
       	 var filename ="选修总成绩20172018 .xls";//导出的文件名
       	 //var filename = $(that).data('filename');//导出的文件名
            //浏览器兼容处理
            if (typeof window.chrome !== 'undefined') {
                // Chrome version
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(req.response);
                link.download = filename;
                link.click();
            } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
                // IE version
                var blob = new Blob([req.response], { type: 'application/force-download' });
                window.navigator.msSaveBlob(blob, filename);
            } else {
                // Firefox version
                var file = new File([req.response], filename, { type: 'application/force-download' });
                window.open(URL.createObjectURL(file));
            }
            layer.closeAll()
        	//document.getElementById("layout").style.display="none";//隐藏对话框
            //进度条隐藏
        	//document.getElementById("gif").style.visibility="hidden";
        }
    };
    //发送请求
    req.send();
	 
	 
	 
	 
	 var url = "../../../../office/exportExcelByClass.action?classes="+true+"&students="+false;
		/*$("#export-form").attr("action",url);
		$("#export-form").submit();	*/ 
	 /*$.ajax({
	       url:"../../../../office/exportExcelAll.action",
	       data:{classes:false,students:true},
	       type:"POST",
	       async:false,
	       success:function(res){
	          console.log(res)
	       }
	   });*/
 }

 var flag = false;

 //获取课程信息
function getDepartment(){
   $.ajax({
       url: houtaiurl+"KaoshiController/kaoshi.action",
       data:{
           subId :$('.choosesub',parent.document)[0].id
       },
       type:"POST",
       async:false,
       success:function(res){
           console.log(res)
           var html='';
           if(res.length!=0){
               flag=true;
               for(var i=0;i<res.length;i++)
               {
                   html+='<option data-page="'+res[i].examPager+'" value="'+res[i].id+'" >'+res[i].name+'</option>';
               }
               $("#departselection").html(html);
           }else{
               alert("该科目下无试卷");
           }


       }
   });
   $("#examPage").val()
}
 
function daoByClass() {
    var subjectId = $('.choosesub',parent.document)[0].id;
    if(flag){
        var index = layer.msg('导出中', {
            icon: 16,
            time: 800000, //2s后自动关闭
        });
        var that = this;
        //请求的路径
        var page_url = houtaiurl+"nanjingController/daoByClass.action?subjectId="+subjectId;
        var req = new XMLHttpRequest();
        //open方法打开一个请求，但是没有发送：参数1请求的方式，参数2请求路径，参数3：是否为异步
        req.open("POST", page_url, true);
        //增加事件监听，参数1表示事件，参数2:处理的函数，参数3：布尔类型，是否注册[在这里没有用]
        req.addEventListener("progress", function (evt) {
        }, false);
        req.responseType = "blob";//非常重要，表示要接收的文件是二进制文件
        req.onreadystatechange = function () {
            if (req.readyState === 4 && req.status === 200) {//访问服务器成功，所有的后台数据接收完毕
                var filename ="选修总成绩20172018 .xls";//导出的文件名
                //浏览器兼容处理
                if (typeof window.chrome !== 'undefined') {
                    // Chrome version
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(req.response);
                    link.download = filename;
                    link.click();
                } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    // IE version
                    var blob = new Blob([req.response], { type: 'application/force-download' });
                    window.navigator.msSaveBlob(blob, filename);
                } else {
                    // Firefox version
                    var file = new File([req.response], filename, { type: 'application/force-download' });
                    window.open(URL.createObjectURL(file));
                }
                layer.closeAll()
            }
        };
        //发送请求
        req.send();
    }else{
    alert("该科目下无试卷");
    }
}

//获取考核成绩 
function getKaohe(rId){
	
}

function getClass() {
    var ChooseSubject=$('#departselection').val();
    $.ajax({
        type:"POST",
        url:houtaiurl+"KaoshiController/getClassList.action?examId="+ChooseSubject,
        async: false,
        success:function(data){
            if(data){
                var html=""
                var dataL=data.length;
                if(dataL!=0){
                    for(var i=0;i<dataL;i++){
                        pageId=data[i].major_id;
                        html+='<option value="'+data[i].id+'">'+data[i].className+'</option>';
                    }
                }
                $('#classId').html(html);
            }
        }
    })
}






 
//点击下一页展示
 function upCurrent_click(){
	 var num=parseInt($("#currentPage").text());
	 var allNum=parseInt($("#totalInfos").text());

	 if(num==allNum){
		 
	 }else{
		 $("#currentPage").text(num+1);
		 gradeChange();
	 }
 }
 //点击下一页
 function downCurrent_click(){
	 //当前页
	 var num=parseInt($("#currentPage").text());
	 //总页
	 var allNum=parseInt($("#totalInfos").text());
 if(num==1){
		 
	 }else{
		 $("#currentPage").text(num-1);
		 gradeChange();
	 }
 }
 
 function scores(userId,username){
	 layer.open({
		 skin: 'layui-layer-lan',
		  type: 2,
		  title: username+'成绩',
		  shadeClose: true,
		  shade: 0.8,
		  area: ['60%', '90%'],
		  content: 'stuForTeacher.php?userId='+userId //iframe的url
		}); 
 }
// document.body.oncontextmenu = function () { return false; }
// $(function () {
//     getDepartment();
//     getDepartMajor();
//     $("#create").click(function () {
//         if ($.trim($("#departselection option:selected").val()).length <= 0) {
//             alert("请选择要添加专业的学院");
//             return false;
//         }
//         else {
//             $("#create").attr({ href: "create.php?dpartId=" + $("#departselection option:selected").val() });
//             return true;
//         }
//     });
//     $("#departselection").change(function () {
//         getDepartMajor();
//     });
// });
// function getDepartMajor() {
//     $("#majors").html("")
//     var obj = $("#departselection option:selected").val();
//     if ($.trim(obj).length > 0) {
//         $.post("../../../../DepartmentController/GetMajorListByid.action", data = { id: obj }, function (data) {
//             for (var i in data) {
//                 $("#majors").append(' <tr><td>' + data[i].majorName + '</td><td>' +
//                     '<a class="add-btn ulib-r3" href="Edit.php?MajorId=' + data[i].id + '">编辑</a>&nbsp;&nbsp;&nbsp; '+
//                     '<a class="add-btn ulib-r3" href="Delete.php?MajorId=' + data[i].id + '">删除</a></td></tr>');
//             }
//         });
//     }
// }

