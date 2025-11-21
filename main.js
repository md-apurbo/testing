// 1. Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// 2. Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if(mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const isOpen = mobileMenu.classList.contains('open');
        mobileMenuBtn.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
        lucide.createIcons();
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });
}

// 3. Modal Logic
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementById('imageModalCloseBtn');

window.showImageModal = function(src) {
    if(modal && modalImg) {
        modalImg.src = src;
        modal.style.display = "flex";
    }
}

if(closeBtn) {
    closeBtn.onclick = function() { modal.style.display = "none"; }
}

window.onclick = function(event) {
    if (event.target == modal) modal.style.display = "none";
}

// 4. Footer Year
const yearSpan = document.getElementById('current-year');
if(yearSpan) yearSpan.textContent = new Date().getFullYear();

// 5. Scroll Reveal Logic
const revealElements = document.querySelectorAll('.scroll-reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); 
        }
    });
}, { threshold: 0.1 });
revealElements.forEach(el => revealObserver.observe(el));

// 6. Typewriter Effect
const typeWriterElements = document.querySelectorAll('.typewriter-text');
function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        // Changed speed from 20 to 50 for slower typing
        setTimeout(() => typeWriter(element, text, i + 1), 50); 
    } else {
        element.classList.remove('typing-cursor'); 
    }
}
const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const text = el.getAttribute('data-text');
            if (text && !el.classList.contains('typed')) {
                el.classList.add('typed'); 
                el.classList.add('typing-cursor');
                typeWriter(el, text);
            }
        }
    });
}, { threshold: 0.5 });
typeWriterElements.forEach(el => typeObserver.observe(el));

// 7. Home Animation Logic
const homeStickyParent = document.getElementById('home-sticky-parent');
const homeTextContent = document.getElementById('home-text-content');
const homeImageWrapper = document.getElementById('home-image-wrapper');
const lerp = (a, b, t) => a * (1 - t) + b * t;

function handleHomeAnimation() {
    if (!homeStickyParent || !homeTextContent || !homeImageWrapper) return;
    const parentRect = homeStickyParent.getBoundingClientRect();
    const startY = homeStickyParent.offsetTop;
    const dist = Math.max(1, homeStickyParent.offsetHeight - window.innerHeight);
    const percent = Math.max(0, Math.min(1, (window.scrollY - startY) / dist));

    if (window.innerWidth >= 768) {
        homeTextContent.style.top = lerp(35, 45, percent) + "%";
        homeTextContent.style.left = lerp(50, 25, percent) + "%"; 
        homeTextContent.style.transform = "translate(-50%, -50%)";
        homeTextContent.style.opacity = 1;
        
        homeImageWrapper.style.top = lerp(60, 50, percent) + "%";
        homeImageWrapper.style.left = lerp(50, 75, percent) + "%"; 
        homeImageWrapper.style.transform = "translate(-50%, -50%)";
        homeImageWrapper.style.opacity = 1;
    } else {
        homeTextContent.style.top = "35%";
        homeTextContent.style.left = "50%";
        homeTextContent.style.transform = "translate(-50%, -50%)";
        homeTextContent.style.opacity = 1 - (percent * 2.5);
        
        homeImageWrapper.style.top = "60%";
        homeImageWrapper.style.left = "50%";
        homeImageWrapper.style.transform = "translate(-50%, -50%)";
        homeImageWrapper.style.opacity = 1 - (percent * 2.5);
    }
}
window.addEventListener('scroll', handleHomeAnimation);
window.addEventListener('resize', handleHomeAnimation);
handleHomeAnimation();
