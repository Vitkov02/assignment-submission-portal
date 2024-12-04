# How to Run the Project Locally

Follow the steps below to set up and run this project on your local machine.

### Prerequisites

Before starting, ensure that you have the following installed:

1. **Node.js** (v16.x or later): [Download Node.js](https://nodejs.org/)
2. **Git** (for version control): [Download Git](https://git-scm.com/)
3. A **code editor** (e.g., [Visual Studio Code](https://code.visualstudio.com/))

### Steps to Set Up Locally

#### 1. Clone the Repository

First, you need to clone the repository to your local machine. Open a terminal and run the following command:

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the actual URL of your repository (e.g., `https://github.com/yourusername/yourproject.git`).

Navigate to the project directory:

```bash
cd yourproject
```

#### 2. Install Dependencies

Install all the necessary dependencies by running:

```bash
npm install --force
```

This will download and install all the required packages listed in the `package.json` file.


#### 3. Run the Project

Once dependencies are installed and environment variables are set, you can run the project locally with:

```bash
npm run dev
```

This will start the development server. By default, the app should be available at:

```
http://localhost:3000
```

#### 5. Open the Project in Your Browser

Open your browser and navigate to `http://localhost:3000`. You should now see the project running locally on your machine.

### Common Commands

Here are some common commands that you may find useful while developing:

- **Start the development server**:  
  ```bash
  npm run dev
  ```

- **Build the project for production**:  
  ```bash
  npm run build
  ```

- **Run tests**:  
  ```bash
  npm run test
  ```

- **Run linting**:  
  ```bash
  npm run lint
  ```

- **Format code**:  
  ```bash
  npm run format
  ```

### Troubleshooting

- **Error: "Module not found"**:  
  Make sure all dependencies are installed correctly by running `npm install --force`. If you still face issues, try deleting the `node_modules` folder and the `package-lock.json` file and running `npm install` again.

