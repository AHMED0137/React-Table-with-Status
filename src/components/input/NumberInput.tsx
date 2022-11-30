import { createStyles, NumberInput, NumberInputProps } from '@mantine/core';

export interface NumberProps extends NumberInputProps {
  width?: string | number;
}

export const Number = ({ value, width, ...rest }: NumberProps) => {
  const { classes } = useStyles({ width });
  return <NumberInput classNames={classes} radius="xl" required size="md" {...rest} />;
};

export default Number;

Number.defaultProps = {
  width: '20%',
};

const useStyles = createStyles((theme, { width }: Partial<NumberProps>) => ({
  wrapper: {
    width,
  },
}));
