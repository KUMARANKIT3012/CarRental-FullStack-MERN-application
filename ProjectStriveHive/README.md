# 🏃‍♀️ Strive Hive - Health & Fitness Tracker

A comprehensive health and fitness tracking application that helps users monitor their daily activities, nutrition intake, and generate detailed weekly/monthly reports to promote healthy living.

## 🌟 Features

### 📊 Dashboard
- Real-time health metrics display (BMI, BMR, calories burned/consumed)
- Quick action buttons for common tasks
- Weekly progress tracking with visual indicators
- Daily health tips and motivational messages
- Recent activity and nutrition summaries

### 👤 User Profile Management
- Complete user profile with personal information
- Health metrics calculation (BMI, BMR)
- Customizable fitness goals and activity levels
- Profile data persistence

### 🏋️ Fitness Activity Tracking
- Log various types of workouts (running, cycling, weightlifting, yoga, etc.)
- Track duration, calories burned, and workout notes
- Activity history with detailed viewing
- Weekly workout statistics

### 🍎 Nutrition Monitoring
- Comprehensive food logging with macronutrient tracking
- Meal type categorization (breakfast, lunch, dinner, snacks)
- Daily nutrition summaries with progress bars
- Calorie and macronutrient goal tracking

### 📈 Advanced Reporting & Analytics
- **Weekly & Monthly Reports** with detailed insights
- **Health Score Calculation** based on activity and nutrition
- **Personalized Recommendations** based on user goals
- **Behavior Pattern Analysis** (preferred workout days, meal timing)
- **Nutrition Balance Assessment** (protein, carbs, fat ratios)
- **Progress Tracking** with trend analysis
- **Data Export** (JSON/CSV formats)

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript** - ES6+ features, modular architecture
- **Font Awesome** - Icon library
- **Google Fonts** - Typography (Inter font family)

### Backend
- **Java 17** - Core programming language
- **Spring Boot 3.1.5** - Application framework
- **Spring Data JPA** - Database abstraction layer
- **H2 Database** - In-memory database for development
- **MySQL** - Production database option
- **Maven** - Build tool and dependency management

### Database Schema
- **Users** - Personal information and fitness goals
- **Fitness Activities** - Workout tracking with calories and duration
- **Nutrition Entries** - Food logging with detailed macronutrients

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Maven 3.6+** or higher
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

### Backend Setup

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/strive-hive.git
cd strive-hive
```

2. **Navigate to backend directory:**
```bash
cd backend
```

3. **Install Java (if not already installed):**
   - Download from [Oracle JDK](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://openjdk.org/)
   - Verify installation: `java --version`

4. **Install Maven (if not already installed):**
   - Download from [Apache Maven](https://maven.apache.org/download.cgi)
   - Verify installation: `mvn --version`

5. **Build and run the application:**
```bash
mvn clean install
mvn spring-boot:run
```

6. **Verify backend is running:**
   - Open http://localhost:8080 in your browser
   - You should see a Spring Boot welcome page or H2 console

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd ../frontend
```

2. **Open index.html in a web browser:**
   - **Option 1:** Double-click `index.html`
   - **Option 2:** Use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 3000
     
     # Using Node.js (if you have http-server installed)
     npx http-server -p 3000
     
     # Using PHP
     php -S localhost:3000
     ```

3. **Access the application:**
   - Open http://localhost:3000 in your browser

### Database Access (Development)

- **H2 Console:** http://localhost:8080/h2-console
- **JDBC URL:** `jdbc:h2:mem:strivehive`
- **Username:** `sa`
- **Password:** (empty)

## 📱 How to Use

### 1. Create Your Profile
- Navigate to the **Profile** section
- Fill in your personal information (name, email, age, gender)
- Add physical metrics (height, weight)
- Set your activity level and fitness goals
- Click "Save Profile"

### 2. Track Fitness Activities
- Go to **Fitness** section
- Select activity type (running, cycling, yoga, etc.)
- Enter duration and estimated calories burned
- Add optional notes about your workout
- Submit to save your activity

### 3. Log Nutrition
- Visit **Nutrition** section
- Enter food name and select meal type
- Add serving size and nutritional information
- View real-time daily nutrition summary
- Track macronutrient balance with progress bars

### 4. View Reports
- Navigate to **Reports** section
- Choose between Weekly or Monthly reports
- Click "Generate Report" for detailed analytics
- Review health score, recommendations, and insights
- Export data in JSON or CSV format

## 🔧 Configuration

### Backend Configuration
Edit `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:h2:mem:strivehive
spring.datasource.username=sa
spring.datasource.password=

# Server Configuration
server.port=8080

# For MySQL (Production)
# spring.datasource.url=jdbc:mysql://localhost:3306/strivehive
# spring.datasource.username=your_username
# spring.datasource.password=your_password
# spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

### Frontend Configuration
Edit `frontend/js/api.js` to change backend URL:

```javascript
static BASE_URL = 'http://localhost:8080/api';
```

## 🏗️ Project Structure

```
ProjectStriveHive/
├── backend/
│   ├── src/main/java/com/strivehive/
│   │   ├── StriveHiveApplication.java
│   │   ├── controller/          # REST API controllers
│   │   ├── model/              # Entity classes
│   │   ├── repository/         # Data access layer
│   │   └── service/           # Business logic
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml               # Maven dependencies
├── frontend/
│   ├── index.html           # Main HTML file
│   ├── css/
│   │   └── styles.css      # Comprehensive styling
│   ├── js/
│   │   ├── app.js         # Main application logic
│   │   ├── api.js         # Backend communication
│   │   ├── dashboard.js   # Dashboard functionality
│   │   └── reports.js     # Advanced reporting
│   └── assets/
│       └── images/        # Image assets
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## 🎨 Key Features Explained

### Offline Support
- Data stored locally when backend is unavailable
- Automatic sync when connection is restored
- Queue-based synchronization system

### Responsive Design
- Mobile-first approach with CSS Grid and Flexbox
- Breakpoints for tablets and mobile devices
- Touch-friendly interface elements

### Health Analytics
- **BMI Calculator** - Body Mass Index based on height/weight
- **BMR Calculator** - Basal Metabolic Rate using Harris-Benedict formula
- **Health Score** - Comprehensive score based on activity and nutrition
- **Trend Analysis** - Track progress over time

### Personalized Recommendations
- Goal-specific advice (weight loss, muscle gain, maintenance)
- Activity consistency improvements
- Nutrition balance optimization
- Behavior pattern insights

## 🔒 Data Privacy & Storage

- All data stored locally in browser localStorage
- Optional backend synchronization
- No personal data shared with third parties
- Users have full control over their data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Backend Issues
- **Port 8080 already in use:** Change port in application.properties
- **Java version errors:** Ensure Java 17+ is installed
- **Database connection issues:** Check H2 console configuration

### Frontend Issues
- **CORS errors:** Use a local HTTP server instead of file:// protocol
- **API not responding:** Verify backend is running on localhost:8080
- **Styling issues:** Clear browser cache and reload

### Common Solutions
```bash
# Check Java version
java --version

# Check Maven version
mvn --version

# Clear Maven cache
mvn clean

# Restart backend
mvn spring-boot:run

# Test API endpoint
curl http://localhost:8080/api/users
```

## 📞 Support

- **Documentation:** This README file
- **Issues:** GitHub Issues page
- **Development:** Check the project's GitHub repository

## 🎯 Roadmap

- [ ] User authentication and authorization
- [ ] Social features and workout sharing
- [ ] Integration with fitness wearables
- [ ] Advanced nutrition database
- [ ] Mobile app development
- [ ] AI-powered recommendations
- [ ] Integration with health apps

---

**Made with ❤️ for healthier living** 🌱