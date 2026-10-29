// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// SPA Tab Navigation (Buttons switch to completely different detailed pages/sections)
const tabButtons = document.querySelectorAll('.nav-tab-btn');
const pageViews = document.querySelectorAll('.page-view');

tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target');
        if (!targetId) return;

        // Hide all views
        pageViews.forEach(view => view.classList.remove('active'));

        // Show target view
        const targetView = document.getElementById(targetId);
        if (targetView) {
            targetView.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Update active class on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });

        // Close mobile menu if open
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==========================================
// JOLA AI WIDGET CON MEMORIA DE LA WEB
// ==========================================
const aiToggleBtn = document.getElementById('aiToggleBtn');
const aiChatWindow = document.getElementById('aiChatWindow');
const aiCloseBtn = document.getElementById('aiCloseBtn');
const aiChatMessages = document.getElementById('aiChatMessages');
const aiChatInput = document.getElementById('aiChatInput');
const aiChatSend = document.getElementById('aiChatSend');

// Toggle chat window
aiToggleBtn.addEventListener('click', () => {
    aiChatWindow.classList.toggle('active');
});

aiCloseBtn.addEventListener('click', () => {
    aiChatWindow.classList.remove('active');
});

// Base de conocimiento integrada (Memoria de la Web)
const websiteMemory = {
    departments: {
        movil: "En el departamento de Robótica Móvil aprendes navegación SLAM con LiDAR y ultrasonido, control PID para motores DC, y construcción de robots de competencia como Sumo y Laberintos.",
        ia: "En el departamento de IA & Visión Artificial trabajamos con OpenCV en Raspberry Pi y Jetson Nano, redes neuronales con TensorFlow Lite para clasificación de imágenes y procesamiento de lenguaje natural.",
        iot: "En IoT & Sistemas Inteligentes conectamos el hardware con la nube mediante MQTT, programamos placas ESP32 y NodeMCU para automatización y leemos sensores industriales avanzados.",
        impresion: "En Impresión 3D & Diseño CAD modelamos piezas paramétricas en Fusion 360 y Blender, calibramos impresoras y fabricamos prototipos y prótesis funcionales."
    },
    general: {
        horarios: "Nos reunimos los martes y jueves de 15:30 a 17:30 hrs en el Laboratorio Jola (Sala 102).",
        inscripcion: "Puedes inscribirte fácilmente haciendo clic en el botón 'Inscripción' en el menú superior y rellenando el formulario.",
        costo: "¡La participación en Jola Robotics es 100% gratuita para todos los estudiantes!",
        materiales: "El club provee kits de Arduino, componentes electrónicos, impresoras 3D y placas de desarrollo."
    }
};

// Conversational AI Engine with Web Context & Memory
let conversationHistory = [];

function generateAiContextualResponse(userQuery) {
    const q = userQuery.toLowerCase();
    
    // Remember or analyze what user needs based on query
    let response = "";
    
    if (q.includes('movil') || q.includes('carro') || q.includes('vehiculo') || q.includes('slam') || q.includes('sumo')) {
        response = `Basado en lo que me preguntas sobre Robótica Móvil: ${websiteMemory.departments.movil} ¿Te gustaría inscribirte en este departamento?`;
    } else if (q.includes('ia') || q.includes('vision') || q.includes('opencv') || q.includes('camara') || q.includes('reconocer')) {
        response = `Sobre IA y Visión Artificial: ${websiteMemory.departments.ia} Es una excelente opción si te gusta la programación avanzada.`;
    } else if (q.includes('iot') || q.includes('sensor') || q.includes('wifi') || q.includes('esp32') || q.includes('nube')) {
        response = `Respecto a IoT & Sensores: ${websiteMemory.departments.iot} Perfecto si te interesa la domótica y dispositivos conectados.`;
    } else if (q.includes('3d') || q.includes('impresion') || q.includes('diseno') || q.includes('fusion') || q.includes('piezas')) {
        response = `Sobre Impresión 3D y Diseño CAD: ${websiteMemory.departments.impresion} Ideal para quienes disfrutan materializar sus ideas físicas.`;
    } else if (q.includes('horario') || q.includes('cuando') || q.includes('hora') || q.includes('dias')) {
        response = websiteMemory.general.horarios;
    } else if (q.includes('inscribir') || q.includes('unir') || q.includes('formulario') || q.includes('participar')) {
        response = `${websiteMemory.general.inscripcion} Ve a la sección de Inscripción para enviar tus datos.`;
    } else if (q.includes('costo') || q.includes('precio') || q.includes('pagar') || q.includes('gratis')) {
        response = websiteMemory.general.costo;
    } else if (q.includes('material') || q.includes('equipo') || q.includes('arduino') || q.includes('comprar')) {
        response = websiteMemory.general.materiales;
    } else if (q.includes('hola') || q.includes('saludos') || q.includes('hey')) {
        response = "¡Hola! Estoy aquí analizando la web contigo. Dime, ¿estás buscando un proyecto en específico, o te ayudo a elegir cuál de nuestros 4 departamentos se adapta mejor a lo que necesitas?";
    } else {
        response = `Entiendo tu interés en "${userQuery}". Como IA con memoria de Jola Robotics, te sugiero revisar nuestras secciones de Robótica Móvil, IA, IoT o Impresión 3D para ver cuál cubre mejor tus necesidades, o puedes preguntarme directamente sobre nuestros horarios y requisitos de inscripción.`;
    }

    return response;
}

function handleAiMessage() {
    const text = aiChatInput.value.trim();
    if (!text) return;

    // Push user message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-msg user';
    userMsg.textContent = text;
    aiChatMessages.appendChild(userMsg);
    aiChatInput.value = '';
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

    // Push thinking indicator
    const botMsg = document.createElement('div');
    botMsg.className = 'ai-msg bot';
    botMsg.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Jola AI analizando web...';
    aiChatMessages.appendChild(botMsg);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

    // Generate response using web memory
    setTimeout(() => {
        botMsg.textContent = generateAiContextualResponse(text);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }, 700);
}

if (aiChatSend && aiChatInput) {
    aiChatSend.addEventListener('click', handleAiMessage);
    aiChatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAiMessage();
        }
    });
}

// Contact Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Inscripción Enviada con Éxito!';
        submitBtn.style.background = 'var(--accent-yellow)';
        submitBtn.style.color = '#2d2335';
        
        setTimeout(() => {
            alert('¡Gracias por unirte a Jola Robotics! Nos pondremos en contacto contigo muy pronto.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
        }, 1200);
    });
}

// ==========================================
// INTERACTIVE QUIZ LOGIC
// ==========================================
const quizQuestions = [
    {
        question: "¿Qué sensor o sistema se utiliza principalmente en Robótica Móvil para que un robot autónomo construya un mapa de su entorno en tiempo real?",
        options: [
            "A) Sensor de temperatura DHT11",
            "B) LiDAR y algoritmos SLAM",
            "C) Un potenciómetro rotativo analógico",
            "D) Una celda de carga de peso"
        ],
        correct: 1
    },
    {
        question: "¿Cuál es la función principal de un controlador PID en los motores de un robot móvil?",
        options: [
            "A) Conectar el robot a redes Wi-Fi públicas",
            "B) Mantener y regular con precisión la velocidad y trayectoria",
            "C) Imprimir piezas plásticas en 3D",
            "D) Cargar la batería de manera inalámbrica"
        ],
        correct: 1
    },
    {
        question: "En el campo de la Inteligencia Artificial y Visión Artificial para robots, ¿qué librería de código abierto se utiliza frecuentemente para procesar imágenes por cámara?",
        options: [
            "A) OpenCV",
            "B) Microsoft Excel",
            "C) Adobe Photoshop",
            "D) Audacity"
        ],
        correct: 0
    },
    {
        question: "¿Qué protocolo de comunicación ligero es el estándar de la industria para conectar dispositivos IoT con la nube y enviar telemetría?",
        options: [
            "A) HTTP Streaming pesado",
            "B) MQTT (Message Queuing Telemetry Transport)",
            "C) Bluetooth Classic de audio",
            "D) USB Serial directo"
        ],
        correct: 1
    },
    {
        question: "En Impresión 3D y Fabricación Digital, ¿cómo se denominan los modelos virtuales creados para definir las dimensiones exactas de una pieza mecánica?",
        options: [
            "A) Archivos de audio MP3",
            "B) Modelos CAD paramétricos (como Fusion 360)",
            "C) Hojas de cálculo CSV",
            "D) Documentos de texto plano TXT"
        ],
        correct: 1
    }
];

let currentQuizIndex = 0;
let userQuizScore = 0;
let selectedOptionIndex = null;
let isAnswerSubmitted = false;

const startQuizBtn = document.getElementById('startQuizBtn');
const restartQuizBtn = document.getElementById('restartQuizBtn');
const quizStartScreen = document.getElementById('quiz-start-screen');
const quizQuestionScreen = document.getElementById('quiz-question-screen');
const quizResultScreen = document.getElementById('quiz-result-screen');
const quizProgressText = document.getElementById('quiz-progress-text');
const quizScoreTracker = document.getElementById('quiz-score-tracker');
const quizQuestionTitle = document.getElementById('quiz-question-title');
const quizOptionsContainer = document.getElementById('quiz-options-container');
const quizNextBtn = document.getElementById('quiz-next-btn');
const quizFinalScoreText = document.getElementById('quiz-final-score-text');
const quizFeedbackMessage = document.getElementById('quiz-feedback-message');

function startQuiz() {
    currentQuizIndex = 0;
    userQuizScore = 0;
    selectedOptionIndex = null;
    isAnswerSubmitted = false;

    quizStartScreen.style.display = 'none';
    quizResultScreen.style.display = 'none';
    quizQuestionScreen.style.display = 'block';

    loadQuizQuestion();
}

function loadQuizQuestion() {
    selectedOptionIndex = null;
    isAnswerSubmitted = false;
    quizNextBtn.disabled = true;
    quizNextBtn.style.opacity = '0.5';
    quizNextBtn.style.cursor = 'not-allowed';
    quizNextBtn.innerHTML = 'Siguiente Pregunta <i class="fas fa-arrow-right"></i>';

    const currentQ = quizQuestions[currentQuizIndex];
    quizProgressText.textContent = `Pregunta ${currentQuizIndex + 1} de ${quizQuestions.length}`;
    quizScoreTracker.textContent = `Puntuación: ${userQuizScore}`;
    quizQuestionTitle.textContent = currentQ.question;

    quizOptionsContainer.innerHTML = '';
    currentQ.options.forEach((optText, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.textContent = optText;
        btn.addEventListener('click', () => selectQuizOption(index, btn));
        quizOptionsContainer.appendChild(btn);
    });
}

function selectQuizOption(index, clickedBtn) {
    if (isAnswerSubmitted) return;

    // Remove selected class from all options
    const allBtns = quizOptionsContainer.querySelectorAll('.quiz-option-btn');
    allBtns.forEach(b => b.classList.remove('selected'));

    // Select current
    clickedBtn.classList.add('selected');
    selectedOptionIndex = index;

    // Enable next button
    quizNextBtn.disabled = false;
    quizNextBtn.style.opacity = '1';
    quizNextBtn.style.cursor = 'pointer';
}

function handleNextQuizAction() {
    if (selectedOptionIndex === null) return;

    if (!isAnswerSubmitted) {
        // Lock and evaluate answer
        isAnswerSubmitted = true;
        const currentQ = quizQuestions[currentQuizIndex];
        const allBtns = quizOptionsContainer.querySelectorAll('.quiz-option-btn');

        if (selectedOptionIndex === currentQ.correct) {
            userQuizScore++;
            allBtns[selectedOptionIndex].classList.add('correct');
        } else {
            allBtns[selectedOptionIndex].classList.add('incorrect');
            allBtns[currentQ.correct].classList.add('correct');
        }

        quizScoreTracker.textContent = `Puntuación: ${userQuizScore}`;

        // Change button text to indicate next step
        if (currentQuizIndex === quizQuestions.length - 1) {
            quizNextBtn.innerHTML = 'Ver Resultado Final <i class="fas fa-trophy"></i>';
        } else {
            quizNextBtn.innerHTML = 'Siguiente Pregunta <i class="fas fa-arrow-right"></i>';
        }
    } else {
        // Move to next question or show results
        currentQuizIndex++;
        if (currentQuizIndex < quizQuestions.length) {
            loadQuizQuestion();
        } else {
            showQuizResults();
        }
    }
}

function showQuizResults() {
    quizQuestionScreen.style.display = 'none';
    quizResultScreen.style.display = 'block';

    quizFinalScoreText.textContent = `Tu puntuación final es: ${userQuizScore} de ${quizQuestions.length}`;

    let feedback = "";
    const percentage = (userQuizScore / quizQuestions.length) * 100;
    if (percentage === 100) {
        feedback = "¡Perfecto! 🌟 Tienes un dominio absoluto de la robótica, IA e IoT. ¡Eres un verdadero experto!";
    } else if (percentage >= 80) {
        feedback = "¡Excelente trabajo! 👏 Tienes un conocimiento muy sólido y estás listo para construir proyectos increíbles.";
    } else if (percentage >= 60) {
        feedback = "¡Muy bien! 👍 Tienes buenas bases, te invitamos a explorar nuestros departamentos para profundizar más.";
    } else {
        feedback = "¡Buen intento! 💪 La robótica es un camino de aprendizaje constante. ¡Te esperamos en el club para aprender juntos!";
    }
    quizFeedbackMessage.textContent = feedback;
}

if (startQuizBtn) startQuizBtn.addEventListener('click', startQuiz);
if (restartQuizBtn) restartQuizBtn.addEventListener('click', startQuiz);
if (quizNextBtn) quizNextBtn.addEventListener('click', handleNextQuizAction);

// ==========================================
// 3 EN RAYA (TIC TAC TOE) ROBUSTO
// ==========================================
const tttCells = document.querySelectorAll('.ttt-cell');
const tttStatus = document.getElementById('ttt-status');
const tttResetBtn = document.getElementById('ttt-reset');
const tttModeAiBtn = document.getElementById('ttt-mode-ai');
const tttMode2pBtn = document.getElementById('ttt-mode-2p');
const tttDiffContainer = document.getElementById('ttt-difficulty-container');
const tttDiffBtns = document.querySelectorAll('.ttt-diff-btn');

let tttBoard = ['', '', '', '', '', '', '', '', ''];
let tttIsGameActive = true;
let tttCurrentPlayer = 'X'; // 'X' o 'O'
let tttGameMode = 'ai'; // 'ai' o '2p'
let tttAiDifficulty = 'easy'; // 'easy', 'medium', 'hard'

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleTttCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (tttBoard[index] !== '' || !tttIsGameActive) return;

    if (tttGameMode === 'ai' && tttCurrentPlayer !== 'X') return;

    // Ejecutar movimiento
    tttExecuteMove(index, tttCurrentPlayer);

    if (checkWin(tttBoard, tttCurrentPlayer)) {
        if (tttGameMode === 'ai') {
            tttStatus.textContent = tttCurrentPlayer === 'X' ? '¡Felicidades! Has ganado a la IA 🎉' : '¡Jola AI ha ganado! 🤖';
        } else {
            tttStatus.textContent = `¡Jugador ${tttCurrentPlayer === 'X' ? '1 (X)' : '2 (O)'} ha ganado! 🏆`;
        }
        tttIsGameActive = false;
        return;
    }

    if (tttBoard.every(val => val !== '')) {
        tttStatus.textContent = '¡Empate técnico! 🤝';
        tttIsGameActive = false;
        return;
    }

    // Cambiar turno
    if (tttGameMode === '2p') {
        tttCurrentPlayer = tttCurrentPlayer === 'X' ? 'O' : 'X';
        tttStatus.textContent = `Turno del Jugador ${tttCurrentPlayer === 'X' ? '1 (X)' : '2 (O)'}`;
    } else {
        tttCurrentPlayer = 'O';
        tttStatus.textContent = 'Jola AI pensando... 🤖';
        setTimeout(aiPlayTurn, 500);
    }
}

function tttExecuteMove(index, player) {
    tttBoard[index] = player;
    const cell = document.querySelector(`.ttt-cell[data-index="${index}"]`);
    if (cell) {
        cell.textContent = player;
        cell.style.color = player === 'X' ? 'var(--accent-pink)' : 'var(--accent-yellow)';
        cell.style.background = 'var(--accent-light)';
    }
}

function aiPlayTurn() {
    if (!tttIsGameActive) return;

    let move = null;
    const empty = tttBoard.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);

    if (empty.length === 0) return;

    if (tttAiDifficulty === 'easy') {
        move = empty[Math.floor(Math.random() * empty.length)];
    } else if (tttAiDifficulty === 'medium') {
        move = findWinningMove('O');
        if (move === null) move = findWinningMove('X');
        if (move === null) move = empty[Math.floor(Math.random() * empty.length)];
    } else {
        move = getBestMinimaxMove();
    }

    if (move !== null && tttBoard[move] === '') {
        tttExecuteMove(move, 'O');

        if (checkWin(tttBoard, 'O')) {
            tttStatus.textContent = '¡Jola AI ha ganado! 🤖🏆';
            tttIsGameActive = false;
            return;
        }

        if (tttBoard.every(val => val !== '')) {
            tttStatus.textContent = '¡Empate técnico! 🤝';
            tttIsGameActive = false;
            return;
        }
    }

    tttCurrentPlayer = 'X';
    tttStatus.textContent = 'Tu turno (X). ¡Mueve ficha!';
}

function findWinningMove(player) {
    for (let cond of winningConditions) {
        const [a, b, c] = cond;
        const vals = [tttBoard[a], tttBoard[b], tttBoard[c]];
        if (vals.filter(v => v === player).length === 2 && vals.includes('')) {
            if (tttBoard[a] === '') return a;
            if (tttBoard[b] === '') return b;
            if (tttBoard[c] === '') return c;
        }
    }
    return null;
}

function getBestMinimaxMove() {
    let bestScore = -Infinity;
    let move = null;
    for (let i = 0; i < 9; i++) {
        if (tttBoard[i] === '') {
            tttBoard[i] = 'O';
            let score = minimax(tttBoard, 0, false);
            tttBoard[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing) {
    if (checkWin(board, 'O')) return 10 - depth;
    if (checkWin(board, 'X')) return depth - 10;
    if (board.every(v => v !== '')) return 0;

    if (isMaximizing) {
        let maxScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                maxScore = Math.max(score, maxScore);
            }
        }
        return maxScore;
    } else {
        let minScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                minScore = Math.min(score, minScore);
            }
        }
        return minScore;
    }
}

function checkWin(board, player) {
    return winningConditions.some(cond => {
        return cond.every(idx => board[idx] === player);
    });
}

function resetTttGame() {
    tttBoard = ['', '', '', '', '', '', '', '', ''];
    tttIsGameActive = true;
    tttCurrentPlayer = 'X';
    if (tttGameMode === 'ai') {
        tttStatus.textContent = 'Tu turno (X). ¡Juega contra Jola AI!';
    } else {
        tttStatus.textContent = 'Turno del Jugador 1 (X)';
    }
    tttCells.forEach(cell => {
        cell.textContent = '';
        cell.style.background = 'var(--bg-secondary)';
    });
}

// Event Listeners
if (tttCells.length > 0) {
    tttCells.forEach(cell => {
        cell.removeEventListener('click', handleTttCellClick);
        cell.addEventListener('click', handleTttCellClick);
    });
}

if (tttResetBtn) {
    tttResetBtn.onclick = resetTttGame;
}

if (tttModeAiBtn && tttMode2pBtn) {
    tttModeAiBtn.onclick = () => {
        tttGameMode = 'ai';
        tttModeAiBtn.className = 'btn btn-primary';
        tttMode2pBtn.className = 'btn btn-secondary';
        tttDiffContainer.style.display = 'flex';
        resetTttGame();
    };

    tttMode2pBtn.onclick = () => {
        tttGameMode = '2p';
        tttMode2pBtn.className = 'btn btn-primary';
        tttModeAiBtn.className = 'btn btn-secondary';
        tttDiffContainer.style.display = 'none';
        resetTttGame();
    };
}

if (tttDiffBtns.length > 0) {
    tttDiffBtns.forEach(btn => {
        btn.onclick = () => {
            tttDiffBtns.forEach(b => b.className = 'ttt-diff-btn btn btn-secondary');
            btn.className = 'ttt-diff-btn btn btn-primary';
            tttAiDifficulty = btn.getAttribute('data-diff');
            resetTttGame();
        };
    });
}
