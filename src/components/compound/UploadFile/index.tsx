import { Box, Stack, Text, useToast } from "@chakra-ui/react"
import { Button } from "../../unique/Button"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

type Props = {
    onFileUpload: (file: File) => void,
    allowExtensions: string[]
}

export const UploadFile = ({ onFileUpload, allowExtensions }: Props) => {
    const toast = useToast()

    const showError = (text: string) => {
        toast({
            duration: 4000,
            isClosable: true,
            render: () => (
                <Box 
                    color='copybase.general.white' 
                    p={4} bg='copybase.general.purple'
                    borderRadius={10}
                    display="flex"
                    justifyContent="center"
                >
                  <Text
                    fontFamily="Sans serif"
                    fontWeight="700"
                    textAlign="center"
                  >Erro: {text}</Text>
                </Box>
              ),
          })
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length < 1) return;
        
        const isAllowExtension = allowExtensions.includes(acceptedFiles[0].type)
        if (!isAllowExtension) {
            showError(`Arquivos permitidos "${allowExtensions.join(',')}"`)
            return;
        }
        
        onFileUpload(acceptedFiles[0])
    }, [onFileUpload, allowExtensions,toast])

    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ 
        onDrop,
        noClick: true,
        noKeyboard: true 
    });

    return (
        <Box {...getRootProps()} width="100%">
            <input {...getInputProps()} />
            <Box
                width="100%"
                border='3px'
                borderStyle="dashed"
                borderRadius={20}
                borderColor={isDragActive ? "copybase.general.purple" : "copybase.general.whiteGray"}
                p={[15,15,20]}
                opacity={isDragActive ? 0.5 : 1}
                bg="copybase.general.whiteGrayClean"
                transition="all 0.3s ease-out"
            >
                <Stack spacing={4} align="center">
                    <Text 
                        fontSize={['2xl','2xl','3xl']} 
                        color="copybase.general.purple"
                        fontFamily="Sans serif"
                        fontWeight="700"
                        textAlign="center"
                    >Arraste e solte o arquivo aqui</Text>
                    <Text 
                        fontSize={['2xl','2xl','3xl']}
                        color="copybase.general.purple"
                        fontFamily="Sans serif"
                        fontWeight="700"
                    >-OU-</Text>
                    <Button 
                        color="copybase.button" 
                        size="big"
                        padding="2rem"
                        callback={()=>open()}
                    >
                        Encontrar Arquivo
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}