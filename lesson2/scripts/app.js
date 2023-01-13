/* JavaScript code for get the current year and the last updated */

const year = document.querySelector(".copyright_year");
const updated = document.querySelector(".last_updated")

year.textContent = `${new Date().getFullYear()}`;
updated.textContent = `${new Date(document.lastModified).toLocaleString("en-UK")}`
