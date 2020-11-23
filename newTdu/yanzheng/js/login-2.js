
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function queding(){
    var str = GetRequest();
    var jiami =base64Decode(str.jiami);
    var need=str.need;
    setCookie("url",str.restoreUrl)
    var shuru=$("#jiami").val();
    if(shuru==jiami){
		if(need==null||need==""){
		window.location.href=str.restoreUrl;
}else if(need==1){
      
  window.location.href="https://www.tduvr.club/tdu/yanzheng/login.html";
}
    }else{
        layer.alert("输入不正确，请重新输入");
    }
}

function base64Encrypt(baseString) {
    var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var length = baseString.length;
    var loopNo = parseInt(length / 3);
    var charOne, charTwo, charThree;
    var out = "";
    for (var i = 0, j = 0; j < loopNo; j++) {
        charOne = baseString.charCodeAt(i++);
        charTwo = baseString.charCodeAt(i++);
        charThree = baseString.charCodeAt(i++);
        out += base64Chars.charAt(charOne >> 2);
        out += base64Chars.charAt(((charOne & 0x3) << 4) | ((charTwo & 0xF0) >> 4));
        out += base64Chars.charAt(((charTwo & 0xF) << 2) | ((charThree & 0xC0) >> 6));
        out += base64Chars.charAt(charThree & 0x3F);
    }
    if (i === length) {
        return out;
    }
    charOne = baseString.charCodeAt(i++) & 0xff;
    out += base64Chars.charAt(charOne >> 2);
    if (i === length) {
        out += base64Chars.charAt((charOne & 0x3) << 4);
        out += "==";
    } else {
        charTwo = baseString.charCodeAt(i++);
        out += base64Chars.charAt(((charOne & 0x3) << 4) | ((charTwo & 0xF0) >> 4));
        out += base64Chars.charAt((charTwo & 0xF) << 2);
        out += "=";
    }
    return out;
}

function base64Encode(baseSting) {
    var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var length = baseSting.length;
    var chara1, chara2, chara3;
    var out = "", i = 0;
    while (i < length) {
        chara1 = baseSting.charCodeAt(i++) & 0xff;
        out += base64Chars.charAt(chara1 >> 2);
        if (i == length) {
            out += base64Chars.charAt((chara1 & 0x3) << 4);
            out += "==";
            break;
        }
        chara2 = baseSting.charCodeAt(i++);
        if (i == length) {
            out += base64Chars.charAt(((chara1 & 0x3) << 4) | ((chara2 & 0xF0) >> 4));
            out += base64Chars.charAt((chara2 & 0xF) << 2);
            out += "=";
            break;
        }
        chara3 = baseSting.charCodeAt(i++);
        out += base64Chars.charAt(((chara1 & 0x3) << 4) | ((chara2 & 0xF0) >> 4));
        out += base64Chars.charAt(((chara2 & 0xF) << 2) | ((chara3 & 0xC0) >> 6));
        out += base64Chars.charAt(chara3 & 0x3F);
    }
    return out;
}


function base64Decode(baseString) {
    var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var length = baseString.length;
    var charI, charII, charIII, charIV;
    var out = "", i = 0;
    if (0 < length && 0 === length % 4) {
        if (/^[A-Za-z0-9\+/]{2,}={0,2}$/.test(baseString)) {
            while (i < length - 4) {
                charI = base64Chars.indexOf(baseString.charAt(i++));
                charII = base64Chars.indexOf(baseString.charAt(i++));



                charIII = base64Chars.indexOf(baseString.charAt(i++));
                charIV = base64Chars.indexOf(baseString.charAt(i++));
                out += String.fromCharCode((charI << 2) | ((charII & 0x30) >> 4));
                out += String.fromCharCode(((charII & 0xF) << 4) | ((charIII & 0x3C) >> 2));
                out += String.fromCharCode(((charIII & 0x3) << 6) | charIV);
            }
            charI = base64Chars.indexOf(baseString.charAt(i++));
            charII = base64Chars.indexOf(baseString.charAt(i++));



            out += String.fromCharCode((charI << 2) | ((charII & 0x30) >> 4));

            switch (baseString.indexOf("=")) {
                case length - 1:
                    charIII = base64Chars.indexOf(baseString.charAt(i++));
                    out += String.fromCharCode(((charII & 0xF) << 4) | ((charIII & 0x3C) >> 2));
                    break;
                case -1:
                    charIII = base64Chars.indexOf(baseString.charAt(i++));
                    charIV = base64Chars.indexOf(baseString.charAt(i++));
                    out += String.fromCharCode(((charII & 0xF) << 4) | ((charIII & 0x3C) >> 2));
                    out += String.fromCharCode(((charIII & 0x3) << 6) | charIV);
            }
        } else {
            throw new Error(baseString + " does not base64 encoded string.");
        }
    } else {
        throw new Error(baseString + " does not base64 encoded string.");
    }
    return out;
}

//写cookies
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}
$(function () {
});