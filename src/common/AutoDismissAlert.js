import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";

export default function (props) {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      props.onDisposed();
    }, 2500);
  }, [1])

  return (
    <>
      <Alert show={show} variant={props.variant}>
        <Alert.Heading>{props.heading}</Alert.Heading>
        <p>
          {props.text}
        </p>
      </Alert>

      {/* {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
    </>
  );
}