import React, { useEffect, useState } from 'react'
import {Card, Button, Container, Form, Row, Col, FormLabel} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'
import moment from 'moment'

const ProductDetail = () => {

    const { id } = useParams()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [productDescription, setProductDescription] = useState('')
    const [published, setPublished] = useState(true)
    const [productImage, setProductImage] = useState('')


    // review rating  description
    const [reviews, setReviews] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [stocktype, setStocktype] = useState('')


    useEffect(() => {

        const getSingleProductData = async () => {
            const { data } = await axios.get(`/api/products/getProductReviews/${id}`)
            console.log(data)

            setTitle(data.title)
            setPrice(data.price)
            setProductDescription(data.description)
            setPublished(data.published)
            setProductImage(data.image)

            // for reviews
            setReviews(data.review)


        }
        getSingleProductData()

    },[id])



    // handling Delete
    const handleDelete = async (id) => {
        await axios.delete(`/api/products/${id}`)
        history.push('/')
    }

    // to add review
    
    const addReviewHandler = async (e) => {

        e.preventDefault()

        let review = {
            product_id: id,
            quantity: quantity,
            date:date,
            stocktype:stocktype,
            description: description
        }

        await axios.post(`/api/products/addReview/${id}`, review)

        history.push('/')
    }



    

    return (
        <>

        <Container className="mt-10 p-4">
        <h1 className="text-center text-dark bg-warning">Detail Product</h1>
        <hr />

        <Row>
            <Col md={8} lg={8} sm={8}>
                <Card className='shadow-lg m-3 p-2 rounded bg-warning'>
                        <Card.Img src={`http://localhost:3000/${productImage}`} fluid />
                        <Card.Body>
                            <Card.Title>Title: {title}</Card.Title>
                            <Card.Title className="text-dark">Price: ₹{price}</Card.Title>
                            <Card.Title classname="text-dark">
                                Description: {productDescription} 
                            </Card.Title>
                            <Card.Title>
                                Published: {published ? (<small>True</small>) : (<small>false</small>)}
                            </Card.Title>
                        <br />

                    
                            <Link to={`/product/edit/${id}`}>
                                <Button className ="btn btn-light text-dark">Edit</Button>
                            </Link>
                            
                            <Button className="btn btn-danger text-light m-2" onClick={() => handleDelete(id)}>Delete</Button> 
                            <button type ='button' class='btn btn-light text-dark float-right'><Link class='text-dark' style={{textDecoration:'none'}} to='/'> Back </Link></button>
                    </Card.Body>        
                </Card>
            </Col>


                <Col md={4} lg={4} sm={4}>

                    <h2 className='text-center border-dark'>Stock Entry</h2>
                    <hr />

                        <Form onSubmit={addReviewHandler}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label> Quantity </Form.Label>
                                <Form.Control
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    type="number"
                                />
                            </Form.Group>

                        
                            <Form.Group className="mb-3" controlId="stocktype">

                                <Form.Label>Stock Type</Form.Label>


                                <Form.Select value={stocktype} onChange={(e) => setStocktype(e.target.value)} >

                                    <option disabled>Select Stock Update Type</option>

                                    <option value="Newly Purchased">Newly Purchased</option>

                                    <option value="Current Stock">Current Stock</option>

                                </Form.Select>


                            </Form.Group>

                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Pick Date</Form.Label>
                                <Form.Control
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                        type='date'
                                    />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label> Stock info </Form.Label>
                                <Form.Control
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    as="textarea"
                                    />
                            </Form.Group>
                            

                            <Button variant="bg-light text-dark border-dark" type="submit">
                                Add Entry
                            </Button>
                        </Form>
                        
                         <br />

                        
                        <h5>Product Stocks</h5>
                        <hr />

                        {reviews.length > 0 ? (
                            reviews.map(review => {
                            return <p key={review.id}> Quantity: {review.quantity}<br/> 
                            Stock Type:{review.stocktype}<br/>
                            Date:{moment(review.date).format('D MMM YYYY')}<br/>
                            Description:{review.description}
                            </p>
                            })
                            
                            
                        ): ( <p> No reviews for this product </p> )}

                        
                </Col>
        </Row>



                
        </Container>

       



        </>
    )
}

export default ProductDetail
