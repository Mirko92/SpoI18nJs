import * as React from 'react';
import styles from '../SpoI18n/SpoI18N.module.scss';

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
    title: 'Welcome',
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
    title: 'Elements',
    icon: 'MultiSelect',
    content: <SpoElementsSelector />,
  },
  {
    title: 'Site Fields',
    conditionValue: Elements.COLUMNS,
    icon: 'TextField',
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
    title: 'Content types',
    conditionValue: Elements.CONTENT_TYPES,
    icon: 'HomeGroup',
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
    title: 'Lists',
    conditionValue: Elements.LISTS,
    icon: 'ViewList',
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
    title: 'Views',
    conditionValue: Elements.VIEWS,
    icon: 'PageListFilter',
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
    icon: 'PageData',
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
