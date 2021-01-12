

function shangyibumsf(){

 var userId="4d272f66-9dac-4b87-a2a1-22b6e5910779";
  $.ajax({
   type:"POST",
   url:"https://www.tduvr.club/tdu-base/"+"ItemController/getyuxi.action",
   data:{"userId":userId},
   async:false,
   success:function(res) {
    // var inlilun=$(window.parent.document).find("#lilun1").text();
    // console.log(res);
    // console.log($(window.parent.document).find("#lilun1"));
    var lilunsc=0+parseInt(res);
    console.log(lilunsc);
    data1=[lilunsc];
    $(window.parent.document).find("#lilun1").empty();
    $(window.parent.document).find("#lilun1").text(lilunsc);
    let iframe = parent.document.getElementById("leftWebpageStart");
    //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
    let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
    iframeDocument.querySelector("#yizuo").click();
    iframeDocument.querySelector("#loudongPreparation").click();

   }

 });
 // let iframe = parent.document.getElementById("leftWebpageStart");
 // //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 // let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 // //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 //
 // iframeDocument.querySelector("#loudongPreparation").click();

}
function tijiao2(caozuo){
 var inlilun=$(window.parent.document).find("#lilun1").text();
 var lilunsc=parseInt(inlilun)-parseInt(caozuo);
 data1=[lilunsc];
 $(window.parent.document).find("#lilun1").empty();
 $(window.parent.document).find("#lilun1").text(lilunsc);
 // $(window.parent.document).find("#caozuo").val(caozuosc);
 // $(window.parent.document).find("#zhunque").val(zhunquesc);
 // $(window.parent.document).find("#sizheng").val(sizhengsc);
 // $(window.parent.document).find("#chuangxin").val(chuangxinsc);
 //$(window.parent.document).find("#showsc").click();
}

function shangyibuyanzheng(){
 let iframe = parent.document.getElementById("leftWebpageStart");
 //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 // iframeDocument.querySelector("#yizuo2").click();
 tijiao2(15);
 iframeDocument.querySelector("#msfPreparation").click();
}

function shangyibuyanzheng1(){
 let iframe = parent.document.getElementById("leftWebpageStart");
 //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 // iframeDocument.querySelector("#yizuo5").click();
 tijiao2(10);
 iframeDocument.querySelector("#yanzhengPreparation").click();
}

function shangyibulesuo(){
 let iframe = parent.document.getElementById("leftWebpageStart");
 //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 // iframeDocument.querySelector("#yizuo5").click();
 tijiao2(20);
 iframeDocument.querySelector("#yanzhengPreparation").click();
}

function shangyibusizheng(){
 let iframe = parent.document.getElementById("leftWebpageStart");
 //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 // iframeDocument.querySelector("#yizuo7").click();
 tijiao2(10);
 iframeDocument.querySelector("#lesuoPreparation").click();
}


function shangyibuqingli(){
 let iframe = parent.document.getElementById("leftWebpageStart");
 //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 // iframeDocument.querySelector("#yizuo7").click();
 tijiao2(5);
 iframeDocument.querySelector("#bingdu").click();
}

function shangyibuhuifu(){
 let iframe = parent.document.getElementById("leftWebpageStart");
 //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 // iframeDocument.querySelector("#yizuo7").click();
 tijiao2(5);
 iframeDocument.querySelector("#qingli").click();
}

function shangyibujiagu(){
 let iframe = parent.document.getElementById("leftWebpageStart");
 //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 // iframeDocument.querySelector("#yizuo7").click();
 tijiao2(5);
 iframeDocument.querySelector("#huifu").click();
}
function shangyibujiagu2(){
 let iframe = parent.document.getElementById("leftWebpageStart");
 //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 // iframeDocument.querySelector("#yizuo7").click();
 iframeDocument.querySelector("#jiagu").click();
}

function shangyibushengji(){
 let iframe = parent.document.getElementById("leftWebpageStart");
 //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 // iframeDocument.querySelector("#yizuo7").click();
 iframeDocument.querySelector("#jiagu2").click();
}

function shangyibuchongxin(){
 let iframe = parent.document.getElementById("leftWebpageStart");
 //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 // iframeDocument.querySelector("#yizuo7").click();
 tijiao2(5);
 iframeDocument.querySelector("#shengji").click();
}

function shangyibumsf1(){
 let iframe = parent.document.getElementById("leftWebpageStart");
 //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 // iframeDocument.querySelector("#yizuo7").click();
 iframeDocument.querySelector("#loudongPreparationa").click();
}

function shangyibusizheng2(){
 let iframe = parent.document.getElementById("leftWebpageStart");
 //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 // iframeDocument.querySelector("#yizuo7").click();
 tijiao2(10);
 iframeDocument.querySelector("#msfPreparationa").click();
}

function shoye(){
 let iframe = parent.document.getElementById("leftWebpageStart");
 //找iframe里的document（某些浏览器不支持contentDocument，需结合contentWindow.document使用）
 let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
 //对iframe里的元素操作(有时候能找到，但不触发，需要重新打开网站)
 // iframeDocument.querySelector("#yizuo7").click();
 $("#shouye", parent.document).click();
 $("#allWebpage", parent.document).show();
 $("#tixing", parent.document).hide();
 $(window.parent.document).find("#lilun1").empty();
 $(window.parent.document).find("#lilun1").text("0");
 //$("#allWebpageStart", parent.document).attr("src","index.html");
 $(window.parent.document).find("#rightWebpage").attr("style","display:none");
 $(window.parent.document).find("#bottomWebpage").attr("style","display:none");
 $(window.parent.document).find("#leftWebpage").attr("style","display:none");
 $(window.parent.document).find("#centerWebpage").attr("style","display:none");
 //$(window.parent.document).find("#allWebpageStart").src="index.html";
 // $("#allWebpage", parent.document).show();
 // $("#allWebpageStart", parent.document).attr("src","index.html");


}