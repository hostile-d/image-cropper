const Jimp = require('jimp');
const path = require('path');
const url = require('url');

var formController = async function(req, res, next) {
    const url = req.body.imageUrl;
    const width = +req.body.imageWidth;
    const height = +req.body.imageHeight;
    const imageName = await cropImage(url, width, height);
    const imageUrl =
        req.protocol + '://' + req.get('host') + '/output/' + imageName;
    res.render('result', {
        title: 'Image Cropper',
        imageUrl
    });
};
async function cropImage(url, width, height) {
    if (!width) width = 600;
    if (!height) height = 600;

    const image = await Jimp.read(url);
    const name = url.match(/[^/\\&\?]+\.\w{3}(?=([\?&].*$|$))/gi)[0];
    await image.cover(width, height).writeAsync(`./public/output/${name}`);
    return name;
}
module.exports = formController;
