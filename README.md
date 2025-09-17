# Andrew Cave Insurance

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_DEPLOY_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE_NAME/overview)

A modern, accessible, and responsive insurance website for Andrew Cave, a licensed insurance agent based in Barbados. Built with Next.js, TypeScript, and Tailwind CSS, this website showcases insurance services, provides valuable resources, and facilitates client consultations.

## 🚀 Features

- **Modern & Responsive Design**: Looks great on all devices
- **Performance Optimized**: Built with Next.js for fast page loads
- **Accessibility First**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Interactive Components**: Engaging UI with smooth animations
- **Blog Section**: Share insurance insights and updates
- **Contact Form**: Easy way for potential clients to get in touch

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom theming
- **UI Components**: ShadCN/UI with Radix UI primitives
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **Content Management**: Markdown-based blog system
- **Deployment**: Netlify

## 📁 Project Structure

```text
andrew-cave-insurance/
├── src/
│   ├── app/                  # App router pages
│   ├── components/           # Reusable UI components
│   ├── lib/                  # Utility functions and configs
│   └── styles/               # Global styles and theme
├── content/                  # Blog posts and content
├── public/                   # Static assets
└── docs/                     # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chris00walker/andrew-cave-insurance.git
   cd andrew-cave-insurance
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🌐 Deployment

This project is configured for deployment on Netlify. The deployment is handled automatically through the connected GitHub repository.

### Manual Deployment

1. [Deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/chris00walker/andrew-cave-insurance)
2. Connect your GitHub repository
3. Configure build settings (auto-detected from `netlify.toml`)
4. Deploy!

## 🎨 Customization

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SITE_URL=https://your-site-url.com
# Add other environment variables as needed
```

### Styling

- Theme colors are defined in `tailwind.config.js`
- Custom fonts are loaded in `src/app/layout.tsx`
- Global styles are in `src/app/globals.css`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI Components from [ShadCN/UI](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
