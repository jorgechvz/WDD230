const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
async function getProphetData(url) {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.prophets);
    displayProphets(data.prophets);
}
  
getProphetData(url);

const displayProphets = (prophets) => {
    const cards = document.querySelector('.cards'); // select the output container element
  
    prophets.forEach((prophet) => {
        // Create elements to add to the div.cards element
        let card = document.createElement('section');
        let portrait = document.createElement('img');
        if(prophet.death != null){
            prophetDeath = prophet.death;
        } else{
            prophetDeath = 'Not yet';
        }
        // Build the h2 content out to show the prophet's full name - finish the template string
        card.innerHTML = `<div>
            <h2>${prophet.name} ${prophet.lastname}</h2>
            <p>Date of Birth: ${prophet.birthdate}</p>
            <p>Place of Birth: ${prophet.birthplace}</p>
            <p>Children: ${prophet.numofchildren}</p>
            <p>Prophet Years: ${prophet.length}</p>
            <p>Death: ${prophetDeath}</p>
            <p>Age: ${GetAge(prophet.birthdate,prophet.death)}</p></div>
        `
        
        // Build the image portrait by setting all the relevant attribute
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portait of ${prophet.name} ${prophet.lastname}- ${prophet.order}<sup>th</sup> Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
        
        // Append the section(card) with the created elements
        card.appendChild(portrait);
        cards.appendChild(card);
    })
} 

const GetDateFormatted = (date) => {
    let dateStr = date;
    let dateNew = new Date(dateStr);
    return dateNew.getFullYear();
}
const GetAge = (birthdate,deathDate) => {
    if (deathDate){
        return new Date(GetDateFormatted(deathDate)).getTime() - new Date(GetDateFormatted(birthdate)).getTime();
    } else{
        return new Date().getFullYear() - new Date(GetDateFormatted(birthdate)).getTime();
    }
}
