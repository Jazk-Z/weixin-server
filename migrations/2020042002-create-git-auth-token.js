module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'git',
          'weekStatus',
          {
            type: Sequelize.RANGE(Sequelize.DECIMAL),
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
        queryInterface.removeColumn('Person', 'weekStatus', { transaction: t })
      ])
    })
  }
}
