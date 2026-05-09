$(document).ready(function(){
    
    // Initialize Premium Hero Slider
    $('.hero-slider').slick({
        dots: true,
        infinite: true,
        speed: 800,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false
    });

    // Smooth Scroll for Nav Links
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800);
        }
    });

    // Navbar background change on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('shadow-lg animate__animated animate__fadeInDown');
        } else {
            $('.navbar').removeClass('shadow-lg animate__animated animate__fadeInDown');
        }
    });
});