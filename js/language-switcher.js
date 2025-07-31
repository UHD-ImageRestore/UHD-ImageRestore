// 语言切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取语言切换按钮
    const languageToggle = document.getElementById('language-toggle');
    const languageToggleMobile = document.getElementById('language-toggle-mobile');
    
    // 语言切换函数
    function switchLanguage() {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('index copy.html')) {
        // 当前是英文页面，切换到中文页面
        window.location.href = 'index.html';
    } else {
        // 当前是中文页面，切换到英文页面
        window.location.href = 'index copy.html';
    }
}
    
    // 添加点击事件监听器
    if (languageToggle) {
        languageToggle.addEventListener('click', switchLanguage);
    }
    
    if (languageToggleMobile) {
        languageToggleMobile.addEventListener('click', switchLanguage);
    }
    
    // 添加键盘快捷键支持 (Ctrl+L 或 Cmd+L)
    document.addEventListener('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
            event.preventDefault();
            switchLanguage();
        }
    });
    
    // 添加页面加载动画
    function addPageTransition() {
        const body = document.body;
        body.style.opacity = '0';
        body.style.transition = 'opacity 0.3s ease-in-out';
        
        setTimeout(() => {
            body.style.opacity = '1';
        }, 100);
    }
    
    // 页面加载时执行过渡动画
    addPageTransition();
});

// 语言切换提示
function showLanguageSwitchHint() {
    const currentPath = window.location.pathname;
    const isEnglishPage = currentPath.includes('index copy.html') || currentPath.includes('index-copy.html');
    
    const hintText = isEnglishPage ? 
        'Tip: Press Ctrl+L to quickly switch language' : 
        '提示：按 Ctrl+L 可快速切换语言';
    
    const hint = document.createElement('div');
    hint.id = 'language-hint';
    hint.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(22, 93, 255, 0.9);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease-out;
        ">
            <i class="fa fa-info-circle mr-2"></i>
            ${hintText}
            <button onclick="this.parentElement.remove()" style="
                background: none;
                border: none;
                color: white;
                margin-left: 8px;
                cursor: pointer;
                font-size: 16px;
            ">×</button>
        </div>
    `;
    
    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(hint);
    
    // 3秒后自动隐藏提示
    setTimeout(() => {
        if (hint.parentElement) {
            hint.remove();
        }
    }, 3000);
}

// 页面加载完成后显示提示
window.addEventListener('load', function() {
    // 延迟显示提示，避免与页面加载冲突
    setTimeout(showLanguageSwitchHint, 1000);
});