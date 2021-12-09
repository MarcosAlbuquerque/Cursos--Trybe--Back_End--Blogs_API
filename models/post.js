const Post = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts',
  {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });
  return BlogPosts;
};

module.exports = Post;