<?php
header("Access-Control-Allow-Origin: *");
error_reporting(E_ALL); 
ini_set('display_errors', 1); 

include('android_log_php.php');

$sql = $con -> prepare("SELECT * FROM post order by no DESC");
$sql -> execute();

$reviews = $sql -> fetchAll();
if (!$reviews) {
    echo 'No data found.';
}

$counter = 0;
foreach ($reviews as $review) {
    $time = DateTime::createFromFormat('Y-m-d H:i:s', $review['redate']);
    $time = date_format($time, 'Y-m-d');

    if ($counter % 3 == 0) {
        echo "<tr>";
    }
    echo "<td class='reviewTd'>";
    echo "<div class='reviewImage'>";
    if ($review['image']) {
      echo "<img style='width: 280px; height: 280px; object-fit: cover; border-radius:20px;' src='http://15.164.210.143/image/" . $review['image'] . "'></img>"
    }
    echo "</div>";
    echo "<div class='reviewContent'>";
    echo "<div class='reviewTitle' style="text-decoration-line: none;"><a href='http://15.164.210.143/viewpost.php?no=" . $review['no'] . "'>" . $review['title'] . "</a></div>";
    echo "<div class='reviewDate'>" . $time . "</div>";
    echo "</div>";
    echo "</td>";

    $counter++;

    if ($counter % 3 == 0) {
        echo "</tr>";
    }
}

if ($counter % 3 != 0) {
    echo "</tr>";
}
?>