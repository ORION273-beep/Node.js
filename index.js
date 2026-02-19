const chalk = require("chalk");
const fs = require("fs/promises");
const express = require("express");
const { addNote, getNotes, updateNote } = require("./notes.controller");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);

  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
  });
});

app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const updated = await updateNote(id, title);
    if (!updated) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json({ message: "Note updated" });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});
