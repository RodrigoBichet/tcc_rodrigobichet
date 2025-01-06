// // const express = require("express");
// // const multer = require("multer");
// // const bcrypt = require("bcrypt");
// // const cors = require("cors");
// // const db = require("./db"); // Conexão com o banco de dados

// // const app = express();
// // const port = 3000;

// // // Middleware
// // app.use(express.json());
// // app.use(cors());

// // // Configuração do multer para upload de arquivos
// // const upload = multer({ dest: "uploads/" });

// // // Verificar conexão com o banco de dados
// // db.connect()
// //     .then(() => console.log("Conectado ao banco de dados com sucesso!"))
// //     .catch((err) => {
// //         console.error("Erro ao conectar ao banco de dados:", err.message);
// //         process.exit(1);
// //     });

// // // Rota de registro
// // app.post("/register", upload.single("profile_picture"), async (req, res) => {
// //     const { username, email, password } = req.body;
// //     const profilePicture = req.file ? req.file.filename : null;

// //     console.log("Dados recebidos no registro:", req.body);
// //     console.log("Foto de perfil recebida:", profilePicture);

// //     if (!username || !email || !password) {
// //         return res.status(400).json({
// //             success: false,
// //             message: "Todos os campos obrigatórios devem ser preenchidos.",
// //         });
// //     }

// //     try {
// //         // Hash da senha
// //         const hashedPassword = await bcrypt.hash(password, 10);

// //         // Inserção no banco de dados
// //         const query = `
// //             INSERT INTO users (username, email, password, profile_picture)
// //             VALUES ($1, $2, $3, $4)
// //             RETURNING id, username, email, profile_picture;
// //         `;
// //         const values = [username, email, hashedPassword, profilePicture];

// //         const result = await db.query(query, values);

// //         console.log("Usuário cadastrado com sucesso:", result.rows[0]);

// //         return res.status(201).json({
// //             success: true,
// //             message: "Usuário registrado com sucesso.",
// //             user: result.rows[0],
// //         });
// //     } catch (error) {
// //         console.error("Erro ao cadastrar usuário:", error.message);

// //         if (error.code === "23505") {
// //             // Erro de duplicidade
// //             return res.status(400).json({
// //                 success: false,
// //                 message: "Usuário ou e-mail já cadastrado.",
// //             });
// //         }

// //         return res.status(500).json({
// //             success: false,
// //             message: "Erro no servidor.",
// //             error: error.message,
// //         });
// //     }
// // });

// // // Rota de login
// // app.post("/login", async (req, res) => {
// //     const { username, password } = req.body;
// //     console.log("Dados recebidos no login:", req.body);

// //     if (!username || !password) {
// //         return res.status(400).json({
// //             success: false,
// //             message: "Nome de usuário e senha são obrigatórios.",
// //         });
// //     }

// //     try {
// //         const query = "SELECT * FROM users WHERE username = $1";
// //         const values = [username];

// //         const result = await db.query(query, values);

// //         if (result.rows.length === 0) {
// //             console.log("Usuário não encontrado:", username);
// //             return res.status(401).json({
// //                 success: false,
// //                 message: "Usuário ou senha inválidos.",
// //             });
// //         }

// //         const user = result.rows[0];
// //         console.log("Usuário encontrado:", user);

// //         const isPasswordValid = await bcrypt.compare(password, user.password);
// //         if (!isPasswordValid) {
// //             console.log("Senha inválida para o usuário:", username);
// //             return res.status(401).json({
// //                 success: false,
// //                 message: "Usuário ou senha inválidos.",
// //             });
// //         }

// //         // Login bem-sucedido
// //         return res.status(200).json({
// //             success: true,
// //             message: "Login bem-sucedido.",
// //             user: {
// //                 id: user.id,
// //                 username: user.username,
// //                 profilePicture: user.profile_picture,
// //             },
// //         });
// //     } catch (error) {
// //         console.error("Erro ao realizar login:", error.message);
// //         return res.status(500).json({
// //             success: false,
// //             message: "Erro no servidor.",
// //             error: error.message,
// //         });
// //     }
// // });

// // // Rota para atualizar username e/ou foto de perfil
// // app.put("/user/update", upload.single("profile_picture"), async (req, res) => {
// //     const { id, username } = req.body;
// //     const profile_picture = req.file ? req.file.path : null;

// //     try {
// //         let query = "UPDATE users SET username = $1";
// //         const params = [username];

// //         if (profile_picture) {
// //             query += ", profile_picture = $2";
// //             params.push(profile_picture);
// //         }

// //         query += " WHERE id = $3 RETURNING *";
// //         params.push(id);

// //         const result = await pool.query(query, params);
// //         res.json({ success: true, user: result.rows[0] });
// //     } catch (err) {
// //         console.error(err);
// //         res.json({ success: false, message: "Erro ao atualizar usuário" });
// //     }
// // });

// // // Rota para excluir usuário
// // app.delete("/user/delete", async (req, res) => {
// //     const { id } = req.body;

// //     try {
// //         await pool.query("DELETE FROM users WHERE id = $1", [id]);
// //         res.json({ success: true, message: "Conta excluída com sucesso" });
// //     } catch (err) {
// //         console.error(err);
// //         res.json({ success: false, message: "Erro ao excluir conta" });
// //     }
// // });

// // // Inicia o servidor
// // app.listen(port, () => {
// //     console.log(`Servidor rodando em http://localhost:${port}`);
// // });

// const express = require("express");
// const multer = require("multer");
// const bcrypt = require("bcrypt");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const db = require("./db"); // Conexão com o banco de dados

// const app = express();
// const port = 3000;
// const SECRET_KEY = "tcc_rodrigobichet"; // Substitua por uma chave segura

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Configuração do multer para upload de arquivos
// const upload = multer({ dest: "uploads/" });
// // const upload = multer({
// //     dest: "uploads/",
// //     limits: { fileSize: 2 * 1024 * 1024 }, // Limite de 2 MB
// //     fileFilter: (req, file, cb) => {
// //         if (!file.mimetype.startsWith("image/")) {
// //             return cb(new Error("Apenas imagens são permitidas."));
// //         }
// //         cb(null, true);
// //     },
// // });

// // Verificar conexão com o banco de dados
// db.connect()
//     .then(() => console.log("Conectado ao banco de dados com sucesso!"))
//     .catch((err) => {
//         console.error("Erro ao conectar ao banco de dados:", err.message);
//         process.exit(1);
//     });

// // Middleware para autenticar o token JWT
// const authenticateToken = (req, res, next) => {
//     const token = req.headers["authorization"];
//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "Acesso negado. Token não fornecido.",
//         });
//     }

//     jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
//         if (err)
//             return res
//                 .status(403)
//                 .json({ success: false, message: "Token inválido." });
//         req.user = user; // Dados do usuário extraídos do token
//         next();
//     });
// };

// // Rota de registro
// app.post("/register", upload.single("profile_picture"), async (req, res) => {
//     const { username, email, password } = req.body;
//     const profilePicture = req.file ? req.file.filename : null;

//     if (!username || !email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: "Todos os campos obrigatórios devem ser preenchidos.",
//         });
//     }

//     try {
//         // Hash da senha
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Inserção no banco de dados
//         // const query = `
//         //     INSERT INTO users (username, email, password, profile_picture)
//         //     VALUES ($1, $2, $3, $4)
//         //     RETURNING id, username, email, profile_picture;
//         // `;
//         const query = `
//     INSERT INTO users (username, email, password, profile_picture)
//     VALUES ($1, $2, $3, $4)
//     RETURNING id, username, email, profile_picture;
// `;

//         const values = [username, email, hashedPassword, profilePicture];

//         const result = await db.query(query, values);

//         return res.status(201).json({
//             success: true,
//             message: "Usuário registrado com sucesso.",
//             user: result.rows[0],
//         });
//     } catch (error) {
//         if (error.code === "23505") {
//             // Erro de duplicidade
//             return res.status(400).json({
//                 success: false,
//                 message: "Usuário ou e-mail já cadastrado.",
//             });
//         }

//         return res.status(500).json({
//             success: false,
//             message: "Erro no servidor.",
//             error: error.message,
//         });
//     }
// });

// // Rota de login (gera o token)
// app.post("/login", async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({
//             success: false,
//             message: "Nome de usuário e senha são obrigatórios.",
//         });
//     }

//     try {
//         const query = "SELECT * FROM users WHERE username = $1";
//         const values = [username];

//         const result = await db.query(query, values);

//         if (result.rows.length === 0) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Usuário ou senha inválidos.",
//             });
//         }

//         const user = result.rows[0];
//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Usuário ou senha inválidos.",
//             });
//         }

//         // Gerar token JWT
//         // const token = jwt.sign(
//         //     { id: user.id, username: user.username },
//         //     SECRET_KEY,
//         //     { expiresIn: "1h" }
//         // );
//         const token = jwt.sign(
//             { id: user.id, username: user.username },
//             SECRET_KEY,
//             { expiresIn: "30m" }
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Login bem-sucedido.",
//             token, // Retorna o token para o cliente
//             user: {
//                 id: user.id,
//                 username: user.username,
//                 profilePicture: user.profile_picture,
//             },
//         });
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Erro no servidor.",
//             error: error.message,
//         });
//     }
// });

// const existingUser = await db.query("SELECT id FROM users WHERE email = $1", [
//     email,
// ]);
// if (existingUser.rows.length > 0) {
//     return res
//         .status(400)
//         .json({ success: false, message: "E-mail já cadastrado." });
// }

// // Rota para atualizar username e/ou foto de perfil (autenticada)
// app.put(
//     "/user/update",
//     authenticateToken,
//     upload.single("profile_picture"),
//     async (req, res) => {
//         const { username } = req.body;
//         const profile_picture = req.file ? req.file.filename : null;

//         try {
//             let query = "UPDATE users SET username = $1";
//             const params = [username];

//             if (profile_picture) {
//                 query += ", profile_picture = $2";
//                 params.push(profile_picture);
//             }

//             query += " WHERE id = $3 RETURNING *";
//             params.push(req.user.id); // ID do usuário logado extraído do token

//             const result = await db.query(query, params);
//             res.json({ success: true, user: result.rows[0] });
//         } catch (err) {
//             res.status(500).json({
//                 success: false,
//                 message: "Erro ao atualizar usuário.",
//             });
//         }
//     }
// );

// // Rota para excluir usuário autenticado
// app.delete("/user/delete", authenticateToken, async (req, res) => {
//     try {
//         await db.query("DELETE FROM users WHERE id = $1", [req.user.id]);
//         res.json({ success: true, message: "Conta excluída com sucesso." });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Erro ao excluir conta.",
//         });
//     }
// });

// // Inicia o servidor
// app.listen(port, () => {
//     console.log(`Servidor rodando em http://localhost:${port}`);
// });

const express = require("express");
const multer = require("multer");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require("./db"); // Conexão com o banco de dados

const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

// const SECRET_KEY = "tcc_rodrigobichet"; // Substitua por uma chave segura
const SECRET_KEY = "EDlT1BBCjQokqWDNbJmwJu9o7UmM4x73"; // Substitua por uma chave segura

// Middleware
app.use(express.json());
// app.use(cors());
app.use(
    cors({
        origin: "https://maisludus.netlify.app", // Substitua pela URL do seu site no Netlify
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // Se precisar enviar cookies
    })
);

// Configuração do multer para upload de arquivos
const upload = multer({ dest: "uploads/" });
db.connect()
    .then(() => console.log("Conectado ao banco de dados com sucesso!"))
    .catch((err) => {
        console.error("Erro ao conectar ao banco de dados:", err.message);
        process.exit(1);
    });

// Middleware para autenticar o token JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Acesso negado. Token não fornecido.",
        });
    }

    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, user) => {
        if (err)
            return res
                .status(403)
                .json({ success: false, message: "Token inválido." });
        req.user = user; // Dados do usuário extraídos do token
        next();
    });
};

// Rota de registro
app.post("/register", upload.single("profile_picture"), async (req, res) => {
    const { username, email, password } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Todos os campos obrigatórios devem ser preenchidos.",
        });
    }

    try {
        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserção no banco de dados
        const query = `
            INSERT INTO users (username, email, password, profile_picture)
            VALUES ($1, $2, $3, $4)
            RETURNING id, username, email, profile_picture;
        `;

        const values = [username, email, hashedPassword, profilePicture];

        const result = await db.query(query, values);

        return res.status(201).json({
            success: true,
            message: "Usuário registrado com sucesso.",
            user: result.rows[0],
        });
    } catch (error) {
        if (error.code === "23505") {
            // Erro de duplicidade
            return res.status(400).json({
                success: false,
                message: "Usuário ou e-mail já cadastrado.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Erro no servidor.",
            error: error.message,
        });
    }
});

// Rota de login (gera o token)
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Nome de usuário e senha são obrigatórios.",
        });
    }

    try {
        const query = "SELECT * FROM users WHERE username = $1";
        const values = [username];

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Usuário ou senha inválidos.",
            });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Usuário ou senha inválidos.",
            });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username },
            SECRET_KEY,
            { expiresIn: "30m" }
        );

        return res.status(200).json({
            success: true,
            message: "Login bem-sucedido.",
            token, // Retorna o token para o cliente
            user: {
                id: user.id,
                username: user.username,
                profilePicture: user.profile_picture,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erro no servidor.",
            error: error.message,
        });
    }
});

// Rota para atualizar username e/ou foto de perfil (autenticada)
app.put(
    "/user/update",
    authenticateToken,
    upload.single("profile_picture"),
    async (req, res) => {
        const { username } = req.body;
        const profile_picture = req.file ? req.file.filename : null;

        try {
            let query = "UPDATE users SET username = $1";
            const params = [username];

            if (profile_picture) {
                query += ", profile_picture = $2";
                params.push(profile_picture);
            }

            query += " WHERE id = $3 RETURNING *";
            params.push(req.user.id); // ID do usuário logado extraído do token

            const result = await db.query(query, params);
            res.json({ success: true, user: result.rows[0] });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Erro ao atualizar usuário.",
            });
        }
    }
);

// Rota para excluir usuário autenticado
app.delete("/user/delete", authenticateToken, async (req, res) => {
    try {
        await db.query("DELETE FROM users WHERE id = $1", [req.user.id]);
        res.json({ success: true, message: "Conta excluída com sucesso." });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Erro ao excluir conta.",
        });
    }
});

// Nova rota para obter o perfil do usuário autenticado
// app.get("/user/profile", authenticateToken, async (req, res) => {
//     try {
//         const query =
//             "SELECT id, username, email, profile_picture FROM users WHERE id = $1";
//         const values = [req.user.id]; // Usa o id extraído do token

//         const result = await db.query(query, values);

//         if (result.rows.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Usuário não encontrado.",
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             user: result.rows[0],
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: "Erro ao buscar o perfil do usuário.",
//         });
//     }
// });

app.get("/user/profile", authenticateToken, async (req, res) => {
    try {
        const query =
            "SELECT id, username, email, profile_picture FROM users WHERE id = $1";
        const values = [req.user.id]; // Usa o id extraído do token

        const result = await db.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado.",
            });
        }

        const user = result.rows[0];
        // const profilePictureUrl = user.profile_picture
        // ? `http://localhost:3000/uploads/${user.profile_picture}`
        // : "http://localhost:3000/assets/profile-default.png";
        const profilePictureUrl = user.profile_picture
            ? `${req.protocol}://${req.get("host")}/uploads/${
                  user.profile_picture
              }`
            : `${req.protocol}://${req.get("host")}/assets/profile-default.png`;

        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                profile_picture_url: profilePictureUrl,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Erro ao buscar o perfil do usuário.",
        });
    }
});

app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));

// Inicia o servidor
// app.listen(port, () => {
//     console.log(`Servidor rodando em http://localhost:${port}`);
// });
