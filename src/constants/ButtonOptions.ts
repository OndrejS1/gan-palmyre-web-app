export const options = {
    IMAGE_AUGMENTATION: 'Image Augmentation',
    HANDWRITTEN: 'handwritten',
    IMAGE_ANNOTATION: 'Image Annotation',
} as const;

export type OptionKeys = keyof typeof options;
export type OptionValues = typeof options[OptionKeys];