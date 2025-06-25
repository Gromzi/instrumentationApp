import { app, BrowserWindow, nativeTheme } from 'electron'
import path from 'path'
import { isDev } from './util.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

app.whenReady().then(() => {
  nativeTheme.themeSource = 'dark'

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  const mainWindow = new BrowserWindow({
    width: 1800,
    minWidth: 1800,

    height: 1200,
    minHeight: 1200,

    center: true,
    autoHideMenuBar: true,
    enableLargerThanScreen: false,

    title: 'Instrumentacja utworów muzycznych',
    icon: path.join(app.getAppPath(), '/src/electron/icon.png'),

    webPreferences: {
      // preload: path.join(app.getAppPath(), '/dist-electron/preload.js'),
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
