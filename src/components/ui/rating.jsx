import React from "react";
import { FaStar } from "react-icons/fa6";

import { cn } from "@/lib/utils";

const ratingVariants = {
  default: {
    star: "text-foreground",
    emptyStar: "text-muted-foreground",
  },
  destructive: {
    star: "text-red-500",
    emptyStar: "text-red-200",
  },
  yellow: {
    star: "text-yellow-300",
    emptyStar: "text-white",
  },
};

const Ratings = ({ ...props }) => {
  const {
    rating,
    totalstars = 5,
    size = 20,
    fill = true,
    Icon = <FaStar />,
    variant = "default",
  } = props;

  const partialStar =
    rating % 1 > 0 ? (
      <PartialStar
        fillPercentage={rating % 1}
        size={size}
        className={cn(ratingVariants[variant].star)}
        Icon={Icon}
      />
    ) : null;

  const fullStars = Math.max(Math.floor(rating), 0);
  const emptyStarsCount = Math.max(
    totalstars - fullStars - (partialStar ? 1 : 0),
    0
  );

  return (
    <div className={cn("flex items-center gap-2")} {...props}>
      {[...Array(fullStars)].map((_, i) =>
        React.cloneElement(Icon, {
          key: i,
          size,
          className: cn(
            fill ? "fill-current" : "fill-transparent",
            ratingVariants[variant].star
          ),
        })
      )}
      {partialStar}
      {[...Array(emptyStarsCount)].map((_, i) =>
        React.cloneElement(Icon, {
          key: i + fullStars + 1,
          size,
          className: cn(ratingVariants[variant].emptyStar),
        })
      )}
    </div>
  );
};

const PartialStar = ({ ...props }) => {
  const { fillPercentage, size, className, Icon } = props;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {React.cloneElement(Icon, {
        size,
        className: cn("fill-transparent", className),
      })}
      <div
        style={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
          width: `${fillPercentage * 100}%`,
        }}
      >
        {React.cloneElement(Icon, {
          size,
          className: cn("fill-current", className),
        })}
      </div>
    </div>
  );
};

export { Ratings };
