"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  id: string;
  title: string;
  description?: string;
  price: string;
  image: string;
  condition?: string;
  location?: string;
  postedTime?: string;
  className?: string;
}

export default function ListingCard({
  id,
  title,
  description,
  price,
  image,
  condition,
  location,
  postedTime,
  className,
}: ListingCardProps) {
  return (
    <Link href={`/product/${id}`} className={cn("block group", className)}>
      <Card className="overflow-hidden card-glow transition-all border-surface-variant/80 flex flex-col h-full">
        <div className="relative aspect-[4/3] bg-surface-container-high overflow-hidden">
          <Image
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {condition ? (
            <div className="absolute top-2 left-2 bg-secondary-container text-on-secondary-container px-2 py-1 rounded text-label-sm font-bold uppercase">
              {condition}
            </div>
          ) : null}
        </div>
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          <h3 className="text-body-md sm:text-body-lg font-bold text-on-surface mb-1 line-clamp-1">
            {title}
          </h3>
          {description ? (
            <p className="text-body-sm text-on-surface-variant mb-2 line-clamp-1">
              {description}
            </p>
          ) : null}
          {(location || postedTime) && (
            <p className="text-body-sm text-on-surface-variant mb-2 flex items-center gap-1 line-clamp-1">
              {location ? (
                <>
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {location}
                </>
              ) : null}
              {location && postedTime ? <span>·</span> : null}
              {postedTime}
            </p>
          )}
          <div className="mt-auto flex justify-between items-center gap-2">
            <span className="text-price-display">{price}</span>
            <span className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors inline-flex">
              <Heart className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}