
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const app = express();
require('dotenv').config()


app.use(cors());
app.use(express.json());


const configuration = new Configuration({organization: "org-WzvEuZ1SLy4VY0l0Esorwpli",apiKey: "",});
const openai = new OpenAIApi(configuration);

let GPTassesment= null;
let GPTresult = null
let jobtitle = null



app.post('/chat', async (req, res) => {
  try {
    let  message  = req.body.message;
    jobtitle = req.body.message

    let assesmentTemplate = `you are a spicalized human development Cources consultant
     provide me with a 10  assesment  ((scenario based)) multiple choises questions that covers overall skills
      technical and non technical required in
      ${message} jobtitle 
      the answers should be able to tell you what level is this person in the skill
       in addition to pinpoint there shortcomings 
       make your response limited to only the questions and make it in a valid json format exactly like this Template
       {
        "questions":[
          {   "question":"(string )",
              "choices":"(array of string)"
          }
                    ]
         }` 

         


    let completion = await openai.createChatCompletion({model: "gpt-3.5-turbo",messages: [{role: "user", content: JSON.stringify(assesmentTemplate)}],});
      console.log(completion.data.choices[0].message.content);
      GPTresult=completion.data.choices[0].message.content
      




    // Make a request to the ChatGPT API
    
    res.send(completion.data.choices[0].message.content);
} catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }

})














app.post('/answers', async (req, res) => {
  try {
    console.log(GPTresult);
    let  result  = req.body;
  
    // Make a request to the ChatGPT API



    const SendingToGPTResultTeamplate = ` you are playing the role of a spicalized human development Cources consultant and  An assessment has been made to test overall skills in the ${jobtitle} title.
    Please answer the following questions:\n
   ${GPTresult}
    \n and the answers where ${result}
   
   based on those answers what does this person have and lack of skills and provide a course link for each question  that can help with there shortcomings 
    you must not include any udemy or coursera or www.skillsoft cources  
    make your response limited to only the cources with no addional information or notes what so ever and make it in a valid json format exactly like this Template
       {
        "cources":[
          {
               "recommendedCourse":"(string course name )",
              "CourseURL":"(string course url)",
              "ex":(string explaination why you recommended this course)
          }
                    ]
       } `
    
 
    let completion = await openai.createChatCompletion({model: "gpt-3.5-turbo",messages: [{role: "user", content: JSON.stringify(SendingToGPTResultTeamplate)}],});
    console.log(completion.data.choices[0].message.content);
    




  // Make a request to the ChatGPT API
  
  res.send(completion.data.choices[0].message.content);
} catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }

})


const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



  
 

/* 1. Which of the following is an example of a non-technical skill required for a web developer?

A) Proficiency in HTML/CSS coding
B) Knowledge of server-side scripting languages
C) Effective communication with clients and team members
D) Familiarity with version control systems
2. Which of the following programming languages would a web developer most likely be expected to know?
A) Java
B) PHP
C) C#
D) Objective-C
3. A client has requested a new feature for their website. Which of the following is the most appropriate first step to
take as a web developer?
A) Begin coding the feature immediately
B) Determine the feasibility of the request and estimate the time and resources required
C) Contact the client and ask for more details
D) Ask a manager or project lead for guidance
4. Which of the following is an example of a front-end web development skill?
A) Knowledge of database administration
B) Familiarity with AngularJS
C) Debugging server-side code
D) Designing user interfaces and layouts
5. As a web developer, what is important to consider when designing a website's navigation system?
A) The visual appeal of the navigation
B) The number of pages on the website
C) User experience and ease of use
D) Keyword density and search engine optimization*/




/*  you are a spicalized human development Cources consultant  rovide me with a 10  assesment  scenario based multiple choises questions
 that covers   overall   skills technical and non technical required in web developer jobtitle 
  the answers should be able to tell you what level is this person in the skill in addition to pinpoint there short comings
   make your response limited to only the questions*/

/* 1. Which programming languages are commonly used in web development?
a) Python
b) Java
c) HTML
d) C++

2. Which of the following is used to style a website?
a) JavaScript
b) CSS
c) PHP
d) Ruby

3. Which of the following is not a responsive design technique?
a) Fluid layouts
b) Media queries
c) Adaptive design
d) Flash animations

4. Which of the following is a popular content management system for building websites?
a) WordPress
b) Photoshop
c) Illustrator
d) InDesign

5. Which of the following is a commonly used front-end framework in web development?
a) React
b) Angular
c) Vue
d) All of the above

6. Which of the following is not considered a programming paradigm?
a) Object-Oriented Programming
b) Functional Programming
c) Logic Programming
d) Graphics Programming

7. What is the purpose of JavaScript?
a) To create and manage databases
b) To style a website
c) To add interactivity and dynamic effects to a website
d) To create and edit images

8. What is the difference between HTTP and HTTPS?
a) HTTPS is used for secure communication and uses SSL encryption
b) HTTP is used for secure communication and uses TLS encryption
c) HTTPS is used for unsecure communication and uses SSL encryption
d) HTTP is used for unsecure communication and uses TLS encryption

9. Which of the following is considered a non-technical skill for a web developer?
a) Communication
b) HTML coding
c) Ruby on Rails
d) Database administration

10. Which is a commonly used tool for version control in web development?
a) Microsoft Word
b) Google Docs
c) SVN
d) Trello

Answers:
1. c) HTML
2. b) CSS
3. d) Flash animations
4. a) WordPress
5. d) All of the above
6. d) Graphics Programming
7. c) To add interactivity and dynamic effects to a website
8. a) HTTPS is used for secure communication and uses SSL encryption
9. a) Communication
10. c) SVN

Scoring:
8-10 Correct Answers: Expert level
6-7 Correct Answers: Intermediate level
4-5 Correct Answers: Beginner level
0-3 Correct Answers: Needs Improvement in overall skills, technical and non-technical.*/

