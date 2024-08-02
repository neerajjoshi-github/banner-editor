import BannerList from "@/components/BannerList";
import { promises as fs } from "fs";

export type BannerType = {
  id: number;
  template_image: string;
  title: {
    content: string;
    style: React.CSSProperties;
  };
  cta: {
    content: string;
    style: React.CSSProperties;
  };
  image: {
    url: string;
    style: React.CSSProperties;
  };
  description: {
    content: string;
    style: React.CSSProperties;
  };
};

const loadInitialData = async () => {
  try {
    const response = await fs.readFile(
      process.cwd() + "/data/initial_data.json",
      "utf8"
    );
    const data = JSON.parse(response) as BannerType[];
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const page = async () => {
  const banners = await loadInitialData();

  return (
    <div className="w-full h-full flex flex-col items-center gap-6 sm:gap-10 md:gap-14 py-6 sm:py-10 px-4 sm:px-6 md:px-10">
      <div className="fixed left-0 right-0 top-0 -z-10 m-auto h-[410px] w-[410px] rounded-full bg-orange-500 opacity-20 blur-[100px]"></div>

      <h1 className="text-center font-sans text-3xl sm:text-4xl md:text-6xl font-black text-primary underline">
        Create Add Banner
      </h1>

      <BannerList bannersData={banners} />
    </div>
  );
};

export default page;
