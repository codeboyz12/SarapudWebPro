const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const app = express();
const port = 8000;

app.use(express.json()); 
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", price: 350 },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", category: "Education", price: 950 },
    { id: 3, title: "Harry Potter", author: "J.K. Rowling", category: "Fantasy", price: 450 }
];
let counter = 4;

app.get('/books', (req, res) => {
    let { search, sortBy, order } = req.query;
    let filteredBooks = [...books];

    if (search) {
        filteredBooks = filteredBooks.filter(b => 
            b.title.toLowerCase().includes(search.toLowerCase()) ||
            b.author.toLowerCase().includes(search.toLowerCase())
        );
    }

    if (sortBy) {
        filteredBooks.sort((a, b) => {
            let valA = a[sortBy];
            let valB = b[sortBy];
            
            if (order === 'desc') {
                return valA < valB ? 1 : -1;
            }
            return valA > valB ? 1 : -1;
        });
    }

    res.status(200).json(filteredBooks);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
});

app.post('/books', (req, res) => {
    const { title, author, category, price } = req.body;

    if (!title || !author || !price) {
        return res.status(400).json({ message: "Required fields: title, author, price" });
    }

    const newBook = { id: counter++, title, author, category: category || "General", price: Number(price) };
    books.push(newBook);

    res.status(201).json({ message: "Book created successfully", data: newBook });
});

app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) return res.status(404).json({ message: "Book not found" });

    books[index] = { ...books[index], ...req.body, id }; 

    res.status(200).json({ message: "Book updated successfully", data: books[index] });
});


app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) return res.status(404).json({ message: "Book not found" });

    books.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Book Management API is running:`);
    console.log(`- API: http://localhost:${port}/books`);
    console.log(`- Docs: http://localhost:${port}/api-docs`);
});