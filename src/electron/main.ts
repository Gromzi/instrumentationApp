import { app, BrowserWindow } from 'electron'
import path from 'path'
import { isDev } from './util.js'

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 580,
    minWidth: 580,

    height: 640,
    minHeight: 640,

    center: true,

    title: 'Wybieranie instrumentacji',

    webPreferences: {
      preload: path.join(app.getAppPath(), '/dist-electron/preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  if (isDev()) {
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL('http://localhost:5123')
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'))
  }
})
