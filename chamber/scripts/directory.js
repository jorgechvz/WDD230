const url = "https://raw.githubusercontent.com/jorgechvz/WDD230/master/chamber/JSON/data.json";
const gridbutton = document.querySelector(".grid-button");
const listbutton = document.querySelector(".list-button");
const display = document.querySelector("#directory_container");


async function getDirectoryData(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayDirectory(data.directory);
}
  
getDirectoryData(url);

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }
const displayDirectory = (directory) => {
    let directoryCard = document.querySelector("#directory_container");
    directory.forEach((directoryItem) => {
        let card = document.createElement('section');
        let imgDirectory = document.createElement('img');
        imgDirectory.className = "icon-directory"
        imgDirectory.setAttribute("src",directoryItem.image);
        imgDirectory.setAttribute("alt",`Icon for ${directoryItem.name}`);
        imgDirectory.setAttribute('loading', 'lazy');
        card.innerHTML =`
            <div>
                <h2>${directoryItem.name}</h2>
                <p>${directoryItem.address}</p>
                <p>${directoryItem.phone}</p>
                <p>Membership: ${capitalize(directoryItem.membership)}</p>
                <a href="${directoryItem.website}">${directoryItem.website}</a>
            </div>
        `
        card.appendChild(imgDirectory);
        directoryCard.appendChild(card);
    });
}

gridbutton.addEventListener("click", () => {
	display.classList.add("grid_container");
	display.classList.remove("list_container");
});
listbutton.addEventListener("click", () => {
	display.classList.add("list_container");
	display.classList.remove("grid_container");
});

