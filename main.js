document.addEventListener("DOMContentLoaded", () => {
    const samsungLogo = document.querySelector("header img:first-child");
    const mainText = document.querySelector(".content-main-txt");
    const buttonShop = document.querySelector(".content-shop-button");
    const textContent = mainText.innerHTML;
    const contentDescription = document.querySelector(".content-description");
    const contentNavMenu = document.querySelector(".content-nav-menu");
    const bgLayer = document.querySelector(".bg-layer-img");
    const slides = [
        {
            num: "1",
            textDescription: "“The first time I used the Samsung Bespoke Jet™, I cried. I'm not being sensational; I really did. Of course, this vacuum worked great. But that's not all.”" + `<a href="./pages/readMore.html" class="content-description-read-more"> Read more…</a>`,
            photo: "https://alinavovkov.github.io/demo_samsung-2/images/image1.webp"
        },
        {
            num: "2",
            textDescription: "“If you're an over-cleaner, like myself, you'll nerd out on all of the functions. If you avoid this chore at all costs, you'll appreciate how simple Samsung makes it.”" + `<a href="./pages/readMore.html" class="content-description-read-more"> Read more…</a>`,
            photo: "https://alinavovkov.github.io/demo_samsung-2/images/imageSlide2.webp"
        },
        {
            num: "3",
            textDescription: "“Both the floor and pet hair attachments are cleverly designed to eliminate the dreaded hair wrap. (In other words, you'll never have to tackle hair tangles with a pair of scissors again.)”" + `<a href="./pages/readMore.html" class="content-description-read-more"> Read more…</a>`,
            photo: "https://alinavovkov.github.io/demo_samsung-2/images/image3.webp"
        },
        {
            num: "4",
            textDescription: "“When I learned the Samsung Bespoke Vac cleaned itself with amazing technology, that's when I cried. No more scraping spider legs and hair out of the crevices with my hands. Its suction power is so strong, the canister is left perfectly clean after every use. It's like a vacuum for your vacuum.”" + `<a href="./pages/readMore.html" class="content-description-read-more"> Read more…</a>`,
            photo: "https://alinavovkov.github.io/demo_samsung-2/images/image4.webp"
        },
        {
            num: "5",
            textDescription: "“Because it's so nice-looking, it can live right in the kitchen. No more hauling a vacuum up and down the basement stairs on the daily”" + `<a href="./pages/readMore.html" class="content-description-read-more"> Read more…</a>`,
            photo: "https://alinavovkov.github.io/demo_samsung-2/images/image5.webp"
        }
    ];
    let currentSlide = 0;
    const leftArrow = document.querySelector(".content-nav-menu img:first-child");
    const rightArrow = document.querySelector(".content-nav-menu img:last-child");
    const slideNumSpan = document.querySelector(".content-nav-menu span:first-of-type");
    const descriptionText = document.querySelector(".content-description");
    const slideImage = document.querySelector(".content-right");
    let isAutoMode = true;
    let slideInterval;
    const slideDelay = 10000;

    function changeSlide(next = true) {
        if (next) {
            currentSlide = (currentSlide + 1) % slides.length;
        } else {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        }
        animateSlideChange();
    }

    function startAutoSlide(){
        if (isAutoMode) {
            slideInterval = setInterval(() => changeSlide(true), slideDelay);
        } else {
            clearInterval(slideInterval);
        }
    }

    // function toggleSlideMode() {
    //     isAutoMode = !isAutoMode;
    //     startAutoSlide();
    // }

    startAutoSlide();

    leftArrow.addEventListener("click", () => {
        // if (currentSlide > 0) {
        //     currentSlide--;
        //     animateSlideChange();
        // }
        isAutoMode = false;
        next = false;
        clearInterval(slideInterval);
        changeSlide(true);
    });

    rightArrow.addEventListener("click", () => {
        // if (currentSlide < slides.length - 1) {
        //     currentSlide++;
        //     animateSlideChange();
        // }
        isAutoMode = false;
        next = true;
        clearInterval(slideInterval);
        changeSlide(true);
    });

    function animateSlideChange() {
        gsap.to([slideNumSpan], {
            opacity: 1,
            duration: 0.3,
            ease: "power1.out",
            onComplete: () => {
                slideNumSpan.textContent = slides[currentSlide].num;
                descriptionText.innerHTML = slides[currentSlide].textDescription;
            }
        });
        gsap.fromTo([descriptionText],
            {
                x: "10%",
                y: "",
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power1.in"
            }
        );

        const newImage = document.createElement("div");
        newImage.classList.add("slide-image");
        newImage.style.backgroundImage = `url(${slides[currentSlide].photo})`;
        newImage.style.backgroundSize = "cover";
        newImage.style.backgroundPosition = "right center";
        newImage.style.position = "absolute";
        newImage.style.top = "0";
        newImage.style.left = "0";
        newImage.style.width = "100%";
        newImage.style.height = "100%";
        newImage.style.opacity = "0"; 
        newImage.style.filter = "blur(15px)";
        slideImage.appendChild(newImage);

        gsap.to(newImage, {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                slideImage.style.backgroundImage = `url(${slides[currentSlide].photo})`;
                slideImage.removeChild(newImage);
            }
        });

        if (currentSlide > 0) {
            gsap.to(bgLayer, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => (bgLayer.style.display = "none")
            });
        } else {
            bgLayer.style.display = "flex";
            gsap.to(bgLayer, { opacity: 1, duration: 0.3 });
        }
    }

    mainText.innerHTML = textContent.split("<br>").map(line =>
        `<div class="text-line">${line}</div>`
    ).join("");

    const textLines = document.querySelectorAll(".text-line");

    gsap.set(samsungLogo, {
        x: "-100%",
        y: 180,
        opacity: 0
    });

    gsap.set(buttonShop, {
        x: "-100%",
        opacity: 0
    });

    gsap.set(textLines, {
        x: "-100%",
        y: "110px",
        opacity: 0
    });

    gsap.set(bgLayer, {
        // width: "100%",
        x: "0%",
        y: "0%",
    });

    gsap.set(contentDescription, {
        opacity: 0,
        x: "0",
    });

    gsap.set(contentNavMenu, {
        opacity: 0,
        x: "0",
        pointerEvents: "none"
    });

    const masterTl = gsap.timeline({
        defaults: {
            ease: "power2.out"
        }
    });

    masterTl
        .to([samsungLogo, buttonShop], {
            x: 0,
            opacity: 1,
            duration: 1
        })
        .to([samsungLogo], {
            y: 0,
            duration: 0.8,
            ease: "power1.out"
        })
        .to(textLines, {
            x: 0,
            opacity: 1,
            duration: 2,
            stagger: 0.35
        }, "+=0.2")

        .to(bgLayer, {
            width: "50%",
            x: "0%",
            y: "0%",
            duration: 1.3,
            // scale: 1.3,
            // objectFit: "cover",
            ease: "power1.out",
        })
      

        .to(textLines, {
            x: 0,
            y: "250px",
            duration: 1.3, // Match the duration of bgLayer to keep it synchronized
            // ease: "power1.out"
        }, "<")
       
        .to([contentNavMenu], {
            pointerEvents: "auto",
        })

        .to([contentDescription, contentNavMenu], {
            x: 0,
            opacity: 1,
            duration: 1.2,
        })

        .to(buttonShop, {
            scale: 1.1,
            duration: 0.8,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true
        })

});
