AOS.init({
  duration: 1000,
  once: true,
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(33, 37, 41, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "#343a40";
    navbar.style.backdropFilter = "none";
  }
});
