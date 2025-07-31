// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 团队成员卡片悬停效果
const memberCards = document.querySelectorAll('.member-card');
memberCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    });
});

// 论文卡片点击展开详情
const paperCards = document.querySelectorAll('.paper');
paperCards.forEach(paper => {
    paper.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
});

// =================== 去雾对比 ===================
const imageNames = ['0', '2543', '3138', '981'];
const algorithms = [
    { name: 'Our', folder: 'Our _ex', file: base => `${base}.jpg` },
    { name: 'rDEA-NET', folder: 'rDEA-NET', file: base => `${base}.jpg` },
    { name: 'rDehazeFormer', folder: 'rDehazeFormer_ex', file: base => `dehazy${base}.jpg` },
    { name: 'rdehazeXL', folder: 'rdehazeXL_ex', file: base => `${base}.jpg` },
    { name: 'rmb-taylor', folder: 'rmb-taylor _ex', file: base => `${base}_dehaze.jpg` }
];

function createBtnCompareItem(baseName) {
    const item = document.createElement('div');
    item.className = 'compare-btn-item';
    // 原图
    const inputImg = document.createElement('img');
    inputImg.src = `images/Input_ex/${baseName}.jpg`;
    inputImg.className = 'input-img';
    inputImg.alt = '去雾前';
    // 算法按钮
    const btnGroup = document.createElement('div');
    btnGroup.className = 'algorithm-buttons';
    // 右侧对比图
    const outputImg = document.createElement('img');
    outputImg.src = `images/Our _ex/${baseName}.jpg`;
    outputImg.className = 'output-img';
    outputImg.alt = '去雾后';
    algorithms.forEach((algo, idx) => {
        const btn = document.createElement('button');
        btn.textContent = algo.name;
        if(idx === 0) btn.classList.add('active');
        btn.onclick = () => {
            btnGroup.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            outputImg.src = `images/${algo.folder}/${algo.file(baseName)}`;
        };
        btnGroup.appendChild(btn);
    });
    // 下载按钮区域
    const downloadGroup = document.createElement('div');
    downloadGroup.style.display = 'flex';
    downloadGroup.style.gap = '0.5rem';
    downloadGroup.style.marginTop = '0.7rem';
    // 下载原图
    const downloadInputBtn = document.createElement('button');
    downloadInputBtn.textContent = '下载原图';
    downloadInputBtn.className = 'btn-primary';
    downloadInputBtn.onclick = () => {
        const link = document.createElement('a');
        link.href = inputImg.src;
        link.download = `${baseName}_input.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    // 下载去雾图
    const downloadOutputBtn = document.createElement('button');
    downloadOutputBtn.textContent = '下载去雾图';
    downloadOutputBtn.className = 'btn-primary';
    downloadOutputBtn.onclick = () => {
        const link = document.createElement('a');
        link.href = outputImg.src;
        link.download = `${baseName}_dehaze.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    downloadGroup.appendChild(downloadInputBtn);
    downloadGroup.appendChild(downloadOutputBtn);
    // 布局
    const imgRow = document.createElement('div');
    imgRow.style.display = 'flex';
    imgRow.style.alignItems = 'center';
    imgRow.appendChild(inputImg);
    imgRow.appendChild(outputImg);
    item.appendChild(imgRow);
    item.appendChild(btnGroup);
    item.appendChild(downloadGroup);
    return item;
}

// 滑块对比组件复用原有逻辑
function createCompareComponent(pair) {
    const container = document.createElement('div');
    container.className = 'compare-container';
    container.innerHTML = `
        <img src="${pair.before}" class="compare-img before" draggable="false" alt="去雾前">
        <img src="${pair.after}" class="compare-img after" draggable="false" alt="去雾后">
        <div class="compare-slider"></div>
        <div class="compare-label left">去雾前</div>
        <div class="compare-label right">去雾后</div>
    `;
    // 滑块拖动逻辑
    const afterImg = container.querySelector('.compare-img.after');
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
    container.addEventListener('click', e => {
        setSlider(e.clientX);
    });
    setSlider(container.getBoundingClientRect().left + container.offsetWidth / 2);
    return container;
}

// =================== 经典文献渲染 ===================
// 论文渲染逻辑已移至 papers_render.js

window.addEventListener('DOMContentLoaded', () => {
    // 按钮对比区
    const btnGallery = document.querySelector('.compare-btn-gallery');
    if(btnGallery) {
        imageNames.forEach(baseName => {
            btnGallery.appendChild(createBtnCompareItem(baseName));
        });
    }
    // 滑块对比区
    const sliderGallery = document.querySelector('.compare-slider-gallery');
    if(sliderGallery) {
        const comparePairs = [
            { name: '0.jpg', before: 'images/Input_ex/0.jpg', after: 'images/Our _ex/0.jpg' },
            { name: '2543.jpg', before: 'images/Input_ex/2543.jpg', after: 'images/Our _ex/2543.jpg' },
            { name: '3138.jpg', before: 'images/Input_ex/3138.jpg', after: 'images/Our _ex/3138.jpg' },
            { name: '981.jpg', before: 'images/Input_ex/981.jpg', after: 'images/Our _ex/981.jpg' },
        ];
        comparePairs.forEach(pair => {
            sliderGallery.appendChild(createCompareComponent(pair));
        });
    }
    
    // 论文数据在 papers_render.js 中自动加载和渲染
});
