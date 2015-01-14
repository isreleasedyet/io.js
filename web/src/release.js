var github = require('./github');

const MAX_RETRIES = 2;

class Release {
    constructor(name, version, url) {
        this.name = name;
        this.version = version;
        this.url = url;
    }
}

exports.getReleases = function(params, cb) {
    var retries = MAX_RETRIES;

    function onRelease(latest) {
        if(latest == null) {
            if(--retries) {
                getTags();
                return;
            }
        }

        var release = createRelease(latest, params);
        cb(release);
    }

    function onData(err, data) {
        handleFetchedData(err, data, onRelease);
    }

    function getTags() {
        github.getTags(params, onData);
    }

    function getReleases() {
        github.getReleases(params, onData);
    }

    getReleases();
};

function createRelease(release, params) {
    var { name, version, url } = release;
    if(typeof url === 'undefined') {
        url = github.getReleaseUrl(params, name);
    }

    if(typeof version === 'undefined') {
        version = name.replace(/-release$/, '');
    }

    return new Release(name, version, url);
}

function handleFetchedData(err, res, onSuccess) {
    var data = res.data;
    onSuccess(data.length? data[0] : null);
}
