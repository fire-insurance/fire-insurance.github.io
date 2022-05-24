$(() => {

    // Обработка нажатия на бургер или затемнение экрана под модальной навигацией

    let burger = $('.burger');
    let modalNavigation = $('.modal-menu');
    let darkenBackground = $('.darkening');
    let header = $('.header');

    const toggleBurger = () => {
        burger.toggleClass('burger_opened')
        modalNavigation.toggleClass('modal-menu_opened')
        darkenBackground.toggleClass('darkening_active')
        header.toggleClass('header_modal-opened')
    }

    burger.click(() => toggleBurger())
    darkenBackground.click(() => toggleBurger())

});