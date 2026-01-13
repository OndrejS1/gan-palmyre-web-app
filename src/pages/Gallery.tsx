import React from "react";
import {Container} from "react-bootstrap";
import {t} from "../i18n";

function Gallery() {
    return (
        <>
            <Container>
                <h1 className="mt-5 headline-1">{t('navbarMenu.gallery')}</h1>

                <p className="mt-5 text-light">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget nulla rutrum, finibus dui varius, rutrum velit. Praesent faucibus sit amet tortor vitae sollicitudin. Maecenas rhoncus aliquet magna, non iaculis ex ullamcorper sed. Aliquam finibus nisl eget massa mollis placerat. Sed ac ullamcorper dolor. Duis accumsan arcu lorem, non interdum arcu aliquam a. Donec sapien nisl, porttitor ac justo ut, convallis hendrerit ex. Cras tincidunt nisl id lectus mollis sagittis. Vivamus accumsan dolor congue eros porttitor vulputate. Fusce sit amet cursus urna, dictum facilisis libero. Sed varius consequat est. Nunc mollis elit nibh, et auctor purus pharetra ac. Praesent nibh tortor, porta eu eros sed, pretium luctus nibh. Proin iaculis felis non nisl dictum tincidunt. Nulla lacus quam, tempor eget tempus sit amet, euismod et risus.
                </p>
            </Container>
        </>
    );
}

export default Gallery;