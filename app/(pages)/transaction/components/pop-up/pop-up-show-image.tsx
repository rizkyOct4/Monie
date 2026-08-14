"use client";

import Image from "next/image";
import { X } from "lucide-react";

type PopUpShowImagesProps = {
  images: {
    id: string;
    imageName: string;
    imageUrl: string;
  }[];
  onClose: () => void;
};

const PopUpShowImages = ({ images, onClose }: PopUpShowImagesProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="flex h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <h2 className="text-base font-semibold tracking-tight text-white">
            Gambar Transaksi
          </h2>

          <button
            aria-label="Close Popup"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex flex-col gap-6">
            {images.length === 0 ? (
              <p className="py-10 text-center text-sm text-zinc-500">
                Tidak ada gambar.
              </p>
            ) : (
              images.map((image) => (
                <div
                  key={image.id}
                  role="dialog"
                  aria-label={`Has Images ${image.id}`}
                  className="flex justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-3 transition hover:border-zinc-700"
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.imageName}
                    width={1200}
                    height={800}
                    className="h-auto w-full object-contain"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpShowImages;
