// script.js

const apiUrl = 'http://localhost:8080/api/clientes'; // URL do backend

// Função para cadastrar cliente
document.getElementById('cliente-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const cpf = document.getElementById('cpf').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    const clienteData = {
        cpf,
        nome,
        email,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData),
    })
    .then((response) => response.json())
    .then((data) => {
        alert('Cliente cadastrado com sucesso!');
        listarClientes();
    })
    .catch((error) => {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Erro ao cadastrar cliente.');
    });
});

// Função para listar clientes
function listarClientes() {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((clientes) => {
            const clientesList = document.getElementById('clientes-list');
            clientesList.innerHTML = ''; // Limpa a lista antes de exibir

            clientes.forEach((cliente) => {
                const li = document.createElement('li');
                li.textContent = `Nome: ${cliente.nome} | CPF: ${cliente.cpf} | Email: ${cliente.email}`;
                clientesList.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Erro ao listar clientes:', error);
        });
}

// Função para buscar cliente por CPF
function buscarClientePorCpf() {
    const cpf = document.getElementById('search-cpf').value;
    fetch(`${apiUrl}/cpf/${cpf}`)
        .then((response) => response.json())
        .then((cliente) => {
            const clienteInfo = document.getElementById('cliente-info');
            if (cliente) {
                clienteInfo.innerHTML = `
                    <h4>Cliente Encontrado</h4>
                    <p>Nome: ${cliente.nome}</p>
                    <p>CPF: ${cliente.cpf}</p>
                    <p>Email: ${cliente.email}</p>
                `;
            } else {
                clienteInfo.innerHTML = '<p>Cliente não encontrado.</p>';
            }
        })
        .catch((error) => {
            console.error('Erro ao buscar cliente:', error);
        });
}

// Carregar clientes ao inicializar
window.onload = listarClientes;
