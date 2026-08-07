(() => {
  const allCars = BM.read().cars.filter(car => car.published);
  const catalog = document.querySelector('#catalog');
  const count = document.querySelector('#count');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  let activeFilter = 'all';

  const render = () => {
    const cars = allCars.filter(car => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'offer') return Boolean(car.offer?.active);
      return car.category === activeFilter;
    });
    count.textContent = `${cars.length} ${cars.length === 1 ? 'vehículo' : 'vehículos'}`;
    catalog.innerHTML = cars.length
      ? cars.map((car, index) => BMUI.vehicleCard(car, index)).join('')
      : '<div class="catalog-empty">No hay vehículos publicados en esta categoría.</div>';

    catalog.querySelectorAll('img[data-fallback]').forEach(img => {
      img.addEventListener('error', () => { img.src = img.dataset.fallback; }, { once: true });
    });
    catalog.querySelectorAll('.reveal').forEach(element => requestAnimationFrame(() => element.classList.add('is-visible')));
  };

  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    render();
  }));

  render();
})();
