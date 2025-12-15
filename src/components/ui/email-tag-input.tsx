'use client';

import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailTagInputProps {
    emails: string[];
    onChange: (emails: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

const isValidEmail = (email: string): boolean => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export function EmailTagInput({
    emails,
    onChange,
    placeholder = 'Enter email addresses...',
    disabled = false,
    className
}: EmailTagInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const addEmail = (email: string) => {
        const trimmedEmail = email.trim();
        if (!trimmedEmail) return;

        // Auto-lowercase @dexmail.app addresses
        const normalizedEmail = trimmedEmail.toLowerCase().endsWith('@dexmail.app')
            ? trimmedEmail.toLowerCase()
            : trimmedEmail;

        // Prevent duplicates
        if (emails.includes(normalizedEmail)) {
            setInputValue('');
            return;
        }

        onChange([...emails, normalizedEmail]);
        setInputValue('');
    };

    const removeEmail = (indexToRemove: number) => {
        onChange(emails.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // Create tag on Enter, comma, or space
        if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
            e.preventDefault();
            addEmail(inputValue);
        }
        // Remove last tag on Backspace when input is empty
        else if (e.key === 'Backspace' && !inputValue && emails.length > 0) {
            removeEmail(emails.length - 1);
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
        // Add email on blur if there's text
        if (inputValue.trim()) {
            addEmail(inputValue);
        }
    };

    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div
            className={cn(
                'flex min-h-[40px] w-full flex-wrap gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-text',
                isFocused && 'ring-2 ring-ring ring-offset-2',
                disabled && 'cursor-not-allowed opacity-50',
                className
            )}
            onClick={handleContainerClick}
        >
            {emails.map((email, index) => {
                const isValid = isValidEmail(email);
                return (
                    <Badge
                        key={index}
                        variant={isValid ? 'default' : 'destructive'}
                        className="gap-1 pr-1 pl-2 py-1"
                    >
                        <span className="text-xs">{email}</span>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeEmail(index);
                            }}
                            disabled={disabled}
                            className="ml-1 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {email}</span>
                        </button>
                    </Badge>
                );
            })}
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                disabled={disabled}
                placeholder={emails.length === 0 ? placeholder : ''}
                className="flex-1 min-w-[120px] bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
            />
        </div>
    );
}
