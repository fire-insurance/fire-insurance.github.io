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
        if (tab_title.attr('class') !== 'title title-active') {
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




    /* Страница "Статьи" */

    const mediaQueryMobile = window.matchMedia('(max-width: 700px)')

    const articles_list = $('.article-selector__article-scrollbar')
    const articles_group = document.querySelectorAll('.article-group')
    const articles_scrollbar_lists = document.querySelectorAll('.article-scrollbar-single')
    const article_selector_block = $('.article-selector')
    const mobile_scrollbar = $('#mobile-scrollbar')


    let currentRow = 2;
    let selectedArticleGroup = articles_group[0]
    let selectedArticleGroupScrollbar = articles_scrollbar_lists[0]

    const query_group = new URL(window.location.href).searchParams.get('group')

    let currentGroup = query_group ? query_group : 'diet'

    // При ширине экрана <= 700px переключить режим отображения
    // списка статей

    const append_mobile_scrollbar = (event) => {
        if (event.matches) {
            mobile_scrollbar[0]?.appendChild(articles_list[0])
        }
        else article_selector_block[0]?.appendChild(articles_list[0])

    }

    mediaQueryMobile.addListener(append_mobile_scrollbar)
    append_mobile_scrollbar(mediaQueryMobile)

    articles_group.forEach(group => {
        group.addEventListener('click', (event) => handleArticleGroupClick(event))
    })

    const handleArticleGroupClick = (event) => {
        if (event.currentTarget.className !== 'article-group article-group_active') {
            selectedArticleGroup.classList.remove('article-group_active')
            selectedArticleGroup = event.currentTarget
            selectedArticleGroup.classList.add('article-group_active')

            currentRow = selectedArticleGroup.getAttribute('data-row')
            currentGroup = selectedArticleGroup.getAttribute('data-group')
            mobile_scrollbar[0].setAttribute('style', `--row:${currentRow}`)

            selectedArticleGroupScrollbar.classList.add('visually-hidden')

            selectedArticleGroupScrollbar
            articles_scrollbar_lists.forEach(scrollbar => {
                if (scrollbar.getAttribute('data-group') === currentGroup) {
                    selectedArticleGroupScrollbar = scrollbar

                }
            })

            selectedArticleGroupScrollbar.classList.remove('visually-hidden')
        }
    }



    // Укорачиваем длину превью-текста карточек статей

    const articles_preview_text = $('.article__preview-text')
    const articleMediaQueryTablet = window.matchMedia('(max-width: 1000px)')
    const articleMediaQueryMobile = window.matchMedia('(max-width: 600px)')

    const lettersToKeep = [40, 58, 107]

    const initialArticlesText = []
    for (const article_text of articles_preview_text) {
        let text = article_text.textContent
            .replace(/[\n\r]+|[\s]{2,}/g, ' ')
            .trim();

        initialArticlesText.push(text)
    }

    const trimPreviewText = (event) => {

        let lettersToKeepIndex = event.media === '(max-width: 1000px)' ? 1 : 0
        let ltk

        if (event.matches) ltk = lettersToKeep[lettersToKeepIndex]
        else ltk = lettersToKeep[lettersToKeepIndex + 1]


        let i = 0;
        for (const article_text of articles_preview_text) {

            text = initialArticlesText[i].slice(0, ltk)
            article_text.textContent = text + '...'
            i++
        }

    }

    articleMediaQueryTablet.addListener(trimPreviewText)
    trimPreviewText(articleMediaQueryTablet)
    articleMediaQueryMobile.addListener(trimPreviewText)
    trimPreviewText(articleMediaQueryMobile)



    // Страница "Видео"

    const video_type_btn = $('.video-type-selector')
    const video_sort_btn = $('.video-sort')
    const video_type_selector = $('.video-type-menu')
    const video_sort_selector = $('.video-sort-menu')

    const video_type = $('.video-type')
    const video_type_menu_item = document.querySelectorAll('.video-type-menu .menu-item')

    console.log(video_type)

    video_type_menu_item.forEach(menu_item => {
        menu_item.addEventListener('click', () => {
            video_type[0].textContent = menu_item.textContent
        })
    })

    video_type_btn.on('click', () => {
        video_type_btn.toggleClass('video-type-selector_active')
        video_type_selector.toggleClass('video-menu_active')
        if (video_sort_selector[0].className === 'video-menu video-sort-menu video-menu_active')
            video_sort_selector.toggleClass('video-menu_active')
    })

    video_sort_btn.on('click', () => {
        video_sort_selector.toggleClass('video-menu_active')
        if (video_type_selector[0].className === 'video-menu video-type-menu video-menu_active')
            video_type_selector.toggleClass('video-menu_active')
    })


});