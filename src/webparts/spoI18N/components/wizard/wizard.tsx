import * as React from 'react';
import {
  Stack,
  Text,
  Separator,
  CommandBarButton,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
} from '@fluentui/react';
import { SpoElementsSelector } from '../SpoElementsSelector/SpoElementsSelector';
import { ColumnsSelector } from '../ColumnsSelector/ColumnsSelector';
import { ContentTypesSelector } from '../ContentTypesSelector/ContentTypesSelector';
import { ListsSelector } from '../ListsSelector/ListsSelector';
import { ViewsSelector } from '../ViewsSelector/ViewsSelector';

import styles from '../SpoI18N.module.scss';

export interface IWizardProps {
}

export const Wizard = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleNextClick = React.useCallback(() => {
    setCurrentStep((prevCurrentStep) => prevCurrentStep + 1);
  }, [setCurrentStep]);

  const handlePrevClick = React.useCallback(() => {
    setCurrentStep((prevCurrentStep) => prevCurrentStep - 1);
  }, [setCurrentStep]);

  const handleFinishClick = React.useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleDialogClose = React.useCallback(() => {
    setIsDialogOpen(false);
    setCurrentStep(0);
  }, []);

  const imgSrc = require('../../assets/spoi18n_logo.svg');

  const steps = [
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
      content: (
        <>
          <Text variant="medium">Step 2: Columns selection</Text>
          
          <ColumnsSelector />
        </>
      ),
    },
    {
      title: 'Content types selection',
      content: (
        <>
          <Text variant="medium">Step 3: Content types selection</Text>

          <ContentTypesSelector />
        </>
      ),
    },
    {
      title: 'List selection',
      content: (
        <>
          <Text variant="medium">Step 4: List selection</Text>
          
          <ListsSelector />
          <ViewsSelector />
        </>
      ),
    },
  ];

  return (
    <>
      <Stack horizontalAlign="center">
        <Stack.Item align="center">
          <Text variant="xxLarge">{steps[currentStep].title}</Text>
          <br />
          {steps[currentStep].content}
        </Stack.Item>
      </Stack>
      <Separator />

      <Stack 
        enableScopedSelectors 
        horizontal 
        horizontalAlign="space-between" 
        verticalAlign="center" 
        tokens={{ childrenGap: 20 }}
      >
        <Stack.Item align="start">
          {
            currentStep > 0 && 
            (
              <CommandBarButton
                iconProps={{ iconName: 'ChevronLeft' }}
                text="Back"
                onClick={handlePrevClick}
              />
            )
          }
        </Stack.Item>

        <Stack.Item align="end">
          {
            currentStep < steps.length - 1 
            ? <PrimaryButton text="Next"    onClick={handleNextClick}   />
            : <PrimaryButton text="Finish"  onClick={handleFinishClick} />
          }
        </Stack.Item>
      </Stack>

      <Dialog
        hidden={!isDialogOpen}
        onDismiss={handleDialogClose}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Wizard completed',
        }}
        modalProps={{
          isBlocking: false,
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={handleDialogClose} text="OK" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
