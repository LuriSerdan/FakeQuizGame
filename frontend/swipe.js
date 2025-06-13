function Swipe() {
    const events = {
        onchoice: undefined,
        onend: undefined
    }
    const cardContainer = document.querySelector('.card-container');
    let cards = document.querySelectorAll('.card');
    const likeButton = document.querySelector('.verdadeiro');
    const dislikeButton = document.querySelector('.falso');

    let isDragging = false;
    let isMouseDown = false;
    let dragThreshold = 10; // px
    let startX, startY, currentCard;

    function finishEvents() {
        likeButton.removeEventListener('click', handleLike);
        dislikeButton.removeEventListener('click', handleDislike);

        // Remove eventos do mouse
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        // Remove eventos de toque (touch)
        document.removeEventListener('touchstart', handleMouseDown, { passive: false });
        document.removeEventListener('touchmove', handleMouseMove, { passive: false });
        document.removeEventListener('touchend', handleMouseUp);
    }

    // Função genérica para remover um elemento com animação de transformação e recalcular a lista de cartões
    function removeElementIfPresent(element, diffX) {
        if (element && element.parentNode) {
            // Adiciona a animação de transformação antes de remover o elemento
            element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            element.style.transform = `translate(${diffX > 0 ? 500 : -500}px, 100px) rotate(${diffX > 0 ? 30 : -30}deg)`;
            element.style.opacity = 0;

            // Atraso para remoção do cartão
            setTimeout(() => {
                element.remove();

                // Recalcular a lista de cartões após remoção
                cards = document.querySelectorAll('.card'); // Atualiza a lista de cartões
                if (cards.length === 0) {
                    events.onend()
                    finishEvents()
                }
            }, 300);
        }
    }

    function handleMouseDown(e) {
        isMouseDown = true;
        isDragging = false;
        currentCard = e.target.closest('.card'); // Garante que interage apenas com .card
        startX = e.clientX || (e.touches && e.touches[0].clientX);
        startY = e.clientY || (e.touches && e.touches[0].clientY);
    }

    function handleMouseMove(e) {
        if (!isMouseDown || !currentCard) return;

        const currentX = e.clientX || (e.touches && e.touches[0].clientX);
        const currentY = e.clientY || (e.touches && e.touches[0].clientY);
        const diffX = currentX - startX;
        const diffY = currentY - startY;

        if (!isDragging && Math.abs(diffX) > dragThreshold) {
            isDragging = true;
        }

        if (isDragging) {
            currentCard.style.transform = `translate(${diffX}px, ${diffY}px) rotate(${diffX * 0.2}deg)`;
        }
    }

    const handleMouseUp = (e) => {
        if (!isMouseDown) return;

        isMouseDown = false;

        if (!isDragging || !currentCard) {
            isDragging = false;
            currentCard = null;
            return;
        }

        const endX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
        const diffX = endX - startX;

        if (Math.abs(diffX) > 300) {
            if (diffX > 300) events.onchoice(true)
            else if (diffX < -300) events.onchoice(false)
            // Chama a função genérica de remoção com a transformação e recalculando a lista de cartões
            removeElementIfPresent(currentCard, diffX);
        } else {
            // Retorna o cartão à posição original se não for um swipe
            currentCard.style.transition = 'transform 0.3s ease';
            currentCard.style.transform = 'translate(0, 0) rotate(0)';
        }

        isDragging = false;
        currentCard = null;
    }

    // Funções de "like" e "dislike" acionadas pelos botões
    function handleLike() {
        // Atualiza a lista de cartões e pega o primeiro cartão visível
        cards = document.querySelectorAll('.card');
        const card = cards[cards.length - 1]; // Sempre pega o primeiro cartão visível
        if (card) {
            const diffX = 500; // Direção do like (para a direita)
            removeElementIfPresent(card, diffX);
        }
        events.onchoice(true)
    }

    function handleDislike() {
        // Atualiza a lista de cartões e pega o primeiro cartão visível
        cards = document.querySelectorAll('.card');
        const card = cards[cards.length - 1]; // Sempre pega o primeiro cartão visível
        if (card) {
            const diffX = -500; // Direção do dislike (para a esquerda)
            removeElementIfPresent(card, diffX);
        }
        events.onchoice(false)
    }

    // Adiciona os eventos para os botões de "like" e "dislike"
    likeButton.addEventListener('click', handleLike);
    dislikeButton.addEventListener('click', handleDislike);

    // Adicione os eventos ao document, garantindo que capture os movimentos fora do cardContainer
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    document.addEventListener('touchstart', handleMouseDown, { passive: false });
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);

    return events;
}