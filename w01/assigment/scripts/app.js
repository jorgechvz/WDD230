const year = document.querySelector(".copyrightyear");
const modified = document.querySelector(".modified");

year.textContent = `${new Date().getFullYear()}`
modified.textContent = new Date(document.lastModified).toLocaleString("en-UK");
