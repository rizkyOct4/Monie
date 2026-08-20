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
import { FormPutType, FormPutSchema } from "../../../z-schema/z-schema";
import { ConvertDateLocalIntoDate } from "@/_utils/format-date";

export type PutFormTransactionsProps = {
  putValue: {
    existId: string;
    images:
      | {
          id: string;
          imageName: string;
          imageUrl: string;
        }[]
      | [];
    information: string;
    nominal: number;
    prevDate: Date;
  };
  onClose: () => void;
};

const FormPutTranscation = ({ putValue, onClose }: PutFormTransactionsProps) => {
  const { publicId } = useSessionClient();
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

  const { putTransaction, isPendingPutTransaction } =
    useContext(TransactionContext);

  const nanoId = nanoid(8);

  const { register, handleSubmit, setValue, getValues, control, reset } =
    useForm<FormPutType>({
      resolver: zodResolver(FormPutSchema),
      mode: "onChange",
    });

  const [imageDeleted, setImageDeleted] = useState<string[]>([]);

  // * IMAGES =================
  const images =
    useWatch({
      control,
      name: "images",
    }) ?? [];

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

      const just = images.filter((img) => !img.path.startsWith("https://"));
      const newImage = previewImagePath.filter(
        (img: string) => !img.startsWith("https://"),
      );

      if (newImage.length > 0) {
        const idImages = nanoid(8);

        const cloud = await uploadMultipleToCloudinary({
          files: newImage,
          publicId: publicId,
          type: "images",
          id: id,
        });

        const image = cloud.map((i, idx) => ({
          id: idImages,
          imageName: just[idx].name,
          imageId: i.public_id,
          imageUrl: i.secure_url,
        }));

        cloudImage = image;
      }

      const checkPutWrongDate =
        ConvertDateLocalIntoDate(values.date) !==
        ConvertDateLocalIntoDate(putValue.prevDate);

      const put = {
        ...values,
        lastNominal: Number(putValue.nominal),
        nominal: Number(values.nominal),
        images: images,
        newImages: cloudImage ?? [],
        deleteImages: imageDeleted,
        wrongDate: checkPutWrongDate,
        date: new Date(values.date)
      };

      await putTransaction(put);
      // console.log(put)
    } catch (err) {
      console.error(err);
    } finally {
      onClose();
    }
  });

  useEffect(() => {
    if (putValue) {
      reset({
        existId: putValue.existId,
        images: putValue.images.map(
          (i: { imageName: string; imageUrl: string }) => ({
            name: i.imageName,
            path: i.imageUrl,
          }),
        ),
        information: putValue.information,
        nominal: String(putValue.nominal),
      });
    }
  }, [putValue, reset]);

  // console.log(putValue);
  return (
    <div className="fixed inset-0 z-102 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
          <h2 className="text-base font-semibold tracking-tight text-white">
            Perbarui Transaksi
          </h2>

          <button
            aria-label="Close Popup"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-8 overflow-y-auto p-6">
          <form
            className="flex flex-col gap-8"
            onSubmit={submit}
            aria-label="Put Transaction Form"
          >
            <div className="space-y-8">
              {/* Date */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500"
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
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition-all placeholder:text-zinc-600 focus:border-emerald-500/50 focus:bg-zinc-900 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              {/* Upload Images */}
              <div className="space-y-3">
                <label
                  className="block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500"
                  htmlFor="image"
                >
                  Lampiran Foto
                </label>

                {/* Preview Images */}
                <div className="flex min-h-[110px] flex-wrap gap-4 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/50 p-4">
                  {images.length > 0 &&
                    images.map((src, idx) => (
                      <div
                        key={idx}
                        data-testid={`Image idx: ${idx}`}
                        className="relative h-24 w-24 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
                      >
                        <Image
                          src={src?.path}
                          alt={`Preview ${idx}`}
                          fill
                          className="object-cover"
                        />

                        <button
                          type="button"
                          aria-label={`Delete idx: ${idx}`}
                          onClick={() => {
                            const delImage = images?.find(
                              (i) => i.name === src.name,
                            );

                            const updated =
                              images?.filter((_, index) => index !== idx) ?? [];

                            setValue("images", updated);

                            if (delImage) {
                              setImageDeleted((prev) => [
                                ...prev,
                                delImage.name,
                              ]);
                            }
                          }}
                          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950/90 text-xs font-bold text-red-400 shadow-lg transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>

                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-400 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-500/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-emerald-400 transition focus:border-emerald-500/40"
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

              {/* Information */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500"
                  htmlFor="information"
                >
                  Keterangan
                </label>

                <textarea
                  id="information"
                  {...register("information")}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition-all placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              {/* Nominal */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500"
                  htmlFor="nominal"
                >
                  Nominal
                </label>

                <input
                  id="nominal"
                  {...register("nominal")}
                  type="number"
                  placeholder="0"
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition-all placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              {/* Action */}
              <div className="flex justify-end border-t border-zinc-800 pt-6">
                <button
                  type="submit"
                  disabled={isPendingPutTransaction}
                  className="flex h-12 min-w-[160px] items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-black transition-all hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPendingPutTransaction ? (
                    <div role="dialog" aria-label="Is Loading">
                      <Spokes className="size-4 animate-spin" />
                      <span>Dalam Progres...</span>
                    </div>
                  ) : (
                    "Perbarui"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPutTranscation;
