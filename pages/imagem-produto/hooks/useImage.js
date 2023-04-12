import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { getProductByUuid, updateProduct } from "../../../services/product";
import { deleteImage, postImage } from "../../../services/image";

const useImage = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [imagePrincipal, setImagePrincipal] = useState();
  const route = useRouter();
  const inputImage = useRef();

  const idProduct = route.query.produto;

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
      setImagePrincipal(res.data.imgPrincipal);
    });
  };

  const addImage = (file, name) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      if (images.length === 0) {
      }
      postImage({
        fileName: `prod${idProduct}-${name}`,
        file: reader.result,
        produto: {
          id: idProduct,
        },
      })
        .then(() => {
          alert("Imagem adicionada com sucesso");

          getProductByUuid({ id: currentQuery }).then((res) => {
            const newImage = res.data.imagem[0];
            console.log({ newImage });
            const payload = { id: idProduct, imgPrincipal: newImage.id };
            updateProduct(payload).then(() => {
              getProductImage();
            });
          });
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
  const handleSetDefault = (id) => {
    const payload = { id: idProduct, imgPrincipal: id };
    updateProduct(payload)
      .then(() => {
        getProductImage();
      })
      .catch((err) => {
        alert("Não foi possível definir a imagem como principal", err);
      });
  };

  const handleUpdateImage = (e) => {
    e.preventDefault();
    let files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        addImage(files[i], files[i].name);
      }
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
    imagePrincipal,
  };
};

export default useImage;
