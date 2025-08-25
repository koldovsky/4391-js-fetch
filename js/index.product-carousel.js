const slides = [
    '<div class="product-carousel__slide"><img src="img/baby-yoda.svg" alt="Baby Yoda"/></div>',
    '<div class="product-carousel__slide"><img src="img/banana.svg" alt="Banana"/></div>',
    '<div class="product-carousel__slide"><img src="img/viking.svg" alt="Viking"/></div>',
    '<div class="product-carousel__slide"><img src="img/girl.svg" alt="Girl"/></div>',
];

let currentSlideIdx = 0;

function showSlide(index) {
    const track = document.querySelector(".product-carousel__track");
    track.innerHTML = slides[index];
    if (window.matchMedia('(min-width: 768px)').matches) {
        const secondSlideIdx = (index + 1) % slides.length;
        track.innerHTML += slides[secondSlideIdx];
        if (window.matchMedia('(min-width: 1200px)').matches) {
            const thirdSlideIdx = (index + 2) % slides.length;
            track.innerHTML += slides[thirdSlideIdx];
        }
    }
}

function nextSlide() {
    currentSlideIdx = (currentSlideIdx + 1) % slides.length;
    showSlide(currentSlideIdx);
}

function prevSlide() {
    currentSlideIdx = (currentSlideIdx - 1 + slides.length) % slides.length;
    showSlide(currentSlideIdx);
}

// setInterval(nextSlide, 3000);
showSlide(currentSlideIdx);

const btnNext = document.querySelector(".product-carousel__button--next");
const btnPrev = document.querySelector(".product-carousel__button--prev");
btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);

window.addEventListener("resize", () => showSlide(currentSlideIdx));