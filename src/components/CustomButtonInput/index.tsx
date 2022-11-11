import {Props} from "./props";
import {Button, VStack, Text, HStack, Box, Image} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import ImageUploading from "react-images-uploading"



export const CustomButtonInput = (props: Props ) => {
  const {label, isMulti = false, selection, isRequired=false , prefix, imageCallback} = props

  const [selected, setSelected] = useState<{label: string, value:string}>()

  const handleSelect = (value: string, label:string) => {
    setSelected({
      label,
      value
    })
  }
  const [images, setImages] = React.useState([]);

  const onChange = (imageList: any, addUpdateIndex: any) => {
    imageCallback?.(imageList)
  }



  return(
    <VStack w={"100%"} align={"start"}>
      <HStack>
        <Text fontWeight={700}>{label}</Text>
        {isRequired && <Text color={"red"}>*</Text>}
      </HStack>
      <HStack>
        {selection.map((item, index) => {
          const backgroundColor = selected?.value === item.value ? "#000000" : "#FFFFFF"
          const textColor = selected?.value === item.value ? "#FFFFFF" : "#000000"
          return(
            <ImageUploading multiple={true} key={index} onChange={onChange} value={images}>
              {({ imageList, onImageUpload, onImageRemoveAll }) => (
                <HStack onClick={()=>{
                  if (prefix){
                    onImageUpload()
                  }else{
                    handleSelect(item.value, item.label)

                  }
                }} backgroundColor={backgroundColor} color={textColor}  borderWidth={1} borderColor={"#202020"} padding={2} justifyContent={"center"}>
                  {prefix && <Image w={15} h={15} src={prefix} />}
                  <Text>{item.label}</Text>
                </HStack>
              )}
            </ImageUploading>

          )
        })}
      </HStack>
    </VStack>
  )
}
