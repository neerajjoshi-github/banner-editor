import Carousel from "@/components/image-carousel/MainCarousel";

const LandingPage = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(141.09deg, #143151 1.02%, #331E33 63.56%, #302447 108.15%)",
      }}
      className="min-h-screen w-full overflow-hidden"
    >
      <div className="w-full flex items-center justify-center py-10 h-[80vh]">
        <h1 className="text-8xl font-bold">Heading</h1>
      </div>
      <Carousel />
      <div className="h-screen w-full"></div>
    </div>
  );
};

export default LandingPage;
