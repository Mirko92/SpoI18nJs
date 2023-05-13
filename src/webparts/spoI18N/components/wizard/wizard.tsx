import * as React from 'react';
import {
  Stack,
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  Pivot,
  PivotItem,
} from '@fluentui/react';

import { useAppStore } from '../../store/store';
import { steps } from './steps';
import { Elements } from '../../models/Elements';

export interface IWizardProps {
}

export const Wizard = () => {
  const [
    selectedElements, fields,cts,lists,views
  ] = useAppStore(
    state => ([
      state.selectedElements,
      state.selectedFields,
      state.selectedContentTypes,
      state.selectedLists,
      state.selectedViews
    ])
  );

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

  function getCount(type: Elements) {
    const elements: Record<string, number> = {
      [Elements.COLUMNS]      : fields?.length,
      [Elements.CONTENT_TYPES]: cts?.length,
      [Elements.LISTS]        : lists?.length,
      [Elements.VIEWS]        : views?.length,
    }

    return elements[type] as number;
  }

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
    
      <Stack 
        horizontal
        horizontalAlign="space-between"
        verticalAlign="center"
        tokens={{ childrenGap: 5 }}
      >
        <Stack.Item align='start'>
          <PrimaryButton
            primary
            iconProps = {{ iconName: 'ChevronLeft' }}
            text      = "Back"
            onClick   = {handlePrevClick}
            disabled  = {!currentStep}
          />
        </Stack.Item>

        <Pivot 
          aria-label="Wizard steps" 
          selectedKey={String(currentStep)}
          onLinkClick={(item) => setCurrentStep(+item.props.itemKey)}
        >
          {
            wizardSteps?.map((s,i) => (
              <PivotItem 
                itemKey    = {i.toString()}
                headerText = {s.title}
                itemCount  = {getCount(s.conditionValue)}
                itemIcon   = {s.icon}
              >
                <Stack 
                  horizontalAlign="center" 
                  style={{minHeight: "360px"}}
                >
                  {s.content}
                </Stack>
              </PivotItem>
            ))
          }
        </Pivot>

        <Stack.Item align='start'>
          {
            currentStep < wizardSteps.length - 1 
            ? <PrimaryButton 
                text="Next"    
                onClick={handleNextClick}   
                iconProps={{ iconName: 'ChevronRight' }} 
              />
            : <PrimaryButton 
                text="Finish"  
                onClick={handleFinishClick} 
                iconProps={{ iconName: 'SkypeCircleCheck' }}
              />
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
