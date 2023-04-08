const fs = require('fs');

module.exports = async function() {
  const path = './coverage/lcov.info';
  if (fs.existsSync(path)) {
    let lcov = fs.readFileSync(path).toString();
    lcov = lcov.replace(new RegExp(`${__dirname}/`, 'g'), '');
    fs.writeFileSync(path, lcov);
  }
};
