var github = require('./github'),
    view = require('./view');

const GH_OWNER = 'iojs';
const GH_REPO = 'io.js';
//const GH_OWNER = 'bem';
//const GH_REPO = 'bem-core';

class Release {
    constructor(name, version, url) {
        this.name = name;
        this.version = version;
        this.url = url;
    }
}

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

function main() {
    page = document.querySelector('.page');
    page.classList.add('js');

    update();
}

main();
