$(document).ready(() => {

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

    burger.on('click', () => toggleBurger())
    darkenBackground.on('click', () => toggleBurger())




    // Слайдер с образованием и опытом работы

    const educ_swiper = new Swiper(".educ-swiper-slides", {
        slidesPerView: 1.7,
        navigation: {
            nextEl: '.educ__swiper-button-next',
            prevEl: '.educ__swiper-button-prev',
        },

        pagination: {
            el: '.educ-swiper-pagination',
            clickable: true,
        },

        breakpoints: {
            460: {
                slidesPerView: 2.5
            },
            768: {
                slidesPerView: 3
            }
        }
    });



    // Слайдер с приемами
    const services_swiper = new Swiper(".services-swiper-slides", {
        slidesPerView: 1,
        spaceBetween: 100,

        pagination: {
            el: '.services__swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.services__swiper-button-next',
            prevEl: '.services__swiper-button-prev',
        },

    });

    const services_pagination_bullets = $('.services__swiper-pagination .swiper-pagination-bullet')
    const services_slides_titles = $('.services__slide .text-content__title')
    // Задаем имена кнопкам навигации
    for (key in services_slides_titles) {

        let paragraph = document.createElement('p')
        paragraph.textContent = services_slides_titles[key].textContent
        paragraph.setAttribute('class', 'bullet-name')
        services_pagination_bullets[key]?.appendChild(paragraph)
    }


});