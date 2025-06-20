import { contextBridge } from 'electron'

// Definiujemy interfejs dla naszego API
interface ElectronAPI {
  printHello: () => void
}

// Eksportujemy nasze API
const electronAPI: ElectronAPI = {
  printHello: () => {
    console.log('Hello from preload')
  }
}

// Eksponujemy API do window.electron
contextBridge.exposeInMainWorld('electron', electronAPI)

// Dla TypeScript - deklaracja typów
declare global {
  interface Window {
    electron: ElectronAPI
  }
}
