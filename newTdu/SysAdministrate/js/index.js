$(function() {
    getName();
    initshow();
});

function getName() {
    //对用户名进行获取，要是session中无值，返回登录页面
    $.ajax({
        url : houtaiurl + "ShouyeController/sUserName.action",
        type : "POST",
        async : true,
        success : function(data) {
            if (data == "err"||data=="") {
                window.location.assign("../login.html");
                return;
            } else {
                //头部信息显示设置
                // $("#personName").text(data);
                // $("#dingwei").html(firstIndex);
                $("#houtaiName").text(data);
                //首次进入首页展示页面显示


                xianzhi = 1;

                setTimeout(function() {
                    if (xianzhi === 1) {
                        getName();
                        xianzhi = 0;
                    }
                }, 780000);
            }
        },
        error : function() {
            window.location.assign("../login.html");
            return;
        }
    });
}

//退出登录，注销功能
function tuichu(){
    $.ajax({
        type : "POST",
        url : houtaiurl+"UsersController/zhuxiao.action",
        success : function(data) {
            if (data == true) {
                getName();
            }
        }
    })
}
//初始化科目下拉框
function initshow(){
    //首页初始化

    $.ajax({
        type : "POST",
        url : houtaiurl+"ShouyeController/getSubjects.action",
        success : function(data) {
            //科目树数据
            var submap=data[0];
            //键值获取
            var summap = Object.keys(data[0]);
           var html="";
           if(summap!=null){
               html+='<a  style=\"color:white;font-size:18px;\" class="choosesub" id="'+submap[summap[0]][0].id+'">'+submap[summap[0]][0].subjectName+'</a><dl class=\"layui-nav-child\" style=\"text-align: center\" >';
           }
           //初始化左边树
            initleft(submap[summap[0]][0].id);
           for(var i=0;i<summap.length;i++){
                html+=' <dd ><a >'+summap[i].split(',')[0]+'</a><ul>';

                for(var j=0;j<submap[summap[i]].length;j++){
                    html+=' <dd> <a onclick="choosesub(\''+submap[summap[i]][j].id+'\',\''+submap[summap[i]][j].subjectName+'\')" id="'+submap[summap[i]][j].id+'">'+submap[summap[i]][j].subjectName+'</a>';
                }
               html+=' </ul></dd>';
           }

            $("#submap").html(html);
        }
    })
}

//首页跳转
function shouye(){
    window.location.href="index.html";
}

//左边树初始化
function initleft(subid){
    $.ajax({
        type : "POST",
        url : houtaiurl+"UsersController/GetSysAdministrateTree_develop.action",
        async: false,
        success : function(data) {
            console.log(data);
             var html='';
             for(var i=0;i<data.length;i++){

                 if(data[i].children!=null){
                     if(i!=0){
                         html+=' </dl></li>';
                     }

                            html += '<li  class="layui-nav-item">\n' +
                                '            <a href="javascript:;" lay-tips="主页" lay-direction="2">\n' +
                                '              <i class="layui-icon ' +
                                '' + data[i].icon + '' +
                                '"></i>\n' +
                                '              <cite>' + data[i].pageName + '</cite>\n' +
                                '            </a>' +
                                ' <dl class="layui-nav-child">';
                 }else{

                     html+='<dd class data-name="console" onclick="showmain(\''+data[i].link+'\')">\n' +
                         '                <a lay-href="'+data[i].link+'">'+data[i].pageName+'</a>\n' +
                         '              </dd>';
                 }


             }
            // html+=' <li data-name="home" class="layui-nav-item">\n' +
            //     '            <a href="javascript:;" lay-tips="主页" lay-direction="2">\n' +
            //     '              <i class="layui-icon layui-icon-home"></i>\n' +
            //     '              <cite>个人信息</cite>\n' +
            //     '            </a>\n' +
            //     '            <dl class="layui-nav-child">\n' +
            //     '              <dd data-name="console" class="layui-this">\n' +
            //     '                <a lay-href="console.html">控制台</a>\n' +
            //     '              </dd>\n' +
            //     '              <dd data-name="console">\n' +
            //     '                <a lay-href="set/user/info.html">信息修改</a>\n' +
            //     '              </dd>\n' +
            //     '              <dd data-name="console">\n' +
            //     '                <a lay-href="set/user/password.html">密码修改</a>\n' +
            //     '              </dd>\n' +
            //     '            </dl>\n' +
            //     '          </li>\n' +
            //     '          <li data-name="component" class="layui-nav-item">\n' +
            //     '            <a href="javascript:;" lay-tips="组件" lay-direction="2">\n' +
            //     '              <i class="layui-icon layui-icon-component"></i>\n' +
            //     '              <cite>组件</cite>\n' +
            //     '            </a>\n' +
            //     '            <dl class="layui-nav-child">\n' +
            //     '              <!--<dd data-name="grid">\n' +
            //     '                <a href="javascript:;">栅格</a>\n' +
            //     '              </dd>\n' +
            //     '              <dd data-name="button">\n' +
            //     '                <a lay-href="component/button/index.html">按钮</a>\n' +
            //     '              </dd>\n' +
            //     '              <dd data-name="form">\n' +
            //     '                <a href="javascript:;">表单</a>\n' +
            //     '                <dl class="layui-nav-child">\n' +
            //     '                  <dd><a lay-href="component/form/element.html">表单元素</a></dd>\n' +
            //     '                  <dd><a lay-href="component/form/group.html">表单组合</a></dd>\n' +
            //     '                </dl>\n' +
            //     '              </dd>-->\n' +
            //     '\n' +
            //     '              <dd data-name="progress">\n' +
            //     '                <a lay-href="department/index.html">学院</a>\n' +
            //     '              </dd>\n' +
            //     '              <dd data-name="panel">\n' +
            //     '                <a lay-href="major/index.html">专业</a>\n' +
            //     '              </dd>\n' +
            //     '              <dd data-name="badge">\n' +
            //     '                <a lay-href="class/index.html">班级</a>\n' +
            //     '              </dd>\n' +
            //     '              <dd data-name="timeline">\n' +
            //     '                <a lay-href="subject/index.html">科目</a>\n' +
            //     '              </dd>\n' +
            //     '              <dd data-name="anim">\n' +
            //     '                <a lay-href="user/accountList.html">账号</a>\n' +
            //     '              </dd>\n' +
            //     '              <dd data-name="auxiliar">\n' +
            //     '                <a lay-href="inforMessage/index.html">信息发布</a>\n' +
            //     '              </dd>\n' +
            //     '            </dl>\n' +
            //     '          </li>\n' +
            //     '          <li data-name="template" class="layui-nav-item">\n' +
            //     '            <a href="javascript:;" lay-tips="页面" lay-direction="2">\n' +
            //     '              <i class="layui-icon layui-icon-template"></i>\n' +
            //     '              <cite>页面</cite>\n' +
            //     '            </a>\n' +
            //     '            <dl class="layui-nav-child">\n' +
            //     '              <dd><a lay-href="auth/administrate.html">权限</a></dd>\n' +
            //     '              <dd><a lay-href="user/userRolesList.html">角色分配</a></dd>\n' +
            //     '              <!--<dd><a lay-href="template/goodslist.html">商品列表</a></dd>\n' +
            //     '              <dd><a lay-href="template/msgboard.html">留言板</a></dd>\n' +
            //     '              <dd><a lay-href="template/search.html">搜索结果</a></dd>\n' +
            //     '              <dd><a href="user/reg.html" target="_blank">注册</a></dd>\n' +
            //     '              <dd><a href="user/login.html" target="_blank">登入</a></dd>\n' +
            //     '              <dd><a href="user/forget.html" target="_blank">忘记密码</a></dd>\n' +
            //     '              <dd><a lay-href="template/tips/404.html">404页面不存在</a></dd>\n' +
            //     '              <dd><a lay-href="template/tips/error.html">错误提示</a></dd>-->\n' +
            //     '            </dl>\n' +
            //     '          </li>\n' +
            //     '          <li data-name="app" class="layui-nav-item">\n' +
            //     '            <a href="javascript:;" lay-tips="应用" lay-direction="2">\n' +
            //     '              <i class="layui-icon layui-icon-app"></i>\n' +
            //     '              <cite>应用</cite>\n' +
            //     '            </a>\n' +
            //     '            <dl class="layui-nav-child">\n' +
            //     '\n' +
            //     '              <dd><a lay-href="template/search.html">题库管理</a></dd>\n' +
            //     '              <dd><a href="user/reg.html" target="_blank">组卷管理</a></dd>\n' +
            //     '              <dd><a href="user/login.html" target="_blank">考试成绩</a></dd>\n' +
            //     '              <dd><a href="user/forget.html" target="_blank">学生成长曲线</a></dd>\n' +
            //     '              <dd><a lay-href="template/tips/404.html">考试管理</a></dd>\n' +
            //     '              <dd><a lay-href="template/tips/error.html">考试成绩2</a></dd>\n' +
            //     '\n' +
            //     '              <!--<dd>\n' +
            //     '                <a lay-href="app/message/index.html">消息中心</a>\n' +
            //     '              </dd>\n' +
            //     '              <dd data-name="workorder">\n' +
            //     '                <a lay-href="app/workorder/list.html">工单系统</a>\n' +
            //     '              </dd>-->\n' +
            //     '            </dl>\n' +
            //     '          </li>\n' +
            //     '          <li data-name="senior" class="layui-nav-item">\n' +
            //     '            <a href="javascript:;" lay-tips="高级" lay-direction="2">\n' +
            //     '              <i class="layui-icon layui-icon-senior"></i>\n' +
            //     '              <cite>高级</cite>\n' +
            //     '            </a>\n' +
            //     '            <dl class="layui-nav-child">\n' +
            //     '              <!--<dd>\n' +
            //     '                <a layadmin-event="im">LayIM 通讯系统</a>\n' +
            //     '              </dd>-->\n' +
            //     '              <dd data-name="echarts">\n' +
            //     '                <a href="javascript:;">Echarts集成</a>\n' +
            //     '                <dl class="layui-nav-child">\n' +
            //     '                  <dd><a lay-href="senior/echarts/line.html">折线图</a></dd>\n' +
            //     '                  <dd><a lay-href="senior/echarts/bar.html">柱状图</a></dd>\n' +
            //     '                  <dd><a lay-href="senior/echarts/map.html">地图</a></dd>\n' +
            //     '                </dl>\n' +
            //     '              </dd>\n' +
            //     '            </dl>\n' +
            //     '          </li>\n' +
            //     '          <li data-name="user" class="layui-nav-item">\n' +
            //     '            <a href="javascript:;" lay-tips="用户" lay-direction="2">\n' +
            //     '              <i class="layui-icon layui-icon-user"></i>\n' +
            //     '              <cite>用户</cite>\n' +
            //     '            </a>\n' +
            //     '            <dl class="layui-nav-child">\n' +
            //     '              <dd>\n' +
            //     '                <a lay-href="user/user/list.html">科目树管理</a>\n' +
            //     '              </dd>\n' +
            //     '              <dd>\n' +
            //     '                <a lay-href="user/administrators/list.html">资源树管理</a>\n' +
            //     '              </dd>\n' +
            //     '              <dd>\n' +
            //     '                <a lay-href="user/administrators/role.html">导航栏管理</a>\n' +
            //     '              </dd>\n' +
            //     '            </dl>\n' +
            //     '          </li>\n' +
            //     '          <li data-name="set" class="layui-nav-item">\n' +
            //     '            <a href="javascript:;" lay-tips="设置" lay-direction="2">\n' +
            //     '              <i class="layui-icon layui-icon-set"></i>\n' +
            //     '              <cite>设置</cite>\n' +
            //     '            </a>\n' +
            //     '            <dl class="layui-nav-child">\n' +
            //     '              <dd><a href="user/login.html" target="_blank">模型库管理</a></dd>\n' +
            //     '              <dd><a href="user/forget.html" target="_blank">场景库管理</a></dd>\n' +
            //     '\n' +
            //     '            </dl>\n' +
            //     '          </li>';
             $("#LAY-system-side-menu").html(html);
        }
    })
}

//主页显示
function showmain(link){
    // console.log(link);
}

//获取主页显示内容，（首级获取）
function getdivmodel(subid){
    var majorid=$(".choosesub")[0].id;
    $.ajax({
        type : "POST",
        url : preurl+"DevelopModelController/getModelsSecondAll.action",
        data : {
            "KnowledgesFisId" : subid,
            "subjectId":majorid
        },
        success : function(data) {
            var html='';
            html+=' <div onclick="addModelFolder()" style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                '        <div  style="width: 100px;height: 100px; position:absolute; position:absolute;top: 50%;left:50%;margin-top: -50px;margin-left: -50px; ">\n' +
                '            <img src="img/icon_more.png" height="100" width="100"/>\n' +
                '        </div>\n' +
                '        </div>';
            for(var i=0;i<data.length;i++){
                if(data[i].modelContentId=="00000000-0000-0000-0000-000000000000"){
                    html+=' <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 57px;left: 97px;width: 87px;height: 87px;"><img src="img/icon_1.png" style="width: 100%;height: 100%;"/></div>\n' +
                        '            <div style="position: absolute;top: 180px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">'+data[i].content+'</div>\n' +
                        '            <div style="position: absolute;top: 230px;width: 100%;text-align: center;height:28px;\n' +
                        'font-size:17px;\n' +
                        'font-family:PingFangSC-Medium,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(138,144,159,1);\n' +
                        'line-height:28px;">'+data[i].name+'</div>\n' +
                        '            <div style="position: absolute;;width: 190px;height: 50px;top: 308px;left: 45px;\n' +
                        '            background:linear-gradient(337deg,rgba(92,205,177,1) 0%,rgba(92,205,178,1) 0%,rgba(89,208,207,1) 100%);border-radius:26px;\n' +
                        'font-size:20px;\n' +
                        'font-family:PingFangSC-Regular,PingFang SC;\n' +
                        'font-weight:400;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:50px;text-align: center; cursor:pointer " onclick="modelsecondshow(\''+data[i].id+'\',\''+data[i].userKey+'\',\''+data[i].name+'\')">进入</div>\n' +
                        '\n' +
                        '\n' +
                        '        </div>';
                }else{
                    var  str ="tduvr://command=open&App=TDuEditor&Scene="+data[i].userKey+"/"+data[i].modelContentId+"/"+data[i].name+"&UserID="+data[i].userKey+"&SceneOrModelID="+data[i].id+"&OpMode=TDuPractice&";
                    html+='        <div style="background:rgba(30,37,54,1);width:280px;height:400px;margin-top: 40px;margin-left: 40px;display: inline-block;position: relative">\n' +
                        '            <div style="position: absolute;top: 90px;left: 85px;;width: 99px;height: 99px"><img src="img/icon_3.png" style="height: 100%;width: 100%"/></div>\n' +
                        '            <div style="position: absolute;top: 220px;width: 100%;text-align: center;height:40px;\n' +
                        'font-size:22px;\n' +
                        'font-family:PingFangSC-Semibold,PingFang SC;\n' +
                        'font-weight:500;\n' +
                        'color:rgba(255,255,255,1);\n' +
                        'line-height:40px;">'+data[i].content+'</div>\n' +
                        '            <div style="position: absolute;bottom: 38px;width: 100%;height: 38px">\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\''+str+'\'"><img src="img/ico/icon_vr.png" height="38" width="38"/></div>\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\''+str+'\'"><img src="img/ico/icon_ffehg.png" height="38" width="38"/></div>\n' +
                        '                <div style="width: 32%;display: inline-block;text-align: center;cursor:pointer" onclick="window.location.href=\''+str+'\'"><img src="img/ico/icon_fess.png" height="38" width="38"/></div>\n' +
                        '            </div>\n' +
                        '        </div>';
                }



            }
            $("#contentDiv").html(html);
        }
    })
}


//选择科目切换
/*function choosesub(id,name){
    console.log(id,name);
    $('.choosesub').attr('id',id);
    $(".choosesub").text(name);
    initleft(id);
}*/


//后台跳转
function houtai(){
    window.location.href="SysAdministrate/index.html";
}