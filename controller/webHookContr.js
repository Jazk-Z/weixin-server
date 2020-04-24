const _ = require('lodash')
const reqSource = require('../utils/network')
const { get, update, post } = reqSource('https://api.github.com')
const db = require('../models')
const { publicEncrypt, privateDecrypt } = require('../utils/crypto')
const { GitAuthToken } = db
const reposOwner = 'GeekUniversity'
const reposName = 'Frontend-01-Template'
const reposRef = 'master'
const issuesPath = `/repos/${reposOwner}/${reposName}/issues`
const handleWebHookPushEvent = async (ctx) => {
  const gitInfo = ctx.request.body
  console.log(`-------------------------------------------`)
  console.log(gitInfo)
  console.log(gitInfo.repository)
  console.log(gitInfo.repository)
  console.log(`-------------------------------------------`)
  // 获取分支信息
  const fullName = _.get(
    gitInfo,
    'repository.full_name',
    'pandaCure/Frontend-01-Template'
  )
  const htmlUrl = _.get(
    gitInfo,
    'repository.html_url',
    'https://github.com/pandaCure/Frontend-01-Template'
  )
  const owner = _.get(gitInfo, 'repository.owner.login', '')
  const tokenInfo = await GitAuthToken.findOne({
    where: {
      githubName: owner
    }
  })
  console.log(tokenInfo)
  ctx.assert(
    tokenInfo,
    401,
    'Github Token is not found. please register your Token'
  )
  const authorization = _.get(tokenInfo, 'authorization', '')
  const github_token = await privateDecrypt(authorization)
  console.log(github_token)
  console.log(fullName)
  // 获取commit info信息
  const refPath = `/repos/${fullName}/branches/${reposRef}`
  const { data: refInfo } = await get(
    refPath,
    {},
    {
      Authorization: `token ${github_token}`
    }
  )
  console.log(refInfo)
  const commitMessage = _.get(refInfo, 'commit.commit.message', '')
  const weekInfo = _.get(commitMessage.match(/week(\d+)/), '1', '')
  const username = _.chain(commitMessage.match(/\[name:(.+)\]$/))
    .get('1', '测试')
    .trim()
  const studentId = _.chain(commitMessage.match(/\[id:(.+)\]$/))
    .get('1', '11111111')
    .trim()
  const classId = _.chain(commitMessage.match(/\[class:(.+)\]$/))
    .get('1', '110班')
    .trim()
  const groupId = _.chain(commitMessage.match(/\[group:(.+)\]$/))
    .get('1', '70组')
    .trim()
  const commentsCreteInfo = `#学号:${studentId}\r\n#姓名:${username}\r\n#班级:${classId}\r\n#小组:${groupId}\r\n#作业&总结链接:${htmlUrl}/tree/master/week${weekInfo}`
  // 存储用户当周信息
  const weekStatus = _.get(tokenInfo, 'weekStatus', []) || []
  console.log(`------------------>`)
  console.log(weekStatus)
  const userId = _.get(tokenInfo, 'id', '')
  const currentWeekStatus = _.find(weekStatus, (v) => v === Number(weekInfo))
  if (currentWeekStatus) return (ctx.body = { ok: true })
  weekStatus.push(weekInfo)
  console.log(`------------------>`)
  console.log(weekStatus)
  const a = await GitAuthToken.update(
    { weekStatus: weekStatus },
    {
      where: {
        id: userId
      }
    }
  )
  console.log(`------------------>`)

  console.log(a)
  // 获取issue列表
  const { data: issuesList } = await get(
    issuesPath,
    {},
    {
      Authorization: `token ${github_token}`
    }
  )
  console.log(issuesList)
  const filterIssuesList = issuesList.filter(
    (v) => v.user.login === reposOwner && ~v.title.indexOf(weekInfo) !== 0
  )
  // 怎么处理
  const issuesNumber = _.get(filterIssuesList, '0.number', '')
  const commentsPath = `/repos/${reposOwner}/${reposName}/issues/${issuesNumber}/comments`
  console.log(commentsPath)
  const { data: createCommit } = await post(
    commentsPath,
    { body: commentsCreteInfo },
    {
      Authorization: `token ${github_token}`
    }
  )
  ctx.body = createCommit
}
const encryptGitAuthorization = async (ctx) => {
  const { token, githubName } = ctx.request.body
  const encryptToken = await publicEncrypt(token)
  const [result, isExist] = await GitAuthToken.findOrCreate({
    where: {
      githubName
    },
    defaults: {
      authorization: encryptToken
    }
  })
  ctx.body = {
    isExist: !isExist,
    userInfo: result
  }
}
module.exports = {
  handleWebHookPushEvent,
  encryptGitAuthorization
}
