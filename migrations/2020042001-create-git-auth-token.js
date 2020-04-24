module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('git', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: '索引'
      },
      githubName: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '用户GitHub名称'
      },
      authorization: {
        type: Sequelize.STRING(1024),
        allowNull: false,
        comment: '用户Authorization Token名称'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('git')
  }
}
