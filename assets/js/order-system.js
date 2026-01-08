class OrderSystem {
    constructor() {
        this.selectedPlatform = null;
        this.selectedService = null;
        this.currentFilter = 'all';
        this.currentCategory = 'all';
        this.currentView = 'grid';
        this.searchTerm = '';
        this.orderQuantity = 1000;
        
        this.init();
    }
    
    init() {
        this.loadPlatforms();
        this.loadRecommendedServices();
        this.loadAllServices();
        this.setupEventListeners();
        this.updateTabCounts();
    }
    
    // Load platforms
    loadPlatforms() {
        const container = document.querySelector('.platform-grid');
        if (!container) return;
        
        container.innerHTML = PLATFORMS.map(platform => {
            const services = getServicesByPlatform(platform.id);
            return `
                <div class="platform-card ${platform.id}" 
                     data-platform="${platform.id}"
                     onclick="orderSystem.selectPlatform('${platform.id}')">
                    <div class="platform-icon" style="background: ${platform.color}">
                        <i class="${platform.icon}"></i>
                    </div>
                    <h3>${platform.name}</h3>
                    <p>${services.length} سرویس</p>
                </div>
            `;
        }).join('');
    }
    
    // Load recommended services
    loadRecommendedServices() {
        const container = document.querySelector('.services-grid');
        if (!container) return;
        
        const recommended = getRecommendedServices();
        container.innerHTML = recommended.map(service => {
            const platform = getPlatformInfo(service.platform);
            return `
                <div class="service-card recommended">
                    <div class="service-header">
                        <div class="platform-icon" style="background: ${platform.color}">
                            <i class="${platform.icon}"></i>
                        </div>
                        <h4>${service.name}</h4>
                    </div>
                    
                    <p class="service-description">${service.description}</p>
                    
                    <div class="service-details">
                        <div class="detail-item">
                            <span class="detail-label">قیمت:</span>
                            <span class="detail-value price">$${service.price}/1000</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">حداقل:</span>
                            <span class="detail-value">${formatNumber(service.min)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">حداکثر:</span>
                            <span class="detail-value">${formatNumber(service.max)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">کیفیت:</span>
                            <span class="detail-value">${service.quality}</span>
                        </div>
                    </div>
                    
                    <div class="service-actions">
                        <button class="btn-order" onclick="orderSystem.openOrderModal(${service.id}, '${service.platform}')">
                            <i class="fas fa-shopping-cart"></i>
                            سفارش
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Load all services
    loadAllServices(filter = 'all', category = 'all') {
        const container = document.getElementById('servicesList');
        const loading = document.getElementById('loadingState');
        const noResults = document.getElementById('noResults');
        
        if (loading) loading.style.display = 'none';
        if (noResults) noResults.style.display = 'none';
        
        let services = getAllServices();
        
        // Apply platform filter
        if (filter !== 'all') {
            services = services.filter(service => service.platform === filter);
        }
        
        // Apply category filter
        if (category !== 'all') {
            services = services.filter(service => service.category === category);
        }
        
        // Apply search
        if (this.searchTerm) {
            const searchLower = this.searchTerm.toLowerCase();
            services = services.filter(service => 
                service.name.toLowerCase().includes(searchLower) ||
                service.description.toLowerCase().includes(searchLower) ||
                service.platform.toLowerCase().includes(searchLower)
            );
        }
        
        // Show no results if empty
        if (services.length === 0) {
            if (noResults) noResults.style.display = 'flex';
            if (container) container.innerHTML = '';
            return;
        }
        
        // Render services
        if (container) {
            container.className = `services-list ${this.currentView}-view`;
            container.innerHTML = services.map(service => {
                const platform = getPlatformInfo(service.platform);
                return `
                    <div class="service-item">
                        <div class="platform-icon" style="background: ${platform.color}">
                            <i class="${platform.icon}"></i>
                        </div>
                        
                        <div class="service-content">
                            <h4>${service.name}</h4>
                            <p>${service.description}</p>
                            
                            <div class="service-meta">
                                <span>حداقل: ${formatNumber(service.min)}</span>
                                <span>حداکثر: ${formatNumber(service.max)}</span>
                                <span>زمان: ${service.avgTime}</span>
                                ${service.refill ? '<span>پر کردن مجدد</span>' : ''}
                            </div>
                        </div>
                        
                        <div class="service-price">
                            $${service.price}/1000
                        </div>
                        
                        <button class="btn-order" onclick="orderSystem.openOrderModal(${service.id}, '${service.platform}')">
                            <i class="fas fa-shopping-cart"></i>
                            سفارش
                        </button>
                    </div>
                `;
            }).join('');
        }
    }
    
    // Update tab counts
    updateTabCounts() {
        PLATFORMS.forEach(platform => {
            const services = getServicesByPlatform(platform.id);
            const tab = document.querySelector(`[data-filter="${platform.id}"] .tab-count`);
            if (tab) {
                tab.textContent = services.length;
            }
        });
        
        // Update "All" tab count
        const allTab = document.querySelector('[data-filter="all"] .tab-count');
        if (allTab) {
            allTab.textContent = getAllServices().length;
        }
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.loadAllServices(this.currentFilter, this.currentCategory);
            });
        }
        
        // Status tabs
        document.querySelectorAll('.status-tab:not(.more-tab)').forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.dataset.filter;
                this.selectFilter(filter);
            });
        });
        
        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.selectCategory(category);
            });
        });
        
        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.selectView(view);
            });
        });
        
        // WhatsApp help button
        const whatsappBtn = document.getElementById('whatsappHelp');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                const message = 'سلام Khan24، در مورد سفارش جدید سوال دارم.';
                window.open(`https://wa.me/93700000000?text=${encodeURIComponent(message)}`, '_blank');
            });
        }
        
        // Modal events
        this.setupModalEvents();
    }
    
    // Select platform
    selectPlatform(platformId) {
        this.selectedPlatform = platformId;
        
        // Update UI
        document.querySelectorAll('.platform-card').forEach(card => {
            card.classList.remove('active');
            if (card.dataset.platform === platformId) {
                card.classList.add('active');
            }
        });
        
        // Update filter
        this.selectFilter(platformId);
    }
    
    // Select filter
    selectFilter(filter) {
        this.currentFilter = filter;
        
        // Update tabs
        document.querySelectorAll('.status-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.filter === filter) {
                tab.classList.add('active');
            }
        });
        
        // Load services with this filter
        this.loadAllServices(filter, this.currentCategory);
    }
    
    // Select category
    selectCategory(category) {
        this.currentCategory = category;
        
        // Update category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });
        
        // Load services with this category
        this.loadAllServices(this.currentFilter, category);
    }
    
    // Select view
    selectView(view) {
        this.currentView = view;
        
        // Update view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            }
        });
        
        // Update services list class
        const servicesList = document.getElementById('servicesList');
        if (servicesList) {
            servicesList.className = `services-list ${view}-view`;
        }
    }
    
    // Open order modal
    openOrderModal(serviceId, platformId) {
        const service = SERVICES_DATA[platformId].find(s => s.id === serviceId);
        if (!service) return;
        
        const platform = getPlatformInfo(platformId);
        
        // Update modal content
        document.getElementById('modalServiceIcon').innerHTML = 
            `<i class="${platform.icon}" style="color: white;"></i>`;
        document.getElementById('modalServiceIcon').style.background = platform.color;
        
        document.getElementById('modalServiceName').textContent = service.name;
        document.getElementById('modalServiceDescription').textContent = service.description;
        document.getElementById('modalUnitPrice').textContent = `$${service.price}`;
        document.getElementById('modalMinQuantity').textContent = formatNumber(service.min);
        document.getElementById('modalMaxQuantity').textContent = formatNumber(service.max);
        
        // Store selected service
        this.selectedService = service;
        this.selectedService.platform = platformId;
        
        // Reset quantity
        this.orderQuantity = service.min;
        this.updateQuantityInputs();
        this.updatePriceCalculation();
        
        // Show modal
        document.getElementById('orderModal').style.display = 'flex';
    }
    
    // Setup modal events
    setupModalEvents() {
        const modal = document.getElementById('orderModal');
        const closeBtn = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelOrder');
        const confirmBtn = document.getElementById('confirmOrder');
        const quantityInput = document.getElementById('orderQuantity');
        const quantitySlider = document.getElementById('quantitySlider');
        const decreaseBtn = document.getElementById('decreaseQty');
        const increaseBtn = document.getElementById('increaseQty');
        
        // Close modal
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
        if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeModal());
        
        // Confirm order
        if (confirmBtn) confirmBtn.addEventListener('click', () => this.confirmOrder());
        
        // Quantity input
        if (quantityInput) {
            quantityInput.addEventListener('input', (e) => {
                let value = parseInt(e.target.value) || this.selectedService.min;
                value = Math.max(this.selectedService.min, Math.min(this.selectedService.max, value));
                this.orderQuantity = value;
                this.updateQuantityInputs();
                this.updatePriceCalculation();
            });
        }
        
        // Quantity slider
        if (quantitySlider) {
            quantitySlider.addEventListener('input', (e) => {
                this.orderQuantity = parseInt(e.target.value);
                this.updateQuantityInputs();
                this.updatePriceCalculation();
            });
        }
        
        // Quantity buttons
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => {
                let newQuantity = this.orderQuantity - 100;
                newQuantity = Math.max(this.selectedService.min, newQuantity);
                this.orderQuantity = newQuantity;
                this.updateQuantityInputs();
                this.updatePriceCalculation();
            });
        }
        
        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => {
                let newQuantity = this.orderQuantity + 100;
                newQuantity = Math.min(this.selectedService.max, newQuantity);
                this.orderQuantity = newQuantity;
                this.updateQuantityInputs();
                this.updatePriceCalculation();
            });
        }
        
        // Preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const quantity = parseInt(btn.dataset.quantity);
                if (quantity >= this.selectedService.min && quantity <= this.selectedService.max) {
                    this.orderQuantity = quantity;
                    this.updateQuantityInputs();
                    this.updatePriceCalculation();
                    
                    // Update active preset
                    document.querySelectorAll('.preset-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                    btn.classList.add('active');
                }
            });
        });
        
        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }
    
    // Update quantity inputs
    updateQuantityInputs() {
        document.getElementById('orderQuantity').value = this.orderQuantity;
        document.getElementById('quantitySlider').value = this.orderQuantity;
        
        // Update slider min/max
        const slider = document.getElementById('quantitySlider');
        if (slider && this.selectedService) {
            slider.min = this.selectedService.min;
            slider.max = Math.min(this.selectedService.max, 50000);
        }
    }
    
    // Update price calculation
    updatePriceCalculation() {
        if (!this.selectedService) return;
        
        const price = calculatePrice(this.selectedService.price, this.orderQuantity);
        
        document.getElementById('priceUnit').textContent = `$${this.selectedService.price}`;
        document.getElementById('priceQuantity').textContent = formatNumber(this.orderQuantity);
        document.getElementById('priceDiscount').textContent = `$${price.discountAmount.toFixed(2)} (${price.discountPercent}%)`;
        document.getElementById('priceTotal').textContent = `$${price.finalPrice.toFixed(2)}`;
    }
    
    // Close modal
    closeModal() {
        document.getElementById('orderModal').style.display = 'none';
        this.selectedService = null;
    }
    
    // Confirm order
    confirmOrder() {
        if (!this.selectedService) return;
        
        const price = calculatePrice(this.selectedService.price, this.orderQuantity);
        const platform = getPlatformInfo(this.selectedService.platform);
        const link = document.getElementById('serviceLink').value;
        const additionalInfo = document.getElementById('additionalInfo').value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        // Create order message
        let message = `📋 سفارش جدید از Khan24\n\n`;
        message += `پلتفرم: ${platform.name}\n`;
        message += `سرویس: ${this.selectedService.name}\n`;
        message += `تعداد: ${formatNumber(this.orderQuantity)}\n`;
        message += `قیمت واحد: $${this.selectedService.price}/1000\n`;
        message += `تخفیف: ${price.discountPercent}%\n`;
        message += `مبلغ قابل پرداخت: $${price.finalPrice.toFixed(2)}\n`;
        message += `روش پرداخت: ${this.getPaymentMethodName(paymentMethod)}\n`;
        
        if (link) {
            message += `\nلینک: ${link}\n`;
        }
        
        if (additionalInfo) {
            message += `\nتوضیحات: ${additionalInfo}\n`;
        }
        
        message += `\n✅ لطفاً تایید کنید تا سفارش شروع شود.`;
        
        // Open WhatsApp
        window.open(`https://wa.me/93700000000?text=${encodeURIComponent(message)}`, '_blank');
        
        // Close modal
        this.closeModal();
        
        // Reset form
        document.getElementById('serviceLink').value = '';
        document.getElementById('additionalInfo').value = '';
    }
    
    // Get payment method name
    getPaymentMethodName(method) {
        switch(method) {
            case 'wallet': return 'کیف پول';
            case 'usdt': return 'USDT';
            case 'bank': return 'بانک';
            default: return 'نقدی';
        }
    }
}

// Initialize order system
const orderSystem = new OrderSystem();
