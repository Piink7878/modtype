// Elements
const gameContainer = document.getElementById('game-container');
const fallingWordsContainer = document.getElementById('falling-words-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const inputElement = document.getElementById('input');
const startModal = document.getElementById('start-modal');
const endModal = document.getElementById('end-modal');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const endMessage = document.getElementById('end-message');
const typedWordsElement = document.getElementById('typed-words');

// Variables
const words = ['function' , 'variable' , 'loop' , 'array' , 'object' , 'string' , 'integer' , 'syntax' , 'error' , 'input' , 'output' , 'compile' , 'debug' , 'execute' , 'stack' , 'queue' , 'recursion' , 'condition' , 'event' , 'asynchronous' , 'promise' , 'goto' , 'float' , 'sizeof' , 'switch' , 'typedef' , 'continue' , 'static' , 'for' , 'char' , 'return' , 'malloc' , 'extern' , 'enum' , 'if' , 'break' , 'main' , 'long' ,'void' , 'do' , 'while' , 'case' , 'int' , '#define' , 'scanf' , 'const' , 'free' , 'unsigned' , 'printf' , '#include' , 'signed' , 'def' , 'while' , 'import' , 'if' , 'try' , 'lambda' , 'else' , 'class' , 'for' , 'return' , 'break' , 'continue' , 'with' , 'global' , 'except' , 'is' , 'None' , 'yield' , 'and' , 'or' , 'del' , 'assert' , 'finally' , 'from' , 'in' , 'not' , 'pass' , 'True' , 'False' , 'nonlocal' , 'encryption' , 'decryption' , 'hash' , 'algorithm' , 'symmetric' , 'asymmetric' , 'key' , 'certificate' , 'public' , 'private' , 'cryptography' , 'brute' , 'force' , 'attack' , 'phishing' , 'malware' , 'ransomware' , 'firewall' , 'antivirus' , 'intrusion' , 'detection' , 'penetration' , 'testing' , 'vulnerability' , 'exploit' , 'game' , 'engine' , 'Unity' , 'Unreal' , 'asset' , 'physics' , 'shader' , 'animation' , 'sprite' , '3D' , '2D' , 'collision' , 'detection' , 'rendering' , 'framerate' , 'level' , 'design' , 'character' , 'controller' , 'AI' , 'pathfinding' , 'particle' , 'system' , 'skybox' , 'lighting' , 'texture' , 'rigging' , 'machine' , 'learning' , 'deep' , 'neural' , 'network' , 'supervised' , 'reinforcement' , 'learning' , 'dataset' , 'training' , 'validation' , 'testing' , 'extraction' , 'hyperparameter' , 'optimization' , 'overfitting' , 'underfitting' , 'backpropagation' , 'convolution' , 'recurrent' , 'pipeline' , 'Docker' , 'Kubernetes' , 'Jenkins' , 'GitHub' , 'Actions' , 'Terraform' , 'Ansible' , 'Puppet' , 'Chef' , 'monitoring' , 'logging' , 'Prometheus' , 'Grafana' , 'deployment' , 'scaling' , 'load' , 'balancing' , 'automation' , 'container' , 'orchestration' , 'version' , 'control' , 'repository' , 'HTML' , 'CSS' , 'JavaScript' , 'React' ,  'Angular' , 'Vue' , 'Node.js' , 'Express' , 'RESTful' , 'API' , 'GraphQL' , 'MongoDB' , 'MySQL' , 'authentication' , 'authorization' , 'session' , 'cookie' , 'token' , 'encryption' , 'hashing' , 'database' , 'schema' , 'table' , 'row' , 'column' , 'primary' , 'key' , 'foreign' , 'key' , 'index' , 'query' , 'SQL' , 'SELECT' , 'INSERT' , 'UPDATE' , 'DELETE' , 'JOIN' , 'INNER' , 'OUTER' , 'LEFT' , 'RIGHT' , 'CROSS' , 'UNION' , 'aggregate' , 'normalization' , 'ACID' , 'transaction' , 'rollback' , 'commit' , 'NoSQL' , 'Redis' , 'Cassandra' , 'Elasticsearch' , 'binary' , 'search' , 'merge' , 'sort' , 'quick' , 'sort' , 'dynamic' , 'programming' , 'greedy' , 'algorithm' , 'graph' , 'tree' , 'heap' , 'hash' , 'divide' , 'conquer' , 'brute' , 'force' , 'backtracking' , 'optimization' , 'traversal' , 'node'];
let remainingWords = [...words]; // Clone words for tracking
let score = 0;
let timeLeft = 60;
let typedWords = [];
let charactersTyped = 0;
let startTime = null;
let timerInterval = null;
let wordCreationInterval = null;

// Update score display
function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

// Start the game timer
function startTimer() {
    clearInterval(timerInterval); // Prevent duplicate intervals
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Function to create a falling word
function createWord() {
    if (remainingWords.length === 0) {
        remainingWords = [...words]; // Reset the list of words to start over
    }

    // Get the next word from the list
    const word = remainingWords.shift();
    const wordElement = document.createElement('div');
    wordElement.className = 'falling-word';
    wordElement.textContent = word;
    wordElement.style.left = `${Math.random() * (fallingWordsContainer.offsetWidth - 100)}px`;
    wordElement.style.top = '0px';
    fallingWordsContainer.appendChild(wordElement);

    const fallDuration = 5000; // 5 seconds
    wordElement.style.transition = `top ${fallDuration / 1000}s linear`;
    setTimeout(() => {
        wordElement.style.top = `${fallingWordsContainer.offsetHeight - wordElement.offsetHeight}px`;
    }, 10);

    setTimeout(() => {
        if (fallingWordsContainer.contains(wordElement)) {
            fallingWordsContainer.removeChild(wordElement);
        }
    }, fallDuration);
}

// Stop all falling words
function stopFallingWords() {
    const fallingWords = document.querySelectorAll('.falling-word');
    fallingWords.forEach(word => word.remove());
    clearInterval(wordCreationInterval);
}

// End the game and show final stats (characters typed + WPM)
// End the game and show final stats (characters typed + WPM)
function endGame() {
    inputElement.disabled = true;
    stopFallingWords();
    clearInterval(wordCreationInterval);

    const wpm = calculateWPM(); // Calculate WPM

    // Update end modal content
    endMessage.textContent = `Your score is ${score}.`;
    document.getElementById('total-characters').textContent = `Total characters typed: ${charactersTyped}`;
    document.getElementById('wpm').textContent = `WPM: ${wpm}`;

    // Show end modal
    endModal.style.display = 'block';
}



// Track characters typed and update only when word matches
inputElement.addEventListener('input', () => {
    const typedWord = inputElement.value.trim();
    const fallingWords = document.querySelectorAll('.falling-word');

    fallingWords.forEach(word => {
        if (word.textContent === typedWord) {
            score += 10; // Increase score for correct word
            typedWords.push(typedWord);
            charactersTyped += typedWord.length; // Add the length of the correctly typed word
            updateScore(); // Update score
            document.getElementById('character-count').textContent = `Characters Type: ${charactersTyped}`; // Update character count
            fallingWordsContainer.removeChild(word); // Remove the word from the container
            inputElement.value = ''; // Reset input field
        }
    });
});



// Calculate WPM (Words Per Minute) and format it to 2 decimal places
function calculateWPM() {
    const elapsedTime = (Date.now() - startTime) / 1000; // Elapsed time in seconds
    const wpm = (charactersTyped / 5) * (60 / elapsedTime); // WPM = (characters / 5) * (60 / time in seconds)
    return wpm.toFixed(2); // Format WPM to 2 decimal places
}




// Start countdown before the game
function startCountdown(callback) {
    let countdown = 3;
    timerElement.textContent = `Starting in: ${countdown}`;
    const countdownInterval = setInterval(() => {
        countdown--;
        timerElement.textContent = `Starting in: ${countdown}`;
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            callback();
        }
    }, 1000);
}

// Start the game
function startGame() {
    startModal.style.display = 'none';
    inputElement.disabled = true;
    inputElement.value = ''; // Clear the input field
    startCountdown(() => {
        inputElement.disabled = false;
        inputElement.focus();
        startTime = Date.now();
        wordCreationInterval = setInterval(createWord, 1000);
        startTimer();
    });
}

// Restart the game
function restartGame() {
    score = 0;
    timeLeft = 60;
    document.getElementById('character-count').textContent = "Characters Typed: 0"; 
    remainingWords = [...words]; // Reset the word list
    typedWords = [];
    charactersTyped = 0;
    startTime = null;
    updateScore();
    timerElement.textContent = `Time: ${timeLeft}`;
    endModal.style.display = 'none';
    startModal.style.display = 'block';
}

// Handle input typing
inputElement.addEventListener('input', () => {
    const typedWord = inputElement.value.trim();
    const fallingWords = document.querySelectorAll('.falling-word');
    fallingWords.forEach(word => {
        if (word.textContent === typedWord) {
            score += 10;
            typedWords.push(typedWord);
            updateScore();
            fallingWordsContainer.removeChild(word);
            inputElement.value = '';
        }
    });
});

// Event listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

// Show start modal on page load
window.onload = () => {
    startModal.style.display = 'block';
};