(() => {
  const seed = {
    business: {
      name: 'B&M Exclusive',
      city: 'Marbella',
      phone: '+34 952 77 75 68',
      whatsapp: '34952777568',
      address: 'Nueva Andalucía, Marbella, Málaga',
      hours: 'Lun–Sáb · 09:00–20:00',
      instagram: '#',
      facebook: 'https://www.facebook.com/ByMExclusive/?locale=es_ES',
      images: [
        'assets/images/bm-sls-hero.webp',
        'assets/images/bm-ferrari-lifestyle.webp',
        'assets/images/ferrari.webp',
        'assets/images/lamborghini.webp'
      ]
    },
    cars: [
      {
        id: 'mercedes-sls-amg-roadster', brand: 'Mercedes-Benz', model: 'SLS AMG Roadster', year: 2012,
        category: 'Cabrio', seats: 2, power: '571 CV', transmission: 'Automático',
        acceleration: '3,8 s', priceDay: 1250, priceWeekend: 3450, deposit: 9000,
        status: 'available', featured: true, published: true, color: 'Rojo',
        location: 'Marbella · Entrega bajo petición',
        image: 'assets/images/bm-sls-hero.webp', fallbackImage: 'assets/images/hero.webp',
        gallery: ['assets/images/bm-sls-hero.webp', 'assets/images/mercedes.webp'],
        offer: { active: true, label: 'Escapada de 3 días', price: 3350, oldPrice: 3750, expires: '2026-09-30' },
        description: 'Un gran turismo descapotable con una silueta inconfundible, motor atmosférico y presencia de auténtico icono.'
      },
      {
        id: 'ferrari-296-gtb', brand: 'Ferrari', model: '296 GTB', year: 2024,
        category: 'Supercar', seats: 2, power: '830 CV', transmission: 'Automático',
        acceleration: '2,9 s', priceDay: 1750, priceWeekend: 4850, deposit: 12000,
        status: 'available', featured: true, published: true, color: 'Rosso Corsa',
        location: 'Marbella · Costa del Sol',
        image: 'assets/images/ferrari.webp', fallbackImage: 'assets/images/bm-ferrari-lifestyle.webp',
        gallery: ['assets/images/ferrari.webp', 'assets/images/bm-ferrari-lifestyle.webp'],
        offer: { active: true, label: 'Oferta destacada', price: 4450, oldPrice: 5250, expires: '2026-09-15' },
        description: 'Prestaciones de nueva generación con el tacto, el sonido y el carácter que se esperan de Ferrari.'
      },
      {
        id: 'lamborghini-huracan-evo-spyder', brand: 'Lamborghini', model: 'Huracán EVO Spyder', year: 2023,
        category: 'Cabrio', seats: 2, power: '640 CV', transmission: 'Automático',
        acceleration: '3,1 s', priceDay: 1650, priceWeekend: 4550, deposit: 12000,
        status: 'reserved', featured: true, published: true, color: 'Configuración exclusiva',
        location: 'Marbella · Málaga · Sotogrande',
        image: 'assets/images/lamborghini.webp', fallbackImage: 'assets/images/fleet.webp',
        gallery: ['assets/images/lamborghini.webp', 'assets/images/bm-sls-hero.webp'],
        offer: { active: false },
        description: 'Cielo abierto, respuesta inmediata y una presencia que convierte cada desplazamiento en parte del viaje.'
      },
      {
        id: 'porsche-911-turbo-s-cabriolet', brand: 'Porsche', model: '911 Turbo S Cabriolet', year: 2024,
        category: 'Cabrio', seats: 4, power: '650 CV', transmission: 'PDK',
        acceleration: '2,8 s', priceDay: 1150, priceWeekend: 3150, deposit: 9000,
        status: 'available', featured: true, published: true, color: 'Azul',
        location: 'Entrega premium en Andalucía',
        image: 'assets/images/porsche.webp', fallbackImage: 'assets/images/fleet.webp',
        gallery: ['assets/images/porsche.webp', 'assets/images/fleet.webp'],
        offer: { active: true, label: 'Oferta semanal', price: 6250, oldPrice: 7350, expires: '2026-10-01' },
        description: 'Prestaciones de superdeportivo, tracción total y la versatilidad necesaria para recorrer Andalucía con absoluta confianza.'
      },
      {
        id: 'mercedes-amg-g63', brand: 'Mercedes-AMG', model: 'G 63', year: 2024,
        category: 'Luxury SUV', seats: 5, power: '585 CV', transmission: 'Automático',
        acceleration: '4,4 s', priceDay: 950, priceWeekend: 2550, deposit: 7000,
        status: 'available', featured: true, published: true, color: 'Negro Obsidiana',
        location: 'Marbella · Aeropuertos · Villas',
        image: 'assets/images/mercedes.webp', fallbackImage: 'assets/images/fleet.webp',
        gallery: ['assets/images/mercedes.webp', 'assets/images/fleet.webp'],
        offer: { active: false },
        description: 'Presencia, espacio y confort para traslados privados, eventos, villas y estancias premium.'
      },
      {
        id: 'ferrari-portofino-m', brand: 'Ferrari', model: 'Portofino M', year: 2022,
        category: 'Grand Tourer', seats: 4, power: '620 CV', transmission: 'Automático',
        acceleration: '3,45 s', priceDay: 1350, priceWeekend: 3700, deposit: 10000,
        status: 'maintenance', featured: true, published: true, color: 'Rosso Corsa',
        location: 'Marbella · Costa del Sol',
        image: 'assets/images/bm-ferrari-lifestyle.webp', fallbackImage: 'assets/images/ferrari.webp',
        gallery: ['assets/images/bm-ferrari-lifestyle.webp', 'assets/images/ferrari.webp'],
        offer: { active: false },
        description: 'Elegancia italiana, techo retráctil y una configuración pensada para una escapada mediterránea.'
      },
      {
        id: 'range-rover-sv', brand: 'Range Rover', model: 'SV Autobiography', year: 2024,
        category: 'Luxury SUV', seats: 5, power: '615 CV', transmission: 'Automático',
        acceleration: '4,5 s', priceDay: 890, priceWeekend: 2350, deposit: 6000,
        status: 'available', featured: false, published: true, color: 'Carpathian Grey',
        location: 'Entrega nacional bajo reserva',
        image: 'assets/images/fleet.webp', fallbackImage: 'assets/images/mercedes.webp',
        gallery: ['assets/images/fleet.webp', 'assets/images/mercedes.webp'],
        offer: { active: true, label: '7 días · Kilometraje ampliado', price: 4650, oldPrice: 5350, expires: '2026-09-30' },
        description: 'Espacio, discreción y calidad de marcha para clientes que priorizan el máximo confort.'
      }
    ],
    leads: [
      { id: 'L-1048', name: 'Alexander W.', contact: '+44 7700 900111', car: 'Mercedes SLS AMG', dates: '14–17 Ago', source: 'WhatsApp', status: 'hot', value: 3350 },
      { id: 'L-1047', name: 'Sofía M.', contact: 'sofia@example.com', car: 'Mercedes-AMG G 63', dates: '21–25 Ago', source: 'Web', status: 'quoted', value: 3800 },
      { id: 'L-1046', name: 'M. Al-Khalifa', contact: '+971 50 000 0000', car: 'Porsche 911 Turbo S', dates: '2–9 Sep', source: 'Concierge', status: 'confirmed', value: 6250 },
      { id: 'L-1045', name: 'James P.', contact: '+34 600 123 456', car: 'Lamborghini Huracán', dates: '10–12 Ago', source: 'Instagram', status: 'new', value: 3300 }
    ],
    bookings: [
      { id: 'R-289', client: 'M. Al-Khalifa', car: 'Porsche 911 Turbo S', start: '2026-09-02', end: '2026-09-09', status: 'confirmed', total: 6250 },
      { id: 'R-288', client: 'Nicolas B.', car: 'Lamborghini Huracán EVO', start: '2026-08-08', end: '2026-08-11', status: 'active', total: 4550 },
      { id: 'R-287', client: 'Sarah T.', car: 'Mercedes SLS AMG', start: '2026-08-01', end: '2026-08-04', status: 'completed', total: 3350 }
    ]
  };

  const KEY = 'bm-exclusive-demo-v5';
  const clone = value => JSON.parse(JSON.stringify(value));
  const read = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY));
      if (!stored) return clone(seed);
      return {
        ...clone(seed),
        ...stored,
        business: { ...clone(seed.business), ...(stored.business || {}) },
        cars: Array.isArray(stored.cars) ? stored.cars : clone(seed.cars),
        leads: Array.isArray(stored.leads) ? stored.leads : clone(seed.leads),
        bookings: Array.isArray(stored.bookings) ? stored.bookings : clone(seed.bookings)
      };
    } catch {
      return clone(seed);
    }
  };
  const write = data => localStorage.setItem(KEY, JSON.stringify(data));
  const reset = () => {
    localStorage.removeItem(KEY);
    return clone(seed);
  };
  const money = value => new Intl.NumberFormat('es-ES', {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0
  }).format(Number(value) || 0);

  window.BM = { seed, read, write, reset, money };
})();
