/**
 * URIMPACT Carbon Emission Dashboard
 * JavaScript functionality for charts and interactions
 */

// ============================================
// Configuration & Constants
// ============================================
const COLORS = {
    accent: '#14B8A6',
    accentLight: 'rgba(20, 184, 166, 0.2)',
    scope1: '#14B8A6',
    scope2: '#3B82F6',
    purple: '#8B5CF6',
    orange: '#F59E0B',
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    gridColor: 'rgba(148, 163, 184, 0.2)',
    background: '#FFFFFF'
};

// Chart instances for updates
let emissionTrendChart = null;
let scope1BreakdownChart = null;
let scope2ComparisonChart = null;

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initializing...');
    
    // Wait for DataStore to be available
    setTimeout(() => {
        initializeSidebar();
        updateDashboardData();
        initializeCharts();
        updateDateTime();
        updateActivitiesTable();
        setInterval(updateDateTime, 60000);
        console.log('Dashboard fully initialized');
    }, 100);
});

// ============================================
// Update Dashboard Data from DataStore
// ============================================
function updateDashboardData() {
    console.log('Updating dashboard data...');
    
    if (typeof DataStore === 'undefined') {
        console.warn('DataStore not available yet');
        return;
    }
    
    try {
        // Get data from store
        const totalEmissions = DataStore.getTotalEmissions();
        const scope1Total = DataStore.getTotalScope1();
        const scope2Total = DataStore.getTotalScope2();
        const amountSpent = DataStore.getAmountSpent();
        
        console.log('Data loaded:', { totalEmissions, scope1Total, scope2Total, amountSpent });
        
        // Update Total Emissions card
        const totalCard = document.querySelector('.summary-card.total .card-content .value');
        if (totalCard) {
            const formattedTotal = formatNumber(Math.round(totalEmissions * 100) / 100);
            totalCard.innerHTML = `${formattedTotal} <span class="unit">tCO2e</span>`;
            console.log('Updated total emissions:', formattedTotal);
        }
        
        // Update Scope 1 card
        const scope1Card = document.querySelector('.summary-card.scope1 .card-content .value');
        if (scope1Card) {
            const formattedScope1 = formatNumber(Math.round(scope1Total * 100) / 100);
            scope1Card.innerHTML = `${formattedScope1} <span class="unit">tCO2e</span>`;
            console.log('Updated scope 1:', formattedScope1);
        }
        
        // Update Scope 2 card
        const scope2Card = document.querySelector('.summary-card.scope2 .card-content .value');
        if (scope2Card) {
            const formattedScope2 = formatNumber(Math.round(scope2Total * 100) / 100);
            scope2Card.innerHTML = `${formattedScope2} <span class="unit">tCO2e</span>`;
            console.log('Updated scope 2:', formattedScope2);
        }
        
        // Update Amount Spent card
        const amountSpentEl = document.querySelector('.summary-card.target .card-content .value');
        if (amountSpentEl) {
            const formattedSpent = formatNumber(Math.round(amountSpent));
            amountSpentEl.innerHTML = `${formattedSpent}<span class="unit"> USD</span>`;
            console.log('Updated amount spent:', formattedSpent);
        }
        
    } catch (error) {
        console.error('Error updating dashboard:', error);
    }
}

// ============================================
// Format Number with Commas
// ============================================
function formatNumber(num) {
    if (isNaN(num)) return '0';
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

// ============================================
// Sidebar Toggle
// ============================================
function initializeSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 992) {
                if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
                    sidebar.classList.remove('active');
                }
            }
        });
    }

    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });
}

// ============================================
// Date/Time Display
// ============================================
function updateDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const lastUpdated = document.getElementById('lastUpdated');
    if (lastUpdated) {
        lastUpdated.textContent = now.toLocaleDateString('en-US', options);
    }
}

// ============================================
// Charts Initialization
// ============================================
function initializeCharts() {
    Chart.defaults.color = COLORS.textSecondary;
    Chart.defaults.borderColor = COLORS.gridColor;
    Chart.defaults.font.family = "'Inter', sans-serif";

    createEmissionTrendChart();
    createScope1BreakdownChart();
    createScope2ComparisonChart();
}

// ============================================
// Monthly Emissions Trend Chart
// ============================================
function createEmissionTrendChart() {
    const ctx = document.getElementById('emissionTrendChart');
    if (!ctx) return;

    let monthlyData;
    if (typeof DataStore !== 'undefined') {
        monthlyData = DataStore.getMonthlyData();
    } else {
        monthlyData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            scope1: [180, 165, 170, 155, 160, 145, 150, 140, 135, 130, 125, 120],
            scope2: [320, 310, 305, 295, 300, 280, 275, 265, 260, 250, 245, 240]
        };
    }

    emissionTrendChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: monthlyData.labels,
            datasets: [
                {
                    label: 'Scope 1',
                    data: monthlyData.scope1,
                    backgroundColor: COLORS.scope1,
                    borderRadius: 4,
                    borderSkipped: false,
                },
                {
                    label: 'Scope 2',
                    data: monthlyData.scope2,
                    backgroundColor: COLORS.scope2,
                    borderRadius: 4,
                    borderSkipped: false,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'white',
                    titleColor: '#1E293B',
                    bodyColor: '#64748B',
                    borderColor: '#E2E8F0',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)} tCO₂e`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: { color: COLORS.textSecondary, font: { size: 11 } }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    grid: { color: COLORS.gridColor },
                    ticks: {
                        color: COLORS.textSecondary,
                        font: { size: 11 },
                        callback: function(value) { return value + ' tCO₂e'; }
                    }
                }
            }
        }
    });
}

// ============================================
// Scope 1 Breakdown Doughnut Chart
// ============================================
function createScope1BreakdownChart() {
    const ctx = document.getElementById('scope1BreakdownChart');
    if (!ctx) return;

    let breakdown;
    if (typeof DataStore !== 'undefined') {
        breakdown = DataStore.getScope1Breakdown();
    } else {
        breakdown = {
            'Mobile Combustion': 198,
            'Stationary Combustion': 213
        };
    }

    scope1BreakdownChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(breakdown),
            datasets: [{
                data: Object.values(breakdown),
                backgroundColor: [COLORS.scope1, COLORS.scope2],
                borderColor: COLORS.background,
                borderWidth: 3,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'white',
                    titleColor: '#1E293B',
                    bodyColor: '#64748B',
                    borderColor: '#E2E8F0',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed.toFixed(2)} tCO₂e (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
    
    updateScope1Legend(breakdown);
}

function updateScope1Legend(breakdown) {
    const legendContainer = document.querySelector('#scope1BreakdownChart')?.closest('.chart-card')?.querySelector('.chart-legend');
    if (!legendContainer) return;
    
    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
    const colors = [COLORS.scope1, COLORS.scope2];
    
    legendContainer.innerHTML = Object.entries(breakdown).map(([label, value], index) => {
        const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
        return `
            <div class="legend-item">
                <span class="legend-color" style="background: ${colors[index]};"></span>
                <span>${label} (${percentage}%)</span>
            </div>
        `;
    }).join('');
}

// ============================================
// Scope 2 (Location-based) Chart
// ============================================
function createScope2ComparisonChart() {
    const ctx = document.getElementById('scope2ComparisonChart');
    if (!ctx) return;

    let quarterlyData;
    if (typeof DataStore !== 'undefined') {
        const monthlyData = DataStore.getMonthlyData();
        quarterlyData = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            locationBased: [
                monthlyData.scope2[0] + monthlyData.scope2[1] + monthlyData.scope2[2],
                monthlyData.scope2[3] + monthlyData.scope2[4] + monthlyData.scope2[5],
                monthlyData.scope2[6] + monthlyData.scope2[7] + monthlyData.scope2[8],
                monthlyData.scope2[9] + monthlyData.scope2[10] + monthlyData.scope2[11]
            ]
        };
    } else {
        quarterlyData = {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            locationBased: [450, 420, 380, 350]
        };
    }

    scope2ComparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: quarterlyData.labels,
            datasets: [
                {
                    label: 'Location-based',
                    data: quarterlyData.locationBased,
                    backgroundColor: COLORS.scope1,
                    borderRadius: 4,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'white',
                    titleColor: '#1E293B',
                    bodyColor: '#64748B',
                    borderColor: '#E2E8F0',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} tCO₂e`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: COLORS.textSecondary, font: { size: 11 } }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: COLORS.gridColor },
                    ticks: { color: COLORS.textSecondary, font: { size: 11 } }
                }
            }
        }
    });
}

// ============================================
// Update Activities Table
// ============================================
function updateActivitiesTable() {
    if (typeof DataStore === 'undefined') return;
    
    const activities = DataStore.getActivities();
    const tableBody = document.querySelector('.facility-table tbody');
    
    if (!tableBody || !activities || activities.length === 0) return;
    
    const scope1Labels = ['Fleet Receipt', 'Fuel Invoice', 'Vehicle Refuel', 'Diesel Receipt', 'Natural Gas Bill'];
    const scope2Labels = ['Utility Bill', 'Electricity Bill', 'Electricity Invoice', 'Energy Statement', 'Grid Bill'];
    
    tableBody.innerHTML = activities.slice(0, 5).map((activity, index) => {
        const date = new Date(activity.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
        
        let displaySource = activity.source;
        if (activity.type === 'scope1' && displaySource === 'Fleet Receipt') {
            displaySource = scope1Labels[index % scope1Labels.length];
        }
        if (activity.type === 'scope2' && displaySource === 'Utility Bill') {
            displaySource = scope2Labels[index % scope2Labels.length];
        }
        
        return `
            <tr>
                <td><strong>${displaySource}</strong></td>
                <td>${formattedDate}</td>
                <td><span class="status-badge ${activity.status}">${activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}</span></td>
                <td>${activity.amount.toFixed(2)} tCO2e</td>
            </tr>
        `;
    }).join('');
}

// ============================================
// Refresh Dashboard Data
// ============================================
function refreshDashboard() {
    console.log('Refreshing dashboard...');
    updateDashboardData();
    
    // Update charts with new data
    if (emissionTrendChart && typeof DataStore !== 'undefined') {
        const monthlyData = DataStore.getMonthlyData();
        emissionTrendChart.data.datasets[0].data = monthlyData.scope1;
        emissionTrendChart.data.datasets[1].data = monthlyData.scope2;
        emissionTrendChart.update('active');
    }
    
    if (scope1BreakdownChart && typeof DataStore !== 'undefined') {
        const breakdown = DataStore.getScope1Breakdown();
        scope1BreakdownChart.data.labels = Object.keys(breakdown);
        scope1BreakdownChart.data.datasets[0].data = Object.values(breakdown);
        scope1BreakdownChart.update('active');
        updateScope1Legend(breakdown);
    }
    if (scope2ComparisonChart && typeof DataStore !== 'undefined') {
        const monthlyData = DataStore.getMonthlyData();
        scope2ComparisonChart.data.datasets[0].data = [
            monthlyData.scope2[0] + monthlyData.scope2[1] + monthlyData.scope2[2],
            monthlyData.scope2[3] + monthlyData.scope2[4] + monthlyData.scope2[5],
            monthlyData.scope2[6] + monthlyData.scope2[7] + monthlyData.scope2[8],
            monthlyData.scope2[9] + monthlyData.scope2[10] + monthlyData.scope2[11]
        ];
        scope2ComparisonChart.update('active');
    }
    
    updateActivitiesTable();
}

// ============================================
// Export functionality
// ============================================
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-primary') && e.target.closest('.btn-primary').textContent.includes('Export')) {
        const btn = e.target.closest('.btn-primary');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Exported!';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }, 1500);
    }
});

// ============================================
// Responsive handling
// ============================================
window.addEventListener('resize', function() {
    if (window.innerWidth > 992) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
    }
});

// ============================================
// Auto-refresh when page becomes visible
// ============================================
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('Page visible, refreshing...');
        refreshDashboard();
    }
});

// Make refresh function globally available
window.refreshDashboard = refreshDashboard;

console.log('URIMPACT Dashboard script loaded');
