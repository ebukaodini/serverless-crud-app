import { DatabaseService } from "./database.service";

export class BlogService {
  private static async createSchema() {
    try {
      await DatabaseService.execute(`
        CREATE TABLE IF NOT EXISTS posts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
        );
      `);
    } catch (error) {
      throw error;
    }
  }

  static async createPost(post: any) {
    try {
      return await this.createSchema().then(async () => {
        return await DatabaseService.execute({
          sql: `INSERT INTO users (user_id, title, content) VALUES (:user_id, :title, :content)`,
          values: post,
        });
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
