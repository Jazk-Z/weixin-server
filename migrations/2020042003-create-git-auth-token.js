module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('git', 'weekStatus', { transaction: t }),
        queryInterface.addColumn(
          'git',
          'weekStatus',
          {
            type: Sequelize.ARRAY(Sequelize.INTEGER),
            comment: '每周提交作业的情况'
          },
          { transaction: t }
        )
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('git', 'weekStatus', { transaction: t })
      ])
    })
  }
}
