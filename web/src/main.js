var github = require('./github'),
    view = require('./view'),
    release = require('./release');

const INIT_DELAY = 1200;

const GH_OWNER = 'iojs';
const GH_REPO = 'io.js';

var page = null;

function handleFetchedData(release) {
    view.update(page, { release });
}

function update() {
    release.getReleases({ owner : GH_OWNER, repo : GH_REPO }, handleFetchedData);
    //github.getReleases(, handleFetchedData);
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
