import React from 'react';
import Button from '../../atoms/button/Button';
import { StyledMinimalButton, StyledUploadImage } from './uploadImage.styled';

const UploadImage = ({ image, setImage }: UploadImageProps) => {
  const [imagePreview, setImagePreview] = React.useState<string | undefined>(
    null
  );
  const hiddenFileInputRef = React.useRef<HTMLInputElement>(null);

  const handleInput = () => {
    if (hiddenFileInputRef.current !== null) {
      hiddenFileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const fileUploaded = event.target.files[0];
      setImage(fileUploaded);
    }
  };

  const resetImage = () => setImage(null);

  React.useEffect(() => {
    if (image !== null) {
      const objectURL = URL.createObjectURL(image);
      setImagePreview(objectURL);
    } else {
      setImagePreview(undefined);
    }
  }, [image]);

  return (
    <StyledUploadImage>
      <label className="upload-image__label">Featured Image</label>
      {image !== null ? (
        <>
          <img
            className="upload-image__preview"
            src={imagePreview}
            alt={image.name}
          />
          <div className="upload-image__button-row">
            <StyledMinimalButton onClick={handleInput}>
              Upload New
            </StyledMinimalButton>
            <StyledMinimalButton onClick={resetImage}>
              Delete
            </StyledMinimalButton>
          </div>
        </>
      ) : (
        <Button onClick={handleInput} colortheme="secondary">
          Upload an Image
        </Button>
      )}
      <input
        data-testid="image-uploader"
        ref={hiddenFileInputRef}
        type="file"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={(e) => handleFileChange(e)}
      />
    </StyledUploadImage>
  );
};

export interface UploadImageProps {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

export default UploadImage;
