// document
//     .getElementById("register-form")
//     .addEventListener("submit", async function (event) {
//         event.preventDefault();

//         const username = document.getElementById("username").value.trim();
//         const email = document.getElementById("email").value.trim();
//         const password = document.getElementById("password").value.trim();
//         const confirmPassword = document
//             .getElementById("confirm-password")
//             .value.trim();
//         const profilePictureInput = document.getElementById("profile-picture");

//         const usernameError = document.getElementById("username-error");
//         const emailError = document.getElementById("email-error");
//         const passwordError = document.getElementById("password-error");
//         const confirmPasswordError = document.getElementById(
//             "confirm-password-error"
//         );
//         const profilePictureError = document.getElementById(
//             "profile-picture-error"
//         );
//         const successMessage = document.getElementById("success-message");

//         // Resetar mensagens de erro
//         usernameError.textContent = "";
//         emailError.textContent = "";
//         passwordError.textContent = "";
//         confirmPasswordError.textContent = "";
//         profilePictureError.textContent = "";
//         successMessage.textContent = "";

//         let isValid = true;

//         // Validação de campos
//         if (!username) {
//             usernameError.textContent = "O nome de usuário é obrigatório.";
//             isValid = false;
//         }

//         if (!validateEmail(email)) {
//             emailError.textContent = "Por favor, insira um e-mail válido.";
//             isValid = false;
//         }

//         if (password.length < 6 || password.length > 15) {
//             passwordError.textContent =
//                 "A senha deve ter entre 6 e 15 caracteres.";
//             isValid = false;
//         }

//         if (password !== confirmPassword) {
//             confirmPasswordError.textContent = "As senhas não coincidem.";
//             isValid = false;
//         }

//         if (profilePictureInput.files.length > 0) {
//             const file = profilePictureInput.files[0];
//             if (!file.type.startsWith("image/")) {
//                 profilePictureError.textContent =
//                     "Por favor, selecione uma imagem válida.";
//                 isValid = false;
//             }
//         }

//         if (!isValid) {
//             return;
//         }

//         // Enviar dados para o servidor
//         const formData = new FormData();
//         formData.append("username", username);
//         formData.append("email", email);
//         formData.append("password", password);
//         formData.append("profile_picture", profilePictureInput.files[0]);

//         try {
//             const response = await fetch("http://localhost:3000/register", {
//                 method: "POST",
//                 body: formData,
//             });

//             const data = await response.json();

//             if (response.ok && data.success) {
//                 alert("Cadastro realizado com sucesso!");
//                 window.location.href = "login.html"; // Redireciona para a página de login
//             } else {
//                 alert(data.message || "Erro no cadastro.");
//             }
//         } catch (error) {
//             console.error("Erro ao realizar o cadastro:", error);
//             alert("Erro ao conectar com o servidor.");
//         }
//     });

// function validateEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    // const profilePicture = document.getElementById("profile-picture").files[0];

    if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        // document.getElementById("username-error").textContent =
        //     data.message || "As senhas não coincidem.";

        return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    // if (profilePicture) {
    //     formData.append("profile_picture", profilePicture);
    // }

    try {
        // const response = await fetch("http://localhost:3000/register", {
        const response = await fetch("https://maisludus.netlify.app/register", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            alert("Cadastro realizado com sucesso! Faça login para continuar.");
            // const successMessage = document.getElementById("success-message");
            // successMessage.textContent = "Cadastro realizado com sucesso!";
            // successMessage.style.color = "green";

            window.location.href = "login.html";
        } else {
            alert(data.message || "Erro ao realizar cadastro.");
            // document.getElementById("username-error").textContent =
            //     data.message || "Erro ao cadastrar.";
        }
    } catch (error) {
        console.error(error);
        alert("Cadastro realizado com sucesso! Faça login para continuar.");
        window.location.href = "login.html";
    }
});

function redirectToLogin() {
    window.location.href = "login.html"; // Substitua pelo caminho correto para a página de cadastro
}
