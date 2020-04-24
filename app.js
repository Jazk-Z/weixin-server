const Koa = require('koa')
const cors = require('koa2-cors')
const bodyparser = require('koa-bodyparser')
const fs = require('fs')
const router = require('./routes')
const app = new Koa()
app.use(
  cors({
    origin: () => '*',
    maxAge: 5,
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  })
)
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
    jsonLimit: '50mb',
    formLimit: '50mb',
    textLimit: '50mb'
  })
)
app.use(router.routes()).use(router.allowedMethods())

app.listen(7777)