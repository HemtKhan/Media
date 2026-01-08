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

// Platform mapping based on actual Naizop categories
const PLATFORM_CATEGORIES = {
    'instagram': { name: 'اینستاگرام', icon: 'fab fa-instagram', color: '#E1306C' },
    'tiktok': { name: 'تیک‌تاک', icon: 'fab fa-tiktok', color: '#000000' },
    'youtube': { name: 'یوتیوب', icon: 'fab fa-youtube', color: '#FF0000' },
    'facebook': { name: 'فیسبوک', icon: 'fab fa-facebook-f', color: '#1877F2' },
    'twitter': { name: 'توییتر', icon: 'fab fa-twitter', color: '#1DA1F2' },
    'telegram': { name: 'تلگرام', icon: 'fab fa-telegram', color: '#26A5E4' },
    'spotify': { name: 'اسپاتیفای', icon: 'fab fa-spotify', color: '#1DB954' },
    'reddit': { name: 'ردیت', icon: 'fab fa-reddit', color: '#FF4500' },
    // Add more categories based on your API response
    'First Category': { name: 'دسته اول', icon: 'fas fa-star', color: '#10B981' },
    'Second Category': { name: 'دسته دوم', icon: 'fas fa-heart', color: '#F59E0B' }
};

class API {
    constructor(apiKey) {
        this.apiKey = apiKey || API_CONFIG.API_KEY;
        this.baseURL = API_CONFIG.BASE_URL;
        this.services = [];
        this.categories = new Set();
    }

    // Test API Connection
    async testConnection() {
        try {
            const url = `${this.baseURL}/${API_CONFIG.ENDPOINTS.BALANCE}?key=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Handle API errors
            if (data.error) {
                throw new Error(data.error);
            }

            return {
                success: true,
                balance: data.balance || '0.00',
                currency: data.currency || 'USD'
            };
        } catch (error) {
            console.error('API Connection Error:', error);
            return {
                success: false,
                error: error.message || 'خطا در اتصال به API'
            };
        }
    }

    // Fetch all services
    async fetchServices() {
        try {
            const url = `${this.baseURL}/${API_CONFIG.ENDPOINTS.SERVICES}?key=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Handle API errors
            if (data.error) {
                throw new Error(data.error);
            }

            // Check if data is an array
            if (!Array.isArray(data)) {
                throw new Error('فرمت داده‌های دریافتی صحیح نیست');
            }

            this.services = data;
            this.extractCategories();
            
            return {
                success: true,
                services: this.services,
                categories: Array.from(this.categories)
            };
        } catch (error) {
            console.error('Fetch Services Error:', error);
            return {
                success: false,
                error: error.message || 'خطا در دریافت خدمات'
            };
        }
    }

    // Extract unique categories
    extractCategories() {
        this.categories.clear();
        this.services.forEach(service => {
            if (service.category) {
                this.categories.add(service.category);
            }
        });
    }

    // Get services by category
    getServicesByCategory(category) {
        if (category === 'all') {
            return this.services;
        }
        return this.services.filter(service => service.category === category);
    }

    // Get platform info
    getPlatformInfo(category) {
        // First check direct mapping
        if (PLATFORM_CATEGORIES[category]) {
            return PLATFORM_CATEGORIES[category];
        }
        
        // Check case-insensitive
        const lowerCategory = category.toLowerCase();
        for (const [key, value] of Object.entries(PLATFORM_CATEGORIES)) {
            if (key.toLowerCase() === lowerCategory) {
                return value;
            }
        }
        
        // Default fallback
        return {
            name: category,
            icon: 'fas fa-globe',
            color: '#6B7280'
        };
    }

    // Format service for display
    formatService(service) {
        const platform = this.getPlatformInfo(service.category);
        
        return {
            id: service.service,
            name: service.name,
            category: service.category,
            platformName: platform.name,
            type: service.type,
            rate: parseFloat(service.rate),
            min: parseInt(service.min),
            max: parseInt(service.max),
            refill: service.refill || false,
            cancel: service.cancel || false,
            dripfeed: service.dripfeed || false,
            description: this.generateDescription(service),
            features: this.getFeatures(service)
        };
    }

    // Generate service description
    generateDescription(service) {
        const platform = this.getPlatformInfo(service.category);
        return `${service.name} - ${service.type} برای ${platform.name}`;
    }

    // Get service features
    getFeatures(service) {
        const features = [];
        
        if (service.refill) features.push('پر کردن مجدد');
        if (service.cancel) features.push('قابل لغو');
        if (service.dripfeed) features.push('ارسال تدریجی');
        if (parseFloat(service.rate) < 1) features.push('قیمت اقتصادی');
        
        return features.length > 0 ? features : ['سرویس استاندارد'];
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

    // Format currency
    formatCurrency(amount) {
        return `$${parseFloat(amount).toFixed(2)}`;
    }
}

// Export API instance
const api = new API();
