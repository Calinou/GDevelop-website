<?php
//Detect the language of the user
if (isset($_GET["lang"])) {
    //Allow to overwrite the language with lang query parameter
    $_SESSION['lang'] = $_GET["lang"];
} else if(!isset($_SESSION['lang'])) {
    //Autodetect otherwise
    $_SESSION['lang'] = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"],0,2);
}

//Serve the internationalized file if existing
if (file_exists("main-" . $_SESSION['lang'] . ".html")) {
    header("location: main-" . $_SESSION['lang'] . ".html");
    exit();
}

//Fallback to the English one otherwise
$_SESSION['lang'] = 'en';
readfile("main.html");
?>
