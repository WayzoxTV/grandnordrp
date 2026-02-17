/* grand-nord-shared.js — aurora, stars, snow, reveal */
(function() {

  /* ═══ AURORA CANVAS ═══ */
  const canvas = document.getElementById('aurora-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const auroras = [
      { y:.22, c1:[0,255,200], c2:[0,170,255], spd:.0003, amp:80, freq:.0008, off:0, a:.16 },
      { y:.33, c1:[0,200,255], c2:[123,47,255], spd:.0002, amp:55, freq:.001,  off:2, a:.11 },
      { y:.18, c1:[0,255,150], c2:[0,100,255], spd:.0004, amp:45, freq:.0006, off:4, a:.09 },
    ];
    let t = 0;
    function drawAurora() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      auroras.forEach(a => {
        const cy = canvas.height * a.y;
        const g = ctx.createLinearGradient(0,cy-130,0,cy+130);
        g.addColorStop(0,   `rgba(${a.c1},0)`);
        g.addColorStop(0.4, `rgba(${a.c1},${a.a})`);
        g.addColorStop(0.6, `rgba(${a.c2},${a.a*.7})`);
        g.addColorStop(1,   `rgba(${a.c2},0)`);
        ctx.beginPath();
        for (let x=0; x<canvas.width; x+=4) {
          const w = Math.sin(x*a.freq + t*a.spd*1000 + a.off)*a.amp
                  + Math.sin(x*a.freq*2 + t*a.spd*700 + a.off)*(a.amp*.3);
          x===0 ? ctx.moveTo(x,cy+w) : ctx.lineTo(x,cy+w);
        }
        ctx.lineTo(canvas.width,cy+220);
        ctx.lineTo(0,cy+220);
        ctx.closePath();
        ctx.fillStyle = g;
        ctx.fill();
      });
      t++;
      requestAnimationFrame(drawAurora);
    }
    drawAurora();
  }

  /* ═══ STARS ═══ */
  const starsEl = document.getElementById('stars');
  if (starsEl) {
    for (let i=0; i<180; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const sz = Math.random()*2.2+.5;
      s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${sz}px;height:${sz}px;--d:${(Math.random()*4+2).toFixed(1)}s;--o:${(Math.random()*.5+.3).toFixed(2)};animation-delay:${(Math.random()*5).toFixed(1)}s;`;
      starsEl.appendChild(s);
    }
  }

  /* ═══ SNOW ═══ */
  const snowEl = document.getElementById('snowflakes');
  if (snowEl) {
    const chars = ['❄','❅','❆','·','•'];
    for (let i=0; i<25; i++) {
      const f = document.createElement('div');
      f.className = 'snowflake';
      f.textContent = chars[Math.floor(Math.random()*chars.length)];
      const sz = Math.random()*10+7;
      f.style.cssText = `left:${Math.random()*100}%;--sz:${sz}px;--op:${(Math.random()*.35+.08).toFixed(2)};--spd:${(Math.random()*12+8).toFixed(1)}s;animation-delay:${(Math.random()*15).toFixed(1)}s;font-size:${sz}px;`;
      snowEl.appendChild(f);
    }
  }

  /* ═══ SCROLL REVEAL ═══ */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold:.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* ═══ ACTIVE NAV ═══ */
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

})();
