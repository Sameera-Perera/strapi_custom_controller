'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  async createMe(ctx) {
    let entity;
    //get authanticated user details
    const user = ctx.state.user;
    if(!user){
        return ctx.request(null, [{messages: [{ id: 'No authorixation header was found'}]}]);
    }
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data['user'] = user;
      entity = await strapi.services.profile.create(data, { files });
    } else {
      const data = ctx.request.body;
      data['user'] = user;
      entity = await strapi.services.profile.create(data);
    }
    return sanitizeEntity(entity, { model: strapi.models.profile });
  },
};