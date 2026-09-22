import { vi } from 'vitest';

vi.mock('dotenv', () => ({
    default: { config: vi.fn() },
    config: vi.fn(),
}));
