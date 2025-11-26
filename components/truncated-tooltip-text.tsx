import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export default function TruncatedText({ text }: {text: string}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [text]);

  const content = (
    <div
      ref={ref}
      className="line-clamp-2 cursor-default"
    >
      {text}
    </div>
  );

  // If not truncated → return text normally
  if (!isTruncated) return content;

  // If truncated → wrap in tooltip
  return (
    <Tooltip delayDuration={600}>
      <TooltipTrigger asChild>
        {content}
      </TooltipTrigger>
      <TooltipContent className="max-w-[300px]">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}
