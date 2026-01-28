# Fano Speech API Documentation - Mintlify Migration Guide

<<<<<<< Updated upstream
This folder contains all the documentation files ready to be imported into Mintlify, including an **interactive API reference** powered by OpenAPI/Swagger.
=======
This folder contains all the documentation files ready to be imported into Mintlify, including:
- **Interactive REST API playground** powered by OpenAPI/Swagger
- **WebSocket API documentation** powered by AsyncAPI 3.0

## 🔐 WebSocket Authentication

The AsyncAPI spec now includes proper `securitySchemes` configuration:

```yaml
servers:
  production:
    host: app.fano.ai
    pathname: /api/v1/speech-to-text/streaming-transcript
    protocol: wss
    security:
      - $ref: '#/components/securitySchemes/apiKey'

components:
  securitySchemes:
    apiKey:
      type: httpApiKey
      name: Fano-license-key
      in: header
      description: Your Fano API license key for authentication
```

This follows the AsyncAPI 3.0 standard for HTTP API key authentication in headers.

## 🔧 Configuration

The WebSocket playground uses **AsyncAPI 3.0** specification. Configuration in `mint.json`:

```json
{
  "group": "Streaming STT",
  "asyncapi": "/api-reference/asyncapi-streaming-transcription.yaml"
}
```

## 🐛 Troubleshooting WebSocket Playground

If the "Connect" button doesn't work or authentication field is missing:

### 1. Validate AsyncAPI Spec
Go to https://studio.asyncapi.com/ and paste the content of `asyncapi-streaming-transcription.yaml` to validate.

### 2. Check AsyncAPI Version
Must be `asyncapi: 3.0.0` (not 2.x)

### 3. Alternative: MDX Frontmatter Approach
If auto-generate doesn't work, use `mint.pages.json` instead:

```bash
# Rename mint.pages.json to mint.json
mv mint.json mint.asyncapi.json
mv mint.pages.json mint.json
```

### 4. Run Mintlify CLI Locally
```bash
npx mintlify dev
```
Check console for AsyncAPI parsing errors.
>>>>>>> Stashed changes

## ⚠️ Browser WebSocket Limitation

**Note**: Browser WebSocket API cannot send custom headers during the handshake. This is a browser limitation, not Mintlify's.

For actual testing with authentication, use:
- **wscat** (CLI): `wscat -c "wss://..." -H "Fano-license-key: YOUR_KEY"`
- **Postman** (GUI): WebSocket request with custom headers
- **Python/Node.js**: Code examples in the documentation

## 📁 File Structure

```
fano-mintlify-docs/
<<<<<<< Updated upstream
├── mint.json                                    # Main configuration file
=======
├── mint.json                                    # Main configuration
├── mint.pages.json                              # Alternative config
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
│   │   ├── submit-transcription.mdx            # POST endpoint (interactive)
│   │   └── get-transcription-status.mdx        # GET endpoint (interactive)
│   └── streaming-stt/
│       ├── overview.mdx                        # Streaming overview & examples
│       ├── configure-stream.mdx                # Configure WebSocket session
│       ├── send-audio-chunk.mdx                # Send audio data
│       ├── receive-results.mdx                 # Receive transcription results
│       └── send-eof.mdx                        # End the session
=======
│   │   ├── submit-transcription.mdx            # POST endpoint
│   │   └── get-transcription-status.mdx        # GET endpoint
│   └── streaming-stt/
│       └── streaming-transcription.mdx         # WebSocket API
>>>>>>> Stashed changes
└── release-notes/
    └── changelog.mdx                           # Release notes
```

## 🚀 Deployment

1. Push files to your GitHub repo connected to Mintlify
2. Mintlify will auto-deploy on push
3. Verify at your Mintlify URL

## 📚 Resources

- [Mintlify AsyncAPI Setup](https://www.mintlify.com/docs/api-playground/asyncapi/setup)
- [AsyncAPI 3.0 Spec](https://www.asyncapi.com/docs/reference/specification/v3.0.0)
- [AsyncAPI Studio](https://studio.asyncapi.com/) - Validate your spec
