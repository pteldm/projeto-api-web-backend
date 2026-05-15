import { servicoListarCamisetas } from '../services/camisetaService.js';

const webCamisetasController = async (req, res, next) => {
  try{
    // O controller não sabe mais como as camisetas são buscadas.
    // Ele apenas pede para a camada de serviço.
    const camisetas = await servicoListarCamisetas()

    res.render('camisetas', {
      title: 'Nossas camisetas',
      camisetas: camisetas 
    })
  }catch(error){
    next(error)
  }
}

export default webCamisetasController