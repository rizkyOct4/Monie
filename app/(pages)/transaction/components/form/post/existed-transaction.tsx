"use client";

import { useEffect, useContext, useState } from "react";
import { Spokes } from "@/components/ui/spokes";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { nanoid } from "nanoid";
import { uploadMultipleToCloudinary } from "@/_utils/direct-upload-cloud";
import { useSessionClient } from "@/_lib/c-session";
import { TransactionContext } from "@/app/context/context";
import { FormPostType, FormPostSchema } from "../../../z-schema/z-schema";
import SearchIdTransaction from "./search-id-transactions";

type TransactionsProps = {
  onClose: () => void;
};

const ExistedTransactions = ({ onClose }: TransactionsProps) => {
  const { publicId } = useSessionClient();
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

  const { postTransaction, isPendingPostTransaction, setIsOpenIdTransaction } =
    useContext(TransactionContext);

  const [idExisted, setIdExisted] = useState<string>("")

  const nanoId = nanoid(8);

  const { register, handleSubmit, setValue, getValues, control } =
    useForm<FormPostType>({
      resolver: zodResolver(FormPostSchema),
      mode: "onChange",
    });

  const checkId = getValues("existId");

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

  // const hasDuplicate = images
  //   ? new Set(images.map((i) => i.name)).size !== images.length
  //   : false;

  const submit = handleSubmit(async (values) => {
    try {
      const id = nanoId;

      let cloudImage;

      if (images.length > 0) {
        const cloud = await uploadMultipleToCloudinary({
          files: images.map((i) => i.path),
          publicId: publicId,
          type: "images",
          id: id,
        });

        const image = cloud.map((i, idx) => ({
          id: nanoid(8),
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
        status: "ACTIVE",
      };

      // await postTransaction(post);
      console.log(post);
    } catch (err) {
      console.error(err);
    } finally {
      onClose();
    }
  });

  useEffect(() => {
    setIsOpenIdTransaction(true);
  }, [setIsOpenIdTransaction]);

  // console.log(errors);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={submit}
      aria-label="Post Transaction Form"
    >
      <SearchIdTransaction />

      {checkId && (
        <div>
          {/* Tanggal */}
          <div>
            <label
              className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500"
              htmlFor="date"
            >
              Tanggal
            </label>

            <input
              id="date"
              {...register("date", {
                valueAsDate: true,
              })}
              type="datetime-local"
              defaultValue={now.toISOString().slice(0, 16)}
              required
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
                      className=" absolute top-1 right-1 flex h-5 w-5 items-center justify-center bg-white text-xs text-red-500"
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
            <label
              className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500"
              htmlFor="information"
            >
              Keterangan
            </label>

            <textarea
              id="information"
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
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500"
            htmlFor="nominal"
            >
              Nominal
            </label>

            <input
              id="nominal"
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
            <button
              type="submit"
              disabled={isPendingPostTransaction}
              className=" flex h-12 items-center justify-center gap-2 rounded-2xl bg-black px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPendingPostTransaction ? (
                <>
                  <Spokes className="size-4 animate-spin" />
                  <span>Dalam Progres...</span>
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ExistedTransactions;
