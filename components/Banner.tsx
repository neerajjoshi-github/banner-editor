"use client";

import Image from "next/image";
import { BannerType } from "@/app/page";
import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import { useDialogStore } from "@/lib/store/dialogStore";
import { useBannerStore } from "@/lib/store/bannerStore";

type BannerProps = {
  banner: BannerType;
  isEditable?: boolean;
  id?: string;
};

const Banner: React.FC<BannerProps> = ({ banner, isEditable = false, id }) => {
  const editDialog = useDialogStore((state) => state);
  const { setSelectedBanner } = useBannerStore((state) => state);
  const onEditClickHandler = () => {
    setSelectedBanner(banner);
    editDialog.toggle();
  };

  return (
    <div
      id={id}
      className="select-none [container-type:size] overflow-hidden relative w-full text-[1em] aspect-square flex items-center"
    >
      {!isEditable && (
        <Button
          size="icon"
          variant="secondary"
          className="z-10 absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 p-[2px]"
          onClick={onEditClickHandler}
        >
          <Edit className="w-full h-full text-primary" />
        </Button>
      )}
      <Image
        width={1080}
        height={1080}
        src={banner.template_image}
        alt=""
        className="object-cover w-full h-full"
      />
      <div className="overflow-hidden" style={banner.image.style}>
        <Image
          width={1080}
          height={1080}
          src={banner.image.url}
          alt=""
          className="min-w-full min-h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <h1 style={banner.title.style}>{banner.title.content}</h1>

      <p style={banner.description.style}>{banner.description.content}</p>
      <p style={banner.cta.style}>{banner.cta.content}</p>
    </div>
  );
};

export default Banner;
