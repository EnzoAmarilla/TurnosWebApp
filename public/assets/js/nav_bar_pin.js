document.addEventListener('DOMContentLoaded', function () {
    const pinIcon = document.getElementById('pin-icon');
    const navbar = document.getElementById('page-container');

    // Función para actualizar la interfaz según el estado del pin
    function updatePinState(isFixed) {
        if (isFixed) {
            pinIcon.setAttribute('data-pin', 'fixed');
            pinIcon.classList.remove('hgi-pin', 'text-primary');
            pinIcon.classList.add('hgi-pin-off', 'text-secondary');
            navbar.classList.remove('sidebar-mini');
            navbar.classList.add('pin-active');
        } else {
            pinIcon.setAttribute('data-pin', 'unfixed');
            pinIcon.classList.remove('hgi-pin-off', 'text-secondary');
            pinIcon.classList.add('hgi-pin', 'text-primary');
            navbar.classList.remove('pin-active');
            navbar.classList.add('sidebar-mini');
        }
    }

    // Si no existe el estado en localStorage, establecer el estado inicial como unfixed (false)
    if (localStorage.getItem('pinState') === null) {
        localStorage.setItem('pinState', 'false');
    }

    // Obtener el estado del pin desde localStorage (true = fixed, false = unfixed)
    const isFixed = localStorage.getItem('pinState') === 'true';
    updatePinState(isFixed);

    // Escuchar el evento de clic en el icono de pin
    pinIcon.addEventListener('click', function () {
        const isCurrentlyFixed = pinIcon.getAttribute('data-pin') === 'fixed';
        const newPinState = !isCurrentlyFixed;

        // Guardar el nuevo estado en localStorage
        localStorage.setItem('pinState', newPinState.toString());

        // Actualizar la interfaz según el nuevo estado
        updatePinState(newPinState);
    });
});
