const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const submit = document.querySelector('.submit');
//Questions

let currentQuestion = {}
let acceptingAnswers = true; //abswer must be true
let score = 0 //question starting at 0
let questionCounter = 0; //question starting at 0
let availableQuestions = []

let questions = [
    { 
        //Q1
        question: "Which element has the symbol 'I' ?" , 
     choice1: "Iron", 
     choice2: "Yttrium", 
     choice3: "Iodine",
     choice4: "Iridium",
     answer: 3,
    },
        //Q2
        { 
            question: "Which element has the symbol 'K' ?"  , 
     choice1: "Krypton", 
     choice2: "Potassium", 
     choice3: "Copper",
     choice4: "Carbon",
     answer: 2,
        },
       //Q3
       { 
        question: "Which element has the symbol 'Lv' ?",
 choice1: "Lawrencium", 
 choice2: "Lanthanum", 
 choice3: "Lithium",
 choice4: "Livermorium",
 answer: 4,
    },
       //Q4
    {
        question: "Which element has the symbol 'No' ?" ,
     choice1: "Niobium", 
     choice2: "Nobelium", 
     choice3: "Nihonium",
     choice4: "Nitrogen",
     answer: 2,
    },
       //Q5
       { 
        question: "Which element has the symbol 'Og' ?" ,
        choice1: "Silver", 
        choice2: "Osmium", 
        choice3: "Oxygen",
        choice4: "Oganesson",
        answer: 4,
    },
       //Q6
     {
        question: "Which element has the symbol 'Rb' ?" ,
     choice1: "Rubidium", 
     choice2: "Radon", 
     choice3: "Rutherfordium",
     choice4: "Roentgenium",
     answer: 1,
    },
       //Q7
     {
        question: "Which element has the symbol 'Sg' ?" ,
        choice1: "Selenium", 
        choice2: "Strontium", 
        choice3: "Seaborgium",
        choice4: "Samarium",
        answer: 3,
     },
       //Q8
      { 
        question: "Which element has the symbol 'Ti' ?" ,
     choice1: "Technetium", 
     choice2: "Titanium", 
     choice3: "Thalium",
     choice4: "Tin",
     answer: 2,
     },
       //Q9
    { 
        question: "Which element has the symbol 'Y' ?" ,
        choice1: "Ytterbium", 
        choice2: "Iridium", 
        choice3: "Iron",
        choice4: "Yttrium",
        answer: 4,
     },
       //Q10
    { 
        question: "Which element has the symbol 'Mc' ?" ,
        choice1: "Mendeleevium", 
        choice2: "Molybdenum", 
        choice3: "Moscovium",
        choice4: "Meitnerium",
        answer: 3,
     }
]

const SCORE_POINTS = 100 //score
const MAX_QUESTIONS = 10 // limit of questions

startGame = () => {
questionCounter = 0
score = 0
availableQuestions = [...questions] // get question from the questions variable every start of game
getNewQuestion()
}

getNewQuestion = () => {

    //Keep track of the score
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }
        //questions changing to next one each click
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}` //backticks helps to contain any js expressions


    //Keep track of what question in present
    //randomizes question
    const questionsIndex = Math.floor(Math.random()* availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question



    //Choices

    choices.forEach(choice =>  {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion ['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1) //removes element from an array by only 1 , then returns what you remove

    acceptingAnswers = true //keeps track of correct answers
    }


    //checking if answers are correct or incorrect
    choices.forEach( choice => { 
        choice.addEventListener('click', e => {
            if (!acceptingAnswers) return //if the answer is wrong just continue without changing anything
            acceptingAnswers = false
            const selectedChoice = e.target //if user clicks this add the event
            const selectedAnswer = selectedChoice.dataset['number'] //the answer is the selectedchoice variable from the array's index number
        

            /*if the selected answer is the correct answer from the index with the variable answer then if its true
            then call the class from the CSS that changes the color accordingly if the selected answer is correct IF NOT then call the class that changes color for wrong answers*/
            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'



          if (classToApply === 'correct') {
              incrementScore(SCORE_POINTS)
          }

          

          selectedChoice.parentElement.classList.add(classToApply)


          //setTimeOut(function,miliseconds,...)

          //remove the color by 1 second then move on to the next question
          setTimeout(() => {

            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
          }, 1000)

       
        })


    incrementScore = num => {
    score += num 
    scoreText.innerText = score
    }


    //Moves to the next question
    startGame()

})