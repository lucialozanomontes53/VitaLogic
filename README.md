# 🥗 Vitalogic - Smart Nutrition Assistant

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-yellow?style=for-the-badge&logo=pinia&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

**Vitalogic** is a modern nutrition management application designed to bridge the gap between Figma designs and a high-performance web experience. It helps users manage their kitchen inventory, track macros, and maintain a healthy lifestyle through a clean, card-based interface.

## ✨ Features

- 👤 **Persistent Authentication:** Custom login system integrated with Pinia and `localStorage`. Your session stays active even after a refresh.
- 👨‍👩‍👧‍👦 **Family Profile Selector:** Seamlessly switch between family members to personalize meal tracking.
- 🥘 **Recipe History Grid:** A beautifully organized 2x2 grid displaying recent meals with quick-glance macro indicators (Proteins, Carbs, and Greens).
- 📱 **Atomic Design:** Built with a component-driven architecture, ensuring styles are scoped and maintainable.
- 🎨 **Tailwind 4 Engine:** Utilizing the latest CSS-first configuration for lightning-fast styling and a unified design system.


## 🛠️ Tech Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using the new `@theme` and `@reference` engine)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Routing:** [Vue Router](https://router.vuejs.org/) (with Navigation Guards for auth protection)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)



## 📂 Project Structure

The project follows a "Clean Component" pattern where each component manages its own logic and dedicated CSS file:

```text
src/
 ├── assets/          # Global styles & Tailwind 4 theme definitions
 ├── components/      # Atomic UI components
 │    └── [Name]/
 │         ├── [Name].vue    # Template & Logic
 │         └── [Name].css    # Scoped Tailwind 4 Styles
 ├── stores/          # Pinia stores (User, Fridge, Recipes)
 ├── views/           # Page-level components (Home, Login)
 └── router/          # Routing config & Security Guards
```



## 🎨 Design System

The UI follows a specific color palette extracted from professional Figma prototypes:
| Color | Hex | Role |
| :--- | :--- | :--- |
| **Vital Blue** | `#1A3A5A` | Headers & Primary Text |
| **Vital Teal** | `#1A7A8A` | Main Cards & Accents |
| **Vital Dark** | `#0F2944` | Buttons & Macro Badges |
| **Vital Gray** | `#D9D9D9` | Section Backgrounds |

## 🚀 Getting Started
### Prerequisites:
- Node.js (Latest LTS recommended)
- npm or yarn
### Installation:
- Clone the repository: git clone [https://github.com/your-username/vitalogic.git](https://github.com/your-username/vitalogic.git)
- Install dependencies: npm install
- Start the development server: npm run dev
## 📝 License
Distributed under the MIT License. See LICENSE for more information.

#### Developed with ❤️ by Lucia
