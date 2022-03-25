import React, {useEffect, useState} from 'react';

export type IconType = 'bug';

interface CustomIconType {
  name: IconType;
  rest?: {[key: string]: any};
}

export const CustomIcon = ({name, ...rest}: CustomIconType) => {
  const [loading, setLoading] = React.useState(false);
  const [icon, setIcon] = useState('');

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const imported = await import(`assets/images/icons/${name}.svg`);
        setIcon(imported.default);
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!loading && icon) {
    return <img src={icon} {...rest} alt={name} />;
  }

  return null;
};
