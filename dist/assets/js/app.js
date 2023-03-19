

// ==================================

function countdown(dataEnd) {
    let timer, days, hours, minutes, seconds;

    dataEnd = new Date(dataEnd)
    dateEnd = dataEnd.getTime()

    if (isNaN(dataEnd)) {
        return
    }

    timer = setInterval(calculate, 1000);

    function calculate() {
        let dateStart = new Date()
        dateStart = new Date(dateStart.getUTCFullYear(), dateStart.getUTCMonth(),
        dateStart.getUTCDate(),
        dateStart.getUTCHours(),
        dateStart.getUTCMinutes(),
        dateStart.getUTCSeconds())

        let timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)

        if(timeRemaining >= 0) {
            days = parseInt(timeRemaining / 86400)
            timeRemaining = (timeRemaining % 86400)

            hours = parseInt(timeRemaining / 3600)
            timeRemaining = (timeRemaining % 3600)

            minutes = parseInt(timeRemaining / 60)
            timeRemaining = (timeRemaining % 60)

            seconds = parseInt(timeRemaining)

            document.querySelector('#timer__days').innerHTML = parseInt(days, 10)
            document.querySelector('#timer__hours').innerHTML = ('0' + hours).slice(-2)
            document.querySelector('#timer__minutes').innerHTML = ('0' + minutes).slice(-2)
            document.querySelector('#timer__seconds').innerHTML = ('0' + seconds).slice(-2)
        } else {
            return
        }
    }

    function display(days, hours, minutes, seconds) {
        
    }
}

countdown('10/06/2023 02: 00:00 AM')

// ====================== form

function submitForm() {
    let frm = document.querySelector('form')
    frm.submit(); 
    frm.reset();  
    return false;
 }

// ========================== swiper
// ========================== swiper
// ========================== swiper

function changeSwiper(swiper) {
    swiper = new Swiper('.happy__swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        grabCursor: true,
        autoplay: {
        delay: 3000,
        disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

let swiper = new Swiper('.happy__swiper', {
    slidesPerView: 2,
    spaceBetween: 30,
    freeMode: true,
    grabCursor: true,
    autoplay: {
    delay: 3000,
    disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

if (window.innerWidth < 590) changeSwiper(swiper)

window.addEventListener('resize', function(event) {
    if(window.innerWidth < 590) {
        changeSwiper(swiper)
    }
}, true);


// ========================== swiper end
// ========================== swiper end

const navList = document.querySelector('.header__nav');

// ==================== burger

const burger = document.querySelector('.touch');

burger.addEventListener('click', function() {
    burger.classList.toggle('active')
    navList.classList.toggle('active')
})

// =====================


window.addEventListener('scroll', () => {
    burger.classList.remove('active')
    navList.classList.remove('active')
})


// ====================== anchor

const anchors = document.querySelectorAll('header a[href*="#"]')

anchors.forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
})

// ================================ modal
// ================================ modal
// ================================ modal



const surveyBtn1 = document.querySelector('.survey__btn-1')
const surveyBtn2 = document.querySelector('.survey__btn-2')
const surveyBtn3 = document.querySelector('.survey__btn-3')
const modalClose = document.querySelector('.survey__modal-close')
const modal = document.querySelector('.survey__modal')
const html = document.querySelector('html')
const body = document.querySelector('body')

function showModal() {
    modal.classList.add('active')
    body.classList.add('active')
    html.classList.add('active')
}

function closeModal() {
    modal.classList.remove('active')
    body.classList.remove('active')
    html.classList.remove('active')

    // ---------------------------------

    let muted = modal.querySelectorAll('.muted')

    modal.querySelector('.survey__modal-desc').textContent = `Мы хотим, чтобы свадьба прошла идеально не только для нас, но и для вас. Пожалуйста, заполните небольшой опросник по банкетному меню.`

    muted.forEach(item => item.classList.remove('mutedActive'))
}

function changeModal() {
    let muted = modal.querySelectorAll('.muted')

    modal.querySelector('.survey__modal-desc').textContent = `Заполните, пожалуйста, форму, чтобы мы знали, что у вас не получится прийти.`
    console.log(555);

    muted.forEach(item => {
        item.classList.add('mutedActive')
    })
}

surveyBtn1.addEventListener('click', showModal);
surveyBtn2.addEventListener('click', showModal);

surveyBtn3.addEventListener('click', function () {
    changeModal()
    showModal()
});

modalClose.addEventListener('click', closeModal)

modal.addEventListener('click', function (e) {
    if (e.target.classList.contains('survey__overlay')) closeModal()
})

// ====================================== scroll reveal

ScrollReveal({ 
    // reset: true, 
    distance: '60px', 
    duration: 1400, 
    delay: 50 
});

ScrollReveal().reveal('.main__name, .conducting__img, .happy__img, .schedule__title, .dresscode__title, .dresscode__item, .requests__title', { 
    origin: 'top'
});
ScrollReveal().reveal('.main__time, .conducting__text, .place__container, .happy__swiper, .survey__title, .survey__desc, .survey__btns, .timer__countdown', { 
    origin: 'bottom'
});
ScrollReveal().reveal('.date__img, .story__img, .schedule__box-left, .dresscode_color, .pictures__text', { 
    origin: 'left'
});
ScrollReveal().reveal('.date__text, .story__text, .schedule__box-right, .requests__row, .pictures__img', { 
    origin: 'right'
});