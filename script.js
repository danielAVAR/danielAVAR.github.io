(function () {
  'use strict';

  document.documentElement.classList.add('js');

  // 1. Navigation data: scene order, copy, palettes, and portfolio index labels.
  var scenes = [
    {
      id: 'welcome',
      palette: ['#173d32', '#173d32', '#173d32', '#173d32', '#173d32', '#173d32', '#173d32'],
      title: 'BIENVENIDO',
      index: '',
      content: '<div class="welcome-copy"><h1>BIENVENIDO</h1></div>'
    },
    {
      id: 'home', label: 'TÍTULO PRINCIPAL',
      palette: ['#b8f36a', '#d8efa8', '#a6d8b8', '#75c8bc', '#4d9e98', '#326a69', '#203c39'],
      content: '<div class="home-copy"><p class="eyebrow">DESARROLLADOR DE SOFTWARE · GUATEMALA</p><h2>Daniel Aguilar <span>Rodríguez</span></h2><p>Construyo productos digitales con backend sólido, APIs claras y atención al detalle.</p><div class="inline-links"><a href="mailto:danielaguilar5502@gmail.com">Hablemos ↗</a><a href="https://github.com/danielAVAR" target="_blank" rel="noreferrer">GitHub ↗</a></div></div>'
    },
    {
      id: 'profile', label: 'PERFIL',
      palette: ['#a8d5bd', '#d0e5c0', '#91c6a3', '#69ad91', '#478b7e', '#316d65', '#204e49'],
      content: '<div class="profile-copy"><p class="eyebrow">QUIÉN SOY</p><h3>Tecnología con intención.</h3><p class="lead">Soy desarrollador de software y creador. Me interesa construir experiencias digitales claras, útiles y hechas para las personas.</p><p>Tengo experiencia en desarrollo backend y frontend, integración de APIs REST y gestión de bases de datos. Disfruto conectar tecnología, diseño y storytelling para transformar ideas en productos funcionales e intuitivos. También me apasionan el arte, el dibujo y aprender junto a otras personas.</p><div class="stats"><span><b>20+</b> proyectos de diseño</span><span><b>1,800</b> horas de formación</span><span><b>4.9/5</b> promedio freelance</span></div><div class="tags"><span>JavaScript</span><span>Node.js</span><span>React Native</span><span>MySQL</span><span>PostgreSQL</span><span>REST API</span><span>Docker</span><span>Firebase</span><span>Git</span></div></div>'
    },
    {
      id: 'experience', label: 'EXPERIENCIA',
      palette: ['#ffbd8b', '#ffd6ad', '#f0a27d', '#dc796d', '#b6535e', '#783f58', '#432e49'],
      content: '<div class="experience-copy"><p class="eyebrow">TRAYECTORIA</p><h3>Experiencia seleccionada.</h3><article class="experience-item"><p class="meta">2026 — ACTUALIDAD · SOFTPLUS GT</p><h4>Desarrollador Back-end · OMS</h4><p>Implementación backend a la medida, normalización de base de datos, validaciones y manejo centralizado de errores. Node.js, Redis, WebSockets, Docker, pruebas y documentación de APIs.</p><div class="tags"><span>Node.js</span><span>Redis</span><span>WebSocket</span><span>Docker</span></div></article><article class="experience-item"><p class="meta">2025 · FREELANCE</p><h4>Diseñador gráfico independiente</h4><p>Más de 20 proyectos para clientes, coordinando comunicación, plazos y entregas. Calificación promedio de 4.9 estrellas.</p></article></div>'
    },
    {
      id: 'projects', label: 'PROYECTOS',
      palette: ['#93baff', '#b6d4ff', '#9cafea', '#818bd1', '#695da8', '#494879', '#303253'],
      content: '<div class="projects-copy"><p class="eyebrow">PROYECTOS</p><h3>Proyectos.</h3><p class="section-intro">Una selección de proyectos. Explora el código y los detalles en GitHub.</p><div class="project-list"><a class="project-card" href="https://github.com/danielAVAR" target="_blank" rel="noreferrer"><span class="meta">BACKEND · NODE.JS</span><strong>OMS</strong><span>Backend a la medida, base de datos normalizada y APIs.</span><b>Ver en GitHub ↗</b></a><a class="project-card" href="https://github.com/danielAVAR" target="_blank" rel="noreferrer"><span class="meta">CLI · NODE.JS · MYSQL</span><strong>PeakFit</strong><span>Herramienta modular para gestión de gimnasios.</span><b>Ver en GitHub ↗</b></a><a class="project-card" href="https://github.com/danielAVAR" target="_blank" rel="noreferrer"><span class="meta">APLICACIÓN WEB</span><strong>Campus Parking</strong><span>Proyecto para la gestión de estacionamiento en campus.</span><b>Ver en GitHub ↗</b></a><a class="project-card" href="https://github.com/danielAVAR" target="_blank" rel="noreferrer"><span class="meta">APLICACIÓN WEB</span><strong>Campus Shop</strong><span>Plataforma de tienda para la comunidad del campus.</span><b>Ver en GitHub ↗</b></a><a class="project-card" href="https://github.com/danielAVAR" target="_blank" rel="noreferrer"><span class="meta">FRONTEND</span><strong>CMDB Front End</strong><span>Interfaz para consultar y administrar elementos de configuración.</span><b>Ver en GitHub ↗</b></a><a class="project-card" href="https://github.com/danielAVAR" target="_blank" rel="noreferrer"><span class="meta">BACKEND</span><strong>CMDB Back End</strong><span>Servicios backend para la gestión de elementos de configuración.</span><b>Ver en GitHub ↗</b></a></div><a class="all-projects" href="https://github.com/danielAVAR" target="_blank" rel="noreferrer">Ver perfil completo ↗</a></div>'
    },
    {
      id: 'education', label: 'EDUCACIÓN',
      palette: ['#ffe17b', '#fff0a8', '#e8d982', '#c4c76c', '#8fad61', '#607e54', '#3d5948'],
      content: '<div class="education-copy"><p class="eyebrow">FORMACIÓN</p><h3>Aprender haciendo.</h3><article class="education-item"><p class="meta">ENE. 2026 — ACTUALIDAD</p><h4>CAMPUSLANDS GT</h4><p>Técnico en desarrollo de software · 1,800 horas de formación en programación y habilidades blandas.</p><span>Proyecto aplicado: PeakFit, CLI para gestión de gimnasios con Node.js y MySQL.</span></article><article class="education-item"><p class="meta">OCT. 2023</p><h4>CEAR</h4><p>Bachillerato en Ciencias y Letras. Diploma de Honor al Alto Rendimiento Académico.</p><span>Investigación sobre inteligencia intrapersonal y prevención de la violencia escolar.</span></article></div>'
    },
    {
      id: 'contact', label: 'SIGUIENTE PASO',
      palette: ['#0f4228', '#33c250', '#2a8b56', '#7ea3d4', '#39947f', '#19626e', '#3d6bc7'],
      content: '<div class="contact-copy"><p class="eyebrow">SIGUIENTE PASO</p><h3>¿Construimos algo juntos?</h3><p>Estoy abierto a colaborar en proyectos de software, producto y diseño. Cuéntame qué tienes en mente.</p><a class="contact-button" href="mailto:danielaguilar5502@gmail.com">Escríbeme ↗</a><div class="contact-details"><a href="mailto:danielaguilar5502@gmail.com">danielaguilar5502@gmail.com</a><a href="tel:+50240558141">+502 4055-8141</a><a href="https://www.linkedin.com/in/daniel-aguilar-32a7a9424" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/danielAVAR" target="_blank" rel="noreferrer">GitHub ↗</a></div><p class="meta">FRAIJANES, GUATEMALA · DISPONIBLE PARA TRABAJO REMOTO</p></div>'
    }
  ];

  var englishCopy = {
    'BIENVENIDO': 'WELCOME',
    'TÍTULO PRINCIPAL': 'HOME', 'DESARROLLADOR DE SOFTWARE · GUATEMALA': 'SOFTWARE DEVELOPER · GUATEMALA',
    'Construyo productos digitales con backend sólido, APIs claras y atención al detalle.': 'I build digital products with solid backends, clear APIs, and attention to detail.',
    'Hablemos ↗': "Let's talk ↗", 'PERFIL': 'PROFILE', 'QUIÉN SOY': 'ABOUT ME',
    'Tecnología con intención.': 'Technology with purpose.',
    'Soy desarrollador de software y creador. Me interesa construir experiencias digitales claras, útiles y hechas para las personas.': 'I am a software developer and creator. I enjoy building clear, useful digital experiences made for people.',
    'Tengo experiencia en desarrollo backend y frontend, integración de APIs REST y gestión de bases de datos. Disfruto conectar tecnología, diseño y storytelling para transformar ideas en productos funcionales e intuitivos. También me apasionan el arte, el dibujo y aprender junto a otras personas.': 'I have experience in backend and frontend development, REST API integration, and database management. I enjoy combining technology, design, and storytelling to turn ideas into useful, intuitive products. I am also passionate about art, drawing, and learning with others.',
    'proyectos de diseño': 'design projects', 'horas de formación': 'hours of training', 'promedio freelance': 'freelance rating',
    'EXPERIENCIA': 'EXPERIENCE', 'TRAYECTORIA': 'CAREER', 'Experiencia seleccionada.': 'Selected experience.',
    'ACTUALIDAD': 'PRESENT', 'Desarrollador Back-end · OMS': 'Back-end Developer · OMS',
    'Implementación backend a la medida, normalización de base de datos, validaciones y manejo centralizado de errores. Node.js, Redis, WebSockets, Docker, pruebas y documentación de APIs.': 'Custom backend implementation, database normalization, validation, and centralized error handling. Node.js, Redis, WebSockets, Docker, testing, and API documentation.',
    'Diseñador gráfico independiente': 'Independent graphic designer',
    'Más de 20 proyectos para clientes, coordinando comunicación, plazos y entregas. Calificación promedio de 4.9 estrellas.': 'Over 20 client projects, coordinating communication, timelines, and delivery. Average rating of 4.9 stars.',
    'PROYECTOS': 'PROJECTS', 'Proyectos.': 'Projects.',
    'Una selección de proyectos. Explora el código y los detalles en GitHub.': 'A selection of projects. Explore the code and details on GitHub.',
    'BACKEND · NODE.JS': 'BACKEND · NODE.JS', 'Backend a la medida, base de datos normalizada y APIs.': 'Custom backend, normalized database, and APIs.',
    'CLI · NODE.JS · MYSQL': 'CLI · NODE.JS · MYSQL', 'Herramienta modular para gestión de gimnasios.': 'Modular tool for gym management.',
    'APLICACIÓN WEB': 'WEB APPLICATION', 'Proyecto para la gestión de estacionamiento en campus.': 'A campus parking management project.',
    'Plataforma de tienda para la comunidad del campus.': 'An online store for the campus community.',
    'Interfaz para consultar y administrar elementos de configuración.': 'Interface for viewing and managing configuration items.',
    'Servicios backend para la gestión de elementos de configuración.': 'Backend services for managing configuration items.',
    'Ver en GitHub ↗': 'View on GitHub ↗', 'Ver perfil completo ↗': 'View full profile ↗',
    'EDUCACIÓN': 'EDUCATION', 'FORMACIÓN': 'EDUCATION', 'Aprender haciendo.': 'Learning by doing.',
    'Técnico en desarrollo de software · 1,800 horas de formación en programación y habilidades blandas.': 'Software development technician · 1,800 hours of programming and professional skills training.',
    'Proyecto aplicado: PeakFit, CLI para gestión de gimnasios con Node.js y MySQL.': 'Applied project: PeakFit, a gym management CLI built with Node.js and MySQL.',
    'Bachillerato en Ciencias y Letras. Diploma de Honor al Alto Rendimiento Académico.': 'High school diploma in Science and Arts, with honors for academic achievement.',
    'Investigación sobre inteligencia intrapersonal y prevención de la violencia escolar.': 'Research on intrapersonal intelligence and school violence prevention.',
    'SIGUIENTE PASO': 'NEXT STEP', '¿Construimos algo juntos?': 'Shall we build something together?',
    'Estoy abierto a colaborar en proyectos de software, producto y diseño. Cuéntame qué tienes en mente.': 'I am open to collaborating on software, product, and design projects. Tell me what you have in mind.',
    'Escríbeme ↗': 'Email me ↗', 'DISPONIBLE PARA TRABAJO REMOTO': 'AVAILABLE FOR REMOTE WORK', 'ÍNDICE': 'INDEX'
  };
  var nightPalettes = [
    ['#111a18', '#111a18', '#111a18', '#111a18', '#111a18', '#111a18', '#111a18'],
    ['#29451d', '#263d25', '#1c3e35', '#17423d', '#123c3a', '#15332f', '#142824'],
    ['#243d31', '#293e2e', '#1f3b30', '#183b32', '#173a36', '#15332f', '#132b28'],
    ['#49301f', '#49311f', '#45291f', '#432326', '#3b2027', '#32202d', '#281e2b'],
    ['#23334d', '#29364d', '#2b2d4a', '#292742', '#26213b', '#22203a', '#1b1e35'],
    ['#49421e', '#484123', '#403d25', '#363d24', '#303b25', '#293725', '#233126'],
    ['#173923', '#1c4329', '#1e3a32', '#273748', '#1c3935', '#18343b', '#202f49']
  ];
  var language = localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'es';

  function localizeMarkup(markup) {
    if (language !== 'en') return markup;
    var template = document.createElement('template');
    template.innerHTML = markup;
    var walker = document.createTreeWalker(template.content, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var source = node.nodeValue;
      var translated = source;
      Object.keys(englishCopy).forEach(function (spanish) {
        translated = translated.split(spanish).join(englishCopy[spanish]);
      });
      node.nodeValue = translated;
    }
    return template.innerHTML;
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage;
    localStorage.setItem('portfolio-language', language);
    document.documentElement.lang = language;
    var button = document.getElementById('language-toggle');
    button.textContent = language === 'es' ? 'EN' : 'ES';
    button.setAttribute('aria-label', language === 'es' ? 'Switch language to English' : 'Cambiar idioma a español');
    themeIcon.textContent = theme === 'night' ? '☀' : '☾';
    themeButton.setAttribute('aria-label', theme === 'night'
      ? (language === 'es' ? 'Activar modo día' : 'Switch to day mode')
      : (language === 'es' ? 'Activar modo noche' : 'Switch to night mode'));
    lastBase = -1;
    lastIncoming = -1;
    updateSequence();
    loadGithubProjects();
  }

  var languageButton = document.getElementById('language-toggle');
  languageButton.addEventListener('click', function () { setLanguage(language === 'es' ? 'en' : 'es'); });
  document.documentElement.lang = language;
  languageButton.textContent = language === 'es' ? 'EN' : 'ES';

  var theme = localStorage.getItem('portfolio-theme') === 'night' ? 'night' : 'day';
  var themeButton = document.getElementById('theme-toggle');
  var themeIcon = document.getElementById('theme-icon');

  function setTheme(nextTheme) {
    theme = nextTheme;
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'night' ? '#111a18' : '#173d32';
    themeIcon.textContent = theme === 'night' ? '☀' : '☾';
    themeButton.setAttribute('aria-label', theme === 'night'
      ? (language === 'es' ? 'Activar modo día' : 'Switch to day mode')
      : (language === 'es' ? 'Activar modo noche' : 'Switch to night mode'));
    lastBase = -1;
    lastIncoming = -1;
    updateSequence();
  }

  themeButton.addEventListener('click', function () { setTheme(theme === 'day' ? 'night' : 'day'); });

  // 2. Fibonacci geometry: split a rectangle by the golden ratio, rotating each cut.
  var goldenShare = 0.618;
  var maxDepth = 13;
  var minSize = 0.004;
  var palettes = scenes.map(function (scene) { return scene.palette; });
  var baseLayer = document.getElementById('scene-base');
  var incomingLayer = document.getElementById('scene-incoming');
  var hint = document.getElementById('scroll-hint');
  var geometry = makeGeometry();
  var lastBase = -1;
  var lastIncoming = -1;
  var framePending = false;
  var sceneSpan = (window.innerHeight || 1) * 1.2;

  function split(rect, direction, depth, tiles) {
    if (depth > maxDepth || rect.w < minSize || rect.h < minSize) return;
    var tile;
    var remainder;
    if (direction === 0) {
      tile = { x: rect.x, y: rect.y, w: rect.w * goldenShare, h: rect.h };
      // Keep the parent offset: each recursive remainder is in local page space.
      remainder = { x: rect.x + tile.w, y: rect.y, w: rect.w - tile.w, h: rect.h };
    } else if (direction === 1) {
      tile = { x: rect.x, y: rect.y, w: rect.w, h: rect.h * goldenShare };
      remainder = { x: rect.x, y: rect.y + tile.h, w: rect.w, h: rect.h - tile.h };
    } else if (direction === 2) {
      tile = { x: rect.x + rect.w * (1 - goldenShare), y: rect.y, w: rect.w * goldenShare, h: rect.h };
      remainder = { x: rect.x, y: rect.y, w: rect.w * (1 - goldenShare), h: rect.h };
    } else {
      tile = { x: rect.x, y: rect.y + rect.h * (1 - goldenShare), w: rect.w, h: rect.h * goldenShare };
      remainder = { x: rect.x, y: rect.y, w: rect.w, h: rect.h * (1 - goldenShare) };
    }
    tiles.push({ rect: tile, depth: depth });
    split(remainder, (direction + 3) % 4, depth + 1, tiles);
  }

  function makeGeometry() {
    var result = [];
    var firstCut = window.innerWidth < window.innerHeight ? 1 : 2;
    split({ x: 0, y: 0, w: 1, h: 1 }, firstCut, 0, result);
    // Keep a separate size order so the information roles stay with the largest blocks.
    result.sort(function (a, b) {
      return a.rect.w * a.rect.h - b.rect.w * b.rect.h;
    });
    return result;
  }

  // 3. Scene composition: largest tile gets information, second gets title, third gets index.
  function sceneMarkup(sceneIndex) {
    var scene = scenes[sceneIndex];
    if (sceneIndex === 0) {
      var welcomePalette = theme === 'night' ? nightPalettes[sceneIndex] : scene.palette;
      return '<div class="welcome-scene" style="background:' + welcomePalette[0] + '">' + localizeMarkup(scene.content) + '</div>';
    }

    var links = scenes.slice(1).map(function (item, index) {
      var sectionNumber = index + 1;
      var relation = sectionNumber === sceneIndex ? ' is-current' : '';
      if (sectionNumber === sceneIndex - 1 || sectionNumber === sceneIndex + 1) relation += ' is-neighbor';
      return '<li><a class="index-link' + relation + '" href="#' + item.id + '" data-scene="' + sectionNumber + '"><span>' + String(sectionNumber).padStart(2, '0') + '</span><span>' + (englishCopy[item.label] || item.label) + '</span></a></li>';
    }).join('');

    var layer = document.createElement('div');
    layer.className = 'fib-scene';
    layer.dataset.scene = sceneIndex;
    geometry.forEach(function (part, index) {
      var tile = document.createElement('div');
      var rank = geometry.length - 1 - index;
      tile.className = 'fib-tile';
      if (rank === 0) tile.classList.add('fib-tile--feature');
      if (rank === 1) tile.classList.add('fib-tile--title');
      if (rank === 2) tile.classList.add('fib-tile--index');
      // Overlap neighboring edges by one physical pixel to hide subpixel seams.
      tile.style.left = 'calc(' + (part.rect.x * 100) + '% - 0.5px)';
      tile.style.top = 'calc(' + (part.rect.y * 100) + '% - 0.5px)';
      tile.style.width = 'calc(' + (part.rect.w * 100) + '% + 1px)';
      tile.style.height = 'calc(' + (part.rect.h * 100) + '% + 1px)';
      var palette = theme === 'night' ? nightPalettes[sceneIndex] : scene.palette;
      tile.style.setProperty('--tile-color', palette[part.depth % palette.length]);
      // Reveal each rectangle from its outer edge toward the mosaic center.
      var centerX = part.rect.x + part.rect.w / 2;
      var centerY = part.rect.y + part.rect.h / 2;
      if (Math.abs(centerX - 0.5) >= Math.abs(centerY - 0.5)) {
        tile.dataset.direction = centerX < 0.5 ? 'right' : 'left';
      } else {
        tile.dataset.direction = centerY < 0.5 ? 'down' : 'up';
      }

      if (rank === 0) {
        tile.innerHTML = localizeMarkup(scene.content);
      } else if (rank === 1) {
        tile.innerHTML = '<p class="tile-section-title">' + (englishCopy[scene.label] || scene.label) + '</p>';
      } else if (rank === 2) {
        tile.innerHTML = '<div class="index-panel"><p class="eyebrow">' + (language === 'en' ? 'INDEX' : 'ÍNDICE') + '</p><ol>' + links + '</ol></div>';
      }
      layer.appendChild(tile);
    });
    return layer;
  }

  // 4. Scroll choreography: reveal each new palette over the complete previous scene.
  function renderScene(layer, index, isIncoming) {
    if (index < 0 || index >= scenes.length) {
      layer.replaceChildren();
      layer.hidden = true;
      return;
    }
    layer.hidden = false;
    if (index === 0) layer.innerHTML = sceneMarkup(index);
    else layer.replaceChildren(sceneMarkup(index));
    layer.dataset.scene = String(index);
    layer.setAttribute('aria-hidden', isIncoming ? 'true' : 'false');
  }

  function setReveal(layer, progress) {
    var tiles = layer.querySelectorAll('.fib-tile');
    var revealProgress = progress;
    if (progress > 0.8) {
      var resistancePhase = Math.min(1, (progress - 0.8) / 0.2);
      revealProgress = 0.8 + 0.2 * resistancePhase * resistancePhase;
    }
    tiles.forEach(function (tile, index) {
      var local = Math.max(0, Math.min(1, revealProgress * tiles.length - index));
      var inset = (1 - local) * 100;
      var direction = tile.dataset.direction;
      var clip = 'inset(0 ' + inset + '% 0 0)';
      if (direction === 'up') clip = 'inset(0 0 ' + inset + '% 0)';
      if (direction === 'right') clip = 'inset(0 0 0 ' + inset + '%)';
      if (direction === 'down') clip = 'inset(' + inset + '% 0 0 0)';
      tile.style.clipPath = clip;
    });
  }

  function updateSequence() {
    var progress = Math.max(0, Math.min(scenes.length - 1, window.scrollY / sceneSpan));
    var baseIndex = Math.min(scenes.length - 1, Math.floor(progress));
    var incomingIndex = Math.min(scenes.length - 1, baseIndex + 1);
    var localProgress = progress - baseIndex;

    if (baseIndex !== lastBase) {
      renderScene(baseLayer, baseIndex, false);
      lastBase = baseIndex;
    }
    if (incomingIndex !== lastIncoming) {
      if (incomingIndex === baseIndex) renderScene(incomingLayer, -1, true);
      else renderScene(incomingLayer, incomingIndex, true);
      lastIncoming = incomingIndex;
    }

    incomingLayer.style.opacity = incomingIndex === baseIndex ? '0' : '1';
    setReveal(incomingLayer, localProgress);
    hint.classList.toggle('is-hidden', progress > 0.15);

    // Keep the scene being introduced available to assistive technology after its reveal.
    if (localProgress >= 0.85 && incomingIndex !== baseIndex) {
      incomingLayer.setAttribute('aria-hidden', 'false');
      baseLayer.setAttribute('aria-hidden', 'true');
    } else {
      incomingLayer.setAttribute('aria-hidden', 'true');
      baseLayer.setAttribute('aria-hidden', 'false');
    }
    framePending = false;
  }

  function requestSequenceUpdate() {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateSequence);
  }

  // 5. GitHub projects: replace the curated fallbacks when public repositories load.
  function loadGithubProjects() {
    fetch('https://api.github.com/users/danielAVAR/repos?type=owner&sort=updated&per_page=12', {
      headers: { Accept: 'application/vnd.github+json' }
    }).then(function (response) {
      if (!response.ok) throw new Error('GitHub request failed');
      return response.json();
    }).then(function (repositories) {
      var projects = repositories.filter(function (repository) { return !repository.fork; }).slice(0, 3);
      if (!projects.length) return;
      var list = document.querySelector('.project-list');
      list.replaceChildren();
      projects.forEach(function (repository) {
        var card = document.createElement('a');
        card.className = 'project-card';
        card.href = repository.html_url;
        card.target = '_blank';
        card.rel = 'noreferrer';
        var language = document.createElement('span');
        language.className = 'meta';
        language.textContent = repository.language || 'OPEN SOURCE';
        var name = document.createElement('strong');
        name.textContent = repository.name;
        var description = document.createElement('span');
        description.textContent = repository.description || 'Repositorio público de Daniel Aguilar.';
        var action = document.createElement('b');
        action.textContent = language === 'en' ? 'View on GitHub ↗' : 'Ver en GitHub ↗';
        card.append(language, name, description, action);
        list.appendChild(card);
      });
    }).catch(function () {
      // The curated project links remain visible if GitHub is unavailable.
    });
  }

  // 6. Index navigation: animate slowly through every intervening Fibonacci stop.
  var navigationFrame = 0;

  function cancelIndexScroll() {
    if (!navigationFrame) return;
    window.cancelAnimationFrame(navigationFrame);
    navigationFrame = 0;
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('.index-link');
    if (!link) return;
    event.preventDefault();
    var sceneNumber = Number(link.dataset.scene);
    cancelIndexScroll();

    var start = window.scrollY;
    var destination = sceneNumber * sceneSpan;
    var distance = destination - start;
    var duration = Math.max(1200, Math.abs(distance / sceneSpan) * 1200);
    var startedAt = 0;

    // Cubic ease-in-out keeps the transition readable at both ends of the scroll.
    function animateToStop(timestamp) {
      if (!startedAt) startedAt = timestamp;
      var progress = Math.min(1, (timestamp - startedAt) / duration);
      var eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      window.scrollTo(0, start + distance * eased);

      if (progress < 1) navigationFrame = window.requestAnimationFrame(animateToStop);
      else {
        window.scrollTo(0, destination);
        navigationFrame = 0;
      }
    }

    navigationFrame = window.requestAnimationFrame(animateToStop);
  });

  // Let a deliberate wheel or touch gesture take control from the index animation.
  window.addEventListener('wheel', cancelIndexScroll, { passive: true });
  window.addEventListener('touchstart', cancelIndexScroll, { passive: true });

  // 7. Initialize one continuous seven-viewport sequence; contact is the final scroll stop.
  function sizeSequence() {
    // Portrait screens put the largest Fibonacci rectangle across the full width.
    geometry = makeGeometry();
    sceneSpan = (window.innerHeight || 1) * 1.2;
    lastBase = -1;
    lastIncoming = -1;
    document.querySelector('.sequence-stage').style.height = (window.innerHeight + (scenes.length - 1) * sceneSpan) + 'px';
    updateSequence();
  }

  window.addEventListener('scroll', requestSequenceUpdate, { passive: true });
  window.addEventListener('resize', sizeSequence);
  setTheme(theme);
  sizeSequence();
  loadGithubProjects();
})();
