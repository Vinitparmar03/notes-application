const createNotes = document.querySelector(".container .btn");
const notesContainer = document.querySelector(".container .notes-container");

notesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "I") {
        const noteDiv = e.target.parentNode;
        const noteKey = noteDiv.dataset.noteKey;
        noteDiv.remove();
        localStorage.removeItem(noteKey);
    }
});

createNotes.addEventListener("click", () => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("text-area");

    const content = `
        <textarea name="notes" class="notes" placeholder="Write your notes here"></textarea>
        <i class="fa-solid fa-trash"></i>
    `;

    newDiv.innerHTML = content;
    newDiv.dataset.noteKey = 'userNote' + notesContainer.children.length;

    notesContainer.appendChild(newDiv);

    newDiv.querySelector(".notes").addEventListener('input', (e) => {
        saveNotes(e);
    });
});

function saveNotes(e) {
    const noteTextareas = notesContainer.querySelectorAll('.text-area .notes');
    
    if (typeof (Storage) !== "undefined") {
        noteTextareas.forEach(function (textarea) {
            const noteKey = textarea.parentNode.dataset.noteKey;
            const noteValue = textarea.value;
            localStorage.setItem(noteKey, noteValue);
        });
    } else {
        alert('Sorry, your browser does not support local storage. Notes cannot be saved.');
    }
}

window.onload = () => {
    // Check if localStorage is supported by the browser
    if (typeof (Storage) !== "undefined") {
        // Load each note from localStorage and create textareas
        for (let i = 0; i < localStorage.length; i++) {
            const noteKey = localStorage.key(i);
            const noteValue = localStorage.getItem(noteKey);

            const newDiv = document.createElement("div");
            newDiv.classList.add("text-area");
            newDiv.dataset.noteKey = noteKey;

            const content = `
                <textarea name="notes" class="notes" placeholder="Write your notes here"></textarea>
                <i class="fa-solid fa-trash"></i>
            `;

            newDiv.innerHTML = content;
            notesContainer.appendChild(newDiv);

            newDiv.querySelector(".notes").value = noteValue;

            newDiv.querySelector(".notes").addEventListener('input', function (e) {
                saveNotes(e);
            });
        }
    } else {
        alert('Sorry, your browser does not support local storage. Notes cannot be loaded.');
    }
};
