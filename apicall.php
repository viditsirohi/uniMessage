<?php
header('Content-Type: application/json');
$curl = curl_init();
$email = $_GET["email"];
$name = $_GET["name"];
$api_key = "6dcae5346ada4950ae625d10b0eafae2";

$options = [
  CURLOPT_URL => "https://emailvalidation.abstractapi.com/v1/?api_key=" . $api_key . "&email=" . $email,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10, 
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET"
  ];

curl_setopt_array($curl, $options);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err)
{
    echo $err;
}
else
{
    echo $response;
}

