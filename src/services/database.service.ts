import mysql, { Query } from "mysql";

export class DatabaseService {
  static connection: mysql.Connection;
  static pool: mysql.Pool;

  static async connect() {
    // Define the database connection parameters
    const dbParams: mysql.PoolConfig = {
      host: process.env.DbHost!,
      user: process.env.DbUser!,
      password: process.env.DbPassword!,
      database: process.env.DbName!,
      port: 3306,
      debug: true,
    };

    // Create a MySQL connection
    this.pool = mysql.createPool(dbParams);
  }

  static async execute(
    query: string | mysql.QueryOptions
  ): Promise<mysql.Query> {
    return new Promise((resolve, reject) => {
      this.connect();
      this.pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
          return;
        }

        connection.config.queryFormat = function (query, values) {
          if (!values) return query;
          return query.replace(
            /\:(\w+)/g,
            function (txt: any, key: any) {
              if (values.hasOwnProperty(key)) {
                return connection.escape(values[key]);
              }
              return txt;
            }.bind(this)
          );
        };

        connection.query(query, (error, results) => {
          connection.release();

          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    });
  }

  static async disconnect() {
    // Close the database connection
    this.connection.end();
    this.connection.destroy();
    console.log("Disconnected from database");
  }
}
