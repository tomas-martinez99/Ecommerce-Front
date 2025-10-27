// src/hooks/products/useProductImages.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  uploadProductImage,
  deleteProductImage,
  setMainProductImage,
} from "../../services/productImagesServices/productImages.service";

export const useProductImages = (productId) => {
  const queryClient = useQueryClient();

   const invalidate = () => {
    queryClient.invalidateQueries(["products"]); // refresca lista de productos
    queryClient.invalidateQueries(["product", productId]); // opcional: detalle
  };

  const uploadMutation = useMutation({
    mutationFn: ({ file, isMain }) => uploadProductImage(productId, file, isMain),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // refresca lista de productos
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (imageId) => deleteProductImage(productId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const setMainMutation = useMutation({
    mutationFn: (imageId) => setMainProductImage(productId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return {
    uploadImage: uploadMutation.mutateAsync,
    deleteImage: deleteMutation.mutateAsync,
    setMainImage: setMainMutation.mutateAsync,
    isUploading: uploadMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
    isSettingMain: setMainMutation.isLoading,
    refetchImages: invalidate,
  };
};
