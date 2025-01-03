// // Exemplo de rota /user/profile
// const express = require("express");
// const app = express();
// const jwt = require("jsonwebtoken");

// // Simulação de usuários
// const users = [
//     { id: 1, username: "testuser", profile_picture: "profile1.jpg" },
// ];

// // Middleware para verificar o token JWT
// function verifyToken(req, res, next) {
//     const token = req.headers["authorization"]?.split(" ")[1];

//     if (!token) {
//         return res.status(403).json({ message: "Token não fornecido" });
//     }

//     jwt.verify(token, "seu_segredo", (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: "Token inválido" });
//         }
//         req.user = decoded;
//         next();
//     });
// }

// // Rota protegida que retorna os dados do perfil do usuário
// app.get("/user/profile", verifyToken, (req, res) => {
//     const user = users.find((u) => u.id === req.user.id); // Acessando o usuário com base no ID do token
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "Usuário não encontrado" });
//     }
// });

// // Iniciando o servidor
// app.listen(3000, () => {
//     console.log("Servidor rodando na porta 3000");
// });

const express = require("express");
const jwt = require("jsonwebtoken");

// // Simulação de usuários (você vai buscar isso no banco de dados, mas para o exemplo está assim)
// const users = [
//     { id: 1, username: "testuser", profile_picture: "profile1.jpg" },
// ];

// Middleware para verificar o token JWT
function verifyToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Token não fornecido" });
    }

    jwt.verify(token, "tcc_rodrigobichet", (err, decoded) => {
        // Use a chave secreta do seu servidor
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }
        req.user = decoded;
        next();
    });
}

// Rota protegida que retorna os dados do perfil do usuário
const profileRouter = express.Router();

// profileRouter.get("/user/profile", verifyToken, (req, res) => {
//     const user = users.find((u) => u.id === req.user.id); // Acessando o usuário com base no ID do token
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "Usuário não encontrado" });
//     }
// });

profileRouter.get("/user/profile", verifyToken, (req, res) => {
    const user = users.find((u) => u.id === req.user.id); // Acessando o usuário com base no ID do token
    if (user) {
        // A resposta deve incluir "username" para corresponder ao que o frontend espera
        res.json({
            username: user.username, // Agora inclui o "username"
            profile_picture: user.profile_picture || "default-profile.png",
        });
    } else {
        res.status(404).json({ message: "Usuário não encontrado" });
    }
});

module.exports = profileRouter;
