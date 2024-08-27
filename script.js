const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const copyBtn = document.getElementById('copy-btn');
const outputContent = document.getElementById('output-content');
const charCount = document.querySelector('.char-count');

const encryptionRules = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

function updateCharCount() {
    const count = inputText.value.length;
    charCount.textContent = `${count} / 500`;
}

function sanitizeInput(text) {
    // Convertir a minúsculas y eliminar acentos y caracteres especiales
    return text.toLowerCase()
               .replace(/[áàäâ]/g, 'a')
               .replace(/[éèëê]/g, 'e')
               .replace(/[íìïî]/g, 'i')
               .replace(/[óòöô]/g, 'o')
               .replace(/[úùüû]/g, 'u')
               .replace(/[^a-z\s]/g, '');
}

function encrypt(text) {
    return text.replace(/[aeiou]/g, letter => encryptionRules[letter]);
}

function decrypt(text) {
    let decrypted = text;
    for (let [key, value] of Object.entries(encryptionRules)) {
        decrypted = decrypted.replace(new RegExp(value, 'g'), key);
    }
    return decrypted;
}

function showOutput(text) {
    outputText.value = text;
    outputText.style.display = 'block';
    outputContent.style.display = 'none';
    copyBtn.style.display = 'block';
}

encryptBtn.addEventListener('click', () => {
    const text = sanitizeInput(inputText.value);
    showOutput(encrypt(text));
});

decryptBtn.addEventListener('click', () => {
    const text = sanitizeInput(inputText.value);
    showOutput(decrypt(text));
});

copyBtn.addEventListener('click', () => {
    outputText.select();
    document.execCommand('copy');
    // Alternativa moderna para copiar al portapapeles
    // navigator.clipboard.writeText(outputText.value);
});

inputText.addEventListener('input', updateCharCount);

// Prevenir la entrada de caracteres no permitidos
inputText.addEventListener('keypress', (event) => {
    const char = String.fromCharCode(event.keyCode);
    if (!/[a-z\s]/.test(char)) {
        event.preventDefault();
    }
});