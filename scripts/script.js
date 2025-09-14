// 2025年現代化網站交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initAOS();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initNavbarScroll();
    initBackToTop();
    initParallaxEffects();
    initTypingEffect();
    initCounterAnimation();
});

// 初始化AOS動畫庫
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            offset: 100,
            easing: 'ease-in-out-cubic',
            once: true,
            mirror: false
        });
    }
}

// 手機選單功能增強
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // 漢堡包動畫
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
        
        // 點擊選單項目後關閉選單
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('menu-open');
                
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
        
        // 點擊外部關閉選單
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('menu-open');
                
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
}

// 平滑滾動增強
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 添加目標高亮效果
                target.style.boxShadow = '0 0 30px rgba(102, 126, 234, 0.3)';
                setTimeout(() => {
                    target.style.boxShadow = '';
                }, 2000);
            }
        });
    });
}

// 滾動動畫增強
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                
                // 添加延遲動畫
                const delay = entry.target.dataset.delay || 0;
                if (delay) {
                    entry.target.style.animationDelay = delay + 'ms';
                }
                
                // 觸發計數動畫
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // 觀察需要動畫的元素
    document.querySelectorAll('.service-card, .cert-category, .about-content, .contact-item, .stat, .feature').forEach((el, index) => {
        el.dataset.delay = index * 100;
        observer.observe(el);
    });
}

// 導航欄滾動效果增強
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加背景效果
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 隱藏/顯示導航欄
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // 更新活動選單項目
        updateActiveNavItem();
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// 更新活動導航項目增強
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// 聯繫表單增強
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // 實時驗證
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        if (validateForm(data)) {
            submitForm(data);
        }
    });
}

// 欄位驗證
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    // 清除之前的錯誤狀態
    field.classList.remove('error', 'success');
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = '此欄位為必填';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        message = '請輸入有效的電子郵件地址';
    } else if (field.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        message = '請輸入有效的電話號碼';
    }
    
    if (!isValid) {
        showFieldError(field, message);
    } else if (value) {
        field.classList.add('success');
    }
    
    return isValid;
}

// 清除欄位錯誤
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    const errorMsg = field.parentNode.querySelector('.field-error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

// 顯示欄位錯誤
function showFieldError(field, message) {
    field.classList.add('error');
    
    // 移除現有錯誤訊息
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // 添加新錯誤訊息
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e53e3e;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: slideInUp 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorDiv);
}

// 表單驗證增強
function validateForm(data) {
    const errors = [];
    const requiredFields = ['name', 'email'];
    
    requiredFields.forEach(fieldName => {
        if (!data[fieldName] || data[fieldName].trim() === '') {
            errors.push(`請填寫${getFieldDisplayName(fieldName)}`);
        }
    });
    
    if (data.email && !isValidEmail(data.email)) {
        errors.push('請填寫有效的電子郵件地址');
    }
    
    if (data.phone && !isValidPhone(data.phone)) {
        errors.push('請填寫有效的電話號碼');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('請詳細描述您的需求（至少10字）');
    }
    
    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// 取得欄位顯示名稱
function getFieldDisplayName(fieldName) {
    const names = {
        name: '姓名',
        email: '電子郵件',
        phone: '電話號碼',
        message: '訊息內容'
    };
    return names[fieldName] || fieldName;
}

// 電子郵件驗證增強
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
}

// 電話號碼驗證
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[(]?[\+]?\d{1,4}[)]?[-\s\.]?\d{1,4}[-\s\.]?\d{1,6}[-\s\.]?\d{1,6}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// 提交表單
function submitForm(data) {
    const submitBtn = document.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    // 顯示載入狀態
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 發送中...';
    submitBtn.disabled = true;
    
    // 模擬API調用
    setTimeout(() => {
        showMessage('感謝您的諮詢！我們將在24小時內回復您。', 'success');
        document.getElementById('contactForm').reset();
        
        // 恢復按鈕狀態
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // 清除所有欄位狀態
        document.querySelectorAll('.success, .error').forEach(el => {
            el.classList.remove('success', 'error');
        });
        
        // 在真實環境中，這裡應該是實際的API調用
        console.log('表單數據:', data);
        
        // 可以集成像EmailJS這樣的服務
        // emailjs.send('service_id', 'template_id', data);
        
    }, 2000);
}

// 訊息顯示增強
function showMessage(message, type) {
    // 移除現有訊息
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 創建新訊息
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.innerHTML = message;
    
    // 插入到表單前面
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageDiv, form);
    
    // 添加動畫
    messageDiv.classList.add('animate-fade-scale');
    
    // 滾動到訊息位置
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // 自動移除成功訊息
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.opacity = '0';
                setTimeout(() => messageDiv.remove(), 300);
            }
        }, 5000);
    }
}

// 回到頂部按鈕增強
function initBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', '回到頂部');
    
    button.addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });
    
    document.body.appendChild(button);
    
    // 滾動時顯示/隱藏按鈕
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.pageYOffset > 300) {
                    button.classList.add('show');
                } else {
                    button.classList.remove('show');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// 視差效果
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    }, 16));
}

// 打字效果
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let index = 0;
    const typeSpeed = 50;
    
    function type() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, typeSpeed);
        } else {
            heroTitle.classList.add('typing-complete');
        }
    }
    
    // 延遲開始打字效果
    setTimeout(type, 1000);
}

// 數字計數動畫
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        if (isNaN(target)) return;
        
        counter.textContent = '0';
        counter.dataset.target = target;
    });
}

function animateCounter(statElement) {
    const counter = statElement.querySelector('h3');
    if (!counter || counter.classList.contains('animated')) return;
    
    const target = parseInt(counter.dataset.target);
    if (isNaN(target)) return;
    
    counter.classList.add('animated');
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : target >= 100 ? '+' : '');
    }, 20);
}

// 節流函數優化
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 防抖函數
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// 鍵盤導航支持
document.addEventListener('keydown', function(e) {
    // ESC 鍵關閉手機選單
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    }
    
    // 空格鍵暫停/播放動畫（開發用）
    if (e.code === 'Space' && e.ctrlKey) {
        e.preventDefault();
        document.body.style.animationPlayState = 
            document.body.style.animationPlayState === 'paused' ? 'running' : 'paused';
    }
});

// 表單自動保存（本地存儲）
function initFormAutoSave() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // 恢復保存的數據
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(`form_${input.name}`);
        if (savedValue && input.type !== 'email') { // 不保存敏感信息
            input.value = savedValue;
        }
    });
    
    // 自動保存
    inputs.forEach(input => {
        input.addEventListener('input', debounce(() => {
            if (input.type !== 'email' && input.type !== 'tel') { // 不保存敏感信息
                localStorage.setItem(`form_${input.name}`, input.value);
            }
        }, 500));
    });
    
    // 提交後清除保存的數據
    form.addEventListener('submit', () => {
        inputs.forEach(input => {
            localStorage.removeItem(`form_${input.name}`);
        });
    });
}

// 圖片懶載入
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 性能監控
function initPerformanceMonitoring() {
    // 監控載入時間
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`頁面載入時間: ${Math.round(loadTime)}ms`);
        
        // 如果載入時間過長，可以顯示提示
        if (loadTime > 3000) {
            console.warn('頁面載入時間較長，請檢查資源優化');
        }
    });
    
    // 監控滾動性能
    let scrollCount = 0;
    window.addEventListener('scroll', throttle(() => {
        scrollCount++;
        if (scrollCount % 100 === 0) {
            console.log(`滾動事件觸發次數: ${scrollCount}`);
        }
    }, 100));
}

// 初始化額外功能
window.addEventListener('load', function() {
    initFormAutoSave();
    initLazyLoading();
    initPerformanceMonitoring();
    
    // 頁面載入完成後的動畫
    document.body.classList.add('loaded');
    
    // 預載入重要資源
    preloadResources();
});

// 預載入資源
function preloadResources() {
    const importantImages = [
        // 添加需要預載入的圖片URL
    ];
    
    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// 添加 CSS 自定義屬性支持檢測
function detectCSSSupport() {
    const testEl = document.createElement('div');
    testEl.style.cssText = 'background: var(--test-var, red);';
    
    if (!testEl.style.background) {
        document.body.classList.add('no-css-variables');
        console.warn('瀏覽器不支持 CSS 自定義屬性，請考慮添加 polyfill');
    }
}

// 初始化支持檢測
detectCSSSupport();

// 全局錯誤處理
window.addEventListener('error', function(e) {
    console.error('腳本錯誤:', e.error);
    // 在生產環境中可以發送錯誤報告到服務器
});

// 離線支持檢測
window.addEventListener('online', () => {
    console.log('網絡連接已恢復');
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    console.log('網絡連接已斷開');
    document.body.classList.add('offline');
    showMessage('網絡連接已斷開，某些功能可能無法使用', 'warning');
});

console.log('🚀 絕對質量國際標準 - 現代化主題已載入完成！');
console.log('📱 響應式設計 | 🎨 現代UI | ⚡ 性能優化 | ♿ 無障礙支持');
