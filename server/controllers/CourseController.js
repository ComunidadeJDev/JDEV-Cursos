const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const Category = require("../models/Category");
const auth = require("../middleware/auth");
const { Op } = require("sequelize");

router.get("/courses", (req, res) => {
    let HATEOAS = [
        {
            href: "http://localhost:3000/courses",
            method: "GET",
            rel: "get_all_courses"
        },
        {
            href: "http://localhost:3000/courses",
            method: "POST",
            rel: "create_course"
        },
        {
            href: "http://localhost:3000/login",
            method: "POST",
            rel: "login"
        }
    ];

    Course.findAll()
        .then(courses => {
            res.status(200).json({courses: courses, _links: HATEOAS});
        }).catch(er => {
            res.status(400).json({ error: err });
        });
});

router.get("/courses/:id", (req, res) => {
    const id = req.params.id;

    let HATEOAS = [
        {
            href: "http://localhost:3000/courses",
            method: "GET",
            rel: "get_all_courses"
        },
        {
            href: "http://localhost:3000/courses" + id,
            method: "GET",
            rel: "get_course"
        },
        {
            href: "http://localhost:3000/courses",
            method: "POST",
            rel: "create_course"
        },
        {
            href: "http://localhost:3000/courses",
            method: "PUT",
            rel: "update_course"
        },
        {
            href: "http://localhost:3000/courses/" + id,
            method: "DELETE",
            rel: "delete_course"
        }
    ];

    if (!id || isNaN(id)) {
        res.status(400).json({ error: "id invalid." });
    } else {
        Course.findOne({ where: { id: id } })
            .then((course) => {
                if (!course) {
                    res.status(404).json({ error: "course not found." });
                } else {
                    res.status(200).json({course: course, _links: HATEOAS});
                };
            }).catch((err) => {
                res.status(400).json({ error: err });
            });
    };
});

router.get("/courses/search/:category", (req, res) => {
    const category = req.params.category;

    let HATEOAS = [
        {
            href: "http://localhost:3000/courses",
            method: "GET",
            rel: "get_all_courses"
        },
        {
            href: "http://localhost:3000/courses/search/" + category,
            method: "GET",
            rel: "get_course_category"
        },
        {
            href: "http://localhost:3000/courses",
            method: "POST",
            rel: "create_course"
        },
        {
            href: "http://localhost:3000/courses",
            method: "PUT",
            rel: "update_course"
        },
    ];

    if (!category || isNaN(category)) {
        res.status(400).json({ error: "invalid category id" });
    } else {
        Category.findOne({ where: { id: category } })
            .then(category => {
                if (!category) {
                    res.status(404).json({ error: "category not found." });
                } else {
                    Course.findAll({ where: { categoryId: category } })
                        .then(categories => {
                            res.status(200).json({categories: categories, _links: HATEOAS});
                        }).catch(err => {
                            res.status(400).json({ error: "an internal error occurred: " + err });
                        });
                };
            }).catch(err => {
                res.status(400).json({ error: "an internal error occurred: " + err });
            });
    };
});

router.post("/courses", auth, (req, res) => {
    const requiredFields = ["title", "subTitle", "description", "image", "creator", "assessments", "releaseYear", "amountHours",
        "downloadableResouces", "amountExercises", "certificate", "lifetimeAccess", "price", "language"];

    const numbersFields = ["assessments", "amountHours", "downloadableResouces", "amountExercises", "price", "categoryId"];

    const { body } = req;
    const missingFields = requiredFields.filter(fields => !body[fields]);
    const notNumbers = numbersFields.filter(fields => isNaN(body[fields]));

    let HATEOAS = [
        {
            href: "http://localhost:3000/courses",
            method: "GET",
            rel: "get_all_courses"
        },
        {
            href: "http://localhost:3000/courses",
            method: "POST",
            rel: "create_course"
        },
    ];

    if (missingFields.length > 1 || notNumbers.length > 1) {
        res.status(400).json({ error: "Missing required fields: " + missingFields.join(", ") + ", " + notNumbers.join(", ") });
    } else {
        Category.findOne({ where: { id: body.categoryId } })
            .then((category) => {
                if (!category) {
                    res.status(404).json({ error: "category not found" });
                } else {

                    Course.create({
                        title: body.title,
                        subTitle: body.subTitle,
                        description: body.description,
                        image: body.image,
                        duration: body.duration,
                        creator: body.creator,
                        assessments: body.assessments,
                        releaseYear: body.releaseYear,
                        amountHours: body.amountHours,
                        downloadableResouces: body.downloadableResouces,
                        amountExercises: body.amountExercises,
                        certificate: body.certificate,
                        lifetimeAccess: body.lifetimeAccess,
                        price: body.price,
                        language: body.language,
                        categoryName: category.title,
                        categoryId: body.categoryId
                    })
                        .then((response) => {
                            res.status(200).json({ message: "course created!", _links: HATEOAS });
                        })
                        .catch((error) => {
                            res.status(400).json({ error: "an internal error occurred: " + error });
                        });
                };
            });
    };
});

router.put("/courses", auth, (req, res) => {
    const id = req.body.id;

    let HATEOAS = [
        {
            href: "http://localhost:3000/courses",
            method: "GET",
            rel: "get_all_courses"
        },
        {
            href: "http://localhost:3000/courses" + id,
            method: "GET",
            rel: "get_course"
        },
        {
            href: "http://localhost:3000/courses",
            method: "POST",
            rel: "create_course"
        },
        {
            href: "http://localhost:3000/courses",
            method: "PUT",
            rel: "update_course"
        },
        {
            href: "http://localhost:3000/courses/" + id,
            method: "DELETE",
            rel: "delete_course"
        }
    ];

    if (!id || isNaN(id)) {
        res.status(400).json({ error: "invalid id" });
    } else {
        Course.findOne({ where: { id: id } })
            .then((course) => {
                if (!course) {
                    res.status(404).json({ error: "course is not found." });
                } else {
                    Category.findOne({ where: { id: course.categoryId } })
                        .then((category) => {

                            if (!category) {
                                res.status(404).json({ error: "category is not found." });
                            } else {
                                const { body } = req;
                                console.log(category)

                                Course.update({
                                    title: body.title,
                                    subTitle: body.subTitle,
                                    description: body.description,
                                    image: body.image,
                                    duration: body.duration,
                                    creator: body.creator,
                                    assessments: body.assessments,
                                    releaseYear: body.releaseYear,
                                    amountHours: body.amountHours,
                                    downloadableResouces: body.downloadableResouces,
                                    amountExercises: body.amountExercises,
                                    certificate: body.certificate,
                                    lifetimeAccess: body.lifetimeAccess,
                                    price: body.price,
                                    language: body.language,
                                    categoryName: category.title,
                                    categoryId: body.categoryId
                                }, { where: { id: id } })
                                    .then(() => {
                                        res.status(200).json({ message: "course updated", _links: HATEOAS });
                                    })
                                    .catch((err) => {
                                        res.status(400).json({ erro: "an internal error occurred 1: " + err });
                                    });
                            };
                        })
                        .catch((err) => {
                            res.status(400).json({ erro: "an internal error occurred 2: " + err });
                        });
                };
            });
    };
});

router.delete("/courses/:id", auth, (req, res) => {
    const id = req.params.id;

    let HATEOAS = [
        {
            href: "http://localhost:3000/courses",
            method: "GET",
            rel: "get_all_courses"
        },
        {
            href: "http://localhost:3000/courses",
            method: "POST",
            rel: "create_course"
        },
    ];

    if (!id || isNaN(id)) {
        res.status(400).json({ error: "invalid id" });
    } else {
        Course.destroy({ where: { id: id } })
            .then(() => {
                res.status(200).json({ message: "course deleted", _links: HATEOAS });
            })
            .catch((error) => {
                res.status(400).json({ error: "an internal error occurred: " + error });
            });
    };
});

module.exports = router;