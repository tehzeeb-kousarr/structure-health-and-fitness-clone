document.addEventListener('DOMContentLoaded', () => {
  initBlogFilters();
  initLoadMore();
});

function initBlogFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.blog-grid .blog-card');
  const featured = document.querySelector('.blog-featured');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active state
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter featured post
      if (featured) {
        const featCat = featured.getAttribute('data-category');
        if (filter === 'all' || featCat === filter) {
          featured.classList.remove('is-hidden');
        } else {
          featured.classList.add('is-hidden');
        }
      }

      // Filter cards
      cards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

function initLoadMore() {
  const btn = document.getElementById('load-more-btn');
  if (!btn) return;

  // Extra articles to inject on click
  const extraPosts = [
    {
      category: 'training',
      img: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&auto=format&fit=crop&q=80',
      alt: 'Person doing cardio on a rowing machine',
      tag: 'Training',
      date: 'February 5, 2024',
      read: '6 min read',
      title: 'HIIT vs. Steady-State Cardio: Which One Is Right for Your Goal?',
      excerpt: 'High-intensity interval training burns more calories in less time — but steady-state cardio has unique benefits for endurance and recovery. Here\'s how to choose based on your specific goal.',
    },
    {
      category: 'lifestyle',
      img: 'https://images.unsplash.com/photo-1522898467493-49726bf28798?w=600&auto=format&fit=crop&q=80',
      alt: 'Person journaling fitness goals at a desk',
      tag: 'Lifestyle',
      date: 'January 20, 2024',
      read: '4 min read',
      title: 'How to Set Fitness Goals You\'ll Actually Stick To',
      excerpt: 'Vague resolutions fail. SMART goals with clear checkpoints and a realistic timeline are what separate people who transform their bodies from those who give up by February.',
    },
    {
      category: 'yoga',
      img: 'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=600&auto=format&fit=crop&q=80',
      alt: 'Person doing a yoga stretch on a rooftop',
      tag: 'Yoga',
      date: 'January 8, 2024',
      read: '5 min read',
      title: 'Restorative Yoga for Active Recovery: A Complete Guide',
      excerpt: 'Rest days don\'t have to mean doing nothing. A gentle 30-minute restorative yoga session can accelerate muscle repair, reduce cortisol levels, and improve next-day performance.',
    },
  ];

  let loaded = false;

  btn.addEventListener('click', () => {
    if (loaded) {
      btn.textContent = 'You\'re all caught up!';
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.style.cursor = 'default';
      return;
    }

    const grid = document.querySelector('.blog-grid');
    const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';

    extraPosts.forEach((post) => {
      const article = document.createElement('article');
      article.className = 'blog-card';
      article.setAttribute('data-category', post.category);

      if (activeFilter !== 'all' && post.category !== activeFilter) {
        article.classList.add('is-hidden');
      }

      article.innerHTML = `
        <a href="#" class="blog-card__img-link">
          <img src="${post.img}" alt="${post.alt}">
        </a>
        <div class="blog-card__body">
          <span class="blog-tag blog-tag--sm">${post.tag}</span>
          <p class="blog-meta">${post.date} &bull; ${post.read}</p>
          <h3><a href="#">${post.title}</a></h3>
          <p class="blog-excerpt">${post.excerpt}</p>
        </div>
      `;

      grid.appendChild(article);
    });

    loaded = true;
    btn.textContent = 'No More Articles';
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.style.cursor = 'default';
  });
}