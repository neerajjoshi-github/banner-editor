"use client";

import { BannerType } from "@/app/page";
import Banner from "./Banner";
import { useBannerStore } from "@/lib/store/bannerStore";
import { useEffect } from "react";
import BannerSkeleton from "./BannerSkeleton";

type BannerListProps = {
  bannersData: BannerType[];
};

const BannerList: React.FC<BannerListProps> = ({ bannersData }) => {
  const { banners, setBanners } = useBannerStore((state) => state);

  useEffect(() => {
    setBanners(bannersData);
  }, [bannersData, setBanners]);

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 w-full max-w-[1280px] items-center justify-center gap-4 md:gap-6 lg:gap-10">
      {banners.length === 0
        ? Array.from({ length: 6 }).map((_, i) => {
            return <BannerSkeleton key={i} />;
          })
        : banners.map((banner) => {
            return <Banner banner={banner} key={banner.id} />;
          })}
    </div>
  );
};

export default BannerList;
