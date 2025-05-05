const yearsBtn = document.getElementById("yearsBtn");
const yearDropdown = document.getElementById("yearDropdown");
const fromYearSelect = document.getElementById("fromYear");
const toYearSelect = document.getElementById("toYear");
const dropdownButton = document.querySelector(".dropdown-button");

// Toggle dropdown on click
yearsBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent closing dropdown immediately
  yearDropdown.classList.toggle("show");
});

// Close dropdown when clicking outside
document.addEventListener("click", function (e) {
  if (!yearsBtn.contains(e.target) && !yearDropdown.contains(e.target)) {
    yearDropdown.classList.remove("show");
  }
});

// When a from year is selected, default toYear to current year (if not already set)
fromYearSelect.addEventListener("change", function () {
  const fromYear = fromYearSelect.value;

  if (toYearSelect.value === "To") {
    const currentYear = new Date().getFullYear();

    // Add current year to "to" dropdown if missing
    let exists = [...toYearSelect.options].some(
      (opt) => opt.value === currentYear.toString()
    );
    if (!exists) {
      const option = document.createElement("option");
      option.value = currentYear;
      option.textContent = currentYear;
      toYearSelect.appendChild(option);
    }

    toYearSelect.value = currentYear;
  }

  updateButtonText();
});

toYearSelect.addEventListener("change", function () {
  updateButtonText();
});

// Show selected years in the dropdown button
function updateButtonText() {
  const from = fromYearSelect.value;
  const to = toYearSelect.value;
  if (from !== "From" && to !== "To") {
    dropdownButton.textContent = `${from}-${to}`;
  } else {
    dropdownButton.textContent = "Years";
  }
}

// Timer
function startCountdown(id, duration) {
  let timer = duration,
    hours,
    minutes,
    seconds;
  const display = document.getElementById(id);
  setInterval(() => {
    hours = Math.floor(timer / 3600);
    minutes = Math.floor((timer % 3600) / 60);
    seconds = timer % 60;

    display.textContent = `${hours}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    if (--timer < 0) timer = 0;
  }, 1000);
}

startCountdown("timer1", 8 * 60 * 60); // 8 hours

const filledStarSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" 
         width="16" height="16" fill="currentColor" 
         class="bi bi-star-fill au__star_icon filled"
         viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73
        L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 
        0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 
        3.356.83 4.73c.078.443-.36.79-.746.592L8 
        13.187l-4.389 2.256z"/>
    </svg>
  `;

const outlinedStarSVG = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="16" height="16" fill="currentColor"
         class="bi bi-star au__star_icon"
         viewBox="0 0 16 16">
      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 
        4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 
        3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792
        a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696
        c-.441.062-.612.636-.283.95l3.523 3.356-.83 
        4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 
        0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 
        0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 
        0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 
        0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 
        0 0 0-.461 0z"/>
    </svg>
  `;

document.querySelectorAll(".au__watch_list").forEach((el) => {
  let isFilled = false;

  el.addEventListener("click", () => {
    el.innerHTML = isFilled ? outlinedStarSVG : filledStarSVG;
    isFilled = !isFilled;
  });
});
