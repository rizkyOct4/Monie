"use client";

import { useEffect, useState, useContext } from "react";
import { Spokes } from "@/components/ui/spokes";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { nanoid } from "nanoid";
import { uploadMultipleToCloudinary } from "@/_utils/direct-upload-cloud";
import { useSessionClient } from "@/_lib/c-session";
import { TransactionContext } from "@/app/context/context";
import { FormPutType, FormPutSchema } from "../../z-schema/z-schema";
import { Upload, Search, Loader2 } from "lucide-react";

type TransactionsProps = {
  idTransaction: string;
  onBack: () => void;
};

const FormPut = ({ idTransaction, onBack }: TransactionsProps) => {
  const { publicId } = useSessionClient();
  const {
    postTransaction,
    PutIdTransactionData,
    setIsOpenIdTransaction,
    IdTransactionsListData,
    SearchIdTransactionData,
    isFetchingSearchIdTransaction,
  } = useContext(TransactionContext);

  // console.log(idTransaction)

  const nanoId = nanoid(8);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
    control,
    reset,
  } = useForm<FormPutType>({
    resolver: zodResolver(FormPutSchema),
    mode: "onChange",
  });

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

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
      setIsSubmitLoading(true);
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
        existsId: idTransaction,
        nominal: Number(values.nominal),
        images: images.length > 0 ? cloudImage : [],
      };

      // await postTransaction(post);
      console.log(post);
      setIsSubmitLoading(false);
      onBack();
    } catch (err) {
      setIsSubmitLoading(false);
      console.error(err);
    }
  });

  useEffect(() => {
    if (PutIdTransactionData) {
      reset({
        existId: PutIdTransactionData[0]?.id,
        date: PutIdTransactionData[0]?.updatedAt,
        images: PutIdTransactionData[0]?.images.map(
          (i: { imageName: string; imageUrl: string }) => ({
            name: i.imageName,
            path: i.imageUrl,
          }),
        ),
        information: PutIdTransactionData[0]?.information,
        nominal: PutIdTransactionData[0]?.nominal,
      });
    }
  }, [PutIdTransactionData, reset]);

  // console.log(errors);

  return (
    <form className="flex flex-col gap-4" onSubmit={submit}>
      <div>
        {/* Tanggal */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Tanggal
          </label>

          <input
            {...register("date", {
              valueAsDate: true,
            })}
            type="datetime-local"
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
          <button
            type="submit"
            disabled={isSubmitLoading}
            className=" flex h-12 items-center justify-center gap-2 rounded-2xl bg-black px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitLoading ? (
              <>
                <Spokes className="size-4 animate-spin" />
                <span>Dalam Progres...</span>
              </>
            ) : (
              "Perbarui"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormPut;
