## How to Run This Project

Follow these steps to run the project on your local machine:

### Prerequisites

1. Ensure you have **Node.js** (v16 or higher) and **npm** (or yarn) installed.  
   You can download Node.js from [https://nodejs.org/](https://nodejs.org/).

2. (Optional) If you prefer **yarn**, install it globally:  
   ```bash
   npm install -g yarn
   ```

### Steps to Run

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/ecommerce-chatbot.git
   cd ecommerce-chatbot
   ```

2. **Install Dependencies**
   Install all required packages using either npm or yarn:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables**
   Create a `.env.local` file in the root directory and add your **Google Gemini API** key:
   ```bash
   GEMINI_API=your-google-gemini-api-key
   ```

4. **Run the Development Server**
   Start the development server to view the project in your browser:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in Browser**
   Once the server is running, open your browser and navigate to:
   ```
   http://localhost:3000
   ```
