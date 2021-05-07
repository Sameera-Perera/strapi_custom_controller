'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  async updateMe(ctx) {
    let entity;
    //get authenicated user details
    const user = ctx.state.user;
    if(!user){
        return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found'}]}]);
    }
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data['user'] = user;
      entity = await strapi.services.profile.update({ user: user.id }, data, {
        files,
      });
    } else {
      const data = ctx.request.body;
      data['user'] = user;
      entity = await strapi.services.profile.update({ user: user.id }, data);
    }

    return sanitizeEntity(entity, { model: strapi.models.profile });
  },
};