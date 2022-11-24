import { BlobServiceClient } from "@azure/storage-blob";

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

export const uploadUserImage = async (
  data: Buffer | Blob | ArrayBuffer | ArrayBufferView,
  userId: string
) => {
  const containerClient = blobServiceClient.getContainerClient("user-images");

  if (!(await containerClient.exists())) {
    await containerClient.create();
  }

  const blockBlobClient = containerClient.getBlockBlobClient(`${userId}.png`);
  const uploadBlobResponse = await blockBlobClient.uploadData(data);
  return uploadBlobResponse;
};
