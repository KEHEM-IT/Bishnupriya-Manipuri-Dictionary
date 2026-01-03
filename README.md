# 📚 Dictionary Application

A modern, feature-rich dictionary web application built with Vue 3, TypeScript, and Tailwind CSS. Search words, listen to pronunciations, and explore definitions in a beautiful dark/light theme interface.

## ✨ Features

- 🔍 **Smart Search** - Search words with instant results
- 🎤 **Voice Search** - Speak your search query using Web Speech API
- 🌓 **Dark/Light Theme** - Toggle between themes with auto-save preference
- 🔊 **Audio Pronunciation** - Listen to word pronunciations
- 📱 **Responsive Design** - Works seamlessly on mobile and desktop
- 🌐 **Multi-language Support** - Filter by language (English/Bangla)
- 🎯 **Individual Word Pages** - Dedicated pages with full word details
- ⚡ **Fast & Modern** - Built with Vite and Vue 3 Composition API

## 🛠️ Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vue Router 4** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next-generation build tool
- **Web Speech API** - Voice recognition

### Backend
- API integration ready
- RESTful architecture

## 📋 Prerequisites

Before installation, ensure you have:
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- Modern web browser (Chrome/Edge recommended for voice features)

## 🚀 Installation

### Step 1: Install Dependencies

Navigate to the **frontend** folder and install required packages:

```bash
cd frontend
npm install
```

### Step 2: Install Vue Router

```bash
npm install vue-router@4
```

### Step 3: Create Project Structure

Create the necessary folders:

```bash
# Create folders
mkdir -p src/router
mkdir -p src/views
mkdir -p src/composables
```

### Step 4: Project Files Setup

#### New Files to Create

Create these files in **frontend/src/**:

**Router:**
- `src/router/index.ts`

**Views:**
- `src/views/Home.vue`
- `src/views/SearchResults.vue`
- `src/views/WordDetail.vue`

**Components:**
- `src/components/ThemeToggle.vue`
- `src/components/SearchBox.vue`
- `src/components/WordCardMini.vue`
- `src/components/Footer.vue`

**Composables:**
- `src/composables/useTheme.ts`
- `src/composables/useVoiceSearch.ts`
- `src/composables/useDictionary.ts` (keep existing)

#### Files to Update

Replace/update these existing files:
- `src/App.vue`
- `src/main.ts`
- `src/types/index.ts`
- `package.json`
- `tailwind.config.js`

#### Files to Delete

Remove these old components (no longer needed):
- `src/components/SearchBar.vue` → replaced by `SearchBox.vue`
- `src/components/WordCard.vue` → replaced by `WordCardMini.vue`
- `src/components/WordDetail.vue` → now a view
- `src/components/LanguageToggle.vue` → integrated into `SearchBox.vue`

### Step 5: Run Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:5173/**

## 📁 Project Structure

```
frontend/
├── src/
│   ├── router/
│   │   └── index.ts              # Vue Router configuration
│   ├── views/
│   │   ├── Home.vue              # Homepage with featured words
│   │   ├── SearchResults.vue     # Search results page
│   │   └── WordDetail.vue        # Individual word detail page
│   ├── components/
│   │   ├── ThemeToggle.vue       # Dark/light theme switcher
│   │   ├── SearchBox.vue         # Search input with voice
│   │   ├── WordCardMini.vue      # Word card component
│   │   └── Footer.vue            # Application footer
│   ├── composables/
│   │   ├── useDictionary.ts      # Dictionary API logic
│   │   ├── useTheme.ts           # Theme management
│   │   └── useVoiceSearch.ts     # Voice recognition logic
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── App.vue                   # Root component
│   ├── main.ts                   # Application entry point
│   └── style.css                 # Global styles
├── public/                       # Static assets
├── package.json                  # Project dependencies
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite configuration
└── README.md                     # This file
```

## 🎯 Usage Guide

### Homepage
Visit **http://localhost:5173/** to see:
- Featured/random words
- Search box with language filter
- Theme toggle button

### Searching Words

**Text Search:**
1. Type a word in the search box
2. Select language (English/Bangla)
3. Press Enter or click search button
4. Navigate to `/search?q=word&lang=english`

**Voice Search:**
1. Click the microphone icon 🎤
2. Wait for "Listening..." indicator
3. Speak your search query clearly
4. Results appear automatically

### Viewing Word Details

1. Click any word card from search results or homepage
2. Opens dedicated page at `/word/{id}`
3. View complete information:
   - Word and translation
   - Part of speech
   - Definitions and examples
   - Synonyms and antonyms
   - Audio pronunciation

### Theme Switching

1. Click the sun ☀️ / moon 🌙 icon in the header
2. Theme switches between light and dark
3. Preference saved automatically in browser
4. Persists across page reloads

## 🔧 Configuration

### Tailwind Dark Mode

The `tailwind.config.js` includes dark mode support:

```javascript
module.exports = {
  darkMode: 'class',
  // ... other config
}
```

### API Configuration

Update API endpoints in `src/composables/useDictionary.ts`:

```typescript
const API_BASE_URL = 'http://localhost:3000/api'
```

## 🧪 Testing Checklist

After installation, verify these features work:

- [ ] **Homepage loads** with featured words
- [ ] **Search functionality** returns correct results
- [ ] **Voice search** recognizes speech (Chrome/Edge)
- [ ] **Word cards** navigate to detail pages
- [ ] **Theme toggle** switches and persists
- [ ] **Audio buttons** play pronunciations
- [ ] **Language filter** filters results correctly
- [ ] **Responsive design** works on mobile
- [ ] **Footer** displays correctly

## 🌐 Browser Support

| Feature | Chrome | Edge | Firefox | Safari |
|---------|--------|------|---------|--------|
| Core App | ✅ | ✅ | ✅ | ✅ |
| Voice Search | ✅ | ✅ | ❌ | ❌ |
| Dark Mode | ✅ | ✅ | ✅ | ✅ |
| Audio | ✅ | ✅ | ✅ | ✅ |

*Note: Voice search requires Web Speech API support (Chrome/Edge only)*

## 🐛 Troubleshooting

### Voice Search Not Working
- Ensure you're using Chrome or Edge browser
- Check microphone permissions in browser settings
- Test microphone in browser settings

### Theme Not Persisting
- Check if localStorage is enabled
- Clear browser cache and try again

### Router Navigation Issues
- Verify Vue Router is installed: `npm list vue-router`
- Check console for routing errors

### Build Errors
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📦 Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

Output will be in the `dist/` folder, ready for deployment.

## 🚀 Deployment

The built application can be deployed to:
- **Vercel** - `vercel deploy`
- **Netlify** - Drag & drop `dist/` folder
- **GitHub Pages** - Configure in repository settings
- **Any static hosting** - Upload `dist/` folder

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is developed and maintained by **KEHEM IT**.

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact KEHEM IT support

## 🎉 Acknowledgments

- Vue.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Web Speech API for voice recognition capabilities

---

**Developed with ❤️ by KEHEM IT**