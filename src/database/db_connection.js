const { Pool } = require('pg');
require('env2')('./config.env');

module.exports = new Pool({ connectionString: process.env.DATABASE_URL });
