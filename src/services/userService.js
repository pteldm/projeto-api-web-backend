import { 
    repositorioCriaUsuario,
    repositorioAtualizaUsuario,
    repositorioDeletaUsuario
 } from '../repositories/userRepository.js'

export const serviceNovousuario = async (userData) => {
    const { login, senha, role } = userData;
    const novoUsuario = await repositorioCriaUsuario(login, senha, role);
    return novoUsuario;
}

export const serviceAtualizarUsuario = async (userData) => {
    const { id, login, senha, role } = userData
    const usuarioAtualizado = await repositorioAtualizaUsuario(id, login, senha, role)
    return usuarioAtualizado
}

export const serviceDeletarUsuario = async (userData) => {
    const { id } = userData;
    const usuarioDeletado = await repositorioDeletaUsuario(id);
    if (!usuarioDeletado) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }
    return usuarioDeletado;
}