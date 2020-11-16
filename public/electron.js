const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

function createWindow () {
	const win = new BrowserWindow({
		width: 1200,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
		frame: false,
		backgroundColor: "#233b5c",
	});

	win.loadURL(isDev
		? "http://localhost:3000"
		: `file://${path.join(__dirname, "../build/index.html")}`
	);
	win.webContents.openDevTools({
		mode: "right"
	});
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
