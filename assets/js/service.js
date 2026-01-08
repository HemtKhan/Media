class ServicesManager {
    constructor() {
        this.api = api;
        this.currentCategory = 'all';
        this.searchTerm = '';
        this.sortBy = 'default';
        this.filteredServices = [];
        this.services = [];
        this.categories = [];
    }

    // Initialize services
    async init() {
        this.showLoading();
        
        try {
            // Test API connection first
            const testResult = await this.api.testConnection();
            console.log('API Test Result:', testResult);
            
            if (testResult.success) {
                this.updateApiStatus(true);
                
                // Fetch services
                const servicesResult = await this.api.fetchServices();
                console.log('Services Result:', servicesResult);
                
                if (servicesResult.success) {
                    this.services = servicesResult.services;
                    this.categories = servicesResult.categories;
                    
                    console.log('Loaded Services:', this.services);
                    console.log('Loaded Categories:', this.categories);
                    
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
        } catch (error) {
            console.error('Initialization Error:', error);
            this.showError('خطای سیستمی: ' + error.message);
        }
    }

    // Render platform tabs
    renderPlatformTabs() {
        const tabsContainer = document.getElementById('platformTabs');
        if (!tabsContainer) return;
        
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
    filterServices() {
        let services = [];
        
        // Filter by category
        if (this.currentCategory === 'all') {
            services = [...this.services];
        } else {
            services = this.api.getServicesByCategory(this.currentCategory);
        }
        
        // Filter by search term
        if (this.searchTerm) {
            const searchLower = this.searchTerm.toLowerCase();
            services = services.filter(service => 
                service.name.toLowerCase().includes(searchLower) ||
                service.category.toLowerCase().includes(searchLower) ||
                service.type.toLowerCase().includes(searchLower)
            );
        }
        
        // Sort services
        services = this.sortServices(services);
        
        this.filteredServices = services;
        this.renderServices();
        
        // Show no results message if needed
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.display = services.length === 0 ? 'flex' : 'none';
        }
    }

    // Sort services
    sortServices(services) {
        const sorted = [...services];
        
        switch (this.sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate));
            case 'price-high':
                return sorted.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));
            case 'name':
                return sorted.sort((a, b) => a.name.localeCompare(b.name, 'fa'));
            default:
                return sorted.sort((a, b) => a.service - b.service);
        }
    }

    // Render services grid
    renderServices() {
        const grid = document.getElementById('servicesGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        if (this.filteredServices.length === 0) {
            return;
        }
        
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
        
        // Add premium class for high rate services
        if (formattedService.rate > 5) {
            card.classList.add('premium');
        }
        
        // Add new class for service ID < 100
        if (formattedService.id < 100) {
            card.classList.add('new');
        }
        
        card.innerHTML = `
            <div class="service-header">
                <h4>${service.name}</h4>
                <span class="service-category" style="color: ${platform.color}">
                    ${platform.name}
                </span>
            </div>
            
            <p class="service-description">${formattedService.description}</p>
            
            <div class="service-details">
                <div class="detail-item">
                    <span class="detail-label">قیمت (هر ۱۰۰۰)</span>
                    <span class="detail-value price">$${formattedService.rate.toFixed(2)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">حداقل</span>
                    <span class="detail-value min">${this.formatNumber(formattedService.min)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">حداکثر</span>
                    <span class="detail-value max">${this.formatNumber(formattedService.max)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">نوع</span>
                    <span class="detail-value">${service.type}</span>
                </div>
            </div>
            
            <div class="service-features">
                ${formattedService.features.map(feature => 
                    `<span class="feature-badge">${feature}</span>`
                ).join('')}
            </div>
            
            <div class="service-actions">
                <button class="btn btn-primary btn-sm btn-order" onclick="servicesManager.orderService(${service.service}, '${service.name}')">
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
    orderService(serviceId, serviceName) {
        const service = this.services.find(s => s.service === serviceId);
        if (!service) return;
        
        const platform = this.api.getPlatformInfo(service.category);
        const message = `📋 سفارش جدید از Khan24\n\nسرویس: ${serviceName}\nپلتفرم: ${platform.name}\nدسته: ${service.category}\nنوع: ${service.type}\nقیمت: $${service.rate} برای هر ۱۰۰۰\nحداقل: ${service.min}\nحداکثر: ${service.max}`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/93700000000?text=${encodedMessage}`, '_blank');
    }

    // Show service details
    showServiceDetails(serviceId) {
        const service = this.services.find(s => s.service === serviceId);
        if (!service) return;
        
        const formattedService = this.api.formatService(service);
        const features = formattedService.features.map(f => `✅ ${f}`).join('\n');
        
        const details = `
📋 **جزئیات سرویس**

**نام:** ${service.name}
**پلتفرم:** ${formattedService.platformName}
**دسته‌بندی:** ${service.category}
**نوع:** ${service.type}

💰 **قیمت‌گذاری**
قیمت هر ۱۰۰۰: $${formattedService.rate.toFixed(2)}
حداقل سفارش: ${this.formatNumber(formattedService.min)}
حداکثر سفارش: ${this.formatNumber(formattedService.max)}

✨ **ویژگی‌ها**
${features}

${formattedService.refill ? '🔄 **قابل پر کردن مجدد**' : '❌ غیر قابل پر کردن مجدد'}
${formattedService.cancel ? '✓ **قابل لغو**' : '❌ غیر قابل لغو'}
        `;
        
        alert(details);
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
        if (statusElement) {
            statusElement.textContent = connected ? 'متصل ✅' : 'قطع ❌';
            statusElement.className = connected ? 'stat-value status-active' : 'stat-value status-inactive';
        }
    }

    // Update services count
    updateServicesCount(count) {
        const countElement = document.getElementById('servicesCount');
        if (countElement) {
            countElement.textContent = count;
        }
    }

    // Show loading state
    showLoading() {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const servicesGrid = document.getElementById('servicesGrid');
        const noResults = document.getElementById('noResults');
        
        if (loadingState) loadingState.style.display = 'flex';
        if (errorState) errorState.style.display = 'none';
        if (servicesGrid) servicesGrid.style.display = 'none';
        if (noResults) noResults.style.display = 'none';
    }

    // Hide loading state
    hideLoading() {
        const loadingState = document.getElementById('loadingState');
        const servicesGrid = document.getElementById('servicesGrid');
        
        if (loadingState) loadingState.style.display = 'none';
        if (servicesGrid) servicesGrid.style.display = 'grid';
    }

    // Show error
    showError(message) {
        const loadingState = document.getElementById('loadingState');
        const errorState = document.getElementById('errorState');
        const servicesGrid = document.getElementById('servicesGrid');
        const errorMessage = document.getElementById('errorMessage');
        
        if (loadingState) loadingState.style.display = 'none';
        if (errorState) errorState.style.display = 'flex';
        if (servicesGrid) servicesGrid.style.display = 'none';
        if (errorMessage) errorMessage.textContent = message;
        
        console.error('Service Manager Error:', message);
    }
}

// Initialize services manager
const servicesManager = new ServicesManager();
