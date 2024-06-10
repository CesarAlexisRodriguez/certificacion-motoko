import { useEffect, useState } from 'react';
import { gamer_zone_backend } from 'declarations/gamer_zone_backend';
import { Container, Row, Col, Card, Table, Button, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import FormJuego from './FormJuego';


function App() {
  const [juegos, setjuegos] = useState([]);
  const [juego, setjuego] = useState({});
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    getJuegos();
  }, []);


  function getJuegos() {
    Swal.fire('Cargando...')
    Swal.showLoading();
    gamer_zone_backend.getAllJuegos().then(juegos => {
      setjuegos(juegos);
      Swal.close();
    });
  }

  function getJuego(id) {
    Swal.fire('Cargando...')
    Swal.showLoading();
    gamer_zone_backend.getjuegoById(BigInt(id)).then(juego => {
      setjuego(juego.shift());
      Swal.close();
      setShow(true);
    });
  }

function deletejuego(id) {
Swal.fire("eliminado juego... ")
Swal.showLoading();
gamer_zone_backend.deletejuego(BigInt(id)).then(() => {
getJuegos();
});





}



  return (
    <Container fluid className='m-3'>
      <Row>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>Lista de videojuegos</Card.Title>
              </Col>
              <Col>
                <button variant="dark" onClick={()=>navigate("/FormJuego")}>Agregar videojuego</button>
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>TITULO</th>
                  <th>DESCRIPCION</th>
                  <th>CALIFICACION</th>
                  <th>OPCIONES</th>
                </tr>
              </thead>
              <tbody>
                {
                  juegos.length > 0 ?
                    juegos.map((juego) => (
                      <tr>
                        <td>{Number(juego.id)}</td>
                        <td>{juego.titulo}</td>
                        <td>{juego.descripcion}</td>
                        <td>{Number(juego.calificacion)}</td>
                        <td>
                          <Row>
                            <Col>
                            <Button variant='dark' onClick={()=>getJuego(BigInt(juego.id))}>Editar</Button>
                            </Col>
                            <Col>
                            <Button variant='dark' onClick={()=>deletejuego(BigInt(juego.id))}>eliminar</Button>
                            </Col>
                          </Row>
                        </td>

                      </tr>
                    ))
                    : <tr></tr>
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>
        <Modal show={show}>
          <Modal.Header closeButton>
          <Modal.Title>EDITAR JUEGOS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormJuego 
                id={Number(juego.id)}
                jTitulo={juego.titulo}
                jDescripcion={juego.descripcion}
                jCalificacion={Number(juego.calificacion)}
                esEditable={true}
                getJuegos={getJuegos}
                setShow={setShow}
            />
          </Modal.Body>
        </Modal>
    </Container>
  );
}

export default App;
