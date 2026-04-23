// --- Loader ---
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }, 1000); // 1s simulation for loading
});

// --- Sticky Navbar & Active Link ---
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    // Sticky nav
    if (window.scrollY > 20) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
    
    // Active Link Highlighting
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href").includes(current)) {
            a.classList.add("active");
        }
    });
});

// --- Mobile Menu Toggle ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

navLinks.forEach(a => {
    a.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

// --- Typing Animation ---
const words = ["build AI models.", "design web apps.", "solve problems.", "love coding."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.getElementById("typing-text");

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;
    if (isDeleting) typeSpeed /= 2;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // Pause at the end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
}

// Start typing animation on DOM Load
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1500); // Wait for loader
});

// --- Scroll Reveal Animations & Progress Bars ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
    
    // Trigger Skill Bars
    const skillsSection = document.getElementById("skills");
    if(skillsSection) {
        var skillTop = skillsSection.getBoundingClientRect().top;
        if(skillTop < windowHeight - 150) {
            document.querySelector(".python").style.width = "90%";
            document.querySelector(".ml").style.width = "75%";
            document.querySelector(".cpp").style.width = "70%";
            document.querySelector(".htmlcss").style.width = "85%";
            document.querySelector(".js").style.width = "80%";
            document.querySelector(".react").style.width = "60%";
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // To check initial scroll position

// --- Contact Form Submission ---
const form = document.querySelector(".contact-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button");
    const originalText = btn.innerHTML;
    
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
    
    // Simulate async submission
    setTimeout(() => {
        btn.innerHTML = `<i class="fas fa-check"></i> Sent Successfully!`;
        btn.style.background = "#2ecc71"; // Success green
        form.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = ""; // Reset
        }, 3000);
    }, 1500);
});
