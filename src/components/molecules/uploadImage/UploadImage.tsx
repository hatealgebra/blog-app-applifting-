import React from 'react';
import Button from '../../atoms/button/Button';
import { StyledMinimalButton, StyledUploadImage } from './uploadImage.styled';

export interface UploadImageProps {
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const UploadImage = ({ imageFile, setImageFile }: UploadImageProps) => {
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
      setImageFile(fileUploaded);
    }
  };

  const resetImage = () => setImageFile(null);

  React.useEffect(() => {
    if (imageFile !== null) {
      const objectURL = URL.createObjectURL(imageFile);
      setImagePreview(objectURL);
    } else {
      setImagePreview(undefined);
    }
  }, [imageFile]);

  return (
    <StyledUploadImage>
      <label className="upload-image__label">Featured Image</label>
      {imageFile !== null ? (
        <>
          <img
            className="upload-image__preview"
            src={imagePreview}
            alt={imageFile.name}
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

export default UploadImage;
