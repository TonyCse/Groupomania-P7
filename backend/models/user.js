module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("User",
  {
    id:{ 
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique : true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    }
  }, {
    tableName: 'user',
    modelName: 'User',
    paranoid: true,
  });
  User.associate = models => {
    User.hasMany(models.Article, {
      foreignKey: 'userId'
    })
  }
  return User;
};