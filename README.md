🎯 **Algo-Media**

<div id="top"></div>

Welcome to Algo-Media! 🎉 Algo-Media is a React-based video streaming application that allows users to watch YouTube videos. It utilizes the YouTube v3 API provided by RapidAPI to fetch and display videos.

<div align="center">
  <br>
  <img src="https://img.shields.io/github/repo-size/Fenrir-04/Algo-Media?style=for-the-badge" />
  <img src="https://img.shields.io/github/issues/Fenrir-04/Algo-Media?style=for-the-badge" />
  <img src="https://img.shields.io/github/issues-closed-raw/Fenrir-04/Algo-Media?style=for-the-badge" />
  <br>
  <img src="https://img.shields.io/github/forks/Fenrir-04/Algo-Media?style=for-the-badge" />
  <img src="https://img.shields.io/github/issues-pr/Fenrir-04/Algo-Media?style=for-the-badge" />
  <img src="https://img.shields.io/github/issues-pr-closed-raw/Fenrir-04/Algo-Media?style=for-the-badge" />
  <br>
  <img src="https://img.shields.io/github/stars/Fenrir-04/Algo-Media?style=for-the-badge" />
  <img src="https://img.shields.io/github/last-commit/Fenrir-04/Algo-Media?style=for-the-badge" />
  <img src="https://img.shields.io/github/commit-activity/y/Fenrir-04/Algo-Media?style=for-the-badge" />
</div>

# Algo-Media

Algo-Media is a React-based video streaming application inspired by platforms like YouTube. It allows users to watch YouTube videos directly within the application. This repository serves as the codebase for the Algo-Media project, and it utilizes the YouTube v3 API.

## 📚 Table of Contents

- [👋 Introduction](#-introduction)
- [⚙️ Installation](#️-installation)
- [🚀 Usage](#-usage)
- [🧰 Tech Stack Used](#-tech-stack-used)
- [👨‍💻 Mentors and Project Admin](#-mentors-and-project-admin)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🧑‍🤝‍🧑 Contributors](#contributors)

## 👋 Introduction

The Algo-Media application leverages the powerful YouTube v3 API, which enables the retrieval of video data such as titles, descriptions, channel information, and more. By utilizing the API, the application seamlessly integrates with the YouTube API to provide users with an immersive video streaming experience.

## ⚙️ Installation

To get started with Algo-Media, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/Fenrir-04/Algo-Media.git
   ```

2. Navigate to the project directory:

   ```
   cd Algo-Media
   ```

3. Install the necessary dependencies:
   ```
   npm install
   ```
4. Configure API keys: Obtain API keys for the YouTube v3 API by signing up on Google Developer Console and enabling to the [YouTube v3 API](https://console.cloud.google.com/apis/library/youtube.googleapis.com). Once you have the API keys, create a .env file in the root directory of the project and add the following:
   ```
   REACT_APP_APIKEY= your_youtube_api_key
   ```
5. Configure Firebase: Configure your Project in [Google Firebase](https://console.firebase.google.com/). Enable Authentication through Native Providers(email/password) and Google. Add these keys in .env file:
   ```
   REACT_APP_FIREBASE_APIKEY = <KEY>
   REACT_APP_FIREBASE_AUTHDOMAIN = <KEY>
   REACT_APP_FIREBASE_PROJECTID = <KEY>
   REACT_APP_FIREBASE_STORAGEBUCKET = <KEY>
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID = <KEY>
   REACT_APP_FIREBASE_APPID = <KEY>
   ```
6. Run the application: Start the development server by running the following command:
   ```
   npm start
   ```
   This will launch the application in your default web browser. You can access it at http://localhost:3000.

## 🚀 Usage

1. On the Algo-Media homepage, you can enter keywords or topics in the search bar to find related YouTube videos.
2. Click on a video thumbnail to open the video player and start watching the selected video.
3. Scroll down to view additional video suggestions based on your search query.

Feel free to add more features to this project.

## 🧰 Tech Stack Used

<img alt="React" src="https://img.shields.io/badge/react%20-%23323330.svg?&style=for-the-badge&logo=react&logoColor=%#61DBFB"/> <img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/>

## 👨‍💻 Mentors and Project Admin

The Algo-Media project is part of the Girlscript Summer of Code 2023 program. The mentors for this project are [Komal Dewnani](https://github.com/KOMALDEWNANI) and [Yashvardhan Verma](https://github.com/yashvardhan-verma). The project is administered by [Harshvardhan Singh](https://github.com/Fenrir-04). Feel free to tag them for reviewing pull requests, assigning issues or any other queries. GSSOC'23 Contributors join our [Discord](https://discord.com/channels/1099745007172329592/1109166107278983290) Channel for Collaboration and Support

## 🤝 Contributing

Contributions to Algo-Media are always welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```
   git commit -m "Add your commit message"
   ```
4. Push your changes to your forked repository:
   ```
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

If you have any questions, suggestions, or need assistance with your contribution in GSSOC'23, feel free to reach out to the mentors or the project admin. They will be happy to help and guide you through the process.

## 📝 License

The project is licensed under the [MIT License](https://github.com/Fenrir-04/Algo-Media/blob/main/LICENSE).

## 🧑‍🤝‍🧑Contributors

Thank you for considering contributing to Algo-Media! Your contributions will play a crucial role in enhancing the functionality and user experience of the application.
We would like to thank the following contributors for their valuable contributions to Algo-Media:

<div align="center">
<a href="https://github.com/Fenrir-04/Algo-Media/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Fenrir-04/Algo-Media" />
</a>

</a>
</div>

<p align="right">(<a href="#top">Back to top</a>)</p>
