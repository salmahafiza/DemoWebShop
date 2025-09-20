# 🛒 DemoWebShop Automation Project

This repository contains an **end-to-end test automation framework** for the **Demo Web Shop** application, built with [Playwright](https://playwright.dev/).  
It demonstrates modern QA practices including **UI automation, cross-browser testing, API validation, test data handling, and CI/CD readiness**.

---

## 📌 Features
- ✅ Automated **functional UI tests** for key user journeys (login, product search, cart, checkout, etc.)
- ✅ **Page Object Model (POM)** for scalable and maintainable test design
- ✅ **Cross-browser execution** (Chromium, Firefox, WebKit, Edge)
- ✅ **API Testing** integrated using Playwright + Postman collections
- ✅ **Test data management** via JSON files
- ✅ **CI/CD pipeline ready** (Jenkins/GitHub Actions)
- ✅ Generates detailed **HTML reports** & **test artifacts** (screenshots, videos, trace files)

---

## 📂 Project Structure

DemoWebShop/
│── pages/ # Page Object files (UI locators + actions)
│── tests/ # Test scripts (organized by features)
│── test-data/ # Input data for tests
│── jenkins-artifacts/ # Sample reports & server logs (demo purpose)
│── playwright.config.js # Playwright configuration
│── package.json # Project dependencies & scripts
│── .gitignore # Ignored files/folders

2️⃣ Install dependencies
npm install

3️⃣ Install Playwright browsers
npx playwright install

▶️ Running Tests
Run all tests (default browser: Chromium)
npx playwright test

Run tests in headed mode
npx playwright test --headed

Run tests in specific browser
npx playwright test --browser=firefox

Run only one test file
npx playwright test tests/login.spec.js

📊 Test Reports

After execution, Playwright generates rich reports.

Show last test report
npx playwright show-report


Reports include:

📑 Test execution summary

📸 Screenshots

🎥 Videos

🔍 Trace viewer for debugging

🚀 CI/CD Integration

This project is CI-ready:

Jenkins pipeline script available

Can be extended to GitHub Actions

Artifacts (jenkins-artifacts/) included as examples

🛠️ Tech Stack

Playwright – UI & API test automation

Node.js / npm – Dependency management

Jenkins / GitHub Actions – CI/CD integration

Postman / REST API validation – API checks

Page Object Model – Test design pattern

Agile QA workflows – Jira, bug reporting, regression tracking

📌 Future Improvements

🔄 Add test coverage badge & GitHub Actions workflow

📈 Integrate with Allure Report for advanced analytics

🔐 Add environment configs (dev/stage/prod) with .env

☁️ Run tests in cloud (e.g. BrowserStack, Playwright Cloud)

2️⃣ Install dependencies
npm install

3️⃣ Install Playwright browsers
npx playwright install

▶️ Running Tests
Run all tests (default browser: Chromium)
npx playwright test

Run tests in headed mode
npx playwright test --headed

Run tests in specific browser
npx playwright test --browser=firefox

Run only one test file
npx playwright test tests/login.spec.js

📊 Test Reports

After execution, Playwright generates rich reports.

Show last test report
npx playwright show-report


Reports include:

📑 Test execution summary

📸 Screenshots

🎥 Videos

🔍 Trace viewer for debugging

🚀 CI/CD Integration

This project is CI-ready:

Jenkins pipeline script available

Can be extended to GitHub Actions

Artifacts (jenkins-artifacts/) included as examples

🛠️ Tech Stack

Playwright – UI & API test automation

Node.js / npm – Dependency management

Jenkins / GitHub Actions – CI/CD integration

Postman / REST API validation – API checks

Page Object Model – Test design pattern

Agile QA workflows – Jira, bug reporting, regression tracking

📌 Future Improvements

🔄 Add test coverage badge & GitHub Actions workflow

📈 Integrate with Allure Report for advanced analytics

🔐 Add environment configs (dev/stage/prod) with .env

☁️ Run tests in cloud (e.g. BrowserStack, Playwright Cloud)

👩‍💻 Author

Salma Hafiza
Software QA Engineer | Manual & Automation Testing
