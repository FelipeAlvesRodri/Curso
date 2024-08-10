// Array para armazenar os clientes
let clientes = [];

// Função para adicionar cliente
function adicionarCliente(nome, email) {
    const cliente = { nome, email };
    clientes.push(cliente);
    exibirClientes();
}

// Função para exibir os clientes na lista
function exibirClientes() {
    const listaClientes = document.getElementById('listaClientes');
    listaClientes.innerHTML = '';

    clientes.forEach((cliente, index) => {
        const li = document.createElement('li');
        li.textContent = `Nome: ${cliente.nome}, Email: ${cliente.email}`;
        listaClientes.appendChild(li);
    });
}

// Evento de submissão do formulário
document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    adicionarCliente(nome, email);

    document.getElementById('clienteForm').reset();
});
