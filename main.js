global.$ = $;

var gui = require('nw.gui');
var win = gui.Window.get();

$(document).ready(function() {
    win.resizeTo(window.screen.availWidth,window.screen.availHeight);
});
