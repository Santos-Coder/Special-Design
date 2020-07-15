//----------------------------------------------------------------------- set local storage data for colors
let mainColors = localStorage.getItem('color_option');
let aboutImg = document.querySelector('.about-img img');
let personBg = document.querySelectorAll('.person-bg');
if (mainColors != null) {
    document.documentElement.style.setProperty('--main-color', mainColors);
    aboutImg.setAttribute('src','imgs/about/' + mainColors.substring(1) + '.png' );
    personBg.forEach(person => {
        person.style.backgroundImage = 'url("imgs/Testimonial/' + mainColors.substring(1) + '.png")';
    })
    document.querySelectorAll('.colors-list li').forEach(element => {
        element.classList.remove('active')

        if(mainColors === element.dataset.color) {
            element.classList.add('active')
        }
});
}
//----------------------------------------------------------------------- randomly change header background

let landingPage = document.querySelector('.landing-page');

let imgArray = ["lnd-bg-1.jpeg", "lnd-bg-2.jpg", "lnd-bg-3.jpg", "lnd-bg-4.jpg"];

let bcgOptn = true

let bcgInt;

function rondomizeBg() {

if (bcgOptn === true) {

    bcgInt = setInterval( () => {

        let randomNumber = Math.floor(Math.random() * imgArray.length);
    
        landingPage.style.backgroundImage = 'url("imgs/' + imgArray[randomNumber] + '")';
    
        landingPage.style.transition = '1s all'
    
    }, 5000);
}
}
rondomizeBg();

//----------------------------------------------------------------------- setting box toggle class
document.querySelector(".gear").onclick = function () {
    document.querySelector(".setting-box").classList.toggle("open");
}
//----------------------------------------------------------------------- switch color
const colorLi = document.querySelectorAll('.colors-list li');
colorLi.forEach(li => {

li.addEventListener('click', (e) => {
    handleActive(e);
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
    aboutImg.setAttribute('src','imgs/about/' + e.target.dataset.color.substring(1) + '.png' );
    personBg.forEach(person => {
        person.style.backgroundImage = 'url("imgs/Testimonial/' + e.target.dataset.color.substring(1) + '.png")';
    })
    localStorage.setItem('color_option', e.target.dataset.color);

    
})

})
//----------------------------------------------------------------------- switch random background
const randomBg = document.querySelectorAll('.random-bg span');

randomBg.forEach(span => {

span.addEventListener('click', (e) => {

    handleActive(e);

    if(e.target.dataset.bg === 'yes') {
        bcgOptn = true;
        rondomizeBg();
        localStorage.setItem('bg_option', true);
    } else {
        bcgOptn = false;
        clearInterval(bcgInt);
        localStorage.setItem('bg_option', false);
    }
})
})
//----------------------------------------------------------------------- set local storage data for random bg
let backgroundOptn = localStorage.getItem('bg_option');
if (backgroundOptn !== null) {
    if (backgroundOptn === 'true') {
        bcgOptn = true;
        document.querySelector('.random-bg .yes').classList.add('active');
    } else {
        bcgOptn = false;
        document.querySelector('.random-bg .no').classList.add('active');
    }
}
//----------------------------------------------------------------------- skills progress scroll
let ourSkills = document.querySelector('.skills');
window.onscroll = function () {
let skillsOfstTop = ourSkills.offsetTop;
let skillsOutrHigt = ourSkills.offsetHeight;
let windowHeight = this.innerHeight;
let windowScrollTop = this.pageYOffset;
if(windowScrollTop > (skillsOfstTop + skillsOutrHigt - windowHeight)) {
    let allSkills = document.querySelectorAll('.skills-progress li span');
    allSkills.forEach(skill => {
        skill.style.width = skill.dataset.width
    })
}
}
//----------------------------------------------------------------------- create img pop-up
let gallery = document.querySelectorAll('.gallery-box .img-box');
gallery.forEach(imgBox => {
    imgBox.addEventListener('click', (e) => {
        let overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);
        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';
        let popupImg = document.createElement('img');
        popupImg.src = imgBox.children[2].src;
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);
        let closeBtn = document.createElement('span');
        closeBtn.className = 'close-button';
        let closeBtnTxt = document.createTextNode('X');
        closeBtn.appendChild(closeBtnTxt);
        popupBox.appendChild(closeBtn);
    })
})
//----------------------------------------------------------------------- popup close button
document.addEventListener('click', function (e) {
    if(e.target.className == 'close-button') {
        e.target.parentNode.remove();
        document.querySelector('.popup-overlay').remove();
    }
})
//----------------------------------------------------------------------- timeline background
const timelineBg = document.querySelector('.timeline');
timelineBg.onmousemove = function(e) {
    let x = - e.clientX/5,
        y = - e.clientY/5;
    timelineBg.style.backgroundPositionX = x + 'px';
    timelineBg.style.backgroundPositionY = y + 'px';
}
//----------------------------------------------------------------------- testimonials navigation
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const slides = document.querySelectorAll('.testi-box');

let index = 0;

display(index);

function display (index) {
	slides.forEach((slide) => {
		slide.style.display = 'none';
	});
	slides[index].style.display = 'block';
}
function nextSlide () {
	index++;
	if (index > slides.length - 1) {
		index = 0;
	}
	display(index);
}
function prevSlide () {
	index--;
	if (index < 0) {
		index = slides.length - 1;
	}
	display(index);
}
next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);
//----------------------------------------------------------------------- navigation function
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
const allLinks = document.querySelectorAll('.links li a');

function scrollToElement(element) {
    element.forEach(ele => {
        ele.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
            menuHide.parentElement.style.display = 'none'
            menuHide.parentElement.style.transition = '1s'
        })
    })
}
scrollToElement(allBullets);
scrollToElement(allLinks);
//----------------------------------------------------------------------- Handle Active function
function handleActive(event) {
    event.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active')
    });
    event.target.classList.add('active');
}
//----------------------------------------------------------------------- Navigation bullets setting box option
let bulletsBtns = document.querySelectorAll('.nav-option span');
let navBullet = document.querySelector('.nav-bullets');
let bulletLocalItem = localStorage.getItem('bullet_option');

if (bulletLocalItem != null){
    bulletsBtns.forEach(span => {
        span.classList.remove('active')
    })
    if (bulletLocalItem == 'show') {
        navBullet.style.display = 'block'
        document.querySelector('.nav-option .yes').classList.add('active')
    } else {
        navBullet.style.display = 'none'
        document.querySelector('.nav-option .no').classList.add('active')
    }
}
bulletsBtns.forEach(span => {
    span.addEventListener('click', (e) => {
        handleActive(e);
        if(span.dataset.display == 'show') {
            navBullet.style.display = 'block'
            localStorage.setItem('bullet_option', 'show')
        } else {
            navBullet.style.display = 'none'
            localStorage.setItem('bullet_option', 'hide')
        }
    })
})
//----------------------------------------------------------------------- reset button
document.querySelector('.reset-btn').onclick = function () {
    localStorage.clear();
    window.location.reload();
}
//---------------------------------------------------------------------- menu show/hide
let menuHide = document.querySelector('.menu-cont i');
let menuShow = document.querySelector('.header i');
menuHide.onclick = function () {
    this.parentElement.style.display = 'none'
}
menuShow.onclick = function () {
    menuHide.parentElement.style.display = 'block'
}