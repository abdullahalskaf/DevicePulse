document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const productsPerPage = 16;
    const totalProducts = 200; // Example for pagination

    function generateProducts(page) {
        const productGrid = document.getElementById('product-grid');
        productGrid.innerHTML = '';

        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;

        for (let i = start; i < end; i++) {
            const product = document.createElement('div');
            product.classList.add('product-item');
            product
            product.innerHTML = `
                <img src="https://via.placeholder.com/150" alt="Product Image">
                <h3>Product ${i + 1}</h3>
                <p>Product description here.</p>
                <button class="details-btn">View Details</button>
            `;
            productGrid.appendChild(product);
        }
    }

    function generatePagination() {
        const pageNumbers = document.getElementById('page-numbers');
        pageNumbers.innerHTML = '';

        for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.innerText = i;
            if (i === currentPage) {
                pageLink.classList.add('active');
            }

            pageLink.addEventListener('click', function(event) {
                event.preventDefault();
                currentPage = i;
                generateProducts(currentPage);
                generatePagination();
            });
            pageNumbers.appendChild(pageLink);
        }
    }

    // تدوير منتجات الأكثر شعبية
    const popularProducts = document.getElementById('popular-products');
    let popularIndex = 0;

    document.getElementById('next-popular').addEventListener('click', function() {
        popularIndex = (popularIndex + 1) % 10;
        popularProducts.style.transform = `translateX(-${popularIndex * 100}%)`;
    });

    document.getElementById('prev-popular').addEventListener('click', function() {
        popularIndex = (popularIndex - 1 + 10) % 10;
        popularProducts.style.transform = `translateX(-${popularIndex * 100}%)`;
    });

    // تدوير منتجات جديدة
    const newProducts = document.getElementById('new-products');
    let newIndex = 0;

    document.getElementById('next-new').addEventListener('click', function() {
        newIndex = (newIndex + 1) % 10;
        newProducts.style.transform = `translateX(-${newIndex * 100}%)`;
    });

    document.getElementById('prev-new').addEventListener('click', function() {
        newIndex = (newIndex - 1 + 10) % 10;
        newProducts.style.transform = `translateX(-${newIndex * 100}%)`;
    });

    // توليد المنتجات وعرضها في البداية
    generateProducts(currentPage);
    generatePagination();

    // Toggle chatbox
    const chatButton = document.getElementById('chat-button');
    const chatContent = document.getElementById('chat-content');
    const chatTitle = document.getElementById('chat-title');
    const chatMessage = document.getElementById('chat-message');

    chatButton.addEventListener('click', function() {
        chatContent.style.display = chatContent.style.display === 'block' ? 'none' : 'block';
    });

    const languageSelect = document.getElementById('language');
    languageSelect.addEventListener('change', function() {
        if (this.value === 'ar') {
            chatButton.innerText = 'مركز المساعدة';
            chatTitle.innerText = 'مرحبًا بمركز المساعدة';
            chatMessage.innerText = 'كيف يمكننا مساعدتك اليوم؟';

            // تحديث النصوص في الشريط الإعلاني للعربية
            const arabicTexts = [
                'اهلا بكم في افضل موقع ترشيح منتجات في العالم.',
                'مسوق بالعمولة لأكثر من 100,000 منتج لنختار ما يناسب رغباتك.',
                'انضم الينا للحصول على اخر الاصدارات للأجهزة والعروض حال نزولها.',
                'بالإضافة لاخر الاخبار التقنية العالمية.',
                'كن قبل اي احد لتكون مميز.'
            ];
            updateAnnouncement(arabicTexts, true);

        } else {
            chatButton.innerText = 'Help Center';
            chatTitle.innerText = 'Welcome to Help Center';
            chatMessage.innerText = 'How can we assist you today?';

            // تحديث النصوص في الشريط الإعلاني للإنجليزية
            const englishTexts = [
                'Welcome to the world’s best product recommendation site.',
                'Affiliate marketing for over 100,000 products to fit your needs.',
                'Join us to get the latest releases and offers as they come.',
                'Along with the latest global tech news.',
                'Be ahead of everyone to stand out.'
            ];
            updateAnnouncement(englishTexts, false);
        }
    });

    // Function to update the announcement texts
    function updateAnnouncement(texts, isArabic) {
        const announcementContent = document.querySelector('.announcement-content');
        announcementContent.innerHTML = texts.map(text => `<div class="announcement-text">${text}</div>`).join('');
        if (isArabic) {
            announcementContent.style.direction = 'rtl';
            announcementContent.style.animation = 'scroll-right 40s linear infinite'; // أبطأ بـ 4 مرات
        } else {
            announcementContent.style.direction = 'ltr';
            announcementContent.style.animation = 'scroll-left 40s linear infinite'; // أبطأ بـ 4 مرات
        }
    }

    // Initial setup
    const initialTexts = [
        'Welcome to the world’s best product recommendation site.',
        'Affiliate marketing for over 100,000 products to fit your needs.',
        'Join us to get the latest releases and offers as they come.',
        'Along with the latest global tech news.',
        'Be ahead of everyone to stand out.'
    ];
    updateAnnouncement(initialTexts, false); // Default to English
});

