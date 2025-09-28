// Reports and Analytics Module
class ReportsManager {
    constructor(app) {
        this.app = app;
        this.reportTypes = {
            week: 'Weekly Report',
            month: 'Monthly Report'
        };
    }

    async generateDetailedReport(period = 'week') {
        if (!this.app.currentUser) {
            throw new Error('User profile required');
        }

        const reportData = await this.fetchReportData(period);
        const analysis = this.performAdvancedAnalysis(reportData);
        
        return {
            ...reportData,
            analysis,
            recommendations: this.generatePersonalizedRecommendations(analysis, this.app.currentUser)
        };
    }

    async fetchReportData(period) {
        const endDate = new Date();
        const startDate = new Date();
        
        if (period === 'week') {
            startDate.setDate(endDate.getDate() - 7);
        } else {
            startDate.setMonth(endDate.getMonth() - 1);
        }

        try {
            const [activities, nutrition] = await Promise.all([
                API.getActivitiesForPeriod(this.app.currentUser.id, startDate, endDate),
                API.getNutritionForPeriod(this.app.currentUser.id, startDate, endDate)
            ]);

            return {
                period,
                startDate,
                endDate,
                activities,
                nutrition,
                summary: this.calculateBasicSummary(activities, nutrition)
            };
        } catch (error) {
            console.error('Error fetching report data:', error);
            return {
                period,
                startDate,
                endDate,
                activities: [],
                nutrition: [],
                summary: this.calculateBasicSummary([], [])
            };
        }
    }

    calculateBasicSummary(activities, nutrition) {
        return {
            totalWorkouts: activities.length,
            totalCaloriesBurned: activities.reduce((sum, a) => sum + a.caloriesBurned, 0),
            totalCaloriesConsumed: nutrition.reduce((sum, n) => sum + n.calories, 0),
            totalDuration: activities.reduce((sum, a) => sum + a.duration, 0),
            avgCaloriesPerDay: nutrition.reduce((sum, n) => sum + n.calories, 0) / 7,
            mostPopularActivity: this.getMostPopularActivity(activities),
            totalProtein: nutrition.reduce((sum, n) => sum + n.protein, 0),
            totalCarbs: nutrition.reduce((sum, n) => sum + n.carbs, 0),
            totalFat: nutrition.reduce((sum, n) => sum + n.fat, 0),
            uniqueActiveDays: this.getActiveDays(activities).length,
            avgWorkoutDuration: activities.length > 0 ? activities.reduce((sum, a) => sum + a.duration, 0) / activities.length : 0
        };
    }

    performAdvancedAnalysis(reportData) {
        const { activities, nutrition, summary } = reportData;
        
        return {
            // Activity Analysis
            activityConsistency: this.calculateConsistency(activities),
            activityTrends: this.calculateActivityTrends(activities),
            calorieBurnEfficiency: this.calculateEfficiency(activities),
            
            // Nutrition Analysis
            nutritionBalance: this.analyzeNutritionBalance(nutrition),
            hydrationEstimate: this.estimateHydration(nutrition),
            mealTiming: this.analyzeMealTiming(nutrition),
            
            // Overall Health Metrics
            healthScore: this.calculateHealthScore(summary),
            progressScore: this.calculateProgressScore(reportData),
            balanceScore: this.calculateEnergyBalance(summary),
            
            // Behavioral Insights
            behaviorPatterns: this.analyzeBehaviorPatterns(activities, nutrition),
            motivationFactors: this.identifyMotivationFactors(reportData)
        };
    }

    calculateConsistency(activities) {
        if (activities.length === 0) return 0;
        
        const activeDays = this.getActiveDays(activities);
        const totalDays = 7; // Assuming weekly report
        const consistency = (activeDays.length / totalDays) * 100;
        
        return {
            score: consistency,
            rating: consistency >= 80 ? 'Excellent' : consistency >= 60 ? 'Good' : consistency >= 40 ? 'Fair' : 'Needs Improvement',
            activeDays: activeDays.length,
            totalDays
        };
    }

    calculateActivityTrends(activities) {
        const dailyCalories = {};
        const activityTypes = {};
        
        activities.forEach(activity => {
            const date = new Date(activity.recordedAt).toDateString();
            dailyCalories[date] = (dailyCalories[date] || 0) + activity.caloriesBurned;
            activityTypes[activity.activityType] = (activityTypes[activity.activityType] || 0) + 1;
        });

        const trend = this.calculateTrend(Object.values(dailyCalories));
        
        return {
            dailyCalories,
            activityTypes,
            trend: trend > 0 ? 'Increasing' : trend < 0 ? 'Decreasing' : 'Stable',
            trendValue: trend,
            mostFrequent: Object.keys(activityTypes).reduce((a, b) => activityTypes[a] > activityTypes[b] ? a : b, 'None')
        };
    }

    calculateTrend(values) {
        if (values.length < 2) return 0;
        
        const n = values.length;
        const sumX = n * (n - 1) / 2;
        const sumY = values.reduce((sum, val) => sum + val, 0);
        const sumXY = values.reduce((sum, val, index) => sum + (index * val), 0);
        const sumX2 = n * (n - 1) * (2 * n - 1) / 6;
        
        return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    }

    analyzeNutritionBalance(nutrition) {
        if (nutrition.length === 0) {
            return {
                protein: { percentage: 0, status: 'No data' },
                carbs: { percentage: 0, status: 'No data' },
                fat: { percentage: 0, status: 'No data' },
                balance: 'No data'
            };
        }

        const totalCalories = nutrition.reduce((sum, n) => sum + n.calories, 0);
        const totalProtein = nutrition.reduce((sum, n) => sum + n.protein, 0);
        const totalCarbs = nutrition.reduce((sum, n) => sum + n.carbs, 0);
        const totalFat = nutrition.reduce((sum, n) => sum + n.fat, 0);

        const proteinCalories = totalProtein * 4;
        const carbsCalories = totalCarbs * 4;
        const fatCalories = totalFat * 9;
        const macroCalories = proteinCalories + carbsCalories + fatCalories;

        if (macroCalories === 0) {
            return {
                protein: { percentage: 0, status: 'No data' },
                carbs: { percentage: 0, status: 'No data' },
                fat: { percentage: 0, status: 'No data' },
                balance: 'No data'
            };
        }

        const proteinPercent = (proteinCalories / macroCalories) * 100;
        const carbsPercent = (carbsCalories / macroCalories) * 100;
        const fatPercent = (fatCalories / macroCalories) * 100;

        return {
            protein: {
                percentage: proteinPercent,
                status: this.getMacroStatus(proteinPercent, 10, 35, 'protein'),
                grams: totalProtein,
                target: this.app.currentUser ? this.app.currentUser.weight * 1.6 : 150
            },
            carbs: {
                percentage: carbsPercent,
                status: this.getMacroStatus(carbsPercent, 45, 65, 'carbs'),
                grams: totalCarbs,
                target: 225 // ~45% of 2000 kcal
            },
            fat: {
                percentage: fatPercent,
                status: this.getMacroStatus(fatPercent, 20, 35, 'fat'),
                grams: totalFat,
                target: 65 // ~30% of 2000 kcal
            },
            balance: this.getOverallBalance(proteinPercent, carbsPercent, fatPercent)
        };
    }

    getMacroStatus(percentage, minRecommended, maxRecommended, macroType) {
        if (percentage < minRecommended) return `Low (increase ${macroType})`;
        if (percentage > maxRecommended) return `High (reduce ${macroType})`;
        return 'Optimal';
    }

    getOverallBalance(protein, carbs, fat) {
        const idealProtein = 25; // Mid-range
        const idealCarbs = 50;
        const idealFat = 25;

        const deviation = Math.abs(protein - idealProtein) + 
                         Math.abs(carbs - idealCarbs) + 
                         Math.abs(fat - idealFat);

        if (deviation < 15) return 'Well Balanced';
        if (deviation < 30) return 'Moderately Balanced';
        return 'Needs Improvement';
    }

    analyzeMealTiming(nutrition) {
        const mealTimes = {
            breakfast: [],
            lunch: [],
            dinner: [],
            snack: []
        };

        nutrition.forEach(entry => {
            const hour = new Date(entry.recordedAt).getHours();
            if (entry.mealType in mealTimes) {
                mealTimes[entry.mealType].push(hour);
            }
        });

        return {
            patterns: Object.keys(mealTimes).map(meal => ({
                meal,
                count: mealTimes[meal].length,
                avgTime: mealTimes[meal].length > 0 ? 
                    Math.round(mealTimes[meal].reduce((sum, hour) => sum + hour, 0) / mealTimes[meal].length) : null,
                consistency: this.calculateTimeConsistency(mealTimes[meal])
            })),
            regularityScore: this.calculateMealRegularity(mealTimes)
        };
    }

    calculateTimeConsistency(times) {
        if (times.length < 2) return 'Insufficient data';
        
        const variance = this.calculateVariance(times);
        if (variance < 2) return 'Very Consistent';
        if (variance < 4) return 'Consistent';
        if (variance < 8) return 'Somewhat Consistent';
        return 'Inconsistent';
    }

    calculateVariance(numbers) {
        const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
        const variance = numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / numbers.length;
        return variance;
    }

    calculateMealRegularity(mealTimes) {
        let regularityScore = 0;
        const totalMeals = Object.values(mealTimes).reduce((sum, times) => sum + times.length, 0);
        
        if (totalMeals === 0) return 0;

        // Score based on having regular meals
        if (mealTimes.breakfast.length > 0) regularityScore += 25;
        if (mealTimes.lunch.length > 0) regularityScore += 25;
        if (mealTimes.dinner.length > 0) regularityScore += 25;
        
        // Bonus for consistent timing
        const consistencyBonus = Object.values(mealTimes)
            .filter(times => times.length > 1)
            .reduce((bonus, times) => {
                const variance = this.calculateVariance(times);
                return bonus + Math.max(0, 25 - variance * 3);
            }, 0) / 4;

        return Math.min(regularityScore + consistencyBonus, 100);
    }

    calculateHealthScore(summary) {
        let score = 0;
        const maxScore = 100;

        // Activity score (40 points)
        const activityScore = Math.min((summary.totalWorkouts / 4) * 40, 40);
        score += activityScore;

        // Calorie balance score (30 points)
        const calorieBalance = summary.totalCaloriesBurned / Math.max(summary.totalCaloriesConsumed, 1);
        let balanceScore = 0;
        if (calorieBalance >= 0.8 && calorieBalance <= 1.2) {
            balanceScore = 30;
        } else if (calorieBalance >= 0.6 && calorieBalance <= 1.4) {
            balanceScore = 20;
        } else if (calorieBalance >= 0.4 && calorieBalance <= 1.6) {
            balanceScore = 10;
        }
        score += balanceScore;

        // Consistency score (30 points)
        const consistencyScore = (summary.uniqueActiveDays / 7) * 30;
        score += consistencyScore;

        return {
            total: Math.round(score),
            breakdown: {
                activity: Math.round(activityScore),
                balance: Math.round(balanceScore),
                consistency: Math.round(consistencyScore)
            },
            rating: this.getHealthRating(score)
        };
    }

    getHealthRating(score) {
        if (score >= 80) return { level: 'Excellent', color: '#10b981', message: 'Outstanding health habits!' };
        if (score >= 60) return { level: 'Good', color: '#06b6d4', message: 'Solid progress toward your goals!' };
        if (score >= 40) return { level: 'Fair', color: '#f59e0b', message: 'Room for improvement!' };
        return { level: 'Needs Work', color: '#ef4444', message: 'Let\'s build better habits together!' };
    }

    generatePersonalizedRecommendations(analysis, user) {
        const recommendations = [];
        const { healthScore, activityConsistency, nutritionBalance } = analysis;

        // Activity recommendations
        if (activityConsistency.score < 60) {
            recommendations.push({
                type: 'activity',
                priority: 'high',
                title: 'Improve Workout Consistency',
                description: `You're active ${activityConsistency.activeDays} out of ${activityConsistency.totalDays} days. Try to add ${Math.ceil((4 - activityConsistency.activeDays) / 2)} more workout days.`,
                actionItems: [
                    'Schedule workouts at the same time each day',
                    'Start with 15-20 minute sessions',
                    'Find activities you enjoy',
                    'Set reminders on your phone'
                ]
            });
        }

        // Nutrition recommendations
        if (nutritionBalance.protein && nutritionBalance.protein.status.includes('Low')) {
            recommendations.push({
                type: 'nutrition',
                priority: 'medium',
                title: 'Increase Protein Intake',
                description: `Your protein intake is ${nutritionBalance.protein.percentage.toFixed(1)}% of calories. Aim for 20-30%.`,
                actionItems: [
                    'Add lean protein to each meal',
                    'Try Greek yogurt or cottage cheese as snacks',
                    'Include protein powder in smoothies',
                    'Eat eggs for breakfast'
                ]
            });
        }

        // Goal-specific recommendations
        if (user.fitnessGoal === 'weight_loss' && analysis.balanceScore < 70) {
            recommendations.push({
                type: 'goal',
                priority: 'high',
                title: 'Optimize for Weight Loss',
                description: 'Create a moderate calorie deficit while maintaining muscle mass.',
                actionItems: [
                    'Track your food portions more carefully',
                    'Increase protein to preserve muscle',
                    'Add strength training 2-3x per week',
                    'Focus on whole, unprocessed foods'
                ]
            });
        }

        if (user.fitnessGoal === 'muscle_gain' && analysis.activityTrends.mostFrequent !== 'weightlifting') {
            recommendations.push({
                type: 'goal',
                priority: 'high',
                title: 'Focus on Strength Training',
                description: 'Prioritize resistance training for muscle growth.',
                actionItems: [
                    'Include weightlifting 3-4x per week',
                    'Progressive overload each session',
                    'Ensure adequate protein (1.6-2.2g per kg bodyweight)',
                    'Get adequate rest between sessions'
                ]
            });
        }

        // General health recommendations
        if (healthScore.total < 70) {
            recommendations.push({
                type: 'general',
                priority: 'medium',
                title: 'Build Healthy Habits',
                description: 'Focus on creating sustainable lifestyle changes.',
                actionItems: [
                    'Start small with 10-minute daily walks',
                    'Plan your meals ahead of time',
                    'Stay hydrated throughout the day',
                    'Get 7-9 hours of sleep nightly'
                ]
            });
        }

        return recommendations.sort((a, b) => {
            const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }

    // Helper methods
    getMostPopularActivity(activities) {
        if (activities.length === 0) return 'None';
        
        const activityCounts = {};
        activities.forEach(activity => {
            activityCounts[activity.activityType] = (activityCounts[activity.activityType] || 0) + 1;
        });

        return Object.keys(activityCounts).reduce((a, b) => 
            activityCounts[a] > activityCounts[b] ? a : b
        );
    }

    getActiveDays(activities) {
        const activeDays = new Set();
        activities.forEach(activity => {
            const date = new Date(activity.recordedAt).toDateString();
            activeDays.add(date);
        });
        return Array.from(activeDays);
    }

    calculateEfficiency(activities) {
        if (activities.length === 0) return { score: 0, rating: 'No data' };
        
        const avgCaloriesPerMinute = activities.reduce((sum, activity) => 
            sum + (activity.caloriesBurned / activity.duration), 0) / activities.length;
        
        let rating = 'Low';
        if (avgCaloriesPerMinute > 8) rating = 'High';
        else if (avgCaloriesPerMinute > 5) rating = 'Moderate';
        
        return {
            score: avgCaloriesPerMinute,
            rating,
            avgCaloriesPerMinute: avgCaloriesPerMinute.toFixed(1)
        };
    }

    calculateProgressScore(reportData) {
        // This would typically compare against historical data
        // For now, return a basic implementation
        const { summary } = reportData;
        
        return {
            overall: Math.min((summary.totalWorkouts / 4) * 100, 100),
            activity: Math.min((summary.totalWorkouts / 4) * 100, 100),
            nutrition: Math.min((summary.totalCaloriesConsumed > 0 ? 100 : 0), 100)
        };
    }

    calculateEnergyBalance(summary) {
        const balance = summary.totalCaloriesBurned - summary.totalCaloriesConsumed;
        const balanceScore = 50 + (balance / 100); // Rough calculation
        
        return {
            balance,
            score: Math.max(0, Math.min(100, balanceScore)),
            status: balance > 500 ? 'Large Deficit' : 
                   balance > 0 ? 'Calorie Deficit' : 
                   balance > -500 ? 'Calorie Surplus' : 'Large Surplus'
        };
    }

    analyzeBehaviorPatterns(activities, nutrition) {
        return {
            preferredWorkoutDays: this.getPreferredDays(activities),
            averageWorkoutTime: this.getAverageWorkoutTime(activities),
            nutritionPatterns: this.getNutritionPatterns(nutrition)
        };
    }

    getPreferredDays(activities) {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayCounts = Array(7).fill(0);
        
        activities.forEach(activity => {
            const dayOfWeek = new Date(activity.recordedAt).getDay();
            dayCounts[dayOfWeek]++;
        });

        const maxCount = Math.max(...dayCounts);
        return dayCounts
            .map((count, index) => ({ day: dayNames[index], count }))
            .filter(day => day.count === maxCount && maxCount > 0)
            .map(day => day.day);
    }

    getAverageWorkoutTime(activities) {
        if (activities.length === 0) return 'No data';
        
        const hours = activities.map(activity => new Date(activity.recordedAt).getHours());
        const avgHour = hours.reduce((sum, hour) => sum + hour, 0) / hours.length;
        
        const hour = Math.round(avgHour);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        
        return `${displayHour}:00 ${ampm}`;
    }

    getNutritionPatterns(nutrition) {
        const mealCounts = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };
        nutrition.forEach(entry => {
            if (entry.mealType in mealCounts) {
                mealCounts[entry.mealType]++;
            }
        });

        const totalMeals = Object.values(mealCounts).reduce((sum, count) => sum + count, 0);
        
        return {
            mealFrequency: mealCounts,
            averageMealsPerDay: totalMeals / 7,
            mostSkippedMeal: Object.keys(mealCounts).reduce((a, b) => 
                mealCounts[a] < mealCounts[b] ? a : b, 'breakfast')
        };
    }

    identifyMotivationFactors(reportData) {
        // Basic implementation - could be enhanced with user feedback
        const { activities, summary } = reportData;
        
        return {
            successFactors: summary.totalWorkouts > 3 ? 
                ['Regular exercise routine', 'Consistent tracking'] : 
                ['Getting started', 'Building awareness'],
            challenges: summary.totalWorkouts < 2 ? 
                ['Time management', 'Motivation'] : 
                ['Maintaining consistency', 'Progressive overload'],
            suggestions: [
                'Set specific workout times',
                'Find an accountability partner',
                'Celebrate small wins',
                'Track progress visually'
            ]
        };
    }

    // Export functionality
    exportReportAsJSON(reportData) {
        const dataStr = JSON.stringify(reportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `strive-hive-report-${reportData.period}-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    exportReportAsCSV(reportData) {
        // Convert activities and nutrition to CSV format
        const { activities, nutrition } = reportData;
        
        let csvContent = "data:text/csv;charset=utf-8,";
        
        // Activities CSV
        csvContent += "Activities\n";
        csvContent += "Date,Type,Duration (min),Calories Burned,Notes\n";
        activities.forEach(activity => {
            csvContent += `${new Date(activity.recordedAt).toLocaleDateString()},${activity.activityType},${activity.duration},${activity.caloriesBurned},"${activity.notes || ''}"\n`;
        });
        
        csvContent += "\nNutrition\n";
        csvContent += "Date,Meal Type,Food,Calories,Protein (g),Carbs (g),Fat (g)\n";
        nutrition.forEach(entry => {
            csvContent += `${new Date(entry.recordedAt).toLocaleDateString()},${entry.mealType},${entry.foodName},${entry.calories},${entry.protein},${entry.carbs},${entry.fat}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `strive-hive-data-${reportData.period}-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Export ReportsManager
window.ReportsManager = ReportsManager;