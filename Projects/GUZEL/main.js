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

    const expand_slide_text_btn = $('.slide-show-full-text-btn')
    const slidesTextContent = $('.text-content__overflow')

    for (let i = 0; i < slidesTextContent.length; i++) {
        if (slidesTextContent.eq(i)[0].clientHeight < 150) {
            expand_slide_text_btn.eq(i).addClass('visually-hidden')
        }
    }

    for (let i = 0; i < expand_slide_text_btn.length; i++) {
        expand_slide_text_btn.eq(i).on('click', () => handleExpandBtnClick(expand_slide_text_btn.eq(i)))
    }

    function handleExpandBtnClick(exp_btn) {
        exp_btn.toggleClass('slide-show-full-text-btn_opened')
        exp_btn.parent().children('.text-content__overflow').toggleClass('text-content__overflow-unset')
    }


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
    const articles_ontheme = $('.articles-on-theme__grid').children('a')
    const videos_ontheme = document.querySelectorAll('.videos-on-theme')

    const query_group = new URL(window.location.href).searchParams.get('group')

    let currentGroup = query_group ? query_group : articles_group[0]?.getAttribute('data-group')
    let selectedArticleGroup
    let selectedArticleGroupScrollbar

    articles_group.forEach(block => {
        if (block.getAttribute('data-group') === currentGroup) {
            selectedArticleGroup = block
        }
    })

    articles_scrollbar_lists.forEach(block => {
        if (block.getAttribute('data-group') === currentGroup) {
            selectedArticleGroupScrollbar = block
        }
    })

    try {

        changeCurrentGroup(currentGroup)

        sendSearchRequest('')
    }
    catch {
    }

    // При ширине экрана <= 700px переключить режим отображения
    // списка статей

    const append_mobile_scrollbar = (event) => {
        if (event.matches) {
            mobile_scrollbar[0]?.appendChild(articles_list[0])
        }
        else article_selector_block[0]?.appendChild(articles_list[0])

    }

    function lazyLoadImgsInNode(node, image_selector, load) {
        const node_images = node.querySelectorAll(image_selector)
        for (const image of node_images) {
            let new_src = load ? image.getAttribute('data-img-src') : ''

            image.setAttribute('src', new_src)
        }
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
            currentGroup = selectedArticleGroup.getAttribute('data-group')
            changeCurrentGroup(currentGroup)
        }
    }

    function changeCurrentGroup(group_name) {
        currentGroup = group_name
        selectedArticleGroup.classList.add('article-group_active')

        let scrollbar_row = 1

        for (let i = 0; i < articles_group.length; i++) {
            if (i % 2 === 0) scrollbar_row++

            if (articles_group[i].getAttribute('data-group') === selectedArticleGroup.getAttribute('data-group')) {
                break;
            }
        }

        mobile_scrollbar[0].setAttribute('style', `--row:${scrollbar_row}`)

        // Производим выборку списка статей
        selectedArticleGroupScrollbar.classList.add('visually-hidden')

        articles_scrollbar_lists.forEach(scrollbar => {
            if (scrollbar.getAttribute('data-group') === currentGroup) {
                selectedArticleGroupScrollbar = scrollbar
            }
        })

        selectedArticleGroupScrollbar.classList.remove('visually-hidden')

        // Производим выборку списка статей по теме

        for (const article of articles_ontheme) {

            let article_img = article.querySelector('.article__image')

            if (article.getAttribute('data-group') === currentGroup) {
                article.classList.remove('visually-hidden')
                article_img.setAttribute('src', article_img.getAttribute('data-src'))
            }
            else {
                article.classList.add('visually-hidden')
                article_img.setAttribute('src', '')
            }
        }

        // selectedArticlesOnThemeSection.classList.add('visually-hidden')
        // lazyLoadImgsInNode(selectedArticlesOnThemeSection, '.article__image', false)

        // articles_ontheme.forEach(block => {
        //     if (block.getAttribute('data-group') === currentGroup) {
        //         selectedArticlesOnThemeSection = block
        //     }
        // })

        // selectedArticlesOnThemeSection.classList.remove('visually-hidden')
        // lazyLoadImgsInNode(selectedArticlesOnThemeSection, '.article__image', true)

        // // Производим выборку списка видео по теме

        // selectedVideosOnThemeSection.classList.add('visually-hidden')
        // lazyLoadImgsInNode(selectedVideosOnThemeSection, '.videos-on-theme .thumbnail', false)

        // videos_ontheme.forEach(block => {
        //     if (block.getAttribute('data-group') === currentGroup) {
        //         selectedVideosOnThemeSection = block
        //     }
        // })

        // selectedVideosOnThemeSection.classList.remove('visually-hidden')
        // lazyLoadImgsInNode(selectedVideosOnThemeSection, '.videos-on-theme .thumbnail', true)
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


    // Статья

    const article_subheaders = document.querySelectorAll('.article h3')

    let header_index = 1;
    for (const header of article_subheaders) {
        let header_numeration = document.createElement('span')
        header_numeration.setAttribute('class', 'header-numeration')
        header_numeration.textContent = `0${header_index}.`
        header_index++;
        header.appendChild(header_numeration)
    }


    // Страница "Видео"

    const video_type_btn = $('.video-type-selector')
    const video_sort_btn = $('.video-sort')
    const video_type_selector = $('.video-type-menu')
    const video_sort_selector = $('.video-sort-menu')

    const video_type = $('.video-type')
    const video_type_menu_item = document.querySelectorAll('.video-type-menu .menu-item')

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



    // Логика поиска статей

    const searchInput = $('.search-input')

    searchInput.on('input', () => {
        debounceSearch(searchInput[0].value)
    })

    const debounceSearch = debounce(sendSearchRequest, 500)

    function debounce(callee, timeoutMs) {
        return function perform(...args) {
            let previousCall = this.lastCall;
            this.lastCall = Date.now();

            if (previousCall && this.lastCall - previousCall <= timeoutMs) {
                clearTimeout(this.lastCallTimer);
            }

            this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
        };
    }

    function sendSearchRequest(searchValue) {
        $.getJSON(`https://doctor-guzel.ru/ajax/search.php?q=${searchValue}`, (data) => {

            articles_group.forEach(group => {
                let group_id = group.getAttribute('data-id')
                let group_name = group.getAttribute('data-group')

                // Если найдены статьи в группе снимаем класс disabled и устанавливаем число статей в группе
                if (data && group_id in data) {

                    let foundArticles = data[group_id]
                    group.querySelector('.article-group__size').textContent = foundArticles.length
                    group.classList.remove('article-group_disabled')

                    foundArticles = foundArticles.map((article) => {
                        let articleLinkElement = document.createElement('a')
                        articleLinkElement.textContent = article[0]
                        articleLinkElement.setAttribute('href', `/articles/${article[1]}/`)
                        articleLinkElement.setAttribute('class', 'article-link')
                        return articleLinkElement
                    })

                    articles_scrollbar_lists.forEach(list => {
                        if (list.getAttribute('data-group') === group_name) {
                            list.querySelector('.links').replaceChildren(...foundArticles)
                        }
                    })

                }
                // Иначе ставим класс disabled и устанавливаем число статей в группе равным 0
                else {
                    group.querySelector('.article-group__size').textContent = '0'
                    group.classList.add('article-group_disabled')

                    articles_scrollbar_lists.forEach(list => {
                        if (list.getAttribute('data-group') === group_name) {
                            list.querySelector('.links').replaceChildren(...[])
                        }
                    })
                }



            })
        });
    }


    // Форма записи

    const service_selector = $('.custom-selector')
    const service_selector_input = $('#service-selector')
    const service_selector_menu_items = document.querySelectorAll('.selector-menu-item')

    // Открытие селектора выбора услуги
    service_selector.on('click', () => {
        service_selector.toggleClass('custom-selector_opened')
    })

    // Обработка нажатия на услугу
    service_selector_menu_items.forEach(menu_item => {
        menu_item.addEventListener('click', () => {
            service_selector.children().first()[0].textContent = menu_item.textContent
            service_selector_input[0].value = menu_item.textContent
            service_selector.addClass('custom-selector_filled')
            filled_required_inputs['Услуга'] = true
            checkForCorrectFormFill()
        })
    })

    // Если любой из инпутов заполнен, меняем его border на черный цвет
    const service_form_inputs = document.querySelectorAll('.appointment-form__text-input')
    service_form_inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.value ?
                input.classList.add('appointment-form__text-input_filled')
                :
                input.classList.remove('appointment-form__text-input_filled')

            if (input.getAttribute('required') === '') {
                const input_name = input.getAttribute('name')
                input.value !== '' ? filled_required_inputs[input_name] = true : filled_required_inputs[input_name] = false
                checkForCorrectFormFill()
            }
        })
    })

    const filled_required_inputs = {
        'Услуга': false,
        'ФИО': false,
        'Телефон': false,
        'e-mail': false
    }


    // Обработка нажатия на кастомный чекбокс

    const custom_checkbox = $('.custom-checkbox')
    const promocode_input = $('#promocode')

    custom_checkbox.on('click', () => {
        custom_checkbox.toggleClass('custom-checkbox_checked')
        promocode_input.toggleClass('visually-hidden')
    })

    const submit_button = $('.appointment-form__project-button')

    // Проверка на заполнение required полей формы
    const checkForCorrectFormFill = () => {
        let form_filled_correctly = true

        for (const key in filled_required_inputs) {
            form_filled_correctly = form_filled_correctly & filled_required_inputs[key]
        }

        form_filled_correctly ? submit_button.attr('disabled', false) : submit_button.attr('disabled', true)
    }

    const appointment_form = document.querySelector('.appointment-form')

    appointment_form?.addEventListener('submit', async function (event) {
        event.preventDefault()
        const formData = new FormData(appointment_form)

        console.log('submit')

        await fetch('https://doctor-guzel.ru/form/ajax.php', {
            method: 'POST',
            body: formData
        }).then(() => {
            /// window.location.replace('https:w//doctor-guzel.ru/form/result.php')
        })
            .catch(err => {
                console.log(err)
            })
    })


    // Обо мне 

    const rolled_text = $('.extra-text')
    const expand_text_btn = $('.about-greeting-block__show-more')

    expand_text_btn.on('click', () => {
        rolled_text.toggleClass('extra-text_unrolled')
        expand_text_btn.toggleClass('about-greeting-block__show-more_unrolled')
    })

    const diplomas_slider = new Swiper(".about-diplomas-swiper-slides", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 100,

        navigation: {
            nextEl: '.about-diplomas__swiper-button-next',
            prevEl: '.about-diplomas__swiper-button-prev',
        },

        pagination: {
            el: '.about-diplomas__swiper-pagination',
            clickable: true,
        },

    });



    const about_projects = $('.about-projects__grid')
    const about_projects_unroll_btn = $('.about-projects__show-more')


    about_projects_unroll_btn.on('click', () => {
        about_projects.toggleClass('about-projects__grid_unrolled')
        about_projects_unroll_btn.toggleClass('about-projects__show-more_unrolled')
    })


    // Обработка инпута номера телефона 

    let phoneInputs = document.querySelectorAll('#phone-input');

    let getInputNumbersValue = (input) => input.value.replace(/\D/g, '');

    let onPhonePaste = function (e) {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        let pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            let pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    let onPhoneInput = function (e) {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    let onPhoneKeyDown = function (e) {
        let inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (let phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }



    const scroll_to_top_btn = $('.scroll-to-top-btn')

    scroll_to_top_btn.on('click', () => {
        window.scrollTo(0, 0)
    })

    let scrollTop
    let clientHeight

    let scroll_btn_visible = false

    const footer = document.querySelector('.footer')

    const footer_intersection_callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scroll_to_top_btn.addClass('scroll-to-top-btn_absolute')
                console.log('intersecting')
            }
            else {
                scroll_to_top_btn.removeClass('scroll-to-top-btn_absolute')
            }
        })
    }
    if (scroll_to_top_btn) {

        window.addEventListener('scroll', () => {

            scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            clientHeight = document.documentElement.clientHeight

            if (scrollTop > clientHeight && !scroll_btn_visible) {
                scroll_to_top_btn.toggleClass('scroll-to-top-btn_fixed')
                scroll_btn_visible = true
            }
            else if (scrollTop < clientHeight && scroll_btn_visible) {
                scroll_to_top_btn.toggleClass('scroll-to-top-btn_fixed')
                scroll_btn_visible = false
            }

        })
        // console.log('footer is in viewport')
        const footerObserver = new IntersectionObserver(footer_intersection_callback)

        footerObserver.observe(footer)
    }

});