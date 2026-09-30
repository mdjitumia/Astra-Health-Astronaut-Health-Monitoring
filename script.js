/* ============ MOCK DATA ============ */
const CREW = {
  maya: {
    id: 'ASTRONAUT 01', name: 'MAYA', role: 'COMMANDER', mission: 'MARS TRANSIT',
    day: '087 / 240', status: 'ATTENTION', statusClass: 'status-attention',
    score: 76, scoreNote: 'Stable with elevated recovery indicators',
    metrics: [
      { name: 'HEART RATE', icon: '♥', value: 82, unit: 'BPM', baseline: 70, change: '+17%', changeDir: 'up', status: 'elevated', color: '#ffaa00', data: [70,72,75,78,80,79,82,81,83,82] },
      { name: 'HRV', icon: '∿', value: 49, unit: 'ms', baseline: 62, change: '-21%', changeDir: 'down', status: 'warning', color: '#ffaa00', data: [62,60,58,55,52,50,48,49,50,49] },
      { name: 'SpO2', icon: '◯', value: 97, unit: '%', baseline: 98, change: '-1%', changeDir: 'down', status: 'normal', color: '#00ff9d', data: [98,98,97,97,98,97,97,98,97,97] },
      { name: 'RESPIRATION', icon: '⟨⟩', value: 17, unit: '/min', baseline: 15, change: '+13%', changeDir: 'up', status: 'normal', color: '#00ff9d', data: [15,15,16,16,17,16,17,17,16,17] },
      { name: 'SLEEP', icon: '☾', value: '5h 52m', unit: '', baseline: '7h 24m', change: '-21%', changeDir: 'down', status: 'reduced', color: '#ffaa00', data: [7.4,7.2,7.0,6.8,6.5,6.2,6.0,5.9,6.0,5.9] },
      { name: 'STRESS', icon: '⚡', value: 68, unit: '/100', baseline: 32, change: '+36%', changeDir: 'up', status: 'elevated', color: '#ffaa00', data: [32,35,40,48,55,60,65,68,67,68] },
      { name: 'ACTIVITY', icon: '◈', value: 72, unit: '%', baseline: 75, change: '-4%', changeDir: 'down', status: 'normal', color: '#00ff9d', data: [75,74,73,74,72,73,72,71,72,72] },
      { name: 'CABIN CO2', icon: '◐', value: 0.42, unit: '%', baseline: 0.4, change: '+5%', changeDir: 'up', status: 'normal', color: '#00ff9d', data: [0.40,0.40,0.41,0.41,0.42,0.42,0.41,0.42,0.42,0.42] }
    ],
    baseline: [
      { name: 'Heart Rate', base: 70, current: 82, max: 100, unit: 'BPM', warn: true },
      { name: 'HRV', base: 62, current: 49, max: 80, unit: 'ms', warn: true },
      { name: 'Sleep', base: 7.4, current: 5.9, max: 9, unit: 'h', warn: true },
      { name: 'Stress', base: 32, current: 68, max: 100, unit: '/100', warn: true }
    ],
    risks: [
      { name: 'CARDIOVASCULAR', value: 74, level: 'ELEVATED', color: '#ffaa00' },
      { name: 'FATIGUE', value: 68, level: 'MODERATE', color: '#ffd24d' },
      { name: 'MENTAL STRESS', value: 71, level: 'ELEVATED', color: '#ffaa00' },
      { name: 'MUSCULOSKELETAL', value: 42, level: 'LOW', color: '#00ff9d' }
    ],
    explain: [
      { name: 'HRV', change: '↓ 21%', dir: 'down', contribution: 'HIGH', pct: 90 },
      { name: 'Sleep', change: '↓ 21%', dir: 'down', contribution: 'HIGH', pct: 85 },
      { name: 'Resting Heart Rate', change: '↑ 17%', dir: 'up', contribution: 'MEDIUM', pct: 60 },
      { name: 'Stress', change: '↑ 36%', dir: 'up', contribution: 'MEDIUM', pct: 55 }
    ],
    insight: 'Cardiovascular risk has increased primarily due to a multi-day decline in HRV and sleep recovery indicators, combined with an elevated resting heart rate.'
  },
  alex: {
    id: 'ASTRONAUT 02', name: 'ALEX', role: 'SPECIALIST', mission: 'MARS TRANSIT',
    day: '087 / 240', status: 'NOMINAL', statusClass: 'status-nominal',
    score: 91, scoreNote: 'All indicators within optimal range',
    metrics: [
      { name: 'HEART RATE', icon: '♥', value: 68, unit: 'BPM', baseline: 70, change: '-3%', changeDir: 'down', status: 'normal', color: '#00ff9d', data: [70,69,68,70,69,68,67,68,69,68] },
      { name: 'HRV', icon: '∿', value: 65, unit: 'ms', baseline: 62, change: '+5%', changeDir: 'up', status: 'normal', color: '#00ff9d', data: [62,63,64,63,65,64,65,66,65,65] },
      { name: 'SpO2', icon: '◯', value: 98, unit: '%', baseline: 98, change: '0%', changeDir: 'neutral', status: 'normal', color: '#00ff9d', data: [98,98,98,99,98,98,98,98,99,98] },
      { name: 'RESPIRATION', icon: '⟨⟩', value: 14, unit: '/min', baseline: 15, change: '-7%', changeDir: 'down', status: 'normal', color: '#00ff9d', data: [15,14,15,14,14,15,14,14,15,14] },
      { name: 'SLEEP', icon: '☾', value: '7h 30m', unit: '', baseline: '7h 24m', change: '+1%', changeDir: 'up', status: 'normal', color: '#00ff9d', data: [7.4,7.5,7.4,7.6,7.5,7.4,7.5,7.3,7.5,7.5] },
      { name: 'STRESS', icon: '⚡', value: 28, unit: '/100', baseline: 32, change: '-13%', changeDir: 'down', status: 'normal', color: '#00ff9d', data: [32,30,29,28,30,29,28,27,28,28] },
      { name: 'ACTIVITY', icon: '◈', value: 78, unit: '%', baseline: 75, change: '+4%', changeDir: 'up', status: 'normal', color: '#00ff9d', data: [75,76,77,78,77,78,79,78,77,78] },
      { name: 'CABIN CO2', icon: '◐', value: 0.40, unit: '%', baseline: 0.4, change: '0%', changeDir: 'neutral', status: 'normal', color: '#00ff9d', data: [0.40,0.40,0.40,0.41,0.40,0.40,0.40,0.41,0.40,0.40] }
    ],
    baseline: [
      { name: 'Heart Rate', base: 70, current: 68, max: 100, unit: 'BPM', warn: false },
      { name: 'HRV', base: 62, current: 65, max: 80, unit: 'ms', warn: false },
      { name: 'Sleep', base: 7.4, current: 7.5, max: 9, unit: 'h', warn: false },
      { name: 'Stress', base: 32, current: 28, max: 100, unit: '/100', warn: false }
    ],
    risks: [
      { name: 'CARDIOVASCULAR', value: 22, level: 'LOW', color: '#00ff9d' },
      { name: 'FATIGUE', value: 28, level: 'LOW', color: '#00ff9d' },
      { name: 'MENTAL STRESS', value: 25, level: 'LOW', color: '#00ff9d' },
      { name: 'MUSCULOSKELETAL', value: 30, level: 'LOW', color: '#00ff9d' }
    ],
    explain: [
      { name: 'HRV', change: '↑ 5%', dir: 'up', contribution: 'LOW', pct: 20 },
      { name: 'Sleep', change: '↑ 1%', dir: 'up', contribution: 'LOW', pct: 15 },
      { name: 'Resting Heart Rate', change: '↓ 3%', dir: 'down', contribution: 'LOW', pct: 18 },
      { name: 'Stress', change: '↓ 13%', dir: 'down', contribution: 'LOW', pct: 25 }
    ],
    insight: 'All indicators remain within personal baseline. No significant risk factors detected. Continue standard monitoring protocol.'
  },
  noah: {
    id: 'ASTRONAUT 03', name: 'NOAH', role: 'PILOT', mission: 'MARS TRANSIT',
    day: '087 / 240', status: 'NOMINAL', statusClass: 'status-nominal',
    score: 88, scoreNote: 'Stable with minor adaptation indicators',
    metrics: [
      { name: 'HEART RATE', icon: '♥', value: 72, unit: 'BPM', baseline: 68, change: '+6%', changeDir: 'up', status: 'normal', color: '#00ff9d', data: [68,69,70,71,72,71,72,73,72,72] },
      { name: 'HRV', icon: '∿', value: 58, unit: 'ms', baseline: 60, change: '-3%', changeDir: 'down', status: 'normal', color: '#00ff9d', data: [60,59,60,58,59,58,57,58,59,58] },
      { name: 'SpO2', icon: '◯', value: 98, unit: '%', baseline: 98, change: '0%', changeDir: 'neutral', status: 'normal', color: '#00ff9d', data: [98,98,97,98,98,98,97,98,98,98] },
      { name: 'RESPIRATION', icon: '⟨⟩', value: 15, unit: '/min', baseline: 15, change: '0%', changeDir: 'neutral', status: 'normal', color: '#00ff9d', data: [15,15,16,15,15,16,15,15,15,15] },
      { name: 'SLEEP', icon: '☾', value: '7h 10m', unit: '', baseline: '7h 24m', change: '-3%', changeDir: 'down', status: 'normal', color: '#00ff9d', data: [7.4,7.3,7.2,7.1,7.2,7.1,7.0,7.1,7.2,7.1] },
      { name: 'STRESS', icon: '⚡', value: 38, unit: '/100', baseline: 35, change: '+9%', changeDir: 'up', status: 'normal', color: '#00ff9d', data: [35,36,37,38,37,38,39,38,37,38] },
      { name: 'ACTIVITY', icon: '◈', value: 76, unit: '%', baseline: 75, change: '+1%', changeDir: 'up', status: 'normal', color: '#00ff9d', data: [75,76,75,76,77,76,76,77,76,76] },
      { name: 'CABIN CO2', icon: '◐', value: 0.41, unit: '%', baseline: 0.4, change: '+2%', changeDir: 'up', status: 'normal', color: '#00ff9d', data: [0.40,0.40,0.41,0.41,0.40,0.41,0.41,0.40,0.41,0.41] }
    ],
    baseline: [
      { name: 'Heart Rate', base: 68, current: 72, max: 100, unit: 'BPM', warn: false },
      { name: 'HRV', base: 60, current: 58, max: 80, unit: 'ms', warn: false },
      { name: 'Sleep', base: 7.4, current: 7.1, max: 9, unit: 'h', warn: false },
      { name: 'Stress', base: 35, current: 38, max: 100, unit: '/100', warn: false }
    ],
    risks: [
      { name: 'CARDIOVASCULAR', value: 32, level: 'LOW', color: '#00ff9d' },
      { name: 'FATIGUE', value: 38, level: 'LOW', color: '#00ff9d' },
      { name: 'MENTAL STRESS', value: 42, level: 'MODERATE', color: '#ffd24d' },
      { name: 'MUSCULOSKELETAL', value: 35, level: 'LOW', color: '#00ff9d' }
    ],
    explain: [
      { name: 'HRV', change: '↓ 3%', dir: 'down', contribution: 'LOW', pct: 25 },
      { name: 'Sleep', change: '↓ 3%', dir: 'down', contribution: 'LOW', pct: 22 },
      { name: 'Resting Heart Rate', change: '↑ 6%', dir: 'up', contribution: 'MEDIUM', pct: 45 },
      { name: 'Stress', change: '↑ 9%', dir: 'up', contribution: 'LOW', pct: 30 }
    ],
    insight: 'Minor adaptation indicators present. All values remain within acceptable range. Continued monitoring recommended.'
  },
  luna: {
    id: 'ASTRONAUT 04', name: 'LUNA', role: 'SCIENTIST', mission: 'MARS TRANSIT',
    day: '087 / 240', status: 'MONITOR', statusClass: 'status-monitor',
    score: 82, scoreNote: 'Slight elevation in stress indicators',
    metrics: [
      { name: 'HEART RATE', icon: '♥', value: 76, unit: 'BPM', baseline: 72, change: '+6%', changeDir: 'up', status: 'normal', color: '#00ff9d', data: [72,73,74,75,76,75,76,77,76,76] },
      { name: 'HRV', icon: '∿', value: 55, unit: 'ms', baseline: 60, change: '-8%', changeDir: 'down', status: 'normal', color: '#00ff9d', data: [60,59,58,57,56,55,55,56,55,55] },
      { name: 'SpO2', icon: '◯', value: 97, unit: '%', baseline: 98, change: '-1%', changeDir: 'down', status: 'normal', color: '#00ff9d', data: [98,98,97,97,98,97,97,97,98,97] },
      { name: 'RESPIRATION', icon: '⟨⟩', value: 16, unit: '/min', baseline: 15, change: '+7%', changeDir: 'up', status: 'normal', color: '#00ff9d', data: [15,15,16,16,15,16,16,15,16,16] },
      { name: 'SLEEP', icon: '☾', value: '6h 40m', unit: '', baseline: '7h 20m', change: '-9%', changeDir: 'down', status: 'normal', color: '#00ff9d', data: [7.3,7.2,7.0,6.9,6.8,6.7,6.7,6.8,6.7,6.7] },
      { name: 'STRESS', icon: '⚡', value: 52, unit: '/100', baseline: 35, change: '+49%', changeDir: 'up', status: 'elevated', color: '#ffaa00', data: [35,40,45,48,50,52,51,53,52,52] },
      { name: 'ACTIVITY', icon: '◈', value: 74, unit: '%', baseline: 75, change: '-1%', changeDir: 'down', status: 'normal', color: '#00ff9d', data: [75,74,75,74,73,74,74,73,74,74] },
      { name: 'CABIN CO2', icon: '◐', value: 0.41, unit: '%', baseline: 0.4, change: '+2%', changeDir: 'up', status: 'normal', color: '#00ff9d', data: [0.40,0.40,0.41,0.41,0.40,0.41,0.41,0.40,0.41,0.41] }
    ],
    baseline: [
      { name: 'Heart Rate', base: 72, current: 76, max: 100, unit: 'BPM', warn: false },
      { name: 'HRV', base: 60, current: 55, max: 80, unit: 'ms', warn: false },
      { name: 'Sleep', base: 7.3, current: 6.7, max: 9, unit: 'h', warn: false },
      { name: 'Stress', base: 35, current: 52, max: 100, unit: '/100', warn: true }
    ],
    risks: [
      { name: 'CARDIOVASCULAR', value: 45, level: 'LOW', color: '#00ff9d' },
      { name: 'FATIGUE', value: 52, level: 'MODERATE', color: '#ffd24d' },
      { name: 'MENTAL STRESS', value: 58, level: 'MODERATE', color: '#ffd24d' },
      { name: 'MUSCULOSKELETAL', value: 38, level: 'LOW', color: '#00ff9d' }
    ],
    explain: [
      { name: 'HRV', change: '↓ 8%', dir: 'down', contribution: 'MEDIUM', pct: 50 },
      { name: 'Sleep', change: '↓ 9%', dir: 'down', contribution: 'MEDIUM', pct: 55 },
      { name: 'Resting Heart Rate', change: '↑ 6%', dir: 'up', contribution: 'LOW', pct: 30 },
      { name: 'Stress', change: '↑ 49%', dir: 'up', contribution: 'HIGH', pct: 80 }
    ],
    insight: 'Mental stress indicators showing moderate elevation. Recommend monitoring workload and scheduling additional recovery time.'
  }
};

const TIMELINE = [
  { day: '01', desc: 'Baseline established', detail: 'Personal physiological baseline established for all crew members during pre-transit phase. All indicators within nominal range.' },
  { day: '30', desc: 'Normal adaptation', detail: 'Crew showing expected adaptation to microgravity environment. Minor HRV fluctuations observed but within normal parameters.' },
  { day: '60', desc: 'Stable', detail: 'All health indicators stable. Sleep patterns normalized. Stress levels managed effectively through scheduled protocols.' },
  { day: '83', desc: 'Recovery decline detected', detail: 'AI trend detection identified gradual decline in recovery indicators for Commander Maya. HRV trending downward over 72-hour window.' },
  { day: '87', desc: 'Early warning generated', detail: 'Composite risk score elevated to ATTENTION level. Cardiovascular and fatigue risk factors above threshold. Countermeasure recommended.' },
  { day: '88', desc: 'Countermeasure initiated', detail: 'Recovery protocol initiated. Monitoring frequency adapted to 10-second intervals. Local AI processing active for continuous assessment.' }
];

const TIMELINE_MINI = [
  { day: '83', label: 'Normal', cls: 'normal' },
  { day: '84', label: 'Normal', cls: 'normal' },
  { day: '85', label: 'Recovery ↓', cls: 'warning' },
  { day: '86', label: 'HRV ↓', cls: 'warning' },
  { day: '87', label: 'Risk Elevated', cls: 'elevated' }
];

let currentCrew = 'maya';

/* ============ RENDER METRICS ============ */
function renderMetrics(crew) {
  const grid = document.getElementById('metricsGrid');
  grid.innerHTML = '';
  crew.metrics.forEach((m, i) => {
    const card = document.createElement('div');
    card.className = 'metric-card';
    card.style.setProperty('--card-color', m.color);
    card.innerHTML = `
      <div class="mc-head">
        <div class="mc-icon">${m.icon}</div>
        <div class="mc-name">${m.name}</div>
        <div class="mc-status ${m.status}">${m.status.toUpperCase()}</div>
      </div>
      <div><span class="mc-value">${m.value}</span><span class="mc-unit">${m.unit}</span></div>
      <div class="mc-baseline">
        <span>Baseline: <b>${m.baseline}</b></span>
        <span class="mc-change ${m.changeDir}">${m.change}</span>
      </div>
      <canvas class="mc-spark" id="spark${i}" width="200" height="28"></canvas>
    `;
    grid.appendChild(card);
    drawSpark(`spark${i}`, m.data, m.color);
  });
}

function drawSpark(id, data, color) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.shadowColor = color;
  ctx.shadowBlur = 6;
  ctx.beginPath();
  data.forEach((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  // gradient fill
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, color + '40');
  grad.addColorStop(1, color + '00');
  ctx.fillStyle = grad;
  ctx.fill();
}

/* ============ BASELINE ============ */
function renderBaseline(crew) {
  const list = document.getElementById('baselineList');
  list.innerHTML = '';
  crew.baseline.forEach(b => {
    const row = document.createElement('div');
    row.className = 'baseline-row';
    row.innerHTML = `
      <div class="br-label"><span>${b.name}</span><span>Baseline ${b.base}${b.unit} · Current <b style="color:${b.warn ? '#ffaa00' : '#00d4ff'}">${b.current}${b.unit}</b></span></div>
      <div class="br-bars">
        <div class="br-bar baseline"><div class="br-bar-fill" style="width:0%" data-w="${(b.base/b.max)*100}"></div></div>
        <div class="br-bar current ${b.warn ? 'warning' : ''}"><div class="br-bar-fill" style="width:0%" data-w="${(b.current/b.max)*100}"></div></div>
      </div>
    `;
    list.appendChild(row);
  });
  // animate
  setTimeout(() => {
    list.querySelectorAll('.br-bar-fill').forEach(el => {
      el.style.width = el.dataset.w + '%';
    });
  }, 100);
}

/* ============ RISK GAUGES ============ */
function renderRisks(crew) {
  const grid = document.getElementById('riskGrid');
  grid.innerHTML = '';
  crew.risks.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'risk-card';
    card.style.setProperty('--risk-color', r.color);
    const circumference = 2 * Math.PI * 50;
    const offset = circumference * (1 - r.value / 100);
    card.innerHTML = `
      <div class="risk-gauge">
        <svg viewBox="0 0 120 120">
          <circle class="track" cx="60" cy="60" r="50"/>
          <circle class="indicator" cx="60" cy="60" r="50" stroke="${r.color}"
                  stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}"
                  data-offset="${offset}"/>
        </svg>
        <div class="center">
          <div class="risk-val">${r.value}</div>
          <div class="risk-pct">%</div>
        </div>
      </div>
      <div class="risk-name">${r.name}</div>
      <div class="risk-level ${r.level.toLowerCase()}">${r.level}</div>
    `;
    grid.appendChild(card);
  });
  setTimeout(() => {
    grid.querySelectorAll('.indicator').forEach(ind => {
      ind.style.strokeDashoffset = ind.dataset.offset;
    });
  }, 200);
}

/* ============ EXPLAINABLE AI ============ */
function renderExplain(crew) {
  const list = document.getElementById('explainList');
  list.innerHTML = '';
  crew.explain.forEach(e => {
    const item = document.createElement('div');
    item.className = 'explain-item';
    item.innerHTML = `
      <div class="ei-name">${e.name}</div>
      <div class="ei-change ${e.dir}">${e.change}</div>
      <div class="ei-contribution">
        <div class="ei-bar"><div class="ei-bar-fill ${e.contribution.toLowerCase()}" data-w="${e.pct}"></div></div>
        <span>${e.contribution}</span>
      </div>
    `;
    list.appendChild(item);
  });
  document.getElementById('aiInsightText').textContent = crew.insight;
  setTimeout(() => {
    list.querySelectorAll('.ei-bar-fill').forEach(el => {
      el.style.width = el.dataset.w + '%';
    });
  }, 200);
}

/* ============ TIMELINE MINI ============ */
function renderTimelineMini() {
  const c = document.getElementById('timelineMini');
  c.innerHTML = '';
  TIMELINE_MINI.forEach(t => {
    c.innerHTML += `
      <div class="tm-node">
        <div class="tm-day">DAY ${t.day}</div>
        <div class="tm-dot ${t.cls}"></div>
        <div class="tm-label">${t.label}</div>
      </div>`;
  });
}

/* ============ MISSION TIMELINE ============ */
function renderMissionTimeline() {
  const t = document.getElementById('missionTimeline');
  t.innerHTML = '';
  TIMELINE.forEach((ev, i) => {
    const cls = i >= 4 ? 'warning' : '';
    const active = i === 5 ? 'active' : '';
    t.innerHTML += `
      <div class="tl-event ${cls} ${active}" data-idx="${i}">
        <div class="tl-day">DAY ${ev.day}</div>
        <div class="tl-dot"></div>
        <div class="tl-desc">${ev.desc}</div>
      </div>`;
  });
  t.querySelectorAll('.tl-event').forEach(el => {
    el.addEventListener('click', () => {
      t.querySelectorAll('.tl-event').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      const idx = parseInt(el.dataset.idx);
      document.getElementById('timelineDetail').innerHTML = `<b style="color:#00d4ff">MISSION DAY ${TIMELINE[idx].day}:</b> ${TIMELINE[idx].detail}`;
    });
  });
  document.getElementById('timelineDetail').innerHTML = `<b style="color:#00d4ff">MISSION DAY 88:</b> ${TIMELINE[5].detail}`;
}

/* ============ CREW GRID ============ */
function renderCrewGrid() {
  const g = document.getElementById('crewGrid');
  g.innerHTML = '';
  Object.entries(CREW).forEach(([key, c]) => {
    const card = document.createElement('div');
    card.className = 'crew-card' + (key === currentCrew ? ' active' : '');
    card.dataset.key = key;
    card.innerHTML = `
      <div class="crew-avatar">${c.name[0]}</div>
      <div class="crew-info">
        <div class="crew-id">${c.id}</div>
        <div class="crew-name">${c.name}</div>
        <div class="crew-status ${c.status.toLowerCase()}">${c.status}</div>
      </div>
      <div class="crew-hi">${c.score}</div>
    `;
    card.addEventListener('click', () => switchCrew(key));
    g.appendChild(card);
  });
}

function switchCrew(key) {
  currentCrew = key;
  const c = CREW[key];
  document.querySelectorAll('.crew-card').forEach(el => el.classList.toggle('active', el.dataset.key === key));
  document.getElementById('astroName').textContent = c.name;
  document.getElementById('astroStatus').textContent = c.status;
  document.getElementById('astroStatus').className = c.statusClass;
  document.getElementById('missionDayProgress').textContent = c.day;
  document.getElementById('scoreValue').textContent = c.score;
  document.getElementById('scoreNote').textContent = c.scoreNote;
  // update ring
  const arc = document.getElementById('scoreArc');
  const circ = 553;
  arc.style.strokeDashoffset = circ * (1 - c.score / 100);
  arc.style.stroke = c.score >= 85 ? '#00ff9d' : c.score >= 75 ? '#00d4ff' : '#ffaa00';
  // avatar mini stats
  const hr = c.metrics[0].value;
  document.getElementById('avHeart').textContent = hr;
  document.getElementById('avSleep').textContent = c.metrics[4].value.toString().split(' ')[0] + 'h';
  document.getElementById('avStress').textContent = c.metrics[5].value;
  document.getElementById('avOxy').textContent = c.metrics[2].value + '%';
  document.getElementById('avAct').textContent = c.metrics[6].value + '%';
  document.getElementById('liveBpm').textContent = hr;
  document.getElementById('liveHrv').textContent = c.metrics[1].value;

  renderMetrics(c);
  renderBaseline(c);
  renderRisks(c);
  renderExplain(c);
  updateAdaptive(c);
  showToast('info', '◉', `Switched to ${c.name} · ${c.id}`);
}

/* ============ ECG CHART ============ */
const ecgCanvas = document.getElementById('ecgCanvas');
const ecgCtx = ecgCanvas.getContext('2d');
let ecgData = [];
let ecgHrvData = [];
const ECG_LEN = 200;

function initEcg() {
  for (let i = 0; i < ECG_LEN; i++) {
    ecgData.push(70 + Math.sin(i * 0.15) * 5 + (Math.random() - 0.5) * 4);
    ecgHrvData.push(55 + Math.sin(i * 0.08) * 6 + (Math.random() - 0.5) * 3);
  }
}

function resizeEcg() {
  const rect = ecgCanvas.getBoundingClientRect();
  ecgCanvas.width = rect.width;
  ecgCanvas.height = 280;
}

function drawEcg() {
  const w = ecgCanvas.width, h = ecgCanvas.height;
  ecgCtx.clearRect(0, 0, w, h);
  // grid
  ecgCtx.strokeStyle = 'rgba(0, 212, 255, 0.06)';
  ecgCtx.lineWidth = 1;
  for (let x = 0; x < w; x += 40) {
    ecgCtx.beginPath(); ecgCtx.moveTo(x, 0); ecgCtx.lineTo(x, h); ecgCtx.stroke();
  }
  for (let y = 0; y < h; y += 40) {
    ecgCtx.beginPath(); ecgCtx.moveTo(0, y); ecgCtx.lineTo(w, y); ecgCtx.stroke();
  }
  // center line
  ecgCtx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
  ecgCtx.beginPath(); ecgCtx.moveTo(0, h / 2); ecgCtx.lineTo(w, h / 2); ecgCtx.stroke();

  // HRV line (background)
  ecgCtx.strokeStyle = 'rgba(77, 159, 255, 0.5)';
  ecgCtx.lineWidth = 1.5;
  ecgCtx.shadowColor = '#4d9fff';
  ecgCtx.shadowBlur = 4;
  ecgCtx.beginPath();
  ecgHrvData.forEach((v, i) => {
    const x = (i / (ECG_LEN - 1)) * w;
    const y = h - ((v - 40) / 50) * h * 0.8 - h * 0.1;
    if (i === 0) ecgCtx.moveTo(x, y); else ecgCtx.lineTo(x, y);
  });
  ecgCtx.stroke();

  // HR line (foreground, with ECG-like pulses)
  ecgCtx.strokeStyle = '#00d4ff';
  ecgCtx.lineWidth = 2;
  ecgCtx.shadowColor = '#00d4ff';
  ecgCtx.shadowBlur = 8;
  ecgCtx.beginPath();
  ecgData.forEach((v, i) => {
    const x = (i / (ECG_LEN - 1)) * w;
    let y = h - ((v - 50) / 50) * h * 0.7 - h * 0.15;
    // heartbeat spike every ~25 points
    if (i % 25 < 3) y -= 30 * Math.sin((i % 25) * Math.PI / 3);
    if (i % 25 < 1) y += 20;
    if (i === 0) ecgCtx.moveTo(x, y); else ecgCtx.lineTo(x, y);
  });
  ecgCtx.stroke();
  ecgCtx.shadowBlur = 0;

  // moving scan line
  const scanX = (Date.now() / 20) % w;
  const grad = ecgCtx.createLinearGradient(scanX - 40, 0, scanX, 0);
  grad.addColorStop(0, 'rgba(0, 212, 255, 0)');
  grad.addColorStop(1, 'rgba(0, 212, 255, 0.4)');
  ecgCtx.fillStyle = grad;
  ecgCtx.fillRect(scanX - 40, 0, 40, h);
  ecgCtx.fillStyle = 'rgba(0, 212, 255, 0.8)';
  ecgCtx.fillRect(scanX, 0, 2, h);
}

function updateEcg() {
  const c = CREW[currentCrew];
  const baseHr = typeof c.metrics[0].value === 'number' ? c.metrics[0].value : 80;
  const baseHrv = typeof c.metrics[1].value === 'number' ? c.metrics[1].value : 50;
  ecgData.shift();
  ecgData.push(baseHr + Math.sin(Date.now() / 500) * 4 + (Math.random() - 0.5) * 3);
  ecgHrvData.shift();
  ecgHrvData.push(baseHrv + Math.sin(Date.now() / 800) * 5 + (Math.random() - 0.5) * 2);
}

/* ============ ADAPTIVE ============ */
function updateAdaptive(crew) {
  let freq = 30, activeTier = 'normal';
  const maxRisk = Math.max(...crew.risks.map(r => r.value));
  if (maxRisk >= 70) { freq = 10; activeTier = 'warning'; }
  if (maxRisk >= 85) { freq = 5; activeTier = 'critical'; }
  document.getElementById('adaptiveFreq').textContent = freq;
  document.querySelectorAll('.tier').forEach(t => {
    t.classList.toggle('active', t.dataset.tier === activeTier);
  });
}

/* ============ TOAST ============ */
function showToast(type, icon, msg) {
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<div class="toast-icon">${icon}</div><div>${msg}</div>`;
  c.appendChild(t);
  setTimeout(() => {
    t.classList.add('removing');
    setTimeout(() => t.remove(), 300);
  }, 4000);
}

/* ============ MODAL ============ */
function openModal(title, bodyHtml) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = bodyHtml;
  document.getElementById('modalOverlay').classList.add('active');
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') closeModal();
});

/* ============ RISK MODAL ============ */
document.getElementById('openRiskModal').addEventListener('click', () => {
  const c = CREW[currentCrew];
  let html = `
    <p>Composite AI risk assessment for <b style="color:#00d4ff">${c.name}</b> · ${c.id}</p>
    <h3>RISK BREAKDOWN</h3>
  `;
  c.risks.forEach(r => {
    html += `<div class="ml-row"><span>${r.name}</span><b style="color:${r.color}">${r.value}% · ${r.level}</b></div>`;
  });
  html += `<h3>CONTRIBUTING FACTORS</h3>`;
  c.explain.forEach(e => {
    html += `<div class="ml-row"><span>${e.name} (${e.change})</span><b>${e.contribution}</b></div>`;
  });
  html += `<h3>RECOMMENDED ACTION</h3><p>${c.insight}</p>`;
  html += `<div class="disclaimer">⚠ Prototype AI-generated assessment — not a medical diagnosis.</div>`;
  openModal('AI RISK ANALYSIS — FULL REPORT', html);
});

/* ============ TREND MODAL ============ */
document.getElementById('openTrendModal').addEventListener('click', () => {
  openModal('TREND DETECTION — 5 DAY ANALYSIS', `
    <p>Multi-day trend analysis detected a <b style="color:#ffaa00">4-day recovery decline</b> pattern. Trend confidence: <b style="color:#00d4ff">86%</b>.</p>
    <h3>RISK TRAJECTORY</h3>
    <canvas id="trendCanvas" width="640" height="260"></canvas>
    <h3>DETECTED PATTERN</h3>
    <div class="ml-row"><span>DAY 83 → 84</span><b style="color:#00ff9d">Stable</b></div>
    <div class="ml-row"><span>DAY 84 → 85</span><b style="color:#ffaa00">Recovery -8%</b></div>
    <div class="ml-row"><span>DAY 85 → 86</span><b style="color:#ffaa00">HRV -12%</b></div>
    <div class="ml-row"><span>DAY 86 → 87</span><b style="color:#ff3b5c">Risk +18%</b></div>
    <div class="disclaimer">⚠ Trend detection is a prototype simulation — not a clinical prediction.</div>
  `);
  setTimeout(drawTrendChart, 100);
});

function drawTrendChart() {
  const canvas = document.getElementById('trendCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  // grid
  ctx.strokeStyle = 'rgba(0, 212, 255, 0.06)';
  for (let x = 0; x < w; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
  for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  // risk line
  const risk = [25, 28, 45, 60, 74];
  const hrv = [62, 60, 56, 52, 49];
  ctx.strokeStyle = '#ff3b5c'; ctx.lineWidth = 2.5; ctx.shadowColor = '#ff3b5c'; ctx.shadowBlur = 8;
  ctx.beginPath();
  risk.forEach((v, i) => {
    const x = (i / 4) * (w - 60) + 30;
    const y = h - (v / 100) * (h - 40) - 20;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  // points
  ctx.fillStyle = '#ff3b5c';
  risk.forEach((v, i) => {
    const x = (i / 4) * (w - 60) + 30;
    const y = h - (v / 100) * (h - 40) - 20;
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText(`D${83 + i}`, x - 8, y - 10);
    ctx.fillStyle = '#ff3b5c';
  });
  // hrv line
  ctx.strokeStyle = '#00d4ff'; ctx.shadowColor = '#00d4ff';
  ctx.beginPath();
  hrv.forEach((v, i) => {
    const x = (i / 4) * (w - 60) + 30;
    const y = h - ((v - 40) / 30) * (h - 40) - 20;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.shadowBlur = 0;
  // legend
  ctx.fillStyle = '#ff3b5c'; ctx.font = '11px Space Grotesk';
  ctx.fillText('● RISK SCORE', 20, 20);
  ctx.fillStyle = '#00d4ff';
  ctx.fillText('● HRV', 130, 20);
}

/* ============ RECOVERY PROTOCOL ============ */
let recoveryActive = false;
document.getElementById('startRecovery').addEventListener('click', () => {
  if (recoveryActive) return;
  openModal('RECOVERY PROTOCOL', `
    <p>Initiating 30-second simulated recovery protocol for <b style="color:#00d4ff">${CREW[currentCrew].name}</b>.</p>
    <p style="color:#6a8cb0;font-size:11px">This is a visual prototype simulation — not a real medical intervention.</p>
    <div class="recovery-progress">
      <div class="rp-bar"><div class="rp-bar-fill" id="rpFill"></div></div>
      <div class="rp-time" id="rpTime">30s</div>
      <div class="rp-status" id="rpStatus">INITIATING...</div>
    </div>
    <h3>PROTOCOL STEPS</h3>
    <div class="ml-row"><span>01</span><b>Recovery period active</b></div>
    <div class="ml-row"><span>02</span><b>Workload adjustment</b></div>
    <div class="ml-row"><span>03</span><b>Hydration check</b></div>
    <div class="ml-row"><span>04</span><b>Re-monitoring indicators</b></div>
  `);
  startRecoverySimulation();
});

function startRecoverySimulation() {
  recoveryActive = true;
  let time = 30;
  showToast('success', '✓', 'Recovery protocol started');
  const fill = document.getElementById('rpFill');
  const timeEl = document.getElementById('rpTime');
  const statusEl = document.getElementById('rpStatus');
  const interval = setInterval(() => {
    time -= 1;
    const pct = ((30 - time) / 30) * 100;
    fill.style.width = pct + '%';
    timeEl.textContent = time + 's';
    if (pct < 30) statusEl.textContent = 'PHASE 1 · RECOVERY INITIATED';
    else if (pct < 60) statusEl.textContent = 'PHASE 2 · INDICATORS STABILIZING';
    else if (pct < 90) statusEl.textContent = 'PHASE 3 · INDICATORS IMPROVING';
    else statusEl.textContent = 'COMPLETE · INDICATORS IMPROVED';

    // gradually update HRV/HR
    if (time % 5 === 0) {
      const c = CREW[currentCrew];
      if (typeof c.metrics[0].value === 'number' && c.metrics[0].value > 70) {
        c.metrics[0].value -= 1;
        document.getElementById('liveBpm').textContent = c.metrics[0].value;
      }
      if (typeof c.metrics[1].value === 'number' && c.metrics[1].value < 60) {
        c.metrics[1].value += 1;
        document.getElementById('liveHrv').textContent = c.metrics[1].value;
      }
    }

    if (time <= 0) {
      clearInterval(interval);
      recoveryActive = false;
      statusEl.textContent = '✓ RECOVERY INDICATORS IMPROVING';
      // update score
      const c = CREW[currentCrew];
      if (c.score < 85) {
        c.score += 6;
        document.getElementById('scoreValue').textContent = c.score;
        const arc = document.getElementById('scoreArc');
        arc.style.strokeDashoffset = 553 * (1 - c.score / 100);
        document.getElementById('astroStatus').textContent = 'IMPROVING';
        document.getElementById('astroStatus').className = 'status-improving';
        document.getElementById('scoreNote').textContent = 'Recovery indicators improving';
      }
      showToast('success', '✓', 'Recovery complete · Indicators improving');
    }
  }, 1000);
}

/* ============ COPILOT CHAT ============ */
const CHAT_RESPONSES = [
  { keys: ['cardiovascular', 'risk', 'heart'], reply: 'Your risk increased mainly because HRV has declined by 21% and sleep duration has decreased by 21% compared with your personal baseline.' },
  { keys: ['do', 'should', 'action'], reply: 'Review your scheduled recovery protocol, reduce non-essential workload, and recheck your monitored indicators after the recovery period.' },
  { keys: ['hrv', 'recovery'], reply: 'HRV decline of 21% over 4 days suggests reduced autonomic recovery. Initiating recovery protocol is recommended to restore baseline variability.' },
  { keys: ['sleep'], reply: 'Your current sleep duration is 5h 52m, which is 21% below your personal baseline of 7h 24m. Sleep recovery is a high contribution factor to current risk elevation.' },
  { keys: ['stress'], reply: 'Stress levels are at 68/100, which is 36% above your baseline. Stress management protocols and reduced workload are recommended.' },
  { keys: ['baseline', 'personal'], reply: 'Your personal baseline was established on Mission Day 01. Current measurements are compared against your individual pre-mission values rather than universal thresholds.' },
  { keys: ['monitor', 'frequency'], reply: 'Adaptive monitoring is currently set to 10-second intervals due to detected warning level. Frequency will return to 30 seconds once risk normalizes.' },
  { keys: ['deep space', 'delay', 'communication'], reply: 'In Deep Space Mode, local AI processing allows preliminary health assessment during communication delays of up to 12 minutes with Earth.' },
  { keys: ['protocol', 'recovery'], reply: 'The recovery protocol includes: 1) Recovery period 2) Exercise workload review 3) Hydration check 4) Re-monitoring of physiological indicators.' },
  { keys: ['hello', 'hi', 'hey'], reply: 'Hello. I am ASTRA, your onboard health decision-support assistant. I can explain your risk factors, recommend actions, and analyze your health indicators.' }
];

const DEFAULT_REPLY = 'I can analyze your cardiovascular risk, sleep patterns, stress levels, recovery indicators, and recommend countermeasures. Try asking about HRV, sleep, stress, or recommended actions.';

function initChat() {
  const box = document.getElementById('chatBox');
  box.innerHTML = '';
  addChatMsg('astronaut', 'ASTRONAUT', 'Why is my cardiovascular risk increasing?');
  setTimeout(() => addChatMsg('ai', 'ASTRA AI', 'Your risk increased mainly because HRV has declined by 21% and sleep duration has decreased by 21% compared with your personal baseline.'), 600);
  setTimeout(() => addChatMsg('astronaut', 'ASTRONAUT', 'What should I do?'), 1400);
  setTimeout(() => addChatMsg('ai', 'ASTRA AI', 'Review your scheduled recovery protocol, reduce non-essential workload, and recheck your monitored indicators after the recovery period.'), 2200);
}

function addChatMsg(type, name, text) {
  const box = document.getElementById('chatBox');
  const msg = document.createElement('div');
  msg.className = `chat-msg ${type}`;
  msg.innerHTML = `
    <div class="chat-avatar">${type === 'ai' ? '✦' : '◉'}</div>
    <div>
      <div class="chat-name">${name}</div>
      <div class="chat-bubble">${text}</div>
    </div>
  `;
  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  addChatMsg('astronaut', 'ASTRONAUT', text);
  input.value = '';
  setTimeout(() => {
    const lower = text.toLowerCase();
    let reply = DEFAULT_REPLY;
    for (const r of CHAT_RESPONSES) {
      if (r.keys.some(k => lower.includes(k))) { reply = r.reply; break; }
    }
    addChatMsg('ai', 'ASTRA AI', reply);
  }, 700);
}
document.getElementById('chatSend').addEventListener('click', sendChat);
document.getElementById('chatInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendChat();
});

/* ============ DEEP SPACE TOGGLE ============ */
let deepMode = false;
document.getElementById('deepToggle').addEventListener('click', () => {
  deepMode = !deepMode;
  const t = document.getElementById('deepToggle');
  const label = document.getElementById('toggleLabel');
  const status = document.getElementById('deepStatus');
  if (deepMode) {
    t.classList.add('delayed');
    label.textContent = 'DELAYED';
    status.innerHTML = `
      <div class="ds-row"><span>COMMUNICATION DELAY</span><b class="ds-delayed">12m 34s</b></div>
      <div class="ds-row"><span>EARTH MEDICAL SUPPORT</span><b class="ds-delayed">DELAYED</b></div>
      <div class="ds-row"><span>LOCAL AI HEALTH SUPPORT</span><b class="ds-active">ACTIVE</b></div>
    `;
    showToast('warn', '⚠', 'Deep Space Mode activated · Earth communication delayed');
  } else {
    t.classList.remove('delayed');
    label.textContent = 'ON';
    status.innerHTML = `
      <div class="ds-row"><span>COMMUNICATION DELAY</span><b class="ds-ok">REAL-TIME</b></div>
      <div class="ds-row"><span>EARTH MEDICAL SUPPORT</span><b class="ds-ok">AVAILABLE</b></div>
      <div class="ds-row"><span>LOCAL AI HEALTH SUPPORT</span><b>STANDBY</b></div>
    `;
    showToast('info', '◉', 'Earth connection restored · Real-time mode');
  }
});

/* ============ SCORE RING INIT ============ */
function initScoreRing() {
  const arc = document.getElementById('scoreArc');
  const score = CREW[currentCrew].score;
  setTimeout(() => {
    arc.style.strokeDashoffset = 553 * (1 - score / 100);
  }, 300);
}

/* ============ LIVE FLUCTUATION ============ */
function liveFluctuate() {
  const c = CREW[currentCrew];
  // small variation in heart rate display
  const hrMetric = c.metrics[0];
  if (typeof hrMetric.value === 'number') {
    const variation = (Math.random() - 0.5) * 2;
    const displayed = Math.round(hrMetric.value + variation);
    document.getElementById('liveBpm').textContent = displayed;
    document.getElementById('avHeart').textContent = displayed;
  }
  const hrvMetric = c.metrics[1];
  if (typeof hrvMetric.value === 'number') {
    const variation = Math.round((Math.random() - 0.5) * 2);
    const displayed = hrvMetric.value + variation;
    document.getElementById('liveHrv').textContent = displayed;
  }
}

/* ============ ANIMATION LOOP ============ */
function animate() {
  drawEcg();
  requestAnimationFrame(animate);
}

/* ============ INIT ============ */
function init() {
  initEcg();
  resizeEcg();
  renderMetrics(CREW[currentCrew]);
  renderBaseline(CREW[currentCrew]);
  renderRisks(CREW[currentCrew]);
  renderExplain(CREW[currentCrew]);
  renderTimelineMini();
  renderMissionTimeline();
  renderCrewGrid();
  initChat();
  initScoreRing();
  updateAdaptive(CREW[currentCrew]);
  animate();
  setInterval(updateEcg, 80);
  setInterval(liveFluctuate, 2000);

  setTimeout(() => showToast('warn', '⚠', 'Early warning detected · Recovery decline'), 2500);
  setTimeout(() => showToast('info', '◉', 'Local AI processing active'), 6000);
  setTimeout(() => showToast('info', '◉', 'Adaptive monitoring: 10 sec interval'), 10000);
}

window.addEventListener('resize', resizeEcg);
window.addEventListener('load', init);