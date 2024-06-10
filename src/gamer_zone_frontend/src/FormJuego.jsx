import Form from 'react-bootstrap/Form';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import React, {useState} from 'react'
import { gamer_zone_backend } from 'declarations/gamer_zone_backend';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const FormJuego = (
    {
        id = null,
        jTitulo = null,
        jDescripcion = null,
        jCalificacion = null,
        esEditable = null,
        getJuegos = null,
        setShow = null
    }


) => {
    const [titulo, setTitulo] = useState(jTitulo ? jTitulo : "");
    const [descripcion, setDescripcion] = useState(jDescripcion ? jDescripcion : "");
    const [calificacion, setCalificacion] = useState(jCalificacion ? jCalificacion : BigInt(0));
   

    const navigate = useNavigate();
    
    
  /*  const onChangeTitulo = (e)=>{
        e.preventDefault();
        console.log('valor del target',e.target)
        const preTitulo = e.target.value;
        setTitulo(preTitulo);
    }*/
        const onChangeTitulo = (e)=>{
          e.preventDefault();
          const preTitulo = e.target.value;
          setTitulo(preTitulo);
      }
      


    const onChangeDescripcion = (e)=>{
        e.preventDefault();
        const preDescripcion = e.target.value;
        setDescripcion(preDescripcion);
    }

    const onChangeCalificacion = (e)=>{
        e.preventDefault();
        const preCalificacion = e.target.value;
        setCalificacion(preCalificacion);
    }

    function createJuegos() {
        Swal.fire('Guardando el juego que acabas de agregar')
        Swal.showLoading();
        gamer_zone_backend.addjuego(titulo, descripcion, BigInt(calificacion)).then(juego => {
         console.log(titulo, descripcion,calificacion);
         
          Swal.fire({
            icon: 'success',
            title: "Juego guardado",
            showConfirmButton: false,
            timer: 1500
          }).then(() => navigate('/'));
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: "opsssss, no se pudo",
              });
              console.log("Error al agregar el juego", err,titulo)
        });
      }


      function updatejuego() {
        Swal.fire('Actualizando el juego, espere')
        Swal.showLoading();
        gamer_zone_backend.updatejuego(BigInt(id), titulo, descripcion, BigInt(calificacion)).then(() => {
          Swal.fire({
            icon: 'Success',
            title: "Juego actualizado",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            setShow(false);
            getJuegos
          });
        }).catch((err)=>{
            Swal.fire({
                icon: 'error',
                title: "opsssss, no se pudo",
              });
              console.log("Error al actualizar el juego", err)
        })
      }



    return (
        <Container className='m-5'>
            <Row>
                <Col>
                <Card>
                    <Card.Title>{esEditable ? 'editar' : 'agregar'}Agregar videojuego</Card.Title>
                    <Card.Body>
                    <Form>
                        <Row>
                            <Col>
                            <Form.Group className="mb-3">
                            <Form.Label>Titulo del videojuego:</Form.Label>
                            <Form.Control defaultValue={titulo} name='titulo' onChange={onChangeTitulo} type="text" placeholder="ingrese el titulo" />
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>           
                             <Form.Group className="mb-3">
                             <Form.Label>Ingresa la descripcion del videojuego:</Form.Label>
                             <Form.Control defaultValue={descripcion} name='descripcion' onChange={onChangeDescripcion} as="textarea" placeholder="ingrese la descripcion" />
                             </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                            <Form.Group className="mb-3">
                            <Form.Label>Ingresa la calificacion:</Form.Label>
                            <Form.Control  defaultValue={calificacion} name='calificacion' onChange={onChangeCalificacion} type="number" placeholder="ingrese la calificacion" />
                            </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <Button variant="primary" onClick={esEditable ? updatejuego : createJuegos}>
                            {esEditable ? "Editar" : "Guardar"} Videojuego
                             </Button>
                            </Col>
                        </Row>
                        </Form>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
      );
    }
export default FormJuego;