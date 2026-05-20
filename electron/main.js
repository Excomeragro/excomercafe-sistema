const path = require('path');
const { pathToFileURL } = require('url');
const { app, BrowserWindow, Menu, dialog, shell } = require('electron');

let mainWindow;
let splashWindow;

function isDev() {
  return !app.isPackaged;
}

function appRootPath() {
  return isDev()
    ? path.join(__dirname, '..')
    : path.join(process.resourcesPath, 'www');
}

function createSplash() {

  const splashIcon = pathToFileURL(
    path.join(appRootPath(), 'favicon.png')
  ).toString();

  splashWindow = new BrowserWindow({
    width: 460,
    height: 280,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    show: false,
    backgroundColor: '#071827',
    icon: path.join(appRootPath(), 'favicon.ico')
  });

  const splashHtml = encodeURIComponent(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          *{box-sizing:border-box}

          body{
            margin:0;
            height:100vh;
            display:grid;
            place-items:center;
            font-family:Arial,sans-serif;
            color:#fff;
            background:linear-gradient(145deg,#071827,#0b2033);
          }

          .box{
            text-align:center;
          }

          img{
            width:72px;
            height:72px;
            object-fit:contain;
            border-radius:14px;
            background:#fff;
            padding:6px;
            margin-bottom:16px;
          }

          h1{
            margin:0;
            font-size:28px;
            letter-spacing:2px;
          }

          p{
            margin:8px 0 0;
            color:#cfe8dc;
            font-size:13px;
          }

          .bar{
            width:220px;
            height:6px;
            margin:24px auto 0;
            overflow:hidden;
            border-radius:999px;
            background:rgba(255,255,255,.14);
          }

          .bar::before{
            content:"";
            display:block;
            width:45%;
            height:100%;
            border-radius:999px;
            background:#22c55e;
            animation:load 1.1s ease-in-out infinite;
          }

          @keyframes load{
            0%{transform:translateX(-120%)}
            100%{transform:translateX(240%)}
          }
        </style>
      </head>

      <body>
        <div class="box">
          <img src="${splashIcon}" alt="">
          <h1>EXCOMERCAFE</h1>
          <p>Cargando sistema agrocomercial...</p>
          <div class="bar"></div>
        </div>
      </body>
    </html>
  `);

  splashWindow.loadURL(
    `data:text/html;charset=utf-8,${splashHtml}`
  );

  splashWindow.once('ready-to-show', () => {
    splashWindow.show();
  });
}

function createMainWindow() {

  mainWindow = new BrowserWindow({
    width: 1366,
    height: 820,
    minWidth: 1100,
    minHeight: 680,
    show: false,
    backgroundColor: '#f4f7fb',
    icon: path.join(appRootPath(), 'favicon.ico'),

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webSecurity: true
    }
  });

  mainWindow.loadFile(
    path.join(appRootPath(), 'index.html')
  );

  const template = [
    {
      label: 'Help',
      submenu: [

        {
          label: '📘 Manual rápido',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              title: 'Manual rápido',
              message: 'EXCOMERCAFE',
              detail:
                '• Guardar registros\n' +
                '• Sincronizar datos\n' +
                '• Exportar Excel/PDF\n' +
                '• Imprimir comprobantes\n' +
                '• Crear respaldos'
            });
          }
        },

        {
          label: '🌐 Página web',
          click: () => {
            shell.openExternal(
              'https://skobar31sv-pixel.github.io/excomercafe-sistema/'
            );
          }
        },

        {
          label: '☎️ Soporte técnico',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              title: 'Soporte técnico',
              message: 'EXCOMERCAFE',
              detail:
                'Sistema Administrativo\n\n' +
                'Contacto:\nAdministrador del sistema'
            });
          }
        },

        {
          label: '🔄 Buscar actualizaciones',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              title: 'Actualizaciones',
              message: 'El sistema está actualizado.'
            });
          }
        },

        { type: 'separator' },

        {
          label: 'ℹ️ Acerca de EXCOMERCAFE',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              title: 'Acerca de',
              message: 'EXCOMERCAFE',
              detail:
                'Versión 1.0.1\n' +
                'Sistema Administrativo\n\n' +
                'Desarrollado con Electron'
            });
          }
        }

      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.once('ready-to-show', () => {

    if (
      splashWindow &&
      !splashWindow.isDestroyed()
    ) {
      splashWindow.close();
    }

    mainWindow.show();
    mainWindow.focus();

  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {

    if (/^https?:\/\//i.test(url)) {

      shell.openExternal(url);

      return {
        action: 'deny'
      };
    }

    return {
      action: 'allow'
    };
  });
}

app.whenReady().then(() => {

  app.setAppUserModelId(
    'com.excomercafe.sistema'
  );

  createSplash();

  createMainWindow();

});

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit();
  }

});

app.on('activate', () => {

  if (
    BrowserWindow.getAllWindows().length === 0
  ) {

    createSplash();

    createMainWindow();
  }

});
