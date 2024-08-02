"use clinet";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBannerStore } from "@/lib/store/bannerStore";
import { useDialogStore } from "@/lib/store/dialogStore";
import Banner from "./Banner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import html2canvas from "html2canvas";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const imagesURLs = [
  "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGZhc2hpb258ZW58MHx8MHx8fDI%3D",
  "https://images.unsplash.com/photo-1606391901318-07003db08d63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGZhc2hpb258ZW58MHx8MHx8fDI%3D",
  "https://images.unsplash.com/photo-1606740284070-acd787d82634?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fG5hdWdodHl8ZW58MHx8MHx8fDI%3D",
  "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fGV4ZXJjaXNlfGVufDB8fDB8fHwy",
  "https://images.unsplash.com/photo-1721895826561-f79f60c89121?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIyfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1594136976553-38699ae9047c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBhaW50aW5nfGVufDB8fDB8fHww",
];

const EditBanner = () => {
  const editDialog = useDialogStore((state) => state);
  const {
    selectedBanner,
    updateCTA,
    updateDescription,
    updateTitle,
    updateImage,
    updateBanner,
  } = useBannerStore((state) => state);
  const [downloading, setDownloading] = useState(false);

  const onImageClick = (url: string) => {
    updateImage(url);
  };

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const src = e.target?.result as string;
        updateImage(src);
      };
      reader.readAsDataURL(file);
    }
  };

  // For issues with downloading caused by some browser extensions
  function fnIgnoreElements(el: any) {
    if (typeof el.shadowRoot == "object" && el.shadowRoot !== null) return true;
    else return false;
  }

  const handleDownload = async () => {
    setDownloading(true);
    const element = document.getElementById("print") as HTMLElement;
    const canvas = await html2canvas(element, {
      scale: 4,
      allowTaint: true,
      ignoreElements: fnIgnoreElements,
    });
    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    link.href = data;
    link.download = `${selectedBanner?.title.content}.jpg`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloading(false);
  };

  const onSave = () => {
    if (!selectedBanner) return;
    updateBanner(selectedBanner);
    editDialog.toggle();
  };

  if (!selectedBanner) {
    return null;
  }
  return (
    <Dialog open={editDialog.isOpen} onOpenChange={editDialog.toggle}>
      <DialogContent className="w-[96%] bg-muted">
        <DialogHeader>
          <DialogTitle>Customize Your Ad Banner</DialogTitle>
          <DialogDescription>
            Tailor your ad banner to perfection by editing text and images. Make
            it stand out and capture your audience`s attention with just a few
            clicks.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex items-center flex-col lg:flex-row">
          <div className="max-lg:max-w-[360px] max-lg:w-full flex-1">
            <Banner id="print" banner={selectedBanner} isEditable />
          </div>
          <div className="w-full lg:w-1/2 py-4 lg:p-4 flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-3">
              <Label className="text-foreground/80 text-base">Title</Label>
              <Input
                value={selectedBanner.title.content}
                onChange={(e) => {
                  updateTitle(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label className="text-foreground/80 text-base">
                Description
              </Label>
              <Textarea
                value={selectedBanner.description.content}
                onChange={(e) => {
                  updateDescription(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label className="text-foreground/80 text-base">
                Button Text
              </Label>
              <Input
                value={selectedBanner.cta.content}
                onChange={(e) => {
                  updateCTA(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label className="text-foreground/80 text-base">Image</Label>
              <div className="grid grid-cols-7 items-center gap-4">
                <label
                  htmlFor="image"
                  className="h-full aspect-square rounded-full bg-foreground/70 flex items-center justify-center cursor-pointer"
                >
                  <Upload className="w-[60%] h-[60%] text-background" />
                  <input
                    onChange={onImageUpload}
                    type="file"
                    id="image"
                    accept="image/*"
                    className="sr-only"
                  />
                </label>

                {imagesURLs.map((url, i) => {
                  return (
                    <div
                      onClick={() => onImageClick(url)}
                      key={i}
                      className="cursor-pointer h-full aspect-square overflow-hidden rounded-full"
                    >
                      <Image
                        src={url}
                        width={100}
                        height={100}
                        alt="placeholder"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button onClick={onSave}>Save</Button>
              <Button
                onClick={handleDownload}
                variant="ghost"
                className="underline text-primary/90 hover:text-primary hover:bg-transparent text-base"
              >
                {downloading ? (
                  <LoaderCircle className="animate-spin text-primary w-8 h-8" />
                ) : (
                  "Download"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditBanner;
