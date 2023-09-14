/* eslint-disable no-console */
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

export const cleanDiffs = async () => {
  const listParams = {
    Bucket: S3_BUCKET_NAME,
    Prefix: 'diffs/',
  };

  s3.listObjectsV2(listParams, (err, data) => {
    if (err) {
      console.error('Error listing objects:', err);
    } else {
      console.log(data);
      // Step 2: Iterate through and delete objects
      data.Contents.forEach((object) => {
        const deleteParams = {
          Bucket: S3_BUCKET_NAME,
          Key: object.Key,
        };
        // Step 3: Delete each object
        s3.deleteObject(deleteParams, (error) => {
          if (error) {
            console.error('Error deleting object:', err);
          }
        });
      });
      console.log('Cleaning of diffs done');
    }
  });
};
