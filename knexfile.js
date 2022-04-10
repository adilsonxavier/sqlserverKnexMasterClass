// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mssql",
    connection: {
      server: "localhost",
      user: "sa",
      password: "sqlserver",
      database: "VitrineProdutos",
      port: 1433,
    }
  }
};
