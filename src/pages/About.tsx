import React from "react";
import {Container} from "react-bootstrap";
import {t} from "../i18n";

function About() {
    return (
        <>
            <Container>
                <h1 className="mt-5 headline-1">{t('navbarMenu.about')}</h1>

                <p className="mt-5 text-light">
                    The project of Palmyrene alphabet transliteration started in 2021 with the idea to create a complete Palmyrene Aramaic OCR in the future. The main idea of this study was to help researchers of biblical studies semi-automatically transliterate, and possibly translate ancient Aramaic texts, and also create an AI method of transliterating other alphabets to Latin, if a different dataset is used on the input. The idea was also to bring ancient texts to public, with an Android mobile application, that anyone can use, for example when visiting in a museum.
                </p>
                <p className="mt-3 text-light">
                    A research team from the Czech University of Life Sciences in Prague, which consisted of three people with machine learning specialisation, Ing. Adéla Hamplová, Ing. David Franc and doc. Ing. Arnošt Veselý CSc., approached the Palmyrene letters classification in two ways:
                    <ul className="mt-3">
                        <li>One way was to cut a dataset of Palmyrene characters in squares from sandstone tablets acquired from the Museum of Palmyra and Le Louvre and to use sandstone tablets imitations (characters written in sand)</li>
                        <li>The second way was to create a hand-written dataset, in a similar way to EMNIST
                            The number of letters, numbers and symbols was optimized to 28 due to the similarity of some symbols and other reasons expained in research papers. At first, the efficient_lite0 architecture was used to classify the letters, however, the results were not satisfactory. Therefore, the team conducted experiments with CNN architectures and created an optimized classifier in tensorflow, which was converted to tensorflow lite and ran on mobile devices. The classification of hand-written characters was successful, as it reached almost 99 %.</li>
                    </ul>
                </p>

                <p className="mt-3 text-light">
                    As photographic data classification did not reach results, that could be put into practice, the research team, along with new members - Ing. Ondřej Svojše and doc. Ing. Vojtěch Merunka, Ph.D., continued with exploring data augmentation methods in the following year. Along with classical mathematical methods implemented in keras generator, the team trained Generative Adversarial Networks for each Palmyrene character, and in later versions, even multiple generators for each character variant, and using the GANs and keras generators, they expanded the photographic dataset and improved the classification results of photos to more than 77 %. In the same year, they published this web application, which extended the classification with an annotation tool for photos of a whole sandstone tablet.
                </p>

                <p className="mt-3 text-light">
                    More steps remain to create a complete OCR. The team hopes to get a funding for the following two years, so that they can create another OCR component - an automatic segmentation of text and non-text areas (which is now done by manually annotating each letter), then segmenting each character separately, reading the text from right to left, up to down and automatically transliterate the whole tablet by using a hybrid combined approach:

                    <ul className="mt-3">
                        <li>Training a YOLOv5 to YOLOv8 network to differentiate the text and non-text area, and then separate characters.</li>
                        <li>training a mask R-CNN network to get the outlines of each character and the outlines will be classified with the hand-written character classifier, and classifying directly from photos using the photographic classifier.</li>
                    </ul>
                </p>

                <p className="mt-3 text-light">
                    After experimenting with different methods, the team plans to publish a methodological manual to create a simplified OCR pipeline. In the following two years, the team also hopes to retrain the photographic classifier with the use another augmentation method - variational autoencoders, and to get more real input data from other museums.
                </p>

                <p className="mt-3 text-light">
                    Next steps are also to incorporate a dictionary with the help of researchers capable of reading in Palmyrene Aramaic. Then, the OCR system can be marked as complete.
                </p>


            </Container>
        </>
    );
}

export default About;