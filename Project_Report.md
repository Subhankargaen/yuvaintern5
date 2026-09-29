# Final Project: Mini Web Application Dashboard

## 1. Project Overview & Design Decisions
For the final week's task, I developed a mini web application in the form of an Admin Dashboard. The objective was to integrate responsive design, interactive JavaScript features, accessibility standards, and frontend performance optimizations into a single cohesive project. 

I designed the interface with a modern, dark-mode aesthetic utilizing CSS Grid for the macro-layout (sidebar and main content) and Flexbox for micro-layouts (headers, navigation items, stats cards). This ensures the application is highly responsive and structurally robust. On mobile devices, the sidebar gracefully disappears to maximize the screen real estate for the critical data table, ensuring a mobile-first user experience.

## 2. Interactive Features
The dashboard consumes static data dynamically. Using the standard JavaScript `fetch()` API, it asynchronously pulls data from `data.json` upon initialization.
- **Dynamic Stats:** The summary cards at the top of the dashboard automatically calculate the "Total Users" and "Active Users" based on the JSON array.
- **Search Filtering:** A search input field allows users to filter the table rows in real-time by either the user's Name or their Role.
- **Table Sorting:** Users can click on the table headers (which are correctly marked up as native HTML `<button>` elements) to sort the data in ascending or descending order across any column.

## 3. Accessibility Enhancements (a11y)
The application adheres strictly to ARIA and WCAG guidelines:
- **Semantic Structure:** The DOM relies on correct semantic landmarks (`<aside>`, `<nav>`, `<main>`, `<section>`).
- **Skip Link:** A `.skip-link` is provided at the very top of the DOM to allow keyboard users to easily bypass the sidebar navigation.
- **Screen Reader Support:** Form inputs include `.sr-only` labels. Table headers contain properly styled `<button>` elements so screen readers explicitly announce them as interactive sorting controls.
- **Focus Indicators:** A high-contrast `:focus-visible` outline is globally applied, ensuring keyboard navigation is visually clear and unambiguous for all users.

## 4. Performance Optimizations
To ensure optimal load times and rendering:
- The JavaScript file is loaded with the `defer` attribute, removing render-blocking operations during the initial HTML parsing phase.
- Google Fonts and external avatars are loaded with `<link rel="preconnect">` tags to significantly speed up DNS and TLS handshakes.
- The hero avatar explicitly defines `width`, `height`, `loading="eager"`, and `fetchpriority="high"`, preventing any Cumulative Layout Shift (CLS) while ensuring it renders instantly for a smooth FCP.

## 5. Testing Outcomes
The application was systematically tested across modern browsers (Chrome, Edge, Firefox). The layout remained consistent, and the responsive breakpoints triggered correctly at `768px` to collapse the sidebar. Keyboard navigation was tested manually; all interactive elements (sidebar links, search input, sort buttons) are reachable and visually indicated. The `fetch` API correctly retrieves and displays the local `data.json` file without CORS or syntax errors.
