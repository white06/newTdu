$(function() {
    getUserRole();
    getdapartment();
});

var role;

function getUserRole() {
    $.ajax({
        type : "POST",
        url : dapartmenturl+"UsersController/getroleIdByUserId.action",
        async: false,
        success : function(data) {
            console.log(data);
            role=data;
        }
    })
}


var departmentid;
//获取学院信息
function getdapartment(){
    $.ajax({
        type : "POST",
        url : dapartmenturl+"DepartmentController/GetDepartmentList.action",
        success : function(data) {
            var html='    <div onclick="addDepartment()" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 30px;margin-left: 30px;display: inline-block;position: relative ;cursor:pointer">\n' +
                '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                '            <img src="../../img/icon_more.png" height="100" width="100"/>\n' +
                '        </div>\n' +
                '\n' +
                '        <div style="position: absolute;bottom:90px;width: 100%;text-align: center;height:40px;font-size:22px;\n' +
                '        font-family:PingFangSC-Semibold,PingFang SC;font-weight:500;color:rgba(255,255,255,1);line-height:40px;">新建学院</div>\n' +
                '\n' +
                '    </div>';
            if(role!="9c8c0815-3968-45d0-9fae-0d42885973fc"){
                html="";
            }
            for(var i=0;i<data.length;i++){
                html+=' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 30px;margin-left: 30px;display: inline-block;position: relative">\n' +
                    '        <div style="position: absolute;top: 50px;left: 90px;width: 99px;height: 99px;"><img src="../../img/icon_1.png" style="width: 100%;height: 100%;"/></div>\n' +
                    '\n' +
                    '        <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;font-size:22px;\n' +
                    '        font-family:PingFangSC-Semibold,PingFang SC;font-weight:500;color:rgba(255,255,255,1);line-height:40px;">'+data[i].name+'</div>\n' +
                    '\n' +
                    '\n' +
                    '        <div style="position: absolute;;width: 240px;height: 50px;top: 250px;left: 20px;\n' +
                    '        background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                    '        font-size:20px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(255,255,255,1);line-height:50px;text-align: center;cursor:pointer" onclick="bianji(\''+data[i].id+'\')">学院编辑</div>\n' +
                    '\n' +
                    '\n' +
                    '        <div style="position: absolute;;width: 110px;height: 50px;top: 320px;left: 20px;\n' +
                    '        background:linear-gradient(131deg,rgba(30,200,192,1) 0%,rgba(107,223,255,1) 100%);border-radius:26px;\n' +
                    '        font-size:20px;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:rgba(255,255,255,1);line-height:50px;text-align: center;cursor:pointer" onclick="bianjiUser(\''+data[i].id+'\',\''+data[i].name+'\')">用户编辑</div>\n' +
                    '\n' +
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
//添加学院跳转
function addDepartment(){
    $("#contentDiv").hide();
    $("#adddepartment").show();
}

//保存功能(新增学院）
function baocun(){
    var name = $("#name").val();
    var address = $("#address").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    var jianjie = $("#jianjie").val();
    $.ajax({
        type : "POST",
        url : dapartmenturl+"DepartmentController/Createdepartment.action",
        data : {"Name":name,"Address":address,"Phone":phone,"Email":email,"Briefintroduction":jianjie},
        success : function(data) {
            if(data==true){
                layer.alert("添加成功");
                $("#contentDiv").show();
                $("#adddepartment").hide();
            }
        }
    })
}

//保存功能(新增学院）
function baocun2(){
    var name = $("#name2").val();
    var address = $("#address2").val();
    var phone = $("#phone2").val();
    var email = $("#email2").val();
    var jianjie = $("#jianjie2").val();
    $.ajax({
        type : "POST",
        url : dapartmenturl+"DepartmentController/Updatedepartment.action",
        data : {"Id":departmentid,"Name":name,"Address":address,"Phone":phone,"Email":email,"Briefintroduction":jianjie},
        success : function(data) {
            if(data==true){
                layer.alert("修改成功");
                $("#contentDiv").show();
                $("#createdepartment").hide();
            }
        }
    })
}

//新增页面返回功能
function fanhui(){
    $("#contentDiv").show();
    $("#adddepartment").hide();
}

//修改页面返回功能
function fanhui2(){
    $("#contentDiv").show();
    $("#createdepartment").hide();
}

//学院删除功能
function shanchu(id){
    layer.confirm('您确定要删除此学院？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        $.ajax({
            type : "POST",
            url : dapartmenturl+"DepartmentController/DeleteDepartment.action",
            data : {"id":id},
            success : function(data) {
                if(data==true){
                    location.reload();
                }
            }
        })


    });
}

function bianji(id){
    departmentid=id;
    $.ajax({
        type : "POST",
        url : dapartmenturl+"DepartmentController/GetDepartmentListByid.action",
        data : {"id":id},
        success : function(data) {
           console.log(data);
            $("#contentDiv").hide();
            $("#createdepartment").show();
            if(data!=null){
                $("#name2").val(data[0].name);
                 $("#address2").val(data[0].address);
               $("#phone2").val(data[0].phone);
                 $("#email2").val(data[0].email);
                 $("#jianjie2").val(data[0].briefintroduction);
            }
        }
    })
}