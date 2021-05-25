module.exports = app => {
    const fs = require("fs");
    const path = require("path");

    const listenersPath = path.resolve(__dirname);

    fs.readdir(listenersPath, (err, files) => {
        if (err) {
            process.exit(1);
        }

        files.map(fileName => {
            if (fileName !== "index.js") {
                console.debug("Initializing http route at: %s", fileName);
                const route = require(path.resolve(__dirname, fileName));
                route(app);
            }
        });
    });
};
