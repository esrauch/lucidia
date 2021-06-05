
const canvas = document.querySelector('canvas')!;
const w = canvas.width = canvas.offsetWidth;
const h = canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d')!;
const video = document.querySelector('video')!;

async function getCamera(): Promise<HTMLVideoElement> {
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
    return video;
}

function copyVideoToCanvas() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(video, 0, 0, w, h);
}

function startCamera() {
    getCamera().then(() => {
        document.body.addEventListener('pointerdown', copyVideoToCanvas);
    }).catch(_reason => {
        alert("Couldn't start camera: touch to retry");
        document.body.addEventListener('pointerdown', startCamera, { once: true });
    });
}
startCamera();
