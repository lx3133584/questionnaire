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

$post=file_get_contents('php://input');//接收 post
$post=json_decode($post);//把接受到的 json 变成数组。

//判断请求目的
if ($_SERVER["REQUEST_METHOD"] == "GET") {
	getName();
} elseif ($_SERVER["REQUEST_METHOD"] == "POST"){

	if($post->type == "add"){
		addData();
	}
	elseif($post->type == "mod"){
		modData();
	}
	elseif($post->type == "del"){
		delData();
	}
	elseif($post->type == "get"){
		getData();
	}
	elseif($post->type == "list"){
		getList();
	}

}
//获得用户名
function getName(){
	session_start();
	echo $_SESSION["account"];
}
//增加问卷
function addData(){
	session_start();
	$name = $_SESSION["account"];
	global $post;
	$data = $post->data;
	$data = json_encode($data);
	$data = decodeUnicode($data);

	mysql_query("SET NAMES utf8");

	$sql1 = "SELECT data FROM  MyGuests WHERE account='$name' ";
	$query1 = mysql_query($sql1);
	$row = mysql_fetch_array($query1);
	if($row[0]!=""){
		$data = $row[0].'++'.$data;
	}
	

	$sql2 = "UPDATE MyGuests SET data='$data' WHERE account='$name'";
	$query2 = mysql_query($sql2);
	if ($query2 == TRUE) {
	    echo '{"success":true,"message":"保存成功","data":"'.$data.'"}';
	} 
	else {
	    echo '{"success":false,"message":"Error: " . $sql . "<br>" . $conn->error}';
	}
}
//修改问卷
function modData(){
	session_start();
	$name = $_SESSION["account"];
	global $post;
	$data = $post->data;
	$data = json_encode($data);
	$data = decodeUnicode($data);
	$index = $post->index;

	mysql_query("SET NAMES utf8");

	$sql1 = "SELECT data FROM  MyGuests WHERE account='$name' ";
	$query1 = mysql_query($sql1);
	$row = mysql_fetch_array($query1);
	$rows = explode('++',$row[0]);
	$rows[$index] = $data;
	$data = implode('++',$rows);

	$sql2 = "UPDATE MyGuests SET data='$data' WHERE account='$name'";
	$query2 = mysql_query($sql2);
	if ($query2 == TRUE) {
	    echo '{"success":true,"message":"保存成功","data":"'.$data.'"}';
	} 
	else {
	    echo '{"success":false,"message":"Error: " . $sql . "<br>" . $conn->error}';
	}
}
//删除问卷
function delData(){
	session_start();
	$name = $_SESSION["account"];
	global $post;
	$index = $post->index;

	mysql_query("SET NAMES utf8");

	$sql1 = "SELECT data FROM  MyGuests WHERE account='$name' ";
	$query1 = mysql_query($sql1);
	$row = mysql_fetch_array($query1);
	$rows = explode('++',$row[0]);
	array_splice($rows,$index,1);
	$data = implode('++',$rows);

	$sql2 = "UPDATE MyGuests SET data='$data' WHERE account='$name'";
	$query2 = mysql_query($sql2);
	if ($query2 == TRUE) {
	    echo '{"success":true,"message":"保存成功","data":"'.$data.'"}';
	} 
	else {
	    echo '{"success":false,"message":"Error: " . $sql . "<br>" . $conn->error}';
	}
}
//取出数据
function getData(){
	session_start();
	$name = $_SESSION["account"];
	global $post;
	$index = $post->index;

	mysql_query("SET NAMES utf8");

	$sql1 = "SELECT data FROM  MyGuests WHERE account='$name' ";
	$query1 = mysql_query($sql1);
	$row = mysql_fetch_array($query1);
	$rows = explode('++',$row[0]);
	if ($query1 == TRUE) {
	    echo $rows[$index];
	} 
	else {
	    echo '{"success":false,"message":"Error: " . $sql . "<br>" . $conn->error}';
	}
}
//取得问卷列表
function getList(){
	session_start();
	$name = $_SESSION["account"];
	global $post;

	mysql_query("SET NAMES utf8");

	$sql1 = "SELECT data FROM  MyGuests WHERE account='$name' ";
	$query1 = mysql_query($sql1);
	$row = mysql_fetch_array($query1);
	if($row[0]!=""){
		echo $row[0];
	}
	else{
		echo '{"success":false,"message":"Error: " . $sql . "<br>" . $conn->error}';
	}

}

//unicode码解码
function decodeUnicode($str)
{
    return preg_replace_callback('/\\\\u([0-9a-f]{4})/i',
        create_function(
            '$matches',
            'return mb_convert_encoding(pack("H*", $matches[1]), "UTF-8", "UCS-2BE");'
        ),
        $str);
}


?>