// Database of all services
const SERVICES_DATA = {
    instagram: [
        {
            id: 1,
            name: "فالوور واقعی اینستاگرام",
            description: "فالوورهای واقعی با پروفایل کامل، فعالیت طبیعی",
            category: "followers",
            price: 3.50,
            min: 100,
            max: 10000,
            dripfeed: true,
            refill: true,
            avgTime: "5-30 دقیقه",
            quality: "عالی",
            recommended: true
        },
        {
            id: 2,
            name: "لایک پست واقعی",
            description: "لایک‌های واقعی از کاربران فعال",
            category: "likes",
            price: 0.80,
            min: 50,
            max: 5000,
            dripfeed: false,
            refill: true,
            avgTime: "2-10 دقیقه",
            quality: "خوب"
        },
        {
            id: 3,
            name: "کامنت فارسی واقعی",
            description: "کامنت‌های فارسی مرتبط با محتوا",
            category: "comments",
            price: 2.00,
            min: 10,
            max: 1000,
            dripfeed: true,
            refill: false,
            avgTime: "10-60 دقیقه",
            quality: "عالی",
            recommended: true
        },
        {
            id: 4,
            name: "ویو ریلز واقعی",
            description: "بازدید واقعی برای ریلز اینستاگرام",
            category: "views",
            price: 1.20,
            min: 500,
            max: 50000,
            dripfeed: false,
            refill: true,
            avgTime: "1-5 دقیقه",
            quality: "خوب"
        },
        {
            id: 5,
            name: "ذخیره پست",
            description: "سیو واقعی پست در ذخیره‌ها",
            category: "shares",
            price: 1.50,
            min: 50,
            max: 2000,
            dripfeed: true,
            refill: true,
            avgTime: "5-30 دقیقه",
            quality: "خوب"
        }
    ],
    
    tiktok: [
        {
            id: 6,
            name: "ویو ویدیو تیک‌تاک",
            description: "بازدید واقعی برای ویدیوهای تیک‌تاک",
            category: "views",
            price: 1.00,
            min: 500,
            max: 100000,
            dripfeed: false,
            refill: true,
            avgTime: "1-5 دقیقه",
            quality: "عالی",
            recommended: true
        },
        {
            id: 7,
            name: "لایک تیک‌تاک واقعی",
            description: "لایک از کاربران فعال تیک‌تاک",
            category: "likes",
            price: 0.60,
            min: 100,
            max: 10000,
            dripfeed: false,
            refill: true,
            avgTime: "2-15 دقیقه",
            quality: "خوب"
        },
        {
            id: 8,
            name: "فالوور تیک‌تاک",
            description: "فالوور واقعی و فعال تیک‌تاک",
            category: "followers",
            price: 4.00,
            min: 100,
            max: 5000,
            dripfeed: true,
            refill: true,
            avgTime: "10-60 دقیقه",
            quality: "عالی"
        }
    ],
    
    youtube: [
        {
            id: 9,
            name: "ویو یوتیوب واقعی",
            description: "بازدید واقعی از ویدیوهای یوتیوب",
            category: "views",
            price: 1.50,
            min: 1000,
            max: 100000,
            dripfeed: true,
            refill: true,
            avgTime: "5-30 دقیقه",
            quality: "عالی",
            recommended: true
        },
        {
            id: 10,
            name: "سابسکرایبر واقعی",
            description: "مشترکین واقعی کانال یوتیوب",
            category: "followers",
            price: 8.00,
            min: 100,
            max: 5000,
            dripfeed: true,
            refill: false,
            avgTime: "30-180 دقیقه",
            quality: "عالی"
        }
    ],
    
    facebook: [
        {
            id: 11,
            name: "لایک صفحه فیسبوک",
            description: "لایک واقعی برای صفحه فیسبوک",
            category: "likes",
            price: 2.50,
            min: 100,
            max: 10000,
            dripfeed: true,
            refill: true,
            avgTime: "10-60 دقیقه",
            quality: "خوب"
        }
    ],
    
    twitter: [
        {
            id: 12,
            name: "فالوور توییتر واقعی",
            description: "فالوور فعال توییتر",
            category: "followers",
            price: 3.00,
            min: 100,
            max: 5000,
            dripfeed: true,
            refill: true,
            avgTime: "15-90 دقیقه",
            quality: "خوب"
        }
    ],
    
    telegram: [
        {
            id: 13,
            name: "عضو کانال تلگرام",
            description: "عضو واقعی برای کانال تلگرام",
            category: "followers",
            price: 4.00,
            min: 100,
            max: 5000,
            dripfeed: true,
            refill: false,
            avgTime: "10-60 دقیقه",
            quality: "عالی"
        }
    ],
    
    spotify: [
        {
            id: 14,
            name: "پخش اسپاتیفای",
            description: "پخش واقعی آهنگ در اسپاتیفای",
            category: "views",
            price: 2.00,
            min: 1000,
            max: 100000,
            dripfeed: false,
            refill: true,
            avgTime: "1-10 دقیقه",
            quality: "خوب"
        }
    ],
    
    reddit: [
        {
            id: 15,
            name: "آپ‌ووت رددیت",
            description: "آپ‌ووت واقعی برای پست رددیت",
            category: "likes",
            price: 1.20,
            min: 100,
            max: 5000,
            dripfeed: false,
            refill: true,
            avgTime: "5-30 دقیقه",
            quality: "خوب"
        }
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

// Get all services
function getAllServices() {
    let allServices = [];
    for (const platform in SERVICES_DATA) {
        SERVICES_DATA[platform].forEach(service => {
            allServices.push({
                ...service,
                platform: platform
            });
        });
    }
    return allServices;
}

// Get services by platform
function getServicesByPlatform(platformId) {
    return SERVICES_DATA[platformId] || [];
}

// Get recommended services
function getRecommendedServices() {
    let recommended = [];
    for (const platform in SERVICES_DATA) {
        SERVICES_DATA[platform].forEach(service => {
            if (service.recommended) {
                recommended.push({
                    ...service,
                    platform: platform
                });
            }
        });
    }
    return recommended;
}

// Get platform info
function getPlatformInfo(platformId) {
    return PLATFORMS.find(p => p.id === platformId) || PLATFORMS[0];
}

// Format price
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

// Format number with Persian separators
function formatNumber(num) {
    return num.toLocaleString('fa-IR');
}

// Calculate price with quantity
function calculatePrice(basePrice, quantity) {
    const baseTotal = (basePrice * quantity) / 1000;
    
    // Apply quantity discounts
    let discount = 0;
    if (quantity >= 10000) {
        discount = 0.20;
    } else if (quantity >= 5000) {
        discount = 0.15;
    } else if (quantity >= 1000) {
        discount = 0.10;
    } else if (quantity >= 500) {
        discount = 0.05;
    }
    
    const finalPrice = baseTotal * (1 - discount);
    const discountAmount = baseTotal - finalPrice;
    
    return {
        baseTotal,
        discountAmount,
        finalPrice,
        discountPercent: discount * 100
    };
}
