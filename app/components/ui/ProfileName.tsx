import { ProfileNameProps } from "@/app/types/profilename";
import Image from "next/image";

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .filter((_, index, arr) => index === 0 || index === arr.length - 1)
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ProfileName({ name, src }: ProfileNameProps) {
    return (
        <div className="relative flex size-22 shrink-0 items-center justify-center overflow-hidden rounded-full border-[0.8px] border-[#28C5F4] bg-[#EFFBFF]">
            {src ? (
                <Image
                    src={src}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 88px, 88px"
                    className="object-cover"
                />
            ) : (
                <span className="text-[28px] font-semibold text-[#28C5F4] select-none">
                    {getInitials(name)}
                </span>
            )}
        </div>
    );
}
