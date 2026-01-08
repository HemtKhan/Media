// Services Database - Prices per 1000
const SERVICES_DATABASE = {
    instagram: [
        { id: 1, name: 'فالوور واقعی', basePrice: 3.50, description: 'فالوور واقعی و فعال با پروفایل کامل' },
        { id: 2, name: 'لایک پست', basePrice: 0.80, description: 'لایک واقعی و دائمی برای پست‌ها' },
        { id: 3, name: 'کامنت واقعی', basePrice: 2.00, description: 'کامنت‌های فارسی و مرتبط' },
        { id: 4, name: 'ویو ریلز', basePrice: 1.20, description: 'ویوی واقعی برای ریلز' },
        { id: 5, name: 'ذخیره پست', basePrice: 1.50, description: 'سیو واقعی برای پست‌ها' },
        { id: 6, name: 'اشتراک گذاری', basePrice: 3.00, description: 'اشتراک‌گذاری در استوری' },
        { id: 7, name: 'فالوور سوپر', basePrice: 5.00, description: 'فالوور با فعالیت بالا' },
        { id: 8, name: 'پروفایل ویو', basePrice: 0.50, description: 'بازدید از پروفایل' }
    ],
    
    tiktok: [
        { id: 9, name: 'ویو ویدیو', basePrice: 1.00, description: 'ویوی واقعی برای ویدیوها' },
        { id: 10, name: 'لایک ویدیو', basePrice: 0.60, description: 'لایک واقعی برای ویدیو' },
        { id: 11, name: 'فالوور واقعی', basePrice: 4.00, description: 'فالوور فعال تیک‌تاک' },
        { id: 12, name: 'اشتراک گذاری', basePrice: 1.80, description: 'اشتراک‌گذاری ویدیو' },
        { id: 13, name: 'کامنت واقعی', basePrice: 2.50, description: 'کامنت‌های فارسی' },
        { id: 14, name: 'لایو ویو', basePrice: 1.50, description: 'بازدید لایو' }
    ],
    
    youtube: [
        { id: 15, name: 'ویو ویدیو', basePrice: 1.50, description: 'ویوی واقعی یوتیوب' },
        { id: 16, name: 'سابسکرایبر', basePrice: 8.00, description: 'سابسکرایبر واقعی' },
        { id: 17, name: 'لایک ویدیو', basePrice: 1.00, description: 'لایک واقعی' },
        { id: 18, name: 'کامنت واقعی', basePrice: 3.00, description: 'کامنت‌های مرتبط' },
        { id: 19, name: 'ساعت تماشا', basePrice: 5.00, description: 'Watch time واقعی' },
        { id: 20, name: 'اشتراک گذاری', basePrice: 2.00, description: 'اشتراک‌گذاری ویدیو' }
    ],
    
    facebook: [
        { id: 21, name: 'لایک صفحه', basePrice: 2.50, description: 'لایک واقعی صفحه' },
        { id: 22, name: 'فالوور صفحه', basePrice: 3.50, description: 'فالوور واقعی' },
        { id: 23, name: 'ویو ویدیو', basePrice: 1.20, description: 'ویوی واقعی فیسبوک' },
        { id: 24, name: 'اشتراک گذاری', basePrice: 2.00, description: 'اشتراک‌گذاری پست' },
        { id: 25, name: 'واکنش پست', basePrice: 1.00, description: 'واکنش‌های مختلف' },
        { id: 26, name: 'کامنت پست', basePrice: 2.50, description: 'کامنت واقعی' }
    ],
    
    twitter: [
        { id: 27, name: 'فالوور واقعی', basePrice: 3.00, description: 'فالوور فعال توییتر' },
        { id: 28, name: 'لایک توییت', basePrice: 0.70, description: 'لایک واقعی' },
        { id: 29, name: 'ریتوییت', basePrice: 1.20, description: 'ریتوییت واقعی' },
        { id: 30, name: 'کامنت توییت', basePrice: 2.00, description: 'کامنت مرتبط' },
        { id: 31, name: 'ویو توییت', basePrice: 0.40, description: 'بازدید توییت' }
    ],
    
    telegram: [
        { id: 32, name: 'عضو کانال', basePrice: 4.00, description: 'عضو واقعی کانال' },
        { id: 33, name: 'عضو گروه', basePrice: 3.50, description: 'عضو واقعی گروه' },
        { id: 34, name: 'ویو پست', basePrice: 0.30, description: 'بازدید پست' },
        { id: 35, name: 'واکنش پست', basePrice: 0.50, description: 'واکنش‌های مختلف' },
        { id: 36, name: 'اشتراک گذاری', basePrice: 1.00, description: 'اشتراک‌گذاری پست' }
    ],
    
    spotify: [
        { id: 37, name: 'پخش آهنگ', basePrice: 2.00, description: 'پخش واقعی آهنگ' },
        { id: 38, name: 'فالوور', basePrice: 6.00, description: 'فالوور واقعی' },
        { id: 39, name: 'ذخیره آهنگ', basePrice: 1.50, description: 'ذخیره در لیست' },
        { id: 40, name: 'افزودن پلی‌لیست', basePrice: 3.00, description: 'افزودن به پلی‌لیست' }
    ],
    
    reddit: [
        { id: 41, name: 'آپ‌ووت پست', basePrice: 1.20, description: 'آپ‌ووت واقعی' },
        { id: 42, name: 'کامنت پست', basePrice: 2.50, description: 'کامنت مرتبط' },
        { id: 43, name: 'اشتراک گذاری', basePrice: 1.50, description: 'اشتراک‌گذاری پست' },
        { id: 44, name: 'جوایز', basePrice: 4.00, description: 'جایزه برای پست' }
    ]
};

// Platform configuration
const PLATFORMS = [
    { id: 'instagram', name: 'اینستاگرام', icon: 'fab fa-instagram', color: '#E1306C' },
    { id: 'tiktok', name: 'تیک‌تاک', icon: 'fab fa-tiktok', color: '#000000' },
    { id: 'youtube', name: 'یوتیوب', icon: 'fab fa-youtube', color: '#FF0000' },
    { id: 'facebook', name: 'فیسبوک', icon: 'fab fa-facebook-f', color: '#1877F2' },
    { id: 'twitter', name: 'توییتر', icon: 'fab fa-twitter', color: '#1DA1F2' },
    { id: 'telegram', name: 'تلگرام', icon: 'fab fa-telegram', color: '#26A5E4' },
    { id: 'spotify', name: 'اسپاتیفای', icon: 'fab fa-spotify', color: '#1DB954' },
    { id: 'reddit', name: 'ردیت', icon: 'fab fa-reddit', color: '#FF4500' }
];

// Quick popular services
const POPULAR_SERVICES = [
    { platform: 'instagram', serviceId: 1, name: 'فالوور اینستاگرام', price: 3.50 },
    { platform: 'tiktok', serviceId: 9, name: 'ویو تیک‌تاک', price: 1.00 },
    { platform: 'youtube', serviceId: 15, name: 'ویو یوتیوب', price: 1.50 },
    { platform: 'instagram', serviceId: 2, name: 'لایک اینستاگرام', price: 0.80 },
    { platform: 'facebook', serviceId: 21, name: 'لایک فیسبوک', price: 2.50 },
    { platform: 'telegram', serviceId: 32, name: 'عضو تلگرام', price: 4.00 }
];

class PriceCalculator {
    constructor() {
        this.selectedPlatform = null;
        this.selectedService = null;
        this.quantity = 1000;
        this.currentPrice = 0;
        
        this.init();
    }
    
    init() {
        this.renderPlatforms();
        this.renderPopularServices();
        this.setupEventListeners();
        this.updatePrice();
    }
    
    // Render platform selection
    renderPlatforms() {
        const container = document.getElementById('platformSelection');
        if (!container) return;
        
        container.innerHTML = PLATFORMS.map(platform => `
            <div class="platform-btn ${platform.id}" data-platform="${platform.id}">
                <div class="platform-icon">
                    <i class="${platform.icon}"></i>
                </div>
                <span>${platform.name}</span>
            </div>
        `).join('');
    }
    
    // Render popular services in sidebar
    renderPopularServices() {
        const container = document.querySelector('.quick-services');
        if (!container) return;
        
        container.innerHTML = POPULAR_SERVICES.map(service => `
            <button class="quick-service-btn" 
                    data-platform="${service.platform}" 
                    data-service-id="${service.serviceId}">
                <span class="service-name">${service.name}</span>
                <span class="service-price">$${service.price}/1000</span>
            </button>
        `).join('');
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Platform selection
        document.querySelectorAll('.platform-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectPlatform(btn.dataset.platform));
        });
        
        // Quick service buttons
        document.querySelectorAll('.quick-service-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectPlatform(btn.dataset.platform);
                setTimeout(() => {
                    this.selectService(parseInt(btn.dataset.serviceId));
                }, 100);
            });
        });
        
        // Service selection
        const serviceSelect = document.getElementById('serviceSelect');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', (e) => {
                this.selectService(parseInt(e.target.value));
            });
        }
        
        // Quantity input
        const quantityInput = document.getElementById('quantity');
        if (quantityInput) {
            quantityInput.addEventListener('input', (e) => {
                this.setQuantity(parseInt(e.target.value) || 100);
                this.updateSlider();
            });
        }
        
        // Quantity slider
        const quantitySlider = document.getElementById('quantitySlider');
        if (quantitySlider) {
            quantitySlider.addEventListener('input', (e) => {
                this.setQuantity(parseInt(e.target.value));
                this.updateInput();
            });
        }
        
        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const quantity = parseInt(btn.dataset.quantity);
                this.setQuantity(quantity);
                this.updateInput();
                this.updateSlider();
                
                // Update active state
                document.querySelectorAll('.preset-btn').forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
            });
        });
        
        // Reset button
        const resetBtn = document.getElementById('resetCalculator');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetCalculator());
        }
        
        // Order button
        const orderBtn = document.getElementById('orderBtn');
        if (orderBtn) {
            orderBtn.addEventListener('click', () => this.placeOrder());
        }
        
        // WhatsApp button in header
        const whatsappBtn = document.getElementById('whatsappBtn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                window.open('https://wa.me/93700000000', '_blank');
            });
        }
    }
    
    // Select platform
    selectPlatform(platformId) {
        this.selectedPlatform = platformId;
        
        // Update UI
        document.querySelectorAll('.platform-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.platform === platformId) {
                btn.classList.add('active');
            }
        });
        
        // Update service select options
        this.updateServiceSelect();
        
        // Clear previous service selection
        this.selectedService = null;
        document.getElementById('serviceInfo').innerHTML = '';
        
        // Enable service select
        const serviceSelect = document.getElementById('serviceSelect');
        serviceSelect.disabled = false;
        
        // Update order summary
        this.updateOrderSummary();
    }
    
    // Update service select dropdown
    updateServiceSelect() {
        const serviceSelect = document.getElementById('serviceSelect');
        if (!serviceSelect || !this.selectedPlatform) return;
        
        const services = SERVICES_DATABASE[this.selectedPlatform] || [];
        
        serviceSelect.innerHTML = `
            <option value="">انتخاب سرویس...</option>
            ${services.map(service => `
                <option value="${service.id}">${service.name} - $${service.basePrice}/1000</option>
            `).join('')}
        `;
    }
    
    // Select service
    selectService(serviceId) {
        if (!this.selectedPlatform) return;
        
        const services = SERVICES_DATABASE[this.selectedPlatform] || [];
        this.selectedService = services.find(s => s.id === serviceId);
        
        if (!this.selectedService) return;
        
        // Update service info display
        const serviceInfo = document.getElementById('serviceInfo');
        serviceInfo.innerHTML = `
            <h4>${this.selectedService.name}</h4>
            <p>${this.selectedService.description}</p>
            <p style="margin-top: 10px; color: #059669; font-weight: 600;">
                قیمت پایه: $${this.selectedService.basePrice} برای هر ۱۰۰۰
            </p>
        `;
        
        // Update service select value
        const serviceSelect = document.getElementById('serviceSelect');
        serviceSelect.value = serviceId;
        
        // Enable order button
        document.getElementById('orderBtn').disabled = false;
        
        // Update price calculation
        this.updatePrice();
        this.updateOrderSummary();
    }
    
    // Set quantity
    setQuantity(quantity) {
        // Validate quantity
        quantity = Math.max(100, Math.min(1000000, quantity));
        this.quantity = quantity;
        
        // Update price
        this.updatePrice();
        this.updateOrderSummary();
    }
    
    // Update input field
    updateInput() {
        const quantityInput = document.getElementById('quantity');
        if (quantityInput) {
            quantityInput.value = this.quantity;
        }
    }
    
    // Update slider
    updateSlider() {
        const quantitySlider = document.getElementById('quantitySlider');
        if (quantitySlider) {
            quantitySlider.value = this.quantity;
        }
    }
    
    // Calculate price with discounts
    calculatePrice() {
        if (!this.selectedService) return 0;
        
        const basePrice = this.selectedService.basePrice;
        const baseTotal = (basePrice * this.quantity) / 1000;
        
        // Apply quantity discounts
        let discount = 0;
        if (this.quantity >= 10000) {
            discount = 0.20; // 20% discount for 10K+
        } else if (this.quantity >= 5000) {
            discount = 0.15; // 15% discount for 5K+
        } else if (this.quantity >= 1000) {
            discount = 0.10; // 10% discount for 1K+
        } else if (this.quantity >= 500) {
            discount = 0.05; // 5% discount for 500+
        }
        
        const finalPrice = baseTotal * (1 - discount);
        return finalPrice;
    }
    
    // Update price display
    updatePrice() {
        if (!this.selectedService) {
            this.currentPrice = 0;
        } else {
            this.currentPrice = this.calculatePrice();
        }
        
        // Update displays
        document.getElementById('unitPrice').textContent = 
            `$${this.selectedService?.basePrice.toFixed(2) || '0.00'}`;
        
        document.getElementById('displayQuantity').textContent = 
            this.quantity.toLocaleString('fa-IR');
        
        document.getElementById('totalPrice').textContent = 
            `$${this.currentPrice.toFixed(2)}`;
        
        // Update quantity levels
        this.updateQuantityLevels();
    }
    
    // Update quantity level prices
    updateQuantityLevels() {
        if (!this.selectedService) return;
        
        const basePrice = this.selectedService.basePrice;
        
        // Calculate prices for different quantities
        const price500 = (basePrice * 500 * 0.95) / 1000; // 5% discount
        const price5000 = (basePrice * 5000 * 0.85) / 1000; // 15% discount
        const price10000 = (basePrice * 10000 * 0.80) / 1000; // 20% discount
        
        document.getElementById('price500').textContent = `$${price500.toFixed(2)}`;
        document.getElementById('price5000').textContent = `$${price5000.toFixed(2)}`;
        document.getElementById('price10000').textContent = `$${price10000.toFixed(2)}`;
    }
    
    // Update order summary
    updateOrderSummary() {
        const orderSummary = document.getElementById('orderSummary');
        
        if (!this.selectedPlatform || !this.selectedService) {
            orderSummary.textContent = 'هیچ سرویسی انتخاب نشده است';
            return;
        }
        
        const platform = PLATFORMS.find(p => p.id === this.selectedPlatform);
        const platformName = platform ? platform.name : this.selectedPlatform;
        
        orderSummary.innerHTML = `
            <strong>پلتفرم:</strong> ${platformName}<br>
            <strong>سرویس:</strong> ${this.selectedService.name}<br>
            <strong>تعداد:</strong> ${this.quantity.toLocaleString('fa-IR')}<br>
            <strong>قیمت کل:</strong> $${this.currentPrice.toFixed(2)}
        `;
    }
    
    // Reset calculator
    resetCalculator() {
        this.selectedPlatform = null;
        this.selectedService = null;
        this.quantity = 1000;
        this.currentPrice = 0;
        
        // Reset UI
        document.querySelectorAll('.platform-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById('serviceSelect').innerHTML = `
            <option value="">ابتدا پلتفرم را انتخاب کنید</option>
        `;
        document.getElementById('serviceSelect').disabled = true;
        
        document.getElementById('serviceInfo').innerHTML = '';
        document.getElementById('quantity').value = '1000';
        document.getElementById('quantitySlider').value = '1000';
        
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById('orderBtn').disabled = true;
        
        this.updatePrice();
        this.updateOrderSummary();
    }
    
    // Place order via WhatsApp
    placeOrder() {
        if (!this.selectedPlatform || !this.selectedService) return;
        
        const platform = PLATFORMS.find(p => p.id === this.selectedPlatform);
        const platformName = platform ? platform.name : this.selectedPlatform;
        
        const message = `📋 سفارش جدید از Khan24\n\n` +
                       `پلتفرم: ${platformName}\n` +
                       `سرویس: ${this.selectedService.name}\n` +
                       `تعداد: ${this.quantity.toLocaleString('fa-IR')}\n` +
                       `قیمت واحد: $${this.selectedService.basePrice}/1000\n` +
                       `قیمت کل: $${this.currentPrice.toFixed(2)}\n\n` +
                       `لطفاً اطلاعات زیر را تکمیل کنید:\n` +
                       `لینک پست/صفحه: ________\n` +
                       `توضیحات اضافی: ________`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/93700000000?text=${encodedMessage}`, '_blank');
    }
    
    // Get platform services
    getPlatformServices(platformId) {
        return SERVICES_DATABASE[platformId] || [];
    }
    
    // Get service by ID
    getServiceById(platformId, serviceId) {
        const services = this.getPlatformServices(platformId);
        return services.find(s => s.id === serviceId);
    }
}

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.priceCalculator = new PriceCalculator();
});
