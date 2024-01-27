import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();


//route to save new book 
router.post("/", async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook)

        return res.status(201).send(book);

    } catch (error) {
        console.log("newBook route error", error.message)
        res.status(500).send({ message: error.message });
    }

})

// Route to get all book list 
router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log("book get data", error.message);
        res.status(500).send({ message: error.message });
    }
})

// Route to get one book list 
router.get("/:id", async (req, res) => {
    try {
        //get book id 
        const { id } = req.params;
        // find book by id and display 
        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch (error) {
        console.log("book get data", error.message);
        res.status(500).send({ message: error.message });
    }
})

//route to update book
router.put("/:id", async (req, res) => {
    try {
        //fist check if all fields are correct or not if not show message use all fields 
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        //then get book id that we want to update
        const { id } = req.params;
        //then show result by this 
        const result = await Book.findByIdAndUpdate(id, req.body);
        // we result is empty then show error book not found else show message book updated 
        if (!result) {
            return res.status(404).json({ message: "Book not found" })
        }
        return res.status(200).json({ message: "Book Updated successfully" })

    } catch (error) {
        console.log("update book error", error.message);
        res.status(500).send({ message: error.message });
    }
})

//route to delete a book 
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Book not found" })
        }
        return res.status(200).json({ message: "Book Deleted successfully" })

    } catch (error) {
        console.log("delete book error" , error.message);
        res.status(500).send({message: error.message});
    }
})


export default router;