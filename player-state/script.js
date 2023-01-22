// Player state
let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
});

// Call canvas element pada index.html
const canvas = document.getElementById('firstcvs');
const ctx = canvas.getContext('2d');
const cvs_width = canvas.width = 600;
const cvs_height = canvas.height = 600;

// Tambahkan elemen gambar pada canvas
const playerImage = new Image();
playerImage.src = 'shadow_dog.png';

// Tangkap ukuran gambar yang sesuai untuk frame
const sprWidth = 575;
const sprHeight = 523;

// Setting game frame
let gameFrame = 0;
const staggerFrames = 3;

// Looping animasi
const sprAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames: 11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'getHit',
        frames: 4
    }
];

animationStates.forEach((state, index) => {
    let frames = { loc: [], }
    for (let s = 0; s < state.frames; s++){
        let positionX = s * sprWidth;
        let positionY = index * sprHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    sprAnimations[state.name] = frames;
});

// Buat Fungsi Animasi
function animate()
{
    ctx.clearRect(0, 0, cvs_width, cvs_height);
    let position = Math.floor(gameFrame/staggerFrames) % sprAnimations[playerState].loc.length;
    let frameX = sprWidth * position;
    let frameY = sprAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, sprWidth, sprHeight, 0, 0, sprWidth, sprHeight);

    gameFrame++;
    requestAnimationFrame(animate);

}
animate();