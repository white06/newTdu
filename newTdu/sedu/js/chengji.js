var data1;
function tijiao(lilun,caozuo,zhunque,sizheng,chuangxin){
    var inlilun=$(window.parent.document).find("#lilun").val();
   var lilunsc=parseInt(lilun)+parseInt(inlilun);
    var incaozuo=$(window.parent.document).find("#caozuo").val();
    var caozuosc=parseInt(caozuo)+parseInt(incaozuo);
    var inzhunque=$(window.parent.document).find("#zhunque").val();
    var zhunquesc=parseInt(zhunque)+parseInt(inzhunque);
    var insizheng=$(window.parent.document).find("#sizheng").val();
    var sizhengsc=parseInt(sizheng)+parseInt(insizheng);
    var inchuangxin=$(window.parent.document).find("#chuangxin").val();
    var chuangxinsc=parseInt(chuangxin)+parseInt(inchuangxin);
    console.log(lilun,caozuo,zhunque,sizheng,chuangxin);
    console.log(inlilun,incaozuo,inzhunque,insizheng,inchuangxin);
    console.log(lilunsc,caozuosc,zhunquesc,sizhengsc,chuangxinsc);
    data1=[lilunsc,caozuosc,zhunquesc,sizhengsc,chuangxinsc];
    $(window.parent.document).find("#lilun").val(lilunsc);
    $(window.parent.document).find("#caozuo").val(caozuosc);
    $(window.parent.document).find("#zhunque").val(zhunquesc);
    $(window.parent.document).find("#sizheng").val(sizhengsc);
    $(window.parent.document).find("#chuangxin").val(chuangxinsc);
    $(window.parent.document).find("#showsc").click();
}

var userId="4d272f66-9dac-4b87-a2a1-22b6e5910779";
function tijiao1(caozuo){
 var inlilun=$(window.parent.document).find("#lilun1").text();
 var lilunsc=parseInt(caozuo)+parseInt(inlilun);
 data1=[lilunsc];
 $(window.parent.document).find("#lilun1").empty();
 $(window.parent.document).find("#lilun1").text(lilunsc);
 // $(window.parent.document).find("#caozuo").val(caozuosc);
 // $(window.parent.document).find("#zhunque").val(zhunquesc);
 // $(window.parent.document).find("#sizheng").val(sizhengsc);
 // $(window.parent.document).find("#chuangxin").val(chuangxinsc);
 //$(window.parent.document).find("#showsc").click();
}
function tijiaofenshu(){
 var inlilun=$(window.parent.document).find("#lilun1").text();
 $.ajax({
  type:"POST",
  url:"https://www.tduvr.club/tdu-base/"+"ItemController/tijiaocaozuo.action",
  data:{"caozuo":inlilun,"userId":userId},
  async:false,
  success:function(res) {


  }
 });
}

function hidetishi(){

}