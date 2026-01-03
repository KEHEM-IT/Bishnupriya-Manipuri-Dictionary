# Installation Steps for Updated Dictionary

## 🔄 Update Frontend

### Step 1: Install Vue Router

Open terminal in **frontend** folder:

```bash
npm install vue-router@4
```

### Step 2: Create New Folders and Files

Create these new folders and files in **frontend/src/**:

```bash
# Create folders
mkdir src/router
mkdir src/views

# Create new files (you'll copy content into these):
# src/router/index.ts
# src/composables/useTheme.ts  
# src/composables/useVoiceSearch.ts
# src/components/ThemeToggle.vue
# src/components/SearchBox.vue
# src/components/WordCardMini.vue
# src/components/Footer.vue
# src/views/Home.vue
# src/views/SearchResults.vue
# src/views/WordDetail.vue
```

### Step 3: Replace/Update Files

Replace or update these existing files:
- `src/App.vue` - Replace with new version
- `src/main.ts` - Replace with new version
- `src/types/index.ts` - Replace with new version
- `package.json` - Replace with new version (includes vue-router)
- `tailwind.config.js` - Replace with new version (includes dark mode)

### Step 4: Delete Old Components (No Longer Needed)

Delete these old files:
- `src/components/SearchBar.vue` (replaced by SearchBox.vue)
- `src/components/WordCard.vue` (replaced by WordCardMini.vue)
- `src/components/WordDetail.vue` (now a view)
- `src/components/LanguageToggle.vue` (integrated into SearchBox)

### Step 5: Restart Frontend

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## ✅ Final File Structure

```
frontend/
├── src/
│   ├── router/
│   │   └── index.ts              [NEW]
│   ├── views/
│   │   ├── Home.vue              [NEW]
│   │   ├── SearchResults.vue     [NEW]
│   │   └── WordDetail.vue        [NEW]
│   ├── components/
│   │   ├── ThemeToggle.vue       [NEW]
│   │   ├── SearchBox.vue         [NEW]
│   │   ├── WordCardMini.vue      [NEW]
│   │   └── Footer.vue            [NEW]
│   ├── composables/
│   │   ├── useDictionary.ts      [KEEP]
│   │   ├── useTheme.ts           [NEW]
│   │   └── useVoiceSearch.ts     [NEW]
│   ├── types/
│   │   └── index.ts              [UPDATED]
│   ├── App.vue                   [UPDATED]
│   ├── main.ts                   [UPDATED]
│   └── style.css                 [KEEP]
├── package.json                  [UPDATED]
├── tailwind.config.js            [UPDATED]
└── ... (other config files)
```

## 🎨 New Features

### Dark/Light Theme
- Click sun/moon icon in header
- Auto-saves preference

### Voice Search
- Click microphone icon
- Speak your search query
- Works with Web Speech API

### Individual Word Pages
- Click any word card
- Opens dedicated page with full details
- Direct URL: `/word/{id}`

### Search Results Page
- Dedicated search results view
- Shows number of results
- Filter by language

### Footer
- "Developed by KEHEM IT" badge
- Links and copyright

## 🚀 Testing

After installation, test these features:

1. **Homepage** - http://localhost:5173/
   - See featured words
   - Search box with language toggle
   - Dark/light theme toggle

2. **Search** - Type and press Enter
   - Should navigate to `/search?q=...&lang=...`
   - Shows filtered results

3. **Voice Search** - Click microphone
   - Should show "Listening..."
   - Speak a word and it searches

4. **Word Details** - Click any word card
   - Opens `/word/{id}` page
   - Shows all information
   - Audio pronunciation buttons

5. **Theme Toggle** - Click sun/moon
   - Switches between dark/light
   - Persists across page reloads

## 📝 Notes

- Backend remains unchanged
- All data comes from existing API
- Mobile responsive design
- Uses browser localStorage for theme
- Uses Web Speech API for voice (Chrome/Edge only)