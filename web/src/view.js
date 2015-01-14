var afterTransition = require('anthonyshort/after-transition');

const SPIN_TIME = 1700;

var IOJSORG_URL = 'https://iojs.org',
    IOJS = `<a class="link iojs" href="${IOJSORG_URL}">io.js</a>`;

function updateElem(domElem, content) {
    domElem.classList.add('hidden');
    afterTransition.once(domElem, function() {
        domElem.innerHTML = content;
        domElem.classList.remove('hidden');
    });
}

function updateNoRelease(root) {
    var content = `It seems that no ${IOJS} version has been released yet.`;
    updateElem(root.querySelector('.desc'), content);
}

function updateRelease(root, { name, version, url }) {
    var versionLink = `<a class="link version" href="${url}">${version}</a>`,
        content = `The most recent ${IOJS} release is ${versionLink}`,
        contentHtml = `<p class="para release">${content}</p>`;
    updateElem(root.querySelector('.main-content'), contentHtml);
}

function updateView(root, ctx) {
    setTimeout(function() {
        var release = ctx.release;
        release == null?
            updateNoRelease(root) :
            updateRelease(root, release);
    }, SPIN_TIME);
}

function initView(root) {
    root.classList.add('js');
}

module.exports = {
    init : initView,
    update : updateView
};
