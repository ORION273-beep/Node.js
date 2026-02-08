const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const pkg = require("./package.json");
const { addNote, printNotes, removeNote } = require("./notes.controller");

const argv = yargs(hideBin(process.argv))
  .version(pkg.version)

  .command({
    command: "add",
    describe: "Add new note to list",
    builder: {
      title: {
        type: "string",
        describe: "Note title",
        demandOption: true,
      },
    },
    handler({ title }) {
      addNote(title);
    },
  })

  .command({
    command: "list",
    describe: "Print all notes",
    async handler() {
      await printNotes();
    },
  })

  .command({
    command: "remove",
    describe: "Remove note by id",
    builder: {
      id: {
        type: "string",
        describe: "ID of the note to remove",
        demandOption: true,
      },
    },
    async handler({ id }) {
      await removeNote(id);
    },
  })

  .parse();
