import { useCallback, useState } from "react";

export const useCopyClipboard = (text: string, timeout: number = 2000) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = useCallback(() => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), timeout);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        } else {
            console.warn('Clipboard API not supported');
        }
    }, [text, timeout]);

    return { copied, copyToClipboard };
}