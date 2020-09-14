var PoolName = "";
var PoolNameApp = "";
var ResFolder="";
$(function () {
   /* $.ajax({
        url: PoolName + "/Log/getsession",
        data: { random: Math.random() },
        type: "post",
        async: false,
        dataType: "html",
        success: function (data) {
            ResFolder = data;

        }
    });*/
  
})
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}