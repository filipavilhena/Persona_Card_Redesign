/*Carrossel*/
var slidesContainer = document.getElementById("slides-container");
var slide = document.querySelector(".slide");
var prevButton = document.getElementById("slide-arrow-prev");
var nextButton = document.getElementById("slide-arrow-next");
var home = document.getElementById("homepage_button");
var pageNumber = 0;
var slideWidth = slide.clientWidth;
var voiceOverActive = false;

nextButton.addEventListener("click", () => {
  slidesContainer.scrollLeft += slideWidth;
  if(pageNumber < 5){
  pageNumber ++;
  }
  cancelSpeak();
  console.log(pageNumber);
});

prevButton.addEventListener("click", () => {
  
  slidesContainer.scrollLeft -= slideWidth;
  if(pageNumber > 0){
  pageNumber --;
  }
  cancelSpeak();
  console.log(pageNumber);
});

/*Keyboard Accessibility*/ 

window.addEventListener('keydown', function(event) {

  const key = event.key;
  if(document.activeElement != document.getElementById('search_input')){
  //console.log(key);
  if(key == "ArrowRight"){
    nextButton.focus();
  slidesContainer.scrollLeft += slideWidth;
  if(pageNumber < 5){
    pageNumber ++;
    }
  console.log(pageNumber);
  cancelSpeak();
  } else if (key == "ArrowLeft"){
    prevButton.focus();
    slidesContainer.scrollLeft -= slideWidth;
    if(pageNumber > 0){
      pageNumber --;
      } else if(pageNumber == 0){
        home.click();
        home.focus();
      }
    console.log(pageNumber);
    cancelSpeak();
  } else if (key == " "){
    console.log("Space Pressed");
    if(voiceOverActive == false){
      if(pageNumber == 0){
        document.getElementById('play1').focus();
        pageOne();
      } else if(pageNumber == 1){
        document.getElementById("play2").focus();
        pageTwo();
      } else if(pageNumber == 2){
        document.getElementById("play3").focus();
        pageThree();
      } else if(pageNumber == 3){
        document.getElementById("play4").focus();
        pageFour();
      } else if(pageNumber == 4){
        document.getElementById("play5").focus();
        pageFive();
      } else if(pageNumber == 5){
        document.getElementById("play6").focus();
        pageSix();
      }
    }else{
      if(pageNumber == 0){
        document.getElementById('pause1').focus();
      } else if(pageNumber == 1){
        document.getElementById("pause2").focus();
      } else if(pageNumber == 2){
        document.getElementById("pause3").focus();
      } else if(pageNumber == 3){
        document.getElementById("pause4").focus();
      } else if(pageNumber == 4){
        document.getElementById("pause5").focus();
      } else if(pageNumber == 5){
        document.getElementById("pause6").focus();
      }
      stopVoiceOver();
    }
  } else if(key == "h"){
    home.click();
    home.focus();
  } else if(key == "Shift"){
    Show();
    var search = document.getElementById("search_input");
    search.focus();
  }
} else if(document.activeElement === document.getElementById('search_input')){
  console.log("pesquisa");
if(key == "Enter"){
    var search_button = document.getElementById("search_button");
    search_button.click();
    search_button.focus();
  } else if(key == "ArrowDown"){
    cleanSearch();
  } else if(key == "Shift"){
    Hide(); 
    document.getElementById("search_input").blur();
  }
}
});

document.addEventListener('keyup', function(event) {
  const focusedButton = document.querySelector('button:focus');
  if (focusedButton) {
      focusedButton.blur();
  }
});

/*Search Navigation*/
var full_text = document.getElementsByClassName("persona_card_text");

function searchText(){

    var search_input = document.getElementById("search_input").value;
    //console.log("Prontos ou não aqui vou eu!" + " " + search_input);
    //console.log(full_text);

    if(search_input !== " "){
        var regExp= new RegExp(search_input, "gi");
        //console.log(regExp);
        for(var i=0;i < full_text.length; i++){
            //console.log(full_text[i].textContent);
            full_text[i].innerHTML = (full_text[i].textContent).replace(regExp, "<mark>$&</mark>");
         }

          //console.log(full_text[pageNumber-1].innerHTML.includes("<mark>"));

          if(full_text[pageNumber].innerHTML.includes("<mark>") == false){
            console.log("Não tenho a palavra");
              for(var i=0;i < full_text.length; i++){
                  if(full_text[i].innerHTML.includes("<mark>") == true){
                    if(pageNumber<i){
                      slidesContainer.scrollLeft += (slideWidth*((i-pageNumber)));
                      
                    } else if (pageNumber>i){
                      slidesContainer.scrollLeft -= (slideWidth*((pageNumber-i)));
                    }
                    pageNumber = i;
                    console.log("pn:"+pageNumber + " " +"i" +i);
                    break;
                  }
              }
          }
    }
}

function cleanSearch() {
  document.getElementById("search_input").value = "";
  for(var i=0;i < full_text.length; i++){
    full_text[i].innerHTML = (full_text[i].textContent).replace(/<mark[^>]*>/g, '').replace(/<\/mark>/g, '');
 }
}

const button = document.getElementById('clean_search');

function Hide(){
    button.classList.add('hidden');
}

function Show(){
  button.classList.remove('hidden');
}

window.addEventListener('click', function(event) {
  if(document.activeElement != document.getElementById('search_input')){
    Hide();
  } else if(document.activeElement === document.getElementById('search_input')){
    Show();
  }
});

function searchActive(){
  document.getElementById("search_input").focus();
}

/*Audio Alternative*/
const synth = window.speechSynthesis;
const voiceSelect = document.querySelector("select");
voices = synth.getVoices();

function pageOne(){
  const pageOneText = new SpeechSynthesisUtterance("Preety is a middle school student with attention deficit hyperactivity disorder with dyslexia. She has difficulty reading, but she enjoys her literature class.");
  voiceOver(pageOneText);
}

function pageTwo(){
  const pageTwoText = new SpeechSynthesisUtterance("Her school started using online textbooks. She was initially worried about using this new format, but using text-to-speech software that highlights the text on the screen as it reads it aloud, she realized that she can focus on the content instead of struggling over every word.");
  voiceOver(pageTwoText);
}

function pageThree(){
  const pageThreeText = new SpeechSynthesisUtterance("The text-to-speech software helps with other online text; but, her experience with websites varies. Some sites use graphics in a way that helps her to focus on the content that she would like to read, while other sites have distracting advertisements and moving content.");
  voiceOver(pageThreeText);
}

function pageFour(){
  const pageFourText = new SpeechSynthesisUtterance("She has problems with online content when the navigation is unclear, and prefers sites that have navigation cues including a navigation bar, search box, bread-crumb trails, and a sitemap.");
  voiceOver(pageFourText);
}

function pageFive(){
  const pageFiveText = new SpeechSynthesisUtterance("Her school is using an accessible library catalog online. Before it she had to go to the library to find books. Now she can search the catalog using her phone, tablet, or laptop.");
  voiceOver(pageFiveText);
}

function pageSix(){
  const pageSixText = new SpeechSynthesisUtterance("She struggles with spelling but the search feature that suggests alternative spellings and correct words is helpful.");
  voiceOver(pageSixText);
}

function voiceOver(pageText){
  const utterThis = pageText;
  const selectedOption = 'Karen';
  for (const voice of voices) {
    if (voice.name === selectedOption) {
      utterThis.voice = voice;
    }
  }
  utterThis.pitch = 1;
  utterThis.rate = 1;
  voiceOverActive = true;
  if(synth.paused == false || synth.paused == true && synth.speaking == false){
    synth.speak(utterThis);
  } else {
    synth.resume();
}
  //console.log(synth);
}

function stopVoiceOver(){
  voiceOverActive = false;
  synth.pause();
}

function cancelSpeak(){
  voiceOverActive = false;
  synth.cancel();
}

/* Spelling Check */
