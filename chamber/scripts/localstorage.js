/* LocalStorage */
// Function to calculate the difference in days between two dates
function getDaysDiff(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; 
    const diffInMs = Math.abs(date1 - date2);
    return Math.round(diffInMs / oneDay);
  }

// Function to update the information of the last visit
function updateVisitInfo() {
    const lastVisitStr = localStorage.getItem("lastVisit");
    let visits = localStorage.getItem("visits");
    let info = "";
    if (lastVisitStr && visits) {
      const lastVisit = new Date(lastVisitStr);
      const today = new Date();
      const daysDiff = getDaysDiff(today, lastVisit);
      visits++;
      localStorage.setItem("lastVisit", today);
      localStorage.setItem("visits", visits);
      info = `You last visited this page ${daysDiff} days ago. You have visited this page ${visits} times.`;
    } else {
      localStorage.setItem("lastVisit", new Date());
      localStorage.setItem("visits", 1);
    }
    const infoElem = document.getElementById("visitInfo");
    infoElem.textContent = info;
}
// Update last visit information and number of visits on page load
window.onload = updateVisitInfo;