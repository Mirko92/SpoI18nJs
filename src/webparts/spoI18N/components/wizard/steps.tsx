import * as React from 'react';
import styles from '../SpoI18N.module.scss';

import { Text } from '@fluentui/react';

import { Elements } from '../../models/Elements';

// Step components
import { SpoElementsSelector }  from '../SpoElementsSelector/SpoElementsSelector';
import { ColumnsSelector }      from '../ColumnsSelector/ColumnsSelector';
import { ContentTypesSelector } from '../ContentTypesSelector/ContentTypesSelector';
import { ListsSelector }        from '../ListsSelector/ListsSelector';
import { ViewsSelector }        from '../ViewsSelector/ViewsSelector';

// Logo
const imgSrc = require('../../assets/spoi18n_logo.svg');

/**
 * Every available wizard step from Welcome to Finish
 */
export const steps = [
  {
    title: '',
    content: (
      <>
        
        <div className={styles.welcome}>
          <img 
            alt="Webpart logo" 
            src={imgSrc} 
            className={styles.welcomeImage} 
          />
          
          <br />
          
          <Text variant="medium">
            This wizard will guide you through the process of creating a <i>.resx</i> file for <b>SPO i18n</b>.
          </Text>
        </div>
      </>
    ),
  },
  {
    title: 'Elements selection',
    content: (
      <>
        <Text variant="medium">Step 1: Spo Elements selection</Text>
        
        <SpoElementsSelector />
      </>
    ),
  },
  {
    title: 'Columns selection',
    conditionValue: Elements.COLUMNS,
    content: (
      <>
        <Text variant="medium">
          Filter and select the available Columns based on your requirements.
        </Text>
        
        <ColumnsSelector />
      </>
    ),
  },
  {
    title: 'Content types selection',
    conditionValue: Elements.CONTENT_TYPES,
    content: (
      <>
        <Text variant="medium">Step 3: Content types selection</Text>

        <ContentTypesSelector />
      </>
    ),
  },
  {
    title: 'List selection',
    conditionValue: Elements.LISTS,
    content: (
      <>
        <Text variant="medium">Step 4: List selection</Text>
        
        <ListsSelector />
        <ViewsSelector />
      </>
    ),
  },
];
