import { app, BrowserWindow, nativeTheme } from 'electron'
import path from 'path'
import { isDev } from './util.js'

app.whenReady().then(() => {
  nativeTheme.themeSource = 'dark'

  const mainWindow = new BrowserWindow({
    width: 1400,
    minWidth: 1400,

    height: 1200,
    minHeight: 1200,

    center: true,

    title: 'Instrumentacja utworów muzycznych',
    icon: path.join(app.getAppPath(), '/src/electron/icon.png'),

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
