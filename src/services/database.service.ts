import mysql from "mysql";

export class DatabaseService {
  static connection: mysql.Connection;

  static async connect() {
    // Define the database connection parameters
    const dbParams = {
      host: process.env.DbHost!,
      user: process.env.DbUser!,
      password: process.env.DbPassword!,
      database: process.env.DbName!,
    };

    // Create a MySQL connection
    this.connection = mysql.createConnection(dbParams);

    // Connect to the database
    this.connection.connect((err) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        throw new Error("Error connecting to the database:" + err);
      }
      console.log("Connected to the database");
    });
  }

  static async execute(query: string | mysql.QueryOptions) {
    this.connection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        throw new Error("Error executing query:" + err);
      }
      console.log("Query Result:", results);
    });
  }

  static async disconnect() {
    // Close the database connection
    this.connection.end();
    this.connection.destroy();
  }
}
