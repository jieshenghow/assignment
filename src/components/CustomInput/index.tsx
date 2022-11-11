import {Props} from "./props";
import {HStack, Input, Text, VStack} from "@chakra-ui/react";
import React from "react";

export const CustomInput = (props: Props) => {
  const {label,placeholder} = props

  return (
    <VStack alignItems={"start"} w={"100%"}>
      <HStack>
        <Text fontWeight={700}>{label}</Text>
        <Text color={"red"}>*</Text>
      </HStack>
      <Input  variant='flushed' placeholder={placeholder} />
    </VStack>

  )
}
