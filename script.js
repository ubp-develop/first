const container = document.getElementById("container");
const addMoreBtn = document.getElementById("addMoreBtn");
const batchSize = 2; // Скільки користувачів додавати за раз

// Функція для створення скелетону
function createSkeleton() {
  const skeleton = document.createElement("div");
  skeleton.classList.add("skeleton-card");
  skeleton.innerHTML = `
    <div class="skeleton avatar"></div>
    <div class="skeleton title"></div>
    <div class="skeleton text"></div>
  `;
  return skeleton;
}

// Функція для додавання скелетонів
function addSkeletons(count) {
  const skeletons = [];
  for (let i = 0; i < count; i++) {
    const skeleton = createSkeleton();
    container.appendChild(skeleton);
    skeletons.push(skeleton);
  }
  return skeletons;
}

// Функція для отримання випадкових даних
async function fetchRandomUsers(count) {
  const response = await fetch(`https://randomuser.me/api/?results=${count}`);
  const data = await response.json();
  return data.results;
}

// Функція для заміни конкретних скелетонів на реальні дані
async function replaceSkeletonsWithData(skeletons) {
  const users = await fetchRandomUsers(skeletons.length);

  skeletons.forEach((skeleton, index) => {
    const user = users[index];
    skeleton.innerHTML = `
      <img src="${user.picture.medium}" alt="User" class="avatar">
      <h4>${user.name.first} ${user.name.last}</h4>
      <p>${user.location.country}</p>
    `;
  });
}

// Генеруємо стартові скелетони та завантажуємо дані
const initialSkeletons = addSkeletons(batchSize);
setTimeout(() => replaceSkeletonsWithData(initialSkeletons), 1000);

// Обробник натискання кнопки "Add More"
addMoreBtn.addEventListener("click", () => {
  const newSkeletons = addSkeletons(batchSize);
  setTimeout(() => replaceSkeletonsWithData(newSkeletons), 1000);
});
