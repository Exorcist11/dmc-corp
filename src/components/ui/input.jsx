import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, icon, ...props }, ref) => {
  return (
    <div
      className={cn(
        " flex items-center gap-2 border h-10 rounded-md border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-ring focus-within:ring-offset-2 w-full",
        className
      )}
    >
      <React.Fragment>{icon}</React.Fragment>
      <input
        type={type}
        className={cn(
          "w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
