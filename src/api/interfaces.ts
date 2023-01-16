import { api } from "../services/api";


// ****************************************************************************************************
// endpoint: getSuppliersData
// ****************************************************************************************************
export interface ISupplier {
    supplierID: number
    companyName: string
    contactName: string
    contactTitle: string
    address: string
    city: string
    region: string
    postalCode: string
    country: string
    phone: string
    fax: string
    HomePage: string
}
export interface IQuery {
    queryInfo: string
    queryTS: string
    queryExecutionTime: string
}

export type TQueryResponse = Array<IQuery>
export type TSuppliersList = Array<ISupplier>

export type TGetSuppliersListResponse = Promise<IGetSuppliersResponse>

export interface IGetSuppliersResponse {
    queryInfo: TQueryResponse
    data: TSuppliersList
}

function getSuppliersData(): TGetSuppliersListResponse {
    return api.get('/suppliers');
}


// ****************************************************************************************************
// endpoint: getSuppliersID Data
// ****************************************************************************************************
export interface ISupplier {
    supplierID: number
    companyName: string
    contactName: string
    contactTitle: string
    address: string
    city: string
    region: string
    postalCode: string
    country: string
    phone: string
    fax: string
    HomePage: string
}
export interface IQuery {
    queryInfo: string
    queryTS: string
    queryExecutionTime: string
}

export type TQueryIdResponse = Array<IQuery>
export type TSuppliersIdList = Array<ISupplier>

export type TGetSuppliersIdListResponse = Promise<IGetSuppliersIdResponse>

export interface IGetSuppliersIdResponse {
    queryInfo: TQueryIdResponse
    data: TSuppliersIdList
}

function getSuppliersIdData(id: number): TGetSuppliersIdListResponse {
    return api.get(`/suppliers/${id} `);
}


// ****************************************************************************************************
// endpoint: getProductsData
// ****************************************************************************************************
export interface IProducts {
    categoryID: number
    discontinued: boolean
    productID: number
    productName: string
    quantityPerUnit: string
    reorderLevel: string
    supplierID: number
    unitPrice: string
    unitsInStock: string
    unitsOnOrder: string

}
export interface IQuery {
    queryInfo: string
    queryTS: string
    queryExecutionTime: string
}

export type TQueryProducts = Array<IQuery>
export type TProductsList = Array<IProducts>

export type TGetProductsListResponse = Promise<IGetProductsResponse>

export interface IGetProductsResponse {
    queryInfo: TQueryProducts
    data: TProductsList
}

function getProductsData(): Promise<IGetProductsResponse> {
    return api.get('/products');
}


// ****************************************************************************************************
// endpoint: getProduct Data
// ****************************************************************************************************
export interface IProduct {
    productID: number
    productName: string
    categoryID: number
    quantityPerUnit: string
    unitPrice: string
    unitsInStock: string
    unitsOnOrder: string
    reorderLevel: string
    discontinued: boolean
    supplierID: number
}
export interface ISupplier {
    supplierID: number
    companyName: string
    contactName: string
    contactTitle: string
    address: string
    city: string
    region: string
    postalCode: string
    country: string
    phone: string
    fax: string
    HomePage: string
}
export interface IQuery {
    queryInfo: string
    queryTS: string
    queryExecutionTime: string
}
export interface IProductData {
    products: IProduct
    suppliers: ISupplier
}

export type TQueryProductIdResponse = Array<IQuery>
export type TProductIdList = Array<IProductData>

export type TGetProductIdListResponse = Promise<IGetProductIdResponse>

export interface IGetProductIdResponse {
    queryInfo: TQueryProductIdResponse
    data: TProductIdList
}

function getProductData(id: number): TGetProductIdListResponse {
    return api.get(`/products/${id} `);
}


// ****************************************************************************************************
// endpoint: getOrdersData
// ****************************************************************************************************
export interface IOrderslist {
    OrderID: number
    total_products_price: string
    total_products_items: string
    total_products_quantity: string
    ShippedDate: string
    ShipName: string
    ShipCity: string
    ShipCountry: string
}

export type TOrderList = Array<IOrderslist>

export type TGetOrdersListResponse = Promise<IGetOrderResponse>

export interface IGetOrderResponse {
    data: TOrderList
}

function getOrdersData(): TGetOrdersListResponse {
    return api.get('/orders');
}


// ****************************************************************************************************
// endpoint: Order Data
// ****************************************************************************************************
export interface IOrder {
    total_products_discount: string,
    total_products_price: string,
    total_products_items: string,
    total_products: string,
    CustomerID: string,
    OrderID: number,
    ShippedDate: string,
    ShipName: string,
    ShipCity: string,
    CompanyName: string,
    ShipCountry: string,
    Freight: string,
    OrderDate: string,
    RequiredDate: string,
    ShipRegion: string,
    ShipPostalCode: string
}
export interface IProductInOrder {
    ProductID: number
    ProductName: string
    Quantity: string
    UnitPrice: string
    total_products_price: string
    Discount: string
}
export interface IQuery {
    queryInfo: string
    queryTS: string
    queryExecutionTime: string
}
export interface IOrderData {
    orderInfo: Array<IOrder>
    productsInOrder: Array<IProductInOrder>
}
export interface IGetOrderIdResponse {
    queryInfo: TQueryOrderResponse
    data: IOrderData
}

export type TQueryOrderResponse = Array<IQuery>
export type TGetOrderIdListResponse = Promise<IGetOrderIdResponse>



function getOrderData(id: number): TGetOrderIdListResponse {
    return api.get(`/orders/${id} `);
}



// ****************************************************************************************************
// endpoint: getCustomer
// ****************************************************************************************************
export interface ICustomer {
    customerID: string
    companyName: string
    contactName: string
    contactTitle: string
    address: string
    city: string
    region: string
    postalCode: string
    country: string
    phone: string
    fax: string
}

export interface IQuery {
    queryInfo: string
    queryTS: string
    queryExecutionTime: string
}


export type TQueryCustomerResp = Array<IQuery>
export type TCustResp = Array<ICustomer>
export type TGetCustomerResponse = Promise<IGetCustomerResponse>

export interface IGetCustomerResponse {
    queryInfo: TQueryCustomerResp
    data: TCustResp
}

function getCustomerData(id: string): TGetCustomerResponse {
    return api.get(`/customers/${id} `);
}

// ****************************************************************************************************
// endpoint: getCustomersData
// ****************************************************************************************************
export interface ICustomerslist {
    customerID: string
    companyName: string
    contactName: string
    contactTitle: string
    address: string
    city: string
    region: string
    postalCode: string
    country: string
    phone: string
    fax: string
}

export interface IQueryCustomers {
    queryInfo: string
    queryTS: string
    queryExecutionTime: string
}

export type TCustomersList = Array<ICustomerslist>
export type TQueryCustomers = Array<IQueryCustomers>


export type TGetCustomersListResponse = Promise<IGetCustomersResponse>

export interface IGetCustomersResponse {
    data: TCustomersList
    queryInfo: TQueryCustomers
}

function getCustomersData(): TGetCustomersListResponse {
    return api.get('/customers');
}



// ****************************************************************************************************
// endpoint: getEmployeesData
// ****************************************************************************************************
export interface IEmployeeslist {
    employeeID: number
    lastName: string
    firstName: string
    title: string
    titleOfCourtesy: string
    birthDate: string
    hireDate: string
    address: string
    city: string
    region: string
    postalCode: string
    country: string
    homePhone: string
    extension: string
    notes: string
    reportsTo: number
}

export interface IQueryEmployess {
    queryInfo: string
    queryTS: string
    queryExecutionTime: string
}

export type TEmployeesList = Array<IEmployeeslist>
export type TQueryEmp = Array<IQueryEmployess>


export type TGetEmployessListResponse = Promise<IGetEmployeesResponse>

export interface IGetEmployeesResponse {
    data: TEmployeesList
    queryInfo: TQueryEmp
}

function getEmployeesData(): TGetEmployessListResponse {
    return api.get(`/employees`);
}


// ****************************************************************************************************
// endpoint: getEmployee
// ****************************************************************************************************
export interface IEmployee {
    employeeID: number
    lastName: string
    firstName: string
    title: string
    titleOfCourtesy: string
    birthDate: string
    hireDate: string
    address: string
    city: string
    region: string
    postalCode: string
    country: string
    homePhone: string
    extension: string
    notes: string
    reportsTo: number
}
export interface IReport {
    employeeID: number
    lastName: string
    firstName: string
    title: string
    titleOfCourtesy: string
    birthDate: string
    hireDate: string
    address: string
    city: string
    region: string
    postalCode: string
    country: string
    homePhone: string
    extension: string
    notes: string
    reportsTo: null
}

export interface IQuery {
    queryInfo: string
    queryTS: string
    queryExecutionTime: string
}

// export interface IEmployeeData {
//     employees: IEmployee
// }

export type TQueryResp = Array<IQuery>
export type TEmployeeResponse = Array<IEmployee>
export type TGetEmployeeResponse = Promise<IGetEmployeeResponse>

export interface IGetEmployeeResponse {
    queryInfo: TQueryResp
    data: TEmployeeResponse
}

function getEmployeeData(id: number): TGetEmployeeResponse {
    return api.get(`/employees/${id} `);
}



export {
    getSuppliersData,
    getSuppliersIdData,

    getEmployeesData,
    getEmployeeData,

    getOrdersData,
    getOrderData,

    getProductsData,
    getProductData,

    getCustomersData,
    getCustomerData
}