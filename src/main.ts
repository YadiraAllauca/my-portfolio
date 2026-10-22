import './style.css';

type Project = {
  kind: string;
  title: string;
  intro: string;
  description: string;
  decisions: string[];
  scope: string;
  stack: string[];
  image?: string;
  imageAlt?: string;
  repositories: { label: string; url: string }[];
};
const projects: Record<string, Project> = {
  atril: {
    kind: 'Personal project · Web application',
    title: 'Atril',
    intro: 'Your scores, without losing your place.',
    description:
      'A personal tool for finding, organising and reading PDF scores already on the device. It is built around focused reading, with a local library and two independently controlled scores.',
    decisions: [
      'IndexedDB copies reopen imported folders without reading the original files.',
      'Manual refresh preserves the previous import if reading or saving fails.',
      'Nearby-page rendering and on-demand thumbnails keep memory work bounded.',
      'A priority queue inserts scores and then resumes the original sequence.',
    ],
    scope:
      'Persistent folder linking depends on browser support. There is no OCR, score editing or cloud synchronisation.',
    stack: ['TypeScript', 'Vite', 'PDF.js', 'IndexedDB', 'PWA'],
    image: '/images/atril-split-reader.png',
    imageAlt: 'Two demonstration scores open in the independent Atril readers',
    repositories: [
      { label: 'View code on GitHub', url: 'https://github.com/YadiraAllauca/sheet-music-reader' },
    ],
  },
  mexico: {
    kind: 'Website for a business · Frontend',
    title: 'México Lindo',
    intro: 'From discovering the group to preparing an enquiry.',
    description:
      'A website for Mariachi México Lindo in Ambato. It introduces the group and its videos, with a contact flow that prepares a WhatsApp enquiry including the event date, time and location.',
    decisions: [
      'A static Astro website suited to a focused business need.',
      'A map and geolocation add event context; Leaflet loads when the map opens.',
      'A dedicated form entry point linked from a QR code.',
      'Centralised business information and social metadata for sharing.',
    ],
    scope:
      'The website prepares the message; the visitor sends it in WhatsApp. It does not confirm bookings, pricing or availability.',
    stack: ['Astro', 'TypeScript', 'CSS', 'Leaflet'],
    image: '/images/mexico-lindo.png',
    imageAlt: 'Mariachi México Lindo website homepage',
    repositories: [
      { label: 'View code on GitHub', url: 'https://github.com/YadiraAllauca/mexico-lindo-web' },
    ],
  },
  angelcam: {
    kind: 'Technical assessment · Frontend and backend',
    title: 'Angelcam',
    intro: 'Connecting the interface to the video.',
    description:
      'An integration exercise for a job application. A React frontend and a Django adapter support token access, shared camera listings, live video and recorded segments.',
    decisions: [
      'A frontend/backend contract for profile, cameras, streams and recordings.',
      'HLS player lifecycle management and cancellation of superseded requests.',
      'Date and time filters with UTC requests and interval validation.',
      'Explicit error handling and local tests with simulated responses.',
    ],
    scope:
      'Both repositories belong to one technical assessment. Local checks use simulations; they do not demonstrate a live-camera deployment or represent my work on the company’s codebase.',
    stack: ['React', 'TypeScript', 'Django', 'HLS', 'REST'],
    repositories: [
      { label: 'Frontend repository', url: 'https://github.com/YadiraAllauca/angelcam' },
      { label: 'Backend repository', url: 'https://github.com/YadiraAllauca/angelcam_back' },
    ],
  },
};

const dialog = document.querySelector<HTMLDialogElement>('#project-dialog')!;
const content = document.querySelector<HTMLElement>('#project-content')!;
let projectTrigger: HTMLElement | null = null;
const arrow = '<svg class="icon" aria-hidden="true"><use href="#arrow" /></svg>';

for (const trigger of document.querySelectorAll<HTMLButtonElement>('[data-project]')) {
  trigger.addEventListener('click', () => {
    const project = projects[trigger.dataset.project!];
    if (!project) return;
    projectTrigger = trigger;
    content.innerHTML = `<div class="case-header"><p class="eyebrow">${project.kind}</p><h2 id="project-title">${project.title}</h2><p class="case-intro">${project.intro}</p></div>${project.image ? `<img class="case-image" src="${project.image}" alt="${project.imageAlt}" />` : '<div class="case-code-art" aria-hidden="true"><span>React</span><i>↔</i><span>Django</span><i>↔</i><span>API</span></div>'}<div class="case-body"><p class="case-description">${project.description}</p><h3>Decisions behind the project</h3><ul class="case-decisions">${project.decisions.map((decision) => `<li>${decision}</li>`).join('')}</ul><div class="case-scope"><span>THE SCOPE</span><p>${project.scope}</p></div><ul class="tags">${project.stack.map((technology) => `<li>${technology}</li>`).join('')}</ul><div class="case-actions">${project.repositories.map(({ label, url }) => `<a class="button button-dark" href="${url}" target="_blank" rel="noopener noreferrer">${label}${arrow}</a>`).join('')}</div></div>`;
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.scrollTop = 0;
    dialog.querySelector<HTMLButtonElement>('.dialog-close')!.focus();
  });
}

dialog.querySelector('.dialog-close')!.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  )
    dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  projectTrigger?.focus({ preventScroll: true });
});

const menu = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const navigation = document.querySelector<HTMLElement>('#navigation')!;
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const isOpen = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!isOpen));
  menu.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

const copy = document.querySelector<HTMLButtonElement>('#copy-email')!;
const copyStatus = document.querySelector<HTMLElement>('#copy-status')!;
let copyTimer: ReturnType<typeof setTimeout>;
copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('yadiraallaucac@gmail.com');
    copy.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#check" /></svg>';
    copyStatus.textContent = 'Email copied';
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copy.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#copy" /></svg>';
      copyStatus.textContent = '';
    }, 3000);
  } catch {
    copyStatus.textContent = 'You can select the email address or click it to get in touch.';
  }
});

document.querySelector('#year')!.textContent = String(new Date().getFullYear());
const reveal = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.06 },
);
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion-ready');
  document.querySelectorAll('[data-reveal]').forEach((element) => reveal.observe(element));
}

const sections = document.querySelectorAll<HTMLElement>('main > section[id]');
const navigationObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navigation.querySelectorAll('a').forEach((link) => {
        if (link.getAttribute('href') === `#${entry.target.id}`)
          link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  },
  { rootMargin: '-20% 0px -60% 0px' },
);
sections.forEach((section) => navigationObserver.observe(section));
