console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('Songs/Har Har Shambhu.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Har Har Shambhu", filePath: "Songs/Har Har Shambhu.mp3", coverPath: "Covers/download.jpeg" },
    { songName: "Dhokha", filePath: "Songs/Dhokha.mp3", coverPath: "Covers/Dhokha.jpg" },
    { songName: "Saiyaan", filePath: "Songs/Saiyaan.mp3", coverPath: "Covers/saiyaan.jpg" },
    { songName: "Galliyan", filePath: "Songs/Galliyan.mp3", coverPath: "Covers/Galliyan.jpg" },
    { songName: "Jindey", filePath: "Songs/Jindey.mp3", coverPath: "Covers/jindey.jpeg" },
    { songName: "Kesariya", filePath: "Songs/Kesariya.mp3", coverPath: "Covers/Kesariya.jpg" },
    { songName: "Single-Saiyaan", filePath: "Songs/Single Saiyaan.mp3", coverPath: "Covers/Single-Saiyaan.jpg" },
    { songName: "GYPSY", filePath: "Songs/Mera Balam Thanedar.mp3", coverPath: "Covers/GYPSY.jpg" },
    { songName: "Dhoke pyar ke", filePath: "Songs/Dhoke Pyaar Ke - B Praak.mp3", coverPath: "Covers/Dhoke-Pyaar-Ke.jpg" },
    { songName: "Hum Nashe Mein Toh Nahin", filePath: "Songs/Hum Nashe Mein To Nahi.mp3", coverPath: "Covers/Hum-Nashe-Mein-Toh-Nahin.jpg" },
]


songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration)* 100);
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        let songSrc = songs[songIndex].filePath
        audioElement.src = songSrc;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    console.log(songs[0].filePath)
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    // console.log(songs[songIndex+1].filePath)
    let songSrc = songs[songIndex].filePath
    audioElement.src = songSrc;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    let songSrc = songs[songIndex].filePath
    audioElement.src = songSrc;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-pause-circle');
})