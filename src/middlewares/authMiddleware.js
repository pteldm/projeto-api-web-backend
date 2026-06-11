import 'dotenv/config'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido' })
    }

    // O formato do header é "Bearer TOKEN_LONGO"
    // Usamos split para pegar apenas a parte do token
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ mensagem: "Erro no formato do token." });
    }

    const [scheme, token] = parts

    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ mensagem: "Token mal formatado." });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message : "Token inválido ou expirado." })
        }
        // Repassa todo o conteúdo decodificado (id, login, role) para req.usuario
        req.usuario = decoded
        next()
    })
}

export default authMiddleware