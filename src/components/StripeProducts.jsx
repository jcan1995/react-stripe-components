import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BREAKPOINTS = {
    small: 400,
    medium: 850
};

const ProductsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    @media screen and (max-width: ${BREAKPOINTS.small}px) {
        flex-direction: column;
    }
`;

const ProductItemWrapper = styled.div`
   max-height: 250px;
   max-width: 250px;
   height: 250px;
   width: 250px;
   margin: 5px;
   border-radius: 2px;
   padding: 10px;
   box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);

   &:hover {
    box-shadow: 2px 4px 4px 2px rgba(0,0,0,0.34), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
    cursor: pointer;
   }

   @media screen and (max-width: ${BREAKPOINTS.small}px) {
    margin: 0 auto;
}
`;

const ProductName = styled.p`
    text-align: center;
`;

const ProductImage = styled.img`
    display: block;
    margin: 0 auto;
    max-height: 200px;
    max-width: 200px;
`;

const ProductDescription = styled.p`
    text-align: center;
`;

function StripeProducts(props) {

    const [products, setProducts] = useState(null);
    
    useEffect(() => {
        const { endpoint, options } = props;
        fetchProducts(endpoint, options);

    }, []);

    const fetchProducts = async (endpoint, options) => {
        const productsPromise = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        })

        const response = await productsPromise.json();
        const products = response.data;
        setProducts(products);
    }

    const onProductItemClicked = (item) => {
        const { onProductItemClicked } = props;

        onProductItemClicked && onProductItemClicked(item);
    }

    const getProductViews = () => {
        let views;
        views = products && products.map((item) => {
            const { name, description, images } = item;
            return (
                <ProductItemWrapper onClick={() => onProductItemClicked(item)}>
                    <ProductName>{name}</ProductName>
                    <ProductImage src={images[0]} />
                    <ProductDescription>{description}</ProductDescription>
                </ProductItemWrapper>
            );
        });

        return views;
    }

    const productViews = products && getProductViews();

    return ( 
        <ProductsWrapper>
            {productViews}
        </ProductsWrapper>
    );
}
 
export default StripeProducts;