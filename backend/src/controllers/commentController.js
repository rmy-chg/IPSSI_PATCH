const commentService = require('../services/commentService');

class CommentController {
    async create(req, res) {
        try {
            const { content } = req.body;
            if (!content) return res.status(400).json({ error: 'Content is required' });

            await commentService.addComment(content);
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async list(req, res) {
        try {
            const comments = await commentService.getAllComments();
            res.json(comments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new CommentController();
