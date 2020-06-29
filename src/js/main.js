const header = document.querySelector('header');

const headerProduct = document.querySelector('#header-product');
const headerWhyus = document.querySelector('#header-whyus');
const headerCompany = document.querySelector('#header-company');
const headerCareers = document.querySelector('#header-careers');
const headerContact = document.querySelector('#header-contact');

const headerLinks = document.querySelectorAll('nav li a');

const sectionHero = document.querySelector('#hero');
const sectionProduct = document.querySelector('#product');
const sectionWhyus = document.querySelector('#whyus');
const sectionCompany = document.querySelector('#company');
const sectionCareers = document.querySelector('#careers');
const sectionContact = document.querySelector('#contact');

let heroTop;
let productTop;
let whyusTop;
let companyTop;
let careersTop;
let contactTop;

new Glide('.glide', {
    type: 'slider',
    autoplay: 0,
    animationDuration: 300,
    animationTimingFunc: 'linear',
    perView: 1,
}).mount()

window.onload = function () {
    heroTop = sectionHero.offsetTop;
    productTop = sectionProduct.offsetTop;
    whyusTop = sectionWhyus.offsetTop;
    companyTop = sectionCompany.offsetTop;
    careersTop = sectionCareers.offsetTop;
    contactTop = sectionContact.offsetTop;

    if (window.innerWidth <= 768) {
        for (let i = 0; i < headerLinks.length; i++) {
            headerLinks[i].addEventListener('click', function() {
                quitMobileMenu()
            })
        }
    } else {
        let pageLinks = document.querySelectorAll('a[href^="#"]');
        for (let i = 0; i < pageLinks.length; i++) {
            pageLinks[i].addEventListener('click', function (e) {
                e.preventDefault();
                if (this.dataset.destination == "top") {
                    document.querySelector('#hero').scrollIntoView({
                        behavior: 'smooth'
                    });
                } else if (this.dataset.destination == "contact") {
                    document.querySelector('#contact').scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    }

    function quitMobileMenu() {
        document.querySelector('.navigation').classList.toggle('visible');
        document.querySelector('.hamburger--collapse').classList.toggle('is-active');
    }
}

if (window.innerWidth > 1024) {
    document.onscroll = function () {
        let position = window.scrollY;
        position += 120;
    
        if (position <= 50) {
            header.classList.remove('scroll');
        } else {
            header.classList.add('scroll');
        }
    
        activateLinks(position);
    }
}

function activateLinks(position) {
    removeActive();
    if (position) {
        if ((position > heroTop) && (position <= productTop)) {
            headerWhyus.classList.add('active');
        } else if ((position > productTop) && (position <= companyTop)) {
            headerProduct.classList.add('active');
        } else if ((position > companyTop) && (position <= careersTop)) {
            headerCompany.classList.add('active');
        } else if ((position > careersTop) && (position <= contactTop)) {
            headerCareers.classList.add('active');
        } else if (position > contactTop) {
            headerContact.classList.add('active');
        }
    }
}

function removeActive() {
    for (let i = 0; i < headerLinks.length; i++) {
        headerLinks[i].classList.remove('active')
    }
}

const showAllButton = document.querySelector('#show-all-button');

showAllButton.addEventListener('click', function() {
    showAllButton.style.display = 'none';
    document.querySelector('.row.show-more').style.display = 'flex';
})

const videobutton = document.querySelector('#videolink');
videobutton.addEventListener('click', function() {
    document.querySelector('iframe').click();
})

const mobileMenuButton = document.querySelector('#mobile-menu-button');
mobileMenuButton.addEventListener('click', function() {
    document.querySelector('.navigation').classList.toggle('visible');
    document.querySelector('.hamburger--collapse').classList.toggle('is-active');
})
