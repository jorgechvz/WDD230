/* Create three variables that hold references to the input, button, and list elements using const. */
const input = document.querySelector("input"); 
const button = document.querySelector("button"); 
const list = document.querySelector("ul"); 

/* Create an click event listener for the Add Chapter button using addEventListener and an anonymous function.   */
button.addEventListener('click', () => {
    /* make sure the input is not blank before doing the following remaining tasks in this list */
    if (input.value.trim() === "") {
        return;
    }
    /* create an li element
    create a delete button */
    const myList = document.createElement('li');
    const deleteBtn = document.createElement('button');
    /* populate the li elements textContent or innerHTML with the input
    populate the button textContent with an ❌
    */
    myList.innerHTML = input.value;
    deleteBtn.innerHTML = "❌";
    /* append the li element with the delete button
    append the list element with the li element just created and appended with text and the delete button */
    myList.appendChild(deleteBtn)
    list.appendChild(myList);
    /* add an event listener to the delete button that removes the li element when clicked */
    deleteBtn.addEventListener('click', () => {
        myList.remove();
    })
    /* send the focus to the input element */
    input.focus();
    /* change the input value to nothing or the empty string to clean up the interface for the user */
    input.value ="";
})