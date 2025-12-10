// helpers/productNormalizer.js
export function normalizeProduct(form) {
  return {
    sku: form.sku?.trim() || "",
    productName: form.productName?.trim() || "",
    description: form.description?.trim() || "",
    price: parseFloat(form.price) || 0,
    cost: parseFloat(form.cost) || 0,
    stock: parseFloat(form.stock) || 0,
    providerId: parseInt(form.providerId) || 0,
    brandId: parseInt(form.brandId) || 0,
    productGroupId: parseInt(form.productGroupId) || 0
  };
}
