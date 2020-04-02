const crypto = require('crypto');

module.exports = function generateUtilsId(){
  return crypto.randomBytes(4).toString('HEX');
}