import dynamic from "next/dynamic";

export const LazyFormPutTransaction = dynamic(() => import("../form/update/form-put-transaction"), {
  loading: () => null,
});

export const LazyDeleteTransaction = dynamic(
  () => import("../form/delete/form-delete-transaction"),
  {
    loading: () => null,
  },
);

export const PopUpShowImages = dynamic(() => import("../pop-up/pop-up-show-image"), {
  loading: () => null,
});