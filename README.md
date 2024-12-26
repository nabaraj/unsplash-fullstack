# Multi-Page Website with React.js, TypeScript, Tailwind CSS, and Next.js

This project is a multi-page website that allows users to interact with Unsplash images and collections, featuring seamless user experience and robust functionality.

[Webpage](unsplash-fullstack-a6rv.vercel.app/)

## Features

### **Homepage**

- **Image Search**: Search for images from Unsplash using keywords.
- **Search Results**: Displays a list of images upon pressing `Enter`, provided at least one keyword is entered.
- **Image Selection**: Navigate to a dedicated Image page by selecting an image.

### **Image Page**

- **Detailed Information**: View the image's author, published date, and associated collections.
- **Add to Collection**:
  - Add an image to a collection using the `Add to Collection` button.
  - Search for collections and add images, filtering out collections the image is already part of.
- **Remove from Collection**: Remove an image from its collections.
- **Download Image**: Download the selected image directly.

### **Collections Page**

- **Browse Collections**: View and select from existing collections.
- **Collection Details**: Display all images within a selected collection.

---

## Technical Implementation

- **Frameworks and Libraries**: Built with React.js, TypeScript, Tailwind CSS, and Next.js.
- **API Integration**:
  - Utilized Next.js API routes for backend calls.
  - Ensured secure handling of API authentication logic.
- **Styling**: Used Tailwind CSS utility classes extensively to reduce reliance on custom CSS.
- **Code Quality**: Followed DRY principles, maintaining clean, readable, and maintainable code.

---

## Getting Started

Follow these steps to set up and run the project:

### **Install Dependencies**

```bash
npm install
```

### **Run Development Server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to access the application.

### **Build for Production**

```bash
npm run build
```

### **Run Production Build**

```bash
npm run start
```

---

## Deployment

Deploy the solution to a platform like Vercel. Provide the repository URL and the live demo URL after deployment.

To learn more about deploying Next.js applications:

- [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying)

---

## Recommended Setup

Use [VSCode](https://code.visualstudio.com/) with the [Volar Extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar) for the best development experience. Ensure Vetur is disabled.

---

## Learn More About Next.js

- [Next.js Documentation](https://nextjs.org/docs) - Explore Next.js features and APIs.
- [Learn Next.js](https://nextjs.org/learn) - Hands-on Next.js tutorial.
