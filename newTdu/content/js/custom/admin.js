function addadmin(){
	var addusername=$("#addusername").val();
	var addname=$("#addname").val();
	if(addname=="管理员"){
		alert("兄弟，别搞事啊！")
		return;
	}
	var addsex=$('input:radio[name="sex"]:checked').val();
	var addpwd=$("#addpwd").val();
	var addnumber=$('input:radio[name="role"]:checked').val();
	if(!addusername.length>0){
		alert("请输入学号");
		return;
	}
	if(!addname.length>0){
		alert("请输入姓名");
		return;
	}
	if(addsex==null){
		alert("请选择性别");
		return;
	}
	if(!addpwd.length>0){
		alert("请输入密码");
		return;
	}
	if(addnumber==null){
		alert("请设置权限");
		return;
	}
	$.ajax({
		url:pathURL+"UsersController/insUser.action",
		type:"POST",
		data:{"username":addusername,"name":addname,"sex":addsex,"password":addpwd,"role":addnumber},
		success:function(data){
			if(data=="ture"){
				$("#addusername").val("");
				$("#addname").val("");
				$("#addpwd").val("");
				alert("添加成功");
			}else if(data=="err"){
				alert("此用户名已经存在");
				$("#addusername").val("");
				$("#addname").val("");
				$("#addpwd").val("");
			}else{
				alert("添加用户失败，请联系管理员");
			}
		}
	})
}

function excel(){
	$("#zhaozi,#xianshidiv").show();
	getHeight();
	$("#xianshiwenjian").css("background","#FFFFFF");
	$("#xianshiwenjian").load('content/userExcel.php');
}