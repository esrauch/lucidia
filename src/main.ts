
const canvas = document.querySelector('canvas')!;
const w = canvas.width = canvas.offsetWidth;
const h = canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d')!;
const video = document.querySelector('video')!;

const captureBtn = document.querySelector('#capture')!
const lucidiaBtn = document.querySelector('#lucidia')!
const filterBtn = document.querySelector('#filter')!

async function startLiveCamera(): Promise<void> {
    const media = await navigator.mediaDevices.getUserMedia({
        video: {
            aspectRatio: h / w,
            facingMode: 'environment',
        },
        audio: false,
    });
    video.srcObject = media;
    video.play();
    await new Promise(resolve => video.onloadedmetadata = resolve);
}

function copyVideoToCanvas() {
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(video, 0, 0, w, h);
}

function toggleLucidia() {
    canvas.classList.toggle('translucent');
    lucidiaBtn.classList.toggle('selected-control');

    if (canvas.classList.contains('translucent'))
        video.play();
    else
        video.pause();
}

function toggleGrayscale() {
    canvas.classList.toggle('grayscale');
    filterBtn.classList.toggle('selected-control');
}

function startCamera() {
    startLiveCamera().then(() => {
    }).catch(_reason => {
        alert("Couldn't start camera: touch to retry");
        document.body.addEventListener('pointerdown', startCamera, { once: true });
    });
}
startCamera();

captureBtn.addEventListener('click', copyVideoToCanvas);
lucidiaBtn.addEventListener('click', toggleLucidia);
filterBtn.addEventListener('click', toggleGrayscale);



