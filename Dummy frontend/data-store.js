/**
 * URIMPACT Data Store
 * Centralized data management using localStorage
 */

const DataStore = {
    // Storage keys
    KEYS: {
        SCOPE1_ENTRIES: 'urimpact_scope1_entries',
        SCOPE2_ENTRIES: 'urimpact_scope2_entries',
        ACTIVITIES: 'urimpact_activities'
    },

    // Initialize with demo data if empty
    init: function() {
        if (!localStorage.getItem(this.KEYS.SCOPE1_ENTRIES)) {
            const demoScope1 = [
                {
                    id: 1,
                    date: '2025-12-15',
                    fuelType: 'Diesel',
                    combustionType: 'mobile',
                    amount: 500,
                    unit: 'Liters',
                    vehicleId: 'VH-001',
                    emissions: 198,
                    status: 'verified',
                    costAmount: 720,
                    currency: 'USD'
                },
                {
                    id: 2,
                    date: '2025-12-10',
                    fuelType: 'Natural Gas',
                    combustionType: 'stationary',
                    amount: 1200,
                    unit: 'm³',
                    vehicleId: '',
                    emissions: 213,
                    status: 'verified',
                    costAmount: 540,
                    currency: 'USD'
                },
                {
                    id: 3,
                    date: '2025-12-05',
                    fuelType: 'Diesel',
                    combustionType: 'mobile',
                    amount: 350,
                    unit: 'Liters',
                    vehicleId: 'VH-003',
                    emissions: 139,
                    status: 'verified',
                    costAmount: 520,
                    currency: 'USD'
                }
            ];
            localStorage.setItem(this.KEYS.SCOPE1_ENTRIES, JSON.stringify(demoScope1));
        }

        if (!localStorage.getItem(this.KEYS.SCOPE2_ENTRIES)) {
            const demoScope2 = [
                {
                    id: 1,
                    date: '2025-12-15',
                    electricity: 12500,
                    unit: 'kWh',
                    calcMethod: 'location',
                    supplier: 'City Power Company',
                    gridRegion: 'US - WECC',
                    emissions: 520,
                    status: 'verified',
                    costAmount: 1480,
                    currency: 'USD'
                },
                {
                    id: 2,
                    date: '2025-12-01',
                    electricity: 18000,
                    unit: 'kWh',
                    calcMethod: 'location',
                    supplier: 'Green Energy Corp',
                    gridRegion: 'US - RFC',
                    emissions: 680,
                    status: 'verified',
                    costAmount: 2120,
                    currency: 'USD'
                },
                {
                    id: 3,
                    date: '2025-11-20',
                    electricity: 9500,
                    unit: 'kWh',
                    calcMethod: 'location',
                    supplier: 'City Power Company',
                    gridRegion: 'US - WECC',
                    emissions: 400,
                    status: 'verified',
                    costAmount: 1085,
                    currency: 'USD'
                }
            ];
            localStorage.setItem(this.KEYS.SCOPE2_ENTRIES, JSON.stringify(demoScope2));
        }

        if (!localStorage.getItem(this.KEYS.ACTIVITIES)) {
            const demoActivities = [
                { id: 1, source: 'Fleet Receipt', date: '2025-12-15', status: 'verified', amount: 198, type: 'scope1' },
                { id: 2, source: 'Electricity Bill', date: '2025-12-10', status: 'verified', amount: 520, type: 'scope2' },
                { id: 3, source: 'Fuel Invoice', date: '2025-12-05', status: 'verified', amount: 139, type: 'scope1' },
                { id: 4, source: 'Utility Bill', date: '2025-11-20', status: 'verified', amount: 400, type: 'scope2' },
                { id: 5, source: 'Natural Gas Bill', date: '2025-11-15', status: 'verified', amount: 213, type: 'scope1' }
            ];
            localStorage.setItem(this.KEYS.ACTIVITIES, JSON.stringify(demoActivities));
        }
    },

    // Get all Scope 1 entries
    getScope1Entries: function() {
        const data = localStorage.getItem(this.KEYS.SCOPE1_ENTRIES);
        return data ? JSON.parse(data) : [];
    },

    // Get all Scope 2 entries
    getScope2Entries: function() {
        const data = localStorage.getItem(this.KEYS.SCOPE2_ENTRIES);
        return data ? JSON.parse(data) : [];
    },

    // Get all activities
    getActivities: function() {
        const data = localStorage.getItem(this.KEYS.ACTIVITIES);
        return data ? JSON.parse(data) : [];
    },

    // Source labels for activities (variety of bill types)
    SCOPE1_SOURCES: ['Fleet Receipt', 'Fuel Invoice', 'Vehicle Refuel', 'Diesel Receipt', 'Natural Gas Bill', 'LPG Invoice', 'Gasoline Receipt'],
    SCOPE2_SOURCES: ['Utility Bill', 'Electricity Bill', 'Electricity Invoice', 'Energy Statement', 'Grid Bill', 'Power Bill'],

    // Add Scope 1 entry
    addScope1Entry: function(entry) {
        const entries = this.getScope1Entries();
        entry.id = Date.now();
        entry.status = 'verified';
        entry.costAmount = Number(entry.costAmount) || 0;
        entry.currency = entry.currency || 'USD';
        entry.emissions = this.calculateScope1Emissions(entry);
        entries.unshift(entry);
        localStorage.setItem(this.KEYS.SCOPE1_ENTRIES, JSON.stringify(entries));
        
        const scope1Sources = this.SCOPE1_SOURCES;
        const source = scope1Sources[entries.length % scope1Sources.length];
        this.addActivity({
            source: source,
            date: entry.date,
            status: 'verified',
            amount: entry.emissions,
            type: 'scope1'
        });
        
        return entry;
    },

    // Add Scope 2 entry
    addScope2Entry: function(entry) {
        const entries = this.getScope2Entries();
        entry.id = Date.now();
        entry.status = 'verified';
        entry.costAmount = Number(entry.costAmount) || 0;
        entry.currency = entry.currency || 'USD';
        entry.emissions = this.calculateScope2Emissions(entry);
        entries.unshift(entry);
        localStorage.setItem(this.KEYS.SCOPE2_ENTRIES, JSON.stringify(entries));
        
        const scope2Sources = this.SCOPE2_SOURCES;
        const source = scope2Sources[entries.length % scope2Sources.length];
        this.addActivity({
            source: source,
            date: entry.date,
            status: 'verified',
            amount: entry.emissions,
            type: 'scope2'
        });
        
        return entry;
    },

    // Add activity
    addActivity: function(activity) {
        const activities = this.getActivities();
        activity.id = Date.now();
        activities.unshift(activity);
        // Keep only last 10 activities
        if (activities.length > 10) {
            activities.pop();
        }
        localStorage.setItem(this.KEYS.ACTIVITIES, JSON.stringify(activities));
    },

    // Calculate Scope 1 emissions (simplified calculation)
    calculateScope1Emissions: function(entry) {
        const factors = {
            'Diesel': { 'Liters': 2.68, 'Gallons': 10.15, 'kg': 3.16 },
            'Gasoline/Petrol': { 'Liters': 2.31, 'Gallons': 8.74, 'kg': 3.08 },
            'Natural Gas': { 'm³': 1.89, 'kg': 2.75 },
            'LPG': { 'Liters': 1.51, 'Gallons': 5.72, 'kg': 2.98 },
            'Biodiesel': { 'Liters': 0.5, 'Gallons': 1.89, 'kg': 0.6 }
        };
        
        const factor = factors[entry.fuelType]?.[entry.unit] || 2.5;
        return Math.round(entry.amount * factor / 1000 * 100) / 100; // Convert to tCO2e
    },

    // Calculate Scope 2 emissions (simplified calculation)
    calculateScope2Emissions: function(entry) {
        const gridFactors = {
            'US - WECC': 0.000322,
            'US - RFC': 0.000440,
            'US - SERC': 0.000390,
            'EU - Average': 0.000275,
            'UK - Grid': 0.000233
        };
        
        let electricity = entry.electricity;
        if (entry.unit === 'MWh') {
            electricity *= 1000;
        }
        
        const factor = gridFactors[entry.gridRegion] || 0.0004;
        return Math.round(electricity * factor * 100) / 100; // tCO2e
    },

    // Get total Scope 1 emissions
    getTotalScope1: function() {
        const entries = this.getScope1Entries();
        return entries.reduce((sum, entry) => sum + (entry.emissions || 0), 0);
    },

    // Get total Scope 2 emissions
    getTotalScope2: function() {
        const entries = this.getScope2Entries();
        return entries.reduce((sum, entry) => sum + (entry.emissions || 0), 0);
    },

    // Get total emissions
    getTotalEmissions: function() {
        return this.getTotalScope1() + this.getTotalScope2();
    },

    // Get monthly data for charts
    getMonthlyData: function() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const scope1Data = new Array(12).fill(0);
        const scope2Data = new Array(12).fill(0);
        
        // Aggregate Scope 1 by month
        this.getScope1Entries().forEach(entry => {
            const month = new Date(entry.date).getMonth();
            scope1Data[month] += entry.emissions || 0;
        });
        
        // Aggregate Scope 2 by month
        this.getScope2Entries().forEach(entry => {
            const month = new Date(entry.date).getMonth();
            scope2Data[month] += entry.emissions || 0;
        });
        
        // Add some baseline data for visualization
        for (let i = 0; i < 12; i++) {
            if (scope1Data[i] === 0) scope1Data[i] = 120 + Math.random() * 60;
            if (scope2Data[i] === 0) scope2Data[i] = 240 + Math.random() * 80;
        }
        
        return {
            labels: months,
            scope1: scope1Data.map(v => Math.round(v * 100) / 100),
            scope2: scope2Data.map(v => Math.round(v * 100) / 100)
        };
    },

    // Get Scope 1 breakdown data (Mobile and Stationary only; no Fugitive)
    getScope1Breakdown: function() {
        const entries = this.getScope1Entries();
        const breakdown = {
            'Mobile Combustion': 0,
            'Stationary Combustion': 0
        };
        
        entries.forEach(entry => {
            if (entry.combustionType === 'mobile') {
                breakdown['Mobile Combustion'] += entry.emissions || 0;
            } else {
                breakdown['Stationary Combustion'] += entry.emissions || 0;
            }
        });
        
        return breakdown;
    },

    // Aggregated activity data for report table (from data input)
    getReportActivityData: function() {
        const scope1 = this.getScope1Entries();
        const scope2 = this.getScope2Entries();
        let mobileAmount = 0, mobileUnit = 'L', mobileFuel = 'Diesel';
        let stationaryAmount = 0, stationaryUnit = 'm³', stationaryFuel = 'Natural Gas';
        let totalKwh = 0;

        scope1.forEach(entry => {
            const amt = Number(entry.amount) || 0;
            if (entry.combustionType === 'mobile') {
                mobileAmount += amt;
                if (entry.unit) mobileUnit = entry.unit === 'Liters' ? 'L' : entry.unit === 'Gallons' ? 'Gal' : entry.unit;
                if (entry.fuelType) mobileFuel = entry.fuelType;
            } else {
                stationaryAmount += amt;
                if (entry.unit) stationaryUnit = entry.unit;
                if (entry.fuelType) stationaryFuel = entry.fuelType;
            }
        });

        scope2.forEach(entry => {
            let kwh = Number(entry.electricity) || 0;
            if (entry.unit === 'MWh') kwh = kwh * 1000;
            totalKwh += kwh;
        });

        const fmt = (n, decimals) => Number(n).toLocaleString('en-US', { maximumFractionDigits: decimals ?? 0, minimumFractionDigits: 0 });
        const mobileLabel = mobileAmount > 0 ? `${fmt(mobileAmount)} ${mobileUnit}` : '0 L';
        const stationaryLabel = stationaryAmount > 0 ? `${fmt(stationaryAmount)} ${stationaryUnit}` : '0 m³';
        const scope2Label = totalKwh >= 1000 ? `${fmt(totalKwh / 1000, 1)} MWh` : `${fmt(totalKwh)} kWh`;

        return {
            mobile: { amount: mobileAmount, unit: mobileUnit, fuelType: mobileFuel, label: mobileLabel },
            stationary: { amount: stationaryAmount, unit: stationaryUnit, fuelType: stationaryFuel, label: stationaryLabel },
            scope2: { totalKwh, label: scope2Label }
        };
    },

    // Reporting period from data (min/max dates) or null for default
    getReportingPeriodLabel: function() {
        const s1 = this.getScope1Entries();
        const s2 = this.getScope2Entries();
        const dates = [...s1.map(e => e.date), ...s2.map(e => e.date)].filter(Boolean);
        if (dates.length === 0) return null;
        const min = dates.reduce((a, b) => (a < b ? a : b));
        const max = dates.reduce((a, b) => (a > b ? a : b));
        const fmt = (d) => {
            const x = new Date(d);
            return x.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        };
        return `${fmt(min)} – ${fmt(max)}`;
    },

    // Get total amount spent (USD) - derived from entries for demo
    getAmountSpent: function() {
        const scope1 = this.getScope1Entries();
        const scope2 = this.getScope2Entries();
        const rates = {
            USD: 1,
            EUR: 1.08,
            GBP: 1.27,
            CAD: 0.74,
            AUD: 0.66,
            SAR: 0.27
        };
        const toUsd = (amount, currency) => {
            if (!amount || amount <= 0) return 0;
            return amount * (rates[currency] || 1);
        };
        let total = 0;
        scope1.forEach(entry => {
            if (entry.costAmount && entry.costAmount > 0) {
                total += toUsd(entry.costAmount, entry.currency);
            } else {
                total += (entry.amount || 0) * 0.8;
            }
        });
        scope2.forEach(entry => {
            if (entry.costAmount && entry.costAmount > 0) {
                total += toUsd(entry.costAmount, entry.currency);
            } else {
                const kwh = entry.unit === 'MWh' ? (entry.electricity || 0) * 1000 : (entry.electricity || 0);
                total += kwh * 0.12;
            }
        });
        return Math.round(total);
    },

    // Clear all data (for testing)
    clearAll: function() {
        localStorage.removeItem(this.KEYS.SCOPE1_ENTRIES);
        localStorage.removeItem(this.KEYS.SCOPE2_ENTRIES);
        localStorage.removeItem(this.KEYS.ACTIVITIES);
    },

    // Reset to demo data
    resetToDemo: function() {
        this.clearAll();
        this.init();
    }
};

// Initialize on load
DataStore.init();

// Export for use in other files
window.DataStore = DataStore;
