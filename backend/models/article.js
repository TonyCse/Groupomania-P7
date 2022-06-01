module.exports = (sequelize, Sequelize, User) => {
  const Article =  sequelize.define('Article', 
    {
      id:{ 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        require: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    }, {
      tableName: 'article',
      freezeTableName: true
     });
     Article.associate = models => {
       Article.belongsTo(models.User)
     }
     return Article
   };