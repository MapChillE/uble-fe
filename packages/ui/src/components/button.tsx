import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@workspace/ui/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "font-semibold bg-action-green text-white border-action-green hover:bg-hover-green shadow-lg",
        filter_select:
          "font-semibold bg-action-green text-white border-action-green hover:bg-hover-green shadow-lg",
        filter_unselect:
          "font-semibold bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
        disabled: "font-semibold bg-gray-200 text-gray-400",

        onb_unselected:
          "rounded-lg bg-gray-100 text-gray-600 hover:bg-action-green/10 hover:text-action-green",
        onb_selected: "rounded-lg bg-action-green/10 text-action-green",
        onb_enabled: "font-semibold rounded-lg bg-action-green hover:bg-hover-green text-white",
        onb_disabled: "font-semibold rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed",

        unselected:
          "rounded-lg bg-gray-100 text-gray-600 hover:bg-action-green/10 hover:text-action-green",
        period_selected:
          "font-semibold bg-action-green text-white border-action-green hover:bg-action-green/90 shadow-lg",
        kakao: "bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-xl",
        black: "bg-black hover:bg-gray-800 text-white",
        outline: "border border-gray-300 bg-white shadow-xs hover:bg-gray-50 hover:text-gray-900",

        modal_cancel:
          "bg-transparent border border-gray-300 bg-white shadow-xs hover:bg-gray-50 hover:text-gray-900",
        modal_submit: "bg-action-green hover:bg-[#3bc085] text-white disabled:bg-gray-300",

        circle_outline:
          "rounded-full border border-gray-300 bg-white shadow-lg hover:bg-gray-50 hover:text-gray-900",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        none: "",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-9 rounded-md px-3 gap-1.5 has-[>svg]:px-2.5",
        lg: "h-11 rounded-md px-8 has-[>svg]:px-4",
        icon: "size-9 h-10 w-10 p-0",
        full: "px-4 py-2 w-full h-12",
        select: "py-3 px-4",
        feedback: "flex-1",
        mypage: "py-2 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
