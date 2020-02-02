import React from 'react';
import StripeProducts from './components/StripeProducts';

function App() {
  const ENDPOINT = 'http://localhost:8080/v1/products';
  const OPTIONS = {
    limit: 3,
    active: null,
    created: null,
    ending_before: null,
    ids: null,
    shippable: null,
    starting_after: null,
    type: null,
    url: null
  }
  
  const onProductClicked = (product) => {
    console.log('onProductClicked', product);
  }

  return (
    <StripeProducts
      endpoint={ENDPOINT}
      options={OPTIONS}
      onProductItemClicked={onProductClicked}
    />
  );
}

export default App;
