import { useCallback, useEffect, useState } from "react";
import { getProductByUuid } from "../../../services/product";
import { useRouter } from "next/router";
import { getMoneyMask } from "../../../utils/formatters";

const useVisualizarProduto = () => {
  const route = useRouter();
  const [nome, setNome] = useState();
  const [descricao, setDescricao] = useState();
  const [preco, setPreco] = useState();
  const [avaliacao, setAvaliacao] = useState();
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [imagePrincipal, setImagePrincipal] = useState();
  const [imagePrincipalId, setImagePrincipalId] = useState();

  const currentQuery = route.query.produto;

  const selectedViewImage = (imgView) => {
    const currentImage = images.find((image) => {
      return image.id === imgView;
    });
    setImagePrincipal(currentImage?.file);
    setImagePrincipalId(images.indexOf(currentImage));
  };

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    if (currentQuery) {
      getProductByUuid({ id: currentQuery }).then((res) => {
        const productInfo = res.data;
        setPreco(getMoneyMask(productInfo.preco, "R$ ", 2));
        setNome(productInfo.name);
        setAvaliacao(productInfo.avaliacao)
        setDescricao(productInfo.descricao);
        let imageArrayUrl = [];
        let imageArray = [];
        productInfo.imagem.map((image) => {
          imageArrayUrl.push(image.file);
          imageArray.push(image);
        });
        setImages(imageArray);
        setImagesUrl(imageArrayUrl);
        const currentImage = productInfo.imagem.find((image) => {
          return image.id === productInfo.imgPrincipal;
        });
        setImagePrincipal(currentImage?.file);
        setImagePrincipalId(productInfo.imagem.indexOf(currentImage));
      });
    }
  }, [currentQuery]);

  return {
    nome,
    descricao,
    preco,
    images,
    imagePrincipal,
    selectedViewImage,
    isViewerOpen,
    currentImage,
    closeImageViewer,
    openImageViewer,
    imagePrincipalId,
    imagesUrl,
    avaliacao
  };
};

export default useVisualizarProduto;
