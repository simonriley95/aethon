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

// Associated Partners Ticker Tape
$('.partner-slider').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    cssEase: 'linear',
    responsive: [
        { breakpoint: 992, settings: { slidesToShow: 3 } },
        { breakpoint: 576, settings: { slidesToShow: 2 } }
    ]
});


// Number Counter Animation
const counters = document.querySelectorAll('.counter-value');
const speed = 200; // Lower numbers make it faster, higher makes it slower

const startCounter = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Calculate the speed/increment ratio
                const inc = target / speed;

                if (count < target) {
                    // Force the counter decimal upwards and update UI
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCount();
            // Stop observing once the counting starts so it doesn't loop again
            observer.unobserve(counter);
        }
    });
};

// Use built-in browser observer to check when numbers appear on screen
const counterObserver = new IntersectionObserver(startCounter, {
    threshold: 0.5 // Start when 50% of the number element is visible
});

counters.forEach(counter => counterObserver.observe(counter));