const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('EXCOMERCAFE_DESKTOP', {
  platform: process.platform,
  version: '1.0.0',
  isDesktop: true
});
