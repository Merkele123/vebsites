document.addEventListener("DOMContentLoaded", function () {
    const monthYear = document.getElementById("monthYear");
    const calendar = document.getElementById("calendar");
    const prevMonth = document.getElementById("prevMonth");
    const nextMonth = document.getElementById("nextMonth");

    let currentDate = new Date();

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        monthYear.textContent = date.toLocaleString("en", { month: "long", year: "numeric" });

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const prevLastDate = new Date(year, month, 0).getDate();

        calendar.innerHTML = "";

        // Fill previous month's dates
        for (let i = firstDay === 0 ? 6 : firstDay - 1; i > 0; i--) {
            let div = document.createElement("div");
            div.classList.add("date");
            div.style.opacity = "0.3";
            div.textContent = prevLastDate - i + 1;
            calendar.appendChild(div);
        }

        // Fill current month dates
        for (let i = 1; i <= lastDate; i++) {
            let div = document.createElement("div");
            div.classList.add("date");
            if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                div.classList.add("today");
            }
            div.textContent = i;
            calendar.appendChild(div);
        }
    }

    prevMonth.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonth.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});
