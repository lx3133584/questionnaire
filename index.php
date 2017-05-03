<?php
header("Content-Type: text/html;charset=utf-8");
// 防止全局变量造成安全隐患
$admin = false;
// 启动会话，这步必不可少
session_start();
// 判断是否登陆
if (!(isset($_SESSION["admin"]) && $_SESSION["admin"] === true)) {
  // 验证失败，将 $_SESSION["admin"] 置为 false
  $_SESSION["admin"] = false;
  //弹出提示框，重定向浏览器
  echo "<script>alert('未登陆，跳转到登陆页面');location.href = './login';</script>";
  // header("Location: ./login");
  //确保重定向后，后续代码不会被执行
  exit;
}
?>
<!DOCTYPE html><html lang=en><head><meta charset=utf-8><title>问卷调查后台管理系统</title><link href=/que/static/css/app.a91a6aec00ae90c4e99909998309f85d.css rel=stylesheet></head><body><div id=app></div><script src=//cdn.bootcss.com/echarts/3.5.0/echarts.simple.min.js></script><script type=text/javascript src=/que/static/js/manifest.04372965fcbebdd40bf9.js></script><script type=text/javascript src=/que/static/js/vendor.81a4e2d18cb43bc112f9.js></script><script type=text/javascript src=/que/static/js/app.a32a0f2530229938ada9.js></script></body></html>
