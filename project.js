$(document).ready(function(){

//The questions array contain 9 objects, each object contain the question, choices and the corect answer.
        const questions = [{
            question:"How many babies did Phoebe carry for her brother?",
            choices:["Three","Four","Two","Six"],
            correctAnswer:"Three"
            },
        {
            question:"Who does Ross marry in Las Vegas?",
            choices:["Phebe","Emily","Mona","Rachel"],
            correctAnswer:"Rachel"
        },
        {
            question:"What was the name of Ross' monkey?",
            choices:["Snowy","Marcel","Snickers","Toffy"],
            correctAnswer:"Marcel"
        },
        {
            question:"Who marries Chandler and Monica?",
            choices:["Rabbi","Joey","Ross","Priest"],
            correctAnswer:"Joey"
        },
        {
            question:"What is the name of Joey's soap opera?",
            choices:["Melrose Place","Bold and Beautiful","Days of our lifes","Yong and the reastless"],
            correctAnswer:"Days of our lifes"
        },
        {
            question:"Name one of the designers Rachel works for?",
            choices:["Ralph Lauren","Donna Karan","Kenzo","Prada"],
            correctAnswer:"Ralph Lauren"
        },
        {
            question:"Which friend of her parents does Monica date?",
            choices:["Matthew","John","Richard","Chandler"],
            correctAnswer:"Richard"
        },
        {
            question:"Where is Chandler forced to work after falling asleep in a meeting?",
            choices:["Miami","Tulsa","New-York","Russia"],
            correctAnswer:"Tulsa"
        },
        {
            question:"How many sisters does Joey have?",
            choices:["Six","Two","Seven","One"],
            correctAnswer:"Seven"
        }
       ]

    let questionCounter = 0; //Trucks question number
    let userSelections = []; //Array containing the user choices
    let questionInterval; // A variable for the timer interval

//This function creates the questions as the user going to see them on the screen (one by one)
    function createQuestion(index){

        let questionDisplay = $('#question'); 

        let header = $('<h2>Question number' + ' ' + (index+1) + '</h2>');
        questionDisplay.append(header);

        let question = $('<p>').append(questions[index].question);
        questionDisplay.append(question);

        let answers = choisesRadio(index);
        questionDisplay.append(answers);

   return questionDisplay; 
   };

   $('#GIF1').hide();
   $('#GIF2').hide();
   $('#GIF3').hide();
   createQuestion(questionCounter);
   questionTimer();
  
//This function creates radio buttons for each answer - question by question    
  function choisesRadio(index){
    let radioList = $('<ul>');
    let input = '';
    let label = '';

    for(let i = 0; i < questions[index].choices.length; i++){
        let item = $('<li>');
        let optionText = questions[index].choices[i];

        // label = '<label for="' + optionText + '">' + optionText + '</label>';

        label = `<label for="${optionText}"> ${optionText} <label>`;
        console.log(label);


        input = '<input type = "radio" name = "answer" id = "'+optionText+'" value = "' + optionText + '"/>';
        
        item.append(input)
        .append(label);

        radioList.append(item);
    };
    return radioList;
};

//Click handler for the next button
   $("#next").on('click',function(event){
    event.preventDefault();
    select();
    if(userSelections[questionCounter] === undefined){
         alert("Pick an answer please");
    } else{
        stopQuestionTimer();
        $('#question').empty();
        questionCounter++;
        if(questionCounter < questions.length){
            createQuestion(questionCounter);
            questionTimer();
        } else if(questionCounter === questions.length){
            displayScore();
            $('#next').hide();
        };
    }
});

//This function reads the user selection and pushes it into an array
   function select(){
        userSelections[questionCounter] = $('input[name = "answer"]:checked').val();
    };
    
//This function calculate the user's score at the quiz
    function displayScore(){
        let answerCounter = 0;
        let score = $('#answerDisplay');
      
        for(let i = 0; i < userSelections.length; i++){
            if(userSelections[i] === questions[i].correctAnswer){
                answerCounter++;
            };
        };
        let showYourScore = $('<p> You got'+ ' ' + (answerCounter) + ' ' +'correct answers out of' + ' ' + (questions.length) + ' ' +'questions!!!!' + '</p>');
            score.append(showYourScore);

        if( 5 < answerCounter && answerCounter <= 8){
             $('#GIF1').show();

        } else if (5 >= answerCounter){
            $('#GIF2').show();

        }else if(answerCounter === 9){
            $('#GIF3').show();
        };
        return score;
    };

//This function creates a 10 seconds timer for the questions    
 function questionTimer(){
    let timeleft = 10;
    questionInterval= setInterval(function(){
            document.getElementById('countdown').innerHTML = timeleft + " seconds remaining";
            timeleft -= 1;
            if(timeleft <= 0){
                clearInterval();
                document.getElementById('countdown').innerHTML = "Finished"
                if (document.getElementById('countdown').innerHTML === "Finished"){
                    
                          stopQuestionTimer();
                          $('#question').empty();
                          questionCounter++;

                          if(questionCounter < questions.length){
                          createQuestion(questionCounter);
                          questionTimer();
                          } 
                          else if(questionCounter === questions.length){
                            displayScore();
                            $('#next').hide();
                        };
                }
            };
        }, 1000);
  };

//This function stops the questions timer
function stopQuestionTimer(){
    clearInterval(questionInterval);
};

});