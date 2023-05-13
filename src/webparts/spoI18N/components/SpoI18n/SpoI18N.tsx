import * as React from 'react';
import styles from './SpoI18N.module.scss';
import { ISpoI18NProps } from './ISpoI18NProps';
import { Wizard } from '../Wizard/Wizard';
import { useAppStore } from '../../store/store';

export default function SpoI18N(props: ISpoI18NProps) {
  const [ setLocale ] = useAppStore(state => [ state.setLocale ]);

  React.useEffect(() => {
    setLocale(props.defaultLocale);
  }, []);
  
  return <>
    <section className={`${styles.spoI18N}`}>
      <Wizard />
    </section>
  </>
}