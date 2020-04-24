const Router = require('koa-router')
const {
  encryptGitAuthorization,
  handleWebHookPushEvent
} = require('../../controller/webHookContr')
const router = new Router({
  prefix: '/git'
})
router.post('/push', handleWebHookPushEvent)
router.post('/encrypt', encryptGitAuthorization)
module.exports = router
