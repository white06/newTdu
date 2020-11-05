
//分享接口
function fenxiang(){
 	var str = location.search.substr(5);
      console.log(str);
	//var type=str.type;
 	var first=str;
	var head="https://tdu.tduvr.club/TDuWebEngine/index.html?"
//	if(type==1){
		
//	}else if(type==2){

//	}
  //  var first="tduvr://command=open&App=TDuSimEngine&Scene=22272f66-9dac-4b87-a2a1-22b6e5910779/c0043fe5-1d20-4354-a60d-f5132b3bb1f2/c0043fe5-1d20-4354-a60d-f5132b3bb1f2.EXM&UserID=4d272f66-9dac-4b87-a2a1-22b6e5910779&SceneOrModelID=c0043fe5-1d20-4354-a60d-f5132b3bb1f2&OpMode=TDuPractice&";
//	var     first=url;

//userID
//var strfirst=first.split("&");
//    console.log(strfirst);
 //   strfirst[3]="UserID=";
 //   var second="";
 //   for(var i=0;i<strfirst.length-1;i++){
  //      second+=strfirst[i]+"&";
  //  }
 //   console.log(second);
    var jiami = $('#jiami')[0].checked;
    var fenxiang = $('#fenxiang')[0].checked;
    
     

$.ajax({

        url: "https://www.tduvr.club/shorturl/api",
        //url: "http://192.168.0.55/shorturl/api",
        type: "GET",
              data: {"link":first,"jiami":jiami,"fenxiang":fenxiang},
        success: function (data) {
	console.log(data)
            $("#one").css("display","none");
            $("#two").css("display","block");
if(jiami==false){






$("#wenben").html("链接: "+data.url);
}else{
$("#wenben").html("链接: "+data.url+"    验证码: "+data.mima);
}
		
$("#fuzhi").text(data);
    var obj=$("#fuzhi");
    obj.select();
  document.execCommand("Copy");
            console.log(data);
            //name = name + "KnowledgeID=" + knowContentId + "&OperateID=" + userId + "&"+ "loginId=" + data+"&";
            //   window.location.href=name;
            // if(count!="3"){
            //     window.location.href=data
            // }else{
            //     window.open(data);
            // }
        },
        error: function () {
            return;
        }
    });
   
}


function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

