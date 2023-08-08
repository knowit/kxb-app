const MICROSOFT_STORAGE_SAS_TOKEN = process.env.MICROSOFT_STORAGE_SAS_TOKEN;

async function storageExists(fileName: string) {
  const url = `https://kxbspecialistappstorage.blob.core.windows.net/user-images/${fileName}`;

  let result: Response;

  try {
    result = await fetch(`${url}${MICROSOFT_STORAGE_SAS_TOKEN}`, {
      method: "HEAD",
      headers: {
        "x-ms-date": new Date().toUTCString(),
        "x-ms-version": "2019-12-12"
      }
    });
  } catch (error) {
    console.error(error);

    return {
      success: false,
      url,
      cdnUrl: `https://kxb.azureedge.net/user-images/${fileName}`
    };
  }

  return {
    success: result.ok,
    url,
    cdnUrl: `https://kxb.azureedge.net/user-images/${fileName}`
  };
}

async function storageUpload(file: ArrayBuffer, fileName: string, fileType: string) {
  try {
    await fetch(
      `https://kxbspecialistappstorage.blob.core.windows.net/user-images/${fileName}${MICROSOFT_STORAGE_SAS_TOKEN}`,
      {
        method: "PUT",
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "x-ms-date": new Date().toUTCString(),
          "x-ms-version": "2019-12-12",
          "Content-Type": fileType
        },
        body: file
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export { storageExists, storageUpload };
