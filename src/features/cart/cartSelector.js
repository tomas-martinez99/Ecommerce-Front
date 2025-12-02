export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.qty, 0);