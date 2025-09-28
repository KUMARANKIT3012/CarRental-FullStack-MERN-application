// Dashboard specific functionality
class Dashboard {
    constructor(app) {
        this.app = app;
        this.charts = {};
        this.initializeCharts();
    }

    async initializeCharts() {
        // Initialize with empty charts, will be populated when data is loaded
        this.setupQuickStats();
        this.setupProgressTracking();
    }

    setupQuickStats() {
        // Quick action buttons for common tasks
        this.addQuickActionButtons();
    }

    addQuickActionButtons() {
        const dashboardContainer = document.querySelector('#dashboard .container');
        if (!dashboardContainer) return;

        const quickActionsHtml = `
            <div class="quick-actions" style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem; color: var(--gray-700);">Quick Actions</h3>
                <div class="quick-actions-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <button class="quick-action-btn" onclick="window.striveHiveApp.showSection('fitness')" style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: linear-gradient(135deg, #4f46e5, #06b6d4); color: white; border: none; border-radius: 0.75rem; cursor: pointer; transition: transform 0.15s ease-in-out;">
                        <i class="fas fa-plus-circle" style="font-size: 1.25rem;"></i>
                        <span style="font-weight: 500;">Add Workout</span>
                    </button>
                    <button class="quick-action-btn" onclick="window.striveHiveApp.showSection('nutrition')" style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: linear-gradient(135deg, #06b6d4, #f59e0b); color: white; border: none; border-radius: 0.75rem; cursor: pointer; transition: transform 0.15s ease-in-out;">
                        <i class="fas fa-utensils" style="font-size: 1.25rem;"></i>
                        <span style="font-weight: 500;">Log Food</span>
                    </button>
                    <button class="quick-action-btn" onclick="window.striveHiveApp.showSection('reports')" style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: linear-gradient(135deg, #10b981, #4f46e5); color: white; border: none; border-radius: 0.75rem; cursor: pointer; transition: transform 0.15s ease-in-out;">
                        <i class="fas fa-chart-bar" style="font-size: 1.25rem;"></i>
                        <span style="font-weight: 500;">View Reports</span>
                    </button>
                    <button class="quick-action-btn" onclick="window.striveHiveApp.showSection('profile')" style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: linear-gradient(135deg, #f59e0b, #ef4444); color: white; border: none; border-radius: 0.75rem; cursor: pointer; transition: transform 0.15s ease-in-out;">
                        <i class="fas fa-user-cog" style="font-size: 1.25rem;"></i>
                        <span style="font-weight: 500;">Update Profile</span>
                    </button>
                </div>
            </div>
        `;

        // Add CSS for hover effects
        const style = document.createElement('style');
        style.textContent = `
            .quick-action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            }
        `;
        document.head.appendChild(style);

        // Insert before dashboard header
        const dashboardHeader = dashboardContainer.querySelector('.dashboard-header');
        if (dashboardHeader) {
            dashboardHeader.insertAdjacentHTML('afterend', quickActionsHtml);
        }
    }

    setupProgressTracking() {
        // Add progress indicators and goal tracking
        this.addGoalTracking();
        this.addWeeklyProgress();
    }

    addGoalTracking() {
        const statsGrid = document.querySelector('.stats-grid');
        if (!statsGrid) return;

        // Add goal tracking card
        const goalTrackingHtml = `
            <div class="stat-card goal-tracking-card">
                <div class="stat-icon">
                    <i class="fas fa-bullseye"></i>
                </div>
                <div class="stat-content">
                    <h3 id="goal-progress">0%</h3>
                    <p>Weekly Goal Progress</p>
                    <div class="goal-progress-bar" style="width: 100%; height: 6px; background: #e5e7eb; border-radius: 3px; margin-top: 0.5rem; overflow: hidden;">
                        <div id="goal-progress-fill" class="goal-progress-fill" style="height: 100%; background: linear-gradient(90deg, #10b981, #06b6d4); width: 0%; transition: width 0.3s ease-in-out; border-radius: 3px;"></div>
                    </div>
                </div>
            </div>
        `;

        statsGrid.insertAdjacentHTML('beforeend', goalTrackingHtml);
    }

    addWeeklyProgress() {
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (!dashboardGrid) return;

        const weeklyProgressHtml = `
            <div class="dashboard-card weekly-progress-card">
                <h3>This Week's Progress</h3>
                <div class="weekly-progress">
                    <div class="progress-item">
                        <div class="progress-header">
                            <span class="progress-label">Workouts</span>
                            <span class="progress-value" id="weekly-workouts">0 / 4</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="weekly-workouts-progress" style="width: 0%; background: #4f46e5;"></div>
                        </div>
                    </div>
                    
                    <div class="progress-item">
                        <div class="progress-header">
                            <span class="progress-label">Calories Burned</span>
                            <span class="progress-value" id="weekly-calories">0 / 2000</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="weekly-calories-progress" style="width: 0%; background: #06b6d4;"></div>
                        </div>
                    </div>
                    
                    <div class="progress-item">
                        <div class="progress-header">
                            <span class="progress-label">Active Days</span>
                            <span class="progress-value" id="weekly-active-days">0 / 5</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="weekly-active-days-progress" style="width: 0%; background: #10b981;"></div>
                        </div>
                    </div>
                </div>
                
                <div class="weekly-chart" id="weekly-activity-chart" style="margin-top: 1.5rem;">
                    <h4 style="margin-bottom: 1rem; color: #374151; font-size: 1rem;">Daily Activity</h4>
                    <div class="activity-chart">
                        <div class="chart-days" id="activity-chart-days">
                            <!-- Will be populated by JavaScript -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        dashboardGrid.insertAdjacentHTML('beforeend', weeklyProgressHtml);

        // Add CSS for progress bars
        const style = document.createElement('style');
        style.textContent = `
            .weekly-progress {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .progress-item {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .progress-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .progress-label {
                font-weight: 500;
                color: #4b5563;
                font-size: 0.9rem;
            }
            
            .progress-value {
                font-weight: 600;
                color: #1f2937;
                font-size: 0.9rem;
            }
            
            .progress-bar {
                width: 100%;
                height: 8px;
                background: #e5e7eb;
                border-radius: 4px;
                overflow: hidden;
            }
            
            .progress-fill {
                height: 100%;
                transition: width 0.5s ease-in-out;
                border-radius: 4px;
            }
            
            .activity-chart {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .chart-days {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 0.5rem;
            }
            
            .chart-day {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0.75rem 0.5rem;
                background: #f9fafb;
                border-radius: 0.5rem;
                transition: background 0.15s ease-in-out;
            }
            
            .chart-day.active {
                background: linear-gradient(135deg, #4f46e5, #06b6d4);
                color: white;
            }
            
            .chart-day-name {
                font-size: 0.75rem;
                font-weight: 500;
                margin-bottom: 0.25rem;
            }
            
            .chart-day-value {
                font-size: 0.7rem;
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
    }

    async updateWeeklyProgress() {
        if (!this.app.currentUser) return;

        try {
            // Get this week's data
            const weekStart = this.getWeekStart();
            const weekEnd = new Date();
            
            const activities = await API.getActivitiesForPeriod(this.app.currentUser.id, weekStart, weekEnd);
            
            // Calculate weekly stats
            const workoutCount = activities.length;
            const totalCaloriesBurned = activities.reduce((sum, activity) => sum + activity.caloriesBurned, 0);
            const activeDays = this.getActiveDays(activities);
            
            // Weekly goals (can be customized based on user preferences)
            const workoutGoal = 4;
            const calorieGoal = 2000;
            const activeDayGoal = 5;
            
            // Update workout progress
            const workoutProgress = (workoutCount / workoutGoal) * 100;
            document.getElementById('weekly-workouts').textContent = `${workoutCount} / ${workoutGoal}`;
            document.getElementById('weekly-workouts-progress').style.width = Math.min(workoutProgress, 100) + '%';
            
            // Update calorie progress
            const calorieProgress = (totalCaloriesBurned / calorieGoal) * 100;
            document.getElementById('weekly-calories').textContent = `${Math.round(totalCaloriesBurned)} / ${calorieGoal}`;
            document.getElementById('weekly-calories-progress').style.width = Math.min(calorieProgress, 100) + '%';
            
            // Update active days progress
            const activeDayProgress = (activeDays.length / activeDayGoal) * 100;
            document.getElementById('weekly-active-days').textContent = `${activeDays.length} / ${activeDayGoal}`;
            document.getElementById('weekly-active-days-progress').style.width = Math.min(activeDayProgress, 100) + '%';
            
            // Update overall goal progress
            const overallProgress = (workoutProgress + calorieProgress + activeDayProgress) / 3;
            document.getElementById('goal-progress').textContent = Math.round(overallProgress) + '%';
            document.getElementById('goal-progress-fill').style.width = overallProgress + '%';
            
            // Update daily activity chart
            this.updateActivityChart(activities);
            
        } catch (error) {
            console.error('Error updating weekly progress:', error);
        }
    }

    updateActivityChart(activities) {
        const chartDays = document.getElementById('activity-chart-days');
        if (!chartDays) return;

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weekStart = this.getWeekStart();
        
        let chartHtml = '';
        
        for (let i = 0; i < 7; i++) {
            const currentDay = new Date(weekStart);
            currentDay.setDate(weekStart.getDate() + i);
            
            const dayActivities = activities.filter(activity => {
                const activityDate = new Date(activity.recordedAt).toDateString();
                return activityDate === currentDay.toDateString();
            });
            
            const dayCalories = dayActivities.reduce((sum, activity) => sum + activity.caloriesBurned, 0);
            const isActive = dayActivities.length > 0;
            
            chartHtml += `
                <div class="chart-day ${isActive ? 'active' : ''}">
                    <div class="chart-day-name">${days[i]}</div>
                    <div class="chart-day-value">${isActive ? Math.round(dayCalories) : '0'}</div>
                </div>
            `;
        }
        
        chartDays.innerHTML = chartHtml;
    }

    getActiveDays(activities) {
        const activeDays = new Set();
        activities.forEach(activity => {
            const date = new Date(activity.recordedAt).toDateString();
            activeDays.add(date);
        });
        return Array.from(activeDays);
    }

    getWeekStart() {
        const now = new Date();
        const day = now.getDay();
        const diff = now.getDate() - day;
        return new Date(now.setDate(diff));
    }

    // Health tips and motivational messages
    displayHealthTip() {
        const healthTips = [
            "💧 Drink at least 8 glasses of water today!",
            "🚶‍♀️ Take a 10-minute walk after meals to aid digestion.",
            "🥗 Fill half your plate with vegetables at each meal.",
            "😴 Aim for 7-9 hours of quality sleep tonight.",
            "🧘‍♀️ Take 5 minutes to practice deep breathing or meditation.",
            "🍎 Choose whole fruits over fruit juices for more fiber.",
            "💪 Try to include protein in every meal to maintain muscle mass.",
            "🌞 Get some sunlight exposure for natural vitamin D.",
            "📱 Take regular breaks from screens to rest your eyes.",
            "🎵 Listen to music or podcasts during your workout for motivation."
        ];

        const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
        
        // Add tip to dashboard if element exists
        const tipElement = document.getElementById('daily-health-tip');
        if (tipElement) {
            tipElement.textContent = randomTip;
        } else {
            // Create tip element
            const dashboardHeader = document.querySelector('.dashboard-header');
            if (dashboardHeader) {
                const tipHtml = `
                    <div class="health-tip" style="margin-top: 1.5rem; padding: 1rem; background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 0.75rem; text-align: center;">
                        <p id="daily-health-tip" style="margin: 0; color: #92400e; font-weight: 500;">${randomTip}</p>
                    </div>
                `;
                dashboardHeader.insertAdjacentHTML('afterend', tipHtml);
            }
        }
    }

    // Motivational messages based on progress
    getMotivationalMessage(progress) {
        if (progress >= 90) {
            return "🏆 Amazing! You're crushing your goals!";
        } else if (progress >= 70) {
            return "🔥 Great job! You're doing fantastic!";
        } else if (progress >= 50) {
            return "💪 Keep going! You're on the right track!";
        } else if (progress >= 25) {
            return "🌱 Good start! Every step counts!";
        } else {
            return "🚀 Let's get started! Your journey begins now!";
        }
    }

    // Initialize dashboard when user data is available
    async initialize() {
        if (this.app.currentUser) {
            await this.updateWeeklyProgress();
            this.displayHealthTip();
        }
    }
}

// Export Dashboard class
window.Dashboard = Dashboard;

// Initialize dashboard when app is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for app to be initialized
    setTimeout(() => {
        if (window.striveHiveApp) {
            window.dashboard = new Dashboard(window.striveHiveApp);
            
            // Update dashboard when section changes
            const originalShowSection = window.striveHiveApp.showSection;
            window.striveHiveApp.showSection = function(sectionName) {
                originalShowSection.call(this, sectionName);
                if (sectionName === 'dashboard') {
                    setTimeout(() => window.dashboard.initialize(), 100);
                }
            };
        }
    }, 500);
});