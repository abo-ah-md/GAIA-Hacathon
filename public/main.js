


const startAseesment = document.querySelector("#Send-jobtitle-btn");
const jobTitle = document.querySelector("#jobtitle-input").value;
const assesmentDiv = document.querySelector(".assesment");
let sendFormBtn= null;














const handleStartingfn =  async function (e,jobTitle){
    try{

        e.preventDefault();
        startAseesment.disabled = true;
        
    
        if (jobTitle==" ") return alert("please enter a jobtitle");




        const fdata = {
            jobTitle: jobTitle,
          };
        const res = await fetch("https://entirenimbleshell--onlytest1.repl.co/chat",
        {method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(fdata),});
    
       
        const data = await res.json();
        const questions = data.questions
         console.log( await questions);

        assesmentDiv.innerHTML='';
        assesmentDiv.innerHTML = 
        `<form>
        ${questions.map((question,i) =>{return `
        <div class = "question--box">
        <h2 data-question="${i}">${question.question}</h2>`}).join(" ")}
        </div>
        <button class= "submit--btn"type="submit" value="Submit">submit</button
        </form>`

        questions
        .map((question,mainIndex) =>{
        const closestElement = document.querySelector(`[data-question="${mainIndex}"]`);

        question.choices
        .map((choice) => {
        closestElement.insertAdjacentHTML("afterend", 
            `<div class="choices--box">
            <input  type="radio" id="${mainIndex}" name="${mainIndex}" value="${choice}">
            <label for="${mainIndex}">${choice}</label><br>
            </div>
            `)      
    
            });

        })
        
    sendFormBtn = document.querySelector(".submit--btn");
    sendFormBtn.addEventListener("click",handleSendingFormInfo)

    }catch(e){console.log(e)};
   
}


const handleSendingFormInfo =  async function(e){
    try{
        e.preventDefault();
        sendFormBtn.disabled = true;

        const answers = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(radio => radio.value).join(', ');
    
        const fdata = {
            answers: answers,
          };
        const res = await fetch("https://entirenimbleshell--onlytest1.repl.co/answers",
        {method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(fdata),});

        const data = await res.json();
    
        console.log(await data);

        const courses = data.courses;



        assesmentDiv.classList.add("main--cources--container")
        assesmentDiv.classList.toggle("assesment");
        assesmentDiv.innerHTML='';

        assesmentDiv.innerHTML = 
        `
        ${courses.map((course,i) =>{
            return `
            
                <div class="cources--box">
            <h2 data-question="${i}">${course.recommendedCourse}</h2>
                    <a href =${course.CourseURL}> ${course.recommendedCourse}</a>
                    <p>${course.ex}</p>
                </div>
            
        `}).join(" ")}
        `

    }catch(e){
        console.log(e)
        
        const answers = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(radio => radio.value).join(', ');
    
        const fdata = {
            answers: answers,
          };



       
        const res = await fetch("http://localhost:3000/answers",
        {method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(fdata),});

        const data = await res.json();
    
        console.log(await data);

        const courses = data.courses;



        assesmentDiv.classList.add("main--cources--container")
        assesmentDiv.classList.toggle("assesment");
        assesmentDiv.innerHTML='';

        assesmentDiv.innerHTML = 
        `
        ${courses.map((course,i) =>{
            return `
            
                <div class="cources--box">
            <h2 data-question="${i}">${course.recommendedCourse}</h2>
                    <a href =${course.CourseURL}> ${course.recommendedCourse}</a>
                    <p>${course.ex}</p>
                </div>
            
        `}).join(" ")}
        `







        
        ;}
  
}
/*///////////////////////////////////////////////////////////*/

startAseesment.addEventListener("click",handleStartingfn);


