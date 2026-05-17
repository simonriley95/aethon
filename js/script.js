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

/* =========================================================================
   AETHON MARITIMES - INTEGRATED FREIGHT QUOTE ENGINE
   ========================================================================= */
function autoFillQuoteForm() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Extract parameters directly from the URL address string
    const originVal = urlParams.get('origin');
    const destVal = urlParams.get('destination');
    const modeVal = urlParams.get('mode');
    const cargoVal = urlParams.get('cargo_type');
    const weightVal = urlParams.get('weight');

    console.log("Extracted URL Params:", { originVal, destVal, modeVal, cargoVal, weightVal });

    // Find form elements using their structural name attributes
    const targetOrigin = document.querySelector('select[id="quote-origin"]') || document.querySelector('select[name="origin"]');
    const targetDest = document.querySelector('select[id="quote-destination"]') || document.querySelector('select[name="destination"]');
    const targetMode = document.querySelector('select[id="quote-mode"]') || document.querySelector('select[name="mode"]');
    const targetCargo = document.querySelector('select[id="quote-cargo"]') || document.querySelector('select[name="cargo_type"]');
    const targetWeight = document.querySelector('input[id="quote-weight"]') || document.querySelector('input[name="weight"]');

    // Dynamically inject values into dropdown elements if they exist on the page
    if (originVal && targetOrigin) { targetOrigin.value = originVal; }
    if (destVal && targetDest) { targetDest.value = destVal; }
    if (modeVal && targetMode) { targetMode.value = modeVal; }
    if (cargoVal && targetCargo) { targetCargo.value = cargoVal; }
    if (weightVal && targetWeight) { targetWeight.value = weightVal; }
}

// Run immediately, and also hook into document load states
autoFillQuoteForm();
document.addEventListener("DOMContentLoaded", autoFillQuoteForm);
window.addEventListener("load", autoFillQuoteForm);

// ---------------------------------------------------------------------
// EMAIL DISPATCH SYSTEM
// ---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const quoteForm = document.querySelector('.full-form') || document.querySelector('form');
    if (quoteForm && window.location.pathname.includes('quote.html')) {
        quoteForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const targetOrigin = document.querySelector('select[id="quote-origin"]') || document.querySelector('select[name="origin"]');
            const targetDest = document.querySelector('select[id="quote-destination"]') || document.querySelector('select[name="destination"]');
            const targetMode = document.querySelector('select[id="quote-mode"]') || document.querySelector('select[name="mode"]');
            const targetCargo = document.querySelector('select[id="quote-cargo"]') || document.querySelector('select[name="cargo_type"]');
            const targetWeight = document.querySelector('input[id="quote-weight"]') || document.querySelector('input[name="weight"]');

            const finalOrigin = targetOrigin ? targetOrigin.value : 'Not Provided';
            const finalDest = targetDest ? targetDest.value : 'Not Provided';
            const finalMode = targetMode ? targetMode.value : 'Not Provided';
            const finalCargo = targetCargo ? targetCargo.value : 'Not Provided';
            const finalWeight = targetWeight ? targetWeight.value : 'Not Provided';
            
            const clientEmail = quoteForm.querySelector('input[type="email"]')?.value || 'Not Provided';
            const clientPhone = quoteForm.querySelector('input[type="tel"]')?.value || 'Not Provided';
            const clientNotes = quoteForm.querySelector('textarea')?.value || 'None';

            const emailSubject = encodeURIComponent("New Global Freight Quote Request - Aethon Maritimes");
            const emailBody = encodeURIComponent(
                `Aethon Maritimes Operations Team,\n\nA new corporate quote inquiry has been submitted with the parameters detailed below:\n\n` +
                `--------------------------------------------------\n` +
                `SHIPMENT PARAMETERS:\n` +
                `--------------------------------------------------\n` +
                `• Origin Point: ${finalOrigin}\n` +
                `• Destination Point: ${finalDest}\n` +
                `• Selected Transport Mode: ${finalMode}\n` +
                `• Cargo Classification: ${finalCargo}\n` +
                `• Weight & Dims: ${finalWeight}\n\n` +
                `--------------------------------------------------\n` +
                `CLIENT PROFILE DETAILS:\n` +
                `--------------------------------------------------\n` +
                `• Email Address: ${clientEmail}\n` +
                `• Phone Number: ${clientPhone}\n` +
                `• Special Instructions:\n${clientNotes}\n\n` +
                `Please process route verification and dispatch tariff estimations within 24 hours.`
            );

            window.location.href = `mailto:info@aethonmaritimes.com?subject=${emailSubject}&body=${emailBody}`;
        });
    }
});



// ---------------------------------------------------------------------
// 3. CONTACT FORM ROUTING TRIGGER (Runs on contact.html submit)
// ---------------------------------------------------------------------
const contactForm = document.querySelector('.contact-submission-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = document.getElementById('client-firstname').value;
        const lastName = document.getElementById('client-lastname').value;
        const email = document.getElementById('client-email').value;
        const phone = document.getElementById('client-phone').value;
        const message = document.getElementById('client-message').value;

        const subject = encodeURIComponent(`General Inquiry from ${firstName} ${lastName} - Aethon Maritimes`);
        const body = encodeURIComponent(
            `Aethon Maritimes Support Team,\n\nA message has been submitted via the contact channel:\n\n` +
            `• Sender Name: ${firstName} ${lastName}\n` +
            `• Email Address: ${email}\n` +
            `• Contact Number: ${phone}\n\n` +
            `Message Contents:\n"${message}"\n\n` +
            `--------------------------------------------------\n` +
            `Please dispatch this to the relevant local regional hub coordinator.`
        );

        window.location.href = `mailto:info@aethonmaritimes.com?subject=${subject}&body=${body}`;
    });
}
