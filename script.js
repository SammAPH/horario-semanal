document.addEventListener("DOMContentLoaded", () => {
    const toggleDarkMode = document.getElementById("toggle-dark-mode");

    // Cargar modo oscuro guardado
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }

    // Alternar modo oscuro
    toggleDarkMode.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });

    // Pedir permiso para notificaciones
    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    function checkSchedule() {
        const now = new Date();
        const currentHour = now.getHours().toString().padStart(2, "0");
        const currentMinute = now.getMinutes().toString().padStart(2, "0");
        const currentTime = `${currentHour}:${currentMinute}`;
        
        let activityHighlighted = false;

        document.querySelectorAll("li[data-time]").forEach(item => {
            if (item.getAttribute("data-time") === currentTime) {
                item.classList.add("active-activity");
                showNotification(item.getAttribute("data-message"));
                highlightDay(item.closest(".day-container"));
                activityHighlighted = true;
            } else {
                item.classList.remove("active-activity");
            }
        });
    }

    function highlightDay(dayElement) {
        document.querySelectorAll(".day-container").forEach(day => {
            day.classList.remove("active-day");
        });
        if (dayElement) {
            dayElement.classList.add("active-day");
        }
    }

    function showNotification(message) {
        if (Notification.permission === "granted") {
            new Notification("📌 Recordatorio", { body: message });
        }
    }

    // Revisar cada minuto
    setInterval(checkSchedule, 60000);
    checkSchedule(); // Ejecutar al cargar la página
});