import React, { useState } from 'react';

function Main() {
    const [stocks, setStocks] = useState({ name: '', quantity: '', price: '' });
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [showProductList, setShowProductList] = useState(false);

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setStocks({ ...stocks, name: query });
        fetchProducts(); // Update stocks state to reflect the search query
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStocks({ ...stocks, [name]: value });
    };

    const addStock = (e) => {
        e.preventDefault();
        if (stocks.name && stocks.quantity && stocks.price) {
            console.log({ ...stocks });
            fetch('/api/product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stocks),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to add stock');
                    }
                    console.log('Stock added successfully');
                    setStocks({ name: '', price: '', quantity: '' });

                })
                .catch(error => {
                    console.error('Error adding stock:', error.message);
                });
        }
    };

    const fetchProducts = () => {
        // Fetch products based on the search query
        fetch('/api/search?query=' + stocks.name)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                return response.json();
            })
            .then(data => {
                setSearchedProducts(data.allproduct);
                setShowProductList(true);
            })
            .catch(error => {
                console.error('Error fetching product data:', error.message);
            });
    }

    return (
        <div className="container mx-auto px-20">
            <div className='flex-none'>
                <h1 className="text-3xl font-bold mt-4">Stocks</h1>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={stocks.name} // Use stocks.name for value
                    onChange={handleSearchInputChange}
                    className="bg-gray-200 text-black py-2 px-4 mr-2 rounded-md focus:outline-none focus:bg-white"
                />
            </div>
            <div className="flex my-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Stock Name"
                    value={stocks.name}
                    onChange={handleInputChange}
                    className="mr-2 px-2 py-1 border border-gray-300"
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Stock Quantity"
                    value={stocks.quantity}
                    onChange={handleInputChange}
                    className="mr-2 px-2 py-1 border border-gray-300"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={stocks.price}
                    onChange={handleInputChange}
                    className="mr-2 px-2 py-1 border border-gray-300"
                />
                <button onClick={addStock} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Add Stock</button>
            </div>
            {showProductList && (
                <div className="container mx-auto py-4 px-8">
                    <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {searchedProducts.map(product => (
                                <tr key={product._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Main;
