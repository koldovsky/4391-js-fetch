const animatedSlides = [
    '<div class="animated-carousel__slide"><img src="img/baby-yoda.svg" alt="Baby Yoda"/></div>',
    '<div class="animated-carousel__slide"><img src="img/banana.svg" alt="Banana"/></div>',
    '<div class="animated-carousel__slide"><img src="img/viking.svg" alt="Viking"/></div>',
    '<div class="animated-carousel__slide"><img src="img/girl.svg" alt="Girl"/></div>',
];

let animatedCurrentIdx = 0;
let isAnimating = false;

function renderAnimatedSlides() {
    const track = document.querySelector('.animated-carousel__track');
    if (!track) return;
    // For infinite effect, clone last and first
    const slides = [
        animatedSlides[animatedSlides.length - 1],
        ...animatedSlides,
        animatedSlides[0],
    ];
    track.innerHTML = slides.join('');
    track.style.transform = `translateX(-100%)`;
}

function moveAnimatedCarousel(dir) {
    if (isAnimating) return;
    isAnimating = true;
    const track = document.querySelector('.animated-carousel__track');
    const slideCount = animatedSlides.length;
    let newIdx = animatedCurrentIdx + dir;
    track.style.transition = 'transform 0.6s cubic-bezier(.77,0,.18,1)';
    track.style.transform = `translateX(-${(newIdx + 1) * 100}%)`;
    animatedCurrentIdx = newIdx;
    setTimeout(() => {
        if (animatedCurrentIdx < 0) {
            track.style.transition = 'none';
            animatedCurrentIdx = slideCount - 1;
            track.style.transform = `translateX(-${(animatedCurrentIdx + 1) * 100}%)`;
        } else if (animatedCurrentIdx >= slideCount) {
            track.style.transition = 'none';
            animatedCurrentIdx = 0;
            track.style.transform = `translateX(-100%)`;
        }
        isAnimating = false;
    }, 600);
}


renderAnimatedSlides();
const btnNext = document.querySelector('.animated-carousel__button--next');
const btnPrev = document.querySelector('.animated-carousel__button--prev');
btnNext.addEventListener('click', () => moveAnimatedCarousel(1));
btnPrev.addEventListener('click', () => moveAnimatedCarousel(-1));

// Optional: auto-scroll
// setInterval(() => moveAnimatedCarousel(1), 4000);

window.addEventListener('resize', renderAnimatedSlides);
