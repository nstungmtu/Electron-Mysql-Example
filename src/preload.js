// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const {contextBridge, ipcRenderer}= require('electron');
contextBridge.exposeInMainWorld(
    "ElectronAPI",
    {
        IPCInvoke: (channel,data)=>ipcRenderer.invoke(channel,data),
        IPCSend: (channel,data) => ipcRenderer.send(channel,data)
    }
);