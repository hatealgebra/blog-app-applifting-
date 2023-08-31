const { S3 } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const UPLOAD_BUCKET = 'blogappimagesnapshots';

const uploadImage = async (imageData, key) => {
  const s3 = new S3({
    region: 'eu-north-1',
    credentials: {
      accessKeyId: '',
      secretAccessKey: '',
    },
  });

  const mediaUpload = new Upload({
    client: s3,
    params: {
      Bucket: UPLOAD_BUCKET,
      Key: key,
      Body: imageData,
      ACL: 'public-read',
    },
  });

  mediaUpload.done();
};

export default uploadImage;
