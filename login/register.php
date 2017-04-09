<?php

header("content-Type: text/html; charset=Utf-8"); 

$servername = "bdm259768380.my3w.com";
$username = "bdm259768380";
$password = "a456456456";
$dbname = "bdm259768380_db";

// 创建连接
$con = mysql_connect($servername,$username,$password);
// 检测连接
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

 mysql_select_db($dbname, $con);

//判断如果是get请求，则进行搜索；如果是POST请求，则进行新建
//$_SERVER是一个超全局变量，在一个脚本的全部作用域中都可用，不用使用global关键字
//$_SERVER["REQUEST_METHOD"]返回访问页面使用的请求方法
if ($_SERVER["REQUEST_METHOD"] == "GET") {
	search();
} elseif ($_SERVER["REQUEST_METHOD"] == "POST"){
	create();
}

function search(){
	$account = $_GET["account"];
	$sql="SELECT account FROM  MyGuests WHERE account='$account' ";
	$query=mysql_query($sql);
	$rows=mysql_num_rows($query); 

	if($rows>0){
		echo '{"success":false,"message":"用户名已存在"}';
	}
	else{
		echo '{"success":true,"message":"用户名不存在"}';
	}
}

function create(){
	$account = $_POST["account"];
	$password = $_POST["password"];
	$name = $_POST["name"];
	$sex = $_POST["sex"];


	mysql_query("SET NAMES utf8");


	$sql = "INSERT INTO MyGuests (account, password, name, sex)
	VALUES ( '$account', '$password', '$name', '$sex')";
	$query=mysql_query($sql);

	if ($query == TRUE) {
		// 当验证通过后，启动 Session
		session_start();
		// 注册登陆成功的 admin 变量，并赋值 true
		$_SESSION["admin"] = true;
		$_SESSION['account'] = $account;
		echo '{"success":true,"message":"注册成功"}';
	} 
	else {
	    echo '{"success":false,"message":"Error: " . $sql . "<br>" . $conn->error}';
	}

}



?>