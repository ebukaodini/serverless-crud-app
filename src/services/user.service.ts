import { DatabaseService } from "./database.service";

export class UserService {
  private static async createSchema() {
    try {
      await DatabaseService.execute(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          firstname VARCHAR(50),
          lastname VARCHAR(50),
          email VARCHAR(100) NOT NULL UNIQUE,
          password_hash CHAR(64) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } catch (error) {
      throw error;
    }
  }

  static async createUser(user: any) {
    try {
      return await this.createSchema().then(async () => {
        return await DatabaseService.execute({
          sql: `INSERT INTO users (firstname, lastname, email, password_hash) VALUES (:firstname, :lastname, :email, :password_hash)`,
          values: user,
        });
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async updateUser(userId: number, user: any) {
    try {
      return await this.createSchema().then(async () => {
        return await DatabaseService.execute({
          sql: `UPDATE users SET firstname = :firstname, lastname = :lastname WHERE id = :id;`,
          values: { ...user, id: userId },
        });
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getUser(email: string) {
    try {
      return await this.createSchema().then(async () => {
        return await DatabaseService.execute({
          sql: `SELECT * FROM users WHERE email = :email;`,
          values: { email },
        }).then((results: any) => {
          return results[0];
        });
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getUserByID(id: number) {
    try {
      return await this.createSchema().then(async () => {
        return await DatabaseService.execute({
          sql: `SELECT * FROM users WHERE id = :id;`,
          values: { id },
        }).then((results: any) => {
          return results[0];
        });
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async deleteUser(id: number) {
    try {
      return await this.createSchema().then(async () => {
        return await DatabaseService.execute({
          sql: `DELETE FROM users WHERE id = :id;`,
          values: { id },
        }).then((results: any) => {
          return results[0];
        });
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
