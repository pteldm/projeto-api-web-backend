// 1. Exportamos uma função chamada 'checkRole'.
// Esta é uma "função geradora de middleware" (ou closure). Em vez de ser o middleware
// em si, ela RETORNA uma função de middleware configurada com o papel que queremos verificar.
// Isso a torna incrivelmente reutilizável para diferentes papéis ('admin', 'editor', etc.).
const checkRole = (requiredRole) => {
    
    // 2. Esta é a função de middleware real que o Express irá executar.
    // Ela tem acesso a 'req', 'res' e 'next'.
    return (req, res, next) => {
        
        // 3. Este middleware DEVE rodar DEPOIS do 'authMiddleware'.
        // Confiamos que o middleware de autenticação já validou o token e anexou
        // as informações do usuário (incluindo o papel) ao objeto 'req.user'.
        const usuario = req.usuario // 'req.usuario' é onde o 'authMiddleware' deve ter colocado as informações do usuário autenticado.;

        // 4. Verificamos se o objeto 'user' ou a propriedade 'role' não existem.
        // Isso é uma salvaguarda. Se chegarmos aqui sem um usuário, algo está errado.
        // Também verificamos se o papel do usuário (ex: 'user') é diferente do papel exigido (ex: 'admin').
        if (!usuario || usuario.role !== requiredRole) {
            // 5. Se o usuário não tiver o papel correto, retornamos o status 403 Forbidden.
            // 403 é o código correto para "Eu sei quem você é (autenticado), mas você não tem permissão para acessar este recurso".
            // É diferente do 401 Unauthorized (Não sei quem você é).
            return res.status(403).json({ message: 'Acesso negado. Permissões insuficientes.' });
        }

        // 6. Se o usuário tiver o papel correto, chamamos 'next()' para permitir que a
        // requisição continue para o seu destino final (o controlador da rota).
        next();
    };
};

// 7. Exportamos a função geradora para que possamos usá-la em nossos arquivos de rota.
export default checkRole