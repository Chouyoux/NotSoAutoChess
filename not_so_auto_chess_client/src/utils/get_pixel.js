const getPixel = function (img, x, y) {

    let canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    canvas.getContext('2d').drawImage(img, x, y, 1, 1, 0, 0, 1, 1);;
    let pixelData = canvas.getContext('2d').getImageData(0, 0, 1, 1).data;

    return pixelData;   
}

export default getPixel