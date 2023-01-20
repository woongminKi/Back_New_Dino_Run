exports.postUser = (req, res, next) => {
    console.log("req::", req.body);
    console.log("user::", req.user);
    console.log("cookie::", res.cookie);
};
