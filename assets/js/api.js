// API Configuration
const API_CONFIG = {
    BASE_URL: 'https://naizop.com/api/v2',
    API_KEY: '07b8850f34c3ad7e91eaed3e505312cb',
    ENDPOINTS: {
        BALANCE: 'balance',
        SERVICES: 'services',
        ORDER: 'order',
        STATUS: 'status'
    }
};

// Platform mapping
const PLATFORMS = {
    'instagram': { name: 'اینستاگرام', icon: 'fab fa-instagram', color: '#E1306C' },
    'tiktok': { name: 'تیک‌تاک', icon: 'fab fa-tiktok', color: '#000000' },
    'youtube': { name: 'یوتیوب', icon: 'fab fa-youtube', color: '#FF0000' },
    'facebook': { name: 'فیسبوک', icon: 'fab fa-facebook-f', color: '#1877F2' },
    'twitter': { name: 'توییتر', icon: 'fab fa-twitter', color: '#1DA1F2' },
    'telegram': { name: 'تلگرام', icon: 'fab fa-telegram', color: '#26A5E4' },
    'spotify': { name: 'اسپاتیفای', icon: 'fab fa-spotify', color: '#1DB954' },
    'reddit': { name: 'ردیت', icon: 'fab fa-reddit', color: '#FF4500' }
};

class API {
    constructor(apiKey) {
        this.apiKey = apiKey || API_CONFIG.API_KEY;
        this.baseURL = API_CONFIG.BASE_URL;
        this.services = [];
        this.categories = [];
    }

    // Test API Connection
    async testConnection() {
        try {
            const response = await this.fetchAPI(API_CONFIG.ENDPOINTS.BALANCE);
            return {
                success: true,
                balance: response.balance,
                currency: response.currency
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Fetch all services
    async fetchServices() {
        try {
            const response = await this.fetchAPI(API_CONFIG.ENDPOINTS.SERVICES);
            this.services = response;
            this.extractCategories();
            return {
                success: true,
                services: this.services,
                categories: this.categories
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Fetch services by category
    async fetchServicesByCategory(category) {
        if (!this.services.length) {
            await this.fetchServices();
        }
        
        return this.services.filter(service => 
            service.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Extract unique categories
    extractCategories() {
        const categories = new Set();
        this.services.forEach(service => {
            if (service.category) {
                categories.add(service.category.toLowerCase());
            }
        });
        this.categories = Array.from(categories);
    }

    // Generic API fetch method
    async fetchAPI(endpoint, params = {}) {
        const url = new URL(`${this.baseURL}/${endpoint}`);
        
        // Add API key to params
        params.key = this.apiKey;
        
        // Add params to URL
        Object.keys(params).forEach(key => 
            url.searchParams.append(key, params[key])
        );

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Check for API errors
        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    }

    // Format service data for display
    formatService(service) {
        return {
            id: service.service,
            name: service.name,
            category: service.category,
            type: service.type,
            rate: service.rate,
            min: service.min,
            max: service.max,
            dripfeed: service.dripfeed || false,
            refill: service.refill || false,
            cancel: service.cancel || false,
            description: this.getServiceDescription(service),
            features: this.extractFeatures(service)
        };
    }

    // Generate service description
    getServiceDescription(service) {
        const platform = PLATFORMS[service.category]?.name || service.category;
        return `${service.name} برای ${platform} - سرویس حرفه‌ای رشد شبکه‌های اجتماعی`;
    }

    // Extract features from service
    extractFeatures(service) {
        const features = [];
        
        if (service.dripfeed) features.push('ارسال تدریجی');
        if (service.refill) features.push('پر کردن مجدد');
        if (service.cancel) features.push('قابل لغو');
        if (parseFloat(service.rate) < 0.5) features.push('قیمت مناسب');
        
        return features;
    }

    // Get platform info
    getPlatformInfo(category) {
        return PLATFORMS[category] || { 
            name: category, 
            icon: 'fas fa-globe', 
            color: '#6b7280' 
        };
    }

    // Calculate price for quantity
    calculatePrice(service, quantity) {
        const rate = parseFloat(service.rate);
        const min = parseInt(service.min);
        const max = parseInt(service.max);
        
        if (quantity < min) quantity = min;
        if (quantity > max) quantity = max;
        
        return (rate * quantity).toFixed(2);
    }
}

// Export API instance
const api = new API();
