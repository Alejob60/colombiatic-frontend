// src/components/ui/integration/index.ts
export { default as PromptInput } from './PromptInput';
export { default as LoadingSpinner } from './LoadingSpinner';
export { default as ResultDisplay } from './ResultDisplay';
export { default as ImageResultDisplay } from './ImageResultDisplay';
export { default as HistoryPanel } from './HistoryPanel';
export { default as CreditsDisplay } from './CreditsDisplay';
export { default as UserProfile } from './UserProfile';
export { default as GalleryGrid } from './GalleryGrid';
export { default as NotificationToast } from './NotificationToast';
export { default as NotificationContainer } from './NotificationContainer';

// Re-exportar tipos
export type { HistoryItem } from './HistoryPanel';
export type { GalleryItem } from './GalleryGrid';