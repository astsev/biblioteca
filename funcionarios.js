document.addEventListener("DOMContentLoaded", function() {
    const employeeForm = document.getElementById("employeeForm");

    // Handle form submission
    employeeForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const cpf = document.getElementById("cpf").value;
        const telefone = document.getElementById("telefone").value;
        const endereco = document.getElementById("endereco").value;
        const nome = document.getElementById("nome").value;
        const dataNascimento = document.getElementById("dataNascimento").value;
        const funcao = document.getElementById("funcao").value;
        const tipo = document.getElementById("tipo").value;
        const senha = document.getElementById("senha").value;
        const fotoPerfil = document.getElementById("fotoPerfil").files[0];

        const formData = new FormData();
        formData.append("cpf", cpf);
        formData.append("telefone", telefone);
        formData.append("endereco", endereco);
        formData.append("nome", nome);
        formData.append("dataNascimento", dataNascimento);
        formData.append("funcao", funcao);
        formData.append("tipo", tipo);
        formData.append("senha", senha);
        if (fotoPerfil) {
            formData.append("fotoPerfil", fotoPerfil);
        }

        // Send the data to the backend
        fetch("http://localhost:8080/api/funcionarios", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert("Funcionário cadastrado com sucesso!");
            employeeForm.reset();
        })
        .catch(error => {
            console.error("Erro ao cadastrar funcionário:", error);
            alert("Erro ao cadastrar funcionário. Tente novamente.");
        });
    });
});
