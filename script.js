const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const fontSize = 12;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array.from({length: columns}, () => Math.floor(Math.random() * -100));

let heartScale = 0;
const targetHeartScale = 18; 
let isActivated = false;

const colors = [
    '#ff3366', '#ff33cc', '#ff33ff', '#cc33ff', 
    '#6633ff', '#3333ff', '#3366ff', '#33ccff', 
    '#33ffff', '#33ffcc', '#ffcc33', '#ff6633'
];
let colorIndex = 0;
let colorTimer = 0;

function inHeart(x, y, centerX, centerY, scale) {
    if (scale === 0) return false;
    const nx = (x - centerX) / (scale * 10);
    const ny = -(y - centerY) / (scale * 10);
    const equation = Math.pow(nx * nx + ny * ny - 1, 3) - nx * nx * Math.pow(ny, 3);
    return equation <= 0;
}

function drawMatrix() {
    requestAnimationFrame(drawMatrix);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 - 40;

    if (isActivated) {
        if (heartScale < targetHeartScale) {
            heartScale += 0.12;
        }
        colorTimer++;
        if (colorTimer % 4 === 0) {
            colorIndex = (colorIndex + 1) % colors.length;
        }
    }

    for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (y >= 0) {
            const inside = inHeart(x, y, centerX, centerY, heartScale);
            const text = Math.random() > 0.5 ? "1" : "0";

            if (inside) {
                ctx.font = 'bold ' + fontSize + 'px monospace';
                ctx.fillStyle = colors[colorIndex];
                ctx.fillText(text, x, y);
            } else {
                ctx.font = 'bold ' + fontSize + 'px monospace';
                ctx.fillStyle = '#2d0000';
                ctx.fillText(text, x, y);
            }
        }

        if (y > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
        
        drops[i] += 1.5; 
    }
}

requestAnimationFrame(drawMatrix);

const phrases = [
    "我爱你", "Te amo", "Je t'aime", "Ich liebe dich", "Ti amo", "愛してる", "사랑해", 
    "Eu te amo", "أنا أحبك", "मैं तुमसे प्यार करता हूँ", "Main tumse pyar karta hoon", 
    "Seni seviyorum", "Ek is lief vir jou", "Unë të dua", "Я цябе кахаю", "Я тебя люблю", 
    "I love you", "Ես քեզ սիրում եմ", "আমি তোমায় ভালোবাসি", "Volim te", "Обичам те", 
    "Estimo molt", "Gihigugma tika", "Ndimakukonda", "Tá grá agam duit", "Volim te", 
    "Miluji tě", "Jeg elsker dig", "Ik hou van jou", "Mi amas vin", "Ma armastan sind", 
    "Jag älskar dig", "Mahal kita", "Minä rakastan sinua", "S'agapo", "Je t'aimé", 
    "אני אוهב אותך", "मैं तुझсе प्रेम करतो", "Kuv hlub koj", "Szeretlek", "Ég elska þig", 
    "Aku cinta kamu", "Ṇdị m hụrụ gị n'anya", "Gràdhaim thu", "Ti voglio bene", "愛你", 
    "Ес сени суюм", "Nakupenda", "Kocham cię", "Eu te iubesc", "Я тебе люблю", "Volim te", 
    "Milujem ťa", "Rad te imam", "Waan ku jeclahay", "Ngiyakuthanda", "Te quiero", 
    "Aku sayang engkau", "നിന്നെ ഞാൻ പ്രേമിക്കുന്നു", "Jeg elsker deg", "Ek het jou lief", 
    "Мен сени сүйөм", "Би тэмд хайртай", "म तिमीलाई মায়ा गर्छु", "دوستت دارم", "Kocham cie", 
    "Aroha ahau ki a koe", "Ke a go rata", "Ndinokuda", "Mahal kita", "நான் உன்னை காதலிக்கிறேன்", 
    "నేను నిన్ను ప్రేమిస్తున్నాను", "ฉันรักคุณ", "Seni seviyorum", "Я люблю тебе", 
    "Men seni söýýärin", "Я люблю тебе", "Men seni sevaman", "Anh yêu em", "Rwy'n dy garu di", 
    "Ich han dich gärn", "Ik hald fan dy", "Ndinokutenda"
];

const btn = document.getElementById('startBtn');
const textElement = document.getElementById('text');
let phraseIndex = 0;

btn.addEventListener('click', () => {
    btn.style.display = 'none';
    isActivated = true;

    setTimeout(() => {
        textElement.classList.add('show');
        changeText();
        setInterval(changeText, 2500);
    }, 1200);
});

function changeText() {
    textElement.classList.remove('show');
    setTimeout(() => {
        textElement.textContent = phrases[phraseIndex];
        textElement.classList.add('show');
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }, 500);
}
