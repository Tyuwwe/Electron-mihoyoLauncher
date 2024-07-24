const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const exec = require('child_process').exec
const path = require('node:path')
const Store = require('electron-store')

let bFullScreen = false;
let openedGame = null;
let bFirstTimeLaunch = false;
let genshin_path = "";
let starrail_path = "";

const store = new Store({});

if(store.has('launcherSettings')) {
    genshin_path = store.get("launcherSettings").genshin_gamepath;
    starrail_path = store.get("launcherSettings").starrail_gamepath;
    console.log('get path: ' + genshin_path + " | " + starrail_path);
}
else {
    console.log('first time start, configuring');
    bFirstTimeLaunch = true;
    store.set(
        'launcherSettings', {
        genshin_gamepath: "unset",
        starrail_gamepath: "unset"
    })
}

function createWindow() {
    const mainwin = new BrowserWindow({
        width: 1280,
        height: 720,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainwin.setAspectRatio(16 / 9);
    mainwin.loadFile('index.html')


    ipcMain.on('maximize-window', function () {
        if (bFullScreen) {
            mainwin.unmaximize();
        }
        else {
            mainwin.maximize();
        }
        bFullScreen = !bFullScreen;
    })

    ipcMain.on('minimize-window', function () {
        mainwin.minimize();
    })

    ipcMain.on('setPath', function (event, genshinPath, starrailPath) {
        genshin_path = genshinPath;
        starrail_path = starrailPath;
        store.set(
            'launcherSettings', {
            genshin_gamepath: genshinPath,
            starrail_gamepath: starrailPath
        })
        console.log(store.path);
    })

    ipcMain.on('openGame', function (event, gameID) {
        console.log('opening game, gameID: ' + gameID);
        if (gameID == '0') {
            openedGame = exec(genshin_path, {});
        }
        else if (gameID == '1') {
            openedGame = exec(starrail_path, {});
        }
    })

    ipcMain.handle('selectFile', async function () {
        let result = await dialog.showOpenDialog({ properties: ['openFile'] }).then(result => {
            console.log(result);
            if(result.canceled) {
                return 0;
            }
            return result.filePaths;
        })
        return result;
    })

    ipcMain.handle('getPath', () => {
        let path_array = [genshin_path, starrail_path]
        return path_array;
    })
}


app.whenReady().then(() => {

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

