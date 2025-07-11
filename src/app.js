import visa from "./assets/logos/visa.png";
import mastercard from "./assets/logos/mastercard.png";
import amex from "./assets/logos/amex.png";
import discover from "./assets/logos/discover.png";
import jcb from "./assets/logos/jcb.png";
import diners from "./assets/logos/diners.png";
import mir from "./assets/logos/mir.png";

import { getCardSystem, isValidLuhn } from "./cardChecker";

const cardSystems = {
  visa,
  mastercard,
  amex,
  discover,
  jcb,
  diners,
  mir,
};

export function setupCardWidget(container) {
  container.style.fontFamily = "Arial, sans-serif";
  container.style.maxWidth = "600px";
  container.style.margin = "30px auto";

  const iconsContainer = document.createElement("div");
  iconsContainer.style.display = "flex";
  iconsContainer.style.gap = "10px";
  iconsContainer.style.marginBottom = "10px";

  // Создаём лого и сохраняем ссылки
  const logoElements = {};

  for (const [system, logoSrc] of Object.entries(cardSystems)) {
    const img = document.createElement("img");
    img.src = logoSrc;
    img.dataset.system = system;
    img.style.width = "50px";
    img.style.height = "32px";
    img.style.opacity = "1";
    // img.style.transition = "opacity 0.3s ease";
    logoElements[system] = img;
    iconsContainer.appendChild(img);
  }

  const form = document.createElement("div");
  form.style.display = "flex";
  form.style.gap = "10px";
  form.style.alignItems = "center";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Credit card number";
  input.style.padding = "10px";
  input.style.borderRadius = "6px";
  input.style.border = "1px solid #ccc";
  input.style.width = "100%";
  input.style.maxWidth = "260px";

  const button = document.createElement("button");
  button.textContent = "Click to Validate";
  button.style.padding = "10px 20px";
  button.style.backgroundColor = "green";
  button.style.color = "white";
  button.style.border = "none";
  button.style.borderRadius = "6px";
  button.style.cursor = "pointer";

  const checkResult = document.createElement("div");
  checkResult.style.marginTop = "10px";
  checkResult.style.fontWeight = "bold";

  // 🔍 Подсветка логотипа
  input.addEventListener("input", () => {
    const number = input.value.trim();
    const system = getCardSystem(number);

    for (const [name, img] of Object.entries(logoElements)) {
      img.style.opacity = name === system ? "1" : "0.2";
    }
  });

  button.addEventListener("click", () => {
    const value = input.value.trim();
    if (isValidLuhn(value)) {
      checkResult.textContent = `Valid card: ${getCardSystem(value)}`;
      checkResult.style.color = "green";
    } else {
      checkResult.textContent = "Invalid card";
      checkResult.style.color = "red";
    }
  });

  form.appendChild(input);
  form.appendChild(button);

  container.appendChild(iconsContainer);
  container.appendChild(form);
  container.appendChild(checkResult);
}
