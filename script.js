const PASSWORD = "1907";

const lockScreen = document.getElementById("lockScreen");
const messageScreen = document.getElementById("messageScreen");
const display = document.getElementById("display");
const safeCard = document.getElementById("safeCard");
const error = document.getElementById("error");
const clearBtn = document.getElementById("clearBtn");
const enterBtn = document.getElementById("enterBtn");
const backBtn = document.getElementById("backBtn");

let enteredCode = "";

function updateDisplay() {
  display.textContent = enteredCode.length
    ? "•".repeat(enteredCode.length)
    : "••••";
}

function addNumber(number) {
  if (enteredCode.length >= 4) return;
  enteredCode += number;
  error.textContent = "";
  updateDisplay();
}

function clearCode() {
  enteredCode = enteredCode.slice(0, -1);
  error.textContent = "";
  updateDisplay();
}

function createUnlockHearts() {
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");
      heart.className = "unlock-heart";
      heart.textContent = i % 3 === 0 ? "♡" : "♥";
      heart.style.setProperty("--x", `${Math.random() * 360 - 180}px`);
      heart.style.setProperty("--y", `${Math.random() * 360 - 180}px`);
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1500);
    }, i * 45);
  }
}

function checkCode() {
  if (enteredCode === PASSWORD) {
    error.textContent = "";
    safeCard.classList.add("unlocking");
    createUnlockHearts();
    setTimeout(() => {
      lockScreen.classList.remove("active");
      messageScreen.classList.add("active");
      safeCard.classList.remove("unlocking");
      enteredCode = "";
      updateDisplay();
    }, 850);
  } else {
    error.textContent = "الرقم مش صحيح... حاولي تاني ❤️";
    display.classList.remove("shake");
    void display.offsetWidth;
    display.classList.add("shake");
    enteredCode = "";
    updateDisplay();
  }
}

document.querySelectorAll(".key[data-number]").forEach(button => {
  button.addEventListener("click", () => addNumber(button.dataset.number));
});

clearBtn.addEventListener("click", clearCode);
enterBtn.addEventListener("click", checkCode);

backBtn.addEventListener("click", () => {
  messageScreen.classList.remove("active");
  lockScreen.classList.add("active");
});

// السماح باستخدام أرقام الكيبورد أيضًا
document.addEventListener("keydown", event => {
  if (/^[0-9]$/.test(event.key)) addNumber(event.key);
  if (event.key === "Backspace") clearCode();
  if (event.key === "Enter") checkCode();
});

// قلوب متطايرة باستمرار
function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = Math.random() > 0.25 ? "♥" : "♡";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (14 + Math.random() * 26) + "px";
  heart.style.animationDuration = (5 + Math.random() * 6) + "s";

  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 12000);
}

setInterval(createHeart, 450);
for (let i = 0; i < 10; i++) {
  setTimeout(createHeart, i * 180);
}

updateDisplay();
