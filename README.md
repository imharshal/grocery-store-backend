# grocery-store-backend

  Clone the project by `git clone https://github.com/imharshal/grocery-store-backend.git`

  Run `npm install` to install dependencies

  Run `npm run dev` to run the server

  URL  `http://localhost:5000/`

# REST API Documentation

## Create customer

`POST /customer`

#### Request Body
    {
      "name": "Customer Name",
      "email": "customer@domain.com",
      "phone": 1234456786,
    }


#### Response 

    {
      "status": true,
      "customerId": "632f3f5d9238977ad2ac4285",
      "message": "Customer created successfully"
    }
     
 
## Get customer list

`GET /customers`

#### Response 
    { 
      "status": true,
      "customers": [
        {
          "_id": "632efcc084334687fca63a9ac",
          "name": "Customer Name",
          "email": "customer@domain.com",
          "phone": 1234456786,
        },
        ...
        ...
      ]
    }
    
## Create Product

`POST /product`

#### Request Body
    {
      "productCategory" : "Juices",
      "productInfo": "Apple Juice"
    }


#### Response 

    {
      "status": true,
      "productId": "632efe5b4b49b081dc6af22a",
      "message": "Product created successfully"
    }    
     
## Update Product Price method 1

`PUT /product`

#### Request Body
    {
      "productId":"632efe5b4b49b081dc6af22a",
      "price": 234
    }


#### Response 

    {
      "status": true,
      "message": "Product price updated successfully"
    }           

## Update Product Price method 2

`PUT /product/:productId`

#### Request Body
    {
      "price": 234
    }


#### Response 

    {
      "status": true,
      "message": "Product price updated successfully"
    } 

## Get products list

`GET /products`

#### Response 
    { 
      "status": true, 
      "customers": [
        {
          "_id": "632efe5b4b49b081dc6af22a",
          "productCategory": "Juices",
          "productInfo": "Apple Juice",
          "price": 234,
          "quantityAvailable": 10,
        },
        ...
        ...
      ]
    }
    
    
## Create Order

`POST /order`

#### Request Body
    {
      "customerId":"632efcc084334a4fca63a9ac",
      "productList": ["632efe5b4b49b081dc6af22a", "632f138adb7cf72b25806e04"] //array of product IDs
    }


#### Response 

    {
      "status": true,
      "orderId": "632f421a9238977ad2ac428b",
      "message": "Order created successfully"
    }    

## Get order list

`GET /orders`

#### Response 
    { 
      "status": true, 
      "orders": [
          {
            "_id": "632f2d0a10a1134b6b1a2d49",
            "customerId": "632efcc084334a4fca63a9ac",
            "productList": [
              {
                "_id": "632efe5b4b49b081dc6af22a",
                "productCategory": "Juices",
                "productInfo": "Apple Juice",
                "price": 234,
                "quantityAvailable": 10
              },
              {
                "_id": "632f138adb7cf72b25806e04",
                "productCategory": "Snacks",
                "productInfo": "Potato Chips",
                "price": 233,
                "quantityAvailable": 10
              }
            ],
            "totalPrice": 467
          },
          ...
          ...
        ]
    }
    
## Get orders by customer ID

`GET /orders/:customerId`

#### Response 
    {
      "status": true,
      "orders": [
        {
          "_id": "632f2d0a10a1134b6b1a2d49",
          "customerId": "632efcc084334a4fca63a9ac",
          "productList": [
            {
              "_id": "632efe5b4b49b081dc6af22a",
              "productCategory": "Juices",
              "productInfo": "Apple Juice",
              "price": 234,
              "quantityAvailable": 10
            },
            {
              "_id": "632f138adb7cf72b25806e04",
              "productCategory": "Snacks",
              "productInfo": "Potato Chips",
              "price": 233,
              "quantityAvailable": 10
            }
          ],
          "totalPrice": 467
        },
        ...
        ...
      ]
    }

## Get customers with maximum orders

`GET /value-customer`

#### Response 
    {
      "status": true,
      "customers": [
        {
          "_id": {
            "_id": "632f1377db7cf72b25806e02",
            "name": "Customer name",
            "email": "customer@domain.com",
            "phone": 1234567897
          },
          "totalOrders": 6
        },
        ...
        ...
      ]
    }