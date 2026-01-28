# Fano Speech API Documentation - Mintlify Migration Guide

This folder contains all the documentation files ready to be imported into Mintlify, including an **interactive API reference** powered by OpenAPI/Swagger.

## 📁 File Structure

```
fano-mintlify-docs/
├── mint.json                                    # Main configuration file
├── docs/
│   ├── introduction.mdx                         # Overview/home page
│   ├── get-started/
│   │   ├── transcribe-pre-recorded-audio.mdx   # Async STT guide
│   │   └── transcribe-streaming-audio.mdx      # Streaming STT guide
│   ├── features/
│   │   ├── keyword-biasing.mdx                 # Keyword biasing feature
│   │   └── punctuation.mdx                     # Punctuation feature
│   └── model-and-language/
│       └── supported-languages.mdx             # Supported languages
├── api-reference/
│   ├── openapi.json                            # OpenAPI 3.0 spec (Async STT)
│   ├── openapi-streaming.yaml                  # OpenAPI 3.1 spec (Streaming STT)
│   ├── introduction.mdx                        # API reference intro
│   ├── authentication.mdx                      # Authentication guide
│   ├── async-stt/
│   │   ├── submit-transcription.mdx            # POST endpoint (interactive)
│   │   └── get-transcription-status.mdx        # GET endpoint (interactive)
│   └── streaming-stt/
│       ├── overview.mdx                        # Streaming overview & examples
│       ├── configure-stream.mdx                # Configure WebSocket session
│       ├── send-audio-chunk.mdx                # Send audio data
│       ├── receive-results.mdx                 # Receive transcription results
│       └── send-eof.mdx                        # End the session
└── release-notes/
    └── changelog.mdx                           # Release notes/changelog
```

## 🚀 Step-by-Step Import Procedure

### Step 1: Create a Mintlify Account
1. Go to [mintlify.com](https://mintlify.com)
2. Sign up or log in to your account
3. Create a new project or select an existing one

### Step 2: Set Up Your Repository
Mintlify works with GitHub repositories. You have two options:

**Option A: Create a new GitHub repository**
1. Create a new repository on GitHub (e.g., `fano-speech-api-docs`)
2. Clone the repository to your local machine
3. Copy all files from this folder into the repository

**Option B: Use Mintlify's quickstart**
1. In Mintlify dashboard, click "Create new docs"
2. Choose "Connect GitHub" and authorize
3. Mintlify will create a starter repository for you
4. Replace the generated files with the files from this folder

### Step 3: Upload the Documentation Files
Copy all the files and folders from this directory to your repository:

```bash
# If using command line
cp -r fano-mintlify-docs/* /path/to/your/mintlify-repo/
```

### Step 4: Add Logo and Favicon (Optional but Recommended)
1. Create a `logo` folder in your repository root
2. Add your logo files:
   - `logo/light.svg` - Logo for light mode
   - `logo/dark.svg` - Logo for dark mode
3. Add `favicon.svg` to the root directory

### Step 5: Connect to Mintlify
1. In your Mintlify dashboard, go to Settings
2. Connect your GitHub repository
3. Select the branch (usually `main`)
4. Mintlify will automatically detect your `mint.json` file

### Step 6: Deploy
1. Push your changes to GitHub
2. Mintlify will automatically build and deploy your documentation
3. Your docs will be live at your Mintlify URL (or custom domain)

## 🔧 Customization

### Update Colors
Edit `mint.json` to change the color scheme:
```json
"colors": {
  "primary": "#YOUR_COLOR",
  "light": "#YOUR_LIGHT_COLOR",
  "dark": "#YOUR_DARK_COLOR"
}
```

### Update Links
Edit `mint.json` to update:
- `topbarCtaButton.url` - Your dashboard URL
- `footerSocials` - Your social media links

### Add More Pages
1. Create a new `.mdx` file in the appropriate folder
2. Add frontmatter at the top:
   ```yaml
   ---
   title: 'Page Title'
   description: 'Page description'
   icon: 'icon-name'
   ---
   ```
3. Add the file path to the `navigation` array in `mint.json`

## 📝 Notes

- All files use MDX format (Markdown + JSX components)
- Mintlify components like `<Card>`, `<CodeGroup>`, `<Accordion>`, etc. are pre-built
- Code examples support syntax highlighting for multiple languages
- The navigation structure in `mint.json` controls the sidebar

## 🆘 Need Help?

- [Mintlify Documentation](https://mintlify.com/docs)
- [Mintlify Components Reference](https://mintlify.com/docs/components)
- [Mintlify GitHub](https://github.com/mintlify)

---

Generated from GitBook content at: https://fano.gitbook.io/fano-speech-api
