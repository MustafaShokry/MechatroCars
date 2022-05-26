// ********************************************** Elments declarations ******************************************** //

// ############################################# Menu, Navbar and icons ###############################
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');
let numbers = document.querySelectorAll(".icons h3");

// ############################################# Slide show ###############################
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let imgNum = 1;
let slideshowRegister = document.querySelector('.slideshow-background-register');

// ############################################# Form ###############################
let form = document.getElementById("form");
let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let password = document.getElementById("password");
let rePassoword = document.getElementById("re-password");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let adress = document.getElementById("adress");
let gender = document.getElementById("gender");
let agreeTerms = document.getElementById("cb1");
let agreeLetter = document.getElementById("cb2");
let submitBtn = document.getElementById("submitBtn");
let errorMessageContainer = document.getElementById("error-message-container");
let errorMessage = document.getElementById("error-message");
let sucMessageContainer = document.getElementById("success-msg-container");
let sucMessage = document.getElementById("success-msg");
let togglePassword = document.querySelector("#togglePassword");
let togglePassword2 = document.querySelector("#togglePassword2");
let fields = [firstName, lastName, email, phone, adress, password, rePassoword, gender, agreeTerms, agreeLetter];



// ********************************************** Logic code ******************************************** //

// ############################################# Menu, Navbar and icons ###############################
menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

window.onscroll = () => {

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if (window.scrollY > 0) {
    document.querySelector('.header').classList.add('active');
  } else {
    document.querySelector('.header').classList.remove('active');
  };

};

function startCounter(element) {
  let goal = element.getAttribute("data-goal");
  let count = setInterval(() => {
    element.textContent++;
    if (element.textContent === goal) {
      element.textContent = `+${goal}`
      clearInterval(count);
    }
  }, 500 / goal);
}


// ############################################# Home animation ###############################
document.querySelector('.home').onmousemove = (e) => {

  document.querySelectorAll('.home-parallax').forEach(elm => {

    let speed = elm.getAttribute('data-speed');

    let x = (window.innerWidth - e.pageX * speed) / 90;
    let y = (window.innerHeight - e.pageY * speed) / 90;

    elm.style.transform = `translateX(${y}px) translateY(${x}px)`;

  });

};

document.querySelector('.home').onmouseleave = (e) => {

  document.querySelectorAll('.home-parallax').forEach(elm => {

    elm.style.transform = `translateX(0px) translateY(0px)`;

  });

};


// ############################################# Login ###############################
document.querySelector('#login-btn').onclick = () => {
  document.querySelector('.login-form-container').classList.toggle('active');
}

document.querySelector('#close-login-form').onclick = () => {
  document.querySelector('.login-form-container').classList.remove('active');
}


// ############################################# Form ###############################
if (togglePassword && togglePassword2) {
  togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("bi-eye");
  });
  togglePassword2.addEventListener("click", function () {
    const type = rePassoword.getAttribute("type") === "password" ? "text" : "password";
    rePassoword.setAttribute("type", type);
    this.classList.toggle("bi-eye");
  });
}

for (let i = 0; i < 7; ++i) {
  if (fields[i]) {
    fields[i].addEventListener("change", () => {
      fields[i].style.border = "1px solid #cccccc";
    });
  }
}

function errorMessageSend(message) {
  errorMessageContainer.style.display = "block";
  errorMessage.innerText = message;
}

function errorMessageClear() {
  errorMessageContainer.style.display = "none";
}

function sucMessageSend(message) {
  sucMessageContainer.style.display = "block";
  sucMessage.innerText = message;
}

function sucMessageClear() {
  sucMessageContainer.style.display = "none";
}

function checkRequired() {
  let nums = 0;
  let chars = 0;
  let phoneStarts = [0, 1, 2, 5];
  let specialChars = ['-', '_', '#', '&', '*'];
  let regEx = /[!@$%^\(\)\{\}\[\]\,\.\<\>\?\+\/\\\|\"\'\:\;\=]/
  let readyToSubmit = true;
  for (let i = 0; i < password.value.length; i++) {
    if (!isNaN(password.value[i])) {
      nums++;
    }
    if (specialChars.includes(password.value[i])) {
      chars++;
    }
  }
  if (agreeTerms.checked == false) {
    errorMessageSend("You must agree with our Terms And Conditions");
    readyToSubmit = false;
  }
  if (password.value != rePassoword.value) {
    errorMessageSend("Please re-type your password");
    readyToSubmit = false;
  }
  if (password.value.length != 8) {
    errorMessageSend("Password must include 8 characters no more no less");
    readyToSubmit = false;
    password.style.border = "red solid 1px";
  }
  if (password.value.includes(' ')) {
    errorMessageSend("No white spaces allowed in the password");
    readyToSubmit = false;
    password.style.border = "red solid 1px";
  }
  if (nums === 0) {
    errorMessageSend("Password must include one digit at least");
    readyToSubmit = false;
    password.style.border = "red solid 1px";
  }
  if (regEx.test(password.value)) {
    errorMessageSend("no special characters allowed except -,_,#, &, and *");
    readyToSubmit = false;
    password.style.border = "red solid 1px";
  }
  if (chars != 1) {
    errorMessageSend("Password must include only one special character like -,_,#, &, and *");
    readyToSubmit = false;
    password.style.border = "red solid 1px";
  }
  if (!(password.value[0] >= 'A' && password.value[0] <= 'Z')) {
    errorMessageSend("Password must start with uppercase character");
    readyToSubmit = false;
    password.style.border = "red solid 1px";
  }
  if (phone.value.length != 11) {
    errorMessageSend("Phone Number must be 12 digits");
    readyToSubmit = false;
    phone.style.border = "red solid 1px";
  }
  if (phone.value[0] != 0 || phone.value[1] != 1 || !phoneStarts.includes(parseInt(phone.value[2]))) {
    errorMessageSend("Phone Number must start with 010, 011, 012 or 015");
    readyToSubmit = false;
    phone.style.border = "red solid 1px";
  }
  if (email.value[(email.value.search('@')) + 1] == undefined) {
    errorMessageSend("the email must have something after '@'");
    readyToSubmit = false;
  }
  if (email.value[(email.value.search('@')) - 1] == undefined) {
    errorMessageSend("the email must have something before '@'");
    readyToSubmit = false;
  }
  if (!email.value.includes('@')) {
    errorMessageSend("the email must include '@'");
    readyToSubmit = false;
  }
  for (let i = 0; i < 7; ++i) {
    if (fields[i].value == "") {
      fields[i].style.border = "red solid 1px";
      errorMessageSend("Please fill all required fields");
      readyToSubmit = false;
    }
  }
  return readyToSubmit;
}

if (submitBtn) {
  submitBtn.onclick = function (event) {
    errorMessageClear();
    event.preventDefault();
    let readyToSubmit = checkRequired();
    if (readyToSubmit) {
      form.reset();
      sucMessageSend("submited succesfully you will be redirected to the home page");
      setTimeout(()=>{
        form.submit();
      },2000);
    }
  }
}


// ############################################# Slide Show ###############################
if (next && prev) {
  next.addEventListener('click', () => { nextSlide() });
  prev.addEventListener('click', () => { prevSlide() });

}

window.onload = function () {
  numbers.forEach((number) => startCounter(number));
  changeSlide(slideshowRegister);
  setInterval(() => {
    imgNum++;
    changeSlide(slideshowRegister);
  }, 5000);
}

function changeSlide(element) {
  if (element != null && element == slideshowRegister) {
    if (imgNum > 4) {
      imgNum = 1;
    }
    element.style.backgroundImage = `url('../image/image-${imgNum}.jpg')`;
  }
}

function nextSlide() {
  imgNum++;
  changeSlide(slideshowRegister);
}

function prevSlide() {
  imgNum--;
  changeSlide(slideshowRegister);
}


// ############################################# Popular, Reviews, Vehicles Swipers ###############################
var swiper = new Swiper(".vehicles-slider", {
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".review-slider", {
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

