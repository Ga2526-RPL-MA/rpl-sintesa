import { cn } from '@/lib/utils';

function Logo({ className }: { className?: string }) {
    return (
        <svg
            className={cn(
                'pointer-events-none h-auto text-green-800 select-none dark:text-green-500',
                className,
            )}
            width="26"
            height="55"
            viewBox="0 0 228 453"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M218.5 304.5L12.4999 109.5L112.5 9.5L218.5 115.5V233.5L153.712 168.712M9.5 155.5L215.883 349.5L112.5 443L9.50018 340V228.5L74.9999 291.5"
                stroke="currentColor"
                strokeWidth="19"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default Logo;
