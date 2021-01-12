$(function () {

showimages();
    // getDepartment();
    // getClass();
    // getClassReally();
    // getFangzhenReally();
    //document.getElementById("layout").style.display="none";//隐藏对话框
});

//展示图片
function showimages(){
    var obj=getRequest();
    var userId=obj['userId'];
    console.log(userId);
    var html="";

    //存在图片

    return new Promise(function() {
        var ImgObj = new Image(); //判断图片是否存在
        var imgurl="https://tdu.tduvr.club/Data/pic/"+userId+".png";
        ImgObj.src = imgurl;
        ImgObj.onload = function(res) {
            html+="<img src=\"https://tdu.tduvr.club/Data/pic/"+userId+".png\" height='600' />";
            $("#showimages").append(html);
        }
        ImgObj.onerror = function(err) {
           console.log(0);
        }
    })
    // console.log(ImgObj);
    // console.log(ImgObj.fileSize);
    // console.log(ImgObj.width);
    // console.log(ImgObj.height);
    // if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
   //     html+="<img src=\"https://tdu.tduvr.club/Data/pic/"+userId+".png\" height='600' />";
  //  } else {

        // html+="<img src=\"https://tdu.tduvr.club/Data/pic/"+userId+".png\" height='600' />";
   // }



}
//获取网址后面id信息
function getRequest(){
    var url=location.search;
    var	theRequest= new Object();
    var strs="";
    if(url.indexOf("?")!=-1){
        var str= url.substr(1);
        strs=str.split("&");
        for(var i=0; i<strs.length; i++ ){
            theRequest[strs[i].split("=")[0]]= decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

//提交成绩
function tijiao(){
    var obj=getRequest();
    var userId=obj['userId'];
    var fenshu=$("#fenshu").val();
    console.log(isNaN(fenshu));
    if(fenshu==null||fenshu==""){
        layer.alert("请重新输入！");
    }else if(isNaN(fenshu)){
        layer.alert("请重新输入！");
    }else{
        $.ajax({
            url:"../../../tdu-base/"+"SubjectTreeController/insScoreTeacherNan.action",
            type:'POST',
            data:{"userId":userId,
                "score":fenshu
            },
            async: false,
            dataType:"json",
            success:function(data){
                var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

                parent.layer.close(index); //再执行关闭
            }
        });
    }
}