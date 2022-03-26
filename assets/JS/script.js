//getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const Quiz_box = document.querySelector(".quiz_box");
const next_btn = Quiz_box.querySelector(".next_btn");
const bottom_ques_counter = Quiz_box.querySelector(".total_que");
const option_list = document.querySelector(".option_list");
const timeCount = Quiz_box.querySelector(".timer .timer_sec");
const timeLine = Quiz_box.querySelector("header .time_line");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
const timeOff = Quiz_box.querySelector("header .time_text")




//if start Quiz Button Clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
}

//if exit button clicked
exit_btn.onclick = () =>{
  info_box.classList.remove("activeInfo");
}

//if continue button clicked
continue_btn.onclick = () =>{
info_box.classList.remove("activeInfo");
Quiz_box.classList.add("activeQuiz");
showQuestions(0);
queCounter(1);
startTimer(15);
startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

//if quit quiz button clicked
quit_quiz.onclick = () =>{
  window.location.reload();
}

//if replay button clicked
// restart_quiz.onclick = () =>{
//   Quiz_box.classList.add("activeQuiz");
//   result_box.classList.remove("activeResult");
// }

//if next Que button clicked
next_btn.onclick = () =>{
if (que_count < questions.length - 1){
    que_count++;
    que_numb++;
  showQuestions(que_count);
  queCounter(que_numb);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
  
}else{
  clearInterval(counter);
  clearInterval(counterLine);
  showResultBox();
}
}




//getting questions and options from array
function showQuestions(index){
  const que_text = document.querySelector(".que_text");
  let que_tag = ` <span>`+questions[index].numb+"."+ questions[index].question +`</span>`;
  let option_tag = `<div class="option">`+questions[index].options[0] +`<span></span></div>`
                   + `<div class="option">`+questions[index].options[1] +`<span></span></div>`
                   + `<div class="option">`+questions[index].options[2] +`<span></span></div>`
                   +`<div class="option">`+questions[index].options[3] +`<span></span></div>`;
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++){
     option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

//tick and cross icon setting
let tickIcon = ` <div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`;



function optionSelected(answer){
   clearInterval(counter);
   clearInterval(counterLine);
  let userAnswer = answer.textContent;
  let correctAnswer = questions[que_count].answer;
  let allOptions = option_list.children.length;
  if (userAnswer == correctAnswer ){
    userScore += 1;
     answer.classList.add("correct");
     answer.insertAdjacentHTML("beforeend", tickIcon);
  }else{
     answer.classList.add("wrong");
     answer.insertAdjacentHTML("beforeend", crossIcon);

  // if answer is incorrect then correct answer automatically will be selected
   for (let i = 0; i < allOptions; i++){
     if (option_list.children[i].textContent == correctAnswer){
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
     }
    }
  }
  
  //once user selected one answer all other options will be disabled
  for (let i = 0; i < allOptions; i++){
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}


// showResultBox function
function showResultBox(){
 info_box.classList.remove("activeInfo");
Quiz_box.classList.remove("activeQuiz"); 
result_box.classList.add("activeResult");
const scoreText = result_box.querySelector(".score_text");
if(userScore > 3){
  let scoreTag = `<span>And congrats! you got <p>`+ userScore +`</p>out of<p>`+ questions.length +`</p></span>`;
  scoreText.innerHTML = scoreTag;
  }
  else if(userScore > 1){
  let scoreTag = `<span>And nice! you got <p>`+ userScore +`</p>out of<p>`+ questions.length +`</p></span>`;
  scoreText.innerHTML = scoreTag;
  }
  else{
  let scoreTag = `<span>And sorry! you got only <p>`+ userScore +`</p>out of<p>`+ questions.length +`</p></span>`;
  scoreText.innerHTML = scoreTag;
  }
}

//start Timer function
function startTimer(time){
  counter = setInterval(timer, 1000)
  function timer(){
   timeCount.textContent = time;
   time--;
   if(time < 9){
     let addZero = timeCount.textContent;
     timeCount.textContent = "0" + addZero;
   }
   if(time < 0){
     clearInterval(counter);
     timeCount.textContent = "00";
     timeOff.textContent ="time Off";

      let correctAnswer = questions[que_count].answer;
      let allOptions = option_list.children.length;

       for (let i = 0; i < allOptions; i++){
     if (option_list.children[i].textContent == correctAnswer){
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
     }
    }
      for (let i = 0; i < allOptions; i++){
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

   }
  }


function startTimerLine(time){
  counterLine = setInterval(timer, 29)
  function timer(){
   time += 1;
  timeLine.style.width = time + "px";

   if(time > 549){
     clearInterval(counterLine);
   }
  }
}


//setting total number of question counter
function queCounter(index){
  let totalQuesCountTag = ` <span><p>`+ index +`</p>of<p>`+ questions.length +`</p>Questions</span>`;
bottom_ques_counter.innerHTML = totalQuesCountTag;
}