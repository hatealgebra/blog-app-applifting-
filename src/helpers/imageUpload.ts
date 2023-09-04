const { S3 } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const fs = require('fs');

const { S3_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } =
  process.env;

const s3 = new S3({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export const imageUpload = async (imageData, key) => {
  const mediaUpload = new Upload({
    client: s3,
    params: {
      Bucket: S3_BUCKET_NAME,
      Key: `snapshots/${key}.png`,
      Body: imageData,
      ACL: 'public-read',
    },
  });

  mediaUpload.done();
};

export const uploadDiff = async (diffPath: string, key) => {
  const imageData = fs.readFileSync(diffPath);

  const mediaUpload = new Upload({
    client: s3,
    params: {
      Bucket: S3_BUCKET_NAME,
      Key: `diffs/${key}-diff.png`,
      Body: imageData,
      ACL: 'public-read',
    },
  });

  mediaUpload.done();
};
