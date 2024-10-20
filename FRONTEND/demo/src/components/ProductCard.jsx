import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, IconButton, useColorModeValue, Image, Text, useToast, useDisclosure, VStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, ModalFooter, Button} from '@chakra-ui/react'
import React from 'react'
import { useProductStore } from '../store/Product.js';
import { useState } from 'react';


const ProductCard = ({product}) => {

    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct, updateProduct} = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDelete = async (pid) => {
        const {success, message} = await deleteProduct(pid);
        if(!success){
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }else{
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        }
    }

    const handleUpdate = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(pid, updatedProduct);
        onClose();
        if(!success){
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }else{
            toast({
                title: 'Success',
                description: "Product Updated Successfully",
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        }
    }

  return (<div>
    
    <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{ transform: "translateY(-5px)", shadow: 'xl'}}
        bg={bg}
    >
        <Image src={product.image} h={48} w='full' objectFit= 'cover' alt='Product Image' />

        <Box p={4}>
            <Heading as='h3' size={2} mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                Rs.{product.price}
            </Text>

            <HStack spacing={2}>
                <IconButton icon={ < EditIcon />} onClick={onOpen} colorScheme='blue' />
                <IconButton icon = {<DeleteIcon />} onClick={() => handleDelete(product._id)} colorScheme='red' />
            </HStack>
        </Box>

        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, name:e.target.value})}
                            />
                            <Input
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdate(product._id, updatedProduct)}>Update</Button>
                        <Button variant={'ghost'} onClick={onClose}>Cancel</Button> 
                    </ModalFooter>
                </ModalContent>
        </Modal>
    </Box>
    </div>
  )
}

export default ProductCard
