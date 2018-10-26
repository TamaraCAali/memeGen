var canvas;
var gCtx;
var gImgId = 0;
// var gTxtIdx = 1;
var gCurrTxtIdx = 0;


// initCanvas()

var gImgs = [
    { id: makeId(), url: 'img/2.jpg', keywords: ['All', 'Happy'] },
    { id: makeId(), url: 'img/003.jpg', keywords: ['All', 'Determined'] },
    { id: makeId(), url: 'img/004.jpg', keywords: ['All', 'Cute'] },
    { id: makeId(), url: 'img/005.jpg', keywords: ['All', 'Cute'] },
    { id: makeId(), url: 'img/5.jpg', keywords: ['All', 'Determined'] },
    { id: makeId(), url: 'img/006.jpg', keywords: ['All', 'Cute'] },
    { id: makeId(), url: 'img/8.jpg', keywords: ['All', 'Exciting'] },
    { id: makeId(), url: 'img/img2.jpg', keywords: ['All', 'Happy'] },  
    { id: makeId(), url: 'img/img4.jpg', keywords: ['All', 'Happy'] },
    { id: makeId(), url: 'img/img5.jpg', keywords: ['All', 'Surprised','Cute'] },
    { id: makeId(), url: 'img/img11.jpg', keywords: ['All', 'Cute'] },
    { id: makeId(), url: 'img/img12.jpg', keywords: ['All', 'Cute'] },
    { id: makeId(), url: 'img/meme1.jpg', keywords: ['All', 'Determined'] },
    { id: makeId(), url: 'img/patrick.jpg', keywords: ['All', 'Cute'] },
    { id: makeId(), url: 'img/putin.jpg', keywords: ['All', 'Exciting'] },
    { id: makeId(), url: 'img/X-Everywhere.jpg', keywords: ['All', 'Happy'] }



]


var gCurrMeme = {
    selectedImgId: gImgId,
    texts: [
        {
            line: '',
            fontFamily: 'sans-serif',
            fontSize: 40,
            color: '#ffffff',
            fontFamily : 'Impact, Charcoal, sans-serif',
            x: 10,
            y: 50,
            align:'',
        }
    ]
}

function drawCanvas(img){
    canvas = document.querySelector('#canvas');
    var canvasContainer = document.querySelector('.scatch');
    var imgWidth = img.naturalWidth;
    var imgHeight = img.naturalHeight;
    var ratio = imgWidth/imgHeight;
    // canvas.width = canvasContainer.clientWidth;
    canvas.width = 500;
    canvas.height = canvas.width / ratio;
    // canvas.height = 400;
    console.log('canvas.width ', canvas.width)
    console.log('canvas.height', canvas.height)
    gCtx = canvas.getContext('2d');

    // canvas.width = 
}


// console.log('gCurrMeme',gCurrMeme)
function createLine(text){
    gCurrMeme.texts.push( {
            line: '',
            fontFamily: 'sans-serif',
            fontSize: 20,
            color: '#ffffff',
            fontFamily : 'Impact, Charcoal, sans-serif',
            x: (canvas.width / 2) - 50,
            y: 250,
        })
}

// function initCanvas() {
//     canvas = document.querySelector('#canvas');
//     var canvasContainer = document.querySelector('.scatch');

//     canvas.width = canvasContainer.clientWidth;
//     canvas.height = canvasContainer.clientHeight;
//     console.log('canvas.width ', canvas.width)
//     console.log('canvas.height', canvas.height)
//     gCtx = canvas.getContext('2d');
// }

function readImgs(imgs){
    var strHtmls = imgs.map(function (img) {
        return `
        <li onclick="onDrawImg('${img.id}')">
        <img class="_${img.id} img" src="${img.url}">
        </li>
        `
    });
    return strHtmls
}

function findImgByWord(keyword) {
    var imgs =  gImgs.filter(function (img) {
            return img.keywords.some(word =>{
                return word.includes(keyword);
            })
    })
  return imgs;
}
        

        // for(var i = 0; i < img.keywords.length; i++){
            // if ()
            // if (img.keywords[i] === includes(word)
            // isWord = true
        // }
        // return isWord;

function updateText(elInput){
    var text = elInput.value;    
    console.log(gCurrTxtIdx);
    
    gCurrMeme.texts[gCurrTxtIdx].line = text;
    drawImage(elInput.value)
    // gCurrMeme.texts.length
}

function getImg(imgId) {
    var img = gImgs.find(function (img) {
        return img.id === imgId;
    })
    return img;
}

// function updatecurrIDX(op){
//     if (op === '+') gCurrTxtIdx++;
//     else gCurrTxtIdx--;
//     drawImage()

// }