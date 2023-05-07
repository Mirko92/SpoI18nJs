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

import { useAppStore } from '../../store/store';
import { steps } from './steps';

export interface IWizardProps {
}

export const Wizard = () => {
  const selectedElements = useAppStore(state => state.selectedElements);

  const [ wizardSteps, setWizardSteps ]   = React.useState<any[]>(steps);
  const [ currentStep, setCurrentStep ]   = React.useState(0);
  const [ isDialogOpen, setIsDialogOpen ] = React.useState(false);

  const handleNextClick = React.useCallback(() => {
    setCurrentStep((prevCurrentStep) => (prevCurrentStep + 1) % wizardSteps.length);
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

  /**
   * It filters the available steps based on the selection elements to translate.
   */
  React.useEffect(() => {
    setWizardSteps(() => {
      return steps.filter(
        s => !s.conditionValue || selectedElements.includes(s.conditionValue)
      );
    });
  }, [selectedElements]);


  return (
    <>
      <Stack horizontalAlign="center">
        <Stack.Item align="center">
          <Text variant="xxLarge">{wizardSteps[currentStep].title}</Text>
        </Stack.Item>

        {wizardSteps[currentStep].content}
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
            currentStep < wizardSteps.length - 1 
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
