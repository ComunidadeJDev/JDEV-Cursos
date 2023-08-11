const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTsecret = "asjnvahowiefsdnvjwqareifdsvnaqfasfasgasdfagbvwware";
const auth = require("../middleware/auth");

router.get("/users", auth, (req, res) => {
    User.findAll()
        .then(users => {
            if (!users) {
                res.status(400).json({error: "an internal error occurred."});
            } else {
                res.status(200).json(users);
            }
        })
        .catch(err => {
            res.status(400).json({error: "an internal error occurred: " + err});
        })
});

router.get("/users/:id", auth, (req, res) => {
    const id = req.params.id;

    if (!id || isNaN(id)) {
        res.status(400).json({error: "an internal error occurred."});
    } else {
        User.findOne({where: {id: id}})
            .then(user => {
                if (!user) {
                    res.status(404).json({error: "user is not found."});
                } else {
                    res.status(200).json(user);
                }
            })
            .catch(err => {
                res.status(400).json({error: "an internal error occurred: " + err});
            });
    };
});

router.post("/users", (req, res) => {
    const {body} = req;

    if (!body.name || !body.email || !body.password) {
        res.status(400).json({error: "you cannot enter blank fields"})
    } else {
        const salt = bcrypt.genSaltSync(10);

        User.findOne({where: {email: body.email}})
            .then(user => {
                if (!user) {
                    User.create({
                        name: body.name,
                        email: body.email,
                        password: bcrypt.hashSync(body.password, salt)
                    })
                    .then(() => {
                        res.status(200).json({msg: "user created"});
                    })
                    .catch((err) => {
                        res.status(400).json({error: "an internal error occurred: " + err });
                    });
                } else {
                    res.status(400).json({error: "email already exists"});
                }
            })

        
    };
});

router.delete("/users/:id", auth, (req, res) => {
    const id = req.params.id;

    if (!id || isNaN(id)) {
        res.status(400).json({error: "invalid id"});
    } else {
        User.destroy({where: {id: id}})
            .then(() => {
                res.status(200).json({msg: "user deleted."});
            })
            .catch(err => {
                res.status(400).json({error: "an internal error occurred: " + err });
            });
    };
});

router.post("/login", (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400).json({error: "invalid credentials"});
    } else {
        User.findOne({where: {email: email}})
            .then(user => {
                if (!user) {
                    res.status(404).json({error: "user is not found."});
                } else {
                    if (bcrypt.compareSync(password, user.password)) {

                        jwt.sign({id: user.id, email: user.email}, JWTsecret, {expiresIn: '24h'}, (err, token) => { //payload
                            if (err) {
                                res.status(400).json({error: "an internal error occurred: " + err })
                            } else {
                                res.status(200).json({token: token});
                            };
                        });

                    } else {
                        res.status(400).json({error: "invalid credentials"});
                    }
                }
            })
            .catch(err => {
                res.status(400).json({error: "an internal error occurred: " + err });
            })
    }
})


module.exports = router;