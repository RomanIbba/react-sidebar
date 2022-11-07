<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");
//include  '/src/ajaxfiles/config.php ';
$host =  'localhost';    
$user =  'root';        
$password =  '';         
$dbname =  'geg';   

$conn = mysqli_connect($host, $user, $password,$dbname);

if (!$conn) {
   die( 'Connection failed: ' . mysqli_connect_error());
}

$out = ['error' => 0];
$crud = 'read';
 
if(isset($_GET['crud'])){
    $crud = $_GET['crud'];
}

$_POST = json_decode(file_get_contents("php://input"),true);
 
switch($crud) {
    case'create':
 
        $mawb = $_POST['mawb'];
        $userid = $_POST['userid'];
    
        $sql =  'insert into geg_plans (mawb, user_id) values ('.$mawb.', '.$userid.') ';
        $query = $conn->query($sql);
    
        if($query){
            $out['message'] =  'Plan Added Successfully';
        }
        else{
            $out['error'] = true;
            $out['message'] =  'Could not add Plan';
        }
        break;

    case 'read':
        if(isset($_GET['pageNumber'])){
            $page = $_GET['pageNumber'];
        }else{
            $page = 1;
        }
        if(isset($_GET['rowsPerPage'])){
            $rows = $_GET['rowsPerPage'];
        }else{
            $rows = 20;
        }
        $of = ($page-1) * $rows;

        $sqlCount = 'select count(*) from geg_plans';// 'select id, mawb, user_id userid from geg_plans where ID >= 90 limit 20';
        $count = $conn->query($sqlCount); //$con->query($sqlCount);
        $count = $count->fetch_array();
        $count = $count[0];
        $out['count'] = $count;

        //$sql = "select id, mawb, user_id userid, flight_no, port_of_lading, port_of_unlading, created_at from geg_plans where ID >= 90 limit 20";
        $sql = "select * from geg_plans ORDER BY ID DESC
                LIMIT " . $rows . " OFFSET " . $of;
        $query = $conn->query($sql);
        $plans = array();

        while($row = $query->fetch_array()){
            array_push($plans, $row);
        }
        //while($row = mysqli_fetch_assoc($query)){
        //	$plans[] = $row;
        //}

        $out['plans'] = $plans;
        break;
    case 'update':
 
        $planid = $_POST['id'];
        $mawb = $_POST['mawb'];
        $userid = $_POST['userid'];
    
        $sql =  "update geg_plans set mawb='".$mawb."', user_id=".$userid." where id=".$planid;
        $query = $conn->query($sql);
    
        if($query){
            $out['message'] =  'Plan Updated Successfully ';
        }
        else{
            $out['error'] = true;
            $out['message'] =  'Could not update Plan ';
        }
        break;
    default: // 'delete'
 
        $planid = $_POST['id'];
    
        $sql =  'delete from geg_plans where id='.$planid;
        $query = $conn->query($sql);
    
        if($query){
            $out['message'] =  'Plan Deleted Successfully';
        }
        else{
            $out['error'] = true;
            $out['message'] =  'Could not delete Plan';
        }
     
}
 
//$conn->close();

header('Content-type: application/json');
echo json_encode($out);
?>