import { send } from "q";

const myForm = document.querySelector('.contact__form');
const sendBtn = document.querySelector('.contact__form-submit');
const formIcon = document.querySelectorAll('.form-icon');
const inputName = document.querySelector('.contact__form-input--name');
const inputEmail = document.querySelector('.contact__form-input--email');
const inputText  = document.querySelector('.contact__form-input--text');
const inputError = document.querySelectorAll('.input-error');
let validInput = false;
inputName.addEventListener('input',e=>{
  if(inputName.value.length<10){
    console.log(inputName.value.length);
    inputError[0].classList.add('input-error--vis');
    inputError[0].innerText ='Слишком короткое имя';
    inputName.classList.add("contact__form-error");
    formIcon[0].classList.add("contact__icon-error");
  }else{
    inputError[0].classList.remove('input-error--vis');
    inputError[0].innerText ='';
    validInput = true;
    inputName.classList.remove("contact__form-error");
    formIcon[0].classList.remove("contact__icon-error");
  }
})
inputText.addEventListener('input',e=>{
  if(inputText.value.length<25){
    inputError[2].classList.add('input-error--vis');
    inputError[2].innerText ='Слишком короткое сообщение';
    inputText.classList.add("contact__form-error");
    formIcon[2].classList.add("contact__icon-error");
  }else{
    inputError[2].classList.remove('input-error--vis');
    inputError[2].innerText ='';
    validInput = true;
    inputText.classList.remove("contact__form-error");
    formIcon[2].classList.remove("contact__icon-error");
  }
})
inputEmail.addEventListener('input',e=>{
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(inputEmail.value)){
    inputError[1].classList.add('input-error--vis');
    inputError[1].innerText ='Неверный email';
    inputEmail.classList.add("contact__form-error");
    formIcon[1].classList.add("contact__icon-error");
  }else{
    inputError[1].classList.remove('input-error--vis');
    inputError[1].innerText ='Неверный email';
    inputEmail.classList.remove("contact__form-error");
    formIcon[1].classList.remove("contact__icon-error");
  }
})

sendBtn.addEventListener('click',function(e){
  e.preventDefault();
  if(validateForm(myForm)){
    let url ='https://webdev-api.loftschool.com/sendmail';
    let formData = new FormData();
    formData.append('name',myForm.elements.name.value);
    formData.append('email',myForm.elements.email.value);
    formData.append('text',myForm.elements.text.value);
    formData.append('to',"myEmail@yandex.ru");

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST",url);
    xhr.send(formData);
    xhr.addEventListener('load',function(){
        if(xhr.response.status == 1){
            alert('Сообщениие отправлено');
        } else{
          alert('Сообщениие не отправлено');
        }
    })

  }
})


function validateForm(myForm){
  var valid = true;
  // console.log(myForm.elements.length);
  if(!validateField(myForm.elements.name,0)){
    valid = false;
  }
  if(!validateField(myForm.elements.email,1)){
    valid = false;
  }
  if(!validateField(myForm.elements.text,2)){
    valid = false;
  }
  return valid;
}

function validateField(element,index){
  if(!element.checkValidity()){
    element.classList.add("contact__form-error");
    formIcon[index].classList.add("contact__icon-error");
    inputError[index].classList.add('input-error--vis');
    inputError[index].innerText ='Заполните поле';
    return false;
  } else { 
    element.classList.remove("contact__form-error");
    formIcon[index].classList.remove("contact__icon-error");
    inputError[index].classList.remove('input-error--vis');
    inputError[index].innerText ='';
    return true;
  }
}