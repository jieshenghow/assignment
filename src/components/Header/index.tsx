import {Box, BoxProps, Flex, HStack, Image, Show, Text, useDimensions} from "@chakra-ui/react";
import ProfilePic from "../../assets/images/profile-pic.png";
import React, {useEffect, useRef} from "react";
import {Props} from "./props";

export const Header = (props:Props) => {

  const {callBack} = props
  const elementRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const dimensions = useDimensions(elementRef,true)

  useEffect(()=>{
    if (dimensions){
      callBack?.(dimensions.borderBox.height)
    }
  },[dimensions])


  return (
    <Box ref={elementRef} position={"fixed"} width={"100%"} backgroundColor={"#202020"} top={0} zIndex={10}>
      <Show above={"sm"}>
        <Flex justifyContent={"space-between"} mx={"5%"}>
          <HStack spacing={4}>
            <Text color={"#FFFFFF"} fontFamily={"avenir_next_lt_probold"} pr={"20%"} cursor={"pointer"}>
              LOGO
            </Text>
            <Text color={"#FFFFFF"} fontSize={16} pr={"10%"} _hover={{fontFamily: 'helveticaneuebold'}} cursor={"pointer"}>
              EVENTS
            </Text>
            <Text color={"#FFFFFF"} className={"header-section-title"} fontSize={16} pr={"10%"} _hover={{fontFamily: 'helveticaneuebold'}} cursor={"pointer"}>
              FEATURES
            </Text>
            <Text color={"#FFFFFF"} fontSize={16} pr={"10%"} _hover={{fontFamily: 'helveticaneuebold'}} cursor={"pointer"}>
              COMMUNITY
            </Text>
            <Text color={"#FFFFFF"} fontSize={16} pr={"10%"} _hover={{fontFamily: 'helveticaneuebold'}} cursor={"pointer"}>
              CATALOGUE
            </Text>
          </HStack>
          <Flex alignItems={"center"}>
            <Image src={ProfilePic} width={"50"} height={"50"}/>
          </Flex>
        </Flex>
      </Show>
      <Show below={"sm"} >
        <Flex w={"100%"} justifyContent={"center"}>
          <Text fontSize={20} color={"#FFFFFF"} fontFamily={"avenir_next_lt_probold"} p={4} cursor={"pointer"}>

            LOGO
          </Text>
        </Flex>
      </Show>
    </Box>
  )
}
