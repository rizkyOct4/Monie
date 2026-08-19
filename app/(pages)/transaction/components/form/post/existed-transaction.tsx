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
import { toast } from "sonner";
import { ToastPromise } from "@/_utils/toast";

type TransactionsProps = {
  onClose: () => void;
};

const ExistedTransactions = ({ onClose }: TransactionsProps) => {
  const { publicId } = useSessionClient();
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

  const { postTransaction, isPendingPostTransaction, setIsOpenIdTransaction } =
    useContext(TransactionContext);

  const [idExisted, setIdExisted] = useState<string>("");

  const nanoId = nanoid(8);

  const { register, handleSubmit, setValue, getValues, control } =
    useForm<FormPostType>({
      resolver: zodResolver(FormPostSchema),
      mode: "onChange",
    });

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
        existId: idExisted,
        nominal: Number(values.nominal),
        images: cloudImage ?? [],
        status: "ACTIVE",
        date: new Date(values.date),
      };

      const promise = postTransaction(post);
      toast.promise(promise, {
        loading: "Loading...",
        success: (data: { message: string }) =>
          `${data.message}`,
        error: "Failed to add transaction",
      });

      await promise;

      onClose();
    } catch (err) {
      console.error(err);
    }
  });

  useEffect(() => {
    setIsOpenIdTransaction(true);
  }, [setIsOpenIdTransaction]);

  // console.log(errors);

  return (
    <form
      className="flex flex-col gap-4 relative"
      onSubmit={submit}
      aria-label="Post Transaction Form"
    >
      <SearchIdTransaction setIdExisted={setIdExisted} setValue={setValue} />

      {idExisted !== "" && (
        <div
          role="dialog"
          aria-label="List Form"
          className="
          flex
          flex-col
          gap-6
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-950
          p-5
          text-zinc-200
        "
        >
          {/* Tanggal */}
          <div>
            <label
              className="
              mb-2
              block
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-zinc-500
            "
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
              className="
              h-11
              w-full
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              px-3
              text-sm
              text-zinc-200
              outline-none
              transition
              hover:border-zinc-700
              focus:border-emerald-500/50
              focus:ring-2
              focus:ring-emerald-500/10
            "
            />
          </div>

          {/* Images Upload */}
          <div>
            <label
              className="
              mb-2
              block
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-zinc-500
            "
              htmlFor="images"
            >
              Lampiran Foto
            </label>

            <div
              className="
              mb-3
              flex
              max-h-60
              flex-wrap
              gap-3
              overflow-y-auto
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900/50
              p-3
            "
            >
              {previewImagePath.length > 0 &&
                previewImagePath.map((src, idx) => (
                  <div
                    key={idx}
                    className="
                    relative
                    h-24
                    w-24
                    overflow-hidden
                    rounded-xl
                    border
                    border-zinc-700
                    bg-zinc-900
                  "
                  >
                    <Image
                      src={src}
                      alt={`Preview ${idx}`}
                      fill
                      className="object-cover"
                    />

                    <button
                      aria-label={`Delete button images ${idx}`}
                      type="button"
                      onClick={() => {
                        const updated =
                          images?.filter((_, index) => index !== idx) ?? [];

                        setValue("images", updated);
                      }}
                      className="
                      absolute
                      right-1.5
                      top-1.5
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-black/20
                      bg-black/70
                      text-xs
                      text-zinc-300
                      backdrop-blur-sm
                      transition
                      hover:bg-red-500/80
                      hover:text-white
                    "
                    >
                      ✕
                    </button>
                  </div>
                ))}
            </div>

            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              className="
              w-full
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              px-3
              py-2.5
              text-sm
              text-zinc-500
              outline-none
              transition
              file:mr-3
              file:rounded-lg
              file:border-0
              file:bg-emerald-500
              file:px-3
              file:py-1.5
              file:text-xs
              file:font-semibold
              file:text-white
              hover:border-zinc-700
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
              className="
              mb-2
              block
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-zinc-500
            "
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
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              px-3
              py-3
              text-sm
              text-zinc-200
              outline-none
              transition
              placeholder:text-zinc-600
              hover:border-zinc-700
              focus:border-emerald-500/50
              focus:ring-2
              focus:ring-emerald-500/10
            "
            />
          </div>

          {/* Nominal */}
          <div>
            <label
              className="
              mb-2
              block
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-zinc-500
            "
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
              h-11
              w-full
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              px-3
              text-sm
              text-zinc-200
              outline-none
              transition
              placeholder:text-zinc-600
              hover:border-zinc-700
              focus:border-emerald-500/50
              focus:ring-2
              focus:ring-emerald-500/10
            "
            />
          </div>

          {/* Action */}
          <div
            className="
            flex
            justify-end
            gap-6
            border-t
            border-zinc-800
            pt-5
          "
          >
            <button
              type="submit"
              disabled={isPendingPostTransaction}
              className="
              flex
              h-11
              min-w-28
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-emerald-400/20
              bg-emerald-500
              px-5
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-emerald-950/20
              transition
              hover:bg-emerald-400
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            >
              {isPendingPostTransaction ? (
                <div role="status" aria-label="Is Loading Post">
                  <Spokes className="size-4 animate-spin" />
                  <span>Dalam Progres...</span>
                </div>
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
