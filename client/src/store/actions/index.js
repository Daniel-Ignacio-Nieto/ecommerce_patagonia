import axios from "axios";

import {
  GET_PRODUCTS,
  ERROR_MESSAGE,
  MODIFY_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  ADD_CATEGORY,
  GET_CATEGORIES,
  MODIFY_CATEGORY,
  DELETE_CATEGORY,
  GET_PRODUCTS_BY_CATEGORY,
  SEARCH_PRODUCT,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_JOIN_CATEGORY,
  POST_PRODUCT_JOIN_CATEGORY,
  DELETE_PRODUCT_JOIN_CATEGORY,
  GET_CART_BY_IDUSER,
  POST_CREATE_CART,
  PUT_CHANGE_QUANTITY,
} from "../constants/constants.js";

const url = "http://localhost:3001/";

//Trae todos los productos
export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}products`);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al mostrar productos",
    });
  }
};
//agregar producto
export const addProduct = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}products/`, payload);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al añadir producto",
    });
  }
  // catIds.forEach(catId => {
  //     axios.put(`http://${url}/products/${productId}/category/${catId}`)
  //         .then(res => {
  //             if (res.status === 200) {
  //                 dispatch({
  //                     type: ADD_CATEGORY_PRODUCT,
  //                     product: res.data.data
  //                 })
  //             }
  //             else {
  //                 dispatch({
  //                     type: ERROR_MESSAGE,
  //                     message: 'Error al añadir categoría(s) al producto'
  //                 })
  //             }
  //         })
  // })
};

//ACTUALIZAR PRODUCTO
export const modifyProduct = (id, producto) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}products/${id}`, producto);
    dispatch({
      type: MODIFY_PRODUCT,
      payload: res.data[1][0],
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al actualizar producto",
    });
  }
};

//Borra un producto
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${url}products/${id}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al eliminar el producto",
    });
  }
};

//Trae todas las categorias
export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}categories`);
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al mostrar categorías",
    });
  }
};

// Agrega una categoría
export const addCategory = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}categories/`, payload);
    dispatch({
      type: ADD_CATEGORY,
      payload: res.data[0],
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al añadir categoría",
    });
  }
};

// Modifica una categoría
export const updateCategory = (id, category) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}categories/${id}`, category);
    dispatch({
      type: MODIFY_CATEGORY,
      payload: res.data[1][0],
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al actualizar una categoría",
    });
  }
};

// Borra una categoría
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${url}categories/${id}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al eliminar la categoría",
    });
  }
};

// Trae LOS productos por la categoria
export const getProductByCategory = (catName) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}products/categoria/${catName}`);
    dispatch({
      type: GET_PRODUCTS_BY_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al encontrar los productos",
    });
  }
};

//Funcion de SearchBar Busca por nombre
export const searchProduct = (productName) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}products/search?query=${productName}`);
    dispatch({
      type: SEARCH_PRODUCT,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al buscar el producto",
    });
  }
};

// Trae producto por id
export const getProductById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}products/${id}`);
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Ese id no existe",
    });
  }
};

// Trae todos los productos con sus respectivas categorias
export const getProductJoinCategory = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}products/?include="categories"`);
    dispatch({
      type: GET_PRODUCT_JOIN_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al encontrar los productos con sus categorias",
    });
  }
};

// Agrega una categoria a un producto
export const postProductJoinCategory = (idProd, idCat) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}relations/${idProd}/category/${idCat}`);
    dispatch({
      type: POST_PRODUCT_JOIN_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al agregar categoria a un producto",
    });
  }
};

// Elimina una categoria a un producto
export const deleteProductJoinCategory = (idProd, idCat) => async (
  dispatch
) => {
  try {
    const res = await axios.delete(
      `${url}relations/${idProd}/category/${idCat}`
    );
    console.log(res.data, "VENGO DEL ACTIONS");
    dispatch({
      type: DELETE_PRODUCT_JOIN_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al eliminar categoria de un producto",
    });
  }
};

//Trae el carrito del usuario con sus productos agregados
export const getCartByUser = (idUser) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}users/?where={"id":${idUser}}&include=[{model: "carrito", where:{order_status:"carrito"}},
        {model: "products"}]`);
    dispatch({
      type: GET_CART_BY_IDUSER,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para acceder al carrito",
    });
  }
};

//Crea un carrito para un usuario
export const postCreateCart = (idUser) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}orders/${idUser}`);
    dispatch({
      type: POST_CREATE_CART,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para crear el carrito",
    });
  }
};

export const putQuantity = (idUser, idOrder, idProduct, cant) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}users/${idUser}/cart`, idOrder, idProduct, cant );
    dispatch({
      type: PUT_CHANGE_QUANTITY,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para modificar la cantidad dle producto",
    });
  }
};
