<?php

include "config.php";

$condition  = "1";
if(isset($_GET['planid'])){
	$userid = mysqli_real_escape_string($con,trim($_GET['planid']));

	$condition  = " id=".mysqli_real_escape_string($con,$_GET['planid']);
}
$userData = mysqli_query($con,"select id,mawb from geg_plans WHERE ".$condition );
$response = array();

while($row = mysqli_fetch_assoc($userData)){

    $response[] = $row;
}

echo json_encode($response);
exit;