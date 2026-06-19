"use client";

import { FormPostType, FormPostSchema } from "@/app/z-schemas/schemas";
import { useState, useCallback, useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { nanoid } from "nanoid";
import { uploadMultipleToCloudinary } from "@/_utils/direct-upload-cloud";
import { useSessionClient } from "@/_lib/c-session";
import { TransactionContext } from "@/app/context/context";

type FormPostProps = {
  onBack: () => void;
};

const FormPost = ({ onBack }: FormPostProps) => {
  const { publicId } = useSessionClient();
  const { postTransaction } = useContext(TransactionContext);

  const nanoId = nanoid(8);

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

  const [isNewTransaction, setIsNewTransaction] = useState(false);

  // * IMAGES =================
  const images =
    useWatch({
      control,
      name: "images",
    }) ?? [];

  const previewImageName =
    useWatch({
      control,
      name: "images",
    })?.map((img) => img.name) ?? [];

  const previewImagePath =
    useWatch({
      control,
      name: "images",
    })?.map((img) => img.path) ?? [];

  const hasDuplicate = images
    ? new Set(images.map((i) => i.name)).size !== images.length
    : false;

  const handleAction = useCallback((actionType: string) => {
    switch (actionType) {
      case "newTransaction": {
        setIsNewTransaction((prev) => !prev);
        break;
      }
    }
  }, []);

  const submit = handleSubmit(async (values) => {
    try {
      const id = nanoId;

      let cloudImage;

      if (images.length > 0) {
        const idImages = nanoid(8);

        const cloud = await uploadMultipleToCloudinary({
          files: images.map((i) => i.path),
          publicId: publicId,
          type: "images",
          id: id,
        });

        const image = cloud.map((i, idx) => ({
          id: idImages,
          imageName: previewImageName[idx],
          imageId: i.public_id,
          imageUrl: i.secure_url,
        }));

        cloudImage = image;
      }

      const post = {
        ...values,
        id: id,
        nominal: Number(values.nominal),
        images: images.length > 0 ? cloudImage : [],
      };
      console.log(post);
    } catch (err) {
      console.error(err);
    }
  });

  // console.log(errors);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className=" w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white p-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-black">Tambah Transaksi</h2>

          <button
            onClick={() => handleAction("newTransaction")}
            type="button"
            className="text-zinc-500 hover:text-black"
          >
            {isNewTransaction ? "- Current" : "+ New"}
          </button>
          <button
            onClick={onBack}
            type="button"
            className="text-zinc-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <form className="flex flex-col gap-6" onSubmit={submit}>
          {isNewTransaction ? (
            <div className="flex-1 flex flex-col gap-1.5">
              <span className="flex items-center justify-between gap-2">
                <label htmlFor="name" className="text-xs text-gray-400">
                  Name
                </label>
                {errors.nameTransaction && (
                  <p className="text-red-400 text-[11px]">
                    {errors.nameTransaction.message}
                  </p>
                )}
              </span>

              <input
                id="name"
                type="text"
                placeholder="January 2026"
                className="
                rounded-md
                border border-white/10
                bg-black/40
                px-3 py-2
                text-sm text-gray-200
                placeholder:text-gray-500
                outline-none
                focus:border-emerald-500/40
              "
                required
                {...register("nameTransaction")}
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-1.5">
              <label
                htmlFor="transactionName"
                className="text-xs text-gray-400"
              >
                Tipe Transaksi
              </label>
              <select
                id="transactionName"
                className="
                rounded-md
                border border-white/10
                bg-black/40
                px-3 py-2
                text-sm text-gray-200
                outline-none
                focus:border-emerald-500/40
                
              "
                {...register("nameTransaction")}
              >
                <option value="REGULAR" className="bg-black text-white">
                  Regular
                </option>
                <option value="PREMIUM" className="bg-black text-white">
                  Premium
                </option>
              </select>
            </div>
          )}

          {/* Tanggal */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Tanggal
            </label>

            <input
              {...register("date")}
              type="date"
              className=" w-full border-b border-zinc-300 pb-2 text-black outline-none"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Lampiran Foto
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
              {...register("information")}
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
