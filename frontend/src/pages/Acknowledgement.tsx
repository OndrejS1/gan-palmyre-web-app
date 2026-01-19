import React from "react";
import {Container} from "react-bootstrap";

function Acknowledgement() {
    return (
        <>
            <Container>
                <h1 className="mt-5">Acknowledgement</h1>

                <p className="mt-5 text-light">
                    The results and knowledge included in this project have been obtained owing to support from the following institutional grants: <br/><br/>
                    In 2021:
                    <br/>
                    <ul className="mt-3">
                        <li>Internal grant agency of the Faculty of Economics and Management, Czech University of Life Sciences Prague, grant number 2021A0004, "Reading Palmyrene alphabet characters using artificial intelligence tools"</li>
                    </ul>
                </p>
                <p className="mt-3 text-light">
                    In 2022:

                    <br/>
                    <ul className="mt-3">
                        <li>Internal grant agency of the Faculty of Economics and Management, Czech University of Life Sciences Prague, grant number 2022A0001, "Researching methods for automatic data set augmentation using machine learning tools"</li>
                    </ul>
                </p>

                <p className="mt-3 text-light">
                    Currently published outputs from the above mentioned funding projects are:
                    <ul className="mt-3">
                        <li>HAMPLOVÁ, Adéla, David FRANC a Jan TYRYCHTR. Historical Alphabet Transliteration Software Using Computer Vision Classification Approach. Artificial Intelligence Trends in Systems. Cham: Springer International Publishing, 2022, 2022-07-08, pp. 34-45. Lecture Notes in Networks and Systems. ISBN 978-3-031-09075-2. DOI:10.1007/978-3-031-09076-9_4</li>
                        <li>HAMPLOVÁ, Adéla, David FRANC a Arnošt VESELÝ. An improved classifier and transliterator of hand-written Palmyrene letters to Latin. Neural Network World. 2022, 32(4), pp. 181-195. ISSN 23364335. DOI: 10.14311/NNW.2022.32.011</li>
                        <li>FRANC, David, Adéla HAMPLOVÁ a Ondřej SVOJŠE. Augmenting Historical Alphabet Datasets Using Generative Adversarial Networks. Data Science and Algorithms in Systems. Cham: Springer International Publishing, 2023, pp. 132-141. Lecture Notes in Networks and Systems. ISBN 978-3-031-21437-0. DOI:10.1007/978-3-031-21438-7_11</li>
                    </ul>
                </p>

                <p className="mt-3 text-light">
                    and two other articles are in the peer review process:

                    <ul className="mt-3">
                        <li>FRANC, David, Adéla HAMPLOVÁ, Ondřej SVOJŠE and Arnošt VESELÝ. Data augmentation methods using Generative Adversarial Networks for improving the accuracy of Computer Vision algorithms. Journal of Intelligent & Fuzzy Systems. IOS Press. ISSN 1875-8967, forthcoming</li>
                        <li>SVOJŠE, Ondřej, Adéla HAMPLOVÁ, David FRANC and Arnošt VESELÝ. Integration of Convolutional Neural Networks with Web Applications: A Study. Advances in Electrical and Computer Engineering. Univ Suceava, FAC Electrical Eng. ISSN 1582-7445, forthcoming</li>
                    </ul>
                </p>
            </Container>
        </>
    );
}

export default Acknowledgement;