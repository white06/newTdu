$(function() {
});

function tianjia(){
    $("#userShow").hide();
    $("#tianjia").show();


}

//删除用户
function shanchu(id){

    layer.confirm('您确定要删除此用户？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        $.ajax({
            type : "POST",
            url : userurl+"UsersController/deleUser.action",
            data : {"id":id},
            success : function(data) {
                    location.reload();
            }
        })


    });
}








