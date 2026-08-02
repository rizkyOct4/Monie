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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="transaction-image-title"
    >
      <div className="flex h-[90vh] w-full max-w-5xl flex-col bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
          <h2 className="text-lg font-semibold" id="transaction-image-title">
            Gambar Transaksi
          </h2>

          <button
            aria-label="Close Popup"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center transition hover:bg-zinc-100"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex flex-col gap-6">
            {images.length === 0 ? (
              <p className="py-10 text-center text-zinc-500">
                Tidak ada gambar.
              </p>
            ) : (
              images.map((image) => (
                <div
                  key={image.id}
                  role="dialog"
                  aria-label={`Has Images ${image.id}`}
                  className="flex justify-center border border-zinc-200 bg-zinc-50 p-3"
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
