import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";

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
      <Alert show={show} variant="success">
        <Alert.Heading>{props.type}</Alert.Heading>
        <p>
          {props.text}
        </p>
        <hr />
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
}