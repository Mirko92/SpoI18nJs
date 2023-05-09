import * as React from 'react';
import styles from './SpoI18N.module.scss';
import { ISpoI18NProps } from './ISpoI18NProps';
import { Wizard } from '../Wizard/Wizard';

export default function SpoI18N(props: ISpoI18NProps) {
  return <>
    <section className={`${styles.spoI18N}`}>
      <Wizard />
    </section>
  </>
}