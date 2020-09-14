<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title></title>
    <link rel="stylesheet" type="text/css" href="../Scripts/Plugins/jquery-easyui-1.4.1/themes/default/easyui.css" />
    <link rel="stylesheet" type="text/css" href="../Scripts/Plugins/jquery-easyui-1.4.1/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="../Scripts/Plugins/jquery-easyui-1.4.1/themes/color.css" />
    <link rel="stylesheet" type="text/css" href="../Scripts/Plugins/jquery-easyui-1.4.1/demo.css" />
    <script type="text/javascript" src="../Scripts/jquery-1.10.2.js"></script>
    <script type="text/javascript" src="../Scripts/PublicPoolName.js"></script>
    <script type="text/javascript" src="../Scripts/Plugins/jquery-easyui-1.4.1/MyJS-Extend.js"></script>
    <script type="text/javascript" src="../Scripts/Plugins/jquery-easyui-1.4.1/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../Scripts/Plugins/jquery-easyui-1.4.1/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript">
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
    	
        $(function(){
            GetExamList();
        });
        function GetExamList(){
        	var a=getRequest();
        	var index_id=a['parentId'];
            $.ajax({
                type:"POST",
                url:"../../../ModelController/getSubModel.action?parentId="+index_id,
                success:function(res){
                   $("#easyui-tree").html("");
                    for(var i=0;i<res.length;i++){
                        $("#easyui-tree").append('<li style="list-style: none"><a style="display: block;width:100%;height:30px;line-height:30px;" href="javascript:;" onclick="opentab(\''+res[i].id+'\',\''+res[i].name+'\')">'+res[i].name+'</a></li>');
                    }
                }
            });
        }

    </script>
</head>
<<body class="easyui-layout">

    <div data-options="region:'west',split:true,title:'子分类'" style="width:160px;padding:10px 5px;">
        <ul id="easyui-tree">

        </ul>
    </div>
    <div data-options="region:'center'" style="overflow-x:hidden;" id="layout-center">
        <div id="tt" class="easyui-tabs" style="width:100%;height:auto"></div>
    </div>
    <script type="text/javascript">
        $(function () {
            var parentId = $(window.parent.document).find("#parentId");
        });
        
        function opentab(plugin,tabnaem) {
            var tab = $('#tt').tabs('getSelected');
            if ($('#tt').tabs('exists', tabnaem)) {
                $('#tt').tabs('select', tabnaem);
            } else {
                $("#tt").tabs("add", {
                    title: tabnaem,
                    closable: true,
                    content: '<iframe src="'+'../../SysAdministrate/Model/modelShow.php?subModelId=' + plugin + '" style="width:100%;height:800px;border:none;overflow:hidden"></iframe>'

                });
            }
        }
    </script>
</body>
</html>