document.addEventListener("DOMContentLoaded", () => {
    const dependencies = [
        { from: "task3", to: "task2" }, // Vendor Selection → Market Research
        { from: "task4", to: "task3" }, // Office Lease Negotiation → Vendor Selection
        { from: "task5", to: "task4" }, // Legal Compliance → Office Lease Negotiation
        { from: "task6", to: "task3" }, // Renovation Planning → Vendor Selection
        { from: "task6", to: "task4" }, // Renovation Planning → Office Lease Negotiation
        { from: "task7", to: "task6" }, // Renovation Execution → Renovation Planning
        { from: "task8", to: "task7" }, // Furniture Delivery → Renovation Execution
        { from: "task11", to: "task7" }, // IT Infrastructure Setup → Renovation Execution
        { from: "task11", to: "task9" }, // IT Infrastructure Setup → Equipment Acquisition
        { from: "task12", to: "task11" }, // Software Installation → IT Infrastructure Setup
        { from: "task13", to: "task12" }, // System Testing → Software Installation
        { from: "task15", to: "task13" }, // Security & Backup Configuration → System Testing
        { from: "task14", to: "task13" }, // User Training → System Testing
        { from: "task14", to: "task10" }, // User Training → Hiring Process
        { from: "task19", to: "task8" }, // Employee Relocation → Furniture Delivery
        { from: "task19", to: "task11" }, // Employee Relocation → IT Infrastructure Setup
        { from: "task19", to: "task14" }, // Employee Relocation → User Training
        { from: "task17", to: "task5" }, // Final Compliance Check → Legal Compliance
        { from: "task18", to: "task16" }, // Contingency Plan Execution → Risk Planning
        { from: "task20", to: "task10" }, // External Communication → Hiring Process
        { from: "task21", to: "task14" }, // Internal Alignment → User Training
        { from: "task21", to: "task19" }, // Internal Alignment → Employee Relocation
        { from: "task22", to: "task17" }, // Final Office Launch → Final Compliance Check
        { from: "task22", to: "task18" }, // Final Office Launch → Contingency Plan Execution
        { from: "task22", to: "task21" }, // Final Office Launch → Internal Alignment
        { from: "task23", to: "task22" }, // Final Risk Review → Final Office Launch
    ];

    const taskDependencies = dependencies.reduce((acc, { from, to }) => {
        if (!acc[from]) acc[from] = [];
        acc[from].push(to);
        return acc;
    }, {});

    const tooltip = document.getElementById("dependency-tooltip");
    const tooltipContent = tooltip.querySelector(".tooltip-content");

    const showTooltip = (taskId, event) => {
        const dependentTasks = taskDependencies[taskId] || [];
        if (dependentTasks.length === 0) {
            tooltipContent.innerHTML = "No dependencies.";
        } else {
            tooltipContent.innerHTML = `
                <strong>Dependencies:</strong>
                <ul>
                    ${dependentTasks.map((task) => `<li>${document.getElementById(task).querySelector("td").textContent.trim()}</li>`).join("")}
                </ul>
            `;
        }

        tooltip.style.display = "block";
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
    };

    const hideTooltip = () => {
        tooltip.style.display = "none";
    };

    document.querySelectorAll(".dependency-arrow").forEach((arrow) => {
        arrow.addEventListener("mouseover", (event) => {
            const taskId = arrow.getAttribute("data-task");
            showTooltip(taskId, event);
        });

        arrow.addEventListener("mouseout", () => {
            hideTooltip();
        });
    });

    const milestoneTooltip = document.createElement("div");
    milestoneTooltip.className = "milestone-tooltip";
    document.body.appendChild(milestoneTooltip);

    const showMilestoneTooltip = (event, milestone, date, reason) => {
        milestoneTooltip.innerHTML = `
            <strong>${milestone}</strong><br>
            📅 <strong>Date:</strong> ${date}<br>
            💬 <strong>Reason:</strong> ${reason}
        `;
        milestoneTooltip.style.left = `${event.pageX + 10}px`;
        milestoneTooltip.style.top = `${event.pageY + 10}px`;
        milestoneTooltip.classList.add("visible");
    };

    const hideMilestoneTooltip = () => {
        milestoneTooltip.classList.remove("visible");
    };

    document.querySelectorAll(".milestone").forEach((milestone) => {
        milestone.addEventListener("mouseover", (event) => {
            const milestoneName = milestone.getAttribute("data-milestone");
            const date = milestone.getAttribute("data-date");
            const reason = milestone.getAttribute("data-reason");
            showMilestoneTooltip(event, milestoneName, date, reason);
        });

        milestone.addEventListener("mousemove", (event) => {
            milestoneTooltip.style.left = `${event.pageX + 10}px`;
            milestoneTooltip.style.top = `${event.pageY + 10}px`;
        });

        milestone.addEventListener("mouseout", () => {
            hideMilestoneTooltip();
        });
    });

    const redCircleTooltip = document.createElement("div");
    redCircleTooltip.className = "red-circle-tooltip";
    document.body.appendChild(redCircleTooltip);

    const showRedCircleTooltip = (event, message) => {
        redCircleTooltip.innerHTML = message;
        redCircleTooltip.style.left = `${event.pageX + 10}px`;
        redCircleTooltip.style.top = `${event.pageY + 10}px`;
        redCircleTooltip.classList.add("visible");
    };

    const hideRedCircleTooltip = () => {
        redCircleTooltip.classList.remove("visible");
    };

    document.querySelectorAll(".red-circle").forEach((circle) => {
        circle.addEventListener("mouseover", (event) => {
            const message = circle.getAttribute("data-tooltip");
            showRedCircleTooltip(event, message);
        });

        circle.addEventListener("mousemove", (event) => {
            redCircleTooltip.style.left = `${event.pageX + 10}px`;
            redCircleTooltip.style.top = `${event.pageY + 10}px`;
        });

        circle.addEventListener("mouseout", () => {
            hideRedCircleTooltip();
        });
    });

    // Summary modal functionality
    const summaryButton = document.getElementById("summary-button");
    const summaryModal = document.getElementById("summary-modal");
    const closeSummary = document.getElementById("close-summary");

    summaryButton.addEventListener("click", () => {
        summaryModal.style.display = "flex";
    });

    closeSummary.addEventListener("click", () => {
        summaryModal.style.display = "none";
    });

    summaryModal.addEventListener("click", (event) => {
        if (event.target === summaryModal) {
            summaryModal.style.display = "none";
        }
    });

    // Buffer modal functionality
    const bufferInfo = document.getElementById("buffer-info");
    const bufferModal = document.getElementById("buffer-modal");
    const closeBuffer = document.getElementById("close-buffer");

    bufferInfo.addEventListener("click", () => {
        bufferModal.style.display = "flex";
    });

    closeBuffer.addEventListener("click", () => {
        bufferModal.style.display = "none";
    });

    bufferModal.addEventListener("click", (event) => {
        if (event.target === bufferModal) {
            bufferModal.style.display = "none";
        }
    });
});

