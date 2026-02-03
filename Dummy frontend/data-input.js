/**
 * URIMPACT Data Input Page
 * JavaScript functionality
 */

// Entry counters
let scope1EntryCount = 1;
let scope2EntryCount = 1;

// ============================================
// Tab/Section Switching
// ============================================
function showManualEntry() {
    document.getElementById('manualEntryCard').classList.add('active');
    document.getElementById('uploadDocCard').classList.remove('active');
    document.getElementById('manualSection').style.display = 'block';
    document.getElementById('uploadSection').style.display = 'none';
}

function showUploadDocument() {
    document.getElementById('uploadDocCard').classList.add('active');
    document.getElementById('manualEntryCard').classList.remove('active');
    document.getElementById('uploadSection').style.display = 'block';
    document.getElementById('manualSection').style.display = 'none';
}

// ============================================
// Add/Remove Scope Entries
// ============================================
function addScope1Entry() {
    scope1EntryCount++;
    const container = document.getElementById('scope1Container');
    const entryId = `scope1Entry${scope1EntryCount}`;
    
    const entryHTML = `
        <div class="scope-entry" id="${entryId}">
            <div class="scope-entry-header">
                <h3>Scope 1 Details - Entry ${scope1EntryCount}</h3>
                <button type="button" class="btn-remove-entry" onclick="removeEntry('${entryId}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Fuel Type <span class="required">*</span></label>
                    <select class="fuel-type" required>
                        <option value="">Select fuel type</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Gasoline/Petrol">Gasoline/Petrol</option>
                        <option value="Natural Gas">Natural Gas</option>
                        <option value="LPG">LPG</option>
                        <option value="Biodiesel">Biodiesel</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Combustion Type <span class="required">*</span></label>
                    <div class="radio-group">
                        <label class="radio-label">
                            <input type="radio" name="combustionType${scope1EntryCount}" value="mobile" class="combustion-type">
                            <span>Mobile</span>
                        </label>
                        <label class="radio-label">
                            <input type="radio" name="combustionType${scope1EntryCount}" value="stationary" class="combustion-type">
                            <span>Stationary</span>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Fuel Amount <span class="required">*</span></label>
                    <input type="number" class="fuel-amount" placeholder="0.00" step="0.01" required>
                </div>
                <div class="form-group">
                    <label>Unit <span class="required">*</span></label>
                    <select class="fuel-unit" required>
                        <option value="">Select unit</option>
                        <option value="Liters">Liters</option>
                        <option value="Gallons">Gallons</option>
                        <option value="kg">kg</option>
                        <option value="m³">m³</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group full-width">
                <label>Vehicle/Equipment ID</label>
                <input type="text" class="vehicle-id" placeholder="Optional - for fleet tracking">
            </div>

            <div class="inline-financial">
                <div class="inline-financial-head">
                    <span>Financial Information</span>
                    <small>Track spend per fuel entry</small>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Amount Spent</label>
                        <input type="number" class="financial-amount" placeholder="0.00" step="0.01">
                    </div>
                    <div class="form-group">
                        <label>Currency</label>
                        <select class="financial-currency">
                            <option value="USD" selected>USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="CAD">CAD</option>
                            <option value="AUD">AUD</option>
                            <option value="SAR">SAR</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', entryHTML);
    updateRemoveButtons();
    document.getElementById(entryId).scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function addScope2Entry() {
    scope2EntryCount++;
    const container = document.getElementById('scope2Container');
    const entryId = `scope2Entry${scope2EntryCount}`;
    
    const entryHTML = `
        <div class="scope-entry scope2-entry" id="${entryId}">
            <div class="scope-entry-header">
                <h3>Scope 2 Details - Entry ${scope2EntryCount}</h3>
                <button type="button" class="btn-remove-entry" onclick="removeEntry('${entryId}')">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Electricity Consumed <span class="required">*</span></label>
                    <input type="number" class="electricity" placeholder="0.00" step="0.01">
                </div>
                <div class="form-group">
                    <label>Unit <span class="required">*</span></label>
                    <select class="elec-unit">
                        <option value="kWh">kWh</option>
                        <option value="MWh">MWh</option>
                    </select>
                </div>
            </div>
            
            <div class="form-group full-width">
                <label>Calculation Method</label>
                <div class="form-control readonly-field" style="padding: 10px 14px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px;">
                    Location-based
                </div>
                <p class="helper-text">Regional grid emission factors are used for this entry.</p>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Supplier</label>
                    <input type="text" class="supplier" placeholder="Electricity provider name">
                </div>
                <div class="form-group">
                    <label>Grid Region</label>
                    <select class="grid-region">
                        <option value="">Select region</option>
                        <option value="US - WECC">US - WECC</option>
                        <option value="US - RFC">US - RFC</option>
                        <option value="US - SERC">US - SERC</option>
                        <option value="EU - Average">EU - Average</option>
                        <option value="UK - Grid">UK - Grid</option>
                    </select>
                </div>
            </div>

            <div class="inline-financial scope2-inline">
                <div class="inline-financial-head">
                    <span>Financial Information</span>
                    <small>Link spend to Scope 2 entry</small>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Amount Spent</label>
                        <input type="number" class="financial-amount" placeholder="0.00" step="0.01">
                    </div>
                    <div class="form-group">
                        <label>Currency</label>
                        <select class="financial-currency">
                            <option value="USD" selected>USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="CAD">CAD</option>
                            <option value="AUD">AUD</option>
                            <option value="SAR">SAR</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', entryHTML);
    updateRemoveButtons();
    document.getElementById(entryId).scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function removeEntry(entryId) {
    const entry = document.getElementById(entryId);
    if (entry) {
        entry.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            entry.remove();
            updateRemoveButtons();
        }, 300);
    }
}

function updateRemoveButtons() {
    const scope1Entries = document.querySelectorAll('#scope1Container .scope-entry');
    const scope2Entries = document.querySelectorAll('#scope2Container .scope-entry');
    
    scope1Entries.forEach((entry) => {
        const btn = entry.querySelector('.btn-remove-entry');
        if (btn) {
            btn.style.display = scope1Entries.length > 1 ? 'flex' : 'none';
        }
    });
    
    scope2Entries.forEach((entry) => {
        const btn = entry.querySelector('.btn-remove-entry');
        if (btn) {
            btn.style.display = scope2Entries.length > 1 ? 'flex' : 'none';
        }
    });
}

// ============================================
// File Upload Handling
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Data Input page initializing...');
    
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });
        
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFileUpload(this.files[0]);
            }
        });
    }
    
    // Ensure DataStore is initialized (in case user lands on this page first)
    if (typeof DataStore !== 'undefined' && DataStore.init) {
        DataStore.init();
    }

    // Form submission - use button click so it always works
    const submitManualBtn = document.getElementById('submitManualBtn');
    if (submitManualBtn) {
        submitManualBtn.addEventListener('click', function(e) {
            e.preventDefault();
            submitManualEntry();
        });
    }

    const manualForm = document.getElementById('manualEntryForm');
    if (manualForm) {
        manualForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitManualEntry();
        });
    }
    
    // Add classes to initial form elements for easier selection
    addClassesToInitialForm();
    updateRemoveButtons();
    
    console.log('Data Input page initialized');
});

function addClassesToInitialForm() {
    // Scope 1 initial entry
    const scope1Entry = document.getElementById('scope1Entry1');
    if (scope1Entry) {
        const selects = scope1Entry.querySelectorAll('select');
        if (selects[0]) selects[0].classList.add('fuel-type');
        if (selects[1]) selects[1].classList.add('fuel-unit');
        
        const numberInputs = scope1Entry.querySelectorAll('input[type="number"]');
        if (numberInputs[0]) numberInputs[0].classList.add('fuel-amount');
        
        const textInputs = scope1Entry.querySelectorAll('input[type="text"]');
        if (textInputs[0]) textInputs[0].classList.add('vehicle-id');
        
        const radios = scope1Entry.querySelectorAll('input[type="radio"]');
        radios.forEach(r => r.classList.add('combustion-type'));
    }
    
    // Scope 2 initial entry
    const scope2Entry = document.getElementById('scope2Entry1');
    if (scope2Entry) {
        const selects = scope2Entry.querySelectorAll('select');
        if (selects[0]) selects[0].classList.add('elec-unit');
        if (selects[1]) selects[1].classList.add('grid-region');
        
        const numberInputs = scope2Entry.querySelectorAll('input[type="number"]');
        if (numberInputs[0]) numberInputs[0].classList.add('electricity');
        
        const textInputs = scope2Entry.querySelectorAll('input[type="text"]');
        if (textInputs[0]) textInputs[0].classList.add('supplier');
        
        const radios = scope2Entry.querySelectorAll('input[type="radio"]');
        radios.forEach(r => r.classList.add('calc-method'));
    }
}

// ============================================
// File Upload Processing
// ============================================
function handleFileUpload(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        showNotification('Please upload a valid file (JPG, PNG, or PDF)', 'error');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        showNotification('File size exceeds 10MB limit', 'error');
        return;
    }
    
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML = `
        <div class="upload-loading">
            <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #14B8A6; margin-bottom: 20px;"></i>
            <h3>Processing document...</h3>
            <p>Extracting data using OCR</p>
            <div class="progress-bar" style="width: 200px; margin: 20px auto; height: 6px; background: #E2E8F0; border-radius: 3px;">
                <div class="progress" id="uploadProgress" style="width: 0%; height: 100%; background: #14B8A6; border-radius: 3px; transition: width 0.1s;"></div>
            </div>
        </div>
    `;
    
    let progress = 0;
    const progressBar = document.getElementById('uploadProgress');
    const interval = setInterval(() => {
        progress += 5;
        if (progressBar) progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => showExtractedData(), 500);
        }
    }, 100);
}

function showExtractedData() {
    document.getElementById('uploadArea').style.display = 'none';
    document.getElementById('extractedDataSection').style.display = 'block';
}

function resetUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    
    if (fileInput) fileInput.value = '';
    
    uploadArea.innerHTML = `
        <div class="upload-icon">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M8 40h48v16a4 4 0 01-4 4H12a4 4 0 01-4-4V40z' fill='%23D7CCC8'/%3E%3Cpath d='M8 36h48v8H8z' fill='%23A1887F'/%3E%3Cpath d='M28 8h8v28h-8z' fill='%23EF5350'/%3E%3Cpath d='M32 4l16 16H16z' fill='%23EF5350'/%3E%3C/svg%3E" alt="Upload">
        </div>
        <h3>Drag and drop your file here</h3>
        <p>or click to browse</p>
        <span class="supported-formats">Supported formats: JPG, PNG, PDF (Max 10MB)</span>
        <button class="btn btn-primary" onclick="document.getElementById('fileInput').click()">Choose File</button>
    `;
    
    uploadArea.style.display = 'block';
    document.getElementById('extractedDataSection').style.display = 'none';
}

// ============================================
// Submit Extracted Data
// ============================================
function submitExtractedData() {
    console.log('Submitting extracted data...');
    
    if (typeof DataStore === 'undefined') {
        console.error('DataStore not available');
        showNotification('Error: Data store not available', 'error');
        return;
    }
    
    const form = document.querySelector('.extracted-form');
    const numberInputs = form.querySelectorAll('input[type="number"]');
    const electricityInput = numberInputs[0];
    const totalCostInput = numberInputs[1];
    const selectElements = form.querySelectorAll('select');
    const unitSelect = selectElements[1];
    const currencySelect = selectElements[2];
    const supplierInput = form.querySelectorAll('input[type="text"]')[1];
    
    const entry = {
        date: new Date().toISOString().split('T')[0],
        electricity: parseFloat(electricityInput?.value) || 85,
        unit: unitSelect?.value || 'kWh',
        calcMethod: 'location',
        supplier: supplierInput?.value || 'City Power Company',
        gridRegion: 'US - WECC',
        costAmount: parseFloat(totalCostInput?.value) || 0,
        currency: currencySelect?.value || 'USD'
    };
    
    console.log('Adding Scope 2 entry:', entry);
    const result = DataStore.addScope2Entry(entry);
    console.log('Entry added with emissions:', result.emissions);
    
    showInputSuccessMessage(
        'Data Submitted Successfully!', 
        `Emission data has been recorded (${result.emissions.toFixed(2)} tCO₂e). Click "View Dashboard" to see the updated values.`,
        true
    );
}

// ============================================
// Submit Manual Entry
// ============================================
function submitManualEntry() {
    console.log('Submitting manual entry...');
    
    if (typeof DataStore === 'undefined') {
        console.error('DataStore not available');
        showNotification('Error: Data store not available', 'error');
        return;
    }
    
    const scope1Entries = document.querySelectorAll('#scope1Container .scope-entry');
    const scope2Entries = document.querySelectorAll('#scope2Container .scope-entry');
    
    let entriesAdded = 0;
    let totalEmissions = 0;
    
    // Process Scope 1 entries
    scope1Entries.forEach((entry) => {
        const fuelType = entry.querySelector('.fuel-type')?.value;
        const combustionRadio = entry.querySelector('.combustion-type:checked');
        const combustionType = combustionRadio?.value;
        const amount = entry.querySelector('.fuel-amount')?.value;
        const unit = entry.querySelector('.fuel-unit')?.value;
        const vehicleId = entry.querySelector('.vehicle-id')?.value;
        const costValue = entry.querySelector('.financial-amount')?.value;
        const currency = entry.querySelector('.financial-currency')?.value || 'USD';
        
        console.log('Scope 1 entry data:', { fuelType, combustionType, amount, unit });
        
        if (fuelType && amount && parseFloat(amount) > 0) {
            const entryData = {
                date: new Date().toISOString().split('T')[0],
                fuelType: fuelType,
                combustionType: combustionType || 'mobile',
                amount: parseFloat(amount),
                unit: unit || 'Liters',
                vehicleId: vehicleId || '',
                costAmount: parseFloat(costValue) || 0,
                currency
            };
            
            const result = DataStore.addScope1Entry(entryData);
            console.log('Scope 1 entry added:', result);
            entriesAdded++;
            totalEmissions += result.emissions;
        }
    });
    
    // Process Scope 2 entries
    scope2Entries.forEach((entry) => {
        const electricity = entry.querySelector('.electricity')?.value;
        const unit = entry.querySelector('.elec-unit')?.value;
        const calcRadio = entry.querySelector('.calc-method:checked');
        const calcMethod = calcRadio?.value;
        const supplier = entry.querySelector('.supplier')?.value;
        const gridRegion = entry.querySelector('.grid-region')?.value;
        const costValue = entry.querySelector('.financial-amount')?.value;
        const currency = entry.querySelector('.financial-currency')?.value || 'USD';
        
        console.log('Scope 2 entry data:', { electricity, unit, calcMethod, supplier, gridRegion });
        
        if (electricity && parseFloat(electricity) > 0) {
            const entryData = {
                date: new Date().toISOString().split('T')[0],
                electricity: parseFloat(electricity),
                unit: unit || 'kWh',
                calcMethod: calcMethod || 'location',
                supplier: supplier || '',
                gridRegion: gridRegion || 'US - WECC',
                costAmount: parseFloat(costValue) || 0,
                currency
            };
            
            const result = DataStore.addScope2Entry(entryData);
            console.log('Scope 2 entry added:', result);
            entriesAdded++;
            totalEmissions += result.emissions;
        }
    });
    
    if (entriesAdded > 0) {
        console.log(`${entriesAdded} entries added, total emissions: ${totalEmissions}`);
        showInputSuccessMessage(
            'Data Submitted Successfully!', 
            `${entriesAdded} emission ${entriesAdded === 1 ? 'entry has' : 'entries have'} been recorded (${totalEmissions.toFixed(2)} tCO₂e total). Click "View Dashboard" to see the updated values.`,
            true
        );
    } else {
        showNotification('Please fill in at least one entry with valid data (fuel amount or electricity consumed)', 'warning');
    }
}

// ============================================
// Reset Form
// ============================================
function resetForm() {
    const form = document.getElementById('manualEntryForm');
    if (form) form.reset();
    
    // Remove all extra entries
    document.querySelectorAll('#scope1Container .scope-entry').forEach((entry, index) => {
        if (index > 0) entry.remove();
    });
    
    document.querySelectorAll('#scope2Container .scope-entry').forEach((entry, index) => {
        if (index > 0) entry.remove();
    });
    
    scope1EntryCount = 1;
    scope2EntryCount = 1;
    updateRemoveButtons();
}

// ============================================
// Notifications
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'times-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// Success Message Modal
// ============================================
function showInputSuccessMessage(title, message, showDashboardLink = false) {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-icon">
                <i class="fas fa-check"></i>
            </div>
            <h3>${title}</h3>
            <p>${message}</p>
            <div class="modal-buttons">
                ${showDashboardLink ? '<a href="index.html" class="btn btn-primary">View Dashboard</a>' : ''}
                <button class="btn ${showDashboardLink ? 'btn-secondary' : 'btn-primary'}" onclick="closeSuccessModal(this)">Add More Data</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeSuccessModal(btn) {
    const modal = btn.closest('.success-modal');
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.remove();
        resetForm();
    }, 300);
}

// ============================================
// Sidebar Toggle (Mobile)
// ============================================
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
}

console.log('URIMPACT Data Input script loaded');
