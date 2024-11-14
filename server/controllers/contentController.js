const Content = require('../models/Content');

class ContentController {
  static async upload(req, res) {
    try {
      const { notes, privateNotes } = req.body;
      const userId = req.user.id;
      const imagePaths = req.files ? req.files.map(file => file.path) : [];

      // Handle image uploads
      for (const imagePath of imagePaths) {
        await Content.create(userId, imagePath, notes, privateNotes);
      }

      // Handle notes without images
      if (imagePaths.length === 0 && (notes || privateNotes)) {
        await Content.create(userId, null, notes, privateNotes);
      }

      res.status(201).json({ message: 'Content uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error uploading content' });
    }
  }

  static async getUserContent(req, res) {
    try {
      const userId = req.user.id;
      const content = await Content.findAllContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving content' });
    }
  }
}

module.exports = ContentController;