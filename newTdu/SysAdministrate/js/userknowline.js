
$(function () {
    getDepartment();
    getClass();
    getClassReally();
});

var depFlag=false;

//获取课程信息
function getDepartment(){
    $.ajax({
        url: houtaiurl+"DepartmentController/GetDepartmentList.action",
        /*data:{
         subId :"086e9c77-8f33-4b0a-b3a6-39f138f512a0"
         },*/
        type:"POST",
        async:false,
        success:function(res){
            console.log(res)
            if(res.length>0){
                depFlag=true;
            }
            var html='';
            for(var i=0;i<res.length;i++)
            {
                html+='<option data-page="'+res[i].examPager+'" value="'+res[i].id+'" >'+res[i].name+'</option>';
            }
            $("#departselection").html(html);
        }
    });
    $("#examPage").val()
}

var majorFlag=false;

function getClass() {
    var departselection=$('#departselection').val();
    $.ajax({
        type:"POST",
        url:houtaiurl+"DepartmentController/GetMajorListByid.action?id="+departselection,
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

function getClassReally() {
    var majorId=$('#majorId').val();
    $.ajax({
        type:"POST",
        url:houtaiurl+"DepartmentController/getMajorSubjects.action?id="+majorId,
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
