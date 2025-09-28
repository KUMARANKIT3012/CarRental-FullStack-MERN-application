// Main Application JavaScript
class StriveHiveApp {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'dashboard';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadUserData();
        this.showSection('dashboard');
        this.updateDashboard();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('href').substring(1);
                this.showSection(section);
            });
        });

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Form submissions
        this.setupFormHandlers();
    }

    setupFormHandlers() {
        // Profile form
        const profileForm = document.getElementById('profile-form');
        profileForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleProfileSubmit(e);
        });

        // Fitness form
        const fitnessForm = document.getElementById('fitness-form');
        fitnessForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFitnessSubmit(e);
        });

        // Nutrition form
        const nutritionForm = document.getElementById('nutrition-form');
        nutritionForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNutritionSubmit(e);
        });

        // Report generation
        const generateReportBtn = document.getElementById('generate-report');
        generateReportBtn?.addEventListener('click', () => {
            this.generateReport();
        });

        // Report period buttons
        document.querySelectorAll('.report-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.report-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[href="#${sectionName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Load section-specific data
        this.loadSectionData(sectionName);
    }

    loadSectionData(sectionName) {
        switch (sectionName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'profile':
                this.loadProfileData();
                break;
            case 'fitness':
                this.loadFitnessActivities();
                break;
            case 'nutrition':
                this.loadNutritionData();
                break;
            case 'reports':
                // Reports are loaded on demand
                break;
        }
    }

    async handleProfileSubmit(e) {
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());
        
        // Convert numeric fields
        userData.age = parseInt(userData.age);
        userData.height = parseFloat(userData.height);
        userData.weight = parseFloat(userData.weight);

        this.showLoading(true);

        try {
            const savedUser = await API.saveUser(userData);
            this.currentUser = savedUser;
            this.saveUserData();
            this.updateHealthMetrics();
            this.showToast('Profile saved successfully!', 'success');
        } catch (error) {
            console.error('Error saving profile:', error);
            this.showToast('Error saving profile. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async handleFitnessSubmit(e) {
        const formData = new FormData(e.target);
        const activityData = Object.fromEntries(formData.entries());
        
        if (!this.currentUser) {
            this.showToast('Please create your profile first', 'warning');
            this.showSection('profile');
            return;
        }

        // Convert numeric fields
        activityData.duration = parseInt(activityData.duration);
        activityData.caloriesBurned = parseFloat(activityData.caloriesBurned);
        activityData.userId = this.currentUser.id;

        this.showLoading(true);

        try {
            await API.saveActivity(activityData);
            this.loadFitnessActivities();
            this.updateDashboard();
            e.target.reset();
            this.showToast('Activity added successfully!', 'success');
        } catch (error) {
            console.error('Error saving activity:', error);
            this.showToast('Error saving activity. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async handleNutritionSubmit(e) {
        const formData = new FormData(e.target);
        const nutritionData = Object.fromEntries(formData.entries());
        
        if (!this.currentUser) {
            this.showToast('Please create your profile first', 'warning');
            this.showSection('profile');
            return;
        }

        // Convert numeric fields
        nutritionData.servingSize = parseFloat(nutritionData.servingSize);
        nutritionData.calories = parseFloat(nutritionData.calories);
        nutritionData.protein = parseFloat(nutritionData.protein);
        nutritionData.carbs = parseFloat(nutritionData.carbs);
        nutritionData.fat = parseFloat(nutritionData.fat);
        nutritionData.userId = this.currentUser.id;

        this.showLoading(true);

        try {
            await API.saveNutrition(nutritionData);
            this.loadNutritionData();
            this.updateDashboard();
            e.target.reset();
            this.showToast('Nutrition entry added successfully!', 'success');
        } catch (error) {
            console.error('Error saving nutrition entry:', error);
            this.showToast('Error saving nutrition entry. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    loadUserData() {
        const savedUser = localStorage.getItem('striveHiveUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.loadProfileData();
            this.updateHealthMetrics();
        }
    }

    saveUserData() {
        if (this.currentUser) {
            localStorage.setItem('striveHiveUser', JSON.stringify(this.currentUser));
        }
    }

    loadProfileData() {
        if (!this.currentUser) return;

        const form = document.getElementById('profile-form');
        if (form) {
            Object.keys(this.currentUser).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field && this.currentUser[key] !== null && this.currentUser[key] !== undefined) {
                    field.value = this.currentUser[key];
                }
            });
        }
    }

    updateHealthMetrics() {
        if (!this.currentUser) return;

        const bmi = this.calculateBMI(this.currentUser.height, this.currentUser.weight);
        const bmr = this.calculateBMR(this.currentUser);
        const status = this.getBMIStatus(bmi);

        // Update profile metrics
        document.getElementById('profile-bmi').textContent = bmi.toFixed(1);
        document.getElementById('profile-bmr').textContent = Math.round(bmr) + ' kcal/day';
        document.getElementById('profile-status').textContent = status;

        // Update dashboard BMI
        document.getElementById('bmi-value').textContent = bmi.toFixed(1);
    }

    calculateBMI(height, weight) {
        const heightInM = height / 100;
        return weight / (heightInM * heightInM);
    }

    calculateBMR(user) {
        // Harris-Benedict Formula
        if (user.gender === 'male') {
            return 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age);
        } else {
            return 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age);
        }
    }

    getBMIStatus(bmi) {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Normal';
        if (bmi < 30) return 'Overweight';
        return 'Obese';
    }

    async updateDashboard() {
        if (!this.currentUser) {
            this.showEmptyDashboard();
            return;
        }

        try {
            // Get today's data
            const today = new Date().toISOString().split('T')[0];
            const activities = await API.getActivitiesForDate(this.currentUser.id, today);
            const nutrition = await API.getNutritionForDate(this.currentUser.id, today);

            // Update stats
            const totalCaloriesBurned = activities.reduce((sum, activity) => sum + activity.caloriesBurned, 0);
            const totalCaloriesConsumed = nutrition.reduce((sum, entry) => sum + entry.calories, 0);

            document.getElementById('total-calories-burned').textContent = Math.round(totalCaloriesBurned);
            document.getElementById('total-calories-consumed').textContent = Math.round(totalCaloriesConsumed);

            // Get weekly workout count
            const weekStart = this.getWeekStart();
            const weeklyActivities = await API.getActivitiesForPeriod(this.currentUser.id, weekStart, new Date());
            document.getElementById('total-workouts').textContent = weeklyActivities.length;

            // Update recent activities
            this.updateRecentActivities(activities.slice(0, 5));
            this.updateTodaysNutrition(nutrition);

        } catch (error) {
            console.error('Error updating dashboard:', error);
        }
    }

    updateRecentActivities(activities) {
        const container = document.getElementById('recent-activities');
        
        if (!activities.length) {
            container.innerHTML = '<p class="no-data">No activities recorded yet</p>';
            return;
        }

        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-header">
                    <span class="activity-type">${activity.activityType}</span>
                    <span class="activity-time">${this.formatTime(activity.recordedAt)}</span>
                </div>
                <div class="activity-details">
                    <span><i class="fas fa-clock"></i> ${activity.duration} min</span>
                    <span><i class="fas fa-fire"></i> ${activity.caloriesBurned} kcal</span>
                </div>
            </div>
        `).join('');
    }

    updateTodaysNutrition(entries) {
        const container = document.getElementById('todays-nutrition');
        
        if (!entries.length) {
            container.innerHTML = '<p class="no-data">No nutrition data for today</p>';
            return;
        }

        const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
        const totalProtein = entries.reduce((sum, entry) => sum + entry.protein, 0);
        const totalCarbs = entries.reduce((sum, entry) => sum + entry.carbs, 0);
        const totalFat = entries.reduce((sum, entry) => sum + entry.fat, 0);

        container.innerHTML = `
            <div class="nutrition-summary">
                <div class="macro-item">
                    <span class="macro-value">${Math.round(totalCalories)}</span>
                    <span class="macro-label">Calories</span>
                </div>
                <div class="macro-breakdown">
                    <div class="macro-detail">
                        <span>Protein: ${totalProtein.toFixed(1)}g</span>
                    </div>
                    <div class="macro-detail">
                        <span>Carbs: ${totalCarbs.toFixed(1)}g</span>
                    </div>
                    <div class="macro-detail">
                        <span>Fat: ${totalFat.toFixed(1)}g</span>
                    </div>
                </div>
            </div>
        `;
    }

    showEmptyDashboard() {
        document.getElementById('total-calories-burned').textContent = '0';
        document.getElementById('total-calories-consumed').textContent = '0';
        document.getElementById('total-workouts').textContent = '0';
        document.getElementById('bmi-value').textContent = '--';
        
        document.getElementById('recent-activities').innerHTML = '<p class="no-data">Create your profile to start tracking</p>';
        document.getElementById('todays-nutrition').innerHTML = '<p class="no-data">Create your profile to start tracking</p>';
    }

    async loadFitnessActivities() {
        if (!this.currentUser) return;

        try {
            const activities = await API.getUserActivities(this.currentUser.id);
            this.displayFitnessActivities(activities);
        } catch (error) {
            console.error('Error loading fitness activities:', error);
        }
    }

    displayFitnessActivities(activities) {
        const container = document.getElementById('fitness-activities');
        
        if (!activities.length) {
            container.innerHTML = '<p class="no-data">No activities recorded yet</p>';
            return;
        }

        container.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-header">
                    <span class="activity-type">${activity.activityType}</span>
                    <span class="activity-time">${this.formatDateTime(activity.recordedAt)}</span>
                </div>
                <div class="activity-details">
                    <span><i class="fas fa-clock"></i> ${activity.duration} min</span>
                    <span><i class="fas fa-fire"></i> ${activity.caloriesBurned} kcal</span>
                </div>
                ${activity.notes ? `<p class="activity-notes">${activity.notes}</p>` : ''}
            </div>
        `).join('');
    }

    async loadNutritionData() {
        if (!this.currentUser) return;

        try {
            const today = new Date().toISOString().split('T')[0];
            const entries = await API.getNutritionForDate(this.currentUser.id, today);
            this.displayNutritionData(entries);
        } catch (error) {
            console.error('Error loading nutrition data:', error);
        }
    }

    displayNutritionData(entries) {
        // Update summary
        const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
        const totalProtein = entries.reduce((sum, entry) => sum + entry.protein, 0);
        const totalCarbs = entries.reduce((sum, entry) => sum + entry.carbs, 0);
        const totalFat = entries.reduce((sum, entry) => sum + entry.fat, 0);

        document.getElementById('total-calories-today').textContent = Math.round(totalCalories);
        document.getElementById('total-protein').textContent = totalProtein.toFixed(1) + 'g';
        document.getElementById('total-carbs').textContent = totalCarbs.toFixed(1) + 'g';
        document.getElementById('total-fat').textContent = totalFat.toFixed(1) + 'g';

        // Update progress bars (assuming daily targets)
        const proteinTarget = this.currentUser ? this.calculateProteinTarget() : 150;
        const carbsTarget = this.currentUser ? this.calculateCarbsTarget() : 200;
        const fatTarget = this.currentUser ? this.calculateFatTarget() : 70;

        this.updateProgressBar('protein-progress', totalProtein, proteinTarget);
        this.updateProgressBar('carbs-progress', totalCarbs, carbsTarget);
        this.updateProgressBar('fat-progress', totalFat, fatTarget);

        // Display entries
        const container = document.getElementById('nutrition-entries');
        const entriesHtml = container.querySelector('.entries-list') || container;
        
        if (!entries.length) {
            entriesHtml.innerHTML = '<h4>Recent Entries</h4><p class="no-data">No nutrition entries for today</p>';
            return;
        }

        const entriesListHtml = entries.map(entry => `
            <div class="nutrition-item">
                <div class="nutrition-header">
                    <span class="food-name">${entry.foodName}</span>
                    <span class="meal-type">${entry.mealType}</span>
                </div>
                <div class="nutrition-details">
                    <span><i class="fas fa-fire"></i> ${entry.calories} kcal</span>
                    <span>P: ${entry.protein}g</span>
                    <span>C: ${entry.carbs}g</span>
                    <span>F: ${entry.fat}g</span>
                </div>
            </div>
        `).join('');

        entriesHtml.innerHTML = `<h4>Recent Entries</h4>${entriesListHtml}`;
    }

    calculateProteinTarget() {
        if (!this.currentUser) return 150;
        // 1.2-2.0g per kg body weight
        return this.currentUser.weight * 1.6;
    }

    calculateCarbsTarget() {
        if (!this.currentUser) return 200;
        // 45-65% of calories from carbs (assuming 2000 kcal diet)
        return (2000 * 0.55) / 4; // 4 kcal per gram of carbs
    }

    calculateFatTarget() {
        if (!this.currentUser) return 70;
        // 20-35% of calories from fat (assuming 2000 kcal diet)
        return (2000 * 0.275) / 9; // 9 kcal per gram of fat
    }

    updateProgressBar(elementId, current, target) {
        const element = document.getElementById(elementId);
        if (element) {
            const percentage = Math.min((current / target) * 100, 100);
            element.style.width = percentage + '%';
        }
    }

    async generateReport() {
        if (!this.currentUser) {
            this.showToast('Please create your profile first', 'warning');
            this.showSection('profile');
            return;
        }

        const reportPeriod = document.querySelector('.report-btn.active').dataset.period;
        
        this.showLoading(true);

        try {
            const reportData = await this.fetchReportData(reportPeriod);
            this.displayReport(reportData, reportPeriod);
        } catch (error) {
            console.error('Error generating report:', error);
            this.showToast('Error generating report. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async fetchReportData(period) {
        const endDate = new Date();
        const startDate = new Date();
        
        if (period === 'week') {
            startDate.setDate(endDate.getDate() - 7);
        } else {
            startDate.setMonth(endDate.getMonth() - 1);
        }

        const activities = await API.getActivitiesForPeriod(this.currentUser.id, startDate, endDate);
        const nutrition = await API.getNutritionForPeriod(this.currentUser.id, startDate, endDate);

        return {
            period,
            startDate,
            endDate,
            activities,
            nutrition,
            summary: this.calculateReportSummary(activities, nutrition)
        };
    }

    calculateReportSummary(activities, nutrition) {
        return {
            totalWorkouts: activities.length,
            totalCaloriesBurned: activities.reduce((sum, a) => sum + a.caloriesBurned, 0),
            totalCaloriesConsumed: nutrition.reduce((sum, n) => sum + n.calories, 0),
            avgCaloriesPerDay: nutrition.reduce((sum, n) => sum + n.calories, 0) / 7,
            mostPopularActivity: this.getMostPopularActivity(activities),
            totalProtein: nutrition.reduce((sum, n) => sum + n.protein, 0),
            totalCarbs: nutrition.reduce((sum, n) => sum + n.carbs, 0),
            totalFat: nutrition.reduce((sum, n) => sum + n.fat, 0)
        };
    }

    getMostPopularActivity(activities) {
        const activityCounts = {};
        activities.forEach(activity => {
            activityCounts[activity.activityType] = (activityCounts[activity.activityType] || 0) + 1;
        });

        let mostPopular = null;
        let maxCount = 0;
        Object.entries(activityCounts).forEach(([activity, count]) => {
            if (count > maxCount) {
                maxCount = count;
                mostPopular = activity;
            }
        });

        return mostPopular || 'None';
    }

    displayReport(reportData, period) {
        const { summary } = reportData;
        const periodName = period === 'week' ? 'Weekly' : 'Monthly';

        const reportHtml = `
            <div class="report-header">
                <h2>${periodName} Health Report</h2>
                <p class="report-period">${this.formatDate(reportData.startDate)} - ${this.formatDate(reportData.endDate)}</p>
            </div>

            <div class="report-stats">
                <div class="report-stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-dumbbell"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${summary.totalWorkouts}</h3>
                        <p>Total Workouts</p>
                    </div>
                </div>

                <div class="report-stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-fire"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${Math.round(summary.totalCaloriesBurned)}</h3>
                        <p>Calories Burned</p>
                    </div>
                </div>

                <div class="report-stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-utensils"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${Math.round(summary.totalCaloriesConsumed)}</h3>
                        <p>Calories Consumed</p>
                    </div>
                </div>

                <div class="report-stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${Math.round(summary.avgCaloriesPerDay)}</h3>
                        <p>Avg Daily Calories</p>
                    </div>
                </div>
            </div>

            <div class="report-insights">
                <div class="insight-card">
                    <h3>Activity Insights</h3>
                    <p><strong>Most Popular Activity:</strong> ${summary.mostPopularActivity}</p>
                    <p><strong>Average Workouts per Day:</strong> ${(summary.totalWorkouts / (period === 'week' ? 7 : 30)).toFixed(1)}</p>
                </div>

                <div class="insight-card">
                    <h3>Nutrition Insights</h3>
                    <p><strong>Total Protein:</strong> ${summary.totalProtein.toFixed(1)}g</p>
                    <p><strong>Total Carbs:</strong> ${summary.totalCarbs.toFixed(1)}g</p>
                    <p><strong>Total Fat:</strong> ${summary.totalFat.toFixed(1)}g</p>
                </div>

                <div class="insight-card">
                    <h3>Health Score</h3>
                    <div class="health-score">
                        <div class="score-circle">
                            <span class="score-value">${this.calculateHealthScore(summary)}</span>
                            <span class="score-label">/ 100</span>
                        </div>
                        <p class="score-description">${this.getHealthScoreDescription(this.calculateHealthScore(summary))}</p>
                    </div>
                </div>
            </div>

            <div class="report-recommendations">
                <h3>Recommendations</h3>
                <ul>
                    ${this.generateRecommendations(summary).map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        `;

        document.getElementById('report-content').innerHTML = reportHtml;
    }

    calculateHealthScore(summary) {
        let score = 0;
        
        // Workout frequency (30 points)
        const workoutScore = Math.min((summary.totalWorkouts / 7) * 30, 30);
        score += workoutScore;

        // Calorie balance (40 points)
        const calorieBalance = summary.totalCaloriesBurned / Math.max(summary.totalCaloriesConsumed, 1);
        const balanceScore = Math.min(calorieBalance * 40, 40);
        score += balanceScore;

        // Consistency (30 points)
        const consistencyScore = summary.totalWorkouts > 0 ? 30 : 0;
        score += consistencyScore;

        return Math.round(Math.min(score, 100));
    }

    getHealthScoreDescription(score) {
        if (score >= 80) return 'Excellent! Keep up the great work!';
        if (score >= 60) return 'Good progress! You\'re on the right track.';
        if (score >= 40) return 'Making progress! Consider increasing activity.';
        return 'Let\'s work on building healthier habits!';
    }

    generateRecommendations(summary) {
        const recommendations = [];

        if (summary.totalWorkouts < 3) {
            recommendations.push('Try to exercise at least 3 times per week for better health benefits.');
        }

        if (summary.totalCaloriesConsumed > summary.totalCaloriesBurned * 1.5) {
            recommendations.push('Consider balancing your calorie intake with more physical activity.');
        }

        if (summary.mostPopularActivity === 'None') {
            recommendations.push('Start with simple activities like walking or light cardio.');
        }

        if (summary.totalProtein < summary.totalCaloriesConsumed * 0.15 / 4) {
            recommendations.push('Consider increasing your protein intake for better muscle recovery.');
        }

        if (recommendations.length === 0) {
            recommendations.push('You\'re doing great! Keep maintaining your healthy lifestyle.');
        }

        return recommendations;
    }

    getWeekStart() {
        const now = new Date();
        const day = now.getDay();
        const diff = now.getDate() - day;
        return new Date(now.setDate(diff));
    }

    formatTime(dateString) {
        return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    formatDateTime(dateString) {
        return new Date(dateString).toLocaleString([], { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    formatDate(date) {
        return date.toLocaleDateString([], { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    showLoading(show) {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.toggle('active', show);
        }
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        // Remove toast after 4 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 4000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.striveHiveApp = new StriveHiveApp();
});

// Export for use in other modules
window.StriveHiveApp = StriveHiveApp;