import {
  Box,
  Center,
  Checkbox,
  Flex,
  HStack,
  Image,
  Show,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack
} from "@chakra-ui/react";
import {Header} from "../Header";
import React from "react";
import AddImage from "../../assets/images/add-image.svg";
import {CustomInput} from "../CustomInput";
import {CustomButtonInput} from "../CustomButtonInput";
import ImageUploading from "react-images-uploading";

interface SelectionType {
  label: string;
  value: string;
}

export const Catalogue = () => {
  const categorySelection: SelectionType[] = [
    {
      label: "Collectibles",
      value: "collectibles"
    }, {
      label: "Accessories",
      value: "accessories"
    }, {
      label: "T-Shirt",
      value: "t-shirt"
    }
  ]
  const conditionSelection: SelectionType[] = [
    {
      label: "New",
      value: "new"
    },
    {
      label: "Good",
      value: "good"
    },
    {
      label: "Fair",
      value: "fair"
    },
    {
      label: "Bad",
      value: "bad"
    }
  ]
  const [height, setHeight] = React.useState(0)
  const [image, setImage] = React.useState<any[]>([])
  const toast = useToast()
  const onChange = (imageList: any, addUpdateIndex: any) => {
    //   add image list into image remain item
    if (imageList.length + 1 <= 5) {
      setImage([...imageList, ...image]);
    } else {
      toast({
        description: "You can only upload 5 images",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleRemove = (index: number) => {
    const newImage = image.filter((item, i) => i !== index)
    setImage(newImage)
  }

  return (
    <Box>
      <Show above={"sm"}>
        <Header callBack={setHeight}/>
        <Flex justifyContent={"space-between"} mt={height} mx={20}>
          <Show>
            <Flex justifyContent={"center"} w={"45%"} borderRightWidth={1} borderRightColor={"#202020"}
                  position={"fixed"}
                  height={"100%"} pt={10}>
              <Tabs w={"80%"} size={"lg"}>
                <TabList>
                  <Tab w={"50%"} _selected={{fontWeight: 700, borderBottomColor: "#202020"}}>Image Gallery</Tab>
                  <Tab w={"50%"} _selected={{fontWeight: 700, borderBottomColor: "#202020"}}>Preview
                    ({image.length})</Tab>
                </TabList>
                <TabPanels w={"100%"}>
                  <TabPanel>
                    <ImageUploading value={image} onChange={onChange} multiple={true}>
                      {({imageList, onImageUpload, onImageRemoveAll, dragProps, isDragging}) => (
                        <Flex {...dragProps} w={"auto"} h={350} borderWidth={1} borderColor={"#202020"}
                              alignItems={"center"}
                              justifyContent={"center"} mt={10} onClick={onImageUpload}>
                          <Box>
                            {isDragging && (
                              <Text>Drop Here</Text>
                            )}
                            <Center>
                              <Image src={AddImage}/>
                            </Center>
                            <Text>Add Image</Text>
                          </Box>
                        </Flex>
                      )}
                    </ImageUploading>

                    <Center textAlign={"center"} p={20} mt={"15%"}>
                      <Text color={"#898989"}>
                        You may upload up to 5 images (including thumbnail) Supported file types: jpeg, jpg, png
                      </Text>
                    </Center>
                  </TabPanel>
                  <TabPanel>
                    <Flex flexWrap={"wrap"}>
                      {image.map((item, index) => {
                        return (
                          <Box position={"relative"}>
                            <Flex onClick={() => {
                              handleRemove(index)
                            }} position={"absolute"} borderRadius={100} backgroundColor={"#898989"} w={25} h={25}
                                  justifyContent={"center"} color={"#FFFFFF"} fontSize={15} right={3} top={3}
                                  cursor={"pointer"}>
                              x
                            </Flex>
                            <Image src={item['dataURL']} key={index} height="100" width="auto" margin={5}/>
                          </Box>
                        )
                      })}
                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          </Show>
          <VStack w={"50%"} px={20} alignItems={"start"} mt={50} spacing={10} position={"absolute"} right={0} pb={20}>
            <CustomInput label={"Product Name"} placeholder={"Name your listing. Keep it short and sweet"}
                         isRequired={true}/>
            <Flex w={"100%"} justifyContent={"space-between"}>
              <Box w={"60%"}>
                <CustomButtonInput label={"Category"} selection={categorySelection} isRequired={true}/>
              </Box>
              <Box w={"40%"}>
                <CustomButtonInput label={"Thumbnail Images"} selection={[{
                  label: "Add Image",
                  value: "add-image"
                }]} isRequired={true} prefix={AddImage} imageCallback={(e) => {
                  if (image.length + e.length <= 5) {
                    setImage([...e, ...image])
                  } else {
                    toast({
                      description: "You can only upload 5 images",
                      status: 'error',
                      duration: 9000,
                      isClosable: true,
                    })
                  }
                }}/>
              </Box>
            </Flex>
            <CustomInput label={"Brand (up to 2)"} placeholder={"Add a keyword and press Enter"} isRequired={true}/>
            <CustomInput label={"Description"} placeholder={"Add more information about the product"}
                         isRequired={true}/>
            <Box w={"50%"}>
              <CustomInput label={"Available Qty*"} placeholder={"Enter available quantity"} isRequired={true}/>
            </Box>
            <CustomButtonInput label={"Condition"} selection={conditionSelection} isRequired={true}/>
            <HStack justifyContent={"space-between"} w={"100%"}>
              <CustomInput label={"Season"} placeholder={"ss20"} isRequired={true}/>
              <CustomInput label={"Season"} placeholder={"ss20"} isRequired={true}/>
            </HStack>
            <VStack align={"start"}>
              <Text fontWeight={700}>
                Authenticity
              </Text>
              <Text>
                100%
              </Text>
            </VStack>
            <VStack align={"start"}>
              <Text fontWeight={700}>
                Declaration
              </Text>
              <HStack alignItems={"center"}>
                <Checkbox size='md' colorScheme='green' defaultChecked alignSelf={"flex-start"} mt={1}/>
                <Text>
                  I hereby declare that my item is 100% authentic and in the original packaging. In the event that any
                  information given in this application proves to be false or incorrect, I shall be responsible for the
                  consequences.
                </Text>
              </HStack>
            </VStack>
            <HStack>
              <Text color={"red"}>
                *
              </Text>
              <Text>
                Indicates required
              </Text>
            </HStack>
            <Flex w={"100%"} justifyContent={"flex-end"}>
              <HStack spacing={3}>
                <Box px={6} py={2} borderWidth={1} borderColor={"#202020"}>
                  Cancel
                </Box>
                <Box px={6} py={2} backgroundColor={"#898989"} color={"#FFFFFF"} opacity={0.4}>
                  Publish
                </Box>
              </HStack>
            </Flex>
          </VStack>
        </Flex>
      </Show>
      <Show below={"sm"}>
        <Header callBack={setHeight}/>
        <Box mt={height} w={"100%"} p={3} borderBottomWidth={1} borderBottomColor={"#202020"}>
          <Text color={"#202020"} fontWeight={700}  >
            Add a product
          </Text>
        </Box>
        <VStack  align={"start"} p={5} spacing={8}>

          <Tabs size={"lg"} w={"100%"}>
            <TabList>
              <Tab w={"50%"} _selected={{fontWeight: 700, borderBottomColor: "#202020"}}>Image Gallery</Tab>
              <Tab w={"50%"} _selected={{fontWeight: 700, borderBottomColor: "#202020"}}>Preview
                ({image.length})</Tab>
            </TabList>
            <TabPanels w={"100%"}>
              <TabPanel>
                <Flex justifyContent={"center"}>
                  <ImageUploading value={image} onChange={onChange} multiple={true}>
                    {({imageList, onImageUpload, onImageRemoveAll, dragProps, isDragging}) => (
                      <Flex {...dragProps} w={40} h={40} borderWidth={1} borderColor={"#202020"}
                            alignItems={"center"}
                            justifyContent={"center"} mt={10} onClick={onImageUpload}>
                        <Box>
                          {isDragging && (
                            <Text>Drop Here</Text>
                          )}
                          <Center>
                            <Image src={AddImage}/>
                          </Center>
                          <Text>Add Image</Text>

                        </Box>
                      </Flex>
                    )}
                  </ImageUploading>
                </Flex>
                <Flex justifyContent={"center"}>
                  <Text textAlign={"center"} w={"70%"} mt={8} color={"#898989"}>
                    You may upload up to 5 images (including thumbnail) Supported file types: jpeg, jpg, png
                  </Text>
                </Flex>

              </TabPanel>
              <TabPanel>
                <Flex flexWrap={"wrap"}>
                  {image.map((item, index) => {
                    return (
                      <Box position={"relative"}>
                        <Flex onClick={() => {
                          handleRemove(index)
                        }} position={"absolute"} borderRadius={100} backgroundColor={"#898989"} w={25} h={25}
                              justifyContent={"center"} color={"#FFFFFF"} fontSize={15} right={3} top={3}
                              cursor={"pointer"}>
                          x
                        </Flex>
                        <Image src={item['dataURL']} key={index} height="100" width="auto" margin={5}/>
                      </Box>
                    )
                  })}
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <CustomInput label={"Product Name"} placeholder={"Name your listing keep it short and sweet"}/>
          <CustomButtonInput label={"Category"} selection={categorySelection} isRequired={true}/>
          <CustomInput label={"Brand (up to 2)"} placeholder={"add a keyword and press enter"}/>
          <CustomInput label={"Description "} placeholder={"add some information about the product"}/>
          <HStack>
            <CustomButtonInput label={"Thumbnail Images"} selection={[{
              label: "Add Image",
              value: "add-image"
            }]} isRequired={true} prefix={AddImage} imageCallback={(e) => {
              if (image.length + e.length <= 5) {
                setImage([...e, ...image])
              } else {
                toast({
                  description: "You can only upload 5 images",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
              }
            }}/>
            <CustomInput label={"Available QTY"} placeholder={"Enter available quantity"} isRequired={true}/>
          </HStack>
          <CustomButtonInput label={"Collection"} selection={conditionSelection} isRequired={true}/>
          <HStack>
            <CustomInput label={"Season"} placeholder={"ss20"}/>
            <CustomInput label={"Retail"} placeholder={"400"}/>
          </HStack>
          <Box>
            <Text fontWeight={700}>
              Authenticity
            </Text>
            <Text>
              100%
            </Text>
          </Box>
          <VStack align={"start"}>
            <Text fontWeight={700}>
              Declaration
            </Text>
            <HStack alignItems={"center"}>
              <Checkbox size='md' colorScheme='green' defaultChecked alignSelf={"flex-start"} mt={1}/>
              <Text>
                I hereby declare that my item is 100% authentic and in the original packaging. In the event that any
                information given in this application proves to be false or incorrect, I shall be responsible for the
                consequences.
              </Text>
            </HStack>
          </VStack>
          <Flex justifyContent={"end"} w={"100%"}>
            <HStack>
              <Text color={"red"}>
                *
              </Text>
              <Text>
                Indicates required
              </Text>
            </HStack>
          </Flex>
          <Flex w={"100%"} justifyContent={"center"} >
            <HStack spacing={3}>
              <Box px={6} py={2} borderWidth={1} borderColor={"#202020"}>
                Cancel
              </Box>
              <Box px={6} py={2} backgroundColor={"#000000"} color={"#FFFFFF"}>
                Publish
              </Box>
            </HStack>
          </Flex>

        </VStack>
      </Show>
    </Box>
  )
}
