<?php
$api_url = 'https://naizop.com/api/v2';
$api_key = '07b8850f34c3ad7e91eaed3e505312cb';

$post = http_build_query([
  'key' => $api_key,
  'action' => 'services'
]);

$ch = curl_init($api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);

$result = curl_exec($ch);
curl_close($ch);

$services = json_decode($result, true);

echo "<h2>Service List</h2>";

if (!is_array($services)) {
  echo "<pre>Error:\n" . htmlspecialchars($result) . "</pre>";
  exit;
}

echo "<ul>";
foreach ($services as $s) {
  echo "<li><b>".htmlspecialchars($s['category'])."</b> — ".
       htmlspecialchars($s['name'])." (ID: ".$s['service'].
       ", min: ".$s['min'].", max: ".$s['max'].", rate: ".$s['rate'].")</li>";
}
echo "</ul>";
