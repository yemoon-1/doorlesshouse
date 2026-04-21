/* ─── Member data ─── */
const memberData = [
  {
    name: 'Kim Jisoo',
    role: 'Vocals / Guitar',
    bio: 'Main vocalist and primary songwriter. Writes lyrics drawn from personal reflections on memory, architecture, and impermanence. Joined in 2021 and has shaped the band\'s core sound since the start.'
  },
  {
    name: 'Lee Minjun',
    role: 'Bass / Backing Vocals',
    bio: 'Co-founder and bassist. Known for melodic bass lines that anchor the band\'s atmospheric sound. Previously played in Seoul math-rock outfit Sequence before forming Doorless House.'
  },
  {
    name: 'Park Hyunwoo',
    role: 'Drums / Percussion',
    bio: 'Drummer with a background in jazz and post-rock. Brings rhythmic textures that range from sparse brushwork to dense polyrhythms. Joined in 2022.'
  },
  {
    name: 'Choi Yuna',
    role: 'Keyboards / Synthesizer',
    bio: 'Keyboardist and sound designer. Layers ambient textures and melodic lines that define the band\'s signature atmosphere. Studied electronic music composition at Seoul National University.'
  }
];

/* ─── Modal logic (landing page only) ─── */
const modal        = document.getElementById('member-modal');
const modalName    = document.getElementById('modal-name');
const modalRole    = document.getElementById('modal-role');
const modalBio     = document.getElementById('modal-bio');
const modalCloseBtn = document.getElementById('modal-close-btn');

if (modal) {
  document.querySelectorAll('.member-thumb').forEach(el => {
    el.addEventListener('click', () => {
      const m = memberData[parseInt(el.dataset.member, 10)];
      modalName.textContent = m.name;
      modalRole.textContent = m.role;
      modalBio.textContent  = m.bio;
      modal.classList.remove('hidden');
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function closeModal() {
  if (modal) modal.classList.add('hidden');
}

/* ─── Drag-to-scroll (discography page) ─── */
const discoArea = document.getElementById('discoScroll');

if (discoArea) {
  let isDown = false, startX, scrollLeft;

  discoArea.addEventListener('mousedown', e => {
    isDown = true;
    startX     = e.pageX - discoArea.offsetLeft;
    scrollLeft = discoArea.scrollLeft;
  });

  discoArea.addEventListener('mouseleave', () => { isDown = false; });
  discoArea.addEventListener('mouseup',    () => { isDown = false; });

  discoArea.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - discoArea.offsetLeft;
    const walk = (x - startX) * 1.4;
    discoArea.scrollLeft = scrollLeft - walk;
  });
}
