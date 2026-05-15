const routeNotFoundMiddleware = (req,res,next) => {
    console.log("Rota não encontrada")
    res.status(404).send("Rota não encontrada")
}

export default routeNotFoundMiddleware