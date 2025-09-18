# AGENTS.md - Development Guidelines & Configuration

## 🎯 **Project Overview**

**Andrew Cave Insurance** - Professional insurance brokerage website with integrated questionnaire system

- **Industry**: Insurance & Financial Services (Barbados)
- **Architecture**: Static-first Next.js with dynamic form capabilities
- **Deployment**: Netlify (frontend) + Supabase (backend)

---

## 🛠️ **Technology Stack**

### **Core Framework**

- **Next.js 15.4.5** - React framework with App Router
- **React 18.3.1** - UI library with hooks and context
- **TypeScript 5.7.3** - Strict typing with modern ES features
- **Node.js 20** - Runtime environment (specified in netlify.toml)

### **UI & Styling**

- **ShadCN UI** - Component library (New York style variant)
- **Radix UI** - Headless component primitives
- **Tailwind CSS 3.4.17** - Utility-first styling with custom theme
- **Lucide React** - Icon library
- **CSS Variables** - Dynamic theming support

### **Form Management**

- **React Hook Form 7.55.0** - Form state management
- **Zod 3.24.1** - Schema validation and type inference
- **Hookform Resolvers** - Integration layer

### **Backend & Database**

- **Supabase** - PostgreSQL database with real-time capabilities
- **Database Tables**: `clients`, `client_questionnaires`, `appointments`, `communication_log`

### **Development Tools**

- **ESLint** - Code linting with Next.js and TypeScript rules
- **Autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS processing pipeline

---

## 📁 **Project Structure**

```
andrew-cave-insurance/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Homepage
│   │   ├── questionnaire/     # Multi-step form
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # ShadCN UI components
│   │   ├── questionnaire/     # 6-page form system
│   │   └── [feature-components] # Business components
│   ├── lib/
│   │   ├── supabase.ts        # Database client & services
│   │   └── utils.ts           # Utility functions
│   └── hooks/                 # Custom React hooks
├── public/                    # Static assets
├── content/                   # Content management
├── docs/                      # Documentation
└── out/                       # Static export output
```

---

## 🎨 **Coding Standards**

### **TypeScript Configuration**

- **Target**: ES2017 with modern features
- **Strict Mode**: Enabled for type safety
- **Path Mapping**: `@/*` → `./src/*`
- **JSX**: Preserve (handled by Next.js)
- **Module Resolution**: Bundler strategy

### **ESLint Rules**

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@next/next/no-html-link-for-pages": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### **Code Style Guidelines**

- **Components**: PascalCase with descriptive names
- **Files**: kebab-case for utilities, PascalCase for components
- **Imports**: Absolute imports using `@/` prefix
- **Props**: Interface definitions with proper typing
- **State Management**: React Hook Form for forms, React Context for global state

### **ShadCN UI Standards**

- **Style Variant**: "new-york" (clean, minimal design)
- **Base Color**: Neutral with custom brand colors
- **CSS Variables**: Enabled for dynamic theming
- **Icon Library**: Lucide React for consistency

---

## 🎨 **Design System**

### **Brand Colors**

```css
--brand-default: #1B365D    /* Primary navy */
--brand-light: #2C3E50      /* Lighter navy */
--brand-dark: #0F1B2E       /* Darker navy */
--caribbean-teal: #17A2B8   /* Accent teal */
--caribbean-coral: #FF6B6B  /* Accent coral */
--wealth-gold: #C9A961      /* Premium gold */
--wealth-green: #28A745     /* Success green */
```

### **Typography Scale**

- **Professional**: Clean, readable fonts
- **Hierarchy**: Proper H1→H6 progression
- **Accessibility**: WCAG AA compliant contrast ratios

---

## 🚀 **Deployment Configuration**

### **Netlify Deployment**

- **Build Command**: `npm run build`
- **Publish Directory**: `out/` (static export)
- **Node Version**: 20
- **Framework Detection**: Next.js with static export

### **Static Export Settings**

```javascript
// next.config.js
{
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  distDir: 'out'
}
```

### **Environment Variables**

```bash
# Required for production
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
NEXT_PUBLIC_BASE_PATH=[optional-base-path]
```

### **Caching Strategy**

- **Static Assets**: 1 year cache with immutable flag
- **HTML Files**: 1 hour cache with revalidation
- **Images**: Optimized caching for performance

---

## 🔒 **Security & Compliance**

### **Data Protection**

- **Environment Variables**: Sensitive data in `.env.local`
- **Database Security**: Row Level Security (RLS) on Supabase
- **Client Data**: GDPR/PIPEDA compliant data handling
- **Form Validation**: Server-side validation with Zod schemas

### **Git Security**

```gitignore
# Sensitive files excluded
.env*
*.key
*.pem
*.p12
node_modules/
.next/
out/
```

---

## 📋 **Development Workflow**

### **Getting Started**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

### **Branch Strategy** (Inferred)

- **main**: Production-ready code
- **develop**: Integration branch
- **feature/***: Feature development
- **hotfix/***: Critical fixes

### **Code Quality Gates**

1. **TypeScript Compilation**: Must pass without errors
2. **ESLint**: Warnings allowed, errors must be fixed
3. **Build Success**: Static export must complete
4. **Form Validation**: All Zod schemas must be valid

---

## 🧪 **Testing Strategy**

### **Manual Testing Checklist**

- [ ] Form validation on all 6 questionnaire pages
- [ ] Database integration (Supabase connectivity)
- [ ] Mobile responsiveness (all breakpoints)
- [ ] Accessibility compliance (WCAG AA)
- [ ] Performance metrics (Core Web Vitals)

### **Browser Support**

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Accessibility**: Screen reader compatible

---

## 📊 **Performance Standards**

### **Core Web Vitals Targets**

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### **Bundle Size Limits**

- **Initial Bundle**: < 250KB gzipped
- **Route Chunks**: < 100KB gzipped
- **Images**: WebP format, optimized sizing

---

## 🔧 **Maintenance Guidelines**

### **Dependency Updates**

- **Major Updates**: Quarterly review cycle
- **Security Patches**: Apply within 48 hours
- **Next.js**: Follow LTS release schedule
- **ShadCN UI**: Update components as needed

### **Database Maintenance**

- **Backup Strategy**: Supabase automated backups
- **Schema Changes**: Use migrations for all changes
- **Performance**: Monitor query performance monthly

---

## 📞 **Support & Documentation**

### **Key Contacts**

- **Technical Lead**: Repository maintainer
- **Business Owner**: Andrew Cave Insurance
- **Database Admin**: Supabase project admin

### **Documentation**

- **API Documentation**: Supabase auto-generated docs
- **Component Library**: ShadCN UI documentation
- **Deployment Guide**: Netlify deployment docs

### **Troubleshooting**

- **Build Issues**: Check Next.js configuration
- **Database Issues**: Verify Supabase connection
- **Form Issues**: Validate Zod schemas
- **Styling Issues**: Check Tailwind configuration

---

## 🎯 **Success Metrics**

### **Technical KPIs**

- **Build Success Rate**: > 95%
- **Page Load Speed**: < 3s average
- **Form Completion Rate**: > 80%
- **Error Rate**: < 1% of sessions

### **Business KPIs**

- **Lead Generation**: Track questionnaire submissions
- **User Experience**: Monitor completion rates
- **Conversion**: Measure quote-to-client conversion

---

*Last Updated: December 2024*
*Version: 1.0*
