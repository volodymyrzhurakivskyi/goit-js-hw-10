import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Отримуємо значення з форми
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  // Викликаємо функцію створення промісу
  createPromise(delay, state)
    .then((resultDelay) => {
      // Обробка успішного виконання
      iziToast.success({
        message: `✅ Fulfilled promise in ${resultDelay}ms`,
        position: "topRight",
        timeout: 5000,
      });
    })
    .catch((resultDelay) => {
      // Обробка відхилення
      iziToast.error({
        message: `❌ Rejected promise in ${resultDelay}ms`,
        position: "topRight",
        timeout: 5000,
      });
    });

  // Опціонально: очищуємо форму після сабміту
  form.reset();
});

/**
 * Функція створення промісу
 * @param {number} delay - Затримка в мс
 * @param {string} state - Стан ('fulfilled' або 'rejected')
 * @returns {Promise}
 */
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}