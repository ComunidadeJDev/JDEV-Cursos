const jwt = require("jsonwebtoken");
const JWTsecret = "asjnvahowiefsdnvjwqareifdsvnaqfasfasgasdfagbvwware";

function auth(req, res, next) {
    const authToken = req.headers['authorization'];

    if (!authToken) {
        res.status(401).json({error: "invalid Token"});
    } else {
        const bearer = authToken.split(' ');
        const token = bearer[1];

        jwt.verify(token, JWTsecret, (err, data) => {
            if (err) {
                res.status(401).json({error: "invalid Token"});
            } else {
                req.token = token;
                next();
            };
        });
    };
};

module.exports = auth;
