document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = menuToggle.querySelector('i');
            
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    // Form submission
    const budgetForm = document.getElementById('budget-form');
    if (budgetForm) {
        budgetForm.action = 'https://formsubmit.co/clickservicos.ferreira@gmail.com';
budgetForm.method = 'POST';
        
        // Add hidden fields for FormSubmit configuration
        const inputRedirect = document.createElement('input');
        inputRedirect.type = 'hidden';
        inputRedirect.name = '_next';
        inputRedirect.value = window.location.href + '?success=true';
        budgetForm.appendChild(inputRedirect);

        const inputCaptcha = document.createElement('input');
        inputCaptcha.type = 'hidden';
        inputCaptcha.name = '_captcha';
        inputCaptcha.value = 'false';
        budgetForm.appendChild(inputCaptcha);

        const inputTemplate = document.createElement('input');
        inputTemplate.type = 'hidden';
        inputTemplate.name = '_template';
        inputTemplate.value = 'table';
        budgetForm.appendChild(inputTemplate);

        budgetForm.addEventListener('submit', function(e) {
            // Client-side validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            
            if (!name || !email || !phone || !service) {
                e.preventDefault();
                showToast('Por favor, preencha todos os campos obrigatórios!', 'error');
                return;
            }

            // Show loading state
            const submitBtn = budgetForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        });

        // Check for success parameter in URL
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('success')) {
            showToast('Solicitação enviada com sucesso! Entraremos em contato em breve.', 'success');
            
            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Reset form
            budgetForm.reset();
        }
    }
// Portfolio filter
    const filterButtons = document.querySelectorAll('#portfolio button');
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-blue-600', 'text-white');
                    btn.classList.add('bg-white');
                });
                
                // Add active class to clicked button
                this.classList.remove('bg-white');
                this.classList.add('bg-blue-600', 'text-white');
                
                // In a real app, filter portfolio items here
                // For now, just log the filter
                console.log('Filter portfolio by:', this.textContent.trim());
            });
        });
    }

    // Show toast notification
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`;
        toast.innerHTML = `
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
            ${message}
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
