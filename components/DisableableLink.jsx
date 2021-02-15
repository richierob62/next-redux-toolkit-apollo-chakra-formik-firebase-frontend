import Link from 'next/link';
import { Text } from '@chakra-ui/react';

const DisableableLink = (props) => {
  const { isDisabled, label, href } = props;

  return (
    <>
      {isDisabled ? (
        <Text>{label}</Text>
      ) : (
        <Link href={href}>
          <a>{label}</a>
        </Link>
      )}
    </>
  );
};

export default DisableableLink;
