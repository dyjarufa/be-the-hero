const connection = require('../database/connection');
const crypto =  require('crypto');

module.exports = {
  async index(request, response){
  const ongs = await connection('ongs').select('*');

  return response.json(ongs);
  },
  
  async create(request, response) {
    const {name, email, whatsapp, city, uf} = request.body;
  
  const id = crypto.randomBytes(4).toString('HEX');// Estratégia para gerar o id da ong usando o crypto

  await connection('ongs').insert({ 
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  });
  
  return response.json({id});
  }
};