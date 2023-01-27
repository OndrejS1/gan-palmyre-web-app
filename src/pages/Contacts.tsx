import React from "react";
import {Container} from "react-bootstrap";

function Contacts() {
    return (
        <>
            <Container>
                <h1 className="mt-5">Contacts</h1>

                <p className="mt-5 text-light">
                    Ing. Adéla Hamplová * hamplova@pef.czu.cz
                </p>
                <p className="mt-3 text-light">
                    Ing. Ondřej Svojše * svojse@pef.czu.cz
                </p>

                <p className="mt-3 text-light">
                    Ing. David Franc * dfranc@pef.czu.cz
                </p>
            </Container>
        </>
    );
}

export default Contacts;