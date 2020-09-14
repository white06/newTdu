var index = parent.layer.getFrameIndex(window.name);
var departselection = parent.layer.departselection;
var userId = parent.layer.userId;
$(function () {
    var str = GetRequest();
    eval(str)
    departselection = str.departselection;
    userId = str.userId;
    console.log(departselection,userId)

    getClass(departselection,userId);
    getClassReally(userId);
});

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
var majorFlag=false;

function getClass(departselection,userId) {
    $.ajax({
        type:"POST",
        url:houtaiurl+"DepartmentController/GetMajorListByUser.action?id="+departselection+"&userId="+userId,
        async: false,
        success:function(data){
            if(data.lenght>0){
                majorFlag=true;
            }
            if(data){
                var html=""
                var dataL=data.length;
                for(var i=0;i<dataL;i++){
                    pageId=data[i].major_id;
                    html+='<option value="'+data[i].id+'">'+data[i].MajorName+'</option>';
                }
                $('#majorId').html(html);
            }
        }
    })
}
var classFlag=false;

function getClassReally(userId) {
    var majorId=$('#majorId').val();
    $.ajax({
        type:"POST",
        url:houtaiurl+"DepartmentController/getMajorSubjectsByUser.action?id="+majorId+"&userId="+userId,
        async: false,
        success:function(data){
            if(data.lenght>0){
                classFlag=true;
            }
            if(data){
                var html=""
                var dataL=data.length;
                for(var i=0;i<dataL;i++){
                    pageId=data[i].major_id;
                    html+='<option value="'+data[i].id+'">'+data[i].subjectName+'</option>';
                }
                $('#subjectId').html(html);
            }
        }
    })
}