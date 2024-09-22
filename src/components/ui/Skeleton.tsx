import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300", className)}
      {...props}
    />
  )
}

export { Skeleton }
