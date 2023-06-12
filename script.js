console.log("Welcome to spotify");

let masterPlay = document.querySelector("#masterPlay");
let progressBar = document.querySelector('#progressBar');
let songListItem = document.querySelectorAll('.songListItem');
let currentSongDisplay = document.querySelector('#current-song');
let nextPlay = document.querySelector('#nextPlay');
let previousPlay = document.querySelector('#previousPlay');
let totalSongs = 6;
let currentSongIndex = 0;

function song(songName, songPath) {
    this.songName = songName;
    this.songPath = songPath;
}

let songs = [
    new song('Best song ever', 'audio/best-song-ever.mp3' ),
    new song('Live while young', 'audio/live-while-were-young.mp3'),
    new song('Night changes', 'audio/night-changes.mp3'),
    new song('Steal my Girl', 'audio/steal-my-girl.mp3'),
    new song('Story of my life', 'audio/story-of-my-life.mp3'),
    new song('What makes you beatiful','audio/what-makes-you-beautiful.mp3')
]

let audioElement = new Audio(songs[currentSongIndex].songPath);


/////////////////////////////////////////////////////////////

console.log(songs);

document.querySelector('.songListItem  span img').src = 'https://img.icons8.com/?size=512&id=z3Kv_BvcR5LU&format=png';
document.querySelector('#current-song').textContent = songs[currentSongIndex].songName;

for(let i = 0; i < songs.length; i++) {
    songListItem[i].querySelector(".songListName").textContent = songs[i].songName;
    // songListItem[i].querySelector('.timestamp').textContent = songs[i].audioElement.duration;
   // console.log(songs[i].audioElement.duration);
}


masterPlay.addEventListener('click', function() {
    if(audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.src = 'https://img.icons8.com/?size=512&id=z3Kv_BvcR5LU&format=png';

    } else {
        masterPlay.src = 'https://img.icons8.com/?size=512&id=3cdCHbIzVVFf&format=png';
        audioElement.pause();
    }
})

audioElement.addEventListener('timeupdate', function() {
    let progress = parseInt((audioElement.currentTime/ audioElement.duration) * 100);
    progressBar.value = progress;
})

progressBar.addEventListener('input', function(){
    let currentValue = progressBar.value;
    audioElement.currentTime = (audioElement.duration/ 100) * currentValue;
})

function makeAllPause() {
    document.querySelectorAll('.stamp img').forEach((element, index)=>{
        element.src =  'https://img.icons8.com/?size=512&id=3cdCHbIzVVFf&format=png';
    })
}

document.querySelectorAll('.stamp img').forEach((element, index)=>{
    element.addEventListener('click', (e) => {
        console.log(e);
        makeAllPause();
        e.target.src = 'https://img.icons8.com/?size=512&id=z3Kv_BvcR5LU&format=png';
        currentSongIndex = index;
        audioElement.src = songs[currentSongIndex].songPath;
        audioElement.play();
        masterPlay.src = 'https://img.icons8.com/?size=512&id=z3Kv_BvcR5LU&format=png';
        currentSongDisplay.textContent = songs[currentSongIndex].songName;
    })
})

nextPlay.addEventListener('click', function() {
    currentSongIndex++;
    if(currentSongIndex == totalSongs) {
        currentSongIndex = 0;
    }
    audioElement.src = songs[currentSongIndex].songPath;
    audioElement.play();
    masterPlay.src = 'https://img.icons8.com/?size=512&id=z3Kv_BvcR5LU&format=png';
    currentSongDisplay.textContent = songs[currentSongIndex].songName;
    makeAllPause();
    document.querySelectorAll('.stamp img')[currentSongIndex].src = 'https://img.icons8.com/?size=512&id=z3Kv_BvcR5LU&format=png';
})

previousPlay.addEventListener('click', function() {
    currentSongIndex--;
    if(currentSongIndex < 0) {
        currentSongIndex = totalSongs - 1;
    }
    audioElement.src = songs[currentSongIndex].songPath;
    audioElement.play();
    masterPlay.src = 'https://img.icons8.com/?size=512&id=z3Kv_BvcR5LU&format=png';
    currentSongDisplay.textContent = songs[currentSongIndex].songName;
    makeAllPause();
    document.querySelectorAll('.stamp img')[currentSongIndex].src = 'https://img.icons8.com/?size=512&id=z3Kv_BvcR5LU&format=png';
})