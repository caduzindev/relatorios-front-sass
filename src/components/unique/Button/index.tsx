import { Button as ButtonChakra } from '@chakra-ui/react';

type Props = {
    color: string,
    size: 'xbig' | 'medium' | 'big' | 'small',
    callback: () => void,
    children: React.ReactNode,
    width?: string,
    height?: string,
    padding?: string,
    enable?: boolean
}

const mapToSizeButton = {
    'xbig': 'lg',
    'big': 'md',
    'medium': 'sm',
    'small': 'xs',
}

export const Button = ({ 
    color,
    size,
    callback,
    children,
    width,
    height, 
    padding,
    enable
}: Props) => {
    const sizeButton = mapToSizeButton[size] || 'sm'
    return <ButtonChakra 
        fontFamily="Sans serif"
        fontWeight="600"
        colorScheme={color}
        width={width}
        height={height}
        size={sizeButton}
        onClick={callback}
        padding={padding}
        isDisabled={enable !== undefined ? !enable : false}
    >{children}</ButtonChakra>
}