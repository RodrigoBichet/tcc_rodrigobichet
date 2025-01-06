const updateForm = document.getElementById("update-form");
const deleteButton = document.getElementById("delete-account");
const confirmModal = document.getElementById("confirm-modal");
const confirmDelete = document.getElementById("confirm-delete");
const cancelDelete = document.getElementById("cancel-delete");

// Token JWT armazenado no localStorage
const token = localStorage.getItem("token");

if (!token) {
    alert("Usuário não autenticado. Faça login para continuar.");
    window.location.href = "/login.html"; // Redireciona para a página de login
}

// Atualizar perfil
updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(updateForm);

    try {
        // const response = await fetch("http://localhost:3000/user/update", {
        const response = await fetch(
            "https://tcc-rodrigobichet-web.onrender.com/user/update",
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            }
        );
        const data = await response.json();
        if (data.success) {
            alert("Perfil atualizado com sucesso!");
        } else {
            alert(data.message || "Erro ao atualizar perfil.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao atualizar perfil.");
    }
});

// Abrir modal de confirmação
deleteButton.addEventListener("click", () => {
    confirmModal.style.display = "flex";
});

// Confirmar exclusão
confirmDelete.addEventListener("click", async () => {
    try {
        // const response = await fetch("http://localhost:3000/user/delete", {
        const response = await fetch(
            "https://tcc-rodrigobichet-web.onrender.com/user/delete",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        if (data.success) {
            alert("Conta excluída com sucesso!");
            localStorage.removeItem("token");
            window.location.href = "/"; // Redirecionar após exclusão
        } else {
            alert(data.message || "Erro ao excluir conta.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao excluir conta.");
    }
});

// Cancelar exclusão
cancelDelete.addEventListener("click", () => {
    confirmModal.style.display = "none";
});
