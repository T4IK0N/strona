const carouselElement = document.getElementById("carousel");
const carouselContentElement = document.getElementById("carousel-content");
const carouselContainerElement = document.getElementById("carousel-container");
carouselElement.scrollLeft = 0;
let isMouseDown = false;
let lastX = null;
let deltaX = 0;
let textChangeTimeout = null;
let carouselInterval = null;
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
function hangeImage(index, changeText) {
    let currentImage = carouselElement.querySelector(`.carousel-item:nth-child(${index + 1}) img`);
    if (currentImage === null) return;
    carouselElement.scrollLeft = index * carouselElement.getBoundingClientRect().width;
    replacementTitle = currentImage.dataset.title;
    replacementContent = currentImage.dataset.text;
    if (textChangeTimeout == null && changeText) {
        carouselContentElement.classList.add("poof");
        textChangeTimeout = setTimeout(() => {
            carouselContentElement.classList.remove("poof");
            carouselContentElement.querySelector("h2").textContent = replacementTitle;
            carouselContentElement.querySelector("p").textContent = replacementContent;
            textChangeTimeout = null;
        }, 500);
    }
}
function handleMouseUp() {
    isMouseDown = false;
    let width = carouselElement.getBoundingClientRect().width;
    lastImageIndex = currentImageIndex;
    if (deltaX >= 0) currentImageIndex = Math.round(carouselElement.scrollLeft / width - 0.35);
    else currentImageIndex = Math.round(carouselElement.scrollLeft / width + 0.35);
    if (lastImageIndex !== currentImageIndex) {
        clearInterval(carouselInterval);
        carouselInterval = setInterval(incrementCarousel, 10000);
    }
    hangeImage(currentImageIndex, lastImageIndex !== currentImageIndex);
}
carouselContainerElement.addEventListener("mousemove", e => {
    deltaX = e.clientX - lastX;
    lastX = e.clientX;
    if (lastX != null) {
        if (isMouseDown) {
            let scroll = carouselElement.scrollLeft - deltaX * 10;
            let maxScroll = carouselElement.getBoundingClientRect().width * (carouselElement.querySelector("div").querySelectorAll("div").length - 1);
            if (scroll < 0) scroll = maxScroll;
            if (scroll > maxScroll) scroll = 0;
            carouselElement.scrollLeft = scroll;
            console.log(scroll);
        }
    }
});
function incrementCarousel() {
    lastImageIndex = currentImageIndex;
    currentImageIndex += 1;
    console.log(currentImageIndex);
    if (currentImageIndex >= carouselElement.querySelector("div").querySelectorAll("div").length) currentImageIndex = 0;
    hangeImage(currentImageIndex, true);
}
carouselInterval = setInterval(incrementCarousel, 10000);