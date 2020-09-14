$(document).ready(function(){
    getDepertments();
});

function getDepertments() {
    $.ajax({
        url: houtaiurl + 'DepartmentController/GetAllDepartmentList.action',
        type: 'POST',
        async: false,
        success: function (data) {
            console.log(data)
            var html = "";
            for (var j = 0; j < data.length; j++) {
                html+='<option value="'+data[j].id+'">'+data[j].name+'</option>'
            }
            $("#role").html(html)
        }
    });
}
/**
 * 导出提交的点击事件
 */
function submitExport(){
	
	//按班级导出所有学生的checked
	var classes = $("[name='export-class-all']")[0].checked;
	//直接导出所有学生的checked
	var students = $("[name='export-all-student']")[0].checked;
	//导出所有学生的checked
	var teacheres = $("[name='export-all-teacher']")[0].checked;
	//导出所有管理员的checked
	var admines = $("[name='export-all-admin']")[0].checked;
	var formData = {classes:classes,students:students,teacheres:teacheres,admines:admines};
	var url = '../../../../nanjingController/exportExcelInfo.action';
	var url = "../../../../nanjingController/exportExcelInfo.action?classes="+classes+"&students="+students+"&teacheres="+teacheres+"&admines="+admines;
	$("#export-form").attr("action",url);
	$("#export-form").submit();
	/*$.post(url,formData,function(data){
		if(data!=null){
			location.reload();
		}
	});*/
}
/**
 * 导出学生的change事件
 */
function exportStudent(){
	if($("[name='export-student']")[0].checked){
		$("#export-way-1").show();
	}else{
		$("#export-way-1").hide();
	}
}
/**
 * 导出老师的change事件
 */
function exportTeacher(){
	if($("[name='export-teacher']")[0].checked){
		$("#export-way-2").show();
	}else{
		$("#export-way-2").hide();
	}
}
/**
 * 导出管理员的change事件
 */
function exportAdmin(){
	if($("[name='export-admin']")[0].checked){
		$("#export-way-3").show();
	}else{
		$("#export-way-3").hide();
	}
}

