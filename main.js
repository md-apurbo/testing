// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll reveal
const revealElements = document.querySelectorAll(".fade-section, .fade-in");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

revealElements.forEach((el) => observer.observe(el));

// Certificate Modal
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

window.showImageModal = function (url) {
    modalImage.src = url;
    modal.style.display = "flex";
};

modal.onclick = () => {
    modal.style.display = "none";
    modalImage.src = "";
};
