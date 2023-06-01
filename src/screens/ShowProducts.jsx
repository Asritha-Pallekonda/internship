import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap'
import ProductCard from '../components/ProductCard';
import {Link} from 'react-router-dom'

const ShowProducts = () => {


    const [products, setProducts] = useState([])

    useEffect(() => {
        const getProductsData = async () => {
            const { data } = await axios.get('/api/products/allProducts')
            console.log(data)
            setProducts(data)
        }
        getProductsData()
    }, [])

    return (
        <>
        <span class = "border border-dark">
           <Container  className="justify-content-center p-2 border-dark">
            <div className = "row container align-items-center text-dark bg-warning">
                <div className = "col-lg-4"></div>
                <div className = "col-lg-4"><h1 className='text-center text-bold'>Show All Products</h1></div>
                <div className = "col-lg-4" style={{alignItems:'center',justifyContent:'flex-end',display:'flex'}}>
                <button type ='button' class='btn btn-light border-dark'><Link class='text-dark' style={{textDecoration:'none'}} to='/addProduct'>Add new product </Link></button>
                </div> 
                
            </div>   
            <hr />

               <Row>
                    {
                        products.map(product => {
                            return <Col md={6} lg={4} sm={12} key={product.id}>
                                <ProductCard product={product} />
                            </Col>
                        })
                    }
               </Row>

           </Container>
        </span>
           
        </>
    )
}

export default ShowProducts
