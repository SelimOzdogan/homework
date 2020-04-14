const express = require("express");
const knex = require("../db/connection");

const router = express.Router();

router.get("/", (request, response) => {
    knex("cohorts")
        .orderBy("createdAt", "desc")
        .then((cohorts) => {
            response.render("cohorts/index", { cohorts });
        });
});

router.post("/", (request, response) => {
    const { name, members, logoUrl } = request.body;
    knex("cohorts")
        .insert({
            name,
            members,
            logoUrl,
        })
        .returning("*")
        .then((cohort) => {
            response.redirect(`/cohorts/${cohort[0].id}`);
        });
});
router.get("/new", (req, res) => {
    res.render("cohorts/new");
});

router.get("/edit", (req, res) => {
    res.render("cohorts/edit");
});

router.get("/lists", (request, response) => {
    knex("cohorts")
        .orderBy("createdAt", "desc")
        .then((cohorts) => {
            response.render("cohorts/lists", { cohorts });
        });
});

router.post("/cohorts", (request, response) => {
    console.log(request.body);
    const { name, members, logoUrl } = request.body;
    knex("cohorts")
        .insert({
            name,
            members,
            logoUrl,
        })
        .returning("*")
        .then((cohort) => {
            response.redirect(`cohorts/${cohort[0].id}`);
        });
});

router.get("/:id", (request, response) => {
    const id = request.params.id;
    knex("cohorts")
        .where("id", id)
        .first()
        .then((cohort) => {
            if (cohort) {
                response.render("cohorts/show", { cohort, request });
            } else {
                response.redirect("cohorts/id");
            }
        });
});
router.post("/:id", (request, response) => {
    const id = request.params.id;
    knex("cohorts")
        .where("id", id)
        .first()
        .then((cohort) => {
            if (cohort) {
                response.render("cohorts/show", { cohort, request });
            } else {
                response.redirect("cohorts");
            }
        });
});
router.get("/:id/edit", (request, response) => {
    knex("cohorts")
        .where("id", request.params.id)
        .first()
        .then((cohort) => {
            response.render("cohorts/edit", { cohort });
        });
});
router.patch("/:id", (request, response) => {
    const { name, members, logoUrl } = request.body;
    const updatedCohort = {
        name,
        members,
        logoUrl,
    };

    knex("cohorts")
        .where("id", request.params.id)
        .update(updatedCohort)
        .then(() => {
            response.redirect(`/cohorts/${request.params.id}`);
        });
});

router.delete("/:id", (request, response) => {
    knex("cohorts")
        .where("id", request.params.id)
        .del()
        .then(() => {
            response.redirect("/cohorts");
        });
});

module.exports = router;
