document.getElementById("emprestimoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const clienteId = document.getElementById("clienteId").value;
    const livroId = document.getElementById("livroId").value;
    const dataEmprestimo = document.getElementById("dataEmprestimo").value;
    const dataDevolucao = document.getElementById("dataDevolucao").value;
    const dataPrevista = document.getElementById("dataPrevista").value;
    const status = document.getElementById("status").value;

    const emprestimoData = {
        clienteId,
        livroId,
        dataEmprestimo,
        dataDevolucao,
        dataPrevista,
        status
    };

    fetch("http://localhost:8080/api/emprestimos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(emprestimoData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Empréstimo cadastrado com sucesso!");
        listarEmprestimos();
    })
    .catch(error => {
        console.error("Erro ao cadastrar empréstimo:", error);
        alert("Erro ao cadastrar empréstimo.");
    });
});

document.getElementById("listarEmprestimosBtn").addEventListener("click", listarEmprestimos);

function listarEmprestimos() {
    fetch("http://localhost:8080/api/emprestimos")
    .then(response => response.json())
    .then(emprestimos => {
        const emprestimosList = document.getElementById("emprestimosList");
        emprestimosList.innerHTML = "";
        emprestimos.forEach(emprestimo => {
            const li = document.createElement("li");
            li.textContent = `ID: ${emprestimo.id} | Cliente ID: ${emprestimo.clienteId} | Livro ID: ${emprestimo.livroId} | Data Emprestimo: ${emprestimo.dataEmprestimo} | Status: ${emprestimo.status}`;
            emprestimosList.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Erro ao listar empréstimos:", error);
    });
}
