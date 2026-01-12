export const options = {
    HANDWRITTEN: 'handwritten',
    IMAGE_ANNOTATION_CHAR: 'Image Annotation - one char',
    IMAGE_ANNOTATION_SENTENCES: 'Image Annotation - words and sentences',
    IMAGE_AUGMENTATION: 'Image Augmentation',
} as const;

export type OptionKeys = keyof typeof options;
export type OptionValues = typeof options[OptionKeys];