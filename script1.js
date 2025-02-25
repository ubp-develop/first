// setTimeout(() => {
//   document.getElementById("container").innerHTML = `
//     <div class="card">
//       <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="avatar">
//       <h4>Ім'я Користувача</h4>
//       <p>Короткий опис профілю</p>
//     </div>
//   `;
// }, 2000);
// Симуляція затримки завантаження

//-----------============================

const container = document.getElementById("container");
const userCount = 15; // Кількість скелетонів

// Функція для створення скелетону
function createSkeleton() {
  return `
    <div class="skeleton-card">
      <div class="skeleton avatar"></div>
      <div class="skeleton title"></div>
      <div class="skeleton text"></div>
    </div>
  `;
}

// Додаємо скелетони в контейнер
container.innerHTML = Array(userCount).fill(null).map(createSkeleton).join("");

// Функція для отримання випадкових даних
async function fetchRandomUsers(count) {
  const response = await fetch(`https://randomuser.me/api/?results=${count}`);
  const data = await response.json();
  return data.results;
}

// Завантаження випадкових даних і заміна скелетонів
setTimeout(async () => {
  const users = await fetchRandomUsers(userCount);
  container.innerHTML = users
    .map(
      (user) => `
    <div class="skeleton-card">
      <img src="${user.picture.medium}" alt="User" class="avatar">
      <h4>${user.name.first} ${user.name.last}</h4>
      <p>${user.location.country}</p>
    </div>
  `
    )
    .join("");
}, 2000); // Симуляція затримки завантаження
