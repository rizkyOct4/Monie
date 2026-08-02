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
import { FormPostType, FormPostSchema } from "../transaction/z-schema/z-schema";
import { Upload, Search, Loader2 } from "lucide-react";

type TransactionsProps = {
  onClose: () => void;
};

const ExistedTransactions = ({ onClose }: TransactionsProps) => {
  const { publicId } = useSessionClient();
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const {
    postTransaction,
    setIsOpenIdTransaction,
    IdTransactionsListData,
    search,
    setSearch,
    SearchIdTransactionData,
    isFetchingSearchIdTransaction,
  } = useContext(TransactionContext);

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

  const [showSearch, setShowSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Pilih Id");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const checkId = getValues("existId");
  // console.log(checkId)

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

      await postTransaction(post);
      // console.log(post);
      setIsSubmitLoading(false);
    } catch (err) {
      setIsSubmitLoading(false);
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
    <form className="flex flex-col gap-4" onSubmit={submit}>
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <div className="relative w-full">
            <label
              htmlFor="transactionName"
              className="mb-1 block text-xs text-gray-400"
            >
              ID TRANSAKSI *
            </label>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className=" flex w-full items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 transition hover:border-white/20 focus:border-emerald-500/40"
            >
              <span>{selected}</span>

              <svg
                className={`h-4 w-4 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {open && (
              <div className=" absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-white/10 bg-zinc-900 shadow-lg animate-in fade-in slide-in-from-top-1">
                {Array.isArray(IdTransactionsListData) &&
                IdTransactionsListData.length > 0
                  ? IdTransactionsListData.map((i) => (
                      <button
                        key={i.id}
                        type="button"
                        onClick={() => {
                          setSelected(i.initialName);
                          setValue("nameTransaction", i.initialName);
                          setValue("existId", i.id);
                          setOpen(false);
                        }}
                        className=" block w-full px-3 py-2 text-left text-sm text-gray-200 transition hover:bg-white/5"
                      >
                        {i.initialName}
                      </button>
                    ))
                  : null}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowSearch((prev) => !prev)}
          className="
          rounded-lg
          bg-black
          px-4
          py-2
          text-sm
          font-medium
          text-white
          transition
          cursor-pointer"
        >
          <Search />
        </button>
      </div>

      {showSearch && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
          <input
            id="name"
            type="text"
            placeholder="Cari transaksi..."
            className="
            w-full
            rounded-lg
            border border-white/10
            bg-black/40
            px-3 py-2
            text-sm
            text-gray-200
            placeholder:text-gray-500
            outline-none
            transition
            focus:border-emerald-500/40
            
          "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            className={`w-full h-auto px-4 py-2 mt-2 bg-gray-900 rounded-lg flex flex-col gap-4 ${search ? "block" : "hidden"}`}
          >
            {Array.isArray(SearchIdTransactionData) &&
              SearchIdTransactionData.length > 0 &&
              SearchIdTransactionData.map((i) => (
                <button
                  key={i.id}
                  className="text-white"
                  onClick={() => {
                    setSelected(i.initialName);
                    setValue("nameTransaction", i.initialName);
                    setValue("existId", i.id);
                    setShowSearch(false);
                  }}
                >
                  {i.initialName}
                </button>
              ))}
            {isFetchingSearchIdTransaction && (
              <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
            )}
          </div>
        </div>
      )}

      {checkId && (
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
              className="
                              flex h-12 items-center justify-center gap-2
                              rounded-2xl bg-black px-5
                              text-sm font-medium text-white
                              transition hover:opacity-90
                              disabled:cursor-not-allowed disabled:opacity-70
                            "
            >
              {isSubmitLoading ? (
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
