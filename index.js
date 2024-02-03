const container = document.querySelector(".container"),
    mainVideo = container.querySelector("video"),
    playPauseBtn = container.querySelector(".play-pause i"),
    progressBar = container.querySelector(".progress-bar"),
    skipBackward = container.querySelector(".skip-backward i"),
    skipForward = container.querySelector(".skip-forward i"),
    volumeBtn =container.querySelector(".volume i"),
    currentduration =container.querySelector(".video-duration"),
    currentVidTime =container.querySelector(".current-time"),
    volumeSlider =container.querySelector(".left input"),
    slowmotionBtn =container.querySelector(".playback-speed span"),
    speedList =container.querySelector(".speed-options"),
    picInPicBtn = container.querySelector(".pic-in-pic span"),
    videoTimeLine = container.querySelector(".video-time-line"),
    fullscreenBtn = container.querySelector(".fullscreen i"),
    fileInput= document.querySelector(".vedio-input input"),
    speedoptions = speedList.querySelectorAll("li"),
    video= document.querySelector("video")
    let timer

//================================================//
fileInput.addEventListener("change", () => {
    let file = new FileReader();
    file.readAsDataURL(fileInput.files[0]);
    file.onload = function () {
        video.src = file.result
    }
})

//================================================//

const hideControls = () => {
    // if (mainVideo.pause) return;
   timer= setTimeout(() => {
        container.classList.remove("show-controls")
    }, 3000)
}
hideControls()
container.addEventListener("mousemove", () => {
    container.classList.add("show-controls")
    clearTimeout(timer)
    hideControls()

})
const formatTime = time => {
    let seconds = Math.floor(time % 60),
     minutes = Math.floor(time / 60) %60,
        hours = Math.floor(time / 3600)

    seconds = seconds < 10 ? `0${seconds} `: seconds;
    minutes = minutes < 10 ? `0${minutes} `: seconds;
    hours = hours < 10 ? `0${hours}` : seconds
    if (hours == 0) {
        return `${minutes}:${seconds}`
         } else {
             return `${hours}:${minutes}:${seconds}`
             
    }
    
}
// const formatTime = time => {
//     let seconds = Math.floor(time % 60),
//     minutes = Math.floor(time / 60) % 60,
//     hours = Math.floor(time / 3600);
//     seconds = seconds < 10 ? `0${seconds}` : seconds;
//     minutes = minutes < 10 ? `0${minutes}` : minutes;
//     hours = hours < 10 ? `0${hours}` : hours;
//     if(hours == 0) {
//         return `${minutes}:${seconds}`
//     }
//     return `${hours}:${minutes}:${seconds}`;
// }

videoTimeLine.addEventListener("mousemove", e => {
    const progressTime = videoTimeLine.querySelector("span")
    const offsetX = e.offsetX
    progressTime.style.left = `${offsetX}px`
    let timeLineWidth = videoTimeLine.clientWidth

    progressTime.innerHTML=formatTime((e.offsetX/timeLineWidth)*mainVideo.duration)
})
mainVideo.addEventListener("loadeddata", e => {
    currentduration.innerHTML= formatTime(e.target.duration)
})
slowmotionBtn.addEventListener("click", () => {
    speedList.classList.toggle("show")
})
volumeBtn.addEventListener ("click", () => {
    if (volumeBtn.classList.contains("fa-volume-high")) {
        mainVideo.volume = 0.0
        volumeBtn.classList.replace("fa-volume-high","fa-volume-xmark")
    } else {
        mainVideo.volume = 0.5
        volumeBtn.classList.replace("fa-volume-xmark","fa-volume-high")
    }
})
// picInPicBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());

picInPicBtn.addEventListener("click",()=>{mainVideo.requestPictureInPicture()}) 
fullscreenBtn.addEventListener("click",()=>{mainVideo.requestFullscreen()}) 
    
speedoptions.forEach(option => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed
        speedList.querySelector(".active").classList.remove("active")
        option.classList.add("active")
    })
    
});

mainVideo.addEventListener("timeupdate", (e) => {
    let { currentTime, duration } = e.target
    let precent = (currentTime / duration) * 100
    progressBar.style.width = `${precent}%`
    currentVidTime.innerHTML =formatTime(currentTime)

})
skipBackward.onclick = () => mainVideo.currentTime -= 10
skipForward.onclick = () => mainVideo.currentTime += 10

mainVideo.onclick= () => {
    if (speedList.classList.contains("show") && mainVideo.played) {
        speedList.classList.remove("show")
        mainVideo.play()
    } else if (speedList.classList.contains("show") && mainVideo.paused) {
        speedList.classList.remove("show")
        mainVideo.pause() 
        
    }
    mainVideo.paused ? mainVideo.play() : mainVideo.pause()  
    }
    

playPauseBtn.addEventListener("click", () => {
    mainVideo.paused? mainVideo.play() :   mainVideo.pause()       
})
mainVideo.onplay = () => {
    playPauseBtn.classList.replace("fa-play","fa-pause")
}
mainVideo.onpause = () => {
    playPauseBtn.classList.replace("fa-pause","fa-play")

}
volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value
    if (e.target.value == 0) {

        volumeBtn.classList.replace("fa-volume-high","fa-volume-xmark")
    } else {
        volumeBtn.classList.replace("fa-volume-xmark","fa-volume-high")
    }
    volumeSlider.value = mainVideo.volume
    
})
videoTimeLine.addEventListener("click",(e)=> {
    let timeLineWidth = videoTimeLine.clientWidth
    mainVideo.currentTime = (e.offsetX / timeLineWidth) * mainVideo.duration
})
const dragagableBrogressBar = e => {
    let timeLineWidth = videoTimeLine.clientWidth
    progressBar.style.width = `${e.offsetX}px`
    
    mainVideo.currentTime = (e.offsetX / timeLineWidth) * mainVideo.duration
    currentVidTime.innerHTML =formatTime(mainVideo.currentTime)


}
videoTimeLine.addEventListener("mousedown", () => {
    videoTimeLine.addEventListener("mouseover",dragagableBrogressBar)
})
document.addEventListener("mouseup", () => {
    videoTimeLine.removeEventListener("mousemove",dragagableBrogressBar)
})
videoTimeLine.addEventListener("movementY", () => {
    console.log("ok")
})
//https://www.codingnepalweb.com/custom-video-player-html-css-javascript/
//https://www.codingnepalweb.com/custom-video-player-html-css-javascript/
//50
