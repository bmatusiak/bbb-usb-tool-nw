var $ = global.$ = $;
var spawn = require('child_process').spawn

function runCommand(cmd,done){
    var runC    = spawn('ls', ['-lh', '/usr']);
    var runCout = "";
    var runCerr = "";
    
    if(!done) done = function(){}
    
    runC.stdout.on('data', function (data) {
        runCout += data.toString();
    });

    ls.stderr.on('data', function (data) {
        runCerr += data.toString();
    });

    ls.on('close', function (code) {
       done();
    });
}

var gui = require('nw.gui');
var win = gui.Window.get();

$(document).ready(function() {
    win.resizeTo(window.screen.availWidth,window.screen.availHeight);
});

var fs = require('fs');

setupFiles(path){
    ls.readdir(path, function (err, files) {
      if (err) throw err;
      for(var i in files){
        var theFile = $('<button type="button" class="file btn btn-default btn-block" data-path="'+path+'">'+files[i]+'</button>');
        theFile.appendTo("#files");
        theFile.click(function(){
            $(".file").removeClass("btn-warning");
            $(this).addClass("btn-warning");
        });
      }
    });
}

setupFiles("/mnt/microsd");

$("#btn-ok").click(function(){
    $(".btn-primary").removeClass("btn-primary");
    file = $(".file.btn-warning").data("path")+"/"+$(".file.btn-warning").text();
    alert(file);
    $(".file.btn-warning").removeClass("btn-warning").addClass("btn-primary");
    
    
})
