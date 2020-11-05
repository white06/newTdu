$(function () {
    var    url = document.referrer;
console.log(url);
  //  var ttt="https://www.tduvr.club/vraaaa";
    var short=url.substr(25);
   console.log(url);
    console.log(short);
console.log("https://www.tduvr.club/va"+short);
   window.location.href="https://www.tduvr.club/va"+short;
  //  window.location.href="https://www.tduvr.club/tdu/yanzheng/login.html?11111111";
});
