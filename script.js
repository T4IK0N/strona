const carouselElement = document.getElementById("carousel");
const carouselContentElement = document.getElementById("carousel-content");
const carouselContainerElement = document.getElementById("carousel-container");
carouselElement.scrollLeft = 0;
let isMouseDown = false;
let lastX = null;
let deltaX = 0;
let textChangeTimeout = null;
let replacementTitle = "a";
let replacementContent = "b";
let lastImageIndex = 0;
let currentImageIndex = 0;
carouselContainerElement.addEventListener("mousedown", () => {
    isMouseDown = true;
});
carouselContainerElement.addEventListener("mouseup", handleMouseUp);
carouselContainerElement.addEventListener("mouseleave", handleMouseUp);
document.addEventListener("mouseleave", handleMouseUp);
function handleMouseUp() {
    isMouseDown = false;
    let width = carouselElement.getBoundingClientRect().width;
    lastImageIndex = currentImageIndex;
    if (deltaX >= 0) currentImageIndex = Math.round(carouselElement.scrollLeft / width - 0.35);
    else currentImageIndex = Math.round(carouselElement.scrollLeft / width + 0.35);
    carouselElement.scrollLeft = currentImageIndex * width;
    if (lastImageIndex !== currentImageIndex) {
        let currentImage = carouselElement.querySelector(`.carousel-item:nth-child(${currentImageIndex + 1}) img`);
        console.log(currentImage);
        replacementTitle = currentImage.dataset.title;
        replacementContent = currentImage.dataset.text;
        carouselContentElement.classList.add("poof");
        if (textChangeTimeout == null) textChangeTimeout = setTimeout(() => {
            carouselContentElement.classList.remove("poof");
            carouselContentElement.querySelector("h2").textContent = replacementTitle;
            carouselContentElement.querySelector("p").textContent = replacementContent;
            textChangeTimeout = null;
        }, 500);
    }
}
carouselContainerElement.addEventListener("mousemove", e => {
    deltaX = e.clientX - lastX;
    lastX = e.clientX;
    if (lastX != null) {
        if (isMouseDown) carouselElement.scrollLeft -= deltaX * 10;
    }
});