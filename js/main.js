document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu mobile
    const createMobileMenu = () => {
        const nav = document.querySelector('.main-nav');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        nav.parentNode.insertBefore(menuButton, nav);
        
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuButton.innerHTML = nav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    };

    // Gestion du scroll smooth pour les ancres
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Gestion du lazy loading des images
    const initLazyLoading = () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => lazyLoadObserver.observe(img));
    };

    // Initialisation des fonctionnalités
    createMobileMenu();
    initSmoothScroll();
    initLazyLoading();

    // Gestion des widgets de la sidebar
    const initSidebarWidgets = () => {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        // Fonction pour charger dynamiquement le contenu des widgets
        const loadWidgetContent = async (widgetElement, endpoint) => {
            try {
                const response = await fetch(endpoint);
                const data = await response.json();
                widgetElement.innerHTML = data.content;
            } catch (error) {
                console.error('Erreur de chargement du widget:', error);
            }
        };

        // Ajout de classes pour l'animation des widgets au scroll
        const widgets = sidebar.querySelectorAll('.widget');
        const observerOptions = {
            threshold: 0.1
        };

        const widgetObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('widget-visible');
                }
            });
        }, observerOptions);

        widgets.forEach(widget => {
            widget.classList.add('widget-hidden');
            widgetObserver.observe(widget);
        });
    };

    initSidebarWidgets();

    // Gestion des boutons de partage social
    const initShareButtons = () => {
        const shareButtons = document.querySelectorAll('.share-btn');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const url = encodeURIComponent(window.location.href);
                const title = encodeURIComponent(document.title);
                let shareUrl;

                if (button.classList.contains('facebook')) {
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                } else if (button.classList.contains('twitter')) {
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                } else if (button.classList.contains('whatsapp')) {
                    shareUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
                }

                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    };

    // Ajout de la fonctionnalité de partage à l'initialisation
    initShareButtons();
});