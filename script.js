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

    // Función para verificar la hora y enviar notificaciones
    function checkSchedule() {
        const now = new Date();
        const currentHour = now.getHours().toString().padStart(2, "0");
        const currentMinute = now.getMinutes().toString().padStart(2, "0");
        const currentTime = `${currentHour}:${currentMinute}`;

        document.querySelectorAll("li[data-time]").forEach(item => {
            if (item.getAttribute("data-time") === currentTime) {
                showNotification(item.getAttribute("data-message"));
                console.log("Recordatorio enviado...");
            }
        });
    }

    // Función para mostrar notificación
    function showNotification(message) {
        if (Notification.permission === "granted") {
            new Notification("📌 Recordatorio", { body: message });
            
        }
    }

    // Revisar cada minuto
    setInterval(checkSchedule, 60000);
});
