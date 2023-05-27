const glob = require("glob");
const importFresh = require('import-fresh');

let allOfThem = {};

// Get all Commands

glob.sync(`${__dirname}/allcmds/*.js`).forEach((file) => {
    allOfThem = { ...allOfThem, ...importFresh(file) };
});

glob.sync(`${__dirname}/bot/*.js`).forEach((file) => {
    allOfThem = { ...allOfThem, ...importFresh(file) };
});

glob.sync(`${__dirname}/downloader/*.js`).forEach((file) => {
    allOfThem = { ...allOfThem, ...importFresh(file) };
});

glob.sync(`${__dirname}/fun/*.js`).forEach((file) => {
    allOfThem = { ...allOfThem, ...importFresh(file) };
});

glob.sync(`${__dirname}/gaming/*.js`).forEach((file) => {
    allOfThem = { ...allOfThem, ...importFresh(file) };
});

glob.sync(`${__dirname}/leveling/*.js`).forEach((file) => {
    allOfThem = { ...allOfThem, ...importFresh(file) };
});

glob.sync(`${__dirname}/moderation/*.js`).forEach((file) => {
    allOfThem = { ...allOfThem, ...importFresh(file) };
});

glob.sync(`${__dirname}/nsfw/*.js`).forEach((file) => {
    allOfThem = { ...allOfThem, ...importFresh(file) };
});

glob.sync(`${__dirname}/premium/*.js`).forEach((file) => {
    allOfThem = { ...allOfThem, ...importFresh(file) };
});

glob.sync(`${__dirname}/team/*.js`).forEach((file) => {
    allOfThem = { ...allOfThem, ...importFresh(file) };
});

glob.sync(`${__dirname}/sticker/*.js`).forEach((file) => {
    allOfThem = { ...allOfThem, ...importFresh(file) };
});


module.exports = allOfThem;
