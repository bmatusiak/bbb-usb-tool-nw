var $ = global.$ = $;
var spawn = require('child_process').spawn

    function runCommand(cmd, done) {
        var c = cmd.split(" ");
        var Cmd = c.splice(0, 1);
        var runC = spawn(Cmd, c);
        var runCout = "";
        var runCerr = "";
	    
        if (!done) done = function() {};

        runC.stdout.on('data', function(data) {
            runCout += data.toString();
        });

        runC.stderr.on('data', function(data) {
            runCerr += data.toString();
        });

        runC.on('close', function(code) {
            alert(runCerr);
            alert(runCout);
            done();
        });
    }

var gui = require('nw.gui');
var win = gui.Window.get();

$(document).ready(function() {
    win.resizeTo(window.screen.availWidth, window.screen.availHeight);
});

var fs = require('fs');

function setupFiles(fpath) {
    fs.readdir(fpath, function(err, files) {
        if (err) throw err;
        for (var i in files) {
            var theFile = $('<button type="button" class="file btn btn-default btn-block" data-fpath="' + fpath + '">' + files[i] + '</button>');
            theFile.appendTo("#files");
            theFile.click(function() {
                $(".file").removeClass("btn-warning");
                $(this).addClass("btn-warning");
            });
        }
    });
}

setupFiles("/mnt/microsd");

$("#btn-ok").click(function() {
    var file = $(".file.btn-warning").data("fpath") + "/" + $(".file.btn-warning").text();
    //alert(file);
    runCommand("rmmod g_mass_storage", function() {
        $(".btn-primary").removeClass("btn-primary");

        runCommand("modprobe g_mass_storage file=" + file + " cdrom=1", function() {
            $(".file.btn-warning").removeClass("btn-warning").addClass("btn-primary");
        });
    })

})
