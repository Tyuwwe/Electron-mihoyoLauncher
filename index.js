let bShowList = false;
let bShowGameAdditional = false;
let bUnlockFrameRate = false;
let bShowSettings = false;
let bCanSlide = true;
let gameNow = '0';
let currentImage = 1;
let slideImage = document.getElementsByClassName('news-slide')[0];

document.getElementsByClassName('controlbar-closebtn')[0].addEventListener('click', () => {
    window.close();
})

document.getElementsByClassName('controlbar-logo')[0].addEventListener('click', () => {
    document.getElementsByClassName('listbtn')[0].style = "animation: listbtn-click 0.3s";
    setTimeout("document.getElementsByClassName('listbtn')[0].style = ''", 300);
    if(!bShowList) {
        document.getElementsByClassName('left-container')[0].style = "transform: translate(0, -20px);";
        document.getElementsByClassName('listbtn-text')[0].innerText = "收起";
        bShowList = true;
    }
    else {
        document.getElementsByClassName('left-container')[0].style = "transform: translate(0, -120px);";
        document.getElementsByClassName('listbtn-text')[0].innerText = "展开";
        bShowList = false;
    }
})

let changeGameBtns = document.getElementsByClassName('left-gamebtn-container');

for(i = 0; i < changeGameBtns.length; i++) {
    changeGameBtns[i].addEventListener('click', (e) => {
        if(e.target.id == '0') {
            if(gameNow != e.target.id) {
                document.getElementById('bkg-container').removeChild(document.getElementById('bkg-img'));
                let newBkg = document.createElement('img');
                newBkg.setAttribute('class', 'background-img');
                newBkg.setAttribute('src', './img/genshin_background.png')
                newBkg.setAttribute('id', 'bkg-img');
                document.getElementById('bkg-container').appendChild(newBkg);
                newBkg.style.opacity = 1;
                gameNow = '0';
            }
        }
        else if(e.target.id == '1') {
            if(gameNow != e.target.id) {
                document.getElementById('bkg-container').removeChild(document.getElementById('bkg-img'));
                let newBkg = document.createElement('img');
                newBkg.setAttribute('class', 'background-img');
                newBkg.setAttribute('src', './img/starrail_background.png')
                newBkg.setAttribute('id', 'bkg-img');
                document.getElementById('bkg-container').appendChild(newBkg);
                newBkg.style.opacity = 1;
                gameNow = '1';
            }
        }
        else {
            console.log("error: target = " + e.target);
        }
    })
    changeGameBtns[i].addEventListener('mouseover', (e) => {
        if(gameNow != e.target.id) {
            //document.getElementById('bkg-img').style = "filter: brightness(0.6);"
        }
    })
    changeGameBtns[i].addEventListener('mouseout', () => {
        document.getElementById('bkg-img').style = "filter: brightness(1);"
    })
}

document.getElementsByClassName('right-bottom-start-dropbutton')[0].addEventListener('click', () => {
    if(!bShowGameAdditional) {
        document.getElementsByClassName('startbtn-droplist')[0].style = "display: flex;";
        bShowGameAdditional = true;
    }
    else {
        document.getElementsByClassName('startbtn-droplist')[0].style = "display: none;";
        bShowGameAdditional = false;
    }
})

document.getElementById('unlockFPS').addEventListener('click', () => {
    if(!bUnlockFrameRate) {
        document.getElementById('unlockFPS').innerHTML = "解锁帧率<svg width='36' height='22' fill='none' viewBox='0 0 22 22' xmlns='http://www.w3.org/2000/svg'><path d='M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h12Zm-1.53 4.97L10 14.44l-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l7-7a.75.75 0 0 0-1.06-1.06Z' fill='#000000'/></svg>";
        bUnlockFrameRate = true;
    }
    else {
        document.getElementById('unlockFPS').innerHTML = "解锁帧率<svg width='36' height='22' fill='none' viewBox='0 0 22 22' xmlns='http://www.w3.org/2000/svg'><path d='M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6Z' fill='#000000'/></svg>";
        bUnlockFrameRate = false;
    }
})

document.getElementsByClassName('controlbar-settingbtn')[0].addEventListener('click', async () => {
    if(!bShowSettings) {
        document.getElementById('settings').style = "transform: translate(0px, 50%);";
        bShowSettings = true;
        await window.launcherAPI.getPath().then((res) => {
            document.getElementById('genshinPath').value = res[0];
            document.getElementById('starrailPath').value = res[0];
        })
    }
    else {
        document.getElementById('settings').style = "transform: translate(-350px, 50%);";
        bShowSettings = false;
    }
})

document.getElementById('bkg-container').addEventListener('click', () => {
    if(bShowList) {
        document.getElementsByClassName('left-container')[0].style = "transform: translate(0, -120px);";
        document.getElementsByClassName('listbtn-text')[0].innerText = "展开";
        bShowList = false;
        document.getElementsByClassName('listbtn')[0].style = "animation: listbtn-click 0.3s";
        setTimeout("document.getElementsByClassName('listbtn')[0].style = ''", 500);
    }
    if(bShowGameAdditional) {
        document.getElementsByClassName('startbtn-droplist')[0].style = "display: none;";
        bShowGameAdditional = false;
    }
    if(bShowSettings) {
        document.getElementById('settings').style = "transform: translate(-350px, 50%);";
        bShowSettings = false;
    }
})

document.getElementById('close-settings').addEventListener('click', () => {
    document.getElementById('settings').style = "transform: translate(-350px, 50%);";
    bShowSettings = false;
})

document.getElementsByClassName('controlbar-fullbtn')[0].addEventListener('click', () => {
    window.launcherAPI.maxWindow();
})

document.getElementsByClassName('controlbar-minibtn')[0].addEventListener('click', () => {
    window.launcherAPI.miniWindow();
})

document.getElementsByClassName('submit')[0].addEventListener('click', () => {
    window.launcherAPI.setPath(document.getElementById('genshinPath').value.replaceAll("\\", "/"), document.getElementById('starrailPath').value.replaceAll("\\", "/"));
})

document.getElementsByClassName('right-bottom-start-button')[0].addEventListener('click', () => {
    window.launcherAPI.openGame(gameNow);
})

document.getElementById('genshinSelector').addEventListener('click', async function() {
    await window.launcherAPI.selectFile().then((res) => {
        if(res) {
            document.getElementById('genshinPath').value = "\"" + res[0] + "\"";
        }
    })
})

document.getElementById('starrailSelector').addEventListener('click', async function() {
    await window.launcherAPI.selectFile().then((res) => {
        if(res) {
            document.getElementById('starrailPath').value = "\"" + res[0] + "\"";
        }
    })
})

document.getElementsByClassName('slide-right-btn')[0].addEventListener('click', () => {
    if(bCanSlide) {
        slideImgRight();
        setNotiBall();
        bCanSlide = 0;
    }
})

document.getElementsByClassName('slide-left-btn')[0].addEventListener('click', () => {
    if(bCanSlide) {
        slideImgLeft();
        setNotiBall();
        bCanSlide = 0;
    }
})

function slideImgRight() {
    slideImage.style = "margin-left: -" + ((currentImage + 1) * 100) + "%;"
    currentImage++;
    if(currentImage == 5) {
        setTimeout("slideImage.style = 'transition-duration: 0s; margin-left: -100%;';", 400);
        currentImage = 1;
    }
    setTimeout("bCanSlide = 1", 400);
}

function slideImgLeft() {
    slideImage.style = "margin-left: -" + ((currentImage - 1) * 100) + "%;"
    currentImage--;
    if(currentImage == 0) {
        setTimeout("slideImage.style = 'transition-duration: 0s; margin-left: -400%;';", 400);
        currentImage = 4;
    }
    setTimeout("bCanSlide = 1", 400);
}

function setNotiBall() {
    console.log(currentImage)
    let balls = document.getElementsByClassName('balls');
    for(i = 0; i < balls.length; i++) {
        balls[i].setAttribute("fill", "#ffffff");
    }
    document.getElementById('b' + currentImage).setAttribute("fill", "#ffc809");
}

function autoSlide() {
    if(bCanSlide) {
        slideImgRight();
        setNotiBall();
    }
    setTimeout("autoSlide();", 5000);
}

setTimeout("autoSlide();", 5000);
