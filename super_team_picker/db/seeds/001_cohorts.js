const faker = require("faker");

exports.seed = function (knex, Promise) {
  return knex("cohorts")
    .del()
    .then(function () {
      let index = 1;
      const cohorts = Array.from({ length: 20 }).map(() => {
        return {
          name: `Cohort ${index++}`,
          members: Array.from({ length: Math.floor(Math.random() * 30) + 5 }).map(() => faker.name.firstName()).join(", "),
          logoUrl: `${faker.image.business()}?random=${Math.floor(Math.random() * 1000000)}`
        };
      });
      return knex("cohorts").insert(cohorts);
    });
};
