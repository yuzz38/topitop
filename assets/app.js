(function () {
  'use strict';
  var menuButton = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  function closeMenu(restoreFocus) {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Открыть меню');
    document.body.classList.remove('menu-open');
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', function () {
    if (!menu.hidden) { closeMenu(); return; }
    menu.hidden = false;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Закрыть меню');
    document.body.classList.add('menu-open');
    menu.querySelector('a').focus();
  });
  menu.addEventListener('click', function (event) { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', function (event) {
    if (menu.hidden) return;
    if (event.key === 'Escape') { closeMenu(true); return; }
    var links = menu.querySelectorAll('a');
    if (event.key === 'Tab' && !event.shiftKey && document.activeElement === links[links.length - 1]) {
      event.preventDefault(); menuButton.focus();
    } else if (event.key === 'Tab' && event.shiftKey && document.activeElement === menuButton) {
      event.preventDefault(); links[links.length - 1].focus();
    }
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 1023 && !menu.hidden) closeMenu(); });

  // Each supplied video retains its original 9:16 shape. Playback is always a visitor action.
  var videos = Array.prototype.slice.call(document.querySelectorAll('video'));
  videos.forEach(function (video) {
    video.addEventListener('play', function () {
      videos.forEach(function (other) { if (other !== video && !other.paused) other.pause(); });
    });
  });
  if ('IntersectionObserver' in window) {
    var videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (!entry.isIntersecting && !entry.target.paused) entry.target.pause(); });
    }, { threshold: 0 });
    videos.forEach(function (video) { videoObserver.observe(video); });
  }

  var products = {
    'doll-mini': { name: 'Кукла «Гардероб мини»: 3 листа одежды', price: 1490, extra: 'clothes' },
    'doll-maxi': { name: 'Кукла «Гардероб макси»: 5 листов одежды', price: 1790, extra: 'clothes' },
    'doll-house': { name: 'Кукла с домиком: 3 листа одежды и домик', price: 2390, extra: 'clothes' },
    'doll-pdf': { name: 'Электронная кукла: 5 листов одежды, PDF', price: 800, digital: true },
    'outfit': { name: 'Лист одежды по идеям и фотографиям', price: 200 },
    'color-a4': { name: 'Раскраска А4: 10 страниц и обложка', price: 790, extra: 'pages' },
    'color-a5': { name: 'Раскраска А5: 10 страниц и обложка', price: 590, extra: 'pages' },
    'color-pdf': { name: 'Раскраска PDF: 10 страниц и обложка', price: 390, digital: true, extra: 'pages' },
    'calendar-a4': { name: 'Фотокалендарь А4', price: 1500 },
    'calendar-a5': { name: 'Фотокалендарь А5', price: 1300 }
  };
  var form = document.getElementById('order-form');
  var productSelect = document.getElementById('product');
  var extras = document.getElementById('extra-count');
  var extraError = document.getElementById('extra-error');
  var wishes = document.getElementById('wishes');
  var output = document.getElementById('request-output');
  var request = document.getElementById('request-text');
  var copyStatus = document.getElementById('copy-status');
  var currency = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
  function state() {
    var product = products[productSelect.value] || products['doll-mini'];
    var raw = Number(extras.value);
    var valid = !product.extra || (extras.value.trim() !== '' && Number.isFinite(raw) && Number.isInteger(raw) && raw >= 0 && raw <= 30);
    var count = product.extra && valid ? raw : 0;
    var unit = product.extra === 'clothes' ? 200 : 50;
    return { product: product, count: count, total: product.price + count * unit, valid: valid };
  }
  function message(s) {
    var text = ['Здравствуйте! Хочу заказать подарок в ТОПИТОП.', '', 'Выбрано: ' + s.product.name + '.'];
    if (s.count) text.push((s.product.extra === 'clothes' ? 'Дополнительные листы одежды: ' : 'Дополнительные страницы раскраски: ') + s.count + '.');
    text.push('Стоимость по выбранным параметрам: ' + currency.format(s.total) + '.');
    text.push(s.product.digital ? 'Формат: электронный файл.' : 'Доставка оплачивается отдельно.');
    if (wishes.value.trim()) text.push('', 'Пожелания: ' + wishes.value.trim());
    text.push('', 'Фотографии прикреплю отдельно. Подскажите, пожалуйста, срок изготовления и дальнейшие шаги.');
    return text.join('\n');
  }
  function refresh() {
    var s = state();
    document.getElementById('extra-field').hidden = !s.product.extra;
    extras.disabled = !s.product.extra;
    document.getElementById('extra-label').textContent = s.product.extra === 'pages' ? 'Дополнительные страницы — 50 ₽/страница' : 'Дополнительные листы одежды — 200 ₽/лист';
    document.getElementById('total-price').textContent = s.valid ? currency.format(s.total) : 'Уточните количество';
    document.getElementById('shipping-note').textContent = s.product.digital ? 'Электронный формат — доставка посылки не требуется.' : 'Доставка оплачивается отдельно.';
    if (!output.hidden && s.valid) { request.value = message(s); copyStatus.textContent = ''; }
  }
  productSelect.addEventListener('change', function () {
    extras.value = '0'; extraError.textContent = ''; extras.removeAttribute('aria-invalid'); refresh();
  });
  extras.addEventListener('input', function () { if (state().valid) { extraError.textContent = ''; extras.removeAttribute('aria-invalid'); } refresh(); });
  wishes.addEventListener('input', refresh);
  document.querySelectorAll('[data-select-product]').forEach(function (button) {
    button.addEventListener('click', function () {
      if (!products[button.dataset.selectProduct]) return;
      productSelect.value = button.dataset.selectProduct;
      extras.value = '0'; extraError.textContent = ''; extras.removeAttribute('aria-invalid'); refresh();
      document.getElementById('order').scrollIntoView({ behavior: 'auto', block: 'start' });
      productSelect.focus({ preventScroll: true });
    });
  });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var s = state();
    if (!s.valid) {
      extraError.textContent = 'Укажите целое количество дополнительных листов от 0 до 30.';
      extras.setAttribute('aria-invalid', 'true'); extras.focus(); return;
    }
    request.value = message(s); output.hidden = false; copyStatus.textContent = '';
    document.getElementById('request-heading').focus({ preventScroll: true });
    output.scrollIntoView({ behavior: 'auto', block: 'start' });
  });
  function manualCopy() {
    request.focus(); request.select(); request.setSelectionRange(0, request.value.length);
    var copied = false;
    try { copied = document.execCommand('copy'); } catch (error) { copied = false; }
    copyStatus.textContent = copied ? 'Заявка скопирована. Откройте Direct и отправьте её вместе с фотографиями.' : 'Текст выделен. Скопируйте его через меню браузера или Ctrl+C / ⌘C.';
  }
  document.getElementById('copy-request').addEventListener('click', function () {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(request.value).then(function () {
        copyStatus.textContent = 'Заявка скопирована. Откройте Direct и отправьте её вместе с фотографиями.';
      }).catch(manualCopy);
    } else manualCopy();
  });
  refresh();

  // Fictional samples, explicitly disclosed on screen. They are not customer evidence or structured reviews.
  var reviews = [
    ['Пример о персональной раскраске', 'Самое интересное — узнавать себя на страницах. Для подарка хочется выбрать фотографии с нашими общими моментами и любимыми героями ребёнка.'],
    ['Пример о кукле по фото', 'Идея собственной куколки очень милая: можно придумать ей наряды, похожие на любимую одежду ребёнка, и каждый раз собирать новый образ.'],
    ['Пример о семейном календаре', 'Для бабушки я бы выбрала календарь с фотографиями внуков. Здесь важен каждый снимок: прогулка, семейный праздник и обычный тёплый день вместе.'],
    ['Пример о сказочном гардеробе', 'Наряды русалки и принцессы — хороший повод придумать целую историю для куколки. Нравится сама возможность собрать гардероб под детскую фантазию.'],
    ['Пример о раскраске с близкими', 'В персональную раскраску хочется добавить всех: маму, папу, друзей и питомца. Тогда знакомые лица становятся частью одной книжки.'],
    ['Пример о подарке на день рождения', 'На день рождения хочется подарить что-то связанное именно с ребёнком: его имя, любимые сюжеты и фотографии, которые мы выбирали вместе.'],
    ['Пример об электронном формате', 'PDF подошёл бы, если хочется самостоятельно распечатать раскраску. Можно выбрать свои фотографии и заранее обсудить, что появится на страницах.'],
    ['Пример о нарядах по фотографии', 'Мне близка идея повторить для куклы любимое платье ребёнка. Маленький знакомый гардероб делает игру ещё более личной.'],
    ['Пример о новогоднем подарке', 'Фотокалендарь для родных — это возможность собрать любимые фотографии за год. Хочется, чтобы каждый новый месяц напоминал о нашей семье.'],
    ['Пример о собственной книжке', 'В своей раскраске интересно не только выбирать цвета, но и рассматривать знакомые детали. Сначала узнаёшь историю по фото, а потом придумываешь ей настроение.']
  ];
  var current = 0;
  var dots = document.getElementById('review-dots');
  reviews.forEach(function (review, index) {
    var button = document.createElement('button'); button.type = 'button';
    button.setAttribute('aria-label', 'Показать демонстрационный отзыв ' + (index + 1));
    button.addEventListener('click', function () { show(index); }); dots.appendChild(button);
  });
  function show(index) {
    current = (index + reviews.length) % reviews.length;
    document.getElementById('review-text').textContent = '«' + reviews[current][1] + '»';
    document.getElementById('review-topic').textContent = reviews[current][0];
    document.getElementById('review-label').textContent = 'Демонстрационный отзыв · текст сгенерирован';
    document.getElementById('review-count').textContent = (current + 1) + ' / ' + reviews.length;
    Array.prototype.forEach.call(dots.children, function (button, i) { button.setAttribute('aria-pressed', String(i === current)); });
  }
  document.querySelector('.review-controls').hidden = false; dots.hidden = false;
  document.getElementById('review-prev').addEventListener('click', function () { show(current - 1); });
  document.getElementById('review-next').addEventListener('click', function () { show(current + 1); });
  var slider = document.getElementById('review-slider');
  slider.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
  });
  var touch = null;
  slider.addEventListener('touchstart', function (event) { if (event.touches.length === 1) touch = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }, { passive: true });
  slider.addEventListener('touchend', function (event) {
    if (!touch || !event.changedTouches.length) return;
    var dx = event.changedTouches[0].clientX - touch.x, dy = event.changedTouches[0].clientY - touch.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) show(current + (dx < 0 ? 1 : -1));
    touch = null;
  }, { passive: true });
  show(0);

  var viewer = document.getElementById('image-viewer');
  var viewerImage = document.getElementById('viewer-image');
  document.querySelectorAll('[data-view-image]').forEach(function (button) {
    button.addEventListener('click', function () {
      var source = button.dataset.viewImage;
      if (typeof viewer.showModal !== 'function') { window.open(source, '_blank', 'noopener'); return; }
      var title = button.dataset.viewTitle || 'Материалы ТОПИТОП';
      document.getElementById('viewer-title').textContent = title;
      viewerImage.src = source; viewerImage.alt = title;
      document.getElementById('viewer-original').href = source;
      viewer.showModal(); document.getElementById('close-viewer').focus();
    });
  });
  document.getElementById('close-viewer').addEventListener('click', function () { viewer.close(); });
  viewer.addEventListener('click', function (event) {
    var rect = viewer.getBoundingClientRect();
    if (event.target === viewer && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) viewer.close();
  });
})();
