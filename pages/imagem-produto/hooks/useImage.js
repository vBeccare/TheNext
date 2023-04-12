import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { getProductByUuid } from "../../../services/product";
import { deleteImage, postImage } from "../../../services/image";

const useImage = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [imagesUrl, setImagesUrl] = useState([]);
  //  const images = [
  // 	 "http://placeimg.com/1200/800/nature",
  // 	 "http://placeimg.com/800/1200/nature",
  // 	 "http://placeimg.com/1920/1080/nature",
  // 	 "http://placeimg.com/1500/500/nature",
  // 	 "http://placeimg.com/1200/800/nature",

  //  ];
  const route = useRouter();
  const inputImage = useRef();

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const getProductImage = () => {
    getProductByUuid({ id: currentQuery }).then((res) => {
      const productImages = res.data.imagem;
      let imageArrayUrl = [];
      let imageArray = [];
      productImages.map((image) => {
        imageArrayUrl.push(image.file);
        imageArray.push(image);
      });

      setImagesUrl(imageArrayUrl);
      setImages(imageArray);
    });
  };

  const addImage = (file, name) => {
    const idProduct = route.query.produto;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      postImage({
        fileName: `prod${idProduct}-${name}`,
        file: reader.result,
        produto: {
          id: idProduct,
        },
      })
        .then(() => {
          alert("Imagem adicionada com sucesso");
          getProductImage();
        })
        .catch(() => {
          alert("Erro ao adicionar imagem");
        });

      return;
    };

    reader.onerror = function (error) {
      alert(
        "Erro ao adicionar imagem " + name + ", mensagem do erro: " + error
      );
      return;
    };
  };

  const onClickInputImage = () => {
    inputImage.current.click();
  };

  const handleRemoveImage = (id) => {
    deleteImage(id).then(() => {
      alert("Imagem removida com sucesso");
      getProductImage();
    });
  };
  const handleSetDefault = () => {};

  const handleUpdateImage = (e) => {
    e.preventDefault();
    let files = e.target.files;
    if (files) {
      addImage(files[0], files[0].name);
    }
  };

  const currentQuery = route.query.produto;

  useEffect(() => {
    if (currentQuery) {
      getProductImage();
    }
  }, [currentQuery]);

  return {
    images,
    currentImage,
    isViewerOpen,
    imagesUrl,
    openImageViewer,
    closeImageViewer,
    addImage,
    onClickInputImage,
    handleRemoveImage,
    handleUpdateImage,
    inputImage,
    handleSetDefault,
  };
};

export default useImage;
