const membershipCardsContainer = document.getElementById("membership-cards-container");
const joinForm = document.querySelector("#join-form-container");

membershipCardsContainer.addEventListener("click", function(event) {
  if (event.target.classList.contains("select-membership")) {
    membershipCardsContainer.style.display = "none";
    joinForm.style.display = "block";
    const membershipLevelInput = document.getElementById("membership-level");
    const selectedMembership = event.target.getAttribute("data-membership");
    membershipLevelInput.value = selectedMembership;
    localStorage.setItem("selectedMembership", selectedMembership);
  }
});

window.addEventListener("load", function() {
  const selectedMembership = localStorage.getItem("selectedMembership");
  if (selectedMembership) {
    joinForm.style.display = "none";
    const membershipLevelInput = document.getElementById("membership-level");
    membershipLevelInput.value = selectedMembership;
  }
});

joinForm.addEventListener("submit", function() {
  localStorage.removeItem("selectedMembership");
});
