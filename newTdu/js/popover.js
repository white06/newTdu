//请求前缀
var Preurl="../tdu-base/";

$(function() {
	
	$("[data-toggle='popover']").popover({  
		        html : true,    
		        title: title(),    
		        delay:{show:500, hide:1000},  
		        content: function() {  
		          return content();    
		        }   
		    }).on( 'mouseenter', function(){  
		    var _this = this;  
		    $(this).popover( 'show' );  
		    $(this).siblings( '.popover' ).on( 'mouseleave' , function () {  
		        $(_this).popover( 'hide' );  
		    });  
		}).on( 'mouseleave', function(){  
		    var _this = this;  
		    setTimeout(function () {  
		        if (!$( '.popover:hover' ).length) {  
		            $(_this).popover( 'hide' )  
		        }
		    }, 100);  
		});
	
})



function title() {  
    return '个人信息';  
} 
	function content() {
	var  className;
	var  collegeName;
	var  majorName;
	$.ajax({
	        url:Preurl+"UsersController/getInformation.action",
	        data: {},
	        type: "post",
	        async: false,
	        success: function (data) {
	        className =data.className;
	        collegeName =data.collegeName;
	        majorName =data.majorName;
	        }
	    })
	  
    var data = $("<form><ul><li><span aria-hidden='true' class='icon_globe'></span>&nbsp;<font>学院:</font>"+collegeName+"</li>" +  
             "<li><span aria-hidden='true' class='icon_piechart'></span>&nbsp;<font>专业:</font>"+majorName+"</li>" +  
             //"<li><span aria-hidden='true' class='icon_search_alt'></span>&nbsp;<font>科目:</font>645</li>" +  
             "<li><span aria-hidden='true' class='icon_pens_alt'></span>&nbsp;<font>班级:</font>"+className+"</li>" +  
             "<input id='btn' type='button' value='关注' οnclick='test()'/></form>");  
      
    return data;  
}
