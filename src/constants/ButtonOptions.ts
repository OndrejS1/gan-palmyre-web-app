import {t} from "../i18n";

export const options = {
    HANDWRITTEN: t('buttons.handwritten'),
    IMAGE_ANNOTATION_CHAR: t('buttons.imageAnnotationChar'),
    IMAGE_ANNOTATION_SENTENCES: t('buttons.imageAnnotationSentences'),
    IMAGE_AUGMENTATION: t('buttons.imageAugmentation'),
} as const;

export type OptionKeys = keyof typeof options;
export type OptionValues = typeof options[OptionKeys];