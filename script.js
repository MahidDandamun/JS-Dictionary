const input = document.getElementById("input");
const infoText = document.getElementById("info-text");
const container = document.getElementById("meaning-container");
const wordName = document.getElementById("title");
const pron = document.getElementById("pronounciation");
const wordMeaning = document.getElementById("meaning");
const wordAudio = document.getElementById("audio");

async function fetchApi(word) {
    
  try {
    container.style.display = "none";
    infoText.style.display = "block";
    infoText.innerText = `Searching ${word}`;
    const link = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const request = await fetch(link).then((e) => e.json());
    infoText.style.display = "none";
    container.style.display = "flex";
    wordName.innerText = request[0].word;
    if (request.title) {
      wordName.innerText="word is not found"
      pron.innerText = "word is not found";
      wordMeaning.innerText = "N/A";
 
      wordAudio.src = "";
      
    } else {
      wordName.innerText = request[0].word;
      pron.innerText = request[0].phonetics[0].text;
      wordMeaning.innerText = request[0].meanings[0].definitions[0].definition;
      wordAudio.src = request[0].phonetics[0].audio;
    }
  }
  catch (error) {
    console.log(error);
  

  }
}

input.addEventListener("keypress", (e) => {
  if (e.key==="Enter" && input.value) {
    fetchApi(input.value);
  }
}); 