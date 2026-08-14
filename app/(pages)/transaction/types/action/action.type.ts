export type TPostNewIDTransaction = {
  id: string;
  initialNominal: number;
  date: Date;
  nameTransaction: string;
};

export type TPostExistedTransaction = {
  id: string;
  existId: string;
  nominal: number;
  images: {
    id: string;
    imageName: string;
    imageId: string;
    imageUrl: string;
  }[];
  status: string;
  date: Date;
  nameTransaction: string;
  information?: string | undefined;
};

export type TPutTransaction = {
  lastNominal: number;
  nominal: number;
  images: {
    name: string;
    path: string;
  }[];
  newImages: {
    id: string;
    imageName: string;
    imageId: any;
    imageUrl: any;
  }[];
  deleteImages: string[];
  existId: string;
  date: Date;
  information?: string | undefined;
  wrongDate: boolean;
};
