const miVideo = document.getElementById('miVideo')
const playVideo = document.querySelector(".play")
const srcImage = document.getElementById('image')
const backWard = document.querySelector('.backward')
const forwardBtn = document.querySelector('.forward')
let progressContainer = document.querySelector('.progress-container')
let progressBar = document.querySelector('.progress-bar')
const mute = document.getElementById('mute');
const volumeImg = document.querySelector('.volume-img')
const volinc = document.getElementById('volinc');
const voldec = document.getElementById('voldec');

miVideo.addEventListener('timeupdate', updateProgress)
playVideo.addEventListener('click', playPause)
mute.addEventListener('click', (e) => {
    miVideo.muted = !miVideo.muted;
    if(miVideo.muted) {
        volumeImg.src = "./media/volume-xmark-solid.svg"
    } else {
        volumeImg.src = "./media/volume-off-solid.svg"
    }

  });

  volinc.addEventListener('click', (e) => {
    alterVolume('+');
  });
  voldec.addEventListener('click', (e) => {
    alterVolume('-');
  });

// miVideo.addEventListener('volumechange', (event) => {
//     console.log('The volume changed.');
// })

function playPause() {
    if(miVideo.paused){
        miVideo.play()
        srcImage.src = './media/pause-solid.svg'
    }
    else{
        miVideo.pause()
        srcImage.src = './media/play-solid.svg'
    }
}

backWard.addEventListener('click', back)
forwardBtn.addEventListener('click', forward)
progressContainer.addEventListener('click', setProgress)

function back(value) {
value = -10;
miVideo.currentTime += value
console.log(miVideo.currentTime)
}

function forward(value) {
    value = 10;
    miVideo.currentTime += value;
}

function updateProgress(event) {
    const {duration, currentTime} = event.currentTarget;
    //Obtaining my progress
    const percentOfProgress = (currentTime / duration) * 100
    //Showing in the progress-bar my percent of progress
    //I added this percent of progress like the width of the progress bar because I need to show it. At the beginning width is 0
    progressBar.style.width = percentOfProgress + "%";
}
function setProgress(event) {
    const totalWidth = this.offsetWidth;
    const progressWidthClicking = event.offsetX;
    const showingTheProgress = (progressWidthClicking / totalWidth) * miVideo.duration;
    miVideo.currentTime = showingTheProgress
}

miVideo.addEventListener('ended', () => {
    miVideo.currentTime = 0;
    miVideo.play();
})
function alterVolume(dir) {
    const currentVolume = Math.floor(miVideo.volume * 10) / 10;
    if (dir === '+' && currentVolume < 1) {
      miVideo.volume += 0.1;
    } else if (dir === '-' && currentVolume > 0) {
      miVideo.volume -= 0.1;
    }
  }
