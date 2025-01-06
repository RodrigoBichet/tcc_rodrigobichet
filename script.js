// async function login() {
//     const username = document.getElementById("username").value.trim();
//     const password = document.getElementById("password").value.trim();

//     if (!username || !password) {
//         alert("Por favor, preencha todos os campos.");
//         return;
//     }

//     try {
//         const response = await fetch("http://localhost:3000/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         const data = await response.json();

//         if (response.ok && data.success) {
//             // Salva as informações do usuário no localStorage
//             localStorage.setItem("currentUser", JSON.stringify(data.user));
//             alert("Login bem-sucedido!");
//             window.location.href = "index.html"; // Redireciona para a página inicial
//         } else {
//             alert(data.message || "Erro no login.");
//         }
//     } catch (error) {
//         console.error("Erro ao realizar login:", error);
//         alert("Erro ao conectar com o servidor.");
//     }
// }

// Função para verificar se o usuário está logado
// function checkLoginStatus() {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//     if (currentUser) {
//         // Usuário está logado
//         document.getElementById("login-register-buttons").style.display =
//             "none"; // Esconde login/cadastro
//         document.getElementById("profile-picture-container").style.display =
//             "flex"; // Exibe foto de perfil

//         // Exibe a foto de perfil
//         document.getElementById("profile-picture").src =
//             currentUser.profilePicture
//                 ? `/uploads/${currentUser.profilePicture}`
//                 : "default-profile.jpg";
//     } else {
//         // Usuário não está logado
//         document.getElementById("login-register-buttons").style.display =
//             "flex"; // Exibe login/cadastro
//         document.getElementById("profile-picture-container").style.display =
//             "none"; // Esconde foto de perfil
//     }
// }

// Verifica o status do login
// async function checkLoginStatus() {
//     const token = localStorage.getItem("token");

//     if (token) {
//         try {
//             const response = await fetch("http://localhost:3000/user/profile", {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 // Exibe o nome do usuário e foto de perfil
//                 document.getElementById(
//                     "login-register-buttons"
//                 ).style.display = "none";
//                 const profilePictureContainer = document.getElementById(
//                     "profile-picture-container"
//                 );
//                 profilePictureContainer.style.display = "block";
//                 document.getElementById("profile-picture").src =
//                     data.profile_picture || "default-profile.png";
//             } else {
//                 throw new Error("Token inválido");
//             }
//         } catch (error) {
//             console.error("Erro ao verificar login:", error);
//             logout(); // Limpa o token se inválido
//         }
//     }
// }

// Função para fazer logout
// function logout() {
//     // Remove as informações do usuário do localStorage
//     localStorage.removeItem("currentUser");

//     // Redireciona para a página de login
//     window.location.href = "login.html";
// }

// // Chama a função para verificar o status de login assim que a página carrega
// checkLoginStatus();

async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        // const response = await fetch("http://localhost:3000/login", {
        const response = await fetch(
            "https://tcc-rodrigobichet-web.onrender.com/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            }
        );

        const data = await response.json();

        if (response.ok) {
            // Armazena o token no localStorage
            localStorage.setItem("token", data.token);
            alert("Login bem-sucedido!");
            window.location.href = "index.html"; // Redireciona para a home
        } else {
            alert(data.message || "Erro ao fazer login.");
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao fazer login.");
    }
}

// async function checkLoginStatus() {
//     const token = localStorage.getItem("token");

//     if (token) {
//         try {
//             const response = await fetch("http://localhost:3000/user/profile", {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 console.log("Usuário autenticado:", data);

//                 // Exibe o nome do usuário e foto de perfil
//                 document.getElementById(
//                     "login-register-buttons"
//                 ).style.display = "none";
//                 const profilePictureContainer = document.getElementById(
//                     "profile-picture-container"
//                 );
//                 profilePictureContainer.style.display = "block";
//                 document.getElementById("profile-picture").src =
//                     data.profile_picture || "default-profile.png";
//             } else {
//                 console.warn("Token inválido ou expirado.");
//                 logout(); // Limpa o token se inválido
//             }
//         } catch (error) {
//             console.error("Erro ao verificar login:", error);
//             logout(); // Limpa o token se houver erro
//         }
//     } else {
//         console.warn("Token não encontrado. Redirecionando para login.");
//         window.location.href = "login.html";
//     }
// }

// async function checkLoginStatus() {
//     const token = localStorage.getItem("token");

//     if (token) {
//         try {
//             const response = await fetch("http://localhost:3000/user/profile", {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 console.log("Usuário autenticado:", data);

//                 // Exibe o nome do usuário e foto de perfil
//                 document.getElementById(
//                     "login-register-buttons"
//                 ).style.display = "none";
//                 const profilePictureContainer = document.getElementById(
//                     "profile-picture-container"
//                 );
//                 profilePictureContainer.style.display = "block";

//                 // Atualiza a foto de perfil
//                 document.getElementById("profile-picture").src =
//                     data.profile_picture || "default-profile.png";

//                 // Atualiza a mensagem de boas-vindas com o nome do usuário
//                 const welcomeMessage = `Bem-vindo(a), ${data.username}`; // Supondo que o nome do usuário seja "name"
//                 document.getElementById("welcome-message").textContent =
//                     welcomeMessage;
//             } else {
//                 console.warn("Token inválido ou expirado.");
//                 logout(); // Limpa o token se inválido
//             }
//         } catch (error) {
//             console.error("Erro ao verificar login:", error);
//             logout(); // Limpa o token se houver erro
//         }
//     } else {
//         console.warn("Token não encontrado. Redirecionando para login.");
//         window.location.href = "login.html";
//     }
// }
// async function checkLoginStatus() {
//     const token = localStorage.getItem("token");

//     if (token) {
//         try {
//             const response = await fetch("http://localhost:3000/user/profile", {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             const data = await response.json();

//             // Adicionando um console.log para verificar os dados recebidos
//             console.log("Dados do perfil recebidos:", data); // Isso está correto agora

//             if (response.ok) {
//                 // Exibe o nome do usuário e foto de perfil
//                 document.getElementById(
//                     "login-register-buttons"
//                 ).style.display = "none";
//                 const profilePictureContainer = document.getElementById(
//                     "profile-picture-container"
//                 );
//                 profilePictureContainer.style.display = "block";

//                 // Atualiza a foto de perfil
//                 document.getElementById("profile-picture").src =
//                     data.profile_picture || "default-profile.png";

//                 // Atualiza a mensagem de boas-vindas com o nome do usuário
//                 const welcomeMessage = `Bem-vindo(a), ${data.username}`;
//                 document.getElementById("welcome-message").textContent =
//                     welcomeMessage;
//             } else {
//                 console.warn("Token inválido ou expirado.");
//                 logout(); // Limpa o token se inválido
//             }
//         } catch (error) {
//             console.error("Erro ao verificar login:", error);
//             logout(); // Limpa o token se houver erro
//         }
//     } else {
//         console.warn("Token não encontrado. Redirecionando para login.");
//         window.location.href = "login.html";
//     }
// }
// async function checkLoginStatus() {
//     const token = localStorage.getItem("token");

//     if (token) {
//         try {
//             const response = await fetch("http://localhost:3000/user/profile", {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             const data = await response.json();

//             // Adicionando um console.log para verificar os dados recebidos
//             console.log("Dados do perfil recebidos:", data);

//             if (response.ok) {
//                 // Exibe o nome do usuário e foto de perfil
//                 document.getElementById(
//                     "login-register-buttons"
//                 ).style.display = "none";
//                 const profilePictureContainer = document.getElementById(
//                     "profile-picture-container"
//                 );
//                 profilePictureContainer.style.display = "block"; // Garantindo que o container seja exibido

//                 // Atualiza a foto de perfil
//                 document.getElementById("profile-picture").src =
//                     data.user.profile_picture || "default-profile.png";

//                 // Atualiza a mensagem de boas-vindas com o nome do usuário
//                 const welcomeMessage = `Bem-vindo(a), ${data.user.username}`;
//                 document.getElementById("welcome-message").textContent =
//                     welcomeMessage;
//             } else {
//                 console.warn("Token inválido ou expirado.");
//                 logout(); // Limpa o token se inválido
//             }
//         } catch (error) {
//             console.error("Erro ao verificar login:", error);
//             logout(); // Limpa o token se houver erro
//         }
//     } else {
//         console.warn("Token não encontrado. Redirecionando para login.");
//         window.location.href = "login.html";
//     }
// }
async function checkLoginStatus() {
    const token = localStorage.getItem("token");

    if (token) {
        try {
            // const response = await fetch("http://localhost:3000/user/profile", {
            const response = await fetch(
                "https://tcc-rodrigobichet-web.onrender.com/user/profile",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            console.log("Dados do perfil recebidos:", data);

            if (response.ok) {
                // Esconde os botões de login/registro
                document.getElementById(
                    "login-register-buttons"
                ).style.display = "none";

                // Mostra o container do perfil
                const profilePictureContainer = document.getElementById(
                    "profile-picture-container"
                );
                profilePictureContainer.style.display = "block";

                // Atualiza a foto de perfil
                document.getElementById("profile-picture").src =
                    data.user.profile_picture_url;

                // Atualiza a mensagem de boas-vindas
                const welcomeMessage = `${data.user.username}`;
                document.getElementById("welcome-message").textContent =
                    welcomeMessage;
            } else {
                console.warn("Token inválido ou expirado.");
                logout();
            }
        } catch (error) {
            console.error("Erro ao verificar login:", error);
            logout();
        }
    } else {
        console.warn("Token não encontrado. Redirecionando para login.");
        window.location.href = "login.html";
    }
}

// Logout
function logout() {
    localStorage.removeItem("token");
    alert("Logout realizado com sucesso!");
    window.location.href = "login.html";
}

// Chama a função ao carregar a página
//checkLoginStatus();

// Função para fazer login
// async function login() {
//     const username = document.getElementById("username").value.trim();
//     const password = document.getElementById("password").value.trim();

//     if (!username || !password) {
//         alert("Por favor, preencha todos os campos.");
//         return;
//     }

//     try {
//         const response = await fetch("http://localhost:3000/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         const data = await response.json();

//         if (data.success) {
//             // Salva as informações do usuário no localStorage
//             localStorage.setItem("currentUser", JSON.stringify(data.user));

//             alert("Login bem-sucedido!");
//             window.location.href = "index.html"; // Redireciona para a página principal
//         } else {
//             alert(data.message || "Erro no login.");
//         }
//     } catch (error) {
//         console.error("Erro ao realizar login:", error);
//         alert("Erro ao conectar com o servidor.");
//     }
// }

// Evento de click para o botão de logout
// document.getElementById("logout-btn").addEventListener("click", logout);
document.getElementById("logout-button").addEventListener("click", logout);

// Adiciona evento de click nos botões de login e registro, caso necessário
document.getElementById("login-button").addEventListener("click", () => {
    window.location.href = "login.html"; // Redireciona para a página de login
});

document.getElementById("register-button").addEventListener("click", () => {
    window.location.href = "register.html"; // Redireciona para a página de cadastro
});

document.getElementById("profile-picture").addEventListener("click", () => {
    window.location.href = "meuperfil.html"; // Redireciona para a página de cadastro
});
