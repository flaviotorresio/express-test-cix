const bcrypt = require('bcrypt');

async function checkPassword(password, hash) {
    console.log(`password: ${password} hash: ${hash}`);
    const result = await bcrypt.compare(password, hash);
    console.log(`result: ${result}`);
    return result
}

module.exports = checkPassword