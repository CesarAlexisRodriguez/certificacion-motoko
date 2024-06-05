import React from "react";
import {Container, Row, Col, Card} from 'react-bootstrap'
export const List = () => {
    return(
        <Container>
            <Row>
                <h1>Funciones principales de un CRUD</h1>
                <Col>Agregar</Col>
                <Col>Eliminar</Col>
                <Col>Actualizar</Col>
                <Col>Leer</Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Lista de videojuegos</Card.Title>
                        <Card.Subtitle>Lista de videojuegos agregados ultimamente</Card.Subtitle>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}
export default List;