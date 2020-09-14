$(function() {
    getlink();
});

function getlink(){
    $.ajax({
        type : "POST",
        url : houtaiurl+"LinkController/getlink.action",
        success : function(data) {
            console.log(data);
        //    showinfo(data);
        }
    })

// }
//
// function showinfo(data){
//     var html="";
//     for(var i=0;i<data.length;i++){
//         html+="<tr id='"+data[i].id+"'>"
//            +"     <td><img src=\"img/文档.png\" style=\"vertical-align: middle\"/>\n" +
//             "                        <span style=\"vertical-align: middle\">"++"</span></td>\n" +
//             "                    <td>2020-06-19 11:35</td>\n" +
//             "                    <td>2020-06-19 11:35</td>\n" +
//             "                    <td>101次</td>\n" +
//             "                    <td>https://pan.baidu.com/s/1qgdIBoCFntxpW7gFUnt_Qg </td>\n" +
//             "                    <td>lw1s</td>\n" +
//             "                    <td><img  onclick=\"delLink()\"  src=\"img/删 除.png\"/></td>\n" +
//             "                </tr>"
//     }
}