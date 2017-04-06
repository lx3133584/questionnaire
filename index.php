<?php
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
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>questionnaire</title>
    <!-- <link rel="stylesheet" href="/./src/assets/font/iconfont.css"> -->
    <link rel="stylesheet" href="./dist/font/iconfont.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="./dist/build.js"></script>
  </body>
</html>
