//科目id
var majorId;
//班级id
var classId;
$(function() {
    getdapartment();
});
//获取学院信息
function getdapartment(){
    $.ajax({
        type : "POST",
        url : dapartmenturl+"DepartmentController/GetDepartmentList.action",
        success : function(data) {
            var html='';
            for(var i=0;i<data.length;i++){
                    html+=' <li class="selectBoxItem">\n' +
                        '                            <a href="javascript:;" rel="知晓" id="'+data[i].id+'" onclick="choosesub(\''+data[i].id+'\')" >'+data[i].name+'</a>\n' +
                        '                        </li>';

            }
            $("#showdepartment").html(html);
        }
    })
}


//专业跳转
function choosesub(id){
    College_Id=id;
    var html='';
    $.ajax({
        type : "POST",
        url : dapartmenturl+"DepartmentController/GetMajorListByid.action",
        data : {"id":id},
            success : function(data) {
            if(data!=null){
                var html='';
                for(var i=0;i<data.length;i++){
                    html+=' <li class="selectBoxItem">\n' +
                        '                            <a href="javascript:;" rel="知晓" id="'+data[i].Id+'" onclick="choosemajor(\''+data[i].Id+'\')" >'+data[i].MajorName+'</a>\n' +
                        '                        </li>';

                }
                $("#showmajor").html(html);
            }
        }
    })
}

//科目跳转
function choosemajor(id){
    majorId=id;
    var html='';
    $.ajax({
        type : "POST",
        url : dapartmenturl+"DepartmentController/GetClasslistBymajorid.action",
        data : {"id":id},
        success : function(data) {
            if(data!=null){
                var html='';
                html+='    <div onclick="addclass()" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 30px;margin-left: 30px;display: inline-block;position: relative;cursor:pointer">\n' +
                    '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                    '            <img src="../../img/icon_more.png" height="100" width="100"/>\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div style="position: absolute;bottom:90px;width: 100%;text-align: center;height:40px;font-size:22px;\n' +
                    '        font-family:PingFangSC-Semibold,PingFang SC;font-weight:500;color:rgba(255,255,255,1);line-height:40px;">新建班级</div>\n' +
                    '\n' +
                    '    </div>';
                for(var i=0;i<data.length;i++){
                    html+='<div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 30px;margin-left: 30px;display: inline-block;position: relative">\n' +
                        '        <div style="position: absolute;top: 50px;left: 90px;width: 99px;height: 99px;"><img src="../../img/icon_4.png" style="width: 100%;height: 100%;"/></div>\n' +
                        '\n' +
                        '        <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;font-size:22px;\n' +
                        '        font-family:PingFangSC-Semibold,PingFang SC;font-weight:500;color:rgba(255,255,255,1);line-height:40px;">'+data[i].className+'</div>\n' +
                        '\n' +
                        '\n' +
                        '        <div style="position: absolute;;width: 190px;height: 50px;top: 250px;left: 45px;\n' +
                        '        background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                        '        font-size:20px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(255,255,255,1);line-height:50px;text-align: center;cursor:pointer" onclick="bianji(\''+data[i].id+'\')">编辑</div>\n' +
                        '\n' +
                        '\n' +
                        '        <div style="position: absolute;;width: 190px;height: 50px;top: 320px;left: 45px;\n' +
                        '        background:linear-gradient(218deg,rgba(255,160,141,1) 0%,rgba(255,130,155,1) 100%);border-radius:26px;\n' +
                        '        font-size:20px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(255,255,255,1);line-height:50px;text-align: center;cursor:pointer" onclick="shanchu(\''+data[i].id+'\')">删除</div>\n' +
                        '\n' +
                        '\n' +
                        '    </div>';
                }
                $("#contentDiv").html(html);
            }
        }
    })
}
//跳转新增班级页面
function addclass(){
    $("#contentDiv").hide();
    $("#showbanne").hide();
    $("#addclass").show();
}
//新增班级页面返回功能
function fanhui(){
    location.reload();
}

//新增班级页面新增
function baocun(){
    var name=$("#name").val();
    $.ajax({
        type : "POST",
        url : dapartmenturl+"DepartmentController/CreateClass.action",
        data : {"Majorid":majorId,"className":name},
        success : function(data) {
            layer.alert("添加成功！");
        }
    })
    choosemajor(majorId);
}


//班级删除接口
function shanchu(id){
    $.ajax({
        type : "POST",
        url : dapartmenturl+"DepartmentController/DeleteClass.action",
        data : {"id":id},
        success : function(data) {
            if(data==true){
                layer.alert("删除成功！");
                choosemajor(majorId);
            }
        }
    })

}

//班级编辑接口显示
function bianji(){
    $("#contentDiv").hide();
    $("#showbanne").hide();
    $("#updateclass").show();
    $.ajax({
        type : "POST",
        url : dapartmenturl+"DepartmentController/GetClasslistBymajorid.action",
        data : {"id":majorId},
        success : function(data) {
            if(data!=null){
                classId=data[0].id;
               $("#name2").val(data[0].className);
            }
        }
    })

}

//班级编辑返回接口
function fanhui2(){
    choosemajor(majorId);
}














