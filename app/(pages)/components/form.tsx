"use client";

import { FormPostType, FormPostSchema } from "@/app/z-schemas/schemas";
import { useState, useCallback, useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

type FormPostProps = {
  onBack: () => void;
};

const FormPost = ({ onBack }: FormPostProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    control,
  } = useForm<FormPostType>({
    resolver: zodResolver(FormPostSchema),
    mode: "onChange",
  });

  // * IMAGES =================
  const images = useWatch({
    control,
    name: "images",
  });

  const previewImagePath =
    useWatch({
      control,
      name: "images",
    })?.map((img) => img.path) ?? [];

  const hasDuplicate = images
    ? new Set(images.map((i) => i.name)).size !== images.length
    : false;

  //   console.log(images);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className="
      w-full
      max-w-lg
      max-h-[90vh]
      overflow-y-auto
      bg-white
      p-6
    "
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">Tambah Transaksi</h2>

          <button
            onClick={onBack}
            type="button"
            className="text-zinc-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <form className="flex flex-col gap-6">
          {/* Tanggal */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Tanggal
            </label>

            <input
              {...register("date")}
              type="date"
              className="
            w-full
            border-b
            border-zinc-300
            pb-2
            text-black
            outline-none
          "
            />
          </div>

          {/* Upload */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Lampiran
            </label>

            <div className="mb-3 flex max-h-60 flex-wrap gap-3 overflow-y-auto">
              {previewImagePath.length > 0 &&
                previewImagePath.map((src, idx) => (
                  <div
                    key={idx}
                    className="
                  relative
                  h-24
                  w-24
                  overflow-hidden
                  border
                  border-zinc-200
                "
                  >
                    <Image
                      src={src}
                      alt={`Preview ${idx}`}
                      fill
                      className="object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const updated =
                          images?.filter((_, index) => index !== idx) ?? [];

                        setValue("images", updated);
                      }}
                      className="
                    absolute
                    top-1
                    right-1
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    bg-white
                    text-xs
                    text-red-500
                  "
                    >
                      ✕
                    </button>
                  </div>
                ))}
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              className="
            text-sm
            text-zinc-600
            file:border
            file:border-zinc-200
            file:bg-transparent
            file:px-3
            file:py-2
            file:text-sm
          "
              onChange={(e) => {
                const files = e.target.files;
                if (!files) return;

                Array.from(files).forEach((file) => {
                  const reader = new FileReader();

                  reader.onloadend = () => {
                    const base64 = reader.result as string;

                    const currentImages = getValues("images") || [];

                    setValue(
                      "images",
                      [
                        ...currentImages,
                        {
                          name: file.name,
                          path: base64,
                        },
                      ],
                      {
                        shouldValidate: true,
                      },
                    );
                  };

                  reader.readAsDataURL(file);
                });

                e.target.value = "";
              }}
            />
          </div>

          {/* Keterangan */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Keterangan
            </label>

            <textarea
              {...register("description")}
              rows={4}
              className="
            w-full
            resize-none
            border-b
            border-zinc-300
            pb-2
            text-black
            outline-none
          "
            />
          </div>

          {/* Nominal */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Nominal
            </label>

            <input
              {...register("nominal")}
              type="number"
              placeholder="0"
              className="
            w-full
            border-b
            border-zinc-300
            pb-2
            text-black
            outline-none
          "
            />
          </div>

          {/* Action */}
          <div className="flex justify-end gap-6 border-t border-zinc-200 pt-6">
            <button type="submit" className="font-medium text-black">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPost;
