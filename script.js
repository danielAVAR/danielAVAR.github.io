(function () {
  // ============================================================
  // DOM HELPERS
  // ============================================================

  // Keeps DOM lookups concise while returning the same native elements.
  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  // Returns matching elements as an array for convenient iteration.
  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  // ============================================================
  // CONFIGURATION
  // Change these values to adjust breakpoints, scroll timing, and animation ranges.
  // ============================================================

  var SETTINGS = {
    hero: {
      mobileBreakpoint: 760,
      maxDevicePixelRatio: 2,
      titleZoom: 210,
      titleZoomEnd: 0.85,
      nameFadeEnd: 0.1,
      supportingTextFadeEnd: 0.2,
      tileExitEnd: 0.2,
      videoSeekThreshold: 1 / 60,
      paperFadeStart: 5.88,
      paperFadeDuration: 0.08,
      curtainStart: 0.82,
      curtainDuration: 0.12
    },
    projects: {
      activeSlideThreshold: 0.6
    },
    reveals: {
      threshold: 0.15,
      skillStaggerMs: 50,
      maxSkillStaggerMs: 400
    }
  };

  var prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ============================================================
  // DOM ELEMENTS AND PAGE STATE
  // ============================================================

  var elements = {
    cover: $('#cover'),
    stage: $('.stage', $('#cover')),
    video: $('#wave'),
    canvas: $('#cv'),
    canvasContext: $('#cv').getContext('2d'),
    title: $('#tx'),
    titleZoomGroup: $('#zg'),
    topNavigation: $('#top'),
    scrollDot: $('#dot'),
    danielText: $('#dn'),
    supportingText: [$('#roles'), $('#hint')],
    tileNavigation: $('#tiles'),
    tileLinks: $$('.tiles a', $('#tiles')),
    paperOverlay: $('#paper'),
    whiteCurtain: $('#curtain'),
    projectTrack: $('#track'),
    previousProjectButton: $('#prev'),
    nextProjectButton: $('#next'),
    projectCounter: $('#ct'),
    skillsGrid: $('#grid')
  };

  var hero = {
    width: 0,
    height: 0,
    titleOriginX: 0,
    titleOriginY: 0,
    scrollProgress: 0,
    hasVideo: Boolean(elements.video.dataset.src)
  };

  var projectSlides = $$('.slide');
  var activeProjectIndex = 0;

  // ============================================================
  // HERO LAYOUT AND BACKGROUND
  // ============================================================

  // Sizes the hero canvas and places AVAR, DANIEL, and the role list in the stage.
  function layoutHero() {
    var isMobile;
    var pixelRatio;
    var fontSize;
    var capHeight;
    var titleX;
    var titleTop;
    var titleBase;
    var titleWidth;

    hero.width = elements.stage.clientWidth;
    hero.height = elements.stage.clientHeight;
    isMobile = hero.width < SETTINGS.hero.mobileBreakpoint;
    pixelRatio = Math.min(devicePixelRatio || 1, SETTINGS.hero.maxDevicePixelRatio);

    elements.canvas.width = hero.width * pixelRatio;
    elements.canvas.height = hero.height * pixelRatio;

    elements.paperOverlay.setAttribute('viewBox', '0 0 ' + hero.width + ' ' + hero.height);
    ['#mr', '#pr', '#pr2'].forEach(function (selector) {
      var rect = $(selector);
      rect.setAttribute('width', hero.width);
      rect.setAttribute('height', hero.height);
    });
    $('#m').setAttribute('width', hero.width);
    $('#m').setAttribute('height', hero.height);

    fontSize = Math.min(isMobile ? hero.width * 0.3 : hero.width * 0.165, hero.height * 0.5);
    capHeight = fontSize * 0.72;
    titleX = isMobile ? hero.width * 0.06 : hero.width * 0.08;
    titleTop = hero.height * (isMobile ? 0.1 : 0.14) + (isMobile ? 34 : 44);
    titleBase = titleTop + capHeight;

    elements.title.setAttribute('font-size', fontSize);
    elements.title.setAttribute('x', titleX);
    elements.title.setAttribute('y', titleBase);

    titleWidth = elements.title.getBBox().width || fontSize * 2.55;
    elements.danielText.style.left = titleX + 'px';
    elements.danielText.style.width = titleWidth + 'px';
    elements.danielText.style.top = (titleTop - (isMobile ? 30 : 42)) + 'px';

    elements.supportingText[0].style.left = titleX + 'px';
    elements.supportingText[0].style.top = (titleBase + (isMobile ? 20 : 36)) + 'px';

    hero.titleOriginX = titleX + titleWidth * 0.38;
    hero.titleOriginY = titleBase - capHeight * 0.1;
  }

  // Draws the animated fallback wave when the hero video has no source URL.
  // progress is the current 0-to-1 position through the cover scroll.
  function drawFallbackWave(progress) {
    var width = elements.canvas.width;
    var height = elements.canvas.height;
    var gradient = elements.canvasContext.createLinearGradient(0, 0, 0, height);

    gradient.addColorStop(0, '#0e3a52');
    gradient.addColorStop(1, '#04101a');
    elements.canvasContext.fillStyle = gradient;
    elements.canvasContext.fillRect(0, 0, width, height);

    for (var band = 0; band < 6; band += 1) {
      var baseY = height * (0.34 + band * 0.12) - progress * height * 0.1;
      var amplitude = height * (0.025 + band * 0.007);
      var phase = progress * 16 + band * 1.3;

      elements.canvasContext.beginPath();
      elements.canvasContext.moveTo(0, height);

      for (var x = 0; x <= width; x += 12) {
        var waveY = baseY +
          Math.sin((x / width) * (5 + band) + phase) * amplitude +
          Math.sin((x / width) * 11 - phase * 0.7) * amplitude * 0.4;
        elements.canvasContext.lineTo(x, waveY);
      }

      elements.canvasContext.lineTo(width, height);
      elements.canvasContext.closePath();
      elements.canvasContext.fillStyle = 'rgba(' + (30 + band * 10) + ',' +
        (120 + band * 18) + ',' + (150 + band * 14) + ',' + (0.2 + band * 0.08) + ')';
      elements.canvasContext.fill();
    }
  }

  // Maps the cover's vertical scroll distance to a normalized 0-to-1 progress value.
  function getCoverScrollProgress() {
    var coverRect = elements.cover.getBoundingClientRect();
    return Math.min(1, Math.max(0, -coverRect.top / (elements.cover.offsetHeight - hero.height)));
  }

  // Seeks the hero video to the scroll position without stacking unfinished seeks.
  // progress is the normalized position through the cover section.
  function updateHeroVideo(progress) {
    if (hero.hasVideo && elements.video.duration) {
      var targetTime = progress * elements.video.duration;
      var timeDifference = Math.abs(elements.video.currentTime - targetTime);

      if (!elements.video.seeking && timeDifference > SETTINGS.hero.videoSeekThreshold) {
        elements.video.currentTime = targetTime;
      }
    } else if (!hero.hasVideo) {
      drawFallbackWave(progress);
    }
  }

  // ============================================================
  // HERO SCROLL ANIMATIONS
  // ============================================================

  // Fades the supporting hero copy upward over its configured scroll range.
  // progress is the normalized position through the cover section.
  function updateSupportingText(progress) {
    var fadeProgress = Math.min(1, progress / SETTINGS.hero.supportingTextFadeEnd);

    elements.supportingText.forEach(function (item) {
      item.style.opacity = 1 - fadeProgress;
      item.style.transform = 'translateY(' + (-fadeProgress * 18) + 'px)';
      item.style.pointerEvents = fadeProgress > 0.5 ? 'none' : 'auto';
    });
  }

  // Fades the DANIEL row sooner than the other hero text.
  // progress is the normalized position through the cover section.
  function updateNameText(progress) {
    var fadeProgress = Math.min(1, progress / SETTINGS.hero.nameFadeEnd);

    elements.danielText.style.opacity = 1 - fadeProgress;
    elements.danielText.style.transform = 'translateY(' + (-fadeProgress * 18) + 'px)';
    elements.danielText.style.pointerEvents = fadeProgress > 0.5 ? 'none' : 'auto';
  }

  // Moves the hero link cards off the right edge, one at a time in DOM order.
  // progress is the normalized position through the cover section.
  function updateTileNavigation(progress) {
    var animationProgress = Math.min(1, progress / SETTINGS.hero.tileExitEnd);
    var exitDistance = hero.width - elements.tileNavigation.offsetLeft + 24;

    elements.tileNavigation.style.opacity = 1;
    elements.tileNavigation.style.pointerEvents = 'none';

    elements.tileLinks.forEach(function (card, index) {
      var cardProgress = Math.max(0, Math.min(1, animationProgress * elements.tileLinks.length - index));
      card.style.transform = 'translateX(' + (exitDistance * cardProgress) + 'px)';
      card.style.pointerEvents = cardProgress < 1 ? 'auto' : 'none';
    });
  }

  // Scales AVAR, fades the paper mask, and raises the white curtain at the end of the cover.
  // progress is the normalized position through the cover section.
  function updateHeroArtwork(progress) {
    var zoomProgress = Math.min(1, progress / SETTINGS.hero.titleZoomEnd);
    var zoom = Math.pow(SETTINGS.hero.titleZoom, zoomProgress);
    var paperFadeProgress = (progress - SETTINGS.hero.paperFadeStart) / SETTINGS.hero.paperFadeDuration;
    var curtainProgress = (progress - SETTINGS.hero.curtainStart) / SETTINGS.hero.curtainDuration;

    elements.titleZoomGroup.setAttribute(
      'transform',
      'translate(' + hero.titleOriginX + ' ' + hero.titleOriginY + ') scale(' + zoom +
        ') translate(' + -hero.titleOriginX + ' ' + -hero.titleOriginY + ')'
    );

    elements.paperOverlay.style.opacity = progress > SETTINGS.hero.paperFadeStart
      ? Math.max(0, 1 - paperFadeProgress)
      : 1;
    elements.whiteCurtain.style.transform = 'scaleY(' + Math.max(0, Math.min(1, curtainProgress)) + ')';
  }

  // Updates the fixed navigation's visibility and the page scroll-position dot.
  // progress is the normalized position through the cover section.
  function updatePageScrollIndicators(progress) {
    var pageScrollProgress = scrollY / (document.documentElement.scrollHeight - hero.height);

    elements.topNavigation.classList.toggle('on', progress > 0.9);
    elements.scrollDot.style.top = (pageScrollProgress * (hero.height - 14)) + 'px';
  }

  // Runs all scroll-linked hero effects once per animation frame.
  function updateHeroFrame() {
    hero.scrollProgress = getCoverScrollProgress();

    updateHeroVideo(hero.scrollProgress);
    updateHeroArtwork(hero.scrollProgress);
    updateSupportingText(hero.scrollProgress);
    updateNameText(hero.scrollProgress);
    updateTileNavigation(hero.scrollProgress);
    updatePageScrollIndicators(hero.scrollProgress);

    requestAnimationFrame(updateHeroFrame);
  }

  // Loads the hero video source, lays out the cover, and starts scroll animation updates.
  function initializeHero() {
    if (hero.hasVideo) {
      elements.video.src = elements.video.dataset.src;
    } else {
      elements.video.style.display = 'none';
    }

    layoutHero();
    addEventListener('resize', layoutHero);
    updateHeroFrame();
  }

  // ============================================================
  // PROJECT SLIDER
  // ============================================================

  // Marks a project as active and plays its video while pausing the others.
  // index is the zero-based project slide index to activate.
  function setActiveProject(index) {
    activeProjectIndex = index;

    projectSlides.forEach(function (slide, slideIndex) {
      var slideVideo = $('video', slide);
      slide.classList.toggle('on', slideIndex === index);

      if (slideVideo.src) {
        if (slideIndex === index) {
          slideVideo.play().catch(function () {});
        } else {
          slideVideo.pause();
        }
      }
    });

    elements.projectCounter.textContent =
      ('0' + (index + 1)).slice(-2) + ' / 0' + projectSlides.length;
  }

  // Scrolls the project track to a requested slide, respecting reduced-motion preferences.
  // index is the zero-based project slide index to display.
  function goToProject(index) {
    var boundedIndex = Math.max(0, Math.min(projectSlides.length - 1, index));
    var targetLeft = projectSlides[boundedIndex].offsetLeft - projectSlides[0].offsetLeft;

    elements.projectTrack.scrollTo({
      left: targetLeft,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  }

  // Loads configured project clips and watches the track to detect its active slide.
  function initializeProjectSlider() {
    projectSlides.forEach(function (slide, index) {
      var slideVideo = $('video', slide);

      if (slideVideo.dataset.src) {
        slideVideo.src = slideVideo.dataset.src;
        $('span', slide).style.display = 'none';
      }

      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveProject(index);
          }
        });
      }, {
        root: elements.projectTrack,
        threshold: SETTINGS.projects.activeSlideThreshold
      }).observe(slide);
    });

    elements.previousProjectButton.onclick = function () {
      goToProject(activeProjectIndex - 1);
    };
    elements.nextProjectButton.onclick = function () {
      goToProject(activeProjectIndex + 1);
    };

    elements.projectTrack.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToProject(activeProjectIndex + 1);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToProject(activeProjectIndex - 1);
      }
    });

    setActiveProject(0);
  }

  // ============================================================
  // SKILLS CONTENT
  // Edit this list to change skill names or their inline SVG icons.
  // ============================================================

  var skillIconStyle = 'fill="none" stroke="currentColor" stroke-width="2.4" ' +
    'stroke-linejoin="round" stroke-linecap="round"';

  var skills = [
    ['HTML', '<path d="M6 4l2 28 10 4 10-4 2-28z" ' + skillIconStyle + '/>' +
      '<path d="M12 12h14l-1 12-7 2-7-2" ' + skillIconStyle + '/>'],
    ['CSS', '<path d="M6 4l2 28 10 4 10-4 2-28z" ' + skillIconStyle + '/>' +
      '<path d="M25 12H12l1 6h11l-1 7-5 2-5-2" ' + skillIconStyle + '/>'],
    ['JAVASCRIPT', '<rect x="4" y="4" width="28" height="28" ' + skillIconStyle + '/>' +
      '<path d="M16 14v9c0 2-3 2-4 0M21 25c1 2 5 2 5-1s-5-2-5-5 4-3 5-1" ' + skillIconStyle + '/>'],
    ['NODE.JS', '<path d="M18 3l13 7.500v15L18 33 5 25.500v-15z" ' + skillIconStyle + '/>' +
      '<path d="M14 23V13l8 10V13" ' + skillIconStyle + '/>'],
    ['POSTGRESQL', '<ellipse cx="18" cy="9" rx="11" ry="4.500" ' + skillIconStyle + '/>' +
      '<path d="M7 9v18c0 2.500 5 4.500 11 4.500s11-2 11-4.500V9M7 18c0 2.500 ' +
      '5 4.500 11 4.500s11-2 11-4.500" ' + skillIconStyle + '/>'],
    ['GIT', '<path d="M18 3l15 15-15 15L3 18z" ' + skillIconStyle + '/>' +
      '<circle cx="14" cy="14" r="2.500" ' + skillIconStyle + '/>' +
      '<circle cx="22" cy="22" r="2.500" ' + skillIconStyle + '/>' +
      '<path d="M14 16.500v-0M15.800 15.800l4.400 4.400" ' + skillIconStyle + '/>'],
    ['GITHUB', '<circle cx="18" cy="18" r="14" ' + skillIconStyle + '/>' +
      '<path d="M13 31v-5c-4 1-5-2-6-3m6-1c-3-2-3-8 0-10 2 0 3 1 5 1s3-1 5-1c3 2 ' +
      '3 8 0 10 2 1 2 4 2 8" ' + skillIconStyle + '/>'],
    ['OBSIDIAN', '<path d="M12 3L5 15l5 17 14 2 7-14-5-12z" ' + skillIconStyle + '/>' +
      '<path d="M12 3l-2 29M12 3l12 3M5 15l19 3 7-2M24 18l0 16" ' + skillIconStyle + '/>'],
    ['N8N', '<circle cx="6" cy="18" r="3" ' + skillIconStyle + '/>' +
      '<circle cx="19" cy="9" r="3" ' + skillIconStyle + '/>' +
      '<circle cx="19" cy="27" r="3" ' + skillIconStyle + '/>' +
      '<circle cx="31" cy="18" r="3" ' + skillIconStyle + '/>' +
      '<path d="M9 17l7-6M9 19l7 6M22 10l6 6M22 26l6-6" ' + skillIconStyle + '/>']
  ];

  // Creates one skill card with its label and inline SVG icon.
  // skill is a pair containing the displayed name and SVG markup.
  function createSkillCard(skill) {
    var card = document.createElement('div');
    card.className = 'sk';
    card.innerHTML = '<svg viewBox="0 0 36 36" aria-hidden="true">' + skill[1] +
      '</svg><div>' + skill[0] + '</div>';
    return card;
  }

  // Creates the dashed placeholder cards shown after the configured skills.
  function createSkillPlaceholder() {
    var placeholder = document.createElement('div');
    placeholder.className = 'sk ph';
    placeholder.innerHTML = '<svg viewBox="0 0 36 36"><rect x="5" y="5" width="26" height="26" ' +
      'fill="none" stroke="currentColor" stroke-dasharray="4 3" stroke-width="2"/></svg>' +
      '<div>+ ADD SKILL</div>';
    return placeholder;
  }

  // Renders skill cards into the skills section; edit the skills list above to change content.
  function renderSkills() {
    skills.forEach(function (skill) {
      elements.skillsGrid.appendChild(createSkillCard(skill));
    });

    for (var index = 0; index < 2; index += 1) {
      elements.skillsGrid.appendChild(createSkillPlaceholder());
    }
  }

  // Reveals section headings and skill cards as they enter the viewport.
  function initializeRevealAnimations() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: SETTINGS.reveals.threshold });

    $$('.rv').forEach(function (element) {
      observer.observe(element);
    });

    $$('.sk').forEach(function (element, index) {
      var delay = Math.min(
        index * SETTINGS.reveals.skillStaggerMs,
        SETTINGS.reveals.maxSkillStaggerMs
      );
      element.style.transitionDelay = delay + 'ms';
      observer.observe(element);
    });
  }

  // ============================================================
  // INITIALIZATION
  // ============================================================

  // Starts each page feature after its DOM elements and content are available.
  function initializePortfolio() {
    initializeHero();
    initializeProjectSlider();
    renderSkills();
    initializeRevealAnimations();
  }

  initializePortfolio();
})();
