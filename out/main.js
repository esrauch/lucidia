"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const canvas = document.querySelector('canvas');
const w = canvas.width = canvas.offsetWidth;
const h = canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');
const video = document.querySelector('video');
function getCamera() {
    return __awaiter(this, void 0, void 0, function* () {
        const media = yield navigator.mediaDevices.getUserMedia({
            video: {
                aspectRatio: h / w,
                facingMode: 'environment',
            },
            audio: false,
        });
        video.srcObject = media;
        video.play();
        yield new Promise(resolve => video.onloadedmetadata = resolve);
        return video;
    });
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
