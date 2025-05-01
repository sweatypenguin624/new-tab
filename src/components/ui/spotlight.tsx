
import { cn } from "@/lib/utils"

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  fill?: string
}

export function Spotlight({ 
  className, 
  fill = "white", 
  ...props 
}: SpotlightProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-72 w-72 translate-x-0 rounded-full bg-gradient-radial from-white/20 to-transparent blur-2xl",
        className
      )}
      {...props}
    />
  );
}
