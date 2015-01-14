var jsonp = require('webmodules/jsonp');

const GH_HOST = 'github.com';
const GH_API_HOST = 'api.github.com';

exports.getReleaseUrl = function({ owner, repo }, releaseName) {
    return `https://${GH_HOST}/${owner}/${repo}/releases/${releaseName}`;
};

exports.getReleases = function({ owner, repo }, cb) {
    var url = `https://${GH_API_HOST}/repos/${owner}/${repo}/releases`;
    jsonp(url, cb);
};

exports.getTags = function({ owner, repo }, cb) {
    var url = `https://${GH_API_HOST}/repos/${owner}/${repo}/tags`;
    jsonp(url, cb);
};
