/**
 * Production-ready logger utility with toggle switch
 * 
 * Control logging via:
 * 1. Environment variable: NEXT_PUBLIC_ENABLE_LOGGING=true/false
 * 2. Runtime: logger.setEnabled(true/false)
 * 3. Browser console: window.enableLogging = true/false
 */

class Logger {
    private enabled: boolean;

    constructor() {
        // Check environment variable first
        const envEnabled = process.env.NEXT_PUBLIC_ENABLE_LOGGING === 'true';
        // Default to true in development, false in production
        const defaultEnabled = process.env.NODE_ENV !== 'production';

        this.enabled = envEnabled || defaultEnabled;

        // Allow runtime toggle via browser console
        if (typeof window !== 'undefined') {
            (window as any).enableLogging = (enable: boolean) => {
                this.enabled = enable;
                console.log(`[Logger] Logging ${enable ? 'enabled' : 'disabled'}`);
            };
            (window as any).isLoggingEnabled = () => this.enabled;
        }
    }

    /**
     * Enable or disable logging at runtime
     */
    setEnabled(enabled: boolean) {
        this.enabled = enabled;
        console.log(`[Logger] Logging ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Check if logging is enabled
     */
    isEnabled(): boolean {
        return this.enabled;
    }

    /**
     * Debug logs - only shown when logging is enabled
     */
    debug(...args: any[]) {
        if (this.enabled) {
            console.log(...args);
        }
    }

    /**
     * Info logs - shown when logging is enabled
     */
    info(...args: any[]) {
        if (this.enabled) {
            console.info(...args);
        }
    }

    /**
     * Warning logs - always shown
     */
    warn(...args: any[]) {
        console.warn(...args);
    }

    /**
     * Error logs - always shown
     * In production, these should be sent to error tracking service
     */
    error(...args: any[]) {
        console.error(...args);
        // TODO: Send to Sentry or other error tracking service in production
    }
}

export const logger = new Logger();

// Export for convenience
export const enableLogging = (enabled: boolean) => logger.setEnabled(enabled);
export const isLoggingEnabled = () => logger.isEnabled();
