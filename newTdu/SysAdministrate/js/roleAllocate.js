/**
 * Created by TDU on 2019/12/17.
 */

function getRoles() {
    $.ajax({
        url: houtaiurl + 'UsersController/seleRoles.action',
        type: 'POST',
        async: false,
        success: function (data) {
            console.log(data)
            var html = "";
            for (var j = 0; j < data.length; j++) {
                html+='<option value="'+data[j].id+'">'+data[j].roleName+'</option>'
            }
            $("#role").html(html)
        }
    });
}