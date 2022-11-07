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
$out = ['menu' => null];
 
        // $sql =  "select menus.id, menu_name name,
        // submenu_name sub, action from 
        // fnd_navigations menus
        // inner join fnd_user_roles roles
        // on menus.role_id = roles.id
        // and app_code = 'GEG'
        // inner join fnd_user_roles users
        // on roles.user_id = users.id
        // where users.id = 1
        //         and menus.role_id in (12)
		// 		and action != '#'
        //         order by sequence_number";

        $sql =  "select menus.id, menu_name name,
        submenu_name sub, action from 
        fnd_navigations menus
        inner join fnd_user_roles roles
        on menus.role_id = roles.id
        and app_code = 'MIQ'
        inner join fnd_user_roles users
        on roles.user_id = users.id
        where users.id = 1
                and menus.role_id in (10)
                and action_type in ('LIS','URL')
                order by sequence_number";
        $query = $conn->query($sql);
        $menus = array();

        if(!empty($query)) {
            while($row = $query->fetch_array()){
                array_push($menus, $row);
            }
        }
        //while($row = mysqli_fetch_assoc($query)){
        //	$menus[] = $row;
        //}

        $out['menus'] = $menus;
 
//$conn->close();

header('Content-type: application/json');
echo json_encode($out);
?>