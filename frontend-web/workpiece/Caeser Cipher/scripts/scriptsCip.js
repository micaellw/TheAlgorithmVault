let historyLog = JSON.parse(localStorage.getItem('security_history')) || [];


function processCaesar(mode) {
    const inputId = mode === 'encrypt' ? 'encrypt-input' : 'decrypt-input';
    const shiftId = mode === 'encrypt' ? 'encrypt-shift' : 'decrypt-shift';
    const resultId = mode === 'encrypt' ? 'encrypt-result' : 'decrypt-result';

    

    const text = document.getElementById(inputId).value;

    let shift = parseInt(document.getElementById(shiftId).value);
    if (isNaN(shift)) shift = 0;

    shift = ((shift % 26) + 26) % 26;

    if (!text || !text.replace(/[^a-z]/g, '')) return;

    let actualShift = mode === 'encrypt' ? shift : (26 - (shift % 26)) % 26;

    const result = text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const base = (code >= 65 && code <= 90) ? 65 : 97;
            return String.fromCharCode(((code - base + actualShift) % 26 + 26) % 26 + base);
        }
        return char;
    }).join('');

    document.getElementById(resultId).innerText = result;
    updateLogic(mode === 'encrypt' ? 'Encryption' : 'Decryption', `Shift: ${shift}<br>Calculation: (char - base + shift) % 26<br>Result: ${result}`);
    saveLog(mode.toUpperCase(), `In: ${text} -> Out: ${result}`);
}

function checkAnagram() {
    const s1 = document.getElementById('anagram-1').value.toLowerCase().replace(/[^a-z]/g, '');
    const s2 = document.getElementById('anagram-2').value.toLowerCase().replace(/[^a-z]/g, '');

    if(!s1 || !s2) return

    const sorted1 = s1.split('').sort().join('');
    const sorted2 = s2.split('').sort().join('');
    const isMatch = (s1.length > 0) && (sorted1 === sorted2);

    const resultText = isMatch ? "✅ Match!" : "❌ No Match";
    document.getElementById('anagram-result').innerText = resultText;
    updateLogic('Anagram', `S1 Sorted: ${sorted1}<br>S2 Sorted: ${sorted2}`);
    saveLog('Anagram', `${s1} vs ${s2} -> ${isMatch}`);
}

function updateLogic(type, details) {
    document.getElementById('logic-viewer').innerHTML = `<b>Type:</b> ${type}<br>${details}`;
}

function saveLog(type, msg) {
    const log = { type, msg, time: new Date().toLocaleTimeString() };
    historyLog.unshift(log);
    if (historyLog.length > 10) historyLog.pop();
    localStorage.setItem('security_history', JSON.stringify(historyLog));
    renderHistory();
}

function renderHistory() {
    const list = document.getElementById('history-list');
    list.innerHTML = '';

    historyLog.forEach(i => {
        const li = document.createElement('li');
        li.className = 'history-item';

        li.textContent = `[${i.time}] ${i.type}: ${i.msg}`;
        list.appendChild(li);
    });
}

document.getElementById('clear-history').onclick = () => {
    historyLog = [];
    localStorage.removeItem('security_history');
    renderHistory();
};

renderHistory();