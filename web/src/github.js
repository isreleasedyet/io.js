var jsonp = require('webmodules/jsonp');

const GH_HOST = 'api.github.com';

exports.getReleases = function({ owner, repo }, cb) {
    var url = `https://${GH_HOST}/repos/${owner}/${repo}/releases`;
    jsonp(url, cb);
};
