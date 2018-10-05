var path = require("path");
var fs = require('fs');
var data = {};
var cheerio = require('cheerio');
var showdown = require('showdown');
var converter = new showdown.Converter();
var pages = [];

function cleanup(str, stripCommas = 0) {
    if (str == undefined) {
        str = "";
    } else {
        if (stripCommas == 1) {
            str = str.replace(/,/g, ' '); // Replace all commas with spaces.
        }
        if (stripCommas == 2) { // Replace all punctuation with spaces.
            str = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/, ' ');
        }
        str = $('<textarea />').html(str).text(); // Unescape html entities.
        str = str.replace(/\s\s+/g, ' '); // Replace tabs, newlines and multiple spaces with 1 space.
    }
    return str;
}

function removeYaml(str) {
    if (str == undefined) {
        str = "";
    }
    if (str.startsWith("---\n")) {
        return str
            .split("---\n")
            .slice(2)
            .join("---\n")
            .split(/\{%[^%]*%\}/)
            .join("");
    }
    return str;
}

function handleDir(dir, files) {
    files.forEach(function(file) {
        var node = path.join(dir, file);
        fs.stat(node, function(err, stats) {
            if (stats.isDirectory()) {
                handleDir(node, fs.readdirSync(node));
                return;
            } else if (path.extname(node) === ".md") {
                fs.readFile(node, function(err, data) {
                    var html = converter.makeHtml(removeYaml(data.toString()));
                    $ = cheerio.load(html);
                    var body = $('h1,h2,p,table,div').map(function(i, el) {
                        return $(this).text()
                    }).get().join(' ');
                    var parts = dir.split("/");
                    var enclosing = parts[parts.length - 1];
                    var b = cleanup(body);
                    pages.push({
                        title: cleanup(enclosing),
                        text: b,
                        excerpt: b.substring(0, 250),
                        tags: cleanup($('meta[name="keywords"]').attr('content'), 1),
                        url: ("/" + dir.substring(72)).split("/").map(s => encodeURIComponent(s)).join("/")
                    });
                });
            }
        });
    });
}

handleDir(__dirname, fs.readdirSync(__dirname));
setTimeout(() => fs.writeFile('assets/js/lunr/lunr-store.js', 'var store = ' + JSON.stringify(pages), function(err) {}), 1000);