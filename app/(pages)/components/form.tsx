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
      <div className=" w-full max-w-lg max-h-205 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-semibold text-zinc-900">
          Tambah Transaksi
        </h2>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-600">Tanggal</label>

            <input
            {...register("date")}
              type="date"
              className="
            rounded-xl
            border
            border-zinc-200
            px-4
            py-3
            text-black
          "
            />
          </div>

          {/* // ? Upload Image */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-700 font-medium">
              Upload Image
              <span className="text-red-500 text-[11px] ml-2">
                {hasDuplicate ? "* Duplicate Image" : null}
              </span>
            </label>

            <div className="flex flex-wrap gap-3 w-full max-h-75 overflow-y-scroll">
              {previewImagePath.length > 0 &&
                previewImagePath.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative group max-sm:w-full max-sm:h-60 w-30 h-30 rounded-xl overflow-hidden border border-gray-200 bg-white shrink-0"
                  >
                    <Image
                      src={src}
                      alt={`Preview ${idx}`}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />

                    <button
                      type="button"
                      //   onClick={() => {
                      //     const updated =
                      //       images?.filter((img) => img.path !== src) ?? [];
                      //     setValue("images", updated);
                      //   }}
                      onClick={() => {
                        const updated =
                          images?.filter((_, index) => index !== idx) ?? [];

                        setValue("images", updated);
                      }}
                      className=" absolute top-1.5 right-1.5 max-sm:w-10 max-sm:h-10 w-6 h-6 flex items-center justify-center rounded-full bg-white/90 text-red-500 text-xs opacity-0 group-hover:opacity-100 max-sm:opacity-100 transition shadow"
                    >
                      ✕
                    </button>

                    <div className="absolute bottom-1.5 left-1.5 text-[10px] bg-black/60 text-white px-1.5 py-px rounded">
                      {idx + 1}
                    </div>
                  </div>
                ))}
            </div>

            <input
              type="file"
              accept="image/*"
              multiple
              className="
        text-sm text-gray-600
        file:mr-4 file:rounded-md file:border-0
        file:bg-blue-100 file:px-3 file:py-1.5
        file:text-blue-700
        hover:file:bg-blue-200
        transition
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
                      { shouldValidate: true },
                    );
                  };

                  reader.readAsDataURL(file);
                });
                // 🔥 WAJIB: reset input
                e.target.value = "";
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-600">Keterangan</label>

            <textarea
            {...register("description")}
              rows={4}
              className="
            resize-none
            rounded-xl
            border
            border-zinc-200
            px-4
            py-3
            text-black
          "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-600">Nominal</label>

            <input
            {...register("nominal")}
              type="number"
              placeholder="0"
              className="
            rounded-xl
            border
            border-zinc-200
            px-4
            py-3
            text-black
          "
            />
          </div>

          <div className="mt-2 flex justify-end gap-3">
            <button
              onClick={onBack}
              type="button"
              className="
            rounded-xl
            border
            border-zinc-200
            px-4
            py-2
            text-black
          "
            >
              Batal
            </button>

            <button
              type="submit"
              className="
            rounded-xl
            bg-zinc-900
            px-4
            py-2
            text-white
          "
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPost;
