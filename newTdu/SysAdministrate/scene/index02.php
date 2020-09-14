<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title></title>
    <link rel="stylesheet" type="text/css" href="../Scripts/Plugins/jquery-easyui-1.4.1/themes/default/easyui.css" />
    <link rel="stylesheet" type="text/css" href="../Scripts/Plugins/jquery-easyui-1.4.1/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../Scripts/Plugins/jquery-easyui-1.4.1/themes/color.css" />
    <link rel="stylesheet" type="text/css" href="../Scripts/Plugins/jquery-easyui-1.4.1/demo.css" />
    <link rel="stylesheet" type="text/css" href="zTree/css/zTreeStyle/zTreeStyle.css" />
    
    <script type="text/javascript" src="../Scripts/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="../Scripts/PublicPoolName.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ztree.core-3.5.js"></script>
    <script type="text/javascript" src="../Scripts/jquery.ztree.exedit-3.5.js"></script>
    <script type="text/javascript" src="ModelTree_2.js"></script>
    <script type="text/javascript" src="../Scripts/Plugins/jquery-easyui-1.4.1/MyJS-Extend.js"></script>
    <script type="text/javascript" src="../Scripts/Plugins/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../Scripts/Plugins/jquery-easyui-1.4.1/easyui-lang-zh_CN.js"></script>
  <!--    <script type="text/javascript">
        $(function(){
            GetExamList();
        });
        function GetExamList(){
            $.ajax({
                type:"POST",
                url:"../../../ModelController/getFirstModel.action",
                success:function(res){
                   $("#easyui-tree").html("");
                    for(var i=0;i<res.length;i++){
                        $("#easyui-tree").append('<li style="list-style: none"><a style="display: block;width:100%;height:30px;line-height:30px;" href="javascript:;" onclick="opentab(\''+res[i].id+'\',\''+res[i].name+'\')">'+res[i].name+'</a></li>');
                    }
                }
            });
        }

    </script>-->
</head>
<body class="easyui-layout">

    <div data-options="region:'west',split:true,title:'分类'" style="width:160px;padding:10px 5px;">
        <ul id="treeDemo" class="ztree" >
			
        </ul>
        <ul>
        <button id="addFirModelTree" onclick="addFirModelTree()" type="button">新增目录</button>
        </ul>
    </div>
    <div data-options="region:'center'" style="overflow-x:hidden;" id="layout-center">
        <div id="tt" class="easyui-tabs" style="width:100%;height:auto"></div>
    </div>
   
</body>
</html>