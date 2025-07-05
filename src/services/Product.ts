

export const getProduct = async () => {
  try {
    const response = await fetch(`https://api-frontend-production.up.railway.app/api/products?ft=tenis`);

    if (!response.ok) {
      throw new Error("Error al obtener la información del producto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getProduct:", error);
    throw error;
  }
};

