const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "mydb"
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

//Handle route
ipcMain.on('route',function(event,data){
  //console.log(data);
  BrowserWindow.fromWebContents(event.sender).loadFile(path.join(__dirname, data));
});

//Handle user:add event
ipcMain.handle("user:add",function(evt,data){
  return new Promise((resolve, reject)=>{
    connection.execute(
      `INSERT INTO users VALUES(null,?,'123456',?,now(),now(),?,?)`,
      [...data],
      function (err, result) {
        if (err){
          reject(err);
        }
        else{
          resolve(result);
        }
      }
    );
  });
});

//Handle user:list event
ipcMain.handle("user:list",function(evt,data){
  return new Promise((resolve, reject)=>{
    connection.execute(
      `SELECT * FROM users LEFT JOIN roles ON users.RoleID = roles.RoleID LIMIT ${data[0]},10`,
      [],
      function (err, result) {
        if (err){
          reject(err);
        }
        else{
          resolve(result);
        }
      }
    );
  });
});

//Handle user:count event
ipcMain.handle("user:count",function(evt,page){
  return new Promise((resolve, reject)=>{
    connection.execute(
      `SELECT count(UserID) as count from users;`,
      [],
      function (err, result) {
        if (err){
          reject(err);
        }
        else{
          resolve(result);
        }
      }
    );
  });
});

//Handle user:get event
ipcMain.handle("user:get",function(evt,id){
  return new Promise((resolve, reject)=>{
    connection.execute(
      `SELECT * FROM users where UserID=?`,
      [id],
      function (err, result) {
        if (err){
          reject(err);
        }
        else{
          resolve(result);
        }
      }
    );
  });
});

//Handle user:update event
ipcMain.handle("user:update",function(evt,data){
  return new Promise((resolve, reject)=>{
    connection.execute(
      `UPDATE users SET Login='${data[0]}', UserName = '${data[1]}', Disabled=${data[2]}, RoleID=${data[3]}, LastUpdated=NOW() WHERE UserID=${data[4]}`,
      [],
      function (err, result) {
        if (err){
          reject(err);
        }
        else{
          resolve(result);
        }
      }
    );
  });
});

//Handle user:delete event
ipcMain.handle("user:delete",function(evt,id){
  return new Promise((resolve, reject)=>{
    connection.execute(
      `DELETE FROM users WHERE UserID=${id}`,
      [],
      function (err, result) {
        if (err){
          reject(err);
        }
        else{
          resolve(result);
        }
      }
    );
  });
});

//Handle role:list event
ipcMain.handle("role:list",function(evt){
  return new Promise((resolve, reject)=>{
    connection.execute(
      `SELECT * FROM roles`,
      [],
      function (err, result) {
        if (err){
          reject(err);
        }
        else{
          resolve(result);
        }
      }
    );
  });
});

//Handle role:add event
ipcMain.handle("role:add",function(evt,data){
  return new Promise((resolve, reject)=>{
    connection.execute(
      `INSERT INTO roles VALUES(null,?,?)`,
      [...data],
      function (err, result) {
        if (err){
          reject(err);
        }
        else{
          resolve(result);
        }
      }
    );
  });
});

//Handle role:count event
ipcMain.handle("role:count",function(evt,page){
  return new Promise((resolve, reject)=>{
    connection.execute(
      `SELECT count(RoleID) as count from roles;`,
      [],
      function (err, result) {
        if (err){
          reject(err);
        }
        else{
          resolve(result);
        }
      }
    );
  });
});

//Handle role:get event
ipcMain.handle("role:get",function(evt,id){
  return new Promise((resolve, reject)=>{
    connection.execute(
      `SELECT * FROM roles where RoleID=?`,
      [id],
      function (err, result) {
        if (err){
          reject(err);
        }
        else{
          resolve(result);
        }
      }
    );
  });
});

//Handle role:update event
ipcMain.handle("role:update",function(evt,data){
  return new Promise((resolve, reject)=>{
    connection.execute(
      `UPDATE roles SET RoleName='${data[0]}', Description = '${data[1]}' WHERE RoleID=${data[2]}`,
      [],
      function (err, result) {
        if (err){
          reject(err);
        }
        else{
          resolve(result);
        }
      }
    );
  });
});

//Handle role:delete event
ipcMain.handle("role:delete",function(evt,id){
  return new Promise((resolve, reject)=>{
    connection.execute(
      `DELETE FROM roles WHERE RoleID=${id}`,
      [],
      function (err, result) {
        if (err){
          reject(err);
        }
        else{
          resolve(result);
        }
      }
    );
  });
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  //app.applicationMenu = null;
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
