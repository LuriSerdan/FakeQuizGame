function openPopup() {
    document.getElementById('popupOverlay').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
}

function toggleAnswer(id, element) {
    const resposta = document.getElementById(id);
    const isVisible = resposta.style.display === "block";

    // Oculta todas as respostas e remove classe expandida
    document.querySelectorAll(".faq-answer").forEach(el => el.style.display = "none");
    document.querySelectorAll(".faq-item").forEach(el => el.classList.remove("expanded"));

    if (!isVisible) {
        resposta.style.display = "block";
        element.classList.add("expanded");
    }
}
