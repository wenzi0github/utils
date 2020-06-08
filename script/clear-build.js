const fs = require("fs");
const path = require("path");
const packageConfig = require("../package");

packageConfig.files.forEach((file) => {
    const filePath = path.resolve(__dirname, "../", file);
    fs.unlink(filePath, (error) => {
        if (error) {
            console.log("delete error: " + filePath);
            console.log(error);
        } else {
            console.log("delete success");
        }
    });
});
