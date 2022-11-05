import React from 'react';
import { Button as ButtonBase, IButtonProps, Text } from 'native-base';

interface ButtonProps extends IButtonProps {
  title: string;
  variant?: 'primary' | 'secondary';
}
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  ...rest
}) => {
  return (
    <ButtonBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={variant === 'secondary' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: variant === 'secondary' ? 'red.600' : 'yellow.600'
      }}
      _loading={{
        _spinner: {
          color: variant === 'secondary' ? 'white' : 'black'
        }
      }}
      {...rest}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={variant === 'secondary' ? 'white' : 'black'}
      >
        {title}
      </Text>
    </ButtonBase>
  );
};
