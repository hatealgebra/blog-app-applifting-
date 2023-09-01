const { S3 } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const { S3_BUCKET_NAME, ASW_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } =
  process.env;

const uploadImage = async (imageData, key) => {
  const s3 = new S3({
    region: 'eu-north-1',
    credentials: {
      accessKeyId: ASW_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });

  const mediaUpload = new Upload({
    client: s3,
    params: {
      Bucket: S3_BUCKET_NAME,
      Key: key,
      Body: imageData,
      ACL: 'public-read',
    },
  });

  mediaUpload.done();
};

export default uploadImage;
