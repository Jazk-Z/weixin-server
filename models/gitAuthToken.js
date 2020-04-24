const Sequelize = require('sequelize')
const Model = Sequelize.Model
module.exports = (sequelize, DataTypes) => {
  class GitAuthToken extends Model {}
  GitAuthToken.init(
    {
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
      weekStatus: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        comment: '每周提交作业的情况'
      }
    },
    { sequelize, modalName: 'gitAuthToken', tableName: 'git' }
  )
  return GitAuthToken
}
