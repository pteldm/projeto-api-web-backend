import { servicoListarLivros } from '../services/livroService.js';

const webLivrosController = async (req, res, next) => {
  try{
    // O controller não sabe mais como os pets são buscados.
    // Ele apenas pede para a camada de serviço.
    const livros = await servicoListarLivros()

    res.render('livros', {
      title: 'Nossos livros',
      livros: livros 
    })
  }catch(error){
    next(error)
  }
}

export default webLivrosController