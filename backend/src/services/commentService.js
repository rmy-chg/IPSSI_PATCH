const { Comment } = require('../models');

class CommentService {
    async addComment(content) {
        return await Comment.create({ content });
    }

    async getAllComments() {
        return await Comment.findAll({
            order: [['id', 'DESC']]
        });
    }
}

module.exports = new CommentService();
