const PostCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostsCategory',
  {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  },
  {
    tableName: 'PostsCategories',
    timestamps: false,
  });
  return postCategory;
};

module.exports = PostCategory;