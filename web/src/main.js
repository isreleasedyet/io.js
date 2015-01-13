var github = require('./github'),
    view = require('./view'),
    Release = require('./release');

const INIT_DELAY = 1200;

const GH_OWNER = 'iojs';
const GH_REPO = 'io.js';

var page = null;

function handleFetchedData(err, res) {
    var data = res.data,
        release = null;

    if(data.length) {
        var lattest = data[0];
        release = new Release(lattest.name, lattest.tag_name, lattest.html_url);
    }

    view.update(page, { release });
}

function update() {
    github.getReleases({ owner : GH_OWNER, repo : GH_REPO }, handleFetchedData);
}

function init() {
    view.init(page);
    update();
}

function main() {
    page = document.querySelector('.page');
    setTimeout(init, INIT_DELAY);
}

main();
