//学院id
var College_Id;
//科目id
var majorId;
$(function() {
    getdapartment();
    initshow();
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

//初始化展示
function initshow(){
    var html='   <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 30px;margin-left: 30px;display: inline-block;position: relative">\n' +
        '\n' +
        '    </div>';
    $("#contentDiv").html(html);
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
            html+='    <div onclick="addmajor()" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 30px;margin-left: 30px;display: inline-block;position: relative;cursor:pointer">\n' +
                '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                '            <img src="../../img/icon_more.png" height="100" width="100"/>\n' +
                '        </div>\n' +
                '\n' +
                '        <div style="position: absolute;bottom:90px;width: 100%;text-align: center;height:40px;font-size:22px;\n' +
                '        font-family:PingFangSC-Semibold,PingFang SC;font-weight:500;color:rgba(255,255,255,1);line-height:40px;">新建专业</div>\n' +
                '\n' +
                '    </div>';
            for(var i=0;i<data.length;i++){
                html+='<div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 30px;margin-left: 30px;display: inline-block;position: relative">\n' +
                    '        <div style="position: absolute;top: 50px;left: 90px;width: 99px;height: 99px;"><img src="../../img/icon_4.png" style="width: 100%;height: 100%;"/></div>\n' +
                    '\n' +
                    '        <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;font-size:22px;\n' +
                    '        font-family:PingFangSC-Semibold,PingFang SC;font-weight:500;color:rgba(255,255,255,1);line-height:40px;">'+data[i].MajorName+'</div>\n' +
                    '\n' +
                    '\n' +
                    '        <div style="position: absolute;;width: 240px;height: 50px;top: 250px;left: 20px;\n' +
                    '        background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                    '        font-size:20px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(255,255,255,1);line-height:50px;text-align: center;cursor:pointer" onclick="bianji(\''+data[i].id+'\')">专业编辑</div>\n' +
                    '\n' +
                    '        <div style="position: absolute;;width: 110px;height: 50px;top: 320px;left: 20px;\n' +
                    '        background:linear-gradient(131deg,rgba(30,200,192,1) 0%,rgba(107,223,255,1) 100%);border-radius:26px;\n' +
                    '        font-size:20px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(255,255,255,1);line-height:50px;text-align: center;cursor:pointer" onclick="majorUser(\''+data[i].id+'\',\''+data[i].MajorName+'\')">用户编辑</div>\n' +
                    '\n' +
                    '        <div style="position: absolute;;width: 110px;height: 50px;top: 320px;left: 150px;\n' +
                    '        background:linear-gradient(218deg,rgba(255,160,141,1) 0%,rgba(255,130,155,1) 100%);border-radius:26px;\n' +
                    '        font-size:20px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(255,255,255,1);line-height:50px;text-align: center;cursor:pointer" onclick="shanchu(\''+data[i].id+'\')">删除</div>\n' +
                    '\n' +
                    '    </div>';
            }
            $("#contentDiv").html(html);
        }
    })
}

//添加科目展示
function addmajor(){
    $("#addmajor").show();
    $("#contentDiv").hide();
    $("#choosemajor").hide();
}

function fanhui(){
    $("#addmajor").hide();
    $("#contentDiv").show();
    $("#choosemajor").show();
}

function baocun(){
    var name=$("#name").val();
    $.ajax({
        type : "POST",
        url : dapartmenturl+"DepartmentController/CreateMajor.action",
        data : {"MajorName":name,"College_Id":College_Id},
        success : function(data) {
            if(data==true){
                layer.alert("添加成功");
                location.reload();
            }
        }
    })
}

//删除科目
function shanchu(id) {
    layer.confirm('您确定要删除此学院？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        $.ajax({
            type : "POST",
            url : dapartmenturl+"DepartmentController/DeleteMajor.action",
            data : {"id":id},
            success : function(data) {
                if(data==true){
                    location.reload();
                }
            }
        })


    });
}

//编辑科目
function bianji(id){
    majorId=id;
$("#createmajor").show();
    $("#contentDiv").hide();
    $("#choosemajor").hide();
    $.ajax({
        type : "POST",
        url : dapartmenturl+"DepartmentController/GetMajorByid.action",
        data : {"id":id},
        success : function(data) {
            console.log(data);
            if(data!=null){
                $("#name2").val(data[0].MajorName);
            }
        }
    })
}

//编辑返回
function fanhui(){
    $("#createmajor").hide();
    $("#contentDiv").show();
    $("#choosemajor").show();
}

//编辑保存
function baocun2(){
    var name=$("#name2").val();
    $.ajax({
        type : "POST",
        url : dapartmenturl+"DepartmentController/UpdateMajor.action",
        data : {"id":majorId,"MajorName":name},
        success : function(data) {
            if(data==true){
                location.reload();
            }
        }
    })

}