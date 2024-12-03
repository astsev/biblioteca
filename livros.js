document.addEventListener("DOMContentLoaded", function() {
    const loadBooksBtn = document.getElementById("loadBooksBtn");
    const bookList = document.getElementById("bookList");
    const bookForm = document.getElementById("bookForm");
    
    // Fetch books and display them
    loadBooksBtn.addEventListener("click", loadBooks);

    // Submit book form (add or edit)
    bookForm.addEventListener("submit", saveBook);

    function loadBooks() {
        fetch("http://localhost:8080/api/livros")
            .then(response => response.json())
            .then(books => {
                bookList.innerHTML = "";
                books.forEach(book => {
                    const bookItem = document.createElement("div");
                    bookItem.classList.add("book-item");
                    bookItem.innerHTML = `
                        <span>${book.nome} - ${book.autor}</span>
                        <button onclick="editBook(${book.id})">Editar</button>
                        <button onclick="deleteBook(${book.id})">Excluir</button>
                    `;
                    bookList.appendChild(bookItem);
                });
            })
            .catch(error => console.error("Erro ao carregar livros:", error));
    }

    function saveBook(event) {
        event.preventDefault();

        const id = document.getElementById("bookId").value;
        const codigoBarras = document.getElementById("codigoBarras").value;
        const nome = document.getElementById("nome").value;
        const autor = document.getElementById("autor").value;
        const categoria = document.getElementById("categoria").value;
        const quantidade = document.getElementById("quantidade").value;
        const disponibilidade = document.getElementById("disponibilidade").value === "true";

        const book = {
            codigoBarras,
            nome,
            autor,
            categoria,
            quantidade,
            disponibilidade
        };

        if (id) {
            // Atualizar livro
            fetch(`http://localhost:8080/api/livros/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
            })
            .then(response => response.json())
            .then(updatedBook => {
                loadBooks(); // Reload books
                resetForm();
            })
            .catch(error => console.error("Erro ao atualizar livro:", error));
        } else {
            // Adicionar livro
            fetch("http://localhost:8080/api/livros", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
            })
            .then(response => response.json())
            .then(newBook => {
                loadBooks(); // Reload books
                resetForm();
            })
            .catch(error => console.error("Erro ao adicionar livro:", error));
        }
    }

    function editBook(id) {
        fetch(`http://localhost:8080/api/livros/${id}`)
            .then(response => response.json())
            .then(book => {
                document.getElementById("bookId").value = book.id;
                document.getElementById("codigoBarras").value = book.codigoBarras;
                document.getElementById("nome").value = book.nome;
                document.getElementById("autor").value = book.autor;
                document.getElementById("categoria").value = book.categoria;
                document.getElementById("quantidade").value = book.quantidade;
                document.getElementById("disponibilidade").value = book.disponibilidade;
            })
            .catch(error => console.error("Erro ao buscar livro:", error));
    }

    function deleteBook(id) {
        fetch(`http://localhost:8080/api/livros/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            loadBooks(); // Reload books
        })
        .catch(error => console.error("Erro ao excluir livro:", error));
    }

    function resetForm() {
        bookForm.reset();
        document.getElementById("bookId").value = "";
    }
});
