# Andrew Cave Insurance - ShadCN UI Implementation Outline

## Project Structure Analysis

- **Main Pages**: Home (`/`), Blog (`/blog`), Individual Blog Posts (`/blog/[slug]`)
- **Current Components**: Navbar, Hero, BenefitsGrid, ServicesSection, AboutSection, Testimonials, ContactForm, Footer
- **Content**: 3 blog posts in markdown format with associated images
- **Assets**: Professional headshot, service images, blog post images

## ShadCN UI Component Mapping

### 1. Navigation & Layout Components

#### **Navbar** (`src/components/Navbar.tsx`)

- **navigation-menu**: Primary navigation with dropdown support
- **button**: CTA buttons (Get Quote, Contact)
- **sheet**: Mobile menu drawer
- **separator**: Visual dividers between nav sections

#### **Footer** (`src/components/Footer.tsx`)

- **separator**: Section dividers
- **button**: Social media links and contact buttons
- **navigation-menu**: Footer navigation links

### 2. Hero Section Components

#### **Hero** (`src/components/Hero.tsx`)

- **button**: Primary CTA buttons (Get Quote, Learn More)
- **badge**: Trust indicators or certifications
- **card**: Feature highlights or quick stats
- **avatar**: Professional headshot display

### 3. Content Display Components

#### **BenefitsGrid** (`src/components/BenefitsGrid.tsx`)

- **card**: Individual benefit cards with icons
- **badge**: Feature labels or tags
- **separator**: Visual separation between benefits
- **hover-card**: Additional details on hover

#### **ServicesSection** (`src/components/ServicesSection.tsx`)

- **card**: Service offering cards
- **button**: Service detail buttons
- **tabs**: Service category organization
- **accordion**: Expandable service details
- **badge**: Service type indicators

#### **AboutSection** (`src/components/AboutSection.tsx`)

- **card**: Professional background card
- **avatar**: Professional photo
- **badge**: Credentials and certifications
- **separator**: Content section dividers
- **button**: Contact or credentials buttons

#### **Testimonials** (`src/components/Testimonials.tsx`)

- **card**: Individual testimonial cards
- **avatar**: Client photos
- **carousel**: Testimonial slider
- **badge**: Rating or verification indicators
- **separator**: Between testimonials

### 4. Form Components

#### **ContactForm** (`src/components/ContactForm.tsx`)

- **form**: Main form wrapper with validation
- **input**: Text input fields (name, email, phone)
- **textarea**: Message field
- **select**: Dropdown for service type selection
- **checkbox**: Agreement checkboxes
- **radio-group**: Insurance type selection
- **button**: Submit button
- **label**: Form field labels
- **alert**: Success/error messages
- **calendar**: Date picker for appointments
- **dialog**: Form submission confirmation

### 5. Blog Components

#### **Blog List Page** (`src/app/blog/page.tsx`)

- **card**: Blog post preview cards
- **badge**: Category tags
- **button**: Read more buttons
- **separator**: Between blog posts
- **pagination**: Blog post navigation
- **input**: Search functionality
- **breadcrumb**: Navigation breadcrumbs

#### **Blog Post Components** (`src/components/blog/`)

- **card**: Related posts
- **badge**: Tags and categories
- **separator**: Content sections
- **button**: Social share buttons
- **breadcrumb**: Post navigation
- **table**: Data tables in posts (if needed)
- **alert**: Important notices in posts

### 6. Interactive & Utility Components

#### **Global UI Elements**

- **skeleton**: Loading states
- **scroll-area**: Smooth scrolling sections
- **tooltip**: Help text and additional info
- **popover**: Quick info displays
- **progress**: Form completion or loading
- **sonner**: Toast notifications
- **aspect-ratio**: Image containers
- **resizable**: Adjustable content areas

### 7. Potential ShadCN Blocks Usage

#### **Calendar Blocks** (for appointment booking)

- **calendar-01**: Simple date picker for contact form
- **calendar-12**: Advanced appointment scheduling

#### **Dashboard Blocks** (for client portal - future)

- **dashboard-01**: Client dashboard layout

#### **Sidebar Blocks** (for mobile navigation)

- **sidebar-01**: Mobile navigation drawer
- **sidebar-07**: Collapsible navigation

## Implementation Priority

### Phase 1: Core Navigation & Layout

1. **navigation-menu** - Primary navigation
2. **sheet** - Mobile menu
3. **button** - All CTA buttons
4. **card** - Content containers

### Phase 2: Content Components

1. **form** - Contact form enhancement
2. **input**, **textarea**, **select** - Form fields
3. **carousel** - Testimonials slider
4. **tabs** - Service organization

### Phase 3: Enhanced UX

1. **calendar** - Appointment booking
2. **dialog** - Confirmations
3. **alert** - Notifications
4. **skeleton** - Loading states

### Phase 4: Blog Enhancement

1. **pagination** - Blog navigation
2. **breadcrumb** - Navigation aids
3. **badge** - Content categorization
4. **table** - Structured data display

## Component Dependencies

### Required ShadCN Components Installation

```bash
# Core components
npx shadcn-ui@latest add button card input textarea select form label

# Navigation
npx shadcn-ui@latest add navigation-menu sheet separator

# Content display
npx shadcn-ui@latest add badge avatar carousel tabs accordion hover-card

# Interactive
npx shadcn-ui@latest add dialog alert calendar popover tooltip

# Utility
npx shadcn-ui@latest add skeleton scroll-area progress aspect-ratio

# Blog specific
npx shadcn-ui@latest add pagination breadcrumb table
```

## File Structure After Implementation

```
src/
├── components/
│   ├── ui/                    # ShadCN UI components
│   ├── Navbar.tsx            # Enhanced with navigation-menu
│   ├── Hero.tsx              # Enhanced with cards & buttons
│   ├── BenefitsGrid.tsx      # Enhanced with cards & badges
│   ├── ServicesSection.tsx   # Enhanced with tabs & accordion
│   ├── AboutSection.tsx      # Enhanced with cards & avatar
│   ├── Testimonials.tsx      # Enhanced with carousel
│   ├── ContactForm.tsx       # Enhanced with form components
│   ├── Footer.tsx            # Enhanced with navigation-menu
│   └── blog/
│       ├── BlogCard.tsx      # New: card + badge + button
│       ├── BlogPagination.tsx # New: pagination component
│       └── BlogBreadcrumb.tsx # New: breadcrumb navigation
├── app/
│   ├── page.tsx              # Main landing page
│   ├── blog/
│   │   ├── page.tsx          # Blog listing with enhanced cards
│   │   └── [slug]/
│   │       └── page.tsx      # Individual blog posts
│   └── layout.tsx            # Root layout
└── lib/
    ├── utils.ts              # ShadCN utilities
    └── posts.ts              # Blog post utilities
```

## Notes

- All components should maintain current functionality while enhancing with ShadCN UI
- Focus on accessibility and responsive design
- Maintain brand colors and styling consistency
- Consider using ShadCN blocks for complex layouts where appropriate
- Implement progressive enhancement - start with basic components, add advanced features
