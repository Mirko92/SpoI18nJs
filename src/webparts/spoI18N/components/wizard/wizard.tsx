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
    fields,cts,lists,views
  ] = useAppStore(
    state => ([
      state.selectedFields,
      state.selectedContentTypes,
      state.selectedLists,
      state.selectedViews
    ])
  );

  const [ currentStep, setCurrentStep ]   = React.useState(0);
  const [ isDialogOpen, setIsDialogOpen ] = React.useState(false);

  const handleNextClick = React.useCallback(() => {
    setCurrentStep((prevCurrentStep) => (prevCurrentStep + 1) % steps.length);
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
          style={{display: "flex", flexFlow: 'column nowrap', alignItems: 'center'}}
          aria-label="Wizard steps" 
          selectedKey={String(currentStep)}
          onLinkClick={(item) => setCurrentStep(+item.props.itemKey)}
        >
          {
            steps?.map((s,i) => (
              <PivotItem 
                itemKey    = {i.toString()}
                headerText = {s.title}
                itemCount  = {getCount(s.conditionValue)}
                itemIcon   = {s.icon}
              >
                <Stack 
                  horizontalAlign="center" 
                  style={{minHeight: "360px", width: "600px"}}
                >
                  {s.content}
                </Stack>
              </PivotItem>
            ))
          }
        </Pivot>

        <Stack.Item align='start'>
          {
            currentStep < steps.length - 1 
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
