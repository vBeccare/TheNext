import { Flex, Image } from "@chakra-ui/react";

const Rating = ({ avaliacao }) => {
  if (avaliacao === 0) {
    return (
      <Flex>
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
      </Flex>
    );
  }
  if (avaliacao === 0.5) {
    return (
      <Flex>
        <Image src="/meiaestrela.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
      </Flex>
    );
  }
  if (avaliacao === 1) {
    return (
      <Flex>
        <Image src="/estrelacheia.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
      </Flex>
    );
  }
  if (avaliacao === 1.5) {
    return (
      <Flex>
        <Image src="/estrelacheia.png" />
        <Image src="/meiaestrela.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
      </Flex>
    );
  }
  if (avaliacao === 2) {
    return (
      <Flex>
        <Image src="/estrelacheia.png" />
        <Image src="/estrelacheia.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
      </Flex>
    );
  }
  if (avaliacao === 2.5) {
    return (
      <Flex>
        <Image src="/estrelacheia.png" />
        <Image src="/estrelacheia.png" />
        <Image src="/meiaestrela.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
      </Flex>
    );
  }
  if (avaliacao === 3) {
    return (
      <Flex>
        <Image src="/estrelacheia.png" />
        <Image src="/estrelacheia.png" />
        <Image src="/estrelacheia.png" />
        <Image src="/estrelavazia.png" />
        <Image src="/estrelavazia.png" />
      </Flex>
    );
  }
  if (avaliacao === 3.5) {
    return (
      <Flex>
        <Image src="/estrelacheia.png" />
        <Image src="/estrelacheia.png" />
        <Image src="/estrelacheia.png" />
        <Image src="/meiaestrela.png" />
        <Image src="/estrelavazia.png" />
      </Flex>
    );
  }
  if (avaliacao === 4) {
    return (
      <Flex>
        <Image src="/estrelacheia.png" />
        <Image src="/estrelacheia.png" />
        <Image src="/estrelacheia.png" />
        <Image src="/estrelacheia.png" />
        <Image src="/estrelavazia.png" />
      </Flex>
    );
  }
  if (avaliacao === 4.5) {
    return (
      <Flex>
        <Image src="/estrelacheia.png" />
        <Image src="/estrelacheia.png" />
        <Image src="/estrelacheia.png" />
        <Image src="/estrelacheia.png" />
        <Image src="/meiaestrela.png" />
      </Flex>
    );
  }
  return (
    <Flex>
      <Image src="/estrelacheia.png" />
      <Image src="/estrelacheia.png" />
      <Image src="/estrelacheia.png" />
      <Image src="/estrelacheia.png" />
      <Image src="/estrelacheia.png" />
    </Flex>
  );
};

export default Rating;
