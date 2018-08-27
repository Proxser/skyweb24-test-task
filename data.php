<?php

$bookedDays = array();
$filenameForRead = 'data-default.json';
$filenameForWrite = 'data.json';

if (isset($_POST['bookedDays'])) {
	$bookedDays = $_POST['bookedDays'];
	file_put_contents($filenameForWrite, $bookedDays);
} else {
	$bookedDays = file_get_contents($filenameForRead);
	echo $bookedDays;
}

// $countDays = rand(1, 15);

// for ($i = 0; $i < $countDays; $i++) {

// 	$j = rand(1, 31);

// 	if ( !in_array($j, $bookedDays) ) {
// 		$bookedDays[] = $j;
// 	} else {
// 		continue;
// 	}

// }

// sort($bookedDays);

?>