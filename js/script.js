
const question = [
  {
   ques:"When is India’s Independence Day?",
   options:["August 15","October 31","January 1","July 14"],
   currect:0,
  },
  {
  ques:"Indian's largest city by population",
  options:["Delhi","Mumbai","Bengaluru","Chennai"],
  currect:1,
  },
  {
  ques:"Who was the president of India in 2009?",
  options:["Pratibha Patil","Jawaharlal Nehru","Govind Singh","Indira Gandhi"],
  currect:0,
  },
  {
  ques:"What is India’s smallest state by area?",
  options:["Uttar Pradesh","keral","goa","Kolkata"],
  currect:2,
  },
  {
  ques:"Delhi is located along what river?",
  options:["the Nile","the Brahmaputra","the Yamuna","the Ganges"],
  currect:2,
  },
  {
  ques:"Which of these is not a river of India?",
  options:["Brahmaputra","Mekong","Yamuna","Ganges"],
  currect:1,
  },
  {
  ques:"In which state is the Kaziranga National Park situated?",
  options:["Uttar Pradesh","Mizoram","Assam","Gujarat"],
  currect:2,
  },
  {
  ques:"Which Indian city hosted the first Kabaddi World Cup?",
  options:["Chennai","Mumbai","Bangalore","Kolkata"],
  currect:1,
  },
  {
  ques:"Which Indian festival is associated with colors?",
  options:["Onam","Diwali","Pongal","Holi"],
  currect:3,
  },
  {
  ques:"Which institution operates the currency and credit system in India?",
  options:["Government banks","Ministry of Finance","Stock exchanges","Reserve Bank of India"],
  currect:3,
  },
];

let score = 0, index = 0 ,answer = [];

$(document).ready(function(){
 $(".nav__toggler").click(function(){
   $(this).toggleClass("open");
 });
 
 $(".quiz").on("click","li", function(){
  $(".quiz .select").removeClass("select");
  $(this).addClass("select");
 })
 
 $(".quiz-btn").click(function(){
  const select = $(".quiz li").hasClass("select");
  
  if($("#username").val() == "") {
    $(".model").fadeIn();
    $("#username").focus();
    return;
  }
  if(!select) {
   alert("please select any option");
   makeToast("please select any option");
   return;
  }
  const key = $(".quiz .select").attr("data-key");
  checkAns(key)
 });
 $(".model__btn").click(function(){
  if($("#username").val() == "") {
   alert("username is required");
  } else{
   $(".model").fadeOut();
  }
 })
 $(".back-btn").click(function(){
   $(".results").fadeOut()
   $(".header").fadeIn();
   $(".main").fadeIn();
   score = 0;index = 0;answer = [];
   $("#username").val('');
   showIndex();
   newQuestion();
   
 });
 
 showIndex();
 newQuestion();
})

function checkAns(key) {
  const que = question[index];
  answer.push(key);
  if(que.currect == key) {
   score++;
   makeToast("Right")
  } else{
   makeToast("Wrong")
  }
  index++;
  if(index < question.length) {
   newQuestion()
  } else{
   showResult()
  }
 }
 
 function newQuestion(){
   const que = question[index];
   showIndex()
   $(".ques").text(que.ques);
   $(".quiz").html("");
   que.options.forEach((q,i) => {
    const li = document.createElement('li');
    li.setAttribute('data-key',i);
    li.textContent = q;
    $(".quiz").append(li)
   })
 }
 
 function showResult(){
   $(".header").fadeOut();
   $(".main").fadeOut();
   $(".results").fadeIn()
   $(window).scrollTop(0)
  $(".ques-list").html("");
  
  $(".name").text("Username : "+ $("#username").val());
  $(".score").text("Your Score : "+score+ "/"+question.length);
  $(".uid").text("UserId : "+ Math.ceil(Math.random() * 1000)); 
  question.forEach((que,i) => {
  const li = document.createElement('li');
  let cls =  que.currect == answer[i] ? 'green' : 'red';
  li.innerHTML = `
   <p>${1+i} - ${que.ques}</p>
   <p><strong>your answer : </strong> <span class="${cls}">${que.options[answer[i]]}</span></p>
   <p><strong>correct answer : </strong>${que.options[que.currect]}</p>
  `;
  $(".ques-list").append(li);
  })
 }
 
 function showIndex(){
  $(".index").text(1 + index+"/"+question.length)
 }
 function makeToast(txt) {
  $(".alert").text(txt);
  $(".alert").fadeIn();
  setTimeout(() => $(".alert").fadeOut(),1000)
 }
 
 