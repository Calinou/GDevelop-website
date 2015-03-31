<?php

//Redirect if necessary to the adapted language
$currentFile = $_SERVER["PHP_SELF"];
$parts = Explode('/', $currentFile);
if( $parts[count($parts) - 1] =="index.php") {
    if (isset($_GET["lang"])) {
        if ( $_GET["lang"] == "fr" ) {
            $_SESSION['lang'] = 'fr';
            header("location:indexFR.php");
        }
        else if ( $_GET["lang"] == "en" )
            $_SESSION['lang'] = 'en';
    }
    else if(!isset($_SESSION['lang'])){
        if (substr($_SERVER["HTTP_ACCEPT_LANGUAGE"],0,2) == "fr") {
            $_SESSION['lang'] = 'fr';
            header("location:indexFR.php");
        }else{
            $_SESSION['lang'] = 'en';
        }
    }
}

readfile("main.html");
?>
