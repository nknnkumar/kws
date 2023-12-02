var path = require('path');

let GetFunc = (req, res, next) => {
    res.sendFile(path.join(__dirname + `/../public/ws1.html`));
};

module.exports = {
    GetFunc
};
