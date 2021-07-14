"use strict";

/**
 * https://strapi.io/documentation/developer-docs/latest/guides/slug.html#auto-create-update-the-slug-attribute
 */

const slugify = require("slugify");

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.name) {
        data.slug = slugify(data.name, { lower: true });
      }
    },
    beforeUpdate: async (params, data) => {
      if (data.name) {
        data.slug = slugify(data.name, { lower: true });
      }
    },
  },
};
