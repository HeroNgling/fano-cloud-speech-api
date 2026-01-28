export const WebSocketPlayground = () => {
  const [apiKey, setApiKey] = useState('')
  const [status, setStatus] = useState('disconnected')
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState('config')
  const [customMessage, setCustomMessage] = useState('')
  const wsRef = useRef(null)

  const WS_URL = 'wss://app.fano.ai/api/v1/speech-to-text/streaming-transcript'

  const messageTemplates = {
    config: JSON.stringify({
      config: {
        languageCode: "yue-x-auto",
        sampleRateHertz: 16000,
        encoding: "LINEAR16",
        enableAutomaticPunctuation: true,
        interimResults: true
      }
    }, null, 2),
    audio: JSON.stringify({
      audioContent: "BASE64_ENCODED_AUDIO_DATA"
    }, null, 2),
    eof: JSON.stringify({
      eof: true
    }, null, 2)
  }

  useEffect(() => {
    setCustomMessage(messageTemplates[selectedMessage])
  }, [selectedMessage])

  const addMessage = (type, content) => {
    const timestamp = new Date().toLocaleTimeString()
    setMessages(prev => [...prev, { type, content, timestamp }].slice(-20))
  }

  const connect = () => {
    if (!apiKey.trim()) {
      addMessage('error', 'Please enter your Fano-license-key')
      return
    }

    try {
      setStatus('connecting')
      addMessage('info', `Connecting to ${WS_URL}...`)
      
      wsRef.current = new WebSocket(WS_URL)
      
      wsRef.current.onopen = () => {
        setStatus('connected')
        addMessage('success', 'Connected! Note: Browser cannot send auth headers. Use wscat/Postman for real testing.')
      }

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          addMessage('received', JSON.stringify(data, null, 2))
        } catch {
          addMessage('received', event.data)
        }
      }

      wsRef.current.onerror = (error) => {
        addMessage('error', 'Connection error - Browser WebSocket cannot send auth headers.')
        setStatus('error')
      }

      wsRef.current.onclose = (event) => {
        setStatus('disconnected')
        addMessage('info', `Disconnected (code: ${event.code})`)
      }
    } catch (err) {
      addMessage('error', err.message)
      setStatus('error')
    }
  }

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    setStatus('disconnected')
  }

  const sendMessage = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(customMessage)
        addMessage('sent', customMessage)
      } catch (err) {
        addMessage('error', err.message)
      }
    } else {
      addMessage('error', 'Not connected')
    }
  }

  const copyWscat = () => {
    const cmd = `wscat -c "${WS_URL}" -H "Fano-license-key: ${apiKey || 'YOUR_API_KEY'}"`
    navigator.clipboard.writeText(cmd)
    addMessage('info', 'wscat command copied to clipboard!')
  }

  const statusColors = {
    disconnected: '#6b7280',
    connecting: '#f59e0b',
    connected: '#10b981',
    error: '#ef4444'
  }

  return (
    <div style={{ 
      border: '1px solid #e5e7eb', 
      borderRadius: '8px', 
      padding: '16px',
      marginBottom: '24px',
      backgroundColor: '#f9fafb'
    }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
          🔌 WebSocket Playground
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#374151' }}>
            Fano-license-key *
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '13px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={status === 'connected' ? disconnect : connect}
            style={{
              padding: '8px 16px',
              backgroundColor: status === 'connected' ? '#ef4444' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500'
            }}
          >
            {status === 'connected' ? 'Disconnect' : 'Connect'}
          </button>
          
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px',
            fontSize: '12px',
            color: statusColors[status]
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: statusColors[status]
            }}></span>
            {status}
          </span>

          <button
            onClick={copyWscat}
            style={{
              padding: '6px 12px',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            📋 Copy wscat command
          </button>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#374151' }}>
            Message Type
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['config', 'audio', 'eof'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedMessage(type)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: selectedMessage === type ? '#3b82f6' : '#e5e7eb',
                  color: selectedMessage === type ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                {type === 'config' ? '1️⃣ Config' : type === 'audio' ? '2️⃣ Audio' : '3️⃣ EOF'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#374151' }}>
            Message (JSON)
          </label>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            style={{
              width: '100%',
              height: '120px',
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '12px',
              fontFamily: 'monospace',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={sendMessage}
          disabled={status !== 'connected'}
          style={{
            padding: '8px 16px',
            backgroundColor: status === 'connected' ? '#3b82f6' : '#9ca3af',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: status === 'connected' ? 'pointer' : 'not-allowed',
            fontSize: '13px',
            fontWeight: '500'
          }}
        >
          Send Message
        </button>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#374151' }}>
          Messages
        </label>
        <div style={{
          height: '200px',
          overflowY: 'auto',
          backgroundColor: '#1f2937',
          borderRadius: '6px',
          padding: '12px',
          fontFamily: 'monospace',
          fontSize: '11px'
        }}>
          {messages.length === 0 ? (
            <div style={{ color: '#6b7280' }}>No messages yet...</div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <span style={{ color: '#6b7280' }}>[{msg.timestamp}]</span>{' '}
                <span style={{ 
                  color: msg.type === 'sent' ? '#60a5fa' : 
                         msg.type === 'received' ? '#34d399' : 
                         msg.type === 'error' ? '#f87171' : 
                         msg.type === 'success' ? '#34d399' : '#9ca3af'
                }}>
                  {msg.type === 'sent' ? '→ SENT' : 
                   msg.type === 'received' ? '← RECV' : 
                   msg.type.toUpperCase()}:
                </span>
                <pre style={{ 
                  margin: '4px 0 0 0', 
                  color: '#e5e7eb',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all'
                }}>
                  {msg.content}
                </pre>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ 
        marginTop: '12px', 
        padding: '8px 12px', 
        backgroundColor: '#fef3c7', 
        borderRadius: '6px',
        fontSize: '11px',
        color: '#92400e'
      }}>
        ⚠️ <strong>Browser Limitation:</strong> Browser WebSocket API cannot send custom headers. 
        Use the <strong>wscat command</strong> (click copy button) or <strong>Postman</strong> for actual testing.
      </div>
    </div>
  )
}
