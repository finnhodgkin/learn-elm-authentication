const { Pool } = require('pg');
require('env2')('./.env');

module.exports = new Pool({ connectionString: process.env.DATABASE_URL });
