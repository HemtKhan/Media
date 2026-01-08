// Main App Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize CTA buttons
    initCTAButtons();
    
    // Load popular services
    loadPopularServices();
});

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (!mobileMenuBtn || !mainNav) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// CTA Buttons
function initCTAButtons() {
    // WhatsApp CTA button
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const message = 'سلام Khan24، من از وبسایت شما دیدن کردم و می‌خواهم در مورد خدمات مشاوره بگیرم.';
            const encodedMessage = encodeURIComponent(message);
            whatsappBtn.href = `https://wa.me/93700000000?text=${encodedMessage}`;
        });
    }
    
    // CTA calculator button
    const ctaBtn = document.querySelector('.btn-cta');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            const calculatorSection = document.getElementById('calculator');
            if (calculatorSection) {
                window.scrollTo({
                    top: calculatorSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Load Popular Services
function loadPopularServices() {
    const container = document.querySelector('.popular-services');
    if (!container) return;
    
    // Get 6 popular services from different platforms
    const popularServices = [
        { 
            platform: 'instagram', 
            service: SERVICES_DATABASE.instagram[0],
            icon: 'fab fa-instagram',
            color: '#E1306C'
        },
        { 
            platform: 'tiktok', 
            service: SERVICES_DATABASE.tiktok[0],
            icon: 'fab fa-tiktok',
            color: '#000000'
        },
        { 
            platform: 'youtube', 
            service: SERVICES_DATABASE.youtube[0],
            icon: 'fab fa-youtube',
            color: '#FF0000'
        },
        { 
            platform: 'facebook', 
            service: SERVICES_DATABASE.facebook[0],
            icon: 'fab fa-facebook-f',
            color: '#1877F2'
        },
        { 
            platform: 'twitter', 
            service: SERVICES_DATABASE.twitter[0],
            icon: 'fab fa-twitter',
            color: '#1DA1F2'
        },
        { 
            platform: 'telegram', 
            service: SERVICES_DATABASE.telegram[0],
            icon: 'fab fa-telegram',
            color: '#26A5E4'
        }
    ];
    
    container.innerHTML = popularServices.map(item => `
        <div class="popular-service-card">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <div style="width: 50px; height: 50px; border-radius: 12px; background: ${item.color}; 
                           display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">
                    <i class="${item.icon}"></i>
                </div>
                <h3 style="margin: 0; color: #1f2937;">${item.service.name}</h3>
            </div>
            
            <p style="color: #6b7280; margin-bottom: 20px; line-height: 1.6;">
                ${item.service.description}
            </p>
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #059669; font-weight: 700; font-size: 18px;">
                    $${item.service.basePrice}/1000
                </span>
                <button class="btn btn-primary btn-sm" 
                        onclick="selectPopularService('${item.platform}', ${item.service.id})">
                    <i class="fas fa-calculator"></i> محاسبه قیمت
                </button>
            </div>
        </div>
    `).join('');
}

// Function to select popular service from services section
function selectPopularService(platformId, serviceId) {
    // Scroll to calculator
    const calculatorSection = document.getElementById('calculator');
    if (calculatorSection) {
        window.scrollTo({
            top: calculatorSection.offsetTop - 100,
            behavior: 'smooth'
        });
    }
    
    // Select the service after a short delay
    setTimeout(() => {
        if (window.priceCalculator) {
            window.priceCalculator.selectPlatform(platformId);
            setTimeout(() => {
                window.priceCalculator.selectService(serviceId);
            }, 100);
        }
    }, 500);
}

// Format price for display
function formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
}

// Format number with Persian separators
function formatNumber(num) {
    return num.toLocaleString('fa-IR');
}

// Export for global access
window.selectPopularService = selectPopularService;
