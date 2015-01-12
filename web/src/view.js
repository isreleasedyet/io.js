const SPIN_TIME = 1300;

var IOJSORG_URL = 'https://iojs.org',
    IOJS_LINK = `<a class="link iojs" href="${IOJSORG_URL}">io.js<a/>`;

function updateNoRelease(root) {
    root.querySelector('.desc').innerHTML = `It seems that no ${IOJS_LINK} version has been released yet.`;
}

function updateRelease(root, { name, version, url }) {
    var versionLink = `<a class="link" href="${url}">${version}</a>`,
        content = `<p class="para">The most recent version of ${IOJS_LINK} is ${versionLink}.</p>`;
    root.querySelector('.main-content').innerHTML = content;
}

function updateView(root, ctx) {
    setTimeout(function() {
        var release = ctx.release;
        release == null?
            updateNoRelease(root) :
            updateRelease(root, release);
    }, SPIN_TIME);
}

exports.update = updateView;
