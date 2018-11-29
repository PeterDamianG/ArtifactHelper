'use strict';
const { app, BrowserWindow, globalShortcut, Menu } = require('electron');
const updatejson = require('./updatejson.js');
let win; //Windows Global Instance is necessary.
function createWindow () {
  //Create a new windows.
  win = new BrowserWindow({
    webPreferences: {
      devTools: false,
    },
    title: 'Artifact Helper',
    minWidth: 800,
    minHeight: 600,
    width: 1024,
    height: 768,
    maxWidth: 1920,
    maxHeight: 1080,
    backgroundColor: '#2e2c29',
    fullscreenable: true,
    icon: 'img/favicon.png',
    autoHideMenuBar: true,
    show: false,
  });
  //Charged main panel.
  win.loadFile('index.html');
  win.once('ready-to-show', () => {
    win.show()
  })
  updatejson.updateAll();
  win.on('closed', () => {
    win = null;
  });
  //Maked ShortCuts Globales
  globalShortcut.register('CommandOrControl+Alt+P', () => {win.loadFile('index.html')});
  globalShortcut.register('CommandOrControl+Alt+N', () => {win.loadFile('news.html')});
  globalShortcut.register('CommandOrControl+Alt+L', () => {win.loadFile('changelogs.html')});
  globalShortcut.register('CommandOrControl+Alt+D', () => {win.loadFile('deckscards.html')});
  globalShortcut.register('CommandOrControl+Alt+S', () => {win.loadFile('statistics.html')});
  globalShortcut.register('CommandOrControl+Alt+C', () => {win.loadFile('config.html')});
  globalShortcut.register('CommandOrControl+Alt+A', () => {win.loadFile('about.html')});
  globalShortcut.register('CommandOrControl+Alt+Q', () => {app.quit();});
  //Maked Menu In-APP
  const template = [
    {
      label: 'Section',
      submenu: [
        {
          label: 'Main',
          sublabel: 'Go to Main Section',
          click () {win.loadFile('index.html');}
        },
        {
          label: 'News',
          sublabel: 'Go to News Section',
          click () {win.loadFile('news.html');}
        },
        {
          label: 'ChangeLogs',
          sublabel: 'Go to ChangeLogs Section',
          click () {win.loadFile('changelogs.html');}
        },
        {
          label: 'Statistics',
          sublabel: 'Go to Statistics Section',
          click () {win.loadFile('statistics.html');}
        },
        {
          label: 'Configuration',
          sublabel: 'Go to Configuration Section',
          click () {win.loadFile('config.html');}
        },
        {
          label: 'About',
          sublabel: 'Go to About Section',
          click () {win.loadFile('about.html');}
        },
        {type: 'separator'},
        { 
          label: 'Exit',
          sublabel: 'Close APP',
          role: 'quit'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {role: 'copy'},
        {role: 'paste'},
        {type: 'separator'},
        {role: 'selectall'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        //{role: 'toggleDevTools'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'About App More',
          sublabel: 'Go to GitHub',
          click () {require('electron').shell.openExternal('https://github.com/PeterDamianG/ArtifactHelper')}
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
app.on('ready', createWindow);
//app.disableHardwareAcceleration() This function need app is ready. For next version.
app.on('window-all-closed', () => {// MacOS
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // MacOS
  if (win === null) {
    createWindow();
  }
});


