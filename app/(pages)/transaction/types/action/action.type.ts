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
  wrongDate: boolean
}
