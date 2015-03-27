$(document).ready(function(){
    $('body').scrollspy({ target: '.nav-page' });

    //Smooth scrolls
    var $root = $('html, body');
	$('a[role="section-link"]').click(function() {
	    $root.animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 500);
	    return false;
	});

	//Carousels
	$('.games-carousel').slick({
		centerMode: true,
		slidesToShow: 2,
		arrows: false,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
			  breakpoint: 768,
			  settings: {
			    slidesToShow: 1,
				slidesToScroll: 2
			  }
			}
		]
	});

	//OS detection
	if (platform.os.family.indexOf("iOS") !== -1 ||
		platform.os.family.indexOf("Android") !== -1 ||
		platform.os.family.indexOf("Windows Phone") !== -1) {
		$('#download a[href="#gdevapp-link"]').tab('show')
	} else if (platform.os.family.indexOf("Windows") !== -1) {
		$('#download a[href="#win-dl"]').tab('show')
	} else if (platform.os.family.indexOf("Ubuntu") !== -1 ||
		platform.os.family.indexOf("Debian") !== -1) {
		$('#download a[href="#ubuntu-dl"]').tab('show')
	} else if (platform.os.family.indexOf("OS X") !== -1) {
		$('#download a[href="#osx-dl"]').tab('show')
	} else if (platform.os.family.indexOf("Fedora") !== -1 ||
		platform.os.family.indexOf("Red Hat") !== -1 ||
		platform.os.family.indexOf("SuSE") !== -1 ||
		platform.os.family.indexOf("Linux") !== -1) {
		$('#download a[href="#linux-dl"]').tab('show')
	}
});
