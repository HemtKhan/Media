// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const testApiBtn = document.getElementById('testApiBtn');
const retryBtn = document.getElementById('retryBtn');
const serviceSearch = document.getElementById('serviceSearch');
const serviceSort = document.getElementById('serviceSort');
const apiKeyInput = document.getElementById('apiKey');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize authentication modals
    initAuthModals();
    
    // Initialize API functionality
    initAPIFunctionality();
    
    // Initialize services manager
    servicesManager.init();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize WhatsApp button
    initWhatsAppButton();
});

// Mobile Menu
function initMobileMenu() {
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

// Authentication Modals
function initAuthModals() {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    loginBtn.addEventListener('click', () => showModal(loginModal));
    signupBtn.addEventListener('click', () => showModal(signupModal));
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === signupModal) signupModal.style.display = 'none';
    });
}

// Show modal
function showModal(modal) {
    modal.style.display = 'block';
}

// API Functionality
function initAPIFunctionality() {
    // Test API connection
    testApiBtn.addEventListener('click', async () => {
        const apiKey = apiKeyInput.value.trim();
        if (!apiKey) {
            alert('لطفاً کلید API را وارد کنید');
            return;
        }
        
        // Update API instance with new key
        api.apiKey = apiKey;
        
        testApiBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال تست...';
        testApiBtn.disabled = true;
        
        const result = await api.testConnection();
        
        if (result.success) {
            alert(`✅ اتصال موفق!\nموجودی: ${result.balance} ${result.currency}`);
            servicesManager.init();
        } else {
            alert(`❌ خطا در اتصال: ${result.error}`);
        }
        
        testApiBtn.innerHTML = '<i class="fas fa-plug"></i> تست اتصال';
        testApiBtn.disabled = false;
    });
    
    // Retry button
    retryBtn.addEventListener('click', () => {
        servicesManager.init();
    });
    
    // Search functionality
    let searchTimeout;
    serviceSearch.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            servicesManager.searchTerm = e.target.value;
            servicesManager.filterServices();
        }, 500);
    });
    
    // Sort functionality
    serviceSort.addEventListener('change', (e) => {
        servicesManager.sortBy = e.target.value;
        servicesManager.filterServices();
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

// WhatsApp Button
function initWhatsAppButton() {
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    whatsappBtn.addEventListener('click', () => {
        const message = 'سلام Khan24، من از طریق وبسایت خدمات شما را دیدم و میخواهم سفارش بدهم.';
        const encodedMessage = encodeURIComponent(message);
        whatsappBtn.href = `https://wa.me/93700000000?text=${encodedMessage}`;
    });
}

// Update API key from input
apiKeyInput.addEventListener('change', (e) => {
    api.apiKey = e.target.value.trim() || API_CONFIG.API_KEY;
});

// Auto-test API on page load
window.addEventListener('load', async () => {
    setTimeout(async () => {
        const result = await api.testConnection();
        if (result.success) {
            console.log('API connection successful');
        } else {
            console.warn('API connection failed:', result.error);
        }
    }, 1000);
});

// Export for debugging
window.api = api;
window.servicesManager = servicesManager;
