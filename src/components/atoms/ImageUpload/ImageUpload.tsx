import { useState, useEffect } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Button from "../Button/Button";
import { RefreshCwIcon, Trash2Icon, UploadIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import './ImageUpload.scss';

interface ImageUploadProps {
    handleSetImageFile: (file: File | null) => void;
    imageUrl?: string;
    label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ handleSetImageFile, imageUrl, label }) => {
    const [images, setImages] = useState<ImageListType>([]);
    const [displayUrl, setDisplayUrl] = useState<string | null>(null);
    const maxNumber = 1;
    const { t } = useTranslation();
    useEffect(() => {
        if (imageUrl) {
            setDisplayUrl(imageUrl);
        }
    }, [imageUrl]);

    const onChange = (imageList: ImageListType) => {
        setImages(imageList);
        if (imageList.length > 0) {
            handleSetImageFile(imageList[0].file || null);
        } else {
            handleSetImageFile(null);
        }
    };

    return (
        <div className="image-upload">
            {label && <label className="image-upload__label">{label}</label>}
            <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                acceptType={["jpg", "jpeg", "png"]}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    <div className="image-upload__container">
                        <div className="image-upload__dropzone" onClick={onImageUpload} {...dragProps}>
                            <div className="image-upload__content">
                                <UploadIcon className="image-upload__icon" />
                                <div className="image-upload__text">
                                    {isDragging ? t('image_upload.drop_here') : t('image_upload.click_or_drag')}
                                </div>
                                <div className="image-upload__subtext">
                                    {t('image_upload.supported_formats')}
                                </div>
                            </div>
                        </div>

                        {imageList.length > 0 && (
                            <div className="image-upload__actions">
                                <Button
                                    colorType="red"
                                    type="button"
                                    name={t('remove')}
                                    icon={<Trash2Icon className="w-4 h-4 mr-2" />}
                                    onClick={() => {
                                        onImageRemoveAll();
                                        handleSetImageFile(null);
                                    }}
                                />
                            </div>
                        )}

                        {/* Preview Section */}
                        {imageList.length > 0 && (
                            <div className="image-upload__preview">
                                <img
                                    src={imageList[0].dataURL}
                                    alt="Preview"
                                />
                                <div className="image-upload__actions">
                                    <button
                                        onClick={() => onImageUpdate(0)}
                                        className="image-upload__action-button"
                                        title={t('image_upload.update')}
                                    >
                                        <RefreshCwIcon />
                                    </button>
                                    <button
                                        onClick={() => {
                                            onImageRemove(0);
                                            handleSetImageFile(null);
                                        }}
                                        className="image-upload__action-button image-upload__remove-button"
                                        title={t('image_upload.remove')}
                                    >
                                        <Trash2Icon />
                                    </button>
                                </div>
                                <div className="image-upload__filename">
                                    {imageList[0].file?.name}
                                </div>
                            </div>
                        )}

                        {displayUrl && !imageList.length && (
                            <div className="image-upload__preview">
                                <img
                                    src={displayUrl}
                                    alt="Uploaded content"
                                />
                                <div className="image-upload__filename">
                                    {t('image_upload.uploaded_image')}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default ImageUpload;