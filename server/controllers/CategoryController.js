const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const slugify = require("slugify");
const auth = require("../middleware/auth");

router.get("/categories", (req, res) => {
    let HATEOAS = [
        {
            href: "http://localhost:3000/categories",
            method: "POST",
            rel: "create_category"
        },
        {
            href: "http://localhost:3000/login",
            method: "POST",
            rel: "login"
        }
    ];

    Category.findAll()
        .then((categories) => {
            if (!categories) {
                res.status(400).json({ error: "an internal error occurred" });
            } else {
                res.status(200).json({ categories: categories, _links: HATEOAS });
            };
        }).catch((error) => {
            res.status(400).json({ error: error });
        });
});

router.get("/categories/:id", (req, res) => {
    const id = req.params.id;

    let HATEOAS = [
        {
            href: "http://localhost:3000/categories",
            method: "GET",
            rel: "get_all_categories"
        },
        {
            href: "http://localhost:3000/categories" + id,
            method: "GET",
            rel: "get_category"
        },
        {
            href: "http://localhost:3000/categories",
            method: "POST",
            rel: "create_category"
        },
        {
            href: "http://localhost:3000/categories",
            method: "PUT",
            rel: "update_category"
        },
        {
            href: "http://localhost:3000/categories/" + id,
            method: "DELETE",
            rel: "delete_category"
        }
    ];

    if (isNaN(id)) {
        res.status(400).json({ error: "id invalid" });
    } else {
        Category.findOne({ where: { id: id } })
            .then((category) => {
                if (!category) {
                    res.status(404).json({ error: "categoty not found" });
                } else {
                    res.status(200).json({ category: category, _links: HATEOAS });
                };
            }).catch((error) => {
                res.status(400).json({ error: error });
            });
    };
});

router.post("/categories", auth, (req, res) => {
    const title = req.body.title;

    let HATEOAS = [
        {
            href: "http://localhost:3000/categories",
            method: "GET",
            rel: "get_all_categories"
        },
        {
            href: "http://localhost:3000/categories",
            method: "POST",
            rel: "create_category"
        },
        {
            href: "http://localhost:3000/categories",
            method: "PUT",
            rel: "update_category"
        }
    ];

    if (!title) {
        res.status(422).json({ error: "invalid name" });
    } else {
        Category.create({
            title: title,
            slug: slugify(title)
        })
            .then((response) => {
                if (!response) {
                    res.status(400).json({ error: "An error occurred while creating the category" });
                } else {
                    res.status(201).json({ message: "registered category", _links: HATEOAS });
                }
            }).catch((error) => {
                res.status(400).json({ error: error });
            });
    };
});

router.put("/categories", auth, (req, res) => {
    const id = req.body.id;
    const title = req.body.title;

    let HATEOAS = [
        {
            href: "http://localhost:3000/categories",
            method: "GET",
            rel: "get_all_categories"
        },
        {
            href: "http://localhost:3000/categories" + id,
            method: "GET",
            rel: "get_category"
        },
        {
            href: "http://localhost:3000/categories",
            method: "POST",
            rel: "create_category"
        },
        {
            href: "http://localhost:3000/categories",
            method: "PUT",
            rel: "update_category"
        },
        {
            href: "http://localhost:3000/categories/" + id,
            method: "DELETE",
            rel: "delete_category"
        }
    ];

    if (!id || isNaN(id) || !title) {
        res.status(400).json({ error: "an internal error occurred" });
    } else {
        Category.findOne({ where: { id: id } })
            .then((category) => {
                if (!category) {
                    res.status(404).json({ error: "category not found" });
                } else {
                    Category.update({ title: title, slug: slugify(title) }, { where: { id: id } })
                        .then((response) => {
                            if (response != undefined) {
                                res.status(200).json({ message: "category updated", _links: HATEOAS });
                            } else {
                                res.status(400).json({ message: "an internal error occurred" });
                            };
                        }).catch((err) => {
                            res.status(400).json({ message: "an internal error occurred" });
                        });
                };
            }).catch((err) => {
                res.status(400).json({ error: err });
            });
    };
});

router.delete("/categories/:id", auth, (req, res) => {
    const id = parseInt(req.params.id);

    let HATEOAS = [
        {
            href: "http://localhost:3000/categories",
            method: "GET",
            rel: "get_all_categories"
        },
        {
            href: "http://localhost:3000/categories",
            method: "POST",
            rel: "create_category"
        }
    ];

    if (!id || isNaN(id)) {
        res.status(400).json({ error: "an internal error occurred" });
    } else {
        Category.findOne({ where: { id: id } })
            .then(category => {
                if (!category) {
                    res.status(404).json({ error: "category is not found" });
                } else {
                    Category.destroy({ where: { id: id } })
                        .then((response) => {
                            res.status(200).json({ message: "game deleted", _links: HATEOAS });
                        }).catch((error) => {
                            res.status(404).json(error);
                        });
                };
            }).catch(err => {
                res.status(400).json({ error: "an internal error occurred" });
            });
    };
});

module.exports = router;