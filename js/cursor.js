// Select the custom cursor element
const cursor = document.querySelector(".custom-cursor");

// Move the custom cursor according to mouse movements
document.addEventListener("mousemove", (e) => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

