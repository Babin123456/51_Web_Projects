// Milestones Timeline Data & Interactive Filter
const MILESTONES = [
    {
        year: "1931",
        category: "Early Life",
        title: "Birth in Rameswaram",
        desc: "Born into a Tamil Muslim family in Rameswaram, Tamil Nadu on October 15, 1931."
    },
    {
        year: "1960",
        category: "DRDO & ISRO",
        title: "Graduation & Aeronautical Career",
        desc: "Graduated from Madras Institute of Technology and joined the Aeronautical Development Establishment of DRDO."
    },
    {
        year: "1969",
        category: "DRDO & ISRO",
        title: "ISRO Satellite Launch Vehicle (SLV-III)",
        desc: "Transferred to ISRO where he served as project director for India's first indigenous Satellite Launch Vehicle (SLV-III), deploying Rohini into orbit in 1980."
    },
    {
        year: "1998",
        category: "DRDO & ISRO",
        title: "Pokhran-II & Missile Man",
        desc: "Played a pivotal organizational and technical leadership role in the Pokhran-II nuclear tests, securing the title 'Missile Man of India'."
    },
    {
        year: "2002",
        category: "Presidency",
        title: "11th President of India",
        desc: "Elected as the 11th President of India, widely celebrated as the 'People\'s President' for his close engagement with youth."
    },
    {
        year: "2015",
        category: "Legacy",
        title: "Inspiring Till the Last Breath",
        desc: "Passed away on July 27, 2015 while delivering a lecture on creating a livable planet at IIM Shillong."
    }
];

function renderTimeline(category = "All") {
    const timelineContainer = document.getElementById("timeline-list");
    if (!timelineContainer) return;

    timelineContainer.innerHTML = "";
    const filtered = category === "All" ? MILESTONES : MILESTONES.filter(m => m.category === category);

    filtered.forEach(milestone => {
        const item = document.createElement("div");
        item.className = "timeline-item";
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="timeline-year">${milestone.year}</span>
                <h4 class="timeline-title">${milestone.title}</h4>
                <p class="timeline-desc">${milestone.desc}</p>
            </div>
        `;
        timelineContainer.appendChild(item);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderTimeline("All");

    const filterBtns = document.querySelectorAll(".timeline-filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderTimeline(btn.dataset.category);
        });
    });
});

if (typeof module !== "undefined" && module.exports) {
    module.exports = { MILESTONES, renderTimeline };
}
