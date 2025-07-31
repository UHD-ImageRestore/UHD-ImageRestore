document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // --- 移动端菜单切换 ---
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // 切换图标
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 导航栏滚动特效 ---
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'bg-white');
            navbar.classList.remove('bg-white/90');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-white');
            navbar.classList.add('bg-white/90');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // --- 滚动监听，高亮导航链接 ---
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: "-30% 0px -70% 0px" }); // 激活区域在视窗的偏上部

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- 点击移动端链接后关闭菜单 ---
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

}); 

// =================== 去雾对比滑块 ===================
const comparePairs = [
    { name: '0.jpg', before: 'images/Input_ex/0.jpg', after: 'images/Our _ex/0.jpg' },
    { name: '2543.jpg', before: 'images/Input_ex/2543.jpg', after: 'images/Our _ex/2543.jpg' },
    { name: '3138.jpg', before: 'images/Input_ex/3138.jpg', after: 'images/Our _ex/3138.jpg' },
    { name: '981.jpg', before: 'images/Input_ex/981.jpg', after: 'images/Our _ex/981.jpg' },
];

function createCompareComponent(pair) {
    const container = document.createElement('div');
    container.className = 'relative w-[400px] max-w-full h-[250px] rounded-xl overflow-hidden shadow-lg bg-gray-200 compare-container';
    container.innerHTML = `
        <img src="${pair.before}" class="absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none" draggable="false" alt="去雾前">
        <img src="${pair.after}" class="absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none compare-img-after" draggable="false" alt="去雾后">
        <div class="absolute top-0 bottom-0 left-1/2 w-1 bg-primary cursor-ew-resize z-20 rounded compare-slider"></div>
        <div class="absolute top-3 left-3 bg-dark/70 text-white text-xs px-3 py-1 rounded compare-label">去雾前</div>
        <div class="absolute top-3 right-3 bg-dark/70 text-white text-xs px-3 py-1 rounded compare-label">去雾后</div>
    `;
    // 滑块拖动逻辑
    const afterImg = container.querySelector('.compare-img-after');
    const slider = container.querySelector('.compare-slider');
    let dragging = false;
    function setSlider(x) {
        const rect = container.getBoundingClientRect();
        let percent = (x - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        const left = percent * 100;
        slider.style.left = left + '%';
        afterImg.style.clipPath = `inset(0 0 0 ${left}%)`;
    }
    slider.addEventListener('mousedown', e => {
        dragging = true;
        document.body.style.userSelect = 'none';
    });
    window.addEventListener('mousemove', e => {
        if (!dragging) return;
        setSlider(e.clientX);
    });
    window.addEventListener('mouseup', e => {
        dragging = false;
        document.body.style.userSelect = '';
    });
    // 支持点击容器直接跳转
    container.addEventListener('click', e => {
        setSlider(e.clientX);
    });
    // 初始化
    setSlider(container.getBoundingClientRect().left + container.offsetWidth / 2);
    return container;
}

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.compare-gallery');
    if (gallery) {
        comparePairs.forEach(pair => {
            gallery.appendChild(createCompareComponent(pair));
        });
    }
}); 