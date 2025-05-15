# GoGetWell.ai Theme System Implementation Assignment#2

## Project Overview

You'll be implementing a comprehensive multi-theme system for our platform that adapts the entire interface based on different medical specialties. This goes beyond simple color changes - each theme should provide a distinct and cohesive user experience tailored to different medical contexts.

The primary objective of this assignment is to evaluate your ability to perform complex frontend tasks.

## Requirements

### Features to Implement

1. **Menu Bar Navigation**
   - Create a navigation menu bar with two options:
     - Home (already implemented)
     - Themes (to be created)

2. **Themes Page**
   - Create a new "Themes" page at `src/views/Home/themes/`
   - This page should display all available themes
   - Allow users to preview and select different themes

3. **Multiple Theme Implementation**
   - Implement 3 themes in total:
     - Default theme (already exists)
     - 2 new themes focusing on different medical specialties (e.g., Organ Transplant, Cosmetic Surgery)

4. **Theme Configuration**
   - Use Zustand for state management
   - Configure Zustand to persist theme selection in localStorage
   - Apply the selected theme globally throughout the application

5. **Theme Components**
   - Each theme should include:
     - Color scheme variations
     - Typography changes
     - UI element styling (buttons, cards, forms)
     - Custom hero sections
     - Custom menu bar styling
    
**Important Notes:**
   
Each theme must implement comprehensive changes across:
- **Layout Structure:** Different component arrangements and spacing for each theme
- **Marketing Copy:** Theme-specific text content and messaging tailored to each specialty
- **Color Schemes:** Complete color palettes appropriate for each medical context
- **Typography:** Font families, sizes, weights, and line heights that reflect each specialty
- **UI Elements:** Custom-styled buttons, cards, forms, inputs, and interactive elements
- **Component Variations:** Specialty-specific designs for hero sections, testimonials, and CTAs

6. **Theme Color Configuration**
   - Implement Tailwind configuration for theme colors
   - Allow dynamic color switching between themes

## Technical Setup

### Prerequisites

- Docker
- Node.js (v14+)
- npm (v6+)

### Project Setup

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up Docker with Caddy for subdomain handling
   - Create a `Caddyfile` in the project root with the following content:
   ```
   {
     acme_ca https://acme-v02.api.letsencrypt.org/directory
   }

   # Wildcard subdomain handling
   *.localhost {
     # Add headers to identify the subdomain
     header {
       +X-Subdomain {labels.1}
     }
     reverse_proxy host.docker.internal:5173
   }

   # Handle base domain
   localhost {
     reverse_proxy host.docker.internal:5173
   }
   ```



5. Start the Docker Caddy server:
   ```bash
   docker-compose up -d
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Access the application via subdomains:
   - https://demo.localhost
   - https://demo5.localhost
   - https://seostore.localhost

