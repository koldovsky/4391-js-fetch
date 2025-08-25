const h1 = document.querySelector('.header__title');

const greetings = [
    'Hello!',
    'Hi!',
    'Hey!',
    'Greetings!',
    'Welcome!',
    'Good day!',
    'Howdy!',
    'Salutations!',
    'Yo!',
    'What’s up?'
]

h1.innerText = greetings[Math.floor(Math.random() * greetings.length)];
function randomLightColorGenerator() {
    // Generate light colors by keeping RGB values high (200-255)
    const r = Math.floor(200 + Math.random() * 56);
    const g = Math.floor(200 + Math.random() * 56);
    const b = Math.floor(200 + Math.random() * 56);
    return `rgb(${r}, ${g}, ${b})`;
}
h1.style.color = randomLightColorGenerator();
