// script.js

// Настройки количества видов для каждой модели
const modelData = {
  metal: 8,
  aluminum: 8,
  combo: 5,
  double: 3,
  ml: 4,
  sml: 6,
  triple: 3,
  triplemax: 5,
  sp: 3
};

let galleryImages = [];
let currentIndex = 0;

// Функция генерации галереи
function renderGallery(model) {
  if (!modelData[model]) {
    console.error(`Модель "${model}" не найдена в modelData.`);
    return;
  }

  const count = modelData[model];
  const container = document.getElementById('gallery-container');
  if (!container) {
    console.error('Контейнер для галереи с id="gallery-container" не найден.');
    return;
  }

  container.innerHTML = '';

  for (let i = 1; i <= count; i++) {
    const imgA = `images/${model}-${i}a.jpg`;
    const imgB = `images/${model}-${i}b.jpg`;

    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
      <img src="${imgA}" alt="${model} ${i}">
      <p>Вид ${i}</p>
    `;

    // При клике открывается лайтбокс с двумя фото
    div.onclick = () => openGallery([imgA, imgB]);
    container.appendChild(div);
  }
}

// Открытие лайтбокса
function openGallery(images) {
  galleryImages = images;
  currentIndex = 0;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (!lightbox || !lightboxImg) {
    console.error('Лайтбокс элементы не найдены.');
    return;
  }

  lightbox.style.display = 'flex';
  lightboxImg.src = galleryImages[currentIndex];
}

// Закрытие лайтбокса
function closeGallery() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.style.display = 'none';
}

// Следующее фото
function nextImage(event) {
  event.stopPropagation();
  currentIndex = (currentIndex + 1) % galleryImages.length;
  document.getElementById('lightbox-img').src = galleryImages[currentIndex];
}

// Предыдущее фото
function prevImage(event) {
  event.stopPropagation();
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById('lightbox-img').src = galleryImages[currentIndex];
}
