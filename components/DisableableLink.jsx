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
          <a
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {label}
          </a>
        </Link>
      )}
    </>
  );
};

export default DisableableLink;
