const electron = require('electron');
const {clipboard} = require('electron');
const {webContents} = require('electron');
// const settings = require('electron-settings');
var count = 0;

var clkPref = function (opt) {
  currentValue = opt.value;
  if (currentValue == 'preview') {
    $('#htmlPreview').hide();
    $('#markdown').show();
    $('#previewPanel').css('padding-top', '25px');
    $('#previewPanel').css('padding-right', '15px');
  } else if (currentValue == 'html') {
    $('#markdown').hide();
    $('#htmlPreview').show();
    $('#previewPanel').css('padding-top', '0px');
    $('#previewPanel').css('padding-right', '0px');
  }
  count = count + 1;
}

var formatHead = function() {
  var edit = $('#editArea');
  var toolbar = $('#toolbarArea');
  var toggle = $('#angleToolBar');
  var menu = $('#appMenu');
  var opt = $('#opt');
  var menuHeight = parseInt(menu.height());
  var editTop = 74;
  if($('#toolbarArea:hidden').length == 0) {
    editTop += 35;
  }
  if(menu.attr('class') == 'hidden') {
    opt.css({ top: '32px' });
    toolbar.css({ top: '74px' });
  } else {
    editTop += 19;
    opt.css({ top: '52px' });
    toolbar.css({ top: '93px' });
  }
  edit.css('padding-top', editTop);
}

var showToolBar = function() {
  var toolbar = $('#toolbarArea');
  var toggle = $('#angleToolBar');
  if($('#toolbarArea:hidden').length == 0) {
    toggle.attr('class', 'fa fa-angle-right');
    toggle.css('padding-left', '10px');
    toolbar.css('display', 'none');
  } else {
    toggle.attr('class', 'fa fa-angle-down');
    toggle.css('padding-left', '6px');
    toolbar.css('display', 'block');
  }
  formatHead();
};

function toggleMenu() {
    var menu = $('#appMenu');
    if(menu.attr('class') == 'hidden') {
        menu.attr('class', '');
        menu.css('visibility', 'visible');
        menu.css('height', '27px');
    } else {
        menu.attr('class', 'hidden');
        menu.css('visibility', 'hidden');
        menu.css('height', '0px');
    }
    formatHead();
}

function toggleFullscreen() {
    var electron = require('electron');
    var window = electron.remote.getCurrentWindow();
    if(window.isFullScreen())
      window.setFullScreen(false);
    else
      window.setFullScreen(true);
}

function toggleDeveloper() {
    var window = electron.remote.getCurrentWindow();
    window.toggleDevTools();
}

function toggleSidebar() {
    if($('#toggleSidebar:hidden').length == 0) {
        $('#side-button').show();
        $('#sidebar').hide();
    } else {
        $('#side-button').hide();
        $('#sidebar').show();
    }
}

function copySelected() {
    var content = "Text that will be now on the clipboard as text";
    clipboard.writeText(content);
}

function pasteSelected() {
    var content = clipboard.readText();
    alert(content);
}

function newFile() {
    electron.remote.getCurrentWindow().webContents.send('file-new');
}

function openFile() {
    electron.remote.getCurrentWindow().webContents.send('file-open');
}

function saveFile() {
    electron.remote.getCurrentWindow().webContents.send('file-save');
}

function saveFileAs() {
    electron.remote.getCurrentWindow().webContents.send('file-save-as');
}

function exportToPDF() {
    electron.remote.getCurrentWindow().webContents.send('file-pdf');
}

function selectMarkdown() {
    document.getElementById('previewPanel').focus();
}
// Generations and clean state of CodeMirror
var getGeneration = function () {
  return this.cm.doc.changeGeneration();
}

var setClean = function () {
  this.latestGeneration = this.getGeneration();
}

var isClean = function () {
  return this.cm.doc.isClean(this.latestGeneration);
}

// Update window title on various events
var updateWindowTitle = function (path) {
  var appName = "Hyde",
      isClean = this.isClean(),
      saveSymbol = "*",
      parsedPath,
      dir,
      title;

  if (path) {
    parsedPath = parsePath(path);
    dir = parsedPath.dirname || process.cwd();
    title = appName + " - " + path.toString();
    $('#bottom-file').html(parsedPath.basename);
  } else {
    title = appName;
    $('#bottom-file').html('New document');
  }
  if (!this.isClean()) {
    title = saveSymbol + title;
  }
  document.title = title;
  $('#title').html(title);
}

function openSettings() {
    var HydeSettings = require('./js/settingsMenu');
    HydeSettings();
}
