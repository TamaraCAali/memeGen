
function init() {
    renderImgs(gImgs);
}

function onChangeFontFam(elFont) {
    console.log(elFont);
    switch (elFont) {
        case 'impact':
            gCurrMeme.texts[gCurrTxtIdx].fontFamily = 'Impact, Charcoal, sans-serif';
            break;
        case 'lucida':
            gCurrMeme.texts[gCurrTxtIdx].fontFamily = '"Lucida Console", Monaco, monospace';
            break;
        case 'comic':
            gCurrMeme.texts[gCurrTxtIdx].fontFamily = '"Comic Sans MS", cursive, sans-serif';
            break;
    }
    drawImage();

}


function onInputTap(){
document.querySelector('.all').classList.add('open');
// document.querySelector('.text-input').value='';
}



function onAddText(elInput) {
    updateText(elInput)
    // currTxtIdx = textIdx
    // drawImage();
}

function onNavLine(op) {
    if (!gCurrMeme.texts.length) return;
    if (op === '-') {
        if (!gCurrTxtIdx) return;
        gCurrTxtIdx--;
    } else {
        if (gCurrTxtIdx > gCurrMeme.texts.length) return;
        gCurrTxtIdx++;
    }
    document.querySelector('.text-input').value = gCurrMeme.texts[gCurrTxtIdx].line;
    document.querySelector('.btn-color').value = gCurrMeme.texts[gCurrTxtIdx].color;
    document.querySelector('.textIdx').value = gCurrTxtIdx + 1;
    // document.querySelector('.shadow-checkbox').checked = false;
}

function onAddLine() {
    var text = document.querySelector('.text-input').value;
    createLine(text);
    gCurrTxtIdx = gCurrMeme.texts.length - 1;
    if (gCurrTxtIdx > 1) gCurrMeme.texts[gCurrTxtIdx].y = 150;
    document.querySelector('.text-input').value = '';
    document.querySelector('.btn-color').value = '#ffffff';
    document.querySelector('.shadow-checkbox').checked = false;
    document.querySelector('.textIdx').value = gCurrTxtIdx+1;
    // document.querySelector('.shadow-checkbox').style.color = 'black';
}

function renderImgs(imgs) {
    var strHtmls = readImgs(imgs)
    document.querySelector('.imgs-list').innerHTML = strHtmls.join('');
}

function onDrawImg(imgId) {
    gImgId = imgId;
    drawImage();
    // document.querySelector('.continer-modal').style.display = 'block';
    // document.querySelector('.screen-modal').style.display = 'block';
    document.querySelector('.test-container').classList.add('open');

}


//rendering with for each
function drawImage() {
    // initCanvas();
    var imgClass = gImgId;
    var img = document.querySelector(`._${imgClass}`);
    drawCanvas(img);
    console.log('gCtx',gCtx)
    // canvas.width = img.innerWidth/2;
    // canvas.height = window.innerWidth/2;
    gCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //TODO: DO WITH FOR EACH
    gCurrMeme.texts.forEach(function (text) {
        gCtx.font = text.fontSize + 'px ' + text.fontFamily;
        gCtx.shadowColor = text.shadow;
        gCtx.shadowOffsetX = text.shadowOffSetX;
        gCtx.shadowOffsetY = text.shadowOffSetY;
        gCtx.fillStyle = text.color;
        gCtx.strokeStyle = 'black';
        gCtx.lineWidth = 2;
        //NEWWWW
        gCtx.textAlign = text.align; 
        // gCtx.textAlign = 'center';
        gCtx.fillText(text.line, text.x , text.y);
        gCtx.strokeText(text.line, text.x, text.y);
    });
}

//NEWWWW
function onTextAlign(par) {
    switch (par) {
        case 'center':
            gCurrMeme.texts[gCurrTxtIdx].align = 'center';
            gCurrMeme.texts[gCurrTxtIdx].x = canvas.width/2;

            break;
        case 'left':
            gCurrMeme.texts[gCurrTxtIdx].align = 'left';
            gCurrMeme.texts[gCurrTxtIdx].x = 5;

            break;
        case 'right':
            gCurrMeme.texts[gCurrTxtIdx].align = 'right';
            gCurrMeme.texts[gCurrTxtIdx].x = canvas.width-5;

            break;
    }
    drawImage();
}

function changeFontSize(op) {
    if (op === '+') {
        gCurrMeme.texts[gCurrTxtIdx].fontSize += 5;
    } else {
        gCurrMeme.texts[gCurrTxtIdx].fontSize -= 5;
    }
    var fontSize = gCurrMeme.texts[gCurrTxtIdx].fontSize;
    gCurrMeme.texts[gCurrTxtIdx].fontSize = fontSize;
    drawImage();
}

function onColorChange(elColorInput) {
    var color = elColorInput.value;
    gCurrMeme.texts[gCurrTxtIdx].color = color;
    drawImage();
}

function onBackhomePage() {
 
    document.querySelector('.test-container').classList.remove('open');
    document.querySelector('.all').classList.remove('open');

    clearMeme();
}

function clearMeme() {
    gCurrMeme.texts.forEach(function (undefined, idx) {
        gCurrMeme.texts[idx].line = '';
    });
}

function onDescriptionfilter(ev) {
    ev.preventDefault();
    var keyWord = document.querySelector('.filter-list-input').value
    var imgs = findImgByWord(keyWord);
    renderImgs(imgs);
}

function changeTextXPos(elBtnId) {
    console.log(elBtnId);
    if (elBtnId === 'left') gCurrMeme.texts[gCurrTxtIdx].x -= 5;
    else gCurrMeme.texts[gCurrTxtIdx].x += 5;
    drawImage();
}

function changeTextYPos(elBtnId) {
    console.log(elBtnId);
    if (elBtnId === 'up') gCurrMeme.texts[gCurrTxtIdx].y -= 5;
    else gCurrMeme.texts[gCurrTxtIdx].y += 5;
    drawImage();
}


// function changeTextAlignment(elBtnId) {
//     if (elBtnId === 'align-left') gCurrMeme.texts[gCurrTxtIdx].x = (canvas.width / 2) - 130;
//     else if (elBtnId === 'align-right') gCurrMeme.texts[gCurrTxtIdx].x = (canvas.width / 2) + 50;
//     else gCurrMeme.texts[gCurrTxtIdx].x = (canvas.width / 2) - 50;

//     drawImage();

// }

function controlTextShadow() {
    var checkBox = document.querySelector('.shadow-checkbox');
    
    if (checkBox.checked) {
        gCurrMeme.texts[gCurrTxtIdx].shadow = '#ffffff';
        gCurrMeme.texts[gCurrTxtIdx].shadowOffSetX = 1;
        gCurrMeme.texts[gCurrTxtIdx].shadowOffSetY = 2;
        document.querySelector('.shadow').classList.add('checked');
        
    }
    else {
        gCurrMeme.texts[gCurrTxtIdx].shadow = '';
        gCurrMeme.texts[gCurrTxtIdx].shadowOffSetX = 0;
        gCurrMeme.texts[gCurrTxtIdx].shadowOffSetY = 0;
        document.querySelector('.shadow').classList.remove('checked');
    }
    drawImage();
}

function onDeleteline() {
    var elInput = document.querySelector('.text-input');
    gCurrMeme.texts[gCurrTxtIdx].line = '';
    elInput.value = '';
    drawImage();
}

function openNav() {
    var nav = document.querySelector('.mobile-nav');
    var page = document.querySelector('.page');
    if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        page.classList.remove('screen');
        document.querySelector('.hambunger').innerText = '☰';
    } else {
        nav.classList.add('open');
        page.classList.add('screen');
        document.querySelector('.hambunger').innerText = '✖';
    }
}

function closeNav() {
    var nav = document.querySelector('.mobile-nav');
    var page = document.querySelector('.page');
    nav.classList.remove('open');
    page.classList.remove('screen');
    document.querySelector('.page span').innerText = '';
}

function downloadCanvas(elLink) {

    console.log(elLink);
    elLink.href = canvas.toDataURL();
    elLink.download = 'my_paint.jpg';
}


function sendInfo() {
    var userEmail = $(".user-email").val();
    var userSubject = $(".user-subject").val();
    var userText = $(".user-text").val();

    $(".user-email").val('');
    $(".user-type").val('');
    $(".user-text").val('');

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=idokestin@gmail.com&su=${userSubject}&body=${userText}`, '_blank');
  

}