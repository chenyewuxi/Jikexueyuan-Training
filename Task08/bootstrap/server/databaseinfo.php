<?php

	error_reporting(0);

	$server = "localhost"; 
	$user= "root"; 
	$password = "=Lindsayc5"; 

	header("Content-Type:application/json;charset=utf-8");

	$GLOBALS['con']= mysql_connect($server,$user,$password);

	if(!$GLOBALS['con']){
		die('Could not comment to mysql server'. mysql_error());
		mysql_close($GLOBALS['con']);
	}

?>