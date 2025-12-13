# Logger Usage Guide

## Quick Start

The logger is automatically enabled in development and disabled in production.

## Toggle Logging

### Method 1: Environment Variable (Recommended for Production)
Add to your `.env` file:
```env
NEXT_PUBLIC_ENABLE_LOGGING=true   # Enable logging
NEXT_PUBLIC_ENABLE_LOGGING=false  # Disable logging
```

### Method 2: Browser Console (Runtime Toggle)
Open browser console and type:
```javascript
// Enable logging
window.enableLogging(true)

// Disable logging
window.enableLogging(false)

// Check if logging is enabled
window.isLoggingEnabled()
```

### Method 3: Programmatic Toggle
```typescript
import { logger, enableLogging } from '@/lib/logger';

// Enable logging
enableLogging(true);

// Disable logging
enableLogging(false);

// Check status
logger.isEnabled();
```

## Usage in Code

```typescript
import { logger } from '@/lib/logger';

// Debug logs (controlled by toggle)
logger.debug('[Component] Debug info');

// Info logs (controlled by toggle)
logger.info('[Component] Info message');

// Warnings (always shown)
logger.warn('[Component] Warning message');

// Errors (always shown)
logger.error('[Component] Error occurred', error);
```

## Log Levels

- **debug**: Detailed debugging info (toggle controlled)
- **info**: General information (toggle controlled)
- **warn**: Warnings (always shown)
- **error**: Errors (always shown, sent to error tracking in production)

## Best Practices

1. Use `logger.debug()` for verbose debugging
2. Use `logger.info()` for important state changes
3. Use `logger.warn()` for potential issues
4. Use `logger.error()` for actual errors
5. Warnings and errors are always logged (can't be disabled)
