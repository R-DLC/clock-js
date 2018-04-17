import Clock from './Clock.js';

const creator = document.getElementById('creator');
const Cduration = document.getElementById('duration');
const Cname = document.getElementById('name');
const canvas = document.createElement('canvas')
canvas.height = 500;
canvas.width = 500;
document.getElementById('target').appendChild(canvas);
const ctx = canvas.getContext('2d')
window.c = new Clock('Clock1', 1.2, ctx);


// creator.addEventListener('click', () => {
    
//     const n = Cname.value
//     const d = Number.parseFloat(Cduration.value)
    
//     canvas.addEventListener('click', function s() {
//         c.start();
//         canvas.removeEventListener('click', s, false)
//     })
// },false);

const limitSettings = (limits) => {

}

const createDivFromLimit = (limit) => {
    const d = document.createElement('div');;
    

    return d;
}



