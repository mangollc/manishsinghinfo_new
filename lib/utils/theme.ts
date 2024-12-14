import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTagVariant(tag: string) {
  const tagLower = tag.toLowerCase();
  if (tagLower.includes('immigration')) return 'immigration';
  if (tagLower.includes('tax')) return 'tax';
  if (tagLower.includes('tech')) return 'tech';
  if (tagLower.includes('ai')) return 'ai';
  if (tagLower.includes('business')) return 'business';
  if (tagLower.includes('guide')) return 'guide';
  if (tagLower.includes('featured')) return 'featured';
  if (tagLower.includes('new')) return 'new';
  return 'default';
}

export function getCategoryColor(category?: string) {
  if (!category) return 'text-primary';
  const catLower = category.toLowerCase();
  if (catLower.includes('immigration')) return 'text-[hsl(var(--immigration))]';
  if (catLower.includes('tax')) return 'text-[hsl(var(--tax))]';
  if (catLower.includes('tech')) return 'text-[hsl(var(--tech))]';
  if (catLower.includes('ai')) return 'text-[hsl(var(--ai))]';
  if (catLower.includes('business')) return 'text-[hsl(var(--business))]';
  if (catLower.includes('career')) return 'text-[hsl(var(--career))]';
  return 'text-primary';
}