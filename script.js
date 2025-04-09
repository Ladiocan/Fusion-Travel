// HERO SECTION VIDEO
const videoElement = document.getElementById("heroVideo");

fetch("/api/pexels?type=videos&query=travel")
.then(response => response.json())
.then(data => {
    console.log("PEXELS VIDEO DATA:", data);
    const videoFile = data?.videos?.[0]?.video_files?.find(v => v.quality === "hd" || v.quality === "sd");
    if (videoFile?.link) {
        videoElement.src = videoFile.link;
        videoElement.play();
    } else {
        // fallback video
        videoElement.src = "/fallback-video.mp4";
        console.warn("Using fallback video");
    }
})
.catch(error => {
    console.error("Error fetching video:", error);
    videoElement.src = "/fallback-video.mp4"; // local fallback
});

// WELCOME SECTION
const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');

function activateCard(index) {
    cards.forEach((c, i) => {
        c.classList.remove('shadow-xl', 'z-10', 'scale-105');
        if (i == index) c.classList.add('shadow-xl', 'z-10', 'scale-105');
    });

    dots.forEach((dot, i) => {
        dot.innerHTML = (i == index) ? `
            <div class="bullet-active relative flex items-center justify-center w-7 h-7">
                <span class="w-[20px] h-[20px] bg-orange-500 rounded-full z-10"></span>
                <span class="absolute rounded-full border border-orange-500 w-full h-full"></span>
            </div>` : `
            <div class="bullet-inactive relative flex items-center justify-center w-5 h-5">
                <span class="w-[8px] h-[8px] bg-gray-500 rounded-full z-10"></span>
                <span class="absolute rounded-full border border-gray-500" style="width: 80%; height: 80%;"></span>
            </div>`;
    });
}

cards.forEach(card => card.addEventListener('click', () => activateCard(card.getAttribute('data-index'))));
dots.forEach(dot => dot.addEventListener('click', () => activateCard(dot.getAttribute('data-target'))));

// FIND YOUR DESTINATION
const locations = ["Thailand", "Australia", "Indonesia", "France", "Malaysia", "UAE", "Japan", "Italy", "Spain"];
let startIndex = 0;
let imagesCache = [];

function preloadImages() {
    const promises = locations.map(location => {
        return fetch(`/api/pexels?type=photos&query=${location}`)

        .then(response => response.json())
        .then(data => {
            const imgUrl = data?.photos?.[0]?.src?.large || "/fallback.jpg"; // fallback imagine
            return { location, imgUrl };
        });
    });

    Promise.all(promises).then(results => {
        imagesCache = results;
        renderApiDestinations();
    }).catch(err => console.error("Error preloading images:", err));
}

function renderApiDestinations() {
    const grid = document.getElementById("destinationGrid");
    grid.innerHTML = '';

    for (let i = 0; i < 6; i++) {
        const idx = (startIndex + i) % imagesCache.length;
        const item = imagesCache[idx];

        if (item.imgUrl) {
            grid.innerHTML += `
                <div class="relative w-full aspect-square shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
                    <img src="${item.imgUrl}" class="absolute top-0 left-0 w-full h-full object-cover">
                    <span class="absolute top-2 left-2 text-white font-bold text-sm">${item.location}</span>
                </div>
            `;
        }
    }
}

document.getElementById('prevBtn').addEventListener('click', () => {
    startIndex = (startIndex - 3 + imagesCache.length) % imagesCache.length;
    renderApiDestinations();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    startIndex = (startIndex + 3) % imagesCache.length;
    renderApiDestinations();
});

preloadImages();

// Testimonials
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let currentIndex = 0;

function activateTestimonial(index) {
    testimonialCards.forEach((c, i) => {
        c.classList.add('hidden');
        c.classList.remove('shadow-xl', 'z-10', 'scale-105');
        if (i === index) {
            c.classList.remove('hidden');
            c.classList.add('shadow-xl', 'z-10', 'scale-105');
        }
    });

    testimonialDots.forEach((dot, i) => {
        dot.innerHTML = (i === index) ? `
            <div class="bullet-active relative flex items-center justify-center w-7 h-7">
                <span class="w-[20px] h-[20px] bg-orange-500 rounded-full z-10"></span>
                <span class="absolute rounded-full border border-orange-500 w-full h-full"></span>
            </div>` : `
            <div class="bullet-inactive relative flex items-center justify-center w-5 h-5">
                <span class="w-[8px] h-[8px] bg-gray-500 rounded-full z-10"></span>
                <span class="absolute rounded-full border border-gray-500" style="width: 80%; height: 80%;"></span>
            </div>`;
    });

    currentIndex = index;
}

activateTestimonial(0);
let interval = setInterval(() => {
    const next = (currentIndex + 1) % testimonialCards.length;
    activateTestimonial(next);
}, 5000);

testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(interval);
        activateTestimonial(parseInt(dot.getAttribute('data-target')));
        interval = setInterval(() => {
            const next = (currentIndex + 1) % testimonialCards.length;
            activateTestimonial(next);
        }, 5000);
    });
});
