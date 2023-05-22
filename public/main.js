

       
const startAseesment = document.querySelector("#Send-jobtitle-btn");
const assesmentDiv = document.querySelector(".assesment");
let sendFormBtn= null;


class Main {

/////////////////helper functions/////////////////////////

//using post data function that return the fetched data
async fetchingData (URL,fdata) {

    const dataObj = {fdata: fdata,};
   
    const res = await fetch(`${URL}`,{
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body:JSON.stringify(dataObj),});
   
    const data = await res.json();
   
    return data
   };


clearHtmlBody (){assesmentDiv.innerHTML=''};

disableBtn(btn){
  btn.disabled =true
}

/////////////////render functions/////////////////////////


    renderCourcesData (Courcesdata){
      this.clearHtmlBody;
      assesmentDiv.classList.add("main--cources--container")
    assesmentDiv.classList.toggle("assesment");
    assesmentDiv.innerHTML = 
    `
    ${Courcesdata.map((course,i) =>{
        return `
        
            <div class="cources--box">
        <h2 data-question="${i}">${course.recommendedCourse}</h2>
                <a href =${course.CourseURL}> ${course.recommendedCourse}</a>
                <p>${course.ex}</p>
            </div>
        
    `}).join(" ")}
    `
  }

//////////////////////////////////////////////////
  renderAssesment (data){
    const questions = data.questions;
  
  this.clearHtmlBody();


  //rendering questions
    assesmentDiv.innerHTML = 
    `<form>
    ${questions.map((question,i) =>{return `
    <div class = "question--box">
    <h2 data-question="${i}">${question.question}</h2>`}).join(" ")}
    </div>
    <button class= "submit--btn"type="submit" value="Submit">submit</button
    </form>`;


    //rendering choices

    questions.map((question,mainIndex) =>{
    
    //gitting the choices question 
    const corespondingQuestionEL = document.querySelector(`[data-question="${mainIndex}"]`);
  
    question.choices.map((choice) => {corespondingQuestionEL.insertAdjacentHTML(
      "afterend",
    
        `<div class="choices--box">
        <input  type="radio" id="${mainIndex}" name="${mainIndex}" value="${choice}">
        <label for="${mainIndex}">${choice}</label><br>
        </div>
        `)     
        });
  
    })
  }

}
//Init main class
const Main1 = new Main;


const handleStartingfn =  async function (e){
    try{
      document.querySelector(".blur--screen").classList.toggle("blur")
      e.preventDefault();
      const jobTitle = document.querySelector("#jobtitle-input").value;

      
      //Guard clause 
      if (jobTitle===undefined||jobTitle===""||jobTitle===" ") return alert("please enter a jobtitle");
        Main1.disableBtn(startAseesment)
       

      

      const URL ="http://localhost:3000/chat";

      const data = await Main1.fetchingData(URL,jobTitle)   // await fetchingData(URL,jobTitle)

      Main1.renderAssesment(data)

    sendFormBtn = document.querySelector(".submit--btn");
    sendFormBtn.addEventListener("click",handleSendingFormInfo)
    document.querySelector(".blur--screen").classList.toggle("blur")

    }catch(e){console.log(e)};
   
}


const handleSendingFormInfo =  async function(e){
  try{
    document.querySelector(".blur--screen").classList.toggle("blur")

      e.preventDefault();

      const numberOfanswers = Array.from(document.querySelectorAll('input[type="radio"]:checked')).length;
      const expectedAnswers =10;

    //Guard clause 
if (numberOfanswers<expectedAnswers) return alert("please complete all the answers ")

        Main1.disableBtn(sendFormBtn)



        const answers = Array.from(
        document.querySelectorAll('input[type="radio"]:checked'))
        .map(radio => radio.value)
        .join(', ');

        const URL ='http://localhost:3000/answers';

        const data = await Main1.fetchingData(URL,answers);

        const courses = data.courses;

        Main1.renderCourcesData(courses);
    

        document.querySelector(".blur--screen").classList.toggle("blur")

    }catch(e){
      console.log(e); 
    }
}
/*///////////////////////////////////////////////////////////*/
startAseesment.addEventListener("click",handleStartingfn);