<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="css/base.css" />
	<link rel="stylesheet" type="text/css" href="js/themes/default/easyui.css"/>
	<link rel="stylesheet" type="text/css" href="js/themes/icon.css"/>
	<link rel="stylesheet" type="text/css" href="js/ztree/css/zTreeStyle/zTreeStyle.css"/>
	
<script type="text/javascript" src="../Scripts/jquery-1.10.2.js"></script>
<script type="text/javascript" src="js/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/custom/examAdd.js"></script>
<script type="text/javascript" src="highcharts.js"></script>
<script type="text/javascript" src="index.js"></script>
<script type="text/javascript" src="../../../Scripts/ztree/js/jquery.ztree.all.min.js" ></script>
<style type="text/css">
			*{outline:none;}
			.ztree{padding:0;}
.ztree * {font-size: 10pt;font-family:"Microsoft Yahei",Verdana,Simsun,"Segoe UI Web Light","Segoe UI Light","Segoe UI Web Regular","Segoe UI","Segoe UI Symbol","Helvetica Neue",Arial}
.ztree li ul{ margin-left:0px; padding-top:0px}
.ztree li {line-height:30px;}
.ztree li a {width:100%;height:30px;text-align:center;padding-top: 0px;background:#4d637b;border-radius:0px;color:white;}
.ztree li a:hover {text-decoration:none; background-color: #489ffd;box-shadow: 0 0 50px rgba(255,255,255,1) inset;
		transform: scale(1.02);/*translate(-5px,-2px);*/
       -webkit-transform:scale(1.02); /*translate(-5px,-2px);*/
	   color:black;
	   }

.ztree li a span.button.switch {visibility:hidden}
.ztree.showIcon li a span.button.switch {visibility:visible}
.ztree li a.curSelectedNode {background-color:#489ffd;border:0;height:30px;/*-webkit-box-shadow: 0px 9px 0px rgba(23, 128, 158,1), 0px 9px 25px rgba(0,0,0,.7);*/}
.ztree li span {line-height:30px;font-weight: bold;    font-size: 1.3em;}
.ztree li span.button {margin-top: 20px;}
.ztree li span.button.switch {width: 16px;height: 16px;margin-top: -7px;}

.ztree li a.level0 span {font-size: 120%;font-weight: bold;}
.ztree li span.button {background-image:url(img/left_menuForOutLook.png); *background-image:url(img/left_menuForOutLook.gif)}
.ztree li span.button.switch.level0 {width: 0px; height:20px}
.ztree li span.button.switch.level1 {width: 0px; height:20px}
.ztree li span.button.noline_open {background-position: 0 0;}
.ztree li span.button.noline_close {background-position: -18px 0;}
.ztree li span.button.noline_open.level0 {background-position: 0 -18px;}
.ztree li span.button.noline_close.level0 {background-position: -18px -18px;}
		</style>
<body id="ContentBody">
<div class="pagerightbottom1" id="contentDiv">
<div id="zhaozi" style="display:none;position:absolute;z-index:99;background:rgba(0,0,0,0.3);width:100%;height:100%;top:0;left:0;">
</div>
<div id="left_div" style="width:20%;height:100%;float:left;border-right:1px solid #000000;">
	<div id="subject_id" style="width:80%;margin:0 auto;margin-top:20px;">
		<span style="width:20%;min-width:50px;height: 25px;display:block;line-height:25px;font-size:18px;text-align: left;float:left;">科目</span>
		<select id="subject" style="width:60%;height:25px;" onchange="subjecttrees()"></select>
	</div>
	<div id="knowledge" style="width:80%;margin-left:10%;overflow-y:auto;height:70%;border:1px solid #000000;margin-top:20px;float:left;">
		<div id="biaoti_1" style="width:100%;height:32px;line-height:32px;;border-bottom: 1px solid #F4F6FC;background-color:#F4F6FC;text-align: center;font-size:20px;">知识点</div>
		<div id="knowledge_tree" style="width:100%;verflow-y:auto;overflow-x:hidden;">
			<ul id="treeDemo" class="ztree"></ul>
		</div>
	</div>
	<div style="width:80%;height:25px;margin:0 10%;margin-top:20px;">
		<input type="button" class="customsubmitbutton" style="width:100%;height:50px;font-size:100%;margin-top:20px;" value="新增知识点章节" onclick="addniu()">
	</div>
</div>

<div id="right_div" style="width:76%;height:100%;float:left;overflow-y:auto;margin-left:1%;">
	<div><input type="button" class="customsubmitbutton" style="width:200px;min-height:50px;height:10%;font-size:18px;margin-top:10px;" value="组成试卷" onclick="zujuan()">
	<input type="button" class="customsubmitbutton" style="width:200px;min-height:50px;height:10%;font-size:18px;margin-top:10px;" value="批量上传" onclick="excel()">
	<input type="button" class="customsubmitbutton" style="width:200px;min-height:50px;height:10%;font-size:18px;margin-top:10px;" value="批量上传模板下载" onclick="download()"></div>
	<div id="xianshidiv">
	<div class="ClosePannel" style="width:100%;height:32px;background:#D1E0EF;">
		<div id="wenjianming"></div>
		<a id="CloseCommon" onclick="tuichu()">x</a>
	</div>
	<div id="xianshiwenjian" style="width:100%;background:#DFDFDF;overflow:auto;"></div>
</div>
	<div id="addClass" style="width:100%;height:700px;margin-top:-2000px;">
		<div title="单选题" id="leixing1" style="overflow:auto;padding:10px;text-align: center;">
		<table id="xz"  style="width:100%;height:540px">
			<thead>
				<tr>
					<th data-options=" field:'type', width:'10%' ">类型</th>
					<th data-options=" field:'content',width:'45%',formatter:showsxml">题干</th>
					<th data-options=" field:'time',width:'20%'">添加时间</th>
					<th data-options=" field:'id',width:'25%',formatter:caozuo">操作</th>
				</tr>
			</thead>
		</table>
		</div>

		<div title="填空题" id="leixing2" style="overflow:auto;padding:10px;text-align: center;">				
		<table id="tk" style="width:100%;height:540px">
			<thead>
				<tr>
					<th data-options=" field:'type', width:'10%' ">类型</th>
					<th data-options=" field:'content',width:'45%',formatter:showsxml">题干</th>
					<th data-options=" field:'time',width:'20%'">添加时间</th>
					<th data-options=" field:'id',width:'25%',formatter:caozuo">操作</th>
				</tr>
			</thead>
		</table>					
		</div>				

		<div title="判断题" id="leixing3" style="overflow:auto;padding:10px;text-align: center;">				
		<table id="pd" style="width:100%;height:540px">
			<thead>
				<tr>
					<th data-options=" field:'type', width:'10%' ">类型</th>
					<th data-options=" field:'content',width:'45%',formatter:showsxml">题干</th>
					<th data-options=" field:'time',width:'20%'">添加时间</th>
					<th data-options=" field:'id',width:'25%',formatter:caozuo">操作</th>
				</tr>
			</thead>
		</table>				
		</div>	
		
		<div title="多选题" id="leixing4" style="overflow:auto;padding:10px;text-align: center;">			
		<table id="dx" style="width:100%;height:540px">
			<thead>
				<tr>
					<th data-options=" field:'type', width:'10%' ">类型</th>
					<th data-options=" field:'content',width:'45%',formatter:showsxml">题干</th>
					<th data-options=" field:'time',width:'20%'">添加时间</th>
					<th data-options=" field:'id',width:'25%',formatter:caozuo">操作</th>
				</tr>
			</thead>
		</table>
		</div>
					
	</div>
</div>
	  
<!--工具栏-->
<div hidden>
	<div id="singleChoiceTool" style="height: 32px;width: 100%;background-color: #F4F4F4;" >
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add'" style="float: left;border: 1px solid black;margin-left: 2px;margin-top: 2px;" onclick="chuxian1()">增加单选题</a>
	</div>
	 
	<div id="FillBlankTool" style="height: 32px;width: 100%;border-bottom: 1px solid;background-color: #F4F4F4;">
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add'" style="float: left;border: 1px solid black;margin-left: 2px;margin-top: 2px;" onclick="chuxian2()">增加填空题</a>
	</div>
	 
	<div id="JungleTool" style="height: 32px;width: 100%;border-bottom: 1px solid;background-color: #F4F4F4;">
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add'" style="float: left;border: 1px solid black;margin-left: 2px;margin-top: 2px;" onclick="chuxian3()">增加判断题</a>
	</div>
	<div id="MulChoiceTool" style="height: 32px;width: 100%;border-bottom: 1px solid;background-color: #F4F4F4;">
		<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add'" style="float: left;border: 1px solid black;margin-left: 2px;margin-top: 2px;" onclick="chuxian5()">增加多选题</a>
	</div>
</div>
   </div>
</body>