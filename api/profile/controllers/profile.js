'use strict';

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async deleteMe(ctx) {
    //get authenticated user details
    const user = ctx.state.user;
    if(!user){
        return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found'}]}]);
    }
    const entity = await strapi.services.profile.delete({ user: user.id });
    return sanitizeEntity(entity, { model: strapi.models.profile });
  },
};