const logMiddleware = (req,res,next) => {
    const data = new Date().toISOString()
    console.log(`[${data}] ${req.method} em ${req.url}`)
    next()
}

export default logMiddleware