let date = new Date();
let battery = navigator.getBattery();
let timeAlarm = 0;


const phoneDate = document.querySelector('.clock p');
const phoneClock = document.querySelector('.clock h1');
const phoneHeaderClock = document.querySelector('.clock__header p')
const phoneBattery = document.querySelector('.battery');
const phobeBatteryBox = document.querySelector('.phone__battery');
// alarm
const alarm = document.querySelector('.alarm');
const alarmAudio = document.querySelector('.alarm__audio');
const alarmTime = document.querySelector('.alarm__time');
const setAlarmBtn = document.querySelector('.set__alarm');
const stopAlarmBtn = document.querySelector('.stop__alarm');
const alarmBox = document.querySelector('.alarm__box');
const alarmClose = document.querySelector('.close__alarm');
// clipboard
const notes = document.querySelector('.notes') 
const clipboardBox = document.querySelector('.clipboard');
const clipboardInfo = document.querySelector('.clipboard p');
const clipboardClose = document.querySelector('.close__clipboard');
const clipboardCopy = document.querySelector('.copy');
const clipboardPaste = document.querySelector('.paste');
const clipboardClear = document.querySelector('.clear');
const textarea = document.querySelector('.textarea');
// other
const google = document.querySelector('.chrome');
const instagram = document.querySelector('.instagram');
const telegram = document.querySelector('.telegram');


phoneDate.textContent = date.toDateString();
setInterval(() => {
    let date = new Date();
    phoneClock.innerHTML = date.toLocaleTimeString()
    phoneHeaderClock.textContent =  date.toLocaleTimeString().slice(0, 5)
}, 1000);

battery.then(resolve => {
    phoneBattery.innerHTML = Math.floor(100 * resolve.level) + "%";
    phoneBattery.style.width = 100 * resolve.level + "%"
    let charging = resolve.charging;
    if (charging) {
        phobeBatteryBox.innerHTML += ` <img class="charging__battery" src="/assets/images/flash.png" alt="charging" width="10">`
    }
})

// alarm
alarm.addEventListener('click', () => {
    alarmBox.classList.toggle("alarm__close")
})

alarmClose.addEventListener('click', () => {
    alarmBox.classList.toggle("alarm__close")
})

alarmTime.addEventListener('change', function () {
    timeAlarm = this.value;
})


let stopAlarm; 

setAlarmBtn.addEventListener('click', function () {
    alarmBox.classList.remove('alarm__close')
    stopAlarm = setInterval(() => {
        let time = new Date();
        let alarm = time.toLocaleTimeString().slice(0, 5)
        if (timeAlarm === alarm) {
        //    console.log(`chalindi`);
           alarmAudio.play()
           alarmBox.classList.add('alarm__close')
        }
    }, 1000)
})


stopAlarmBtn.addEventListener('click', function(){
    clearInterval(stopAlarm);
    // console.log(`ochdi`);
    alarmAudio.pause()
})

// clipboard
function getClipboardInfo(str){
    clipboardInfo.style.opacity = 1;
    clipboardInfo.textContent = str
    setTimeout(()=>{
        clipboardInfo.style.opacity = 0;
    }, 2000)
}

clipboardCopy.addEventListener('click', function(){
    navigator.clipboard.writeText(textarea.value.trim());
    getClipboardInfo('Copied')
})

clipboardPaste.addEventListener('click', function(){
    navigator.clipboard.readText().then(res =>{
       textarea.value += res;
    })
    getClipboardInfo('Paste')
})

clipboardClear.addEventListener('click', function(){
    textarea.value = '';
   getClipboardInfo('Cleaned')
})

clipboardClose.addEventListener('click', function(){
    clipboardBox.classList.toggle('clipboard__close')
})

notes.addEventListener('click', function(){
    clipboardBox.classList.toggle('clipboard__close')
})

// links
google.addEventListener('click', function(){
    open('https://www.google.com/', 'Google','google')
})

instagram.addEventListener('click', function(){
    open('https://www.instagram.com/', 'Instagram','Instagram')
})

telegram.addEventListener('click', function(){
    open('https://web.telegram.org/a/', 'Telegram','Telegram')
})