'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async findMe(ctx) {
    let entities;
    //get authenticated user details
    const user = ctx.state.user;
    if(!user){
      return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found'}]}]);
    }
    entities = await strapi.query('profile').find({ user: user.id });

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.profile }));
  },
};