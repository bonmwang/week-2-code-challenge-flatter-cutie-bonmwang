document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://localhost:3001/characters';
    
    // DOM elements
    const characterBar = document.getElementById('character-bar');
    const nameElement = document.getElementById('name');
    const imageElement = document.getElementById('image');
    const voteCountElement = document.getElementById('vote-count');
    const votesForm = document.getElementById('votes-form');
    const resetBtn = document.getElementById('reset-btn');
  
    let characters = [];
    let currentCharacter = null;
  
    // Fetch characters
    fetch(API_URL)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        characters = data;
        renderCharacterNames();
        if (characters.length > 0) {
          showCharacterDetails(characters[0]);
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        // Fallback data if server fails
        characters = [
          {
            "id": 1,
            "name": "Mr. Cute",
            "image": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGplaWxud2JtZHB6cXE5aDZtamZ3b3Via25pYThwbTJpN3Z4eTQ2bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bLzSbiS3Lzkrwl6ENS/giphy.gif",
            "votes": 0
          },
          // ... other characters
          {
            "id": 2,
            "name": "Mx. Monkey",
            "image": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGlqcTU5aGJ3b3h4ODZvbmNpZjJkZW43c2F3NThkbmljajF2M2ozYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Rlwz4m0aHgXH13jyrE/giphy.gif",
            "votes": 0
          },
          {
            "id": 3,
            "name": "Ms. Zebra",
            "image": "https://media2.giphy.com/media/20G9uNqE3K4dRjCppA/source.gif",
            "votes": 0
          },
          {
            "id": 4,
            "name": "Dr. Lion",
            "image": "http://bestanimations.com/Animals/Mammals/Cats/Lions/animated-lion-gif-11.gif",
            "votes": 0
          },
          {
            "id": 5,
            "name": "Mme. Panda",
            "image": "https://media.giphy.com/media/ALalVMOVR8Qw/giphy.gif",
            "votes": 0
        }
        ];
        renderCharacterNames();
      });
  
    function renderCharacterNames() {
      characterBar.innerHTML = '';
      characters.forEach(character => {
        const span = document.createElement('span');
        span.textContent = character.name;
        span.style.cursor = 'pointer';
        span.style.margin = '0 10px';
        span.addEventListener('click', () => showCharacterDetails(character));
        characterBar.appendChild(span);
      });
    }
  
    function showCharacterDetails(character) {
      currentCharacter = character;
      nameElement.textContent = character.name;
      imageElement.src = character.image;
      imageElement.alt = character.name;
      voteCountElement.textContent = character.votes;
    }
  
    votesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const votesInput = document.getElementById('votes');
      const votes = parseInt(votesInput.value);
      
      if (!isNaN(votes)) {
        currentCharacter.votes += votes;
        voteCountElement.textContent = currentCharacter.votes;
        votesInput.value = '';
      }
    });
  
    resetBtn.addEventListener('click', () => {
      if (currentCharacter) {
        currentCharacter.votes = 0;
        voteCountElement.textContent = 0;
      }
    });
  });