# PortfolioFlow: A Creative Personal Portfolio

Welcome to PortfolioFlow, a dynamic and modern personal portfolio website template built with the latest web technologies. This project is designed to showcase your work, skills, and professional journey in a visually appealing and interactive way.

![PortfolioFlow Screenshot](https://res.cloudinary.com/dcfurdz3u/image/upload/v1758438503/background-images-01_cu3dfs.jpg)

## ✨ Features

-   **Fully Responsive Design**: Looks great on all devices, from mobile phones to desktop computers.
-   **Multiple Themed Pages**: Includes pre-built pages for Home, Projects, Skills, Journey, Hobbies, Collaborators, and a creative Studio.
-   **Dark/Light Mode**: Easily switch between themes with a dedicated toggle.
-   **Smooth Page Transitions**: Elegant animations between pages powered by Framer Motion.
-   **Interactive UI Elements**:
    -   **Thunder Cursor**: An animated lightning effect that follows the mouse cursor.
    -   **Background Music Player**: A persistent music player with random tracks and user-state memory.
    -   **Animated Hero Sections**: Engaging and dynamic hero sections with background effects.
-   **Dynamic Content**: Easily manage your portfolio content through simple data files.
-   **Project Filtering**: A client-side search functionality on the Projects page.
-   **Modern Tech Stack**: Built with Next.js App Router, TypeScript, and ShadCN UI for a high-quality, maintainable codebase.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 📂 Project Structure

The project follows a standard Next.js App Router structure. Key directories are organized to separate concerns, making the codebase clean and easy to navigate.

```mermaid
graph TD
    A(PortfolioFlow) --> B(src);
    B --> C(app);
    C --> D["layout.tsx"];
    C --> E["page.tsx"];
    C --> F["[page]/page.tsx"];
    B --> G(components);
    G --> H(shared);
    G --> I(ui);
    G --> J([feature]);
    B --> K(lib);
    K --> L["placeholder-data.ts"];
    K --> M["utils.ts"];
    B --> N(hooks);
    A --> O(public);
    A --> P["tailwind.config.ts"];

    subgraph Pages & Routes
        D & E & F
    end

    subgraph Reusable Components
        H & I & J
    end

    subgraph Logic & Data
        K & N
    end

    style C fill:#282C34,stroke:#61DAFB,stroke-width:2px,color:#fff
    style G fill:#282C34,stroke:#61DAFB,stroke-width:2px,color:#fff
    style K fill:#282C34,stroke:#61DAFB,stroke-width:2px,color:#fff
```

-   `src/app/`: Contains all the routes and pages of the application.
-   `src/components/`: Houses all the React components, organized by feature (`/home`, `/projects`, etc.) and shared components (`/shared`, `/ui`).
-   `src/lib/`: Includes utility functions, placeholder data, and type definitions.
-   `src/hooks/`: Contains custom React hooks used across the application.
-   `public/`: For static assets like images and fonts.

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    https://github.com/developersami04/sami-creative-portfolio.git
    cd sami-creative-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) in your browser to see the result.

## ✏️ Customization

To customize the portfolio with your own information, edit the files in the `src/lib/` directory:

-   `src/lib/placeholder-data.ts`: Update this file with your personal information, projects, skills, and more.
-   `src/lib/placeholder-images.json`: Change the image URLs to your own hosted images.
-   `src/lib/music-data.ts`: Customize the background music playlist.

---

This project was generated and modified within **Firebase Studio**.
