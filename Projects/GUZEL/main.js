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



    // Обработка нажатия на табы Образование / Опыт работы

    const educ_tab = $('.education__title .title:first-child');
    const exp_tab = $('.education__title .title:last-child');

    educ_tab.on('click', () => switchTabs(educ_tab))
    exp_tab.on('click', () => switchTabs(exp_tab))

    const switchTabs = (tab_title) => {
        if(tab_title.attr('class') !== 'title title-active'){
            educ_tab.toggleClass('title-active')
            exp_tab.toggleClass('title-active')

            $('.exp__swiper-container').toggleClass('visually-hidden')
            $('.education__swiper-container').toggleClass('visually-hidden')
            $('.educ-swiper-pagination').toggleClass('visually-hidden')
            $('.exp-swiper-pagination').toggleClass('visually-hidden')
            
        }
    }

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

    const exp_swiper = new Swiper(".exp-swiper-slides", {
        slidesPerView: 1.7,
        navigation: {
            nextEl: '.exp__swiper-button-next',
            prevEl: '.exp__swiper-button-prev',
        },

        pagination: {
            el: '.exp-swiper-pagination',
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
        if (services_pagination_bullets[key] instanceof Element)
            services_pagination_bullets[key]?.appendChild(paragraph)
    }


    // Слайдер с результатами лечения
    const treatment_results_swiper = new Swiper(".treatment-results-swiper-slides", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 100,

        navigation: {
            nextEl: '.treatment-results__swiper-button-next',
            prevEl: '.treatment-results__swiper-button-prev',
        },

        pagination: {
            el: '.treatment-results__swiper-pagination',
            clickable: true,
        },

        breakpoints: {
            1000: {
                slidesPerView: 1.5,
                spaceBetween: 0,
            },
            1100: {
                slidesPerView: 1.4,
                spaceBetween: 0,
            }
        }

    });


});