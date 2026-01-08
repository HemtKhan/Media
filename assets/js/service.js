class ServicesManager {
    constructor() {
        this.api = api;
        this.currentCategory = 'all';
        this.searchTerm = '';
        this.sortBy = 'default';
        this.filteredServices = [];
    }

    // Initialize services
    async init() {
        this.showLoading();
        
        // Test API connection
        const testResult = await this.api.testConnection();
        this.updateApiStatus(testResult.success);
        
        if (testResult.success) {
            // Fetch services
            const servicesResult = await this.api.fetchServices();
            
            if (servicesResult.success) {
                this.services = servicesResult.services;
                this.categories = servicesResult.categories;
                
                this.updateServicesCount(this.services.length);
                this.renderPlatformTabs();
                this.filterServices();
                this.hideLoading();
            } else {
                this.showError('خطا در بارگذاری خدمات: ' + servicesResult.error);
            }
        } else {
            this.showError('خطا در اتصال به API: ' + testResult.error);
        }
    }

    // Render platform tabs
    renderPlatformTabs() {
        const tabsContainer = document.getElementById('platformTabs');
        tabsContainer.innerHTML = '';

        // All tab
        const allTab = this.createTab('all', 'همه خدمات', 'fas fa-th-large');
        tabsContainer.appendChild(allTab);

        // Platform tabs
        this.categories.forEach(category => {
            const platform = this.api.getPlatformInfo(category);
            const tab = this.createTab(category, platform.name, platform.icon);
            tabsContainer.appendChild(tab);
        });

        // Add click events
        document.querySelectorAll('.platform-tab').forEach(tab => {
            tab.addEventListener('click', () => this.selectTab(tab.dataset.category));
        });
    }

    // Create tab element
    createTab(category, name, icon) {
        const tab = document.createElement('div');
        tab.className = `platform-tab ${this.currentCategory === category ? 'active' : ''}`;
        tab.dataset.category = category;
        tab.innerHTML = `
            <i class="${icon}"></i>
            <span>${name}</span>
        `;
        return tab;
    }

    // Select tab
    selectTab(category) {
        this.currentCategory = category;
        
        // Update active tab
        document.querySelectorAll('.platform-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });
        
        // Filter services
        this.filterServices();
    }

    // Filter services based on category, search, and sort
    async filterServices() {
        let services = [];
        
        // Filter by category
        if (this.currentCategory === 'all') {
            services = this.services;
        } else {
            services = await this.api.fetchServicesByCategory(this.currentCategory);
        }
        
        // Filter by search term
        if (this.searchTerm) {
            const searchLower = this.searchTerm.toLowerCase();
            services = services.filter(service => 
                service.name.toLowerCase().includes(searchLower) ||
                service.category.toLowerCase().includes(searchLower)
            );
        }
        
        // Sort services
        services = this.sortServices(services);
        
        this.filteredServices = services;
        this.renderServices();
        
        // Show no results message if needed
        const noResults = document.getElementById('noResults');
        noResults.style.display = services.length === 0 ? 'block' : 'none';
    }

    // Sort services
    sortServices(services) {
        switch (this.sortBy) {
            case 'price-low':
                return [...services].sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
            case 'price-high':
                return [...services].sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
            case 'name':
                return [...services].sort((a, b) => a.name.localeCompare(b.name, 'fa'));
            default:
                return services;
        }
    }

    // Render services grid
    renderServices() {
        const grid = document.getElementById('servicesGrid');
        grid.innerHTML = '';
        
        this.filteredServices.forEach(service => {
            const serviceCard = this.createServiceCard(service);
            grid.appendChild(serviceCard);
        });
    }

    // Create service card
    createServiceCard(service) {
        const platform = this.api.getPlatformInfo(service.category);
        const formattedService = this.api.formatService(service);
        
        const card = document.createElement('div');
        card.className = 'service-card';
        
        if (parseFloat(service.rate) > 1) card.classList.add('premium');
        if (service.service < 1000) card.classList.add('new');
        
        card.innerHTML = `
            <div class="service-header">
                <h4>${formattedService.name}</h4>
                <span class="service-category">${platform.name}</span>
            </div>
            
            <p class="service-description">${formattedService.description}</p>
            
            <div class="service-details">
                <div class="detail-item">
                    <span class="detail-label">قیمت هر ۱۰۰۰</span>
                    <span class="detail-value price">$${parseFloat(service.rate).toFixed(2)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">حداقل</span>
                    <span class="detail-value min">${service.min}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">حداکثر</span>
                    <span class="detail-value max">${this.formatNumber(service.max)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">نوع</span>
                    <span class="detail-value">${service.type}</span>
                </div>
            </div>
            
            <div class="service-actions">
                <button class="btn btn-primary btn-sm btn-order" onclick="servicesManager.orderService(${service.service})">
                    <i class="fas fa-shopping-cart"></i> سفارش
                </button>
                <button class="btn btn-sm btn-details" onclick="servicesManager.showServiceDetails(${service.service})">
                    <i class="fas fa-info-circle"></i> جزئیات
                </button>
            </div>
        `;
        
        return card;
    }

    // Order service
    orderService(serviceId) {
        const service = this.filteredServices.find(s => s.service === serviceId);
        if (!service) return;
        
        const platform = this.api.getPlatformInfo(service.category);
        const message = `سفارش سرویس: ${service.name}\nپلتفرم: ${platform.name}\nقیمت: $${service.rate} برای هر ۱۰۰۰\nحداقل: ${service.min}\nحداکثر: ${service.max}`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/93700000000?text=${encodedMessage}`, '_blank');
    }

    // Show service details
    showServiceDetails(serviceId) {
        const service = this.filteredServices.find(s => s.service === serviceId);
        if (!service) return;
        
        const platform = this.api.getPlatformInfo(service.category);
        const formattedService = this.api.formatService(service);
        
        alert(`
            جزئیات سرویس:
            
            نام: ${service.name}
            پلتفرم: ${platform.name}
            دسته: ${service.category}
            نوع: ${service.type}
            
            قیمت هر ۱۰۰۰: $${parseFloat(service.rate).toFixed(2)}
            حداقل سفارش: ${service.min}
            حداکثر سفارش: ${this.formatNumber(service.max)}
            
            ویژگی‌ها:
            ${formattedService.features.map(f => `• ${f}`).join('\n')}
            
            ${service.refill ? '✅ قابل پر کردن مجدد' : '❌ غیر قابل پر کردن مجدد'}
            ${service.dripfeed ? '✅ ارسال تدریجی' : '❌ ارسال یکجا'}
            ${service.cancel ? '✅ قابل لغو' : '❌ غیر قابل لغو'}
        `);
    }

    // Format large numbers
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Update API status
    updateApiStatus(connected) {
        const statusElement = document.getElementById('apiStatus');
        statusElement.textContent = connected ? 'متصل ✅' : 'قطع ❌';
        statusElement.className = connected ? 'stat-value status-active' : 'stat-value status-inactive';
    }

    // Update services count
    updateServicesCount(count) {
        document.getElementById('servicesCount').textContent = count;
    }

    // Show loading state
    showLoading() {
        document.getElementById('loadingState').style.display = 'block';
        document.getElementById('errorState').style.display = 'none';
        document.getElementById('servicesGrid').style.display = 'none';
        document.getElementById('noResults').style.display = 'none';
    }

    // Hide loading state
    hideLoading() {
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('servicesGrid').style.display = 'grid';
    }

    // Show error
    showError(message) {
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('errorState').style.display = 'flex';
        document.getElementById('servicesGrid').style.display = 'none';
        document.getElementById('errorMessage').textContent = message;
    }
}

// Initialize services manager
const servicesManager = new ServicesManager();
