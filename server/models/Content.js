const db = require('../models/db');

class Content {
  static async create(userId, imagePath, notes, privateNotes) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO user_content (user_id, image_path, notes, private_notes) VALUES (?, ?, ?, ?)',
        [userId, imagePath, notes, privateNotes],
        function(err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  }

  // static async findByUserId(userId) {
  //   return new Promise((resolve, reject) => {
  //     db.all(
  //       'SELECT * FROM user_content WHERE user_id = ? ORDER BY created_at DESC',
  //       [userId],
  //       (err, content) => {
  //         if (err) reject(err);
  //         resolve(content);
  //       }
  //     );
  //   });
  // }

  static async findByUserId(userId) {
    try {
      const content = await new Promise((resolve, reject) => {
        db.all(
          'SELECT * FROM user_content WHERE user_id = ? ORDER BY created_at DESC',
          [userId],
          (err, content) => {
            if (err) reject(err);
            resolve(content);
          }
        );
      });
      return content;
    } catch (err) {
      throw err;
    }
  }
  


  static async findAllContent() {
    try {
      const content = await new Promise((resolve, reject) => {
        db.all(
          'SELECT * FROM user_content ORDER BY created_at DESC',
          (err, content) => {
            if (err) reject(err);
            resolve(content);
          }
        );
      });
      return content;
    } catch (err) {
      throw err;
    }
  }
  
}


module.exports = Content;