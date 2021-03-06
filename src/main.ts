
const canvas = document.querySelector('canvas')!
const w = canvas.width = canvas.offsetWidth
const h = canvas.height = canvas.offsetHeight
const ctx = canvas.getContext('2d')!
const video = document.querySelector('video')!

const captureBtn = document.querySelector('#capture')!
const lucidiaBtn = document.querySelector('#lucidia')!
const filterBtn = document.querySelector('#filter')!
const gridBtn = document.querySelector('#grid')!
const openBtn = document.querySelector('#open')!
const saveBtn = document.querySelector('#save')!

// A hidden input to let users select files
const fileInput = document.querySelector('input')!
const grid = document.querySelector('#displayGrid')!

let cameraStarted = false

async function startLiveCamera(): Promise<void> {
    const media = await navigator.mediaDevices.getUserMedia({
        video: {
            aspectRatio: h / w,
            facingMode: 'environment',
        },
        audio: false,
    })
    video.srcObject = media
    video.play()
    await new Promise(resolve => video.onloadedmetadata = resolve)
}

function drawImageToCanvas(img: HTMLImageElement) {
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(img, 0, 0, w, w * (img.height / img.width))
}

function copyVideoToCanvas() {
    if (!cameraStarted) startCamera()
    else {
        ctx.clearRect(0, 0, w, h)
        ctx.drawImage(video, 0, 0, w, h)
    }
}

function toggleLucidia() {
    canvas.classList.toggle('translucent')
    lucidiaBtn.classList.toggle('selected-control')

    if (canvas.classList.contains('translucent'))
        video.play()
    else
        video.pause()
}

function toggleGrayscale() {
    canvas.classList.toggle('grayscale')
    filterBtn.classList.toggle('selected-control')
}

function toggleGrid() {
    gridBtn.classList.toggle('selected-control')
    grid.classList.toggle('hidden')
}

function startCamera() {
    startLiveCamera().then(() => {
        cameraStarted = true
    }).catch(_reason => {
        alert("Couldn't start camera: click capture to retry")
    });
}
startCamera()

fileInput.addEventListener('change', (ev) => {
    const f = fileInput.files?.item(0)
    if (!f) return
    const img = document.createElement('img')
    img.onload = () => drawImageToCanvas(img)
    img.src = URL.createObjectURL(f)
})

function saveAs() {
    const a = document.createElement('a');
    a.setAttribute('download', `lucidia-${+Date.now()}.jpg`)
    a.setAttribute('href', canvas.toDataURL('image/jpeg'))
    a.click();
}

captureBtn.addEventListener('click', copyVideoToCanvas)
lucidiaBtn.addEventListener('click', toggleLucidia)
filterBtn.addEventListener('click', toggleGrayscale)
gridBtn.addEventListener('click', toggleGrid);
openBtn.addEventListener('click', () => fileInput.click())
saveBtn.addEventListener('click', saveAs);



