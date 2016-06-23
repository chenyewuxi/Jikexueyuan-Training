
<?php
  	
	require_once('databaseinfo.php');
	require_once('comonfunction.php');
	
	$actiontype =  filterTextSpecialChar($_REQUEST['actiontype']);
	$newsid = filterTextSpecialChar($_REQUEST['newsid']);
	$category = filterTextSpecialChar($_REQUEST['category']);
	$newstitle = filterTextSpecialChar($_REQUEST['newstitle']);
	$newsimage = filterTextSpecialChar($_REQUEST['newsimage']);
	$newscontent = filterTextSpecialChar($_REQUEST['newscontent']);
	$newsaddtime = filterTextSpecialChar($_REQUEST['newsaddtime']);

	$arrResult;
	
	$sql="";
	$con=$GLOBALS['con'];

	mysql_select_db("phplesson",$con);
	mysql_query("set names utf8"); 


	switch($actiontype) {
		case "DELETE":
			$sql = "DELETE From news Where news_id = ".$newsid;

			$result = mysql_query($sql);

			if (!$result){
				$arrResult["error"] = mysql_error();
			}else {
				$arrResult["desc"] = "OK";
			}
			echo json_encode($arrResult);
			break;

		case "UPDATE":
			$sql = "UPDATE news SET "."category='".$category."',news_title='".$newstitle."',news_image='".$newsimage."',news_content='".$newscontent."',news_addtime='".$newsaddtime."' Where news_id=".$newsid;
			 // echo $sql;
			$result = mysql_query($sql);

			if (!$result){
				$arrResult["error"] = mysql_error();
			}else {
				$arrResult["desc"] = "OK";
			}
			echo json_encode($arrResult);
			break;
			
		case "INSERT":
			$sql = "INSERT into news  (category, news_title,news_image,news_content,news_addtime) Values ('".$category."','".$newstitle."','".$newsimage."','".$newscontent."','".$newsaddtime."')";
			$result = mysql_query($sql);

			if (!$result){
				$arrResult["error"] = mysql_error();
			}else {
				$arrResult["desc"] = "OK";
			}
			echo json_encode($arrResult);
			break;
		case "SELECT":
			if ("ALL" == $category ) {
				$sql = "SELECT news_id,category, news_title,news_image,news_content,news_addtime From news order by news_id desc";
			}else {
				$sql = "SELECT news_id,category, news_title,news_image,news_content,news_addtime From news Where category ='".$category."'"." order by news_id desc";
			}
			
			$result=mysql_query($sql);
			
		    $arrDetail;
			$idx = 0;
			
			while($row = mysql_fetch_array($result)){
				$GLOBALS['arrDetail'][$GLOBALS['idx']]=array("newsid"=>$row['news_id'],"category"=>$row['category'],"newstitle"=>$row['news_title'],"newsimage"=>$row['news_image'],"newscontent"=>$row['news_content'],"newsaddtime"=>$row['news_addtime']);
				$GLOBALS['idx'] =  $GLOBALS['idx'] + 1;
			}



			$arrResult["desc"] = "OK";
			$arrResult["result"] =$arrDetail;
			$arrResult["recordcount"] = mysql_num_rows($result);
			$arrResult["columncount"] = mysql_num_fields($result);
			$arrResult["error"]="";

			echo json_encode($arrResult);
			break;
		case "FETCH":
			$sql = "SELECT news_id,category,news_title,news_image,news_content,"
    			. "CASE "
    			. "	WHEN TIMESTAMPDIFF(DAY,news_addtime,NOW())>0 THEN CONCAT(TIMESTAMPDIFF(DAY,news_addtime,NOW()),'天前') "
    			. " WHEN TIMESTAMPDIFF(HOUR,news_addtime,NOW())>0 THEN CONCAT(TIMESTAMPDIFF(HOUR,news_addtime,NOW()),'小时前') "
    			. " ELSE CONCAT(TIMESTAMPDIFF(MINUTE,news_addtime,NOW()),'分钟前') "
   			 	. " END news_addtime "
    			. " FROM NEWS Where Category='" . $category ."' Order by news.news_addtime desc LIMIT 0,5";
						
    		// echo $sql;
			$result=mysql_query($sql);
			
		    $arrDetail;
			$idx = 0;
			
			while($row = mysql_fetch_array($result)){
				$GLOBALS['arrDetail'][$GLOBALS['idx']]=array("newsid"=>$row['news_id'],"category"=>$row['category'],"newstitle"=>$row['news_title'],"newsimage"=>$row['news_image'],"newscontent"=>$row['news_content'],"newsaddtime"=>$row['news_addtime']);
				$GLOBALS['idx'] =  $GLOBALS['idx'] + 1;
			}



			$arrResult["desc"] = "OK";
			$arrResult["result"] =$arrDetail;
			$arrResult["recordcount"] = mysql_num_rows($result);
			$arrResult["columncount"] = mysql_num_fields($result);
			$arrResult["error"]="";

			echo json_encode($arrResult);
			break;
			
	}
	
	

	mysql_close($con);

?>

