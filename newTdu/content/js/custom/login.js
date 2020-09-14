function login(){
  		var UserName=$("#UserName").val();
  		var PassWord=$("#PassWord").val();
  		if(!UserName.length>0){
  			alert("请输入账号");
  			return ;
  		};
  		if(!PassWord.length>0){
  			alert("请输入密码");
  			return ;
  		};
  		$.ajax({
  			type:"POST",
  			url:"../UsersController/login.action?userName="+UserName+"&passWord="+PassWord,
  			async:false,
  			success:function(res){
  				var data=eval("("+(res)+")");

  				if(data.success=="ture"){
  					window.location.assign("index.php");
  					return;
  				}else if(data=="flase"){
  					alert("账号或密码不正确");
  					return;
  				}else if(data=="err"){
  					alert("拦截出错,请刷新");
  					return;
  				}
  			},
  			error:function(data){
  				alert("登陆异常");
  				return;
  			},
  		});
  	}

//回车事件
 $(document).keydown(function (e) {
            if (e.keyCode === 13) {
                login();
            }
        });
 
function getName(){
	//对用户名进行获取，要是session中无值，返回登录页面
	$.ajax({
		url:"../ShouyeController/sUserName.action",
		type:"POST",
		async:true,
		success:function(data){
			if(data=="err"){
				return;
			}
			else{
				window.location.assign("index.php");
				return;
			}
		},
		error:function(){
			return;
		}
	});	
 }


 
 $(function(){
	 getName();

	 $(".PasswordButton").on("click",function(e){
	 	if($("#PassWord").val().length>0) {
            if ($("#PassWord")[0].type == "text") {
                $("#PassWord")[0].type = "password";
                $(".PasswordButton")[0].src = "img/visible.png";
            } else {
                $("#PassWord")[0].type = "text";
                $(".PasswordButton")[0].src = "img/password_in.png";
            }

        }
	 })
 });