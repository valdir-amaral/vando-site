/* =========================================
   VANDO REPAROS - MAIN JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* =====================================
       SWIPER
    ===================================== */

    const swiperElement = document.querySelector(".hero-swiper");

    if (swiperElement && typeof Swiper !== "undefined") {
        new Swiper(".hero-swiper", {
            speed: 750,
            spaceBetween: 0,
            loop: true,

            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },

            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },

            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },

            keyboard: {
                enabled: true
            },

            a11y: {
                enabled: true
            },

            on: {
                init: function () {
                    if (typeof AOS !== "undefined") {
                        AOS.refresh();
                    }
                }
            }
        });
    }

    /* =====================================
       AOS - ANIMAÇÕES DE SCROLL
    ===================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 90,
            delay: 0,
            mirror: false,
            anchorPlacement: "top-bottom",
            disable: prefersReducedMotion
        });
    }

    /* =====================================
       LOADING SCREEN
    ===================================== */

    const loadingScreen = document.getElementById("loading-screen");

    function hideLoadingScreen() {
        if (!loadingScreen || loadingScreen.classList.contains("hide")) {
            return;
        }

        loadingScreen.classList.add("hide");

        window.setTimeout(() => {
            loadingScreen.remove();
        }, 650);
    }

    // O listener é registrado cedo; o fallback cobre páginas já carregadas.
    window.addEventListener("load", hideLoadingScreen, { once: true });

    if (document.readyState === "complete") {
        hideLoadingScreen();
    }

    // Evita deixar o loading preso se algum recurso externo demorar indefinidamente.
    window.setTimeout(hideLoadingScreen, 8000);

    /* =====================================
       FECHAR MENU MOBILE APÓS CLICAR
    ===================================== */

    const navbarCollapse = document.getElementById("navbarNavDropdown");
    const navLinks = document.querySelectorAll(
        "#navbarNavDropdown .nav-link, #navbarNavDropdown .nav-whatsapp"
    );

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (
                navbarCollapse &&
                navbarCollapse.classList.contains("show") &&
                typeof bootstrap !== "undefined"
            ) {
                const collapse = bootstrap.Collapse.getOrCreateInstance(
                    navbarCollapse
                );
                collapse.hide();
            }
        });
    });

    /* =====================================
       ANO AUTOMÁTICO NO RODAPÉ
    ===================================== */

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* =====================================
       ATUALIZA POSIÇÕES DO AOS
    ===================================== */

    window.addEventListener("load", () => {
        if (typeof AOS !== "undefined") {
            AOS.refresh();
        }
    }, { once: true });
});
