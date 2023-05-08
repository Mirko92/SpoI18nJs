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
import { Logo } from '../../../../components/Logo';

/**
 * Every available wizard step from Welcome to Finish
 */
export const steps = [
  {
    title: '',
    content: (
      <>
        
        <div className={styles.welcome}>
          <Logo />
          
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
          Filter and select the available <b>Columns</b> based on your requirements.
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
        <Text variant="medium">
          Filter and select the available <b>Content Types</b> based on your requirements.
        </Text>

        <ContentTypesSelector />
      </>
    ),
  },
  {
    title: 'List selection',
    conditionValue: Elements.LISTS,
    content: (
      <>
        <Text variant="medium">
          Filter and select the available <b>Lists</b> based on your requirements.
        </Text>
        
        <ListsSelector />
      </>
    ),
  },
  {
    title: 'Views selection',
    conditionValue: Elements.VIEWS,
    content: (
      <>
        <Text variant="medium">
          Select the available <b>Views</b> based on your requirements.
        </Text>
        
        <ViewsSelector />
      </>
    ),
  },
];
