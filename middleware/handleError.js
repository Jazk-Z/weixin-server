const handleErrorMiddleware = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err.status) {
      ctx.status = err.status
    } else {
      ctx.status = 500
    }
    ctx.body = {
      msg: err.message,
      debug: err.message,
      type: ''
    }
  }
}
