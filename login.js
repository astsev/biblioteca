document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtendo os valores dos campos
    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;

    // Preparando o corpo da requisição para enviar ao backend
    const loginData = {
        cpf: cpf,
        senha: senha
    };

    // Enviando os dados para o backend via fetch
    fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Usuário ou senha incorretos");
        }
    })
    .then(data => {
        // Caso o login seja bem-sucedido
        console.log("Login bem-sucedido:", data);
        window.location.href = "/home"; // Redireciona para a página inicial (ajuste conforme a sua estrutura)
    })
    .catch(error => {
        // Exibindo mensagem de erro caso o login falhe
        document.getElementById("error-message").textContent = error.message;
    });
});
