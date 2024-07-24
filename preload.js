const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('launcherAPI', {
    maxWindow: () => ipcRenderer.send('maximize-window'),
    miniWindow: () => ipcRenderer.send('minimize-window'),
    openGame: (gameID) => ipcRenderer.send('openGame', gameID),
    setPath: (genshenPath, starrailPath) => ipcRenderer.send('setPath', genshenPath, starrailPath),
    selectFile: () => ipcRenderer.invoke('selectFile'),
    getPath: () => ipcRenderer.invoke('getPath')
})