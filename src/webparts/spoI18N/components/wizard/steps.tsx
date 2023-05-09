import * as React from 'react';
import styles from '../SpoI18N.module.scss';

import { Text } from '@fluentui/react';

import { Elements } from '../../models/Elements';

// Step components
import { Logo }                 from '../../../../components/Logo';
import { SpoElementsSelector }  from '../WizardSteps/SpoElementsSelector/SpoElementsSelector';
import { ColumnsStep }          from '../WizardSteps/ColumnsStep/ColumnsStep';
import { ContentTypesStep }     from '../WizardSteps/ContentTypesStep/ContentTypesStep';
import { CsvStep }              from '../WizardSteps/CsvStep/CsvStep/CsvStep';
import { ViewsStep }            from '../WizardSteps/ViewsStep/ViewsStep';
import { ListsStep }            from '../WizardSteps/ListsStep/ListsStep';

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
        
        <ColumnsStep />
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

        <ContentTypesStep />
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
        
        <ListsStep />
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
        
        <ViewsStep />
      </>
    ),
  },
  {
    title: 'CSV',
    content: (
      <>
        <Text variant="medium">
          Download or Edit here the <b>CSV file</b>.
        </Text>
        
        <CsvStep />
      </>
    ),
  },
];
